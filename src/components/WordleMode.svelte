<script>
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { getCountryFlag } from '$lib/unsplash';

	export let animalList = [];
	export let correctAnimal = '';
	export let highscoreStore;
	export let country = '';

	let selectedAnimal = '';
	let feedback = '';
	let randomizedAnimalList = [];
	let clickedAnimals = new Set();
	let playerName = '';
	let countryFlag = '';

	function randomizeAnimalList(list) {
		return [...list].sort(() => Math.random() - 0.5);
	}

	onMount(async () => {
		randomizedAnimalList = randomizeAnimalList(animalList);
		// Get country flag
		if (country) {
			const countryCode = getCountryCode(country);
			countryFlag = await getCountryFlag(countryCode);
		}
	});

	function checkSelection(animal) {
		if (clickedAnimals.has(animal)) return;

		clickedAnimals.add(animal);
		selectedAnimal = animal;

		if (animal === correctAnimal) {
			feedback = 'Richtig! Du hast das Tier erraten.';
			triggerConfetti();
			saveHighscore();
			randomizedAnimalList = [];
		} else {
			feedback = 'Leider falsch. Versuche es erneut!';
		}
	}

	function triggerConfetti() {
		confetti({
			spread: 100,
			startVelocity: 30,
			particleCount: 150,
			zIndex: 2147483645,
			origin: { x: 0.5, y: 0.5 }
		});
	}

	function saveHighscore() {
		if (playerName.trim() === '') {
			alert('Bitte gib deinen Namen ein!');
			return;
		}

		if (highscoreStore) {
			highscoreStore.update((scores) => [
				...scores,
				{ name: playerName, mode: 'Wordle', correctAnimal }
			]);
			alert('Highscore gespeichert!');
		}
	}
</script>

<div class="wordle-mode">
	<h1>Tier-Ratespiel</h1>

	<div class="country-info">
		{#if countryFlag}
			<img src={countryFlag} alt="Flagge von {country}" class="country-flag" />
		{/if}
		<p>Finde das Nationaltier von {country}!</p>
	</div>

	<div class="input-container">
		<label for="player-name">Dein Name:</label>
		<input
			id="player-name"
			type="text"
			bind:value={playerName}
			placeholder="Name eingeben..."
			required
		/>
	</div>

	{#if randomizedAnimalList.length > 0}
		<div class="wordle-grid">
			{#each randomizedAnimalList as animal}
				<button
					class="animal-button {clickedAnimals.has(animal) ? 'clicked' : ''}"
					on:click={() => checkSelection(animal)}
				>
					{animal}
				</button>
			{/each}
		</div>
	{/if}

	{#if feedback}
		<p class="feedback">{feedback}</p>
	{/if}
</div>

<style>
	.wordle-mode {
		position: relative;
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

	.country-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		margin-bottom: 20px;
		padding: 10px;
		background-color: var(--jungle-light);
		border-radius: 8px;
	}

	.country-flag {
		width: 32px;
		height: auto;
		border: 1px solid var(--jungle-shadow);
		border-radius: 4px;
	}

	.input-container {
		margin-bottom: 20px;
	}

	input {
		padding: 12px;
		width: 100%;
		max-width: 300px;
		border: 2px solid var(--jungle-primary);
		border-radius: 8px;
		font-size: 1.1rem;
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

	.animal-button:hover {
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
</style>
