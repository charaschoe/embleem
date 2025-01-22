<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '../lib/unsplash.js';
	import { animalList } from '../lib/animalList.js';

	export let animal: string;
	export let rows = 3;
	export let cols = 3;
	export let imageUrl = '';
	let hint = '';
	let revealedTiles = Array(rows * cols).fill(false);
	let guessedName = '';
	let isCorrect = false;
	export let counter = 0;

	// Lädt das Bild und den Hinweis beim Mounten der Komponente
	onMount(async () => {
		const result = await fetchUnsplashImage(animal);
		if (result) {
			imageUrl = result;
			const animalData = animalList.find((a) => a.name.toLowerCase() === animal.toLowerCase());
			hint =
				animalData?.description ||
				'Dieses Tier kann man in der Natur finden. Schau dir seine Merkmale genau an!';
		} else {
			imageUrl = '/static/default-animal.jpg';
			hint = 'Keine Hinweise verfügbar.';
		}
	});

	// Funktion zum Aufdecken einer Kachel
	function revealTile(index: number): void {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1;
		}
	}

	// Funktion zur Überprüfung der Benutzereingabe
	function checkGuess() {
		const animalData = animalList.find((a) => a.name.toLowerCase() === animal.toLowerCase());
		if (animalData) {
			isCorrect = animalData.synonyms.some(
				(synonym) => guessedName.toLowerCase().trim() === synonym.toLowerCase().trim()
			);
		} else {
			isCorrect = false;
		}
	}
</script>

<!-- Puzzle-Container -->
<div class="puzzle-container">
	<div
		class="grid"
		style="--cols: {cols}; background-image: url({imageUrl}); background-size: cover; background-position: center;"
	>
		{#each revealedTiles as revealed, index}
			<div
				class="tile {revealed ? 'revealed' : ''}"
				on:click={() => revealTile(index)}
			></div>
		{/each}
	</div>

	<!-- Hinweisbox -->
	<div class="hint-box">
		<p><strong>Hinweis:</strong> {hint}</p>
	</div>
</div>

<!-- Eingabefeld für die Benutzereingabe -->
<div class="guess-box">
	<input type="text" placeholder="Tiernamen eingeben..." bind:value={guessedName} />
	<button on:click={checkGuess}>Überprüfen</button>
</div>

<!-- Ergebnisanzeige -->
{#if isCorrect}
	<p class="success">Richtig! Das Tier ist ein {animal}.</p>
{:else if guessedName}
	<p class="error">Leider falsch. Versuche es erneut!</p>
{/if}

<style>
	puzzle-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 300px;
        margin: 0 auto;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(var(--cols), 1fr);
        width: 300px;
        height: 300px;
        margin: auto;
        background-size: cover;
        background-position: center;
    }

    .tile {
        width: 100%;
        height: 100%;
        background-color: gray; /* Startfarbe der Kacheln */
        cursor: pointer;
        border: 1px solid #000; /* Optional für sichtbare Trennung */
    }

    .tile.revealed {
        background-color: transparent; /* Transparent, um den Container-Hintergrund sichtbar zu machen */
    }

    .hint-box {
        margin-top: 15px;
    }

    .guess-box {
        margin-top: 20px;
    }

    .success {
        color: green;
    }

    .error {
        color: red;
    }
</style>
