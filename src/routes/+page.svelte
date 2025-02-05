<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '$lib/unsplash.js';
	import { goto } from '$app/navigation';
	import { animalList } from '$lib/animalList.js';

	let backgroundImage = '';
	let showApiLimitMessage = false;
	let isApiAvailable = true;
	let apiState = {
		isLoading: true,
		hasError: false,
		message: ''
	};

	async function checkApiAvailability() {
		try {
			apiState.isLoading = true;
			const testAnimal = animalList[0];
			await fetchUnsplashImage(testAnimal);
			isApiAvailable = true;
			showApiLimitMessage = false;
			apiState.hasError = false;
			apiState.message = '';
		} catch (error) {
			console.warn('API check failed:', error);
			isApiAvailable = false;
			showApiLimitMessage = true;
			apiState.hasError = true;
			apiState.message = 'API nicht verfügbar';
		} finally {
			apiState.isLoading = false;
		}
	}

	onMount(async () => {
		try {
			backgroundImage = await fetchUnsplashImage('jungle animals nature');
		} catch (error) {
			console.error('Error loading background:', error);
			backgroundImage = '/default-jungle.jpg';
		}
		await checkApiAvailability();
		// Check API status every 5 minutes
		const intervalId = setInterval(checkApiAvailability, 5 * 60 * 1000);
		return () => clearInterval(intervalId);
	});
</script>

<div class="jungle-container" style="background-image: url('{backgroundImage}')">
	<div class="content-box">
		<div class="welcome-content">
			<h1>Willkommen im Tier-Abenteuer! 🌟</h1>
			<p class="intro-text">
				Entdecke die faszinierende Welt der Nationaltiere! Teste dein Wissen und lerne spielerisch neue
				Tiere kennen.
			</p>

			{#if showApiLimitMessage}
				<div class="api-limit-warning">
					<h3>⚠️ Wichtiger Hinweis zur Bildanzeige</h3>
					<p>
						Momentan können einige Bilder aufgrund technischer Einschränkungen nicht geladen werden. 
						Wir arbeiten daran, dies zu verbessern. Das Spiel ist trotzdem spielbar, aber einige Bilder 
						werden möglicherweise nicht korrekt angezeigt.
					</p>
					<div class="api-limit-details">
						<p>
							<strong>Info:</strong> Aufgrund der API-Beschränkungen von Unsplash sind nur 50 Bildanfragen pro Stunde möglich.
							Die Bildanzeige wird automatisch wiederhergestellt, sobald das Limit zurückgesetzt wird.
						</p>
						<p>
							<strong>Tipp:</strong> Nutze die Hinweise und dein Wissen über Nationaltiere, 
							auch wenn das Bild nicht verfügbar ist! 🦁
						</p>
					</div>
				</div>
			{/if}

			<button class="start-button" on:click={() => goto('/game/puzzle')}> Abenteuer starten! 🚀 </button>
			<p class="button-info">Starte deine Entdeckungsreise im Puzzle-Modus</p>

			<div class="divider"></div>

			<h2>Wähle deinen Spielmodus 🎮</h2>
			<div class="modes-grid">
				<button class="mode" on:click={() => goto('/game/puzzle')} disabled={!isApiAvailable || apiState.isLoading}>
					<span class="mode-icon">🧩</span>
					<div class="mode-content">
						<h3>Puzzle-Modus</h3>
						<p>
							Der perfekte Modus für alle Entdecker! Decke die versteckten Tiere Stück für Stück auf und
							rate, welches Nationaltier sich dahinter verbirgt.
						</p>
						{#if apiState.hasError}
							<p class="mode-warning">⚠️ Momentan nicht verfügbar</p>
						{/if}
					</div>
				</button>
				<button class="mode" on:click={() => goto('/game/wordle')} disabled={!isApiAvailable || apiState.isLoading}>
					<span class="mode-icon">🎯</span>
					<div class="mode-content">
						<h3>Wordle-Modus</h3>
						<p>
							Der ideale Einstieg für junge Entdecker! Rate Tiernamen mit Hilfe von bunten Hinweisen -
							einfach und intuitiv ohne Tastatur.
						</p>
						{#if apiState.hasError}
							<p class="mode-warning">⚠️ Momentan nicht verfügbar</p>
						{/if}
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
		padding: 2.5rem;
		display: grid;
		gap: 2.5rem;
	}

	h1,
	h2 {
		color: var(--jungle-primary);
		text-align: center;
		margin: 0;
	}

	h1 {
		font-size: 2.4rem;
		margin-bottom: 1.5rem;
	}

	h2 {
		font-size: 1.8rem;
		margin-bottom: 2.5rem;
	}

	p {
		text-align: center;
		line-height: 1.6;
		margin: 0;
		font-size: 1.4rem;
	}

	.intro-text {
		font-size: 1.4rem;
		text-align: center;
		line-height: 1.6;
		margin-bottom: 2.5rem;
		color: var(--jungle-text);
	}

	.start-button {
		background: var(--jungle-primary);
		color: white;
		border: none;
		padding: 1.5rem 2.5rem;
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
		margin-top: 1rem;
		text-align: center;
	}

	.divider {
		height: 1px;
		background: var(--jungle-primary);
		opacity: 0.2;
		margin: 2.5rem 0;
	}

	.modes-grid {
		display: grid;
		gap: 2rem;
		margin-top: 2rem;
	}

	.mode {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 2rem;
		padding: 2.5rem;
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
		font-size: 3rem;
		color: var(--jungle-primary);
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 12px;
		height: fit-content;
	}

	.mode-content {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-right: 1.5rem;
	}

	.mode-content h3 {
		color: var(--jungle-primary);
		margin: 0;
		font-size: 1.8rem;
		text-align: left;
	}

	.mode-content p {
		font-size: 1.4rem;
		margin: 0;
		line-height: 1.6;
		color: var(--jungle-text);
		text-align: left;
	}

	.mode-warning {
		color: #856404;
		background: #fff3cd;
		border: 1px solid #ffeeba;
		padding: 1rem 1.5rem;
		border-radius: 8px;
		font-size: 1.2rem;
		text-align: center;
		margin-top: 1rem;
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
			padding: 2rem;
			gap: 2rem;
		}

		.mode {
			padding: 2rem;
			gap: 1.5rem;
		}

		.mode-icon {
			font-size: 2.4rem;
			padding: 1rem;
		}

		.mode-content {
			padding-right: 1rem;
			gap: 1rem;
		}

		.api-limit-warning {
			padding: 2rem;
			margin: 2rem 0;
		}
	}

	.api-limit-warning {
		background: #fff3cd;
		border: 2px solid #ffeeba;
		border-radius: 15px;
		padding: 2.5rem;
		margin: 2.5rem 0;
		text-align: center;
		max-width: 800px;
		animation: float 3s ease-in-out infinite;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.api-limit-warning h3 {
		color: #856404;
		margin-bottom: 1.5rem;
		font-size: 1.6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}

	.api-limit-warning p {
		color: #856404;
		font-size: 1.4rem;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.api-limit-details {
		background: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		padding: 1.5rem;
		margin-top: 1.5rem;
	}

	.api-limit-details p {
		margin: 0;
	}

	.mode[disabled] {
		opacity: 0.7;
		cursor: not-allowed;
		transform: none;
	}

	.mode[disabled]:hover {
		transform: none;
		box-shadow: none;
		background: var(--jungle-light);
	}
</style>
