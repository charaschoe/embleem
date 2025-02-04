<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { animalList } from '../lib/animalList';

	export let highscoreStore;
	export let animal: string;
	export let imageUrl = '';
	export let country = '';

	// Spielzustand
	let hint = '';
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;
	let guessedNameInput: HTMLInputElement;
	let showGame = false;
	let countdown = 4;
	let showCountdown = false;
	let difficulty = 'medium';
	let lastScore: number | null = null;

	// Schwierigkeitskonfiguration
	let rows = 3;
	let cols = 3;
	let points = 100;
	let pointPenalty = 5;
	let revealedTiles = Array(rows * cols).fill(false);

	$: {
		switch (difficulty) {
			case 'easy':
				rows = 4;
				cols = 4;
				points = 150;
				pointPenalty = 3;
				revealedTiles = Array(16).fill(false);
				if (!showGame) {
					const randomIndices = Array.from({ length: 16 }, (_, i) => i)
						.sort(() => Math.random() - 0.5)
						.slice(0, 2);
					randomIndices.forEach((i) => (revealedTiles[i] = true));
				}
				break;
			case 'medium':
				rows = 3;
				cols = 3;
				points = 100;
				pointPenalty = 5;
				revealedTiles = Array(9).fill(false);
				break;
			case 'hard':
				rows = 2;
				cols = 2;
				points = 75;
				pointPenalty = 10;
				revealedTiles = Array(4).fill(false);
				break;
		}
	}

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
		'Treuer Elefant',
		'Safari Scout',
		'Dschungel Entdecker',
		'Tierfreund',
		'Naturkenner',
		'Tierspürer',
		'Waldläufer',
		'Savannen Guide'
	];

	function calculateScore() {
		const tilePenalty = counter * pointPenalty;
		return Math.max(0, points - tilePenalty);
	}

	function startGame() {
		if (!playerName.trim()) {
			alert('Bitte gib deinen Namen ein!');
			return;
		}
		showGame = true;
	}

	function generateRandomName() {
		playerName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
	}

	function saveHighscore(score: number) {
		if (highscoreStore) {
			lastScore = score;
			highscoreStore.update((scores) => [
				...scores,
				{
					name: playerName,
					mode: 'Puzzle',
					animal: animal,
					tiles: counter,
					difficulty: difficulty,
					score: score,
					date: new Date().toISOString()
				}
			]);
		}
	}

	function startCountdown() {
		showCountdown = true;
		const timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer);
				resetGame();
			}
		}, 1000);
	}

	function resetGame() {
		showCountdown = false;
		countdown = 4;
		isCorrect = false;
		revealedTiles = Array(rows * cols).fill(false);
		counter = 0;
		points = difficulty === 'easy' ? 150 : difficulty === 'medium' ? 100 : 75;
	}

	onMount(async () => {
		hint = 'Kannst du das Tier erraten? Decke die Kacheln auf!';
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			const response = await fetch(
				`https://api.unsplash.com/photos/random?query=${encodeURIComponent(animal)}%20animal%20portrait&orientation=landscape&content_filter=high&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
				{ signal: controller.signal }
			);

			clearTimeout(timeoutId);
			const data = await response.json();
			imageUrl = data.urls.regular;
			guessedNameInput?.focus();
		} catch (error) {
			console.error('Error fetching image:', error);
			imageUrl = `/animals/${animal.toLowerCase().replace(' ', '-')}.jpg`;
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

		const guess = guessedName.toLowerCase().trim();
		const currentAnimal = animalList.find((a) => a.name === animal);

		const isCorrectGuess =
			currentAnimal?.synonyms.includes(guess) ||
			guess === animal.toLowerCase() ||
			guess === currentAnimal?.name.toLowerCase();

		if (isCorrectGuess) {
			isCorrect = true;
			const finalScore = calculateScore();
			saveHighscore(finalScore);
			triggerConfetti();
			setTimeout(() => {
				startCountdown();
			}, 2000);
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
	<p class="hint">Finde das Nationaltier von {country}!</p>

	{#if !showGame}
		<div class="name-input-container">
			<div class="welcome-box">
				<h2>Hallo kleiner Tierforscher! 🔍</h2>
				<p class="name-intro">Bevor wir auf Safari gehen, verrate mir doch deinen Namen.</p>
			</div>

			<div class="input-group">
				<div class="input-with-button">
					<input
						type="text"
						bind:value={playerName}
						placeholder="Dein Name oder Tiername..."
						class="name-input"
					/>
					<button class="name-generator" on:click={generateRandomName}>
						Zufälliger Tiername 🎲
					</button>
				</div>
			</div>

			<div class="difficulty-box">
				<h3>Wähle deinen Schwierigkeitsgrad:</h3>
				<div class="difficulty-options">
					<button
						class="difficulty-button {difficulty === 'easy' ? 'active' : ''}"
						on:click={() => (difficulty = 'easy')}
					>
						Leicht 🌱
						<span class="difficulty-info">4x4 Raster, mehr Punkte</span>
					</button>
					<button
						class="difficulty-button {difficulty === 'medium' ? 'active' : ''}"
						on:click={() => (difficulty = 'medium')}
					>
						Mittel 🌿
						<span class="difficulty-info">3x3 Raster</span>
					</button>
					<button
						class="difficulty-button {difficulty === 'hard' ? 'active' : ''}"
						on:click={() => (difficulty = 'hard')}
					>
						Schwer 🌳
						<span class="difficulty-info">2x2 Raster, weniger Punkte</span>
					</button>
				</div>
			</div>

			<div class="tutorial-box">
				<h3>Wie wird gespielt? 📖</h3>
				<ul>
					<li>Decke die Kacheln auf, um das Tier zu sehen</li>
					<li>Je weniger Kacheln du aufdeckst, desto mehr Punkte bekommst du</li>
					<li>Versuche das Nationaltier zu erraten</li>
				</ul>
			</div>

			{#if lastScore}
				<div class="last-score">
					Dein letztes Spiel: {lastScore} Punkte
				</div>
			{/if}

			<button class="safari-button" on:click={startGame}> Auf zur Safari! 🦁 </button>
		</div>
	{:else}
		<p class="player-welcome">Los geht's, {playerName}!</p>
		<div class="score-display">Aktuelle Punktzahl: {calculateScore()}</div>

		<div class="input-container">
			<form on:submit={checkGuess}>
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
				Super gemacht {playerName}! Das Tier ist ein {animal}, das Nationaltier von {country}. Deine
				Punktzahl: {calculateScore()}
			</p>
		{/if}

		{#if showCountdown}
			<div class="countdown-container">
				<p class="countdown-text">Neues Spiel in</p>
				<div class="countdown-number">{countdown}</div>
				<p class="countdown-text">Sekunden</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.puzzle-mode {
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 15px;
		border: 3px solid var(--jungle-primary);
		box-shadow: 0 4px 15px var(--jungle-shadow);
		padding: 20px;
		max-width: 600px;
		margin: 20px auto;
	}

	.name-input-container {
		margin: 30px auto;
		padding: 20px;
		background-color: var(--jungle-light);
		border-radius: 10px;
	}

	.welcome-box {
		background-color: var(--jungle-primary);
		color: white;
		padding: 1.5rem;
		border-radius: 10px;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.name-intro {
		font-size: 1.2rem;
		line-height: 1.6;
		color: white;
		margin-bottom: 20px;
	}

	.input-with-button {
		display: flex;
		gap: 10px;
		flex-wrap: wrap;
		justify-content: center;
		margin: 1rem 0;
	}

	.name-input {
		width: 100%;
		max-width: 300px;
		padding: 12px;
		border: 2px solid var(--jungle-primary);
		border-radius: 8px;
		font-size: 1.1rem;
		background-color: white;
	}

	.name-generator {
		padding: 12px 24px;
		background-color: var(--jungle-secondary);
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.safari-button {
		background-color: var(--jungle-primary);
		color: white;
		padding: 12px 24px;
		border: none;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
		max-width: 300px;
		margin-top: 1rem;
	}

	.difficulty-box {
		margin: 2rem 0;
		padding: 1.5rem;
		background: white;
		border-radius: 15px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.difficulty-options {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 1rem;
	}

	.difficulty-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		border: 2px solid var(--jungle-primary);
		border-radius: 10px;
		background: white;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 120px;
	}

	.difficulty-button.active {
		background: var(--jungle-primary);
		color: white;
	}

	.difficulty-info {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		opacity: 0.8;
	}

	.tutorial-box {
		background-color: var(--jungle-light);
		padding: 1rem;
		border-radius: 8px;
		margin: 1rem 0;
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

	.countdown-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.9);
		padding: 2rem;
		border-radius: 15px;
		color: white;
		z-index: 2147483647;
		text-align: center;
	}

	@media (max-width: 600px) {
		.input-with-button {
			flex-direction: column;
		}

		.name-input {
			max-width: 100%;
		}
	}
</style>
