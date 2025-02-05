<script lang="ts">
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../../components/PuzzleGrid.svelte';
	import { highscoreStore } from '../../../lib/highscoreStore.js';
	import { animalList } from '../../../lib/animalList.js';
	import { fetchUnsplashImage } from '../../../lib/unsplash';
	import type { Animal } from '../../../lib/types';

	let currentAnimal: Animal | undefined;
	let imageUrl = '';

	onMount(async () => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		if (currentAnimal) {
			imageUrl = await fetchUnsplashImage(currentAnimal);
		}
	});
</script>

<PuzzleGrid
	animal={currentAnimal?.name}
	{imageUrl}
	highscore={highscoreStore}
	country={currentAnimal?.country}
/>
