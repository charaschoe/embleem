import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Server-side only API key (not exposed to client)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

interface UnsplashSearchParams {
	query: string;
	orientation?: string;
	content_filter?: string;
	per_page?: string;
}

// Input validation and sanitization
function validateAndSanitizeParams(searchParams: URLSearchParams): UnsplashSearchParams {
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

	// Validate per_page parameter
	const perPageStr = searchParams.get('per_page') || '30';
	const perPage = parseInt(perPageStr, 10);
	if (isNaN(perPage) || perPage < 1 || perPage > 30) {
		throw new Error('Invalid per_page parameter (must be 1-30)');
	}

	return {
		query: sanitizedQuery,
		orientation,
		content_filter: contentFilter,
		per_page: perPageStr
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

		// Construct Unsplash API URL
		const unsplashUrl = new URL('https://api.unsplash.com/search/photos');
		unsplashUrl.searchParams.append('query', params.query);
		unsplashUrl.searchParams.append('orientation', params.orientation!);
		unsplashUrl.searchParams.append('content_filter', params.content_filter!);
		unsplashUrl.searchParams.append('per_page', params.per_page!);
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
		console.error('Unsplash proxy error:', err);

		if (err instanceof Error) {
			return error(400, { message: err.message });
		}

		return error(500, { message: 'Internal server error' });
	}
};
