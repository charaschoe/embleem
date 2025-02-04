export async function getAnimalInfo(animalName: string): Promise<string> {
    const wikiURL = 'https://de.wikipedia.org/w/api.php';
    const params = {
        action: 'query',
        prop: 'extracts',
        exintro: true,
        titles: animalName,
        format: 'json',
        origin: '*',
        exsentences: 2, // Begrenzt auf 2 Sätze für bessere Übersichtlichkeit
        explaintext: true
    };

    const url = wikiURL + '?' + new URLSearchParams(params);

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (!data.query?.pages) return 'Keine Informationen verfügbar';
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        return pages[pageId].extract || 'Keine weiteren Infos';
    } catch (error) {
        console.error('Wikipedia Fehler:', error);
        return 'Infos aktuell nicht verfügbar';
    }
}
