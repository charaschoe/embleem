import type { Animal } from './types';

interface UnsplashPhoto {
	urls: {
		regular: string;
	};
	description: string | null;
	alt_description: string | null;
	tags: Array<{ title: string }>;
	color: string;
	black_and_white: boolean;
}

// Keywords that should not appear in heraldic animal images
const NEGATIVE_KEYWORDS = [
	'toy',
	'plush',
	'stuffed',
	'cartoon',
	'drawing',
	'illustration',
	'statue',
	'sculpture',
	'mural',
	'graffiti',
	'tattoo',
	'costume',
	'mask',
	'puppet',
	'doll',
	'figurine',
	'photo',
	'wildlife',
	'nature',
	'zoo',
	'farm',
	'real',
	'living',
	'wild',
	'pet'
];

// Required keywords for heraldic animals
const REQUIRED_KEYWORDS = [
	'coat of arms',
	'heraldic',
	'emblem',
	'crest',
	'shield',
	'banner',
	'symbol',
	'wappen'
];

export function validateImage(description: string, animal: Animal): boolean {
	if (!description) return false;

	const descriptionLower = description.toLowerCase();
	const animalNameLower = animal.name.toLowerCase();

	// Basic validation - check if animal name is in description
	if (descriptionLower.includes(animalNameLower)) return true;

	// For heraldic animals, check for related terms
	if (animal.category === 'heraldic') {
		const heraldicTerms = ['coat of arms', 'emblem', 'shield', 'heraldic', 'symbol', 'flag'];
		return heraldicTerms.some((term) => descriptionLower.includes(term));
	}

	return false;
}

export function buildSearchQuery(animal: Animal): string {
	if (animal.category === 'heraldic') {
		return `${animal.name} coat of arms emblem heraldic`;
	}
	return `${animal.name} animal portrait`;
}

export function getAnimalHint(animal: Animal): string {
	if (!animal || animal.category !== 'heraldic') return '';

	const hints: Record<string, string> = {
		Bundesadler: 'Dieses Wappentier ist ein schwarzer Adler mit ausgebreiteten Schwingen.',
		'Doppelköpfiger Adler': 'Dieses Wappentier ist ein schwarzer Adler mit zwei Köpfen.',
		'Weißer Adler': 'Dieses Wappentier ist ein weißer Adler mit goldener Krone.',
		'Leo Belgicus': 'Dieses Wappentier ist ein aufrecht stehender Löwe.',
		'Gallischer Hahn': 'Dieses Wappentier ist ein stolzer Hahn in den Nationalfarben.',
		Weißkopfseeadler: 'Dieses Wappentier ist ein Adler mit weißem Kopf und gelben Schnabel.',
		'Schottisches Einhorn': 'Dieses Wappentier ist ein weißes Einhorn mit goldener Kette.',
		'Norwegischer Löwe': 'Dieses Wappentier ist ein goldener Löwe mit Axt und Krone.',
		'Schwedischer Löwe': 'Dieses Wappentier ist ein goldener Löwe zwischen drei Kronen.',
		'Tschechischer Löwe': 'Dieses Wappentier ist ein weißer Löwe mit zwei Schwänzen und Krone.',
		'Finnischer Löwe': 'Dieses Wappentier ist ein goldener Löwe mit Schwert und Krone.',
		'Mexikanischer Adler': 'Dieses Wappentier ist ein Adler mit einer Schlange im Schnabel.',
		'Sri-Lanka-Löwe': 'Dieses Wappentier ist ein goldener Löwe mit Schwert in der Pranke.'
	};

	return (
		hints[animal.name] ||
		`Dieses Wappentier ist ein wichtiges heraldisches Symbol von ${animal.country}.`
	);
}
