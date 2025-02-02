<script>
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';

	export let animalList = [];
	export let correctAnimal = '';
	export let highscoreStore;

	let selectedAnimal = '';
	let feedback = '';
	let randomizedAnimalList = [];
	let clickedAnimals = new Set();
	let playerName = '';

	function randomizeAnimalList(list) {
		return [...list].sort(() => Math.random() - 0.5);
	}

	onMount(() => {
		randomizedAnimalList = randomizeAnimalList(animalList);
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
	}

	.input-container {
		margin-bottom: 20px;
	}

	input {
		padding: 12px;
		width: 100%;
		max-width: 300px;
		border: 2px solid #007bff;
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
		background: #f0f0f0;
		border: 2px solid #007bff;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.animal-button:hover {
		background: #e0e0e0;
	}

	.animal-button.clicked {
		background: #ccc;
		cursor: not-allowed;
	}

	.feedback {
		font-size: 1.2rem;
		margin-top: 20px;
		padding: 15px;
		border-radius: 8px;
		background: rgba(40, 167, 69, 0.1);
		color: #28a745;
	}
</style>
