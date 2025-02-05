import type { Animal } from './types';

const FLAGCDN_BASE_URL = 'https://flagcdn.com';

interface UnsplashPhoto {
  urls: {
    regular: string;
  };
  black_and_white: boolean;
  color: string;
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
}

export async function fetchUnsplashImage(animal: Animal): Promise<string> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  
  // Erstelle eine kinderfreundliche Suchanfrage
  const baseQuery = animal.category === 'heraldic' 
    ? `${animal.name} symbol wappen`
    : `${animal.name} tier süß portrait`;

  // Füge zusätzliche Begriffe für bessere Ergebnisse hinzu
  const extraTerms = animal.category === 'heraldic'
    ? '-flagge -münze -geld'
    : 'schön fröhlich -gruselig -jagd -tot';

  const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(baseQuery)}&orientation=landscape&content_filter=high&per_page=10&client_id=${accessKey}&${extraTerms}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Unsplash API Fehler: ${response.status} ${response.statusText}`);
      return `/animals/${animal.name.toLowerCase().replace(' ', '-')}.jpg`;
    }

    const data = await response.json() as UnsplashResponse;
    if (data.results && data.results.length > 0) {
      // Versuche ein buntes, fröhliches Bild für Kinder zu finden
      const bestImages = data.results.filter((img: UnsplashPhoto) => 
        !img.black_and_white && 
        img.color !== '#000000' && 
        img.color !== '#FFFFFF'
      );
      
      const imagesToUse = bestImages.length > 0 ? bestImages : data.results;
      const randomIndex = Math.floor(Math.random() * Math.min(5, imagesToUse.length));
      return imagesToUse[randomIndex].urls.regular;
    } else {
      // Versuche es mit einer einfacheren Suche
      const fallbackQuery = `${animal.name} ${animal.category}`;
      const fallbackUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(fallbackQuery)}&orientation=landscape&content_filter=high&per_page=5&client_id=${accessKey}`;
      
      const fallbackResponse = await fetch(fallbackUrl);
      const fallbackData = await fallbackResponse.json() as UnsplashResponse;
      
      if (fallbackData.results && fallbackData.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * fallbackData.results.length);
        return fallbackData.results[randomIndex].urls.regular;
      }
      
      console.error('Kein passendes Bild gefunden');
      return `/animals/${animal.name.toLowerCase().replace(' ', '-')}.jpg`;
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Unsplash-API:', error);
    return `/animals/${animal.name.toLowerCase().replace(' ', '-')}.jpg`;
  }
}

export async function getCountryFlag(countryCode: string): Promise<string> {
  try {
    return `${FLAGCDN_BASE_URL}/w320/${countryCode.toLowerCase()}.png`;
  } catch (error) {
    console.error('Fehler beim Laden der Flagge:', error);
    return '/default-flag.png';
  }
} 