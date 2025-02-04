async function getAnimalInfo(animalName: string) {
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
		const pages = data.query.pages;
		const pageId = Object.keys(pages)[0];
		return pages[pageId].extract;
	} catch (error) {
		console.error('Fehler beim Laden der Wikipedia-Daten:', error);
		return null;
	}
}
