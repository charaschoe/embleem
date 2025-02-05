import type { Animal } from './types';

// Map of German animal names to their Wikipedia article titles
const wikiTitles: { [key: string]: string } = {
    'Bengalischer Tiger': 'Königstiger',
    'Weißkopfseeadler': 'Weißkopfseeadler',
    'Komodo-Drache': 'Komodowaran',
    'Gallischer Hahn': 'Gallischer_Hahn',
    'Andenkondor': 'Andenkondor',
    'Chinesischer Drache': 'Chinesischer_Drache',
    'Malaiischer Tiger': 'Malaysischer_Tiger',
    'Russischer Bär': 'Braunbär',
    'Steppenzebra': 'Steppenzebra',
    'Känguru': 'Rotes_Riesenkänguru',
    'Kanadischer Biber': 'Kanadischer_Biber',
    'Irischer Hirsch': 'Irischer_Riesenhirsch'
};

interface WikipediaResponse {
    query?: {
        pages?: {
            [key: string]: {
                extract?: string;
                pageimages?: {
                    thumbnail?: {
                        source?: string;
                    };
                };
            };
        };
    };
    error?: {
        info: string;
    };
}

export async function getAnimalInfo(animalName: string): Promise<string> {
    try {
        // First try German Wikipedia
        const deInfo = await fetchWikipediaInfo(animalName, 'de');
        if (deInfo) return deInfo;

        // If German fails, try English Wikipedia
        const enInfo = await fetchWikipediaInfo(animalName, 'en');
        if (enInfo) return enInfo;

        // If both fail, return a kid-friendly message
        return `Entschuldigung, ich konnte keine Informationen über ${animalName} finden. Aber ich bin sicher, es ist ein faszinierendes Tier! 🌟`;

    } catch (error) {
        console.error('Wikipedia API error:', error);
        return `Ups! Gerade kann ich keine Informationen abrufen. Aber ${animalName} ist bestimmt ein tolles Tier! 🌈`;
    }
}

export async function getWikipediaImage(animal: Animal): Promise<string | null> {
    try {
        const searchTerm = wikiTitles[animal.name] || animal.name.replace(' ', '_');
        const params = {
            action: 'query',
            prop: 'pageimages',
            titles: searchTerm,
            format: 'json',
            pithumbsize: 1024,
            origin: '*'
        };

        // First try German Wikipedia
        let imageUrl = await fetchWikipediaImage('de', params);
        
        // If no German image, try English Wikipedia
        if (!imageUrl && animal.meta.wikiLinks?.en) {
            const englishTitle = await getEnglishTitle(searchTerm);
            if (englishTitle) {
                params.titles = englishTitle;
                imageUrl = await fetchWikipediaImage('en', params);
            }
        }

        return imageUrl;
    } catch (error) {
        console.error('Wikipedia Bild-Fehler:', error);
        return null;
    }
}

async function fetchWikipediaInfo(animalName: string, lang: 'de' | 'en'): Promise<string | null> {
    const searchTerm = wikiTitles[animalName] || animalName.replace(' ', '_');
    const baseUrl = `https://${lang}.wikipedia.org/w/api.php`;
    
    const params = new URLSearchParams({
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages',
        exintro: 'true',
        explaintext: 'true',
        pithumbsize: '300',
        titles: searchTerm,
        origin: '*'
    });

    try {
        const response = await fetch(`${baseUrl}?${params}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data: WikipediaResponse = await response.json();
        
        if (data.error) {
            console.error(`Wikipedia API error: ${data.error.info}`);
            return null;
        }

        const pages = data.query?.pages;
        if (!pages) return null;

        const pageContent = Object.values(pages)[0];
        if (!pageContent || !pageContent.extract) return null;

        // Clean and simplify the content for children
        let extract = pageContent.extract
            .split('\n')[0] // Take only the first paragraph
            .replace(/\([^)]*\)/g, '') // Remove parentheses and their content
            .replace(/\[[^\]]*\]/g, '') // Remove square brackets and their content
            .replace(/\{[^}]*\}/g, ''); // Remove curly braces and their content

        // Limit to roughly 2-3 sentences for children's attention span
        const sentences = extract.split(/[.!?]+/).filter(s => s.trim().length > 0);
        extract = sentences.slice(0, 2).join('. ') + '.';

        // Add emoji based on animal category
        const emoji = getAnimalEmoji(animalName);
        
        return `${emoji} ${extract}`;
    } catch (error) {
        console.error(`Error fetching ${lang} Wikipedia info:`, error);
        return null;
    }
}

function getAnimalEmoji(animalName: string): string {
    const emojiMap: { [key: string]: string } = {
        'Bengalischer Tiger': '🐯',
        'Weißkopfseeadler': '🦅',
        'Komodo-Drache': '🦎',
        'Gallischer Hahn': '🐓',
        'Andenkondor': '🦅',
        'Chinesischer Drache': '🐲',
        'Malaiischer Tiger': '🐯',
        'Russischer Bär': '🐻',
        'Steppenzebra': '🦓',
        'Känguru': '🦘',
        'Kanadischer Biber': '🦫',
        'Irischer Hirsch': '🦌'
    };

    return emojiMap[animalName] || '🦁';
}

async function fetchWikipediaImage(lang: string, params: any): Promise<string | null> {
    const url = `https://${lang}.wikipedia.org/w/api.php?${new URLSearchParams(params)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.query?.pages) return null;
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    return pages[pageId]?.thumbnail?.source || null;
}

async function getEnglishTitle(germanTitle: string): Promise<string | null> {
    try {
        const params = {
            action: 'query',
            prop: 'langlinks',
            titles: germanTitle,
            lllang: 'en',
            format: 'json',
            origin: '*'
        };

        const url = `https://de.wikipedia.org/w/api.php?${new URLSearchParams(params)}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data.query?.pages) return null;
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const langlinks = pages[pageId]?.langlinks;
        
        return langlinks?.[0]?.['*'] || null;
    } catch (error) {
        console.error('Error getting English title:', error);
        return null;
    }
}
