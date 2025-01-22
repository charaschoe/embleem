<script>
	import { onMount } from 'svelte';

	// Props für die Tierliste und den korrekten Tiernamen
	export let animalList = [];
	export let correctAnimal = '';

	let selectedAnimal = '';
	let feedback = '';
	let randomizedAnimalList = [];
	let clickedAnimals = new Set(); // Speichert angeklickte Tiere

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
		} else {
			feedback = 'Leider falsch. Versuche es erneut!';
		}
	}
</script>

<div class="wordle-container">
	<h1>Tier-Ratespiel</h1>

	<!-- Grid-Layout für die Tiere -->
	<div class="wordle-grid">
		{#each randomizedAnimalList as animal}
			<button
				class="animal-button {clickedAnimals.has(animal)
					? animal === correctAnimal
						? 'correct'
						: 'wrong'
					: ''}"
				on:click={() => checkSelection(animal)}
				disabled={clickedAnimals.has(animal)}
			>
				{animal}
			</button>
		{/each}
	</div>

	<!-- Feedback für die Auswahl -->
	{#if feedback}
		<p class="feedback">{feedback}</p>
	{/if}
</div>

<style>
	wordle-container {
		text-align: center;
		margin-top: 20px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.wordle-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Dynamische Spaltenanzahl */
		gap: 20px; /* Abstand zwischen Buttons */
		padding: 20px; /* Padding um das Grid */
		justify-items: center; /* Zentriert die Buttons horizontal */
	}

	.animal-button {
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		background-color: #f0f0f0;
		border-radius: 5px;
		border: 1px solid #ccc;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}

	.animal-button:hover:not(:disabled) {
		background-color: #dcdcdc;
	}

	.animal-button.correct {
		background-color: #d4edda; /* Grün für richtige Auswahl */
		color: #155724;
	}

	.animal-button.wrong {
		background-color: #f8d7da; /* Rot für falsche Auswahl */
		color: #721c24;
	}

	.animal-button:disabled {
		cursor: not-allowed;
		opacity: 0.6; /* Ausgegraut */
	}

	.feedback {
		font-size: 18px;
		margin-top: 15px;
		color: green;
	}

	@media (max-width: 768px) {
		.animal-button {
			font-size: 14px;
			padding: 8px 16px;
		}
	}

	@media (max-width: 480px) {
		.animal-button {
			font-size: 12px;
			padding: 6px 12px;
		}
	}
</style>
