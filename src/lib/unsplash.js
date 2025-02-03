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
