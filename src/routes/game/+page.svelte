<script>
  import PuzzleGrid from '../../components/PuzzleGrid.svelte';
  import { fetchUnsplashImage } from '../../lib/unsplash.js';

  const wildAnimals = [
    "Tiger", "Löwe", "Elefant", "Leopard", "Gepard", "Nashorn",
    "Bär", "Wolf", "Fuchs", "Krokodil", "Giraffe",
    "Zebra", "Panda", "Schimpanse", "Gorilla",
    "Orang-Utan", "Adler", "Falke", "Hai", "Delfin"
  ];

  let randomAnimal = wildAnimals[Math.floor(Math.random() * wildAnimals.length)];
</script>

<h1>Puzzle-Spiel</h1>
<p>Decke das Bild auf und errate den Namen des Tieres!</p>

<PuzzleGrid animal={randomAnimal} />
