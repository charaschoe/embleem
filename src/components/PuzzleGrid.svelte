<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';

	export let highscoreStore;
	export let animal: string;
	export let rows = 3;
	export let cols = 3;
	export let imageUrl = '';
	export let country = '';

	let hint = '';
	let revealedTiles = Array(rows * cols).fill(false);
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;
	let guessedNameInput: HTMLInputElement;

	// Debug: Display internal animal name
	let debugAnimalName = `Internal Animal Name: ${animal}`;

	onMount(async () => {
		hint = 'Kannst du das Tier erraten? Decke die Kacheln auf!';
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			const response = await fetch(
				`https://api.unsplash.com/photos/random?query=${encodeURIComponent(animal)}%20national%20animal&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
				{ signal: controller.signal }
			);

			clearTimeout(timeoutId);
			const data = await response.json();
			imageUrl = data.urls.regular;
			guessedNameInput?.focus();
		} catch (error) {
			console.error('Error fetching image:', error);
			imageUrl = '/default-animal.jpg';
		}
	});

	function revealTile(index: number): void {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1;
		}
	}

	function checkGuess(e: Event) {
		e.preventDefault();
		if (!guessedName.trim()) return;

		if (guessedName.toLowerCase().trim() === animal.toLowerCase()) {
			isCorrect = true;
			triggerConfetti();
		} else {
			alert('Leider falsch. Versuche es nochmal!');
			guessedName = '';
			guessedNameInput?.focus();
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

	<!-- Debug Information -->
	<p class="debug-info">{debugAnimalName}</p>

	{#if !isCorrect}
		<div class="input-container">
			<form on:submit={checkGuess}>
				<label for="player-name">Dein Name:</label>
				<input
					id="player-name"
					type="text"
					bind:value={playerName}
					placeholder="Name eingeben..."
					required
				/>
				<label for="guessed-name">Welches Tier ist das?</label>
				<input
					id="guessed-name"
					type="text"
					bind:value={guessedName}
					bind:this={guessedNameInput}
					placeholder="Tiername eingeben..."
					required
				/>
				<button type="submit">Prüfen</button>
			</form>
		</div>
	{/if}

	<div class="counter-box">
		<p>Aufgedeckte Kacheln: {counter}/{rows * cols}</p>
	</div>

	<div class="grid" style="--cols: {cols}; background-image: url('{imageUrl}');">
		{#each revealedTiles as revealed, index}
			<div class="tile {revealed ? 'revealed' : ''}" on:click={() => revealTile(index)}></div>
		{/each}
	</div>

	{#if isCorrect}
		<p class="success">
			Super gemacht {playerName}! Das Tier ist ein {animal}, das Nationaltier von {country}.
		</p>
	{/if}
</div>

<style>
	.puzzle-mode {
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 15px;
		border: 3px solid var(--jungle-primary);
		box-shadow: 0 4px 15px var(--jungle-shadow);
		padding: 20px;
	}

	.input-container {
		background-color: var(--jungle-light);
		border-radius: 10px;
		padding: 15px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	input {
		padding: 12px;
		border: 2px solid #007bff;
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

	.success {
		background-color: var(--jungle-secondary);
		color: white;
	}

	button {
		padding: 12px;
		background-color: var(--jungle-primary);
		color: rgb(255, 255, 255);
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.1rem;
		transition: all 0.3s ease;
	}

	button:hover {
		background-color: var(--jungle-dark);
	}

	/* Debug Info Styling */
	.debug-info {
		color: red;
		font-style: italic;
		font-size: small;
		margin-bottom: 10px;
	}
</style>
