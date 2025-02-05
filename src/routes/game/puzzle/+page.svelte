<script lang="ts">
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../../components/PuzzleGrid.svelte';
	import { highscoreStore } from '../../../lib/highscoreStore.js';
	import { animalList, fetchUnsplashImage } from '../../../lib/animalList.js';

	let currentAnimal;
	let imageUrl = '';

	onMount(async () => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		imageUrl = await fetchUnsplashImage(currentAnimal.searchTerms);
	});
</script>

<PuzzleGrid
	animal={currentAnimal?.name}
	{imageUrl}
	highscore={highscoreStore}
	country={currentAnimal?.country}
/>
