<script>
	import './app.css';
	import { page } from '$app/stores';
</script>

<nav class="jungle-nav">
	<div class="nav-content">
		<a href="/" class="nav-link">
			<span class="nav-icon">🌴</span>
			Start
		</a>
		<a href="/game" class="nav-link">
			<span class="nav-icon">🧩</span>
			Puzzle Mode
		</a>
		<a href="/game?mode=wordle" class="nav-link">
			<span class="nav-icon">🎯</span>
			Wordle Mode
		</a>
	</div>
</nav>

<main>
	<slot />
</main>

<style>
	.jungle-nav {
		background-color: var(--jungle-primary);
		padding: 1rem;
		box-shadow: 0 4px 8px var(--jungle-shadow);
		position: sticky;
		top: 0;
		z-index: 1000;
	}

	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		gap: 2rem;
		justify-content: center;
		align-items: center;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		font-size: 1.2rem;
		padding: 0.8rem 1.2rem;
		border-radius: 8px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link:hover {
		background-color: var(--jungle-dark);
		transform: translateY(-2px);
		box-shadow: 0 2px 4px var(--jungle-shadow);
	}

	.nav-link:active {
		transform: translateY(0);
	}

	.nav-icon {
		font-size: 1.4rem;
	}

	main {
		padding: 20px;
		min-height: calc(100vh - 80px);
		background-color: var(--jungle-light);
		background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
	}

	@media (max-width: 600px) {
		.nav-content {
			gap: 1rem;
		}

		.nav-link {
			font-size: 1rem;
			padding: 0.6rem 0.8rem;
		}

		.nav-icon {
			font-size: 1.2rem;
		}
	}
</style>
