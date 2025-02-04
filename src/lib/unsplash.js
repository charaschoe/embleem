const FLAGCDN_BASE_URL = 'https://flagcdn.com';

export async function fetchUnsplashImage(query) {
	// Access Key aus .env Datei lesen
	const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
	const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}%20animal%20portrait&orientation=landscape&per_page=5&client_id=${accessKey}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			console.error(`Unsplash API Fehler: ${response.status} ${response.statusText}`);
			return `/animals/${query.toLowerCase().replace(' ', '-')}.jpg`;
		}

		const data = await response.json();
		if (data.results && data.results.length > 0) {
			const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
			return data.results[randomIndex].urls.regular;
		} else {
			console.error('Kein passendes Bild gefunden');
			return `/animals/${query.toLowerCase().replace(' ', '-')}.jpg`;
		}
	} catch (error) {
		console.error('Fehler beim Abrufen der Unsplash-API:', error);
		return `/animals/${query.toLowerCase().replace(' ', '-')}.jpg`;
	}
}

export async function getCountryFlag(countryCode) {
	try {
		return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
	} catch (error) {
		console.error('Error fetching flag:', error);
		return '/default-flag.png';
	}
}

export async function getUnsplashImage(animal) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), 5000);

		const response = await fetch(
			`https://api.unsplash.com/photos/random?query=${encodeURIComponent(animal)}%20animal%20portrait&orientation=landscape&content_filter=high&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
			{
				signal: controller.signal
			}
		);

		clearTimeout(timeoutId);
		const data = await response.json();

		if (!data || !data.urls) {
			return `/animals/${animal.toLowerCase().replace(' ', '-')}.jpg`;
		}

		return data.urls.regular;
	} catch (error) {
		console.error('Error fetching Unsplash image:', error);
		return `/animals/${animal.toLowerCase().replace(' ', '-')}.jpg`;
	}
}
