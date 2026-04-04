import type { Animal } from './types';
import type { NationalAnimal } from './animalList';
import { validateImage, buildSearchQuery } from './imageValidation';

const FLAGCDN_BASE_URL = 'https://flagcdn.com';

// Wikipedia image title mappings for heraldic/national animals
const WIKI_IMAGE_TITLES: Record<string, string> = {
	Bundesadler: 'Bundeswappen_Deutschlands',
	'Doppelköpfiger Adler': 'Wappen_Albaniens',
	'Weißer Adler': 'Wappen_Polens',
	'Leo Belgicus': 'Wappen_Belgiens',
	'Gallischer Hahn': 'Wappen_Frankreichs',
	Weißkopfseeadler: 'Bald_Eagle',
	'Chinesischer Drache': 'Chinese_dragon',
	'Walisischer Drache': 'Flag_of_Wales',
	'Schottisches Einhorn': 'Royal_Coat_of_Arms_of_Scotland',
	'Norwegischer Löwe': 'Wappen_Norwegens',
	'Singapur Merlion': 'Merlion',
	'Schwedischer Löwe': 'Tre_Kronor_(Swedish_emblem)',
	'Tschechischer Löwe': 'Coat_of_arms_of_the_Czech_Republic',
	'Finnischer Löwe': 'Coat_of_arms_of_Finland',
	'Mexikanischer Adler': 'Coat_of_arms_of_Mexico',
	'Sri-Lanka-Löwe': 'Emblem_of_Sri_Lanka'
};

/**
 * Fetch a Wikipedia image for an animal by name.
 * Returns the image URL or null if not found.
 */
async function fetchWikiImage(animalName: string): Promise<string | null> {
	try {
		const title = WIKI_IMAGE_TITLES[animalName] || animalName.replace(/\s+/g, '_');

		// Try German Wikipedia first
		let response = await fetch(
			`https://de.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800&origin=*`
		);
		let data = await response.json();
		const pages = data.query?.pages;
		if (pages) {
			const pageId = Object.keys(pages)[0];
			const imageUrl = pages[pageId]?.thumbnail?.source;
			if (imageUrl) return imageUrl;
		}

		// Try English Wikipedia as fallback
		const enTitle = WIKI_IMAGE_TITLES[animalName] || animalName.replace(/\s+/g, '_');
		response = await fetch(
			`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(enTitle)}&prop=pageimages&format=json&pithumbsize=800&origin=*`
		);
		data = await response.json();
		const enPages = data.query?.pages;
		if (enPages) {
			const pageId = Object.keys(enPages)[0];
			const imageUrl = enPages[pageId]?.thumbnail?.source;
			if (imageUrl) return imageUrl;
		}

		return null;
	} catch (error) {
		console.warn('Wiki image fetch failed for', animalName, error);
		return null;
	}
}

// Generate SVG placeholder with animal name as fallback
function generatePlaceholderUrl(animalName: string): string {
	const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];
	const bg = colors[Math.floor(Math.random() * colors.length)];
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'>
		<rect fill='${bg}' width='800' height='600'/>
		<text x='400' y='280' font-family='Arial' font-size='48' fill='white' text-anchor='middle'>🐾</text>
		<text x='400' y='350' font-family='Arial' font-size='32' fill='white' text-anchor='middle'>${encodeURIComponent(animalName)}</text>
		<text x='400' y='400' font-family='Arial' font-size='20' fill='rgba(255,255,255,0.7)' text-anchor='middle'>Nationaltier finden!</text>
	</svg>`;
	return `data:image/svg+xml,${svg}`;
}

interface UnsplashPhoto {
	urls: {
		raw: string;
		full: string;
		regular: string;
		small: string;
		thumb: string;
	};
	description: string | null;
	alt_description: string | null;
	tags: Array<{ title: string }>;
	color: string;
	black_and_white: boolean;
}

interface UnsplashResponse {
	results: UnsplashPhoto[];
	total: number;
	total_pages: number;
}

/**
 * Fetch an image for an animal.
 * Priority: 1) Wikipedia image, 2) Unsplash (if API key configured), 3) SVG placeholder
 * Also accepts a plain string query for homepage backgrounds.
 */
export async function fetchUnsplashImage(animal: Animal | NationalAnimal | string): Promise<string> {
	// If passed a plain string, try to find a Wikipedia image for any animal with that name,
	// otherwise use a placeholder
	if (typeof animal === 'string') {
		// For homepage backgrounds, use a nice colored placeholder
		return generatePlaceholderUrl(animal);
	}

	const animalName = animal.name;

	// 1) Try Wikipedia images first (no API key needed)
	const wikiImage = await fetchWikiImage(animalName);
	if (wikiImage) {
		return wikiImage;
	}

	// 2) Try Unsplash only if API key is configured
	const unsplashKey = typeof window === 'undefined'
		? process.env.UNSPLASH_ACCESS_KEY
		: import.meta.env.UNSPLASH_ACCESS_KEY;

	if (unsplashKey) {
		try {
			const searchQuery = buildSearchQuery(animal as Animal) || `${animalName} animal`;
			const url = new URL('/api/unsplash', window.location.origin);
			url.searchParams.append('query', searchQuery);
			url.searchParams.append('orientation', 'landscape');
			url.searchParams.append('content_filter', 'high');
			url.searchParams.append('per_page', '10');

			const response = await fetch(url.toString());
			if (response.ok) {
				const data: UnsplashResponse = await response.json();
				if (data.results?.length) {
					const validPhotos = data.results
						.filter((p) => !p.black_and_white)
						.filter((p) => validateImage(p.description || p.alt_description || '', animal as Animal));

					if (validPhotos.length) {
						return validPhotos[0].urls.regular;
					}
				}
			}
		} catch (error) {
			console.warn('Unsplash fetch failed, falling back to placeholder:', error);
		}
	}

	// 3) SVG placeholder fallback
	return generatePlaceholderUrl(animalName);
}

function getLocalImagePath(animalName: string): string {
	const sanitizedName = animalName
		.replace(/[^a-zA-Z0-9\s-äöüßÄÖÜ]/g, '')
		.replace(/\s+/g, '-')
		.toLowerCase()
		.substring(0, 50);

	if (!sanitizedName) {
		return generatePlaceholderUrl('default');
	}

	return generatePlaceholderUrl(sanitizedName);
}

export async function getCountryFlag(countryCode: string): Promise<string> {
	try {
		return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
	} catch (error) {
		console.error('Error loading flag:', error);
		return '/default-flag.png';
	}
}
