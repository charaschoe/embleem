<script>
	let highscores = [
		{ name: 'Anna', score: 5 },
		{ name: 'Ben', score: 7 }
	];
</script>

<h1>Highscores</h1>
<ul>
	{#each highscores as highscore}
		<li>{highscore.name}: {highscore.score} Züge</li>
	{/each}
</ul>

<style>
	h1 {
		color: #27ae60;
		margin-bottom: 1rem;
	}
	ul {
		list-style-type: none;
		padding-left: 0;
	}
	li {
		font-size: 1.2rem;
		margin-bottom: 0.5rem;
	}
</style>
