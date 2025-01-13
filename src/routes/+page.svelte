<script>
    import PuzzleGrid from '../components/PuzzleGrid.svelte';
    
    // Select a random animal for the demo
    const demoAnimal = "Tiger";
</script>

<div class="container"></div>
    <h1>Willkommen zum Wildtier-Puzzle!</h1>
    <p>Klicke unten, um das Spiel zu starten.</p>

    <div class="demo-puzzle">
        <PuzzleGrid animal={demoAnimal} />
    </div>

    <a href="/game">
        <button>Spiel starten</button>
    </a>
</div>

<style>
    .container {
        text-align: center;
        margin-top: 20px;
    }

    h1 {
        text-align: center;
        margin-top: 20px;
    }

    p {
        text-align: center;
        margin-bottom: 20px;
    }

    .demo-puzzle {
        max-width: 300px;
        margin: 20px auto;
    }

    button {
        display: block;
        margin: 0 auto;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #0077cc;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    button:hover {
        background-color: #005fa3;
    }
</style>
