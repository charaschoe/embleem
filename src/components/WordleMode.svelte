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
			alert('Leider falsch. Versuche es nochmal!');
			guessedName = '';
		}
	}

	function saveHighscore() {
		if (!playerName.trim()) {
			alert('Bitte gib deinen Namen ein!');
			return;
		}

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

	<div class="game-container">
		<div class="input-section">
			<form on:submit={checkGuess}>
				<div class="input-group">
					<label for="player-name">Dein Name:</label>
					<input
						id="player-name"
						type="text"
						bind:value={playerName}
						placeholder="Name eingeben..."
						required
					/>
				</div>
				<div class="input-group">
					<label for="animal-guess">Welches Tier ist das?</label>
					<input
						id="animal-guess"
						type="text"
						bind:value={guessedName}
						placeholder="Tiername eingeben..."
						required
					/>
				</div>
				<button type="submit">Prüfen</button>
			</form>
		</div>

		<div class="grid" style="--cols: 3; background-image: url('{imageUrl}');">
			{#each Array(9) as _, index}
				<div class="tile {revealed[index] ? 'revealed' : ''}" on:click={() => revealTile(index)} />
			{/each}
		</div>

		<div class="counter-box">
			<p>Aufgedeckte Kacheln: {counter}/9</p>
		</div>
	</div>

	{#if isCorrect}
		<p class="success">
			Super gemacht {playerName}! Das Tier ist ein {correctAnimal}, das Nationaltier von {country}.
		</p>
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

	.game-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
	}

	.input-section {
		width: 100%;
		max-width: 400px;
		margin: 20px 0;
	}

	.input-group {
		margin-bottom: 15px;
		text-align: left;
	}

	.input-group label {
		display: block;
		margin-bottom: 5px;
		color: var(--jungle-text);
	}

	input {
		width: 100%;
		padding: 12px;
		border: 2px solid var(--jungle-primary);
		border-radius: 8px;
		font-size: 1.1rem;
	}

	button {
		width: 100%;
		padding: 12px;
		background-color: var(--jungle-primary);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	button:hover {
		background-color: var(--jungle-dark);
	}

	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		width: min(90vw, 400px);
		height: min(90vw, 400px);
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
</style>
