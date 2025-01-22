<script>
	import { onMount } from 'svelte';

	let animals = [];
	let filter = ''; // Filtertext
	let isLoading = true;
	let errorMessage = '';

	// Funktion, um alle Tiere zu laden (mit Pagination)
	async function fetchAllAnimals() {
		const limit = 10; // Maximale Anzahl von Ergebnissen pro Anfrage
		let offset = 0;
		let hasMore = true;

		try {
			while (hasMore) {
				const response = await fetch(`https://api.api-ninjas.com/v1/animals?offset=${offset}`, {
					headers: { 'X-Api-Key': 'J9h/6yC9ckxAbUK0p/9LFw==mgxejoWHqJOtyLcU' }
				});

				if (!response.ok) {
					errorMessage = `Fehler beim Abrufen der Tiere: ${response.statusText}`;
					console.error(errorMessage);
					break;
				}

				const data = await response.json();

				if (data.length === 0) {
					hasMore = false; // Keine weiteren Ergebnisse
				} else {
					animals = [
						...animals,
						...data.map((animal) => ({
							name: animal.name,
							taxonomy: animal.taxonomy || 'Keine Taxonomie verfügbar',
							image: animal.image_link || '/static/default-coat-of-arms.png',
							location: animal.locations?.join(', ') || 'Unbekannt'
						}))
					];
					offset += limit; // Nächste Seite laden
				}
			}
		} catch (error) {
			errorMessage = 'Ein Fehler ist aufgetreten. Bitte überprüfe deine API-Konfiguration.';
			console.error('Fehler beim Abrufen der Tiere:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(fetchAllAnimals);

	// Gefilterte Tiere basierend auf dem aktuellen Filter
	$: filteredAnimals = filter
		? animals.filter(
				(animal) =>
					animal.name.toLowerCase().includes(filter.toLowerCase()) ||
					animal.location.toLowerCase().includes(filter.toLowerCase())
			)
		: animals;
</script>

<h1>Nationaltiere und Wappen</h1>
<p>Hier findest du eine Liste der Nationaltiere und ihre zugehörigen Länder sowie Wappen.</p>

<!-- Filter -->
<div class="filter">
	<label for="filter">Filter:</label>
	<input id="filter" type="text" placeholder="Land oder Tier eingeben..." bind:value={filter} />
</div>

<!-- Fehleranzeige -->
{#if errorMessage}
	<p class="error">{errorMessage}</p>
{/if}

<!-- Grid -->
{#if isLoading}
	<p>Daten werden geladen...</p>
{:else if filteredAnimals.length > 0}
	<div class="grid">
		{#each filteredAnimals as animal}
			<div class="card">
				<img src={animal.image} alt="Bild von {animal.name}" />
				<h2>{animal.name}</h2>
				<p><strong>Standorte:</strong> {animal.location}</p>
				<p><strong>Taxonomie:</strong> {animal.taxonomy}</p>
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
		text-align: center;
	}

	.filter {
		margin-bottom: 1rem;
		text-align: center;
	}

	.filter input {
		padding: 0.5rem;
		font-size: 1rem;
		width: calc(100% - 20px);
		max-width: 400px;
		margin-top: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
		padding: 16px;
	}

	.card {
		border: 1px solid #ccc;
		padding: 16px;
		text-align: center;
		border-radius: 8px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
		background-color: #fff;
	}

	.card:hover {
		transform: scale(1.05);
	}

	img {
		width: auto;
		height: auto;
		max-height: 100px;
		margin-bottom: 8px;
		object-fit: cover;
		border-radius: 4px;
	}

	.error {
		color: red;
		text-align: center;
		margin-top: 2rem;
		font-weight: bold;
	}
</style>
