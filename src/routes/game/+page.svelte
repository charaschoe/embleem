<script>
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../components/PuzzleGrid.svelte';
	import WordleMode from '../../components/WordleMode.svelte';
	import { highscoreStore } from '../../lib/highscoreStore.js';
	import { animalList } from '../../lib/animalList.js';
	import { fetchUnsplashImage } from '../../lib/unsplash.js';

	let animal = '';
	let isWordleMode = false;
	let imageUrl = '';
	let rows = 3;
	let cols = 3;
	let currentAnimal;

	onMount(async () => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		animal = currentAnimal.name;
		
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
			<PuzzleGrid 
				{animal} 
				{rows} 
				{cols} 
				{imageUrl} 
				{highscoreStore} 
				country={currentAnimal?.country || 'Deutschland'} 
			/>
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
		background-color: var(--jungle-light);
	}

	.mode-toggle {
		position: relative;
		z-index: 2147483647;
		margin-bottom: 30px;
		text-align: center;
		background-color: var(--jungle-light);
		padding: 10px;
		border-radius: 8px;
		box-shadow: 0 2px 4px var(--jungle-shadow);
	}

	.mode-toggle button {
		padding: 12px 24px;
		font-size: 1.1rem;
		background-color: var(--jungle-primary);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		z-index: 2147483647;
	}

	.mode-toggle button:hover {
		background-color: var(--jungle-dark);
		transform: translateY(-2px);
	}

	.mode-toggle button:active {
		transform: translateY(0);
	}

	.game-content {
		position: relative;
		z-index: 1;
	}

	h1 {
		text-align: center;
		color: var(--jungle-text);
		margin-bottom: 30px;
		font-size: 2.5rem;
		text-shadow: 2px 2px 4px var(--jungle-shadow);
	}
</style>
