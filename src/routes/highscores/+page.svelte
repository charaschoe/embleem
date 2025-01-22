<script>
	import { highscoreStore } from '$lib/highscoreStore.js';

	// Abonniere den Store, um die aktuellen Highscores zu erhalten
	let highscores = [];
	highscoreStore.subscribe((value) => {
		highscores = value.sort((a, b) => a.moves - b.moves); // Sortiere nach der Anzahl der Züge (aufsteigend)
	});
</script>

<h1>Leaderboard</h1>
<p>Hier sind die besten Spieler und ihre Ergebnisse:</p>

{#if highscores.length > 0}
	<table>
		<thead>
			<tr>
				<th>Platz</th>
				<th>Name</th>
				<th>Züge</th>
			</tr>
		</thead>
		<tbody>
			{#each highscores as score, index}
				<tr>
					<td>{index + 1}</td>
					<td>{score.name}</td>
					<td>{score.moves}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>Noch keine Highscores gespeichert.</p>
{/if}

<style>
	h1 {
		color: #2c3e50;
		margin-bottom: 1rem;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	th,
	td {
		padding: 0.5rem;
		text-align: left;
		border: 1px solid #ddd;
	}

	th {
		background-color: #f4f4f4;
	}

	tr:nth-child(even) {
		background-color: #f9f9f9;
	}

	tr:hover {
		background-color: #f1f1f1;
	}
</style>
