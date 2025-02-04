<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '$lib/unsplash';
	import { goto } from '$app/navigation';

	let backgroundImage = '';

	onMount(async () => {
		try {
			backgroundImage = await fetchUnsplashImage('jungle leaves macro');
		} catch (error) {
			console.error('Error loading background:', error);
			backgroundImage = '/default-jungle.jpg';
		}
	});
</script>

<div class="jungle-container" style="background-image: url('{backgroundImage}')">
	<div class="content-box">
		<div class="content-grid">
			<h1>Willkommen im Dschungel-Abenteuer!</h1>
			<p>Hilf uns, die versteckten Tiere zu entdecken und lerne spannende Fakten über sie!</p>
			<div class="button-container">
				<button class="start-button" on:click={() => goto('/game/puzzle')}>Spiel starten</button>
				<p class="button-info">Startet den Puzzle Mode für dein Abenteuer!</p>
			</div>

			<div class="divider"></div>

			<h2>So wird gespielt</h2>
			<div class="modes-grid">
				<button class="mode" on:click={() => goto('/game/puzzle')}>
					<span class="mode-icon">🧩</span>
					<div class="mode-content">
						<h3>Puzzle Mode</h3>
						<p>
							Der Puzzle Mode ist für alle Entdecker! Finde versteckte Tiere im Dschungel und löse
							spannende Rätsel. Klicke auf die Tiere und sammle Punkte!
						</p>
					</div>
				</button>
				<button class="mode" on:click={() => goto('/game/wordle')}>
					<span class="mode-icon">🎯</span>
					<div class="mode-content">
						<h3>Wordle Mode</h3>
						<p>
							Speziell für kleine Entdecker, die noch üben: Rate Tiernamen mit Hilfe von bunten
							Hinweisen - ganz ohne Tastatur! Wähle aus vorgegebenen Buchstaben.
						</p>
					</div>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.jungle-container {
		display: grid;
		place-items: center;
		background-size: cover;
		background-position: center;
		min-height: calc(100vh - 80px);
		padding: 2rem;
	}

	.content-box {
		background: white;
		border-radius: 15px;
		width: min(90%, 600px);
		padding: 2.5rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.content-grid {
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
		font-size: 1.1rem;
		line-height: 1.5;
		margin: 0;
	}

	.divider {
		height: 1px;
		background: var(--jungle-primary);
		opacity: 0.2;
	}

	.modes-grid {
		display: grid;
		gap: 1.5rem;
	}

	.mode {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1rem;
		align-items: start;
		padding: 1.2rem;
		background: #f5f5f5;
		border-radius: 8px;
		transition: transform 0.2s ease;
		border: none;
		width: 100%;
		text-align: left;
		cursor: pointer;
	}

	.mode:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
		background: #edf7ed;
	}

	.mode-icon {
		font-size: 1.5rem;
		padding-top: 0.2rem;
	}

	.start-button {
		justify-self: center;
		background: var(--jungle-primary);
		color: white;
		border: none;
		padding: 1rem 2.5rem;
		border-radius: 8px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.start-button:hover {
		transform: scale(1.05);
		background: var(--jungle-dark);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.button-container {
		display: grid;
		gap: 0.5rem;
		justify-items: center;
	}

	.button-info {
		font-size: 0.9rem;
		color: var(--jungle-primary);
		opacity: 0.8;
	}

	.mode-content {
		display: grid;
		gap: 0.5rem;
	}

	.mode-content h3 {
		color: var(--jungle-primary);
		font-size: 1.2rem;
		margin: 0;
	}

	@media (max-width: 768px) {
		.content-box {
			padding: 1.5rem;
			width: 95%;
		}

		.mode {
			padding: 1rem;
		}

		.mode-content h3 {
			font-size: 1.1rem;
		}

		.button-info {
			font-size: 0.8rem;
		}
	}

	@media (max-width: 480px) {
		.jungle-container {
			padding: 1rem;
		}

		.content-box {
			padding: 1rem;
		}
	}
</style>
