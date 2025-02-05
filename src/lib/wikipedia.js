export async function getAnimalInfo(animal) {
    const searchTerm = animal.name;
    const apiUrl = `https://de.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${encodeURIComponent(searchTerm)}&origin=*`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch from Wikipedia API');
        }

        const data = await response.json();
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        if (!extract) {
            return 'Keine Information verfügbar.';
        }

        return extract;
    } catch (error) {
        console.error('Error fetching Wikipedia data:', error);
        return 'Fehler beim Laden der Information.';
    }
} 