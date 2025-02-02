<script>
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../components/PuzzleGrid.svelte';
	import WordleMode from '../../components/WordleMode.svelte';
	import { highscoreStore } from '../../lib/highscoreStore.js';
	import { animalList } from '../../lib/animalList.js';
	import { fetchUnsplashImage } from '../../lib/unsplash.js';

	let animal = 'Elefant';
	let isWordleMode = false;
	let imageUrl = '';
	let rows = 3;
	let cols = 3;

	onMount(async () => {
		const result = await fetchUnsplashImage(animal);
		imageUrl = result || '/static/default-animal.jpg';
	});
</script>

<div class="game-container">
	<h1>Tier-Ratespiel</h1>

	<div class="mode-toggle">
		<button on:click={() => (isWordleMode = !isWordleMode)}>
			{isWordleMode ? 'Zum Puzzle-Modus wechseln' : 'Zum Wordle-Modus wechseln'}
		</button>
	</div>

	<div class="game-content">
		{#if !isWordleMode}
			<PuzzleGrid {animal} {rows} {cols} {imageUrl} {highscoreStore} country="Deutschland" />
		{:else}
			<WordleMode
				animalList={animalList.map((a) => a.name)}
				correctAnimal={animal}
				{highscoreStore}
			/>
		{/if}
	</div>
</div>

<style>
	.game-container {
		position: relative;
		isolation: isolate;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.mode-toggle {
		position: relative;
		z-index: 100;
		margin-bottom: 30px;
		text-align: center;
	}

	.mode-toggle button {
		padding: 12px 24px;
		font-size: 1.1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.mode-toggle button:hover {
		background-color: #0056b3;
	}

	.game-content {
		position: relative;
		z-index: 1;
	}

	h1 {
		text-align: center;
		color: #2c3e50;
		margin-bottom: 30px;
	}
</style>
