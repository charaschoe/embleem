<script>
  import PuzzleGrid from '../../components/PuzzleGrid.svelte';
  import { fetchUnsplashImage } from '../../lib/unsplash.js';

  import { animalList } from '../../lib/animalList.js';
  const wildAnimals = animalList.map(animal => animal.name);

  let randomAnimal = wildAnimals[Math.floor(Math.random() * wildAnimals.length)];
</script>

<h1>Puzzle-Spiel</h1>
<p>Decke das Bild auf und errate den Namen des Tieres!</p>

<PuzzleGrid animal={randomAnimal} />
