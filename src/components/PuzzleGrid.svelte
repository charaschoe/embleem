<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '../lib/unsplash.js';
	import { animalList } from '../lib/animalList.js';

	export let highscoreStore;
	export let animal: string;
	export let rows = 3;
	export let cols = 3;
	export let imageUrl = '';

	let hint = '';
	let revealedTiles = Array(rows * cols).fill(false);
	let guessedName = '';
	let isCorrect = false;
	let playerName = '';
	let counter = 0; // Anzahl der Versuche/Klicks
	let countryInfo = null;

	// Lädt das Bild und den Hinweis beim Mounten der Komponente
	onMount(async () => {
		const result = await fetchUnsplashImage(animal);
		if (result) {
			imageUrl = result;

			const animalData = animalList.find((a) => a.name.toLowerCase() === animal.toLowerCase());
			hint =
				animalData?.description ||
				'Dieses Tier kann man in der Natur finden. Schau dir seine Merkmale genau an!';

			countryInfo = {
				country: animalData?.country || 'Unbekannt',
				coatOfArms: animalData?.coatOfArms || '/static/default-coat-of-arms.png'
			};
		} else {
			imageUrl = '/static/default-animal.jpg';
			hint = 'Keine Hinweise verfügbar.';
		}
	});

	function revealTile(index: number): void {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1; // Erhöhe den Zähler bei jedem Klick
		}
	}

	function checkGuess() {
		if (playerName.trim() === '') {
			alert('Bitte gib deinen Namen ein!');
			return;
		}

		const animalData = animalList.find((a) => a.name.toLowerCase() === animal.toLowerCase());
		if (animalData) {
			isCorrect = animalData.synonyms.some(
				(synonym) => guessedName.toLowerCase().trim() === synonym.toLowerCase().trim()
			);
		} else {
			isCorrect = false;
		}

		if (isCorrect) {
			saveHighscore();
			alert(`Richtig! Das Tier ist ein ${animal}.`);
		} else {
			alert('Leider falsch. Versuche es erneut!');
		}
	}

	function saveHighscore() {
		if (playerName.trim() === '') {
			alert('Bitte gib deinen Namen ein!');
			return;
		}

		highscoreStore.update((scores) => [...scores, { name: playerName, moves: counter }]);

		alert('Highscore gespeichert!');
		resetGame();
	}

	function resetGame() {
		revealedTiles = Array(rows * cols).fill(false);
		counter = 0;
		playerName = '';
		isCorrect = false;
		countryInfo = null;
	}
</script>

<div class="puzzle-container">
	<!-- Spielername -->
	<div class="input-container">
		<label for="player-name">Dein Name:</label>
		<input
			id="player-name"
			type="text"
			bind:value={playerName}
			placeholder="Name eingeben..."
			required
		/>
		{#if playerName.trim() === ''}
			<p class="error">Bitte gib deinen Namen ein!</p>
		{/if}
	</div>

	<!-- Tiername für Testzwecke -->
	<div class="test-animal-name">
		<p><strong>Tiername (für Tests):</strong> {animal}</p>
	</div>

	<!-- Dynamische Anzeige der Versuche -->
	<div class="counter-box">
		<p>Aufgedeckte Kacheln: {counter}/{rows * cols}</p>
	</div>

	<!-- Puzzle -->
	<div
		class="grid"
		style="--cols: {cols}; background-image: url({imageUrl}); background-size: cover; background-position: center;"
	>
		{#each revealedTiles as revealed, index}
			<div class="tile {revealed ? 'revealed' : ''}" on:click={() => revealTile(index)}></div>
		{/each}
	</div>

	<!-- Ergebnisanzeige -->
	{#if isCorrect && countryInfo}
		<div class="country-info">
			<p>Das Tier gehört zu {countryInfo.country}.</p>
			<img src={countryInfo.coatOfArms} alt="Wappen von {countryInfo.country}" width="100" />
		</div>
	{/if}

	<!-- Eingabefeld -->
	<div class="guess-box">
		<input
			type="text"
			placeholder="Tiernamen eingeben..."
			bind:value={guessedName}
			on:keydown={(event) => event.key === 'Enter' && checkGuess()}
		/>
		<button on:click={checkGuess}>Überprüfen</button>
	</div>
</div>

<style>
	.puzzle-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 300px;
		margin: 0 auto;
	}

	label {
		font-weight: bold;
		display: block;
		margin-bottom: 0.5rem;
		text-align: center;
	}

	input {
		margin-bottom: 1rem;
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
	}

	button {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		width: 300px;
		height: 300px;
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

	.error {
		color: red;
		font-size: 0.9rem;
		margin-top: 0.5rem;
	}

	.counter-box p {
		font-size: 1rem;
		color: #333333; /* Optional für bessere Sichtbarkeit */
		margin-top: 10px;
	}
</style>
