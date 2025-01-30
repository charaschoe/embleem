<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti'; // Confetti-Bibliothek

	export let highscoreStore;
	export let animal: string;
	export let rows = 3;
	export let cols = 3;
	export let imageUrl = '';

	let hint = '';
	let revealedTiles = Array(rows * cols).fill(false);
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;

	// Lädt das Bild und den Hinweis beim Mounten der Komponente
	onMount(async () => {
		hint = 'Dieses Tier kannst du erraten!';
		imageUrl = '/static/default-animal.jpg';
	});

	function revealTile(index: number): void {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1; // Erhöhe den Zähler bei jedem Klick
		}
	}

	function checkGuess() {
		if (guessedName.toLowerCase().trim() === animal.toLowerCase()) {
			isCorrect = true;
			triggerConfetti(); // Confetti auslösen
		} else {
			alert('Leider falsch. Versuche es erneut!');
		}
	}

	function triggerConfetti() {
		confetti({
			spread: 100,
			startVelocity: 30,
			particleCount: 150,
			zIndex: 9999,
			origin: { x: 0.5, y: 0.5 }
		});
	}
</script>

<div class="puzzle-container">
	<h1>Tier-Ratespiel</h1>

	<!-- Eingabefelder -->
	<div class="input-container">
		<label for="player-name">Wie heißt du?</label>
		<input
			id="player-name"
			type="text"
			bind:value={playerName}
			placeholder="Deinen Namen hier eingeben..."
		/>

		<label for="guessed-name">Welches Tier siehst du?</label>
		<input
			id="guessed-name"
			type="text"
			bind:value={guessedName}
			placeholder="Tiernamen hier eingeben..."
		/>
		<button on:click={checkGuess}>Antwort prüfen</button>
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
	{#if isCorrect}
		<p class="success">Super gemacht! Das Tier ist ein {animal}.</p>
	{/if}
</div>

<style>
	.puzzle-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		text-align: center;
	}

	h1 {
		font-size: 3rem; /* Größerer Titel für Kinder */
		color: #333;
		margin-bottom: 30px;
	}

	/* Eingabefelder */
	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px; /* Abstand zwischen den Feldern */
		margin-bottom: 30px;
	}

	.input-container label {
		font-size: 1.5rem; /* Größere Schriftgröße */
		font-weight: bold;
		color: #555;
	}

	.input-container input {
		width: 350px; /* Breitere Eingabefelder */
		padding: 15px; /* Größere Polsterung */
		font-size: 1.5rem; /* Größere Schriftgröße */
		border-radius: 10px; /* Abgerundete Ecken */
		border: 2px solid #ccc; /* Dickere Umrandung */
		text-align: center;
	}

	.input-container button {
		padding: 15px 30px; /* Größerer Button */
		font-size: 1.5rem; /* Größere Schriftgröße */
		cursor: pointer;
		background-color: #007bff;
		color: white;
		border-radius: 10px; /* Abgerundete Ecken */
		border: none;
	}

	.input-container button:hover {
		background-color: #0056b3;
	}

	/* Dynamische Anzeige der Versuche */
	.counter-box p {
		font-size: 1rem; /* Korrigierte Syntax */
		color: #333;
		margin-top: 10px; /* Korrigierte Syntax */
		text-align: center;
	}

	/* Puzzle-Grid */
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr); /* Korrigierte Syntax */
		width: 300px; /* Korrigierte Syntax */
		height: 300px; /* Korrigierte Syntax */
		gap: 5px;
		margin-top: 20px;
		text-align: center;
	}

	.tile {
		width: auto;
		height: auto;
		background-color: #ccc;
		cursor: pointer;
		border-radius: 4px;
	}

	.tile.revealed {
		background-color: transparent;
		pointer-events: none;
	}

	/* Erfolgsanzeige */
	.success {
		color: #28a745;
		font-size: 1.6rem;
		font-weight: bold;
		margin-top: 20px;
		text-align: center;
	}
</style>
