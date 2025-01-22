<script>
	import { onMount } from 'svelte';
	import PuzzleGrid from '../../components/PuzzleGrid.svelte';
	import WordleMode from '../../components/WordleMode.svelte';
	import { highscoreStore } from '../../lib/highscoreStore.js';
	import { animalList } from '../../lib/animalList.js';
	import { fetchUnsplashImage } from '../../lib/unsplash.js';

	let animal = 'Elefant'; // Beispiel-Tier
	let isWordleMode = false; // Toggle für den Modus
	let imageUrl = ''; // URL des Tierbildes
	let rows = 3;
	let cols = 3;
	let revealedTiles = Array(rows * cols).fill(false);

	// Bild laden
	onMount(async () => {
		const result = await fetchUnsplashImage(animal);
		imageUrl = result || '/static/default-animal.jpg'; // Fallback-Bild
	});

	function revealTile(index) {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
		}
	}
</script>

<div class="game-container">
	<h1>Tier-Ratespiel</h1>

	<!-- Modus-Umschalter -->
	<div class="mode-toggle">
		<button on:click={() => (isWordleMode = !isWordleMode)}>
			{isWordleMode ? 'Zum Puzzle-Modus wechseln' : 'Zum Wordle-Modus wechseln'}
		</button>
	</div>

	<!-- Gemeinsame Kachelbox -->
	<div
		class="grid"
		style="--cols: {cols}; background-image: url({imageUrl}); background-size: cover; background-position: center;"
	>
		{#each revealedTiles as revealed, index}
			<div class="tile {revealed ? 'revealed' : ''}" on:click={() => revealTile(index)}></div>
		{/each}
	</div>

	<!-- Dynamischer Bereich unter der Kachelbox -->
	<div class="dynamic-content">
		{#if !isWordleMode}
			<!-- Puzzle-Modus -->
			<div class="puzzle-mode">
				<label for="player-name">Dein Name:</label>
				<input id="player-name" type="text" placeholder="Name eingeben..." />
				<p>Tiername (für Tests): {animal}</p>
				<p>Aufgedeckte Kacheln: {revealedTiles.filter((tile) => tile).length}/{rows * cols}</p>
			</div>
		{:else}
			<!-- Wordle-Modus -->
			<WordleMode animalList={animalList.map((a) => a.name)} correctAnimal={animal} />
		{/if}
	</div>
</div>

<style>
	game-container {
		text-align: center;
		margin-top: 20px;
	}

	.mode-toggle button {
		padding: 10px;
		font-size: 16px;
		cursor: pointer;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		margin-bottom: 20px;
	}

	button:hover {
		background-color: #0056b3;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		width: 300px;
		height: 300px;
		margin: 0 auto; /* Zentriert die Kachelbox */
		border: 1px solid #ccc;
		background-color: #f9f9f9;
	}

	.tile {
		width: 100%;
		height: 100%;
		background-color: gray; /* Startfarbe der Kacheln */
		cursor: pointer;
		transition: background-color 0.3s ease-in-out; /* Animation für die Hintergrundfarbe */
	}

	.tile.revealed {
		background-color: transparent; /* Transparent, um das Bild darunter sichtbar zu machen */
		pointer-events: none; /* Deaktiviert weitere Klicks auf aufgedeckte Kacheln */
	}

	.dynamic-content {
		margin-top: 20px; /* Abstand zwischen Kachelbox und dynamischem Bereich */
	}

	.puzzle-mode input {
		margin-top: 10px;
		padding: 10px;
		font-size: 16px;
	}
</style>
