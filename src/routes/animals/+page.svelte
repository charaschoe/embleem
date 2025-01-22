<script>
	import { onMount } from 'svelte';

	let animals = [];
	let filter = 'all'; // Standardfilter: Zeige alle
	let isLoading = true;

	// API-Aufruf, um Nationaltiere und Wappen zu laden
	async function fetchAnimals() {
		try {
			const response = await fetch(
				'https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&prop=extracts|pageimages&exintro&explaintext&piprop=thumbnail&pithumbsize=100&titles=National_animal'
			);
			const data = await response.json();
			const pages = data.query.pages;

			// Extrahiere relevante Daten aus der API-Antwort
			animals = Object.values(pages).map((page) => ({
				country: page.title,
				description: page.extract,
				image: page.thumbnail?.source || '/static/default-coat-of-arms.png'
			}));
		} catch (error) {
			console.error('Fehler beim Abrufen der Nationaltiere:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(fetchAnimals);

	// Gefilterte Tiere basierend auf dem aktuellen Filter
	$: filteredAnimals =
		filter === 'all' ? animals : animals.filter((animal) => animal.country.includes(filter));
</script>

<h1>Nationaltiere und Wappen</h1>
<p>Hier findest du eine Liste der Nationaltiere und ihre zugehörigen Länder sowie Wappen.</p>

<!-- Filter -->
<div class="filter">
	<label for="filter">Filter:</label>
	<select id="filter" bind:value={filter}>
		<option value="all">Alle</option>
		{#each animals as animal (animal.country)}
			<option value={animal.country}>{animal.country}</option>
		{/each}
	</select>
</div>

<!-- Grid -->
{#if isLoading}
	<p>Daten werden geladen...</p>
{:else if filteredAnimals.length > 0}
	<div class="grid">
		{#each filteredAnimals as animal}
			<div class="card">
				<img src={animal.image} alt="Wappen von {animal.country}" />
				<h2>{animal.country}</h2>
				<p>{animal.description}</p>
			</div>
		{/each}
	</div>
{:else}
	<p>Keine Daten verfügbar.</p>
{/if}

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1rem;
	}

	.filter {
		margin-bottom: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
	}

	.card {
		border: 1px solid #ccc;
		padding: 16px;
		text-align: center;
		border-radius: 8px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
	}

	.card:hover {
		transform: scale(1.05);
	}

	img {
		width: auto;
		height: 100px;
		margin-bottom: 8px;
		object-fit: cover;
		border-radius: 4px;
	}
</style>
