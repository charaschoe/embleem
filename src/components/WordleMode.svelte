<script lang="ts">
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { animalList as fullAnimalList } from '../lib/animalList';

	export let correctAnimal = '';
	export let highscoreStore;
	export let country = '';
	export let imageUrl = '';

	let playerName = '';
	let showGame = false;
	let selectedAnimal = '';
	let feedback = '';
	let randomizedAnimalList = [];
	let clickedAnimals = new Set();
	let isCorrect = false;
	let revealed = Array(9).fill(false);
	let counter = 0;
	let countdown = 4;
	let showCountdown = false;
	let points = 100;

	const placeholderNames = [
		// Niedliche Tiernamen
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

		// Safari-Thema
		'Safari Scout',
		'Dschungel Entdecker',
		'Tierfreund',
		'Naturkenner',
		'Tierspürer',
		'Waldläufer',
		'Savannen Guide',

		// Fantasievolle Tierkombinationen
		'Tiger-Täubchen',
		'Löwen-Lämmchen',
		'Bären-Bienchen',
		'Affen-Äffchen',
		'Zebra-Zwerglein',
		'Panda-Prinz',
		'Giraffen-Glück',

		// Lustige Tiereigenschaften
		'Hüpfender Hase',
		'Tanzender Tiger',
		'Lachender Löwe',
		'Springender Spatz',
		'Watschelnder Wattwurm',
		'Rollender Regenwurm',
		'Purzelnder Pinguin',

		// Naturthemen
		'Waldwichtel',
		'Wiesenwanderer',
		'Blumenfreund',
		'Baumkletterer',
		'Naturentdecker',
		'Regenbogensammler',
		'Sternegucker',

		// Märchenhafte Namen
		'Zauberwald-Freund',
		'Märchentier',
		'Fabelwesen',
		'Geschichtenerzähler',
		'Traumtänzer',
		'Glückspilz',
		'Sonnenschein'
	];

	function generateRandomName() {
		playerName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
	}

	function calculateScore() {
		const attemptPenalty = clickedAnimals.size * 10;
		const tilePenalty = counter * 5;
		return Math.max(0, points - attemptPenalty - tilePenalty);
	}

	function startGame() {
		if (!playerName.trim()) {
			alert('Bitte gib deinen Namen ein!');
			return;
		}
		randomizedAnimalList = fullAnimalList.map((a) => a.name).sort(() => Math.random() - 0.5);
		showGame = true;
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
		clickedAnimals.clear();
		revealed = Array(9).fill(false);
		counter = 0;
		points = 100;
		feedback = '';
		randomizedAnimalList = fullAnimalList.map((a) => a.name).sort(() => Math.random() - 0.5);
	}

	function revealTile(index: number): void {
		if (!revealed[index]) {
			revealed[index] = true;
			counter++;
		}
	}

	function checkSelection(animal) {
		if (clickedAnimals.has(animal)) return;

		clickedAnimals.add(animal);
		selectedAnimal = animal;

		if (animal === correctAnimal) {
			isCorrect = true;
			const finalScore = calculateScore();
			feedback = `Super gemacht ${playerName}! Du hast das richtige Tier gefunden! Deine Punktzahl: ${finalScore}`;
			saveHighscore(finalScore);
			triggerConfetti();
			setTimeout(() => {
				startCountdown();
			}, 2000);
		} else {
			feedback = `Nicht ganz richtig, ${playerName}. Versuche es nochmal! (-10 Punkte)`;
		}
	}

	function saveHighscore(score: number) {
		if (highscoreStore) {
			highscoreStore.update((scores) => [
				...scores,
				{
					name: playerName,
					mode: 'Wordle',
					animal: correctAnimal,
					attempts: clickedAnimals.size,
					tiles: counter,
					score: score,
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

	onMount(async () => {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			const response = await fetch(
				`https://api.unsplash.com/photos/random?query=${encodeURIComponent(correctAnimal)}%20national%20animal&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
				{ signal: controller.signal }
			);

			clearTimeout(timeoutId);
			const data = await response.json();
			imageUrl = data.urls.regular;
		} catch (error) {
			console.error('Error fetching image:', error);
			imageUrl = '/default-animal.jpg';
		}
	});
</script>

<div class="wordle-mode">
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
			<div class="score-display">
				Aktuelle Punktzahl: {points - clickedAnimals.size * 10 - counter * 5}
			</div>

			<div class="grid" style="--cols: 3; background-image: url('{imageUrl}');">
				{#each Array(9) as _, index}
					<div
						class="tile {revealed[index] ? 'revealed' : ''}"
						on:click={() => revealTile(index)}
					/>
				{/each}
			</div>

			<div class="wordle-grid">
				{#each randomizedAnimalList as animal}
					<button
						class="animal-button {clickedAnimals.has(animal) ? 'clicked' : ''}"
						on:click={() => checkSelection(animal)}
						disabled={clickedAnimals.has(animal) || isCorrect}
					>
						{animal}
					</button>
				{/each}
			</div>

			{#if feedback}
				<p class="feedback" class:success={isCorrect}>
					{feedback}
					{#if isCorrect}
						<br />
						<span class="attempts">Du hast {clickedAnimals.size} Versuche gebraucht.</span>
					{/if}
				</p>
			{/if}

			{#if showCountdown}
				<div class="countdown-container">
					<p class="countdown-text">Neues Spiel in</p>
					<div class="countdown-number">{countdown}</div>
					<p class="countdown-text">Sekunden</p>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.wordle-mode {
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

	.wordle-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
		padding: 20px;
	}

	.animal-button {
		padding: 15px;
		font-size: 1.1rem;
		background: var(--jungle-light);
		border: 2px solid var(--jungle-primary);
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		color: var(--jungle-text);
	}

	.animal-button:hover:not(:disabled) {
		background: var(--jungle-secondary);
		color: white;
		transform: translateY(-2px);
	}

	.animal-button.clicked {
		background: var(--jungle-dark);
		color: white;
		cursor: not-allowed;
	}

	.feedback {
		font-size: 1.2rem;
		margin-top: 20px;
		padding: 15px;
		border-radius: 8px;
		background: var(--jungle-secondary);
		color: white;
	}

	.feedback.success {
		background: var(--jungle-primary);
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

	.score-display {
		font-size: 1.2rem;
		color: var(--jungle-primary);
		margin: 10px 0;
		font-weight: bold;
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
		animation: fadeIn 0.5s ease;
	}

	.countdown-number {
		font-size: 4rem;
		font-weight: bold;
		color: var(--jungle-primary);
		margin: 1rem 0;
		animation: pulse 1s infinite;
	}

	.countdown-text {
		font-size: 1.2rem;
		margin: 0;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
