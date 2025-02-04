<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '$lib/unsplash';
	import { goto } from '$app/navigation';

	let backgroundImage = '';

	onMount(async () => {
		try {
			backgroundImage = await fetchUnsplashImage('jungle animals nature');
		} catch (error) {
			console.error('Error loading background:', error);
			backgroundImage = '/default-jungle.jpg';
		}
	});
</script>

<div class="jungle-container" style="background-image: url('{backgroundImage}')">
	<div class="content-box">
		<h1>Willkommen im Dschungel-Abenteuer!</h1>
		<p>Hilf uns, die versteckten Tiere zu entdecken und lerne spannende Fakten über sie!</p>

		<button class="start-button" on:click={() => goto('/game/puzzle')}> Spiel starten </button>
		<p class="button-info">Startet den Puzzle Mode für dein Abenteuer!</p>

		<div class="divider"></div>

		<h2>So wird gespielt</h2>
		<div class="modes-grid">
			<button class="mode" on:click={() => goto('/game/puzzle')}>
				<span class="mode-icon">🧩</span>
				<div class="mode-content">
					<h3>Puzzle Mode</h3>
					<p>
						Der Puzzle Mode ist für alle Entdecker! Finde versteckte Tiere im Dschungel und löse
						spannende Rätsel.
					</p>
				</div>
			</button>
			<button class="mode" on:click={() => goto('/game/wordle')}>
				<span class="mode-icon">🎯</span>
				<div class="mode-content">
					<h3>Wordle Mode</h3>
					<p>
						Speziell für kleine Entdecker, die noch üben: Rate Tiernamen mit Hilfe von bunten
						Hinweisen - ganz ohne Tastatur!
					</p>
				</div>
			</button>
		</div>
	</div>

	<div class="footer">
		<p>
			Semesterprojekt • HfG Schwäbisch Gmünd • Tierbilder: Unsplash.com • <a
				href="https://github.com/charaschoe/embleem">GitHub</a
			>
		</p>
	</div>
</div>

<style>
	.jungle-container {
		min-height: 100vh;
		display: grid;
		place-items: center;
		background-size: cover;
		background-position: center;
		padding: 2rem;
		position: relative;
	}

	.content-box {
		background: white;
		border-radius: 15px;
		width: min(90%, 600px);
		padding: 2rem;
		display: grid;
		gap: 1.5rem;
	}

	h1,
	h2 {
		color: var(--jungle-primary);
		text-align: center;
		margin: 0;
	}

	h1 {
		font-size: 1.8rem;
	}
	h2 {
		font-size: 1.4rem;
	}

	p {
		text-align: center;
		line-height: 1.5;
		margin: 0;
	}

	.start-button {
		background: var(--jungle-primary);
		color: white;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.2rem;
		cursor: pointer;
		margin: 0 auto;
		display: block;
	}

	.button-info {
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.divider {
		height: 1px;
		background: var(--jungle-primary);
		opacity: 0.2;
		margin: 1rem 0;
	}

	.modes-grid {
		display: grid;
		gap: 1rem;
	}

	.mode {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		padding: 1rem;
		background: #f5f5f5;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		text-align: left;
	}

	.mode-icon {
		font-size: 1.5rem;
	}

	.mode-content h3 {
		color: var(--jungle-primary);
		margin: 0 0 0.5rem 0;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--jungle-primary);
		color: white;
		padding: 0.5rem;
		font-size: 0.75rem;
		text-align: center;
	}

	.footer p {
		margin: 0;
		opacity: 0.7;
	}

	.footer a {
		color: white;
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.content-box {
			padding: 1.5rem;
		}

		.mode {
			padding: 0.8rem;
		}
	}
</style>
