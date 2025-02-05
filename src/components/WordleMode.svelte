<script>
    import { onMount } from 'svelte';
    import confetti from 'canvas-confetti';
    import { animalList } from '../lib/animalList.js';
    import { getAnimalInfo } from '../lib/wikipedia.js';

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
        randomizedAnimalList = animalList.map(a => a.name);
        for (let i = randomizedAnimalList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedAnimalList[i], randomizedAnimalList[j]] = [randomizedAnimalList[j], randomizedAnimalList[i]];
        }
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
        randomizedAnimalList = animalList.map(a => a.name);
        for (let i = randomizedAnimalList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomizedAnimalList[i], randomizedAnimalList[j]] = [randomizedAnimalList[j], randomizedAnimalList[i]];
        }
    }

    function revealTile(index) {
        if (!revealed[index]) {
            revealed[index] = true;
            counter++;
        }
    }

    async function showAnimalInfo() {
        try {
            wikiInfo = await getAnimalInfo(correctAnimal);
        } catch (error) {
            apiError = 'Entschuldigung, ich konnte gerade keine Informationen laden. Aber das Tier ist trotzdem super! 🌟';
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

    function saveHighscore(score) {
        if (highscoreStore) {
            highscoreStore.update(scores => [
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
        randomizedAnimalList = animalList.map(a => a.name);
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);

            const searchTerms = {
                'Bundesadler': 'coat of arms of germany federal eagle',
                'Doppelköpfiger Adler': 'albanian double headed eagle coat of arms',
                'Weißer Adler': 'polish white eagle coat of arms emblem',
                'Leo Belgicus': 'belgian lion heraldic symbol historic',
                'Gallischer Hahn': 'gallic rooster french national emblem',
                'Weißkopfseeadler': 'american bald eagle national bird',
                'Chinesischer Drache': 'chinese imperial dragon traditional art',
                'Walisischer Drache': 'welsh red dragon flag emblem',
                'Schottisches Einhorn': 'scottish unicorn royal coat of arms',
                'Norwegischer Löwe': 'norwegian lion coat of arms royal',
                'Singapur Merlion': 'singapore merlion statue official',
                'Schwedischer Löwe': 'swedish three crowns coat of arms',
                'Tschechischer Löwe': 'czech bohemian lion coat of arms',
                'Finnischer Löwe': 'finnish lion coat of arms official',
                'Mexikanischer Adler': 'mexican eagle snake cactus emblem',
                'Sri-Lanka-Löwe': 'sri lanka lion flag national symbol'
            };

            const currentAnimal = animalList.find(a => a.name === correctAnimal);
            if (currentAnimal) {
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

                const deTitle = wikiTitles[correctAnimal] || correctAnimal;
                let wikiImage = await fetchWikiImage(deTitle, 'de');

                if (!wikiImage) {
                    const enTitles = {
                        'Bundesadler': 'Coat_of_arms_of_Germany',
                        'Doppelköpfiger Adler': 'Coat_of_arms_of_Albania',
                        'Weißer Adler': 'Coat_of_arms_of_Poland',
                        'Leo Belgicus': 'Leo_Belgicus',
                        'Gallischer Hahn': 'Gallic_rooster',
                        'Weißkopfseeadler': 'Bald_eagle',
                        'Chinesischer Drache': 'Chinese_dragon',
                        'Walisischer Drache': 'Welsh_Dragon',
                        'Schottisches Einhorn': 'Royal_unicorn',
                        'Norwegischer Löwe': 'Coat_of_arms_of_Norway',
                        'Singapur Merlion': 'Merlion',
                        'Schwedischer Löwe': 'Coat_of_arms_of_Sweden',
                        'Tschechischer Löwe': 'Coat_of_arms_of_the_Czech_Republic',
                        'Finnischer Löwe': 'Coat_of_arms_of_Finland',
                        'Mexikanischer Adler': 'Coat_of_arms_of_Mexico',
                        'Sri-Lanka-Löwe': 'Flag_of_Sri_Lanka'
                    };
                    const enTitle = enTitles[correctAnimal] || correctAnimal;
                    wikiImage = await fetchWikiImage(enTitle, 'en');
                }

                if (wikiImage) {
                    imageUrl = wikiImage;
                    return;
                }
            }

            const searchQuery = searchTerms[correctAnimal] || `${correctAnimal} national symbol heraldic`;
            const response = await fetch(
                `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&orientation=landscape&content_filter=high&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
                { signal: controller.signal }
            );

            clearTimeout(timeoutId);
            const data = await response.json();
            
            if (data?.urls?.regular && data.width >= 800 && data.height >= 600) {
                imageUrl = data.urls.regular;
                return;
            }
            throw new Error('Image quality not sufficient');
            
        } catch (error) {
            console.error('Error fetching image:', error);
            const fallbackPath = `/animals/${correctAnimal.toLowerCase().replace(/[\s-]/g, '-')}.jpg`;
            try {
                const img = new Image();
                img.src = fallbackPath;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
                imageUrl = fallbackPath;
            } catch (fallbackError) {
                console.error('Fallback image not found:', fallbackError);
                imageUrl = '/animals/default-animal.jpg';
            }
        }
    });

    async function fetchWikiImage(title, lang = 'de') {
        try {
            const response = await fetch(
                `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1024&origin=*`
            );
            const data = await response.json();
            const pages = data.query.pages;
            const pageId = Object.keys(pages)[0];
            return pages[pageId]?.thumbnail?.source;
        } catch (error) {
            console.error(`Error fetching ${lang} Wikipedia image:`, error);
            return null;
        }
    }
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
            
            <div class="game-layout">
                <div class="hint-panel">
                    <div class="hint-box">
                        <h3>🌟 Hinweise</h3>
                        <ul>
                            <li>🔍 Das Tier lebt in {country}</li>
                            <li>🎯 Decke Kacheln auf, um mehr zu sehen</li>
                            <li>⭐ Weniger Versuche = Mehr Punkte!</li>
                        </ul>
                    </div>
                    <div class="score-display">
                        Aktuelle Punktzahl: {points - clickedAnimals.size * 10 - counter * 5}
                    </div>
                </div>

                <div class="main-game">
                    <div class="grid" style="--cols: 3; background-image: url('{imageUrl}');">
                        {#each Array(9) as _, index}
                            <div
                                class="tile {revealed[index] ? 'revealed' : ''}"
                                on:click={() => revealTile(index)}
                            />
                        {/each}
                    </div>

                    <div class="animal-selection">
                        <h3>Welches Tier ist das? 🤔</h3>
                        <div class="animal-grid">
                            {#each randomizedAnimalList as animal}
                                <button
                                    class="animal-button {clickedAnimals.has(animal) ? 'clicked' : ''}"
                                    on:click={() => checkSelection(animal)}
                                    disabled={clickedAnimals.has(animal) || isCorrect}
                                >
                                    {#if animal === 'Bundesadler'}
                                        Bundesadler 🦅
                                    {:else if animal === 'Doppelköpfiger Adler'}
                                        Doppelköpfiger Adler 🦅
                                    {:else if animal === 'Weißer Adler'}
                                        Weißer Adler 🦅
                                    {:else if animal === 'Leo Belgicus'}
                                        Leo Belgicus 🦁
                                    {:else if animal === 'Gallischer Hahn'}
                                        Gallischer Hahn 🐓
                                    {:else if animal === 'Weißkopfseeadler'}
                                        Weißkopfseeadler 🦅
                                    {:else if animal === 'Chinesischer Drache'}
                                        Chinesischer Drache 🐲
                                    {:else if animal === 'Walisischer Drache'}
                                        Walisischer Drache 🐲
                                    {:else if animal === 'Schottisches Einhorn'}
                                        Schottisches Einhorn 🦄
                                    {:else if animal === 'Norwegischer Löwe'}
                                        Norwegischer Löwe 🦁
                                    {:else if animal === 'Singapur Merlion'}
                                        Singapur Merlion 🦁
                                    {:else if animal === 'Schwedischer Löwe'}
                                        Schwedischer Löwe 🦁
                                    {:else if animal === 'Tschechischer Löwe'}
                                        Tschechischer Löwe 🦁
                                    {:else if animal === 'Finnischer Löwe'}
                                        Finnischer Löwe 🦁
                                    {:else if animal === 'Mexikanischer Adler'}
                                        Mexikanischer Adler 🦅
                                    {:else if animal === 'Sri-Lanka-Löwe'}
                                        Sri-Lanka-Löwe 🦁
                                    {:else}
                                        {animal}
                                    {/if}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
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
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
        background-color: var(--jungle-light);
        border-radius: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .name-input-container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: white;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .welcome-box {
        background: var(--jungle-primary);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        text-align: center;
        color: white;
    }

    .welcome-box h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .name-intro {
        font-size: 1.2rem;
        line-height: 1.6;
    }

    .input-with-button {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        margin: 1.5rem 0;
    }

    .kid-input {
        width: 100%;
        max-width: 300px;
        padding: 1rem;
        border: 2px solid var(--jungle-primary);
        border-radius: 8px;
        font-size: 1.1rem;
        background: var(--jungle-light);
    }

    .name-generator {
        padding: 1rem 2rem;
        background: var(--jungle-secondary);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .safari-button {
        width: 100%;
        max-width: 300px;
        margin: 1.5rem auto;
        padding: 1rem;
        background: var(--jungle-primary);
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: transform 0.2s ease;
        display: block;
    }

    .safari-button:hover,
    .name-generator:hover {
        transform: translateY(-2px);
    }

    .tutorial-box {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--jungle-light);
        border-radius: 12px;
    }

    .tutorial-box h3 {
        font-size: 1.2rem;
        color: var(--jungle-primary);
        margin-bottom: 1rem;
        text-align: center;
    }

    .tutorial-box ul {
        list-style: none;
        padding: 0;
    }

    .tutorial-box li {
        font-size: 1rem;
        padding: 0.8rem;
        margin: 0.5rem 0;
        background: white;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    h1 {
        font-size: 2.4rem;
        color: var(--jungle-primary);
        margin-bottom: 1rem;
        font-weight: bold;
        text-align: center;
    }

    .hint {
        font-size: 1.2rem;
        color: var(--jungle-text);
        opacity: 0.8;
        margin-bottom: 2rem;
        text-align: center;
    }

    .game-layout {
        display: grid;
        grid-template-columns: 280px 1fr;
        gap: 2rem;
        margin: 0 auto;
        align-items: start;
    }

    .hint-panel {
        position: sticky;
        top: 2rem;
        background: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .hint-box {
        margin-bottom: 1.5rem;
    }

    .hint-box h3 {
        font-size: 1.2rem;
        color: var(--jungle-primary);
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .hint-box ul {
        list-style: none;
        padding: 0;
    }

    .hint-box li {
        font-size: 1rem;
        padding: 0.8rem;
        margin: 0.5rem 0;
        background: var(--jungle-light);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .score-display {
        font-size: 1.2rem;
        color: var(--jungle-primary);
        font-weight: bold;
        padding: 1rem;
        background: var(--jungle-light);
        border-radius: 8px;
        margin-top: 1rem;
        text-align: center;
    }

    .main-game {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .grid {
        aspect-ratio: 1;
        width: 100%;
        max-width: 450px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        background-size: cover;
        background-position: center;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    }

    .tile {
        background: rgba(0, 0, 0, 0.85);
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .tile:hover {
        background: rgba(0, 0, 0, 0.7);
    }

    .tile.revealed {
        background: transparent;
        pointer-events: none;
        border: none;
    }

    .animal-selection {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
    }

    .animal-selection h3 {
        font-size: 1.2rem;
        color: var(--jungle-text);
        margin-bottom: 1rem;
        opacity: 0.8;
        text-align: center;
    }

    .animal-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.8rem;
    }

    .animal-button {
        padding: 0.8rem;
        min-height: 54px;
        font-size: 1rem;
        background: var(--jungle-light);
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--jungle-text);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.2;
        word-break: break-word;
    }

    .animal-button:hover:not(:disabled) {
        background: var(--jungle-secondary);
        color: white;
        transform: translateY(-2px);
    }

    .animal-button.clicked {
        background: var(--jungle-dark);
        color: white;
        opacity: 0.7;
        transform: none;
    }

    .feedback {
        font-size: 1.1rem;
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 8px;
        background: var(--jungle-secondary);
        color: white;
        text-align: center;
    }

    .feedback.success {
        background: var(--jungle-primary);
    }

    .success {
        margin-top: 2rem;
        padding: 1.5rem;
        background: var(--jungle-light);
        border-radius: 16px;
        text-align: center;
    }

    .wiki-info {
        background: white;
        border-radius: 8px;
        padding: 1rem;
        margin-top: 1rem;
        font-size: 1rem;
        line-height: 1.5;
    }

    .countdown-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.95);
        padding: 2rem;
        border-radius: 16px;
        color: white;
        z-index: 100;
        text-align: center;
        min-width: 200px;
    }

    .countdown-number {
        font-size: 3rem;
        font-weight: bold;
        color: var(--jungle-primary);
        background: white;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 1rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .countdown-text {
        font-size: 1.4rem;
        margin: 0;
    }

    .player-welcome {
        font-size: 1.2rem;
        color: var(--jungle-text);
        margin-bottom: 1.5rem;
        text-align: center;
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

    @media (max-width: 1024px) {
        .game-layout {
            grid-template-columns: 1fr;
        }

        .hint-panel {
            position: static;
            margin-bottom: 2rem;
        }

        .animal-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .wordle-mode {
            padding: 1rem;
            margin: 1rem;
        }

        .main-game {
            padding: 1rem;
        }

        .grid {
            max-width: 350px;
        }

        .kid-input,
        .safari-button {
            max-width: 100%;
        }

        .name-generator {
            width: 100%;
        }
    }

    @media (max-width: 480px) {
        .animal-grid {
            grid-template-columns: 1fr;
        }

        .grid {
            max-width: 280px;
        }

        h1 {
            font-size: 1.8rem;
        }

        .welcome-box h2 {
            font-size: 1.6rem;
        }
    }
</style>