<nav>
	<a href="/">Startseite</a>
	<a href="/game">Spiel starten</a>
	<a href="/highscores">Leaderboard</a>
	<!-- Neuer Link -->
</nav>

<slot />

<style>
	nav {
		background-color: #f4f4f4;
		padding: 1rem;
		display: flex;
		gap: 1rem;
	}
	a {
		text-decoration: none;
		color: #0070f3;
		font-weight: bold;
	}
	a:hover {
		color: #0056b3;
	}
</style>
