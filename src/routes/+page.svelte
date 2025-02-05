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
		<h1>Willkommen im Tier-Abenteuer! 🌟</h1>
		<p class="intro-text">Entdecke die faszinierende Welt der Nationaltiere und lerne spannende Fakten über sie!</p>

		<button class="start-button" on:click={() => goto('/game/puzzle')}> Abenteuer starten! 🚀 </button>
		<p class="button-info">Starte deine Entdeckungsreise im Puzzle-Modus</p>

		<div class="divider"></div>

		<h2>Wähle deinen Spielmodus 🎮</h2>
		<div class="modes-grid">
			<button class="mode" on:click={() => goto('/game/puzzle')}>
				<span class="mode-icon">🧩</span>
				<div class="mode-content">
					<h3>Puzzle-Modus</h3>
					<p>
						Der perfekte Modus für alle Entdecker! Decke die versteckten Tiere Stück für Stück auf und
						rate, welches Nationaltier sich dahinter verbirgt.
					</p>
				</div>
			</button>
			<button class="mode" on:click={() => goto('/game/wordle')}>
				<span class="mode-icon">🎯</span>
				<div class="mode-content">
					<h3>Wordle-Modus</h3>
					<p>
						Der ideale Einstieg für junge Entdecker! Rate Tiernamen mit Hilfe von bunten Hinweisen -
						einfach und intuitiv ohne Tastatur.
					</p>
				</div>
			</button>
		</div>
	</div>

	<div class="footer">
		<p>
			Ein Semesterprojekt der HfG Schwäbisch Gmünd • Tierbilder von Unsplash.com • <a
				href="https://github.com/charaschoe/embleem"
				target="_blank"
				rel="noopener noreferrer">GitHub</a
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
		font-size: 2.4rem;
	}
	h2 {
		font-size: 1.8rem;
	}

	p {
		text-align: center;
		line-height: 1.5;
		margin: 0;
		font-size: 1.4rem;
	}

	.intro-text {
		font-size: 1.4rem;
		text-align: center;
		line-height: 1.6;
		margin: 1rem 0 2rem 0;
		color: var(--jungle-text);
	}

	.start-button {
		background: var(--jungle-primary);
		color: white;
		border: none;
		padding: 1.2rem 2.5rem;
		border-radius: 12px;
		font-size: 1.4rem;
		cursor: pointer;
		margin: 0 auto;
		display: block;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.start-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
	}

	.button-info {
		font-size: 1.2rem;
		opacity: 0.8;
		margin-top: 0.8rem;
		text-align: center;
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
		gap: 1.2rem;
		padding: 1.5rem;
		background: var(--jungle-light);
		border: 3px solid var(--jungle-primary);
		border-radius: 15px;
		cursor: pointer;
		text-align: left;
		transition: all 0.3s ease;
	}

	.mode:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
		background: white;
	}

	.mode-icon {
		font-size: 2.4rem;
		color: var(--jungle-primary);
	}

	.mode-content h3 {
		color: var(--jungle-primary);
		margin: 0 0 0.8rem 0;
		font-size: 1.8rem;
	}

	.mode-content p {
		font-size: 1.4rem;
		margin: 0;
		line-height: 1.5;
		color: var(--jungle-text);
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--jungle-primary);
		color: white;
		padding: 0.5rem;
		font-size: 1.2rem;
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
