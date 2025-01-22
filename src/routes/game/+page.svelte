<script>
  import PuzzleGrid from '../../components/PuzzleGrid.svelte';
  import { highscoreStore } from '$lib/highscoreStore.js';
  import { animalList } from '$lib/animalList.js';

  // Zufälliges Tier aus der Liste auswählen
  const wildAnimals = animalList.map(animal => animal.name);
  let randomAnimal = wildAnimals[Math.floor(Math.random() * wildAnimals.length)];
</script>

<h1>Tier-Aufdeckspiel</h1>
<p>Decke das Bild auf und errate den Namen des Tieres!</p>

<PuzzleGrid animal={randomAnimal} highscoreStore={highscoreStore} />

<style>
  h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
</style>
