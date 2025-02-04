<!-- PuzzleGrid.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { getUnsplashImage } from '$lib/unsplash';

	export let animalList = [];
	export let correctAnimal = '';
	export let highscoreStore;
	export let country = '';

	let imageUrl = '';
	let revealed = Array(9).fill(false);
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;
	let showGame = false;

	const placeholderNames = [
		'Kleiner Panda',
		'Süße Giraffe',
		'Fröhlicher Pinguin',
		'Niedlicher Koala',
		'Bunter Papagei',
		'Sanfter Delfin',
		'Lustiger Otter',
		'Schlauer Fuchs',
		'Munteres Känguru',
		'Treuer Elefant'
	];

	function getRandomPlaceholder() {
		return placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
	}

	function generateRandomName() {
		playerName = getRandomPlaceholder();
	}

	function startGame() {
		if (!playerName.trim()) {
			alert('Bitte gib deinen Namen ein!');
			return;
		}
		showGame = true;
	}

	onMount(async () => {
		try {
			imageUrl = await getUnsplashImage(correctAnimal);
		} catch (error) {
			imageUrl = `/animals/${correctAnimal.toLowerCase()}.jpg`;
		}
	});

	function revealTile(index: number): void {
		if (!revealed[index]) {
			revealed[index] = true;
			counter++;
		}
	}

	function checkGuess(e: Event) {
		e.preventDefault();
		if (!guessedName.trim()) return;

		if (guessedName.toLowerCase().trim() === correctAnimal.toLowerCase()) {
			isCorrect = true;
			saveHighscore();
			triggerConfetti();
		} else {
			alert(`Nicht ganz richtig, ${playerName}. Versuche es nochmal!`);
			guessedName = '';
		}
	}

	function saveHighscore() {
		if (highscoreStore) {
			highscoreStore.update((scores) => [
				...scores,
				{
					name: playerName,
					mode: 'Puzzle',
					animal: correctAnimal,
					tiles: counter,
					date: new Date().toISOString()
				}
			]);
		}
	}

	function triggerConfetti() {
		confetti({
			spread: 100,
			startVelocity: 30,
			particleCount: 150,
			zIndex: 2147483646,
			origin: { x: 0.5, y: 0.5 }
		});
	}
</script>

<div class="puzzle-mode">
	<h1>Tier-Ratespiel</h1>

	<p class="hint">Finde das Nationaltier von {country}!</p>

	{#if !showGame}
		<div class="name-input-container">
			<p class="name-intro">
				Hallo kleiner Tierforscher! 🐾<br />
				Bevor wir auf Safari gehen, verrate mir doch deinen Namen.
			</p>

			<div class="input-group">
				<div class="input-with-button">
					<input type="text" bind:value={playerName} placeholder="Dein Name oder Tiername..." />
					<button class="name-generator" on:click={generateRandomName}>
						Zufälliger Tiername 🎲
					</button>
					<button class="start-button" on:click={startGame}> Auf zur Safari! 🦁 </button>
				</div>
			</div>
		</div>
	{:else}
		<div class="game-container">
			<p class="player-welcome">Los geht's, {playerName}!</p>

			<form on:submit={checkGuess}>
				<div class="input-group">
					<label for="animal-guess">Welches Tier ist das?</label>
					<input
						id="animal-guess"
						type="text"
						bind:value={guessedName}
						placeholder="Tiername eingeben..."
						required
					/>
					<button type="submit">Prüfen</button>
				</div>
			</form>

			<div class="grid" style="--cols: 3; background-image: url('{imageUrl}');">
				{#each Array(9) as _, index}
					<div
						class="tile {revealed[index] ? 'revealed' : ''}"
						on:click={() => revealTile(index)}
					/>
				{/each}
			</div>

			<div class="counter-box">
				<p>Aufgedeckte Kacheln: {counter}/9</p>
			</div>

			{#if isCorrect}
				<p class="success">
					Super gemacht {playerName}! Das Tier ist ein {correctAnimal}, das Nationaltier von {country}.
				</p>
			{/if}
		</div>
	{/if}
</div>

<style>
	.puzzle-mode {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		text-align: center;
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 15px;
		border: 3px solid var(--jungle-primary);
		box-shadow: 0 4px 15px var(--jungle-shadow);
	}

	.name-input-container {
		max-width: 500px;
		margin: 30px auto;
		padding: 20px;
		background-color: var(--jungle-light);
		border-radius: 10px;
	}

	.name-intro {
		font-size: 1.2rem;
		line-height: 1.6;
		color: var(--jungle-text);
		margin-bottom: 20px;
	}

	.input-with-button {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.name-generator {
		padding: 12px 24px;
		background-color: var(--jungle-secondary);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.name-generator:hover {
		background-color: var(--jungle-dark);
		transform: translateY(-2px);
	}

	.start-button {
		padding: 12px 24px;
		background-color: var(--jungle-primary);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.start-button:hover {
		background-color: var(--jungle-dark);
		transform: translateY(-2px);
	}

	.game-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
	}

	.input-group {
		margin-bottom: 15px;
	}

	input {
		padding: 12px;
		border: 2px solid var(--jungle-primary);
		border-radius: 8px;
		font-size: 1.1rem;
	}

	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		width: min(90vw, 400px);
		height: min(90vw, 400px);
		margin: 20px auto;
		background-size: cover;
		background-position: center;
		border: 3px solid var(--jungle-primary);
		border-radius: 10px;
		overflow: hidden;
	}

	.tile {
		background: rgba(0, 0, 0, 0.85);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.tile.revealed {
		background: transparent;
		pointer-events: none;
	}

	.counter-box {
		margin-top: 10px;
		font-size: 1.1rem;
		color: var(--jungle-text);
	}

	.success {
		margin-top: 20px;
		padding: 15px;
		background-color: var(--jungle-secondary);
		color: white;
		border-radius: 8px;
	}

	.hint {
		font-size: 1.2rem;
		margin: 15px 0;
		color: var(--jungle-text);
	}

	.player-welcome {
		font-size: 1.2rem;
		margin: 20px 0;
		color: var(--jungle-text);
	}
</style>
