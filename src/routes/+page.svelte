<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchUnsplashImage } from '$lib/unsplash';

	let backgroundImage = '';

	onMount(async () => {
		try {
			backgroundImage = await fetchUnsplashImage('jungle animals nature green');
		} catch (error) {
			console.error('Error loading background:', error);
			backgroundImage = '/default-jungle.jpg';
		}
	});
</script>

<div class="jungle-container" style="background-image: url('{backgroundImage}')">
	<div class="leaf">
		<h1>Willkommen im Dschungel-Abenteuer!</h1>
		<p>Hilf uns, die versteckten Tiere zu entdecken und lerne spannende Fakten über sie!</p>
		<a href="/game" class="button">Spiel starten</a>
	</div>
</div>

<style>
	.jungle-container {
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		position: relative;
	}

	.jungle-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 100, 0, 0.2);
		pointer-events: none;
	}

	.leaf {
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 15px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		padding: 40px;
		text-align: center;
		width: 90%;
		max-width: 600px;
		position: relative;
		border: 3px solid #4caf50;
	}

	h1 {
		font-size: 2.8rem;
		color: #2c3e50;
		margin-bottom: 20px;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
	}

	p {
		font-size: 1.5rem;
		color: #333;
		margin-bottom: 30px;
		line-height: 1.6;
	}

	.button {
		display: inline-block;
		padding: 15px 30px;
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		background-color: #4caf50;
		text-decoration: none;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
		transition: all 0.3s ease;
	}

	.button:hover {
		background-color: #388e3c;
		transform: translateY(-2px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
	}

	.button:active {
		transform: scale(0.95) translateY(0);
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 2rem;
		}

		p {
			font-size: 1.2rem;
		}

		.button {
			font-size: 1.2rem;
			padding: 10px 20px;
		}

		.leaf {
			padding: 25px;
		}
	}
</style>
