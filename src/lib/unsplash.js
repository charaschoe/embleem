const FLAGCDN_BASE_URL = 'https://flagcdn.com';

export async function fetchUnsplashImage(query) {
	const accessKey = '5HoX7yIU_e7Blnn4x4Hw49z7SzOX0mMfPT1jNrmy9Sw'; // Dein Unsplash Access Key
	const apiUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

	try {
		const response = await fetch(apiUrl);
		if (!response.ok) {
			console.error(`Unsplash API Fehler: ${response.status} ${response.statusText}`);
			return null;
		}

		const data = await response.json();
		if (data.results && data.results.length > 0) {
			return data.results[0].urls.regular; // Gibt die URL des ersten Bildes zurück
		} else {
			console.error('Kein Bild gefunden');
			return null;
		}
	} catch (error) {
		console.error('Fehler beim Abrufen der Unsplash-API:', error);
		return null;
	}
}

export async function getCountryFlag(countryCode) {
	try {
		// Use flagcdn.com which is free and reliable
		return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
	} catch (error) {
		console.error('Error fetching flag:', error);
		return '/default-flag.png';
	}
}

export async function getUnsplashImage(animal) {
	try {
		const response = await fetch(
			`https://api.unsplash.com/photos/random?query=${encodeURIComponent(animal)}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
			{
				signal: AbortSignal.timeout(5000)
			}
		);
		const data = await response.json();
		return data.urls.regular;
	} catch (error) {
		console.error('Error fetching Unsplash image:', error);
		return `/animals/${animal.toLowerCase()}.jpg`;
	}
}
