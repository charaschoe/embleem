<script>
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { animalList } from '../lib/animalList.js';
	import { getAnimalInfo } from '../lib/wikipedia.js';
	import { highscoreStore } from '../lib/highscoreStore.js';

	export let animal;
	export let imageUrl;
	export let country;
	export let highscore;

	// Spielzustand
	let hint = '';
	let guessedName = '';
	let playerName = '';
	let isCorrect = false;
	let counter = 0;
	let guessedNameInput;
	let showGame = false;
	let countdown = 4;
	let showCountdown = false;
	let difficulty = 'medium';
	let lastScore = null;
	let wikiInfo = '';
	let attempts = 0;
	let showHint = false;
	let hintText = '';
	let showSuggestions = false;
	let suggestions = [];
	let currentSuggestion = '';
	let autoFillEnabled = true;
	let showAutoFillInfo = false;

	// Schwierigkeitskonfiguration
	let rows = 3;
	let cols = 3;
	let points = 100;
	let pointPenalty = 5;
	let revealedTiles = Array(rows * cols).fill(false);

	$: {
		switch (difficulty) {
			case 'easy':
				rows = 4;
				cols = 4;
				points = 150;
				pointPenalty = 3;
				revealedTiles = Array(16).fill(false);
				if (!showGame) {
					const randomIndices = Array.from({ length: 16 }, (_, i) => i)
						.sort(() => Math.random() - 0.5)
						.slice(0, 2);
					randomIndices.forEach((i) => (revealedTiles[i] = true));
				}
				break;
			case 'medium':
				rows = 3;
				cols = 3;
				points = 100;
				pointPenalty = 5;
				revealedTiles = Array(9).fill(false);
				break;
			case 'hard':
				rows = 2;
				cols = 2;
				points = 75;
				pointPenalty = 10;
				revealedTiles = Array(4).fill(false);
				break;
		}
	}

	const placeholderNames = [
		'Kleiner Panda',
		'Süße Giraffe',
		'Fröhlicher Pinguin',
		'Niedlicher Koala',
		'Bunter Papagei',
		'Sanfter Delfin',
		'Lustiger Otter',
		'Schlauer Fuchs',
		'Munteres Känguru',
		'Treuer Elefant',
		'Safari Scout',
		'Dschungel Entdecker',
		'Tierfreund',
		'Naturkenner',
		'Tierspürer',
		'Waldläufer',
		'Savannen Guide'
	];

	function calculateScore() {
		const tilePenalty = counter * pointPenalty;
		return Math.max(0, points - tilePenalty);
	}

	function startGame() {
		if (!playerName.trim()) {
			alert('Bitte gib deinen Namen ein!');
			return;
		}
		showGame = true;
	}

	function generateRandomName() {
		playerName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
	}

	function saveHighscore(score) {
		if (highscoreStore) {
			lastScore = score;
			highscoreStore.update((scores) => [
				...scores,
				{
					name: playerName,
					mode: 'Puzzle',
					animal: animal,
					tiles: counter,
					difficulty: difficulty,
					score: score,
					date: new Date().toISOString()
				}
			]);
		}
	}

	function startCountdown() {
		showCountdown = true;
		const timer = setInterval(() => {
			countdown--;
			if (countdown === 0) {
				clearInterval(timer);
				resetGame();
			}
		}, 1000);
	}

	function resetGame() {
		showCountdown = false;
		countdown = 4;
		isCorrect = false;
		revealedTiles = Array(rows * cols).fill(false);
		counter = 0;
		points = difficulty === 'easy' ? 150 : difficulty === 'medium' ? 100 : 75;
		attempts = 0;
		showHint = false;
		hintText = '';
	}

	async function getWikipediaImage(animalName) {
		try {
			// Map animal names to their Wikipedia article titles
			const wikiTitles = {
				'Bundesadler': 'Bundesadler_(Deutschland)',
				'Doppelköpfiger Adler': 'Albanischer_Adler',
				'Weißer Adler': 'Wappen_Polens',
				'Leo Belgicus': 'Belgischer_Löwe',
				'Gallischer Hahn': 'Gallischer_Hahn',
				'Weißkopfseeadler': 'Weißkopfseeadler',
				'Chinesischer Drache': 'Chinesischer_Drache',
				'Walisischer Drache': 'Walisischer_Drache',
				'Schottisches Einhorn': 'Einhorn',
				'Norwegischer Löwe': 'Wappen_Norwegens',
				'Singapur Merlion': 'Merlion',
				'Schwedischer Löwe': 'Wappen_Schwedens',
				'Tschechischer Löwe': 'Wappen_der_Tschechischen_Republik',
				'Finnischer Löwe': 'Wappen_Finnlands',
				'Mexikanischer Adler': 'Wappen_Mexikos',
				'Sri-Lanka-Löwe': 'Flagge_Sri_Lankas'
			};

			const searchTerm = wikiTitles[animalName] || animalName;
			
			// First try to get the image from the German Wikipedia
			let response = await fetch(
				`https://de.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchTerm)}&prop=pageimages&format=json&pithumbsize=1024&origin=*`
			);
			let data = await response.json();
			let pages = data.query.pages;
			let pageId = Object.keys(pages)[0];
			let imageUrl = pages[pageId]?.thumbnail?.source;
			
			// If no German image, try English Wikipedia
			if (!imageUrl) {
				const englishTitles = {
					'Bundesadler': 'Coat_of_arms_of_Germany',
					'Doppelköpfiger Adler': 'Albanian_eagle',
					'Weißer Adler': 'Coat_of_arms_of_Poland',
					'Leo Belgicus': 'Belgian_Lion',
					'Gallischer Hahn': 'Gallic_rooster',
					'Weißkopfseeadler': 'Bald_eagle',
					'Chinesischer Drache': 'Chinese_dragon',
					'Walisischer Drache': 'Welsh_Dragon',
					'Schottisches Einhorn': 'Unicorn#Scotland',
					'Norwegischer Löwe': 'Coat_of_arms_of_Norway',
					'Singapur Merlion': 'Merlion',
					'Schwedischer Löwe': 'Coat_of_arms_of_Sweden',
					'Tschechischer Löwe': 'Coat_of_arms_of_the_Czech_Republic',
					'Finnischer Löwe': 'Coat_of_arms_of_Finland',
					'Mexikanischer Adler': 'Coat_of_arms_of_Mexico',
					'Sri-Lanka-Löwe': 'Flag_of_Sri_Lanka'
				};
				
				const englishTitle = englishTitles[animalName] || animalName;
				response = await fetch(
					`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(englishTitle)}&prop=pageimages&format=json&pithumbsize=1024&origin=*`
				);
				data = await response.json();
				pages = data.query.pages;
				pageId = Object.keys(pages)[0];
				imageUrl = pages[pageId]?.thumbnail?.source;
			}
			
			if (imageUrl) {
				return imageUrl;
			}
			throw new Error('No image found');
		} catch (error) {
			console.error('Error fetching Wikipedia image:', error);
			return null;
		}
	}

	onMount(async () => {
		hint = 'Kannst du das Tier erraten? Decke die Kacheln auf!';
		try {
			// First try Wikipedia
			const wikiImage = await getWikipediaImage(animal);
			if (wikiImage) {
				imageUrl = wikiImage;
				guessedNameInput?.focus();
				return;
			}

			// Fallback to Unsplash with more specific search terms
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000);

			const searchTerms = {
				'Bengalischer Tiger': 'bengal tiger face closeup stripes',
				'Andenkondor': 'andean condor bird',
				'Weißkopfseeadler': 'bald eagle portrait',
				'Komodo-Drache': 'komodo dragon lizard',
				'Steppenzebra': 'plains zebra portrait',
				'Känguru': 'red kangaroo portrait',
				'Russischer Bär': 'brown bear portrait'
			};

			const searchQuery = searchTerms[animal] || `${animal} animal portrait closeup`;

			const response = await fetch(
				`https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&orientation=landscape&content_filter=high&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
				{ signal: controller.signal }
			);

			clearTimeout(timeoutId);
			const data = await response.json();

			// Verify if the image exists and has a valid URL
			if (data?.urls?.regular) {
				imageUrl = data.urls.regular;
			} else {
				throw new Error('Invalid image data');
			}

			guessedNameInput?.focus();
		} catch (error) {
			console.error('Error fetching image:', error);
			// Use a more specific fallback path with proper error handling
			try {
				imageUrl = `/animals/${animal.toLowerCase().replace(/[\s-]/g, '-')}.jpg`;
				// Test if the image exists
				const img = new Image();
				img.src = imageUrl;
				await new Promise((resolve, reject) => {
					img.onload = resolve;
					img.onerror = reject;
				});
			} catch (fallbackError) {
				console.error('Fallback image not found:', fallbackError);
				imageUrl = '/animals/default-animal.jpg';
			}
		}
	});

	function revealTile(index) {
		if (!revealedTiles[index]) {
			revealedTiles[index] = true;
			counter += 1;
		}
	}

	async function showAnimalInfo() {
		try {
			const currentAnimal = animalList.find(a => a.name === animal);
			if (currentAnimal) {
				wikiInfo = await getAnimalInfo(currentAnimal);
			} else {
				wikiInfo = 'Keine Information verfügbar.';
			}
		} catch (error) {
			console.error('Error fetching animal info:', error);
			wikiInfo = 'Fehler beim Laden der Information.';
		}
	}

	function getHint(currentAnimal) {
		if (!currentAnimal) return '';
		
		const hints = [
			`Dieses Tier ist ein Raubtier aus der Familie der Katzen.`,
			`Es hat ein gestreiftes Fell mit orangener und schwarzer Farbe.`,
			`Es ist das stärkste Raubtier in ${country}.`,
			`Es lebt im Dschungel und ist ein sehr guter Schwimmer.`,
			`Es ist der König des Dschungels in ${country} - der Bengalische...`
		];
		return hints[Math.min(attempts - 1, hints.length - 1)];
	}

	function getSuggestions(input) {
		if (!input) return [];
		const inputLower = input.toLowerCase();
		return animalList
			.map(a => a.name)
			.filter(name => 
				name.toLowerCase().includes(inputLower) || 
				name.toLowerCase().startsWith(inputLower)
			)
			.slice(0, 5);
	}

	function toggleAutoFill() {
		autoFillEnabled = !autoFillEnabled;
		if (!autoFillEnabled) {
			showSuggestions = false;
		}
	}

	function handleInput(event) {
		const value = event.target.value;
		guessedName = value;
		if (autoFillEnabled) {
			suggestions = getSuggestions(value);
			showSuggestions = suggestions.length > 0;
		}
	}

	function selectSuggestion(suggestion) {
		guessedName = suggestion;
		showSuggestions = false;
		guessedNameInput?.focus();
	}

	function handleKeydown(event) {
		if (event.key === 'ArrowDown' && showSuggestions) {
			event.preventDefault();
			const currentIndex = suggestions.indexOf(currentSuggestion);
			currentSuggestion = suggestions[(currentIndex + 1) % suggestions.length] || suggestions[0];
		} else if (event.key === 'ArrowUp' && showSuggestions) {
			event.preventDefault();
			const currentIndex = suggestions.indexOf(currentSuggestion);
			currentSuggestion = suggestions[currentIndex - 1] || suggestions[suggestions.length - 1];
		} else if (event.key === 'Enter' && currentSuggestion) {
			event.preventDefault();
			selectSuggestion(currentSuggestion);
		} else if (event.key === 'Escape') {
			showSuggestions = false;
		}
	}

	function checkGuess(e) {
		e.preventDefault();
		if (!guessedName.trim()) return;

		const guess = guessedName.toLowerCase().trim();
		const currentAnimal = animalList.find((a) => a.name === animal);

		const isCorrectGuess =
			currentAnimal?.synonyms.includes(guess) ||
			guess === animal.toLowerCase() ||
			guess === currentAnimal?.name.toLowerCase();

		if (isCorrectGuess) {
			isCorrect = true;
			const finalScore = calculateScore();
			saveHighscore(finalScore);
			triggerConfetti();
			showAnimalInfo();
			setTimeout(() => {
				startCountdown();
			}, 2000);
		} else {
			attempts++;
			showHint = true;
			hintText = getHint(currentAnimal);
			
			// Customize feedback based on the guess
			let feedback = 'Das ist leider nicht richtig. ';
			if (attempts === 1) {
				feedback += 'Schau dir das Bild genau an und versuche es noch einmal! 🔍';
			} else if (attempts === 2) {
				feedback += 'Hier ist ein Tipp, der dir hilft! 🌟';
			} else {
				feedback += 'Lass uns gemeinsam das Tier finden! 🤝';
			}
			
			alert(feedback);
			guessedName = '';
			guessedNameInput?.focus();
		}
	}

	function triggerConfetti() {
		confetti({
			spread: 100,
			startVelocity: 30,
			particleCount: 150,
			zIndex: 2147483646,
			origin: { x: 0.5, y: 0.5 }
		});
	}
</script>

<div class="puzzle-mode">
	<h1>Tier-Ratespiel</h1>
	<p class="hint">Finde das Nationaltier von {country}!</p>

	{#if !showGame}
		<div class="name-input-container">
			<div class="welcome-box">
				<h2>Hallo kleiner Tierforscher! 🔍</h2>
				<p class="name-intro">Bevor wir auf Safari gehen, verrate mir doch deinen Namen.</p>
			</div>

			<div class="input-group">
				<div class="input-with-button">
					<input
						type="text"
						bind:value={playerName}
						placeholder="Dein Name oder Tiername..."
						class="name-input"
					/>
					<button class="name-generator" on:click={generateRandomName}>
						Zufälliger Tiername 🎲
					</button>
				</div>
			</div>

			<div class="difficulty-box">
				<h3>Wähle deinen Schwierigkeitsgrad:</h3>
				<div class="difficulty-options">
					<button
						class="difficulty-button {difficulty === 'easy' ? 'active' : ''}"
						on:click={() => (difficulty = 'easy')}
					>
						Leicht 🌱
						<span class="difficulty-info">4x4 Raster, mehr Punkte</span>
					</button>
					<button
						class="difficulty-button {difficulty === 'medium' ? 'active' : ''}"
						on:click={() => (difficulty = 'medium')}
					>
						Mittel 🌿
						<span class="difficulty-info">3x3 Raster</span>
					</button>
					<button
						class="difficulty-button {difficulty === 'hard' ? 'active' : ''}"
						on:click={() => (difficulty = 'hard')}
					>
						Schwer 🌳
						<span class="difficulty-info">2x2 Raster, weniger Punkte</span>
					</button>
				</div>
			</div>

			<div class="tutorial-box">
				<h3>Wie wird gespielt? 📖</h3>
				<ul>
					<li>Decke die Kacheln auf, um das Tier zu sehen</li>
					<li>Je weniger Kacheln du aufdeckst, desto mehr Punkte bekommst du</li>
					<li>Versuche das Nationaltier zu erraten</li>
				</ul>
			</div>

			<div class="autofill-control">
				<button 
					class="autofill-toggle {autoFillEnabled ? 'active' : ''}"
					on:click={toggleAutoFill}
					on:mouseenter={() => showAutoFillInfo = true}
					on:mouseleave={() => showAutoFillInfo = false}
				>
					{#if autoFillEnabled}
						<span class="toggle-icon">🎯</span>
						Vorschläge aktiviert
					{:else}
						<span class="toggle-icon">🎲</span>
						Vorschläge deaktiviert
					{/if}
				</button>
				{#if showAutoFillInfo}
					<div class="autofill-info">
						<p>
							{#if autoFillEnabled}
								Während du tippst, werden dir passende Tiernamen vorgeschlagen. Das macht das Raten einfacher! 🦁
							{:else}
								Du möchtest die Tiernamen selbst erraten? Keine Vorschläge werden angezeigt - eine echte Herausforderung! 🤔
							{/if}
						</p>
					</div>
				{/if}
			</div>

			{#if lastScore}
				<div class="last-score">
					Dein letztes Spiel: {lastScore} Punkte
				</div>
			{/if}

			<button class="safari-button" on:click={startGame}> Auf zur Safari! 🦁 </button>
		</div>
	{:else}
		<div class="game-container">
			<div class="player-info">
				<div class="player-avatar">
					{#if playerName}
						<span class="avatar-text">{playerName[0].toUpperCase()}</span>
					{/if}
				</div>
				<div class="player-name">
					<span class="welcome-text">Hallo, {playerName}!</span>
					<span class="mission-text">Finde das Nationaltier von {country}</span>
				</div>
			</div>

			<div class="game-status">
				<div class="status-item score">
					<span class="status-label">🎯 Punktzahl</span>
					<span class="status-value">{calculateScore()}</span>
				</div>
				<div class="status-item tiles">
					<span class="status-label">🧩 Kacheln</span>
					<span class="status-value">{counter}/{rows * cols}</span>
				</div>
			</div>

			{#if showHint && hintText}
				<div class="hint-box">
					<div class="hint-icon">💡</div>
					<p class="hint-text">{hintText}</p>
				</div>
			{/if}

			<div class="grid-container">
				<div class="grid" style="--cols: {cols}; background-image: url('{imageUrl}');">
					{#each revealedTiles as revealed, index}
						<button 
							class="tile {revealed ? 'revealed' : ''}" 
							on:click={() => revealTile(index)} 
							aria-label="Tile" 
							role="button"
						>
							{#if !revealed}
								<span class="tile-number">{index + 1}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<div class="guess-container">
				<form on:submit={checkGuess} class="guess-form">
					<label for="guessed-name">
						<span class="guess-label">🤔 Welches Tier ist das?</span>
					</label>
					<div class="input-group">
						<div class="input-wrapper">
							<input
								id="guessed-name"
								type="text"
								bind:value={guessedName}
								bind:this={guessedNameInput}
								placeholder="Tiername eingeben..."
								class="guess-input"
								on:input={handleInput}
								on:keydown={handleKeydown}
								autocomplete="off"
								required
							/>
							{#if showSuggestions && suggestions.length > 0}
								<div class="suggestions-container">
									{#each suggestions as suggestion}
										<button
											type="button"
											class="suggestion-item {suggestion === currentSuggestion ? 'active' : ''}"
											on:click={() => selectSuggestion(suggestion)}
										>
											{suggestion}
										</button>
									{/each}
								</div>
							{/if}
						</div>
						<button type="submit" class="guess-button">
							Prüfen! 🔍
						</button>
					</div>
				</form>
			</div>
		</div>

		{#if isCorrect}
			<div class="success">
				<div class="success-header">
					<h3>🎉 Super gemacht {playerName}! 🎉</h3>
					<p class="success-text">Das Tier ist ein {animal}, das Nationaltier von {country}.</p>
					<div class="final-score">
						<span class="score-label">Deine Punktzahl:</span>
						<span class="score-value">{calculateScore()}</span>
					</div>
				</div>
				{#if wikiInfo}
					<div class="wiki-info">
						<h4>📚 Wissenswertes:</h4>
						<p>{wikiInfo}</p>
					</div>
				{:else}
					<div class="loading-info">
						<div class="loading-spinner"></div>
						<p>Lade spannende Fakten...</p>
					</div>
				{/if}
			</div>
		{/if}

		{#if showCountdown}
			<div class="countdown-container">
				<p class="countdown-text">Neues Spiel in</p>
				<div class="countdown-number">{countdown}</div>
				<p class="countdown-text">Sekunden</p>
			</div>
		{/if}
	{/if}
</div>

<style>
	.puzzle-mode {
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 25px;
		border: 6px solid var(--jungle-primary);
		box-shadow: 0 8px 24px var(--jungle-shadow);
		padding: 30px;
		max-width: 800px;
		margin: 30px auto;
		position: relative;
		z-index: 1;
	}

	h1 {
		font-size: 2.4rem;
		text-align: center;
		color: var(--jungle-primary);
		margin-bottom: 1.5rem;
		text-shadow: 2px 2px 4px var(--jungle-shadow);
	}

	.hint {
		font-size: 1.4rem;
		text-align: center;
		color: var(--jungle-text);
		margin-bottom: 2rem;
		line-height: 1.4;
	}

	.name-input-container {
		margin: 40px auto;
		padding: 30px;
		background: linear-gradient(145deg, #fff9e6 0%, #ffd8b3 100%);
		border-radius: 20px;
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
		position: relative;
		z-index: 2;
		max-width: 900px;
		width: 95%;
	}

	.welcome-box {
		background-color: var(--jungle-primary);
		color: white;
		padding: 2rem;
		border-radius: 15px;
		margin-bottom: 2rem;
		text-align: center;
	}

	.welcome-box h2 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.name-intro {
		font-size: 1.4rem;
		line-height: 1.6;
		color: white;
		margin-bottom: 1.5rem;
	}

	.input-with-button {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		justify-content: center;
		margin: 1.5rem 0;
	}

	.name-input {
		width: 100%;
		max-width: 350px;
		padding: 15px;
		border: 4px solid var(--jungle-primary);
		border-radius: 12px;
		font-size: 1.4rem;
		background-color: white;
	}

	.name-generator {
		padding: 15px 30px;
		background-color: var(--jungle-secondary);
		color: white;
		border: none;
		border-radius: 12px;
		font-size: 1.4rem;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.safari-button {
		background-color: var(--jungle-primary);
		color: white;
		padding: 20px 40px;
		border: none;
		border-radius: 12px;
		font-size: 1.4rem;
		cursor: pointer;
		transition: all 0.3s ease;
		width: 100%;
		max-width: 350px;
		margin-top: 1.5rem;
		animation: float 2s ease-in-out infinite;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}

	.difficulty-box {
		margin: 2.5rem 0;
		padding: 2rem;
		background: white;
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.difficulty-box h3 {
		font-size: 1.8rem;
		color: var(--jungle-primary);
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.difficulty-options {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 1.5rem;
	}

	.difficulty-button {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem;
		border: 4px solid var(--jungle-primary);
		border-radius: 15px;
		background: white;
		cursor: pointer;
		transition: all 0.3s ease;
		min-width: 160px;
		font-size: 1.4rem;
	}

	.difficulty-button:hover {
		transform: translateY(-4px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
	}

	.difficulty-button.active {
		background: var(--jungle-primary);
		color: white;
		transform: scale(1.05);
	}

	.difficulty-info {
		font-size: 1.2rem;
		margin-top: 0.8rem;
		opacity: 0.9;
	}

	.tutorial-box {
		background-color: var(--jungle-light);
		padding: 1.5rem;
		border-radius: 15px;
		margin: 1.5rem 0;
		border: 3px solid var(--jungle-primary);
	}

	.tutorial-box h3 {
		font-size: 1.8rem;
		color: var(--jungle-primary);
		margin-bottom: 1rem;
		text-align: center;
	}

	.tutorial-box ul {
		font-size: 1.4rem;
		line-height: 1.8;
		padding-left: 2rem;
	}

	.game-container {
		background: linear-gradient(145deg, #ffffff, #f0f0f0);
		border-radius: 25px;
		padding: 2rem;
		margin: 2rem auto;
		max-width: 800px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.autofill-control {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 1.5rem 0;
		background: white;
		padding: 1.5rem;
		border-radius: 15px;
		border: 3px solid var(--jungle-primary);
	}

	.autofill-toggle {
		background: var(--jungle-light);
		border: 3px solid var(--jungle-primary);
		border-radius: 12px;
		padding: 1rem 2rem;
		font-size: 1.4rem;
		color: var(--jungle-primary);
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		gap: 1rem;
		width: auto;
		min-width: 250px;
		justify-content: center;
	}

	.autofill-toggle.active {
		background: var(--jungle-primary);
		color: white;
	}

	.toggle-icon {
		font-size: 1.8rem;
	}

	.autofill-info {
		margin-top: 1rem;
		background: var(--jungle-light);
		border-radius: 12px;
		padding: 1rem;
		width: 100%;
		max-width: 500px;
		text-align: center;
		animation: fadeIn 0.3s ease-out;
	}

	.autofill-info p {
		font-size: 1.4rem;
		color: var(--jungle-text);
		margin: 0;
		line-height: 1.5;
	}

	.player-info {
		background: var(--jungle-primary);
		color: white;
		padding: 1.5rem;
		border-radius: 20px;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		margin-bottom: 2rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.player-avatar {
		width: 60px;
		height: 60px;
		background: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.8rem;
		font-weight: bold;
		color: var(--jungle-primary);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.player-name {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.welcome-text {
		font-size: 1.4rem;
		font-weight: bold;
	}

	.mission-text {
		font-size: 1.4rem;
		opacity: 0.9;
	}

	.input-wrapper {
		position: relative;
		flex: 1;
	}

	.suggestions-container {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: white;
		border: 4px solid var(--jungle-primary);
		border-top: none;
		border-radius: 0 0 15px 15px;
		overflow: hidden;
		z-index: 1000;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	}

	.suggestion-item {
		width: 100%;
		padding: 1.2rem;
		border: none;
		background: none;
		text-align: left;
		font-size: 1.4rem;
		color: var(--jungle-text);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.suggestion-item:hover,
	.suggestion-item.active {
		background: var(--jungle-light);
		color: var(--jungle-primary);
	}

	.suggestion-item:not(:last-child) {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.game-status {
		display: flex;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 2rem;
	}

	.status-item {
		background: var(--jungle-primary);
		color: white;
		padding: 1rem 2rem;
		border-radius: 15px;
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 150px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		transform: scale(1);
		transition: transform 0.3s ease;
	}

	.status-item:hover {
		transform: scale(1.05);
	}

	.status-label {
		font-size: 1.4rem;
		margin-bottom: 0.5rem;
	}

	.status-value {
		font-size: 1.8rem;
		font-weight: bold;
	}

	.grid-container {
		position: relative;
		padding: 1rem;
		background: white;
		border-radius: 25px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		margin: 2rem auto;
	}

	.grid {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--cols), 1fr);
		width: min(90vw, 500px);
		height: min(90vw, 500px);
		margin: 0 auto;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		border: 8px solid var(--jungle-primary);
		border-radius: 25px;
		overflow: hidden;
		box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
	}

	.tile {
		background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
		cursor: pointer;
		transition: all 0.4s ease;
		border: 3px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tile-number {
		color: rgba(255, 255, 255, 0.7);
		font-size: 1.4rem;
		font-weight: bold;
	}

	.tile:hover {
		background: linear-gradient(145deg, #3a3a3a, #2a2a2a);
		transform: scale(0.97);
	}

	.tile.revealed {
		background: transparent;
		pointer-events: none;
		border: none;
		animation: revealTile 0.5s ease-out;
	}

	@keyframes revealTile {
		0% { transform: rotateY(0deg); opacity: 1; }
		50% { transform: rotateY(90deg); opacity: 0.5; }
		100% { transform: rotateY(180deg); opacity: 0; }
	}

	.guess-container {
		margin-top: 2rem;
	}

	.guess-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.guess-label {
		font-size: 1.4rem;
		color: var(--jungle-primary);
		font-weight: bold;
		margin-bottom: 1rem;
		display: block;
		text-align: center;
	}

	.input-group {
		display: flex;
		gap: 1rem;
		width: 100%;
		max-width: 600px;
	}

	.guess-input {
		flex: 1;
		padding: 1.5rem;
		font-size: 1.4rem;
		border: 4px solid var(--jungle-primary);
		border-radius: 15px;
		background: white;
		transition: all 0.3s ease;
	}

	.guess-input:focus {
		box-shadow: 0 0 0 4px rgba(var(--jungle-primary-rgb), 0.3);
		outline: none;
	}

	.guess-button {
		padding: 1.5rem 3rem;
		font-size: 1.4rem;
		background: var(--jungle-primary);
		color: white;
		border: none;
		border-radius: 15px;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.guess-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
	}

	.guess-button:active {
		transform: translateY(1px);
	}

	.hint-box {
		background: linear-gradient(145deg, #fff9c4, #fff59d);
		border-radius: 20px;
		padding: 1.5rem;
		margin: 1.5rem auto;
		max-width: 600px;
		display: flex;
		align-items: center;
		gap: 1.5rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		animation: float 3s ease-in-out infinite;
	}

	.hint-icon {
		font-size: 1.8rem;
	}

	.hint-text {
		font-size: 1.4rem;
		color: var(--jungle-text);
		line-height: 1.4;
		flex: 1;
	}

	.success {
		background: linear-gradient(145deg, #81c784, #66bb6a);
		border-radius: 25px;
		padding: 2.5rem;
		margin-top: 2rem;
		text-align: center;
		color: white;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	}

	.success-header {
		margin-bottom: 2rem;
	}

	.success-header h3 {
		font-size: 1.8rem;
		margin-bottom: 1rem;
	}

	.success-text {
		font-size: 1.4rem;
		margin-bottom: 1.5rem;
	}

	.final-score {
		background: white;
		color: var(--jungle-primary);
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 2rem;
		border-radius: 15px;
		font-size: 1.4rem;
		font-weight: bold;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.loading-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: white;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	@keyframes float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-6px); }
	}

	.countdown-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.95);
		padding: 3rem;
		border-radius: 25px;
		color: white;
		z-index: 1000;
		text-align: center;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
	}

	.countdown-text {
		font-size: 1.4rem;
		margin: 1rem 0;
	}

	.countdown-number {
		font-size: 2.4rem;
		font-weight: bold;
		color: var(--jungle-primary);
		background: white;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1.5rem auto;
	}

	@media (max-width: 768px) {
		.puzzle-mode {
			padding: 20px;
			margin: 15px;
		}

		h1 {
			font-size: 2.4rem;
		}

		.hint {
			font-size: 1.4rem;
		}

		.name-input-container {
			padding: 15px;
			margin: 10px;
			width: auto;
		}

		.difficulty-button {
			min-width: 140px;
			padding: 1.2rem;
		}

		.game-container {
			padding: 1rem;
			margin: 1rem;
		}

		.game-status {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}

		.status-item {
			width: 100%;
			max-width: 300px;
		}

		.input-group {
			flex-direction: column;
		}

		.guess-button {
			width: 100%;
		}

		.success {
			padding: 1.5rem;
		}

		.success-header h3 {
			font-size: 1.8rem;
		}

		.success-text {
			font-size: 1.4rem;
		}

		.final-score {
			font-size: 1.4rem;
			padding: 0.8rem 1.5rem;
		}

		.countdown-container {
			padding: 2rem;
		}

		.countdown-text {
			font-size: 1.4rem;
		}

		.countdown-number {
			font-size: 2.4rem;
			width: 80px;
			height: 80px;
		}

		.player-info {
			flex-direction: column;
			text-align: center;
			padding: 1rem;
		}

		.player-name {
			align-items: center;
		}

		.welcome-text {
			font-size: 1.4rem;
		}

		.mission-text {
			font-size: 1.4rem;
		}

		.autofill-toggle {
			font-size: 1.4rem;
			padding: 0.8rem 1.5rem;
			min-width: 200px;
		}

		.autofill-info {
			max-width: 100%;
		}

		.autofill-info p {
			font-size: 1.4rem;
		}
	}
</style>
