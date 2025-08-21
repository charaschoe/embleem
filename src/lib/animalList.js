export async function fetchUnsplashImage(query) {
	// Use secure server-side API proxy instead of direct API call
	const url = new URL('/api/unsplash', window.location.origin);
	url.searchParams.append('query', `${query} animal portrait`);
	url.searchParams.append('orientation', 'landscape');
	url.searchParams.append('content_filter', 'high');
	url.searchParams.append('per_page', '30');

	try {
		const response = await fetch(url.toString());
		if (!response.ok) {
			return getLocalImagePath(query);
		}

		const data = await response.json();
		const filteredResults = filterAnimalPortraits(data.results);

		if (filteredResults.length > 0) {
			const randomIndex = Math.floor(Math.random() * Math.min(5, filteredResults.length));
			return filteredResults[randomIndex].urls.regular;
		}

		return getLocalImagePath(query);
	} catch (error) {
		console.error('Error fetching Unsplash API:', error);
		return getLocalImagePath(query);
	}
}

function getLocalImagePath(query) {
	// Sanitize the query to prevent path traversal attacks
	const sanitizedQuery = query
		.replace(/[^a-zA-Z0-9\s-äöüßÄÖÜ]/g, '') // Remove potentially dangerous characters
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.toLowerCase()
		.substring(0, 50); // Limit length to prevent excessively long filenames

	if (!sanitizedQuery) {
		return '/animals/default.jpg'; // Fallback for empty/invalid names
	}

	return `/animals/${sanitizedQuery}.jpg`;
}

function filterAnimalPortraits(results) {
	return results.filter((photo) => {
		const tags = photo.tags.map((tag) => tag.title.toLowerCase());
		return (
			tags.includes('animal') &&
			tags.includes('wildlife') &&
			!tags.includes('landscape') &&
			!tags.includes('plant') &&
			!tags.includes('forest') &&
			photo.width >= 800 &&
			photo.height >= 800 &&
			photo.blur_hash
		);
	});
}

export const animalList = [
	{
		name: 'Bundesadler',
		country: 'Deutschland',
		scientific: 'Aquila federalis',
		category: 'heraldic',
		keywords: {
			en: ['federal eagle', 'german eagle', 'coat of arms'],
			de: ['bundesadler', 'wappen', 'reichsadler']
		},
		synonyms: ['Adler', 'eagle', 'German eagle', 'federal eagle'],
		searchStrategy: {
			primary: 'german federal eagle coat of arms',
			secondary: 'bundesadler wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Bundesadler_(Deutschland)',
				en: 'Coat_of_arms_of_Germany'
			}
		}
	},
	{
		name: 'Doppelköpfiger Adler',
		country: 'Albanien',
		scientific: 'Aquila bicephalus',
		category: 'heraldic',
		keywords: {
			en: ['double-headed eagle', 'albanian eagle', 'coat of arms'],
			de: ['doppelköpfiger adler', 'albanischer adler', 'wappen']
		},
		synonyms: ['double-headed eagle', 'Albanian eagle', 'black eagle'],
		searchStrategy: {
			primary: 'albanian double headed eagle coat of arms',
			secondary: 'albanischer doppeladler wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Albanischer_Adler',
				en: 'Albanian_eagle'
			}
		}
	},
	{
		name: 'Weißer Adler',
		country: 'Polen',
		scientific: 'Aquila alba',
		category: 'heraldic',
		keywords: {
			en: ['white eagle', 'polish eagle', 'coat of arms'],
			de: ['weißer adler', 'polnischer adler', 'wappen']
		},
		synonyms: ['white eagle', 'Polish eagle', 'Piast eagle'],
		searchStrategy: {
			primary: 'polish white eagle coat of arms',
			secondary: 'polnischer weißer adler wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Polens',
				en: 'Coat_of_arms_of_Poland'
			}
		}
	},
	{
		name: 'Leo Belgicus',
		country: 'Belgien',
		scientific: 'Leo belgicus',
		category: 'heraldic',
		keywords: {
			en: ['belgian lion', 'leo belgicus', 'coat of arms'],
			de: ['belgischer löwe', 'leo belgicus', 'wappen']
		},
		synonyms: ['Belgian Lion', 'Leo Belgicus', 'lion'],
		searchStrategy: {
			primary: 'belgian lion leo belgicus coat of arms',
			secondary: 'belgischer löwe wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Leo_Belgicus',
				en: 'Leo_Belgicus'
			}
		}
	},
	{
		name: 'Gallischer Hahn',
		country: 'Frankreich',
		scientific: 'Gallus gallicus',
		category: 'heraldic',
		keywords: {
			en: ['gallic rooster', 'french rooster', 'coat of arms'],
			de: ['gallischer hahn', 'französischer hahn', 'wappen']
		},
		synonyms: ['Gallic rooster', 'French rooster', 'coq gaulois'],
		searchStrategy: {
			primary: 'french gallic rooster coat of arms',
			secondary: 'gallischer hahn wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Gallischer_Hahn',
				en: 'Gallic_rooster'
			}
		}
	},
	{
		name: 'Weißkopfseeadler',
		country: 'USA',
		scientific: 'Haliaeetus leucocephalus',
		category: 'heraldic',
		keywords: {
			en: ['bald eagle', 'american eagle', 'coat of arms'],
			de: ['weißkopfseeadler', 'amerikanischer adler', 'wappen']
		},
		synonyms: ['Bald Eagle', 'American Eagle'],
		searchStrategy: {
			primary: 'american bald eagle coat of arms',
			secondary: 'weißkopfseeadler wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_der_Vereinigten_Staaten',
				en: 'Great_Seal_of_the_United_States'
			}
		}
	},
	{
		name: 'Chinesischer Drache',
		country: 'China',
		scientific: 'Draco sinensis',
		category: 'mythical',
		keywords: {
			en: ['chinese dragon', 'imperial dragon', 'coat of arms'],
			de: ['chinesischer drache', 'kaiserlicher drache', 'wappen']
		},
		synonyms: ['Chinese Dragon', 'imperial dragon'],
		searchStrategy: {
			primary: 'chinese imperial dragon emblem',
			secondary: 'chinesischer drache symbol',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'cultural symbol',
			habitat: 'mythical',
			wikiLinks: {
				de: 'Chinesischer_Drache',
				en: 'Chinese_dragon'
			}
		}
	},
	{
		name: 'Walisischer Drache',
		country: 'Wales',
		scientific: 'Draco cambrensis',
		category: 'mythical',
		keywords: {
			en: ['welsh dragon', 'red dragon', 'coat of arms'],
			de: ['walisischer drache', 'roter drache', 'wappen']
		},
		synonyms: ['Welsh Dragon', 'Red Dragon', 'Y Ddraig Goch'],
		searchStrategy: {
			primary: 'welsh red dragon coat of arms',
			secondary: 'walisischer drache wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'mythical',
			wikiLinks: {
				de: 'Walisischer_Drache',
				en: 'Welsh_Dragon'
			}
		}
	},
	{
		name: 'Schottisches Einhorn',
		country: 'Schottland',
		scientific: 'Unicornus scoticus',
		category: 'heraldic',
		keywords: {
			en: ['scottish unicorn', 'royal unicorn', 'coat of arms'],
			de: ['schottisches einhorn', 'königliches einhorn', 'wappen']
		},
		synonyms: ['Scottish Unicorn', 'royal unicorn', 'heraldic unicorn'],
		searchStrategy: {
			primary: 'scottish royal unicorn coat of arms',
			secondary: 'schottisches einhorn wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Schottlands',
				en: 'Royal_coat_of_arms_of_Scotland'
			}
		}
	},
	{
		name: 'Norwegischer Löwe',
		country: 'Norwegen',
		scientific: 'Leo norvegicus',
		category: 'heraldic',
		keywords: {
			en: ['norwegian lion', 'nordic lion', 'coat of arms'],
			de: ['norwegischer löwe', 'nordischer löwe', 'wappen']
		},
		synonyms: ['Norwegian Lion', 'Nordic Lion', 'heraldic lion'],
		searchStrategy: {
			primary: 'norwegian coat of arms lion',
			secondary: 'norwegischer löwe wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Norwegens',
				en: 'Coat_of_arms_of_Norway'
			}
		}
	},
	{
		name: 'Singapur Merlion',
		country: 'Singapur',
		scientific: 'Leo marinus singapurensis',
		category: 'mythical',
		keywords: {
			en: ['merlion', 'singapore merlion', 'coat of arms'],
			de: ['merlion', 'singapur merlion', 'wappen']
		},
		synonyms: ['Merlion', 'Singapore Merlion', 'lion-fish'],
		searchStrategy: {
			primary: 'singapore merlion emblem',
			secondary: 'singapur merlion symbol',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'mythical',
			wikiLinks: {
				de: 'Merlion',
				en: 'Merlion'
			}
		}
	},
	{
		name: 'Schwedischer Löwe',
		country: 'Schweden',
		scientific: 'Leo suecicus',
		category: 'heraldic',
		keywords: {
			en: ['swedish lion', 'nordic lion', 'coat of arms'],
			de: ['schwedischer löwe', 'nordischer löwe', 'wappen']
		},
		synonyms: ['Swedish Lion', 'Nordic Lion', 'heraldic lion', 'Tre Kronor'],
		searchStrategy: {
			primary: 'swedish coat of arms lion',
			secondary: 'schwedischer löwe wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Schwedens',
				en: 'Coat_of_arms_of_Sweden'
			}
		}
	},
	{
		name: 'Finnischer Löwe',
		country: 'Finnland',
		scientific: 'Leo finnicus',
		category: 'heraldic',
		keywords: {
			en: ['finnish lion', 'nordic lion', 'coat of arms'],
			de: ['finnischer löwe', 'nordischer löwe', 'wappen']
		},
		synonyms: ['Finnish Lion', 'Nordic Lion', 'heraldic lion', 'Suomen leijona'],
		searchStrategy: {
			primary: 'finnish coat of arms lion',
			secondary: 'finnischer löwe wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Finnlands',
				en: 'Coat_of_arms_of_Finland'
			}
		}
	},
	{
		name: 'Mexikanischer Adler',
		country: 'Mexiko',
		scientific: 'Aquila mexicana',
		category: 'heraldic',
		keywords: {
			en: ['mexican eagle', 'golden eagle', 'coat of arms'],
			de: ['mexikanischer adler', 'goldadler', 'wappen']
		},
		synonyms: ['Mexican Eagle', 'Golden Eagle', 'Águila Real', 'Aztec Eagle'],
		searchStrategy: {
			primary: 'mexican coat of arms eagle snake',
			secondary: 'mexikanischer adler wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Mexikos',
				en: 'Coat_of_arms_of_Mexico'
			}
		}
	},
	{
		name: 'Sri-Lanka-Löwe',
		country: 'Sri Lanka',
		scientific: 'Leo ceylanicus',
		category: 'heraldic',
		keywords: {
			en: ['sri lankan lion', 'sinhala lion', 'coat of arms'],
			de: ['sri-lanka-löwe', 'singhalesischer löwe', 'wappen']
		},
		synonyms: ['Sri Lankan Lion', 'Sinhala Lion', 'Ceylon Lion'],
		searchStrategy: {
			primary: 'sri lanka lion coat of arms',
			secondary: 'sri-lanka-löwe wappen',
			filters: {
				orientation: 'landscape',
				color: 'color'
			}
		},
		meta: {
			conservationStatus: 'national symbol',
			habitat: 'heraldic',
			wikiLinks: {
				de: 'Wappen_Sri_Lankas',
				en: 'Coat_of_arms_of_Sri_Lanka'
			}
		}
	}
];
