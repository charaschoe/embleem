<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUnsplashImage } from '../lib/unsplash.js';
  import { animalList } from '../lib/animalList.js';

  export let animal: string; // Name of the animal
  let imageUrl = ''; // URL of the animal image
  let hint = ''; // Image hint
  let pieces = Array(9).fill(false); // Array for puzzle pieces (hidden)
  let guessedName = ''; // User input
  let isCorrect = false; // Status if name is correct

  onMount(async () => {
    const result = await fetchUnsplashImage(animal);
    if (result) {
      imageUrl = result;
      hint = 'Try to guess the animal!';
    } else {
      imageUrl = '/static/default-animal.jpg'; // Fallback image
      hint = 'No hints available.';
    }
  });

  function revealPiece(index: number): void {
    pieces[index] = true; // Reveals the puzzle piece
  }

  function checkGuess() {
    const animalData = animalList.find(a => a.name.toLowerCase() === animal.toLowerCase());
    if (animalData) {
      isCorrect = animalData.synonyms.some(synonym =>
        guessedName.toLowerCase().trim() === synonym.toLowerCase().trim()
      );
    } else {
      isCorrect = false;
    }
  }
</script>

<div class="puzzle-container">
   <!-- Puzzle-Blöcke -->
   <div class="puzzle-grid">
      {#each pieces as revealed, index}
         <div 
            class="puzzle-piece {revealed ? 'revealed' : ''}" 
            on:click={() => revealPiece(index)}
         >
            {#if revealed}
               <span></span> <!-- Leer, da der Block transparent wird -->
            {:else}
               ?
            {/if}
         </div>
      {/each}
   </div>

   <!-- Bild des Tieres -->
   <div class="animal-image">
      {#if imageUrl}
         <img src={imageUrl} alt={animal} />
      {:else}
         <p>Bild wird geladen...</p>
      {/if}
   </div>

   <!-- Hinweis -->
   <div class="hint-box">
      <p><strong>Hinweis:</strong> {hint}</p>
   </div>
</div>

<!-- Eingabebox für den Tiernamen -->
<div class="guess-box">
   <input 
      type="text" 
      placeholder="Enter animal name..." 
      bind:value={guessedName} 
   />
   <button on:click={checkGuess}>Check</button>
</div>

{#if isCorrect}
   <p class="success">Correct! The animal is a {animal}.</p>
{:else if guessedName}
   <p class="error">Wrong answer. Try again!</p>
{/if}

<style>
/* Container für Puzzle und Bild */
.puzzle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 300px;
    margin: 0 auto; /* Zentriert den gesamten Container */
}

/* Puzzle-Blöcke */
.puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* Drei Spalten */
    gap: 2px;
    width: 100%;
    height: 300px; /* Feste Höhe für die Puzzle-Blöcke */
}

.puzzle-piece {
    width: 100%;
    height: 100%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #999;
    font-size: 16px;
    cursor: pointer;
}

.puzzle-piece:hover {
    transform: scale(1.05);
}

.puzzle-piece.revealed {
    background-color: transparent; /* Macht das Puzzleteil transparent */
}

/* Bild des Tieres */
.animal-image {
    margin-top: 10px; /* Abstand zwischen Puzzle-Blöcken und Bild */
}

.animal-image img {
    width: 300px; /* Gleiche Breite wie die Puzzle-Blöcke */
    height: 300px; /* Gleiche Höhe wie die Puzzle-Blöcke */
    object-fit: cover; /* Zuschneiden auf quadratische Form */
}

/* Hinweisbox */
.hint-box {
    margin-top: 15px;
}

.hint-box p {
    font-size: 14px;
}

/* Eingabebox */
.guess-box {
    margin-top: 20px; /* Abstand unterhalb des Puzzles und Bildes */
}

.guess-box input {
    padding: 8px;
}

.guess-box button {
    padding: 8px;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>
