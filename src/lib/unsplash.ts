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
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.error('Unsplash API key is missing');
    return getLocalImagePath(animal.name);
  }

  const searchQuery = buildSearchQuery(animal);
  if (!searchQuery) {
    console.debug('No search query generated');
    return getLocalImagePath(animal.name);
  }

  // Add delay between requests to respect rate limits
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(100); // Small delay between requests

  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.append('query', searchQuery);
  url.searchParams.append('orientation', 'landscape');
  url.searchParams.append('content_filter', 'high');
  url.searchParams.append('per_page', '30');
  url.searchParams.append('client_id', accessKey);

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Accept-Version': 'v1'
      }
    });

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
    const validPhotos = data.results.filter(photo => 
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
  return `/animals/${animalName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
}

export async function getCountryFlag(countryCode: string): Promise<string> {
  try {
    return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
  } catch (error) {
    console.error('Error loading flag:', error);
    return '/default-flag.png';
  }
} 