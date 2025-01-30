<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';

	export let highscoreStore;
	export let animal: string;
	export let rows = 3;
	export let cols = 3;
	export let imageUrl = '';
	export let country = ''; // Neues Feld für das Land

	let hint = '';
	let revealedTiles = Array(rows * cols).fill(false);
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;

	onMount(async () => {
		hint = 'Kannst du das Tier erraten? Decke die Kacheln auf!';
		imageUrl = '/static/default-animal.jpg';
	});

	function revealTile(index: number): void {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1;
		}
	}

	function checkGuess() {
		if (guessedName.toLowerCase().trim() === animal.toLowerCase()) {
			isCorrect = true;
			triggerConfetti();
		} else {
			alert('Leider falsch. Versuche es nochmal!');
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
		<p class="success">Super gemacht! Das Tier ist ein {animal}, das Nationaltier von {country}.</p>
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
		font-size: 2.5rem;
		color: #2c3e50;
		margin-bottom: 20px;
	}

	.input-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 15px;
		margin-bottom: 20px;
	}

	.input-container label {
		font-size: 1.2rem;
		font-weight: bold;
		color: #555;
	}

	.input-container input {
		width: 300px;
		padding: 10px;
		font-size: 1.2rem;
		border-radius: 5px;
		border: 1px solid #ccc;
		text-align: center;
	}

	.input-container button {
		padding: 10px 20px;
		font-size: 1.2rem;
		cursor: pointer;
		background-color: #007bff;
		color: white;
		border-radius: 5 px;
		border: none;
	}

	.input-container button:hover {
		background-color: #0056b3;
	}

	.counter-box p {
		font-size: 1 rem;
		color: #333;
		margin-top: 10 px;
		text-align: center;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(var(--cols), 1 fr);
		width: 300 px;
		height: 300 px;
		gap: 5 px;
		margin-top: 20 px;
		text-align: center;
	}

	.tile.revealed {
		background-color: transparent;
		pointer-events: none;
	}

	.success {
		color: #28a745;
		font-size: 1 rem;
		font-weight: bold;
		margin-top: 15 px;
		text-align: center;
	}
</style>
