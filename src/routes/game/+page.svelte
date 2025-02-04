<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	onMount(() => {
		// Wenn keine spezifische Route, zum Puzzle-Modus weiterleiten
		if ($page.url.pathname === '/game') {
			goto('/game/puzzle');
		}
	});
</script>

<div class="game-container">
	<h1>Tier-Ratespiel</h1>
	<slot />
</div>

<style>
	.game-container {
		position: relative;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
		background-color: var(--jungle-light);
	}

	h1 {
		text-align: center;
		color: var(--jungle-text);
		margin-bottom: 30px;
		font-size: 2.5rem;
		text-shadow: 2px 2px 4px var(--jungle-shadow);
	}
</style>
