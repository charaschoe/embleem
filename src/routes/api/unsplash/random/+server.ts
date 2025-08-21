import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Server-side only API key (not exposed to client)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

interface UnsplashRandomParams {
	query: string;
	orientation?: string;
	content_filter?: string;
}

// Input validation and sanitization
function validateAndSanitizeParams(searchParams: URLSearchParams): UnsplashRandomParams {
	const query = searchParams.get('query');
	if (!query || query.trim().length === 0) {
		throw new Error('Query parameter is required');
	}

	// Sanitize query - remove potentially dangerous characters
	const sanitizedQuery = query.replace(/[<>\"'&]/g, '').trim();
	if (sanitizedQuery.length === 0) {
		throw new Error('Invalid query parameter');
	}

	// Validate orientation parameter
	const orientation = searchParams.get('orientation') || 'landscape';
	const validOrientations = ['landscape', 'portrait', 'squarish'];
	if (!validOrientations.includes(orientation)) {
		throw new Error('Invalid orientation parameter');
	}

	// Validate content_filter parameter
	const contentFilter = searchParams.get('content_filter') || 'high';
	const validFilters = ['low', 'high'];
	if (!validFilters.includes(contentFilter)) {
		throw new Error('Invalid content_filter parameter');
	}

	return {
		query: sanitizedQuery,
		orientation,
		content_filter: contentFilter
	};
}

export const GET: RequestHandler = async ({ url, fetch }) => {
	// Check if API key is configured
	if (!UNSPLASH_ACCESS_KEY) {
		console.error('UNSPLASH_ACCESS_KEY environment variable not set');
		return error(500, { message: 'API configuration error' });
	}

	try {
		// Validate and sanitize input parameters
		const params = validateAndSanitizeParams(url.searchParams);

		// Construct Unsplash API URL for random photo
		const unsplashUrl = new URL('https://api.unsplash.com/photos/random');
		unsplashUrl.searchParams.append('query', params.query);
		unsplashUrl.searchParams.append('orientation', params.orientation!);
		unsplashUrl.searchParams.append('content_filter', params.content_filter!);
		unsplashUrl.searchParams.append('client_id', UNSPLASH_ACCESS_KEY);

		// Make request to Unsplash API with proper headers
		const response = await fetch(unsplashUrl.toString(), {
			headers: {
				'Accept-Version': 'v1',
				'User-Agent': 'Embleem-Game/1.0'
			}
		});

		if (!response.ok) {
			if (response.status === 403) {
				return error(403, { message: 'API rate limit exceeded or invalid key' });
			}
			return error(response.status, { message: 'External API error' });
		}

		const data = await response.json();

		// Return the data to the client
		return json(data);
	} catch (err) {
		console.error('Unsplash random proxy error:', err);

		if (err instanceof Error) {
			return error(400, { message: err.message });
		}

		return error(500, { message: 'Internal server error' });
	}
};
