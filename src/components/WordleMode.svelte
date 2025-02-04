<script lang="ts">
    // Script-Teil bleibt unverändert wie im Original
    import { onMount } from 'svelte';
    import confetti from 'canvas-confetti';
    import { animalList as fullAnimalList } from '../lib/animalList';
    import { getAnimalInfo } from '../lib/wikipedia';

    export let correctAnimal = '';
    export let highscoreStore;
    export let country = '';
    export let imageUrl = '';

    let playerName = '';
    let showGame = false;
    let selectedAnimal = '';
    let feedback = '';
    let randomizedAnimalList = [];
    let clickedAnimals = new Set();
    let isCorrect = false;
    let revealed = Array(9).fill(false);
    let counter = 0;
    let countdown = 4;
    let showCountdown = false;
    let points = 100;
    let wikiInfo = '';
    let apiError = '';

    const placeholderNames = [
        // Niedliche Tiernamen
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

    function generateRandomName() {
        playerName = placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
    }

    function calculateScore() {
        const attemptPenalty = clickedAnimals.size * 10;
        const tilePenalty = counter * 5;
        return Math.max(0, points - attemptPenalty - tilePenalty);
    }

    function startGame() {
        if (!playerName.trim()) {
            alert('Bitte gib deinen Namen ein!');
            return;
        }
        randomizedAnimalList = fullAnimalList.map((a) => a.name).sort(() => Math.random() - 0.5);
        showGame = true;
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
        clickedAnimals.clear();
        revealed = Array(9).fill(false);
        counter = 0;
        points = 100;
        feedback = '';
        randomizedAnimalList = fullAnimalList.map((a) => a.name).sort(() => Math.random() - 0.5);
    }

    function revealTile(index: number): void {
        if (!revealed[index]) {
            revealed[index] = true;
            counter++;
        }
    }

    async function showAnimalInfo() {
        try {
            wikiInfo = await getAnimalInfo(correctAnimal);
        } catch (error) {
            apiError = 'Wikipedia-Informationen konnten nicht geladen werden';
            console.error('Wikipedia Fehler:', error);
        }
    }

    function checkSelection(animal) {
        if (clickedAnimals.has(animal)) return;

        clickedAnimals.add(animal);
        selectedAnimal = animal;

        if (animal === correctAnimal) {
            isCorrect = true;
            const finalScore = calculateScore();
            feedback = `Super gemacht ${playerName}! Du hast das richtige Tier gefunden! Deine Punktzahl: ${finalScore}`;
            saveHighscore(finalScore);
            triggerConfetti();
            showAnimalInfo();
            setTimeout(() => {
                startCountdown();
            }, 2000);
        } else {
            feedback = `Nicht ganz richtig, ${playerName}. Versuche es nochmal! (-10 Punkte)`;
        }
    }

    function saveHighscore(score: number) {
        if (highscoreStore) {
            highscoreStore.update((scores) => [
                ...scores,
                {
                    name: playerName,
                    mode: 'Wordle',
                    animal: correctAnimal,
                    attempts: clickedAnimals.size,
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

    onMount(async () => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(correctAnimal)}%20national%20animal&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);
            const data = await response.json();
            imageUrl = data.urls.regular;
        } catch (error) {
            console.error('Error fetching image:', error);
            imageUrl = '/default-animal.jpg';
        }
    });
</script>

<div class="wordle-mode">
    <h1>Tier-Ratespiel</h1>

    <p class="hint">Finde das Nationaltier von {country}!</p>

    {#if !showGame}
        <div class="name-input-container preschool-theme">
            <div class="welcome-box">
                <h2>Hallo kleiner Entdecker! 🐾</h2>
                <p class="name-intro">
                    Lass uns zusammen Tiere entdecken!<br/>
                    Wie sollen wir dich nennen?
                </p>
            </div>

            <div class="input-group">
                <div class="input-with-button">
                    <input
                        type="text"
                        bind:value={playerName}
                        placeholder="Dein Spitzname..."
                        class="kid-input"
                    />
                    <button class="name-generator" on:click={generateRandomName}>
                        🎲 Zaubername
                    </button>
                </div>
                <button class="safari-button" on:click={startGame}>
                    🚀 Abenteuer starten!
                </button>
            </div>

            <div class="tutorial-box">
                <h3>So funktioniert's 🌟</h3>
                <ul>
                    <li>🔍 Klicke auf die Kacheln um das Tier zu finden</li>
                    <li>🐾 Wähle den Namen aus der Liste aus</li>
                    <li>🌈 Je schneller du bist, desto mehr Sterne sammelst du</li>
                </ul>
            </div>
        </div>
    {:else}
        <div class="game-container">
            <p class="player-welcome">Los geht's, {playerName}!</p>
            <div class="score-display">
                Aktuelle Punktzahl: {points - clickedAnimals.size * 10 - counter * 5}
            </div>

            <div class="grid" style="--cols: 3; background-image: url('{imageUrl}');">
                {#each Array(9) as _, index}
                    <div
                        class="tile {revealed[index] ? 'revealed' : ''}"
                        on:click={() => revealTile(index)}
                    />
                {/each}
            </div>

            <div class="wordle-grid">
                {#each randomizedAnimalList as animal}
                    <button
                        class="animal-button {clickedAnimals.has(animal) ? 'clicked' : ''}"
                        on:click={() => checkSelection(animal)}
                        disabled={clickedAnimals.has(animal) || isCorrect}
                    >
                        {animal}
                    </button>
                {/each}
            </div>

            {#if feedback}
                <p class="feedback" class:success={isCorrect}>
                    {feedback}
                    {#if isCorrect}
                        <br />
                        <span class="attempts">Du hast {clickedAnimals.size} Versuche gebraucht.</span>
                    {/if}
                </p>
            {/if}

            {#if isCorrect}
                <div class="success">
                    <p>Super gemacht {playerName}! Das Tier ist ein {correctAnimal}, das Nationaltier von {country}.</p>
                    <p>Punktzahl: {calculateScore()}</p>
                    
                    {#if apiError}
                        <div class="error-message">{apiError}</div>
                    {:else if wikiInfo}
                        <div class="wiki-info">
                            <h4>Wissenswertes aus Wikipedia:</h4>
                            <p>{wikiInfo}</p>
                        </div>
                    {:else}
                        <p class="loading-info">Lade interessante Fakten...</p>
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
        </div>
    {/if}
</div>

<style>
    .wordle-mode {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 30px;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        border: 4px solid var(--jungle-primary);
        box-shadow: 0 6px 20px var(--jungle-shadow);
    }

    .name-input-container {
        max-width: 600px;
        margin: 40px auto;
        padding: 30px;
        background-color: var(--jungle-light);
        border-radius: 15px;
    }

    .name-intro {
        font-size: 1.4rem;
        line-height: 1.8;
        color: var(--jungle-text);
        margin-bottom: 30px;
    }

    .input-with-button {
        display: flex;
        gap: 15px;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 30px;
    }

    .name-generator {
        padding: 15px 30px;
        background-color: var(--jungle-secondary);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .start-button {
        padding: 15px 30px;
        background-color: var(--jungle-primary);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .grid {
        position: relative;
        display: grid;
        grid-template-columns: repeat(var(--cols), 1fr);
        width: min(90vw, 450px);
        height: min(90vw, 450px);
        margin: 30px auto;
        background-size: cover;
        background-position: center;
        border: 4px solid var(--jungle-primary);
        border-radius: 15px;
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

    .wordle-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        padding: 30px;
        margin-top: 30px;
    }

    .animal-button {
        padding: 20px;
        font-size: 1.2rem;
        background: var(--jungle-light);
        border: 3px solid var(--jungle-primary);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: var(--jungle-text);
    }

    .animal-button:hover:not(:disabled) {
        background: var(--jungle-secondary);
        color: white;
        transform: translateY(-3px);
    }

    .animal-button.clicked {
        background: var(--jungle-dark);
        color: white;
        cursor: not-allowed;
    }

    .feedback {
        font-size: 1.4rem;
        margin-top: 30px;
        padding: 20px;
        border-radius: 10px;
        background: var(--jungle-secondary);
        color: white;
    }

    .feedback.success {
        background: var(--jungle-primary);
    }

    .hint {
        font-size: 1.4rem;
        margin: 20px 0;
        color: var(--jungle-text);
    }

    .player-welcome {
        font-size: 1.4rem;
        margin: 30px 0;
        color: var(--jungle-text);
    }

    .score-display {
        font-size: 1.4rem;
        color: var(--jungle-primary);
        margin: 20px 0;
        font-weight: bold;
    }

    .countdown-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        padding: 3rem;
        border-radius: 20px;
        color: white;
        z-index: 2147483647;
        animation: fadeIn 0.5s ease;
    }

    .countdown-number {
        font-size: 4.5rem;
        font-weight: bold;
        color: var(--jungle-primary);
        margin: 1.5rem 0;
        animation: pulse 1s infinite;
    }

    .countdown-text {
        font-size: 1.4rem;
        margin: 0;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }

    .preschool-theme {
        background: linear-gradient(145deg, #fff9e6 0%, #ffd8b3 100%);
        border: 4px solid #ff9f4d;
        border-radius: 25px;
        padding: 3rem;
        margin: 3rem auto;
        max-width: 700px;
    }

    .welcome-box {
        background: #ff9f4d;
        padding: 2rem;
        border-radius: 20px;
        margin-bottom: 3rem;
        text-align: center;
    }

    .welcome-box h2 {
        font-size: 2.2rem;
        color: white;
        margin: 0 0 1.5rem 0;
    }

    .kid-input {
        font-size: 1.6rem;
        padding: 20px;
        border: 4px solid #ff9f4d;
        border-radius: 15px;
        min-width: 300px;
        text-align: center;
    }

    .safari-button {
        background: #ff6b6b;
        color: white;
        padding: 20px 50px;
        border: none;
        border-radius: 20px;
        font-size: 1.6rem;
        cursor: pointer;
        animation: float 2s ease-in-out infinite;
        margin-top: 30px;
    }

    .tutorial-box {
        background: rgba(255, 255, 255, 0.9);
        padding: 2rem;
        border-radius: 20px;
        margin-top: 3rem;
    }

    .tutorial-box h3 {
        font-size: 1.6rem;
        color: #ff6b6b;
        margin: 0 0 1.5rem 0;
        text-align: center;
    }

    .tutorial-box ul {
        list-style: none;
        padding: 0;
        font-size: 1.4rem;
    }

    .tutorial-box li {
        margin: 1.5rem 0;
        padding: 1rem;
        background: rgba(255, 159, 77, 0.1);
        border-radius: 10px;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }

    @media (max-width: 600px) {
        .kid-input {
            width: 100%;
        }
        .safari-button {
            width: 100%;
        }
    }

    /* Füge diese Styles hinzu */
    .wiki-info {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .error-message {
        color: #dc3545;
        background: #ffe6e6;
        padding: 0.8rem;
        border-radius: 8px;
        margin-top: 1rem;
    }

    .loading-info {
        font-size: 0.9rem;
        opacity: 0.7;
        margin-top: 1rem;
    }
</style>