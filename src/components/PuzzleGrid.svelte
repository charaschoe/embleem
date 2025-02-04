<script lang="ts">
    import { onMount } from 'svelte';
    import confetti from 'canvas-confetti';
    import { animalList } from '../lib/animalList';

    export let highscoreStore;
    export let animal: string;
    export let rows = 3;
    export let cols = 3;
    export let imageUrl = '';
    export let country = '';

    let hint = '';
    let revealedTiles = Array(rows * cols).fill(false);
    let guessedName = '';
    let playerName = '';
    let isCorrect = false;
    let counter = 0;
    let guessedNameInput: HTMLInputElement;
    let showGame = false;
    let countdown = 4;
    let showCountdown = false;
    let points = 100;

    // Debug: Display internal animal name
    $: debugAnimalName = `Internal Animal Name: ${animal} (Country: ${country})`;

    const placeholderNames = [
        'Kleiner Panda', 'Süße Giraffe', 'Fröhlicher Pinguin', 'Niedlicher Koala',
        'Bunter Papagei', 'Sanfter Delfin', 'Lustiger Otter', 'Schlauer Fuchs',
        'Munteres Känguru', 'Treuer Elefant',
        'Safari Scout', 'Dschungel Entdecker', 'Tierfreund', 'Naturkenner',
        'Tierspürer', 'Waldläufer', 'Savannen Guide'
    ];

    function generateRandomName() {
        playerName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
    }

    function startGame() {
        if (!playerName.trim()) {
            alert('Bitte gib deinen Namen ein!');
            return;
        }
        showGame = true;
    }

    function calculateScore() {
        const tilePenalty = counter * 5;
        return Math.max(0, points - tilePenalty);
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
        points = 100;
        guessedName = '';
    }

    onMount(async () => {
        hint = 'Kannst du das Tier erraten? Decke die Kacheln auf!';
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(animal)}%20animal%20portrait&orientation=landscape&content_filter=high&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);
            const data = await response.json();
            imageUrl = data.urls.regular;
            guessedNameInput?.focus();
        } catch (error) {
            console.error('Error fetching image:', error);
            imageUrl = `/animals/${animal.toLowerCase().replace(' ', '-')}.jpg`;
        }
    });

    function revealTile(index: number): void {
        if (!revealedTiles[index]) {
            revealedTiles[index] = true;
            counter += 1;
        }
    }

    function checkGuess(e: Event) {
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
            setTimeout(() => {
                startCountdown();
            }, 2000);
        } else {
            alert('Leider falsch. Versuche es nochmal!');
            guessedName = '';
            guessedNameInput?.focus();
        }
    }

    function saveHighscore(score: number) {
        if (highscoreStore) {
            highscoreStore.update((scores) => [
                ...scores,
                { 
                    name: playerName, 
                    mode: 'Puzzle', 
                    animal: animal,
                    tiles: counter,
                    score: score,
                    date: new Date().toISOString()
                }
            ]);
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
            <p class="name-intro">
                Hallo kleiner Tierforscher! 🐾<br>
                Bevor wir auf Safari gehen, verrate mir doch deinen Namen.
            </p>
            
            <div class="input-group">
                <div class="input-with-button">
                    <input
                        type="text"
                        bind:value={playerName}
                        placeholder="Dein Name oder Tiername..."
                    />
                    <button class="name-generator" on:click={generateRandomName}>
                        Zufälliger Tiername 🎲
                    </button>
                    <button class="start-button" on:click={startGame}>
                        Auf zur Safari! 🦁
                    </button>
                </div>
            </div>
        </div>
    {:else}
        <p class="player-welcome">Los geht's, {playerName}!</p>
        <div class="score-display">Aktuelle Punktzahl: {points - (counter * 5)}</div>

        <div class="input-container">
            <form on:submit={checkGuess}>
                <label for="guessed-name">Welches Tier ist das?</label>
                <input
                    id="guessed-name"
                    type="text"
                    bind:value={guessedName}
                    bind:this={guessedNameInput}
                    placeholder="Tiername eingeben..."
                    required
                />
                <button type="submit">Prüfen</button>
            </form>
        </div>

        <div class="counter-box">
            <p>Aufgedeckte Kacheln: {counter}/{rows * cols}</p>
        </div>

        <div class="grid" style="--cols: {cols}; background-image: url('{imageUrl}');">
            {#each revealedTiles as revealed, index}
                <div class="tile {revealed ? 'revealed' : ''}" on:click={() => revealTile(index)}></div>
            {/each}
        </div>

        {#if isCorrect}
            <p class="success">
                Super gemacht {playerName}! Das Tier ist ein {animal}, 
                das Nationaltier von {country}. 
                Deine Punktzahl: {calculateScore()}
            </p>
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
        border-radius: 15px;
        border: 3px solid var(--jungle-primary);
        box-shadow: 0 4px 15px var(--jungle-shadow);
        padding: 20px;
    }

    .name-input-container {
        max-width: 500px;
        margin: 30px auto;
        padding: 20px;
        background-color: var(--jungle-light);
        border-radius: 10px;
    }

    .name-intro {
        font-size: 1.2rem;
        line-height: 1.6;
        color: var(--jungle-text);
        margin-bottom: 20px;
    }

    .input-with-button {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: center;
    }

    .name-generator {
        padding: 12px 24px;
        background-color: var(--jungle-secondary);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .start-button {
        padding: 12px 24px;
        background-color: var(--jungle-primary);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--cols), 1fr);
        width: min(90vw, 400px);
        height: min(90vw, 400px);
        margin: 20px auto;
        background-size: cover;
        background-position: center;
        border: 3px solid var(--jungle-primary);
        border-radius: 10px;
        overflow: hidden;
    }

    .tile {
        background: rgba(0, 0, 0, 0.85);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .tile.revealed {
        background: transparent;
        pointer-events: none;
    }

    .input-container {
        background-color: var(--jungle-light);
        border-radius: 10px;
        padding: 15px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input {
        padding: 12px;
        border: 2px solid var(--jungle-primary);
        border-radius: 8px;
        font-size: 1.1rem;
        background-color: rgba(255, 255, 255, 0.9);
    }

    input:focus {
        border-color: var(--jungle-accent);
        outline: none;
        box-shadow: 0 0 5px var(--jungle-shadow);
    }

    .score-display {
        font-size: 1.2rem;
        color: var(--jungle-primary);
        margin: 10px 0;
        font-weight: bold;
    }

    .countdown-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 2rem;
        border-radius: 15px;
        color: white;
        z-index: 2147483647;
        animation: fadeIn 0.5s ease;
    }

    .countdown-number {
        font-size: 4rem;
        font-weight: bold;
        color: var(--jungle-primary);
        margin: 1rem 0;
        animation: pulse 1s infinite;
    }

    .countdown-text {
        font-size: 1.2rem;
        margin: 0;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
</style>