<script>
	import { highscoreStore } from '$lib/highscoreStore.js';

	let selectedMode = 'all';
	let selectedTimeframe = 'all';
	let searchQuery = '';

	$: filteredHighscores = $highscoreStore
		.filter((score) => {
			if (selectedMode !== 'all' && score.mode !== selectedMode) return false;
			if (selectedTimeframe !== 'all') {
				const scoreDate = new Date(score.date);
				const now = new Date();
				switch (selectedTimeframe) {
					case 'today':
						if (scoreDate.toDateString() !== now.toDateString()) return false;
						break;
					case 'week':
						const weekAgo = new Date(now.setDate(now.getDate() - 7));
						if (scoreDate < weekAgo) return false;
						break;
					case 'month':
						const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
						if (scoreDate < monthAgo) return false;
						break;
				}
			}
			if (searchQuery) {
				return score.name.toLowerCase().includes(searchQuery.toLowerCase());
			}
			return true;
		})
		.sort((a, b) => b.score - a.score)
		.slice(0, 100);

	function getScoreClass(score) {
		if (score >= 90) return 'gold';
		if (score >= 70) return 'silver';
		if (score >= 50) return 'bronze';
		return '';
	}
</script>

<div class="puzzle-mode">
	<h1>🏆 Tier-Champions</h1>
	<p class="subtitle">Unsere mutigsten Tierentdecker!</p>

	<div class="filter-container">
		<div class="filter-group">
			<label for="mode">Spielmodus:</label>
			<select id="mode" bind:value={selectedMode}>
				<option value="all">Alle Modi</option>
				<option value="Wordle">Tier-Raten</option>
				<option value="Puzzle">Puzzle</option>
			</select>
		</div>

		<div class="filter-group">
			<label for="timeframe">Zeitraum:</label>
			<select id="timeframe" bind:value={selectedTimeframe}>
				<option value="all">Alle Zeit</option>
				<option value="today">Heute</option>
				<option value="week">Diese Woche</option>
				<option value="month">Dieser Monat</option>
			</select>
		</div>

		<div class="filter-group">
			<label for="search">Suche:</label>
			<input
				id="search"
				type="text"
				bind:value={searchQuery}
				placeholder="Nach Namen suchen..."
			/>
		</div>
	</div>

	{#if filteredHighscores.length > 0}
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th>Rang</th>
						<th>Name</th>
						<th>Tier</th>
						<th>Modus</th>
						<th>Punkte</th>
						<th>Versuche</th>
						<th>Datum</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredHighscores as score, index}
						<tr class={getScoreClass(score.score)}>
							<td class="rank">
								{#if index < 3}
									<span class="medal">{['🥇', '🥈', '🥉'][index]}</span>
								{:else}
									{index + 1}
								{/if}
							</td>
							<td>{score.name}</td>
							<td>{score.animal}</td>
							<td>{score.mode}</td>
							<td class="score">{score.score}</td>
							<td>{score.attempts || score.tiles}</td>
							<td>{new Date(score.date).toLocaleDateString('de-DE')}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="empty-state">
			<p>🦁 Noch keine Highscores vorhanden!</p>
			<p>Sei der Erste, der sich in die Bestenliste einträgt.</p>
		</div>
	{/if}
</div>

<style>
	.puzzle-mode {
		background: linear-gradient(145deg, #fff6e5, #ffe0b2);
		border-radius: 30px;
		border: 4px solid var(--jungle-primary);
		box-shadow: 0 8px 32px rgba(0,0,0,0.1);
		padding: 3rem;
		max-width: 1200px;
		margin: 2rem auto;
	}

	h1 {
		font-size: 3rem;
		color: var(--jungle-primary);
		text-align: center;
		margin-bottom: 1rem;
	}

	.subtitle {
		font-size: 1.8rem;
		color: var(--jungle-text);
		text-align: center;
		margin-bottom: 3rem;
	}

	.filter-container {
		display: flex;
		gap: 2rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 3rem;
		background: white;
		padding: 2rem;
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
	}

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
	}

	.filter-group label {
		font-size: 1.4rem;
		color: var(--jungle-text);
	}

	select, input {
		font-size: 1.4rem;
		padding: 1rem 1.5rem;
		border: 3px solid var(--jungle-primary);
		border-radius: 15px;
		background: white;
		min-width: 200px;
	}

	.table-container {
		background: white;
		padding: 2rem;
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0,0,0,0.1);
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1.6rem;
	}

	th {
		background: var(--jungle-primary);
		color: white;
		padding: 1.5rem;
		text-align: left;
		font-size: 1.6rem;
	}

	td {
		padding: 1.5rem;
		border-bottom: 2px solid #eee;
		font-size: 1.4rem;
	}

	.rank {
		font-size: 1.8rem;
		font-weight: bold;
		text-align: center;
	}

	.medal {
		font-size: 2rem;
	}

	.score {
		font-weight: bold;
		color: var(--jungle-primary);
	}

	tr.gold { background: rgba(255, 215, 0, 0.1); }
	tr.silver { background: rgba(192, 192, 192, 0.1); }
	tr.bronze { background: rgba(205, 127, 50, 0.1); }

	tr:hover {
		background: rgba(255, 159, 77, 0.1);
		transform: scale(1.01);
		transition: all 0.3s ease;
	}

	.empty-state {
		text-align: center;
		padding: 4rem;
		background: white;
		border-radius: 20px;
		margin-top: 2rem;
	}

	.empty-state p {
		font-size: 2rem;
		margin: 1rem 0;
		color: var(--jungle-text);
	}

	.empty-state p:first-child {
		font-size: 2.5rem;
		color: var(--jungle-primary);
	}

	@media (max-width: 768px) {
		.puzzle-mode {
			padding: 1.5rem;
			margin: 1rem;
		}

		.filter-container {
			padding: 1rem;
		}

		select, input {
			min-width: 100%;
		}

		td, th {
			padding: 1rem;
			font-size: 1.2rem;
		}
	}
</style>
