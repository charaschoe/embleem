export interface NationalAnimal {
	name: string;
	country: string;
	scientific?: string;
	synonyms: string[];
	searchTerms: string;
	category: 'heraldic' | 'mythical' | 'mammal' | 'bird' | 'reptile';
}

const animalData: NationalAnimal[] = [
	{
		name: 'Bundesadler',
		country: 'Deutschland',
		synonyms: ['Adler', 'eagle', 'German eagle', 'federal eagle'],
		searchTerms: 'german federal eagle coat of arms black eagle',
		category: 'heraldic'
	},
	{
		name: 'Doppelköpfiger Adler',
		country: 'Albanien',
		synonyms: ['double-headed eagle', 'Albanian eagle', 'black eagle'],
		searchTerms: 'albanian double headed eagle black eagle coat of arms',
		category: 'heraldic'
	},
	{
		name: 'Weißer Adler',
		country: 'Polen',
		synonyms: ['white eagle', 'Polish eagle', 'Piast eagle'],
		searchTerms: 'polish white eagle coat of arms national symbol',
		category: 'heraldic'
	},
	{
		name: 'Leo Belgicus',
		country: 'Belgien',
		synonyms: ['Belgian Lion', 'Leo Belgicus', 'lion'],
		searchTerms: 'belgian lion heraldic leo belgicus national symbol',
		category: 'heraldic'
	},
	{
		name: 'Gallischer Hahn',
		country: 'Frankreich',
		synonyms: ['Gallic rooster', 'French rooster', 'coq gaulois'],
		searchTerms: 'french gallic rooster coq gaulois national emblem',
		category: 'heraldic'
	},
	{
		name: 'Weißkopfseeadler',
		country: 'USA',
		synonyms: ['Bald Eagle', 'American Eagle'],
		searchTerms: 'bald eagle american symbol -tree -plant -landscape',
		category: 'heraldic'
	},
	{
		name: 'Chinesischer Drache',
		country: 'China',
		synonyms: ['Chinese Dragon', 'imperial dragon'],
		searchTerms: 'chinese imperial dragon symbol -tree -plant -landscape',
		category: 'mythical'
	},
	{
		name: 'Walisischer Drache',
		country: 'Wales',
		synonyms: ['Welsh Dragon', 'Red Dragon', 'Y Ddraig Goch'],
		searchTerms: 'welsh red dragon flag symbol -cartoon',
		category: 'mythical'
	},
	{
		name: 'Schottisches Einhorn',
		country: 'Schottland',
		synonyms: ['Scottish Unicorn', 'royal unicorn', 'heraldic unicorn'],
		searchTerms: 'scottish royal unicorn heraldic symbol -cartoon',
		category: 'heraldic'
	},
	{
		name: 'Norwegischer Löwe',
		country: 'Norwegen',
		synonyms: ['Norwegian Lion', 'Nordic Lion', 'heraldic lion'],
		searchTerms: 'norwegian coat of arms lion heraldic',
		category: 'heraldic'
	},
	{
		name: 'Singapur Merlion',
		country: 'Singapur',
		synonyms: ['Merlion', 'Singapore Merlion', 'lion-fish'],
		searchTerms: 'singapore merlion statue symbol -toy',
		category: 'mythical'
	},
	{
		name: 'Schwedischer Löwe',
		country: 'Schweden',
		synonyms: ['Swedish Lion', 'Nordic Lion', 'heraldic lion', 'Tre Kronor'],
		searchTerms: 'swedish coat of arms lion heraldic',
		category: 'heraldic'
	},
	{
		name: 'Tschechischer Löwe',
		country: 'Tschechien',
		synonyms: ['Czech Lion', 'Bohemian Lion', 'heraldic lion', 'Český lev'],
		searchTerms: 'czech bohemian lion coat of arms',
		category: 'heraldic'
	},
	{
		name: 'Finnischer Löwe',
		country: 'Finnland',
		synonyms: ['Finnish Lion', 'Nordic Lion', 'heraldic lion', 'Suomen leijona'],
		searchTerms: 'finnish coat of arms lion heraldic',
		category: 'heraldic'
	},
	{
		name: 'Mexikanischer Adler',
		country: 'Mexiko',
		synonyms: ['Mexican Eagle', 'Golden Eagle', 'Águila Real', 'Aztec Eagle'],
		searchTerms: 'mexican coat of arms eagle snake cactus',
		category: 'heraldic'
	},
	{
		name: 'Sri-Lanka-Löwe',
		country: 'Sri Lanka',
		synonyms: ['Sri Lankan Lion', 'Sinhala Lion', 'Ceylon Lion'],
		searchTerms: 'sri lanka lion flag symbol national',
		category: 'heraldic'
	}
 ];

export const animalList: NationalAnimal[] = animalData;
