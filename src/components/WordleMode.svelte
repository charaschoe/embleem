<script>
	import { onMount } from 'svelte';

	// Props für die Tierliste und den korrekten Tiernamen
	export let animalList = [];
	export let correctAnimal = '';
	export let highscoreStore;

	let selectedAnimal = '';
	let feedback = '';
	let randomizedAnimalList = [];
	let clickedAnimals = new Set(); // Speichert angeklickte Tiere
	let playerName = ''; // Spielername

	// Funktion zum Randomisieren der Tierliste
	function randomizeAnimalList(list) {
		return [...list].sort(() => Math.random() - 0.5);
	}

	// Liste der Tiere randomisieren beim Laden
	onMount(() => {
		randomizedAnimalList = randomizeAnimalList(animalList);
	});

	// Überprüfen, ob das ausgewählte Tier korrekt ist
	function checkSelection(animal) {
		if (clickedAnimals.has(animal)) return; // Überspringen, wenn bereits angeklickt

		clickedAnimals.add(animal);
		selectedAnimal = animal;

		if (animal === correctAnimal) {
			feedback = 'Richtig! Du hast das Tier erraten.';
			triggerConfetti(); // Confetti auslösen
			saveHighscore(); // Highscore speichern
			randomizedAnimalList = []; // Alle Buttons entfernen
		} else {
			feedback = 'Leider falsch. Versuche es erneut!';
		}
	}

	// Confetti-Animation auslösen
	function triggerConfetti() {
		import('canvas-confetti').then((module) => {
			const confetti = module.default;
			confetti({
				spread: 100,
				startVelocity: 30,
				particleCount: 150,
				zIndex: 9999,
				origin: { x: 0.5, y: 0.5 }
			});
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

<div class="wordle-container">
	<h1>Tier-Ratespiel</h1>

	<!-- Namenseingabe -->
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

	<!-- Grid-Layout für die Tiere -->
	{#if randomizedAnimalList.length > 0}
		<div class="wordle-grid">
			{#each randomizedAnimalList as animal}
				<button class="animal-button" on:click={() => checkSelection(animal)}>
					{animal}
				</button>
			{/each}
		</div>
	{/if}

	<!-- Feedback für die Auswahl -->
	{#if feedback}
		<p class="feedback">{feedback}</p>
	{/if}
</div>

<style>
	.wordle-container {
		text-align: center;
		margin-top: 20px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.input-container input {
		margin-bottom: 15px;
		padding: 8px;
		font-size: 16px;
		width: calc(100% - 20px);
		max-width: 400px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.wordle-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 15px;
		padding: 20px;
	}

	.animal-button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		background-color: #f0f0f0;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.feedback {
		font-size: 18px;
		margin-top: 15px;
		color: green;
	}
</style>
