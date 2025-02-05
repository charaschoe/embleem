export interface AnimalKeywords {
  en: string[];
  de: string[];
}

export interface SearchStrategy {
  primary: string;
  secondary: string;
  filters: {
    orientation: 'portrait' | 'landscape' | 'squarish';
    color: 'black_and_white' | 'color';
  };
}

export interface AnimalMeta {
  conservationStatus: string;
  habitat: string;
  wikiLinks?: {
    en: string;
    de: string;
  };
}

export interface Animal {
  name: string;
  country: string;
  scientific: string;
  category: string;
  keywords: AnimalKeywords;
  synonyms: string[];
  searchStrategy: SearchStrategy;
  meta: AnimalMeta;
} 