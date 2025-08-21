import type { Animal } from './types';
import { validateImage, buildSearchQuery } from './imageValidation';

const FLAGCDN_BASE_URL = 'https://flagcdn.com';

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

export async function fetchUnsplashImage(animal: Animal): Promise<string> {
	const searchQuery = buildSearchQuery(animal);
	if (!searchQuery) {
		console.debug('No search query generated');
		return getLocalImagePath(animal.name);
	}

	// Add delay between requests to respect rate limits
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	await delay(100); // Small delay between requests

	// Use secure server-side API proxy instead of direct API call
	const url = new URL('/api/unsplash', window.location.origin);
	url.searchParams.append('query', searchQuery);
	url.searchParams.append('orientation', 'landscape');
	url.searchParams.append('content_filter', 'high');
	url.searchParams.append('per_page', '30');

	try {
		const response = await fetch(url.toString());

		if (response.status === 403) {
			console.warn('Unsplash API rate limit exceeded or invalid key');
			return getLocalImagePath(animal.name);
		}

		if (!response.ok) {
			console.error('Unsplash API error:', response.status);
			return getLocalImagePath(animal.name);
		}

		const data: UnsplashResponse = await response.json();

		if (!data.results || data.results.length === 0) {
			console.debug('No results found for query:', searchQuery);
			return getLocalImagePath(animal.name);
		}

		// Filter out black and white images and find the best match
		const validPhotos = data.results.filter(
			(photo) =>
				!photo.black_and_white &&
				validateImage(photo.description || photo.alt_description || '', animal)
		);

		if (validPhotos.length === 0) {
			return getLocalImagePath(animal.name);
		}

		return validPhotos[0].urls.regular;
	} catch (error) {
		console.error('Error fetching from Unsplash:', error);
		return getLocalImagePath(animal.name);
	}
}

function getLocalImagePath(animalName: string): string {
	// Sanitize the animal name to prevent path traversal attacks
	const sanitizedName = animalName
		.replace(/[^a-zA-Z0-9\s-äöüßÄÖÜ]/g, '') // Remove potentially dangerous characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.toLowerCase()
		.substring(0, 50); // Limit length to prevent excessively long filenames

	if (!sanitizedName) {
		return '/animals/default.jpg'; // Fallback for empty/invalid names
	}

	return `/animals/${sanitizedName}.jpg`;
}

export async function getCountryFlag(countryCode: string): Promise<string> {
	try {
		return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
	} catch (error) {
		console.error('Error loading flag:', error);
		return '/default-flag.png';
	}
}
