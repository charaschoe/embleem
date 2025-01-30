<script>
	import { onMount } from 'svelte';

	let coatsOfArms = []; // Liste der Wappen
	let isLoading = true; // Ladeanzeige
	let errorMessage = ''; // Fehlermeldung
	let continueToken = null; // Token für Pagination (Wikipedia API)

	const limit = 10; // Maximale Anzahl von Ergebnissen pro Anfrage

	// Funktion, um Wappen aus der Wikipedia API zu laden
	async function fetchCoatsOfArms() {
		isLoading = true;

		try {
			const url = new URL('https://en.wikipedia.org/w/api.php');
			url.searchParams.append('action', 'query');
			url.searchParams.append('format', 'json');
			url.searchParams.append('origin', '*'); // Für CORS
			url.searchParams.append('generator', 'categorymembers');
			url.searchParams.append('gcmtitle', 'Category:National_coats_of_arms'); // Kategorie für Nationalwappen
			url.searchParams.append('gcmtype', 'file');
			url.searchParams.append('gcmlimit', limit);
			if (continueToken) {
				url.searchParams.append('gcmcontinue', continueToken);
			}
			url.searchParams.append('prop', 'pageimages');
			url.searchParams.append('piprop', 'thumbnail');
			url.searchParams.append('pithumbsize', 200);

			const response = await fetch(url);

			if (!response.ok) {
				errorMessage = `Fehler beim Abrufen der Wappen: ${response.statusText}`;
				console.error(errorMessage);
				return;
			}

			const data = await response.json();
			const pages = data.query?.pages || {};

			// Extrahiere relevante Daten aus der API-Antwort
			const newCoatsOfArms = Object.values(pages).map((page) => ({
				title: page.title,
				image: page.thumbnail?.source || '/static/default-coat-of-arms.png'
			}));

			coatsOfArms = [...coatsOfArms, ...newCoatsOfArms];
			continueToken = data.continue?.gcmcontinue || null; // Aktualisiere das Token für die nächste Anfrage
		} catch (error) {
			errorMessage = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
			console.error('Fehler beim Abrufen der Wappen:', error);
		} finally {
			isLoading = false;
		}
	}

	onMount(fetchCoatsOfArms);
</script>

<h1>Entdecke die Wappen der Welt!</h1>
<p>
	Hier kannst du die Wappen verschiedener Länder sehen. Klicke unten auf "Mehr laden", um weitere
	Wappen anzuzeigen!
</p>

<!-- Fehleranzeige -->
{#if errorMessage}
	<p class="error">{errorMessage}</p>
{/if}

<!-- Grid mit den Wappen -->
<div class="grid">
	{#each coatsOfArms as coat}
		<div class="card">
			<img src={coat.image} alt="Wappen von {coat.title}" />
			<h2>{coat.title}</h2>
		</div>
	{/each}
</div>

<!-- Mehr laden Button -->
{#if !isLoading && continueToken}
	<button class="load-more" on:click={fetchCoatsOfArms}>Mehr laden</button>
{:else if isLoading}
	<p class="loading">Wappen werden geladen...</p>
{/if}

<style>
	h1 {
		text-align: center;
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 20px;
	}

	p {
		text-align: center;
		font-size: 1.2rem;
		color: #555;
		margin-bottom: 20px;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 20px;
		padding: 20px;
		justify-items: center; /* Zentriert die Karten */
	}

	.card {
		text-align: center;
		background-color: #f9f9f9;
		border-radius: 10px;
		padding: 15px;
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		width: 200px; /* Einheitliche Kartengröße */
	}

	img {
		width: auto;
		height: auto;
		max-height: 150px;
		margin-bottom: 10px;
		object-fit: contain;
		border-radius: 5px;
	}

	h2 {
		font-size: 1.2rem;
		color: #333;
		margin-top: 10px;
	}

	.load-more {
		display: block;
		margin: 20px auto;
		padding: 10px 20px;
		font-size: 1.2rem;
		background-color: #007bff;
		color: white;
		border-radius: 5 px;
		border: none;
		cursor: pointer;
	}

	.load-more:hover {
		background-color: #0056b3;
	}

	.loading {
		text-align: center;
		font-size: 1rem; /* Korrigierte Syntax */
		color: #555;
	}

	.error {
		color: red;
		text-align: center;
		font-weight: bold;
		font-size: 1rem; /* Korrigierte Syntax */
		margin-top: 15px; /* Korrigierte Syntax */
	}
</style>
