<script>
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../../components/PuzzleGrid.svelte';
	import { highscoreStore } from '../../../lib/highscoreStore';
	import { animalList } from '../../../lib/animalList';
	import { fetchUnsplashImage } from '../../../lib/unsplash';

	let animal = '';
	let imageUrl = '';
	let currentAnimal;

	onMount(async () => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		animal = currentAnimal.name;

		const result = await fetchUnsplashImage(animal);
		imageUrl = result || '/static/default-animal.jpg';
	});
</script>

<PuzzleGrid
	{animal}
	{imageUrl}
	{highscoreStore}
	country={currentAnimal?.country || 'Deutschland'}
/>
