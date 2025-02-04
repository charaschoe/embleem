export async function fetchUnsplashImage(query) {
	const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
	const apiUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}%20animal%20portrait&orientation=landscape&content_filter=high&per_page=30&client_id=${accessKey}`;

	try {
		const response = await fetch(apiUrl);
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
	return `/animals/${query.toLowerCase().replace(' ', '-')}.jpg`;
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
		synonyms: ['Adler', 'eagle', 'German eagle', 'federal eagle'],
		searchTerms: 'german federal eagle coat of arms black eagle'
	},
	{
		name: 'Doppelköpfiger Adler',
		country: 'Albanien',
		synonyms: ['double-headed eagle', 'Albanian eagle', 'black eagle'],
		searchTerms: 'albanian double headed eagle black eagle coat of arms'
	},
	{
		name: 'Weißer Adler',
		country: 'Polen',
		synonyms: ['white eagle', 'Polish eagle', 'Piast eagle'],
		searchTerms: 'polish white eagle coat of arms national symbol'
	},
	{
		name: 'Leo Belgicus',
		country: 'Belgien',
		synonyms: ['Belgian Lion', 'Leo Belgicus', 'lion'],
		searchTerms: 'belgian lion heraldic leo belgicus national symbol'
	},
	{
		name: 'Bengalischer Tiger',
		country: 'Indien',
		synonyms: ['Bengal tiger', 'Indian tiger', 'royal Bengal tiger'],
		searchTerms: 'bengal tiger india orange black stripes'
	},
	{
		name: 'Malaiischer Tiger',
		country: 'Malaysia',
		synonyms: ['Malayan tiger', 'Malaysian tiger', 'tiger'],
		searchTerms: 'malayan tiger malaysia panthera tigris jacksoni'
	},
	{
		name: 'Druk',
		country: 'Bhutan',
		synonyms: ['thunder dragon', 'Bhutanese dragon', 'dragon'],
		searchTerms: 'bhutan thunder dragon druk white dragon national symbol'
	},
	{
		name: 'Gallischer Hahn',
		country: 'Frankreich',
		synonyms: ['Gallic rooster', 'French rooster', 'coq gaulois'],
		searchTerms: 'french gallic rooster coq gaulois national emblem'
	},
	{
		name: 'Quetzal',
		country: 'Guatemala',
		synonyms: ['resplendent quetzal', 'Guatemalan quetzal', 'quetzal'],
		searchTerms: 'resplendent quetzal guatemala green bird national'
	},
	{
		name: 'Komodo-Drache',
		country: 'Indonesien',
		synonyms: ['Komodo dragon', 'Indonesian dragon', 'monitor lizard'],
		searchTerms: 'komodo dragon indonesia large lizard monitor'
	},
	{
		name: 'Markhor',
		country: 'Pakistan',
		synonyms: ['screw-horned goat', 'Pakistani markhor', 'wild goat'],
		searchTerms: 'markhor pakistan wild goat spiral horns'
	},
	{
		name: 'Springbock',
		country: 'Südafrika',
		synonyms: ['springbok', 'South African springbok', 'antelope'],
		searchTerms: 'springbok south africa antelope jumping'
	},
	{
		name: 'Steppenzebra',
		country: 'Botswana',
		synonyms: ['plains zebra', 'Botswana zebra', 'zebra'],
		searchTerms: 'plains zebra botswana black white stripes'
	},
	{
		name: 'Kuh',
		country: 'Nepal',
		synonyms: ['cow', 'sacred cow', 'Nepalese cow'],
		searchTerms: 'sacred cow nepal hindu religious symbol'
	},
	{
		name: 'Königlicher Löwe',
		country: 'England',
		synonyms: ['Royal Lion', 'English Lion', 'lion rampant'],
		searchTerms: 'english royal lion heraldic coat of arms -tree -plant',
		category: 'heraldic'
	},
	{
		name: 'Russischer Bär',
		country: 'Russland',
		synonyms: ['Russian Bear', 'brown bear', 'Eurasian bear'],
		searchTerms: 'russian brown bear national symbol -tree -plant',
		category: 'mammal'
	},
	{
		name: 'Känguru',
		country: 'Australien',
		synonyms: ['kangaroo', 'red kangaroo', 'Australian kangaroo'],
		searchTerms: 'australian red kangaroo -tree -plant -landscape',
		category: 'mammal'
	},
	{
		name: 'Andenkondor',
		country: 'Chile',
		synonyms: ['Andean Condor', 'vultur gryphus'],
		searchTerms: 'andean condor chile national bird -tree -plant',
		category: 'bird'
	},
	{
		name: 'Chinesischer Drache',
		country: 'China',
		synonyms: ['Chinese Dragon', 'imperial dragon'],
		searchTerms: 'chinese imperial dragon symbol -tree -plant -landscape',
		category: 'mythical'
	},
	{
		name: 'Weißkopfseeadler',
		country: 'USA',
		synonyms: ['Bald Eagle', 'American Eagle'],
		searchTerms: 'bald eagle american symbol -tree -plant -landscape',
		category: 'bird'
	},
	{
		name: 'Kiwi',
		country: 'Neuseeland',
		synonyms: ['New Zealand Kiwi', 'flightless bird'],
		searchTerms: 'new zealand kiwi bird -fruit -tree -plant',
		category: 'bird'
	},
	{
		name: 'Kanadischer Biber',
		country: 'Kanada',
		synonyms: ['Canadian Beaver', 'North American beaver'],
		searchTerms: 'canadian beaver national symbol -tree -plant',
		category: 'mammal'
	},
	{
		name: 'Irischer Hirsch',
		country: 'Irland',
		synonyms: ['Irish Deer', 'Celtic Deer'],
		searchTerms: 'irish deer celtic symbol -tree -plant -landscape',
		category: 'heraldic'
	}
];
