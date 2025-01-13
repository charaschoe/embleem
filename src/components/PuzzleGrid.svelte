<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchUnsplashImage } from '../lib/unsplash.js'; // Import Unsplash function

  export let animal: string; // Animal name parameter
  let imageUrl = ''; // URL of the animal image
  let pieces = Array(9).fill(false); // Array for puzzle pieces (hidden)
  let guessedName = ''; // User input
  let isCorrect = false; // Status if name is correct

  onMount(async () => {
    imageUrl = await fetchUnsplashImage(animal); // Lade das Bild von Unsplash
    if (!imageUrl) {
      imageUrl = '/static/default-animal.jpg'; // Fallback-Bild, falls kein Bild gefunden wird
    }
  });

  function revealPiece(index: number) {
    pieces[index] = true; // Deckt das Puzzleteil auf
  }

  function checkGuess() {
    isCorrect = guessedName.toLowerCase() === animal.toLowerCase(); // Überprüfung des Namens
  }
</script>

<div class="puzzle-container">
   <div class="puzzle-grid">
      {#each pieces as revealed, index}
         <div 
            class="puzzle-piece {revealed ? 'revealed' : ''}" 
            on:click={() => revealPiece(index)}
         >
            {#if revealed}
               <span>Teil {index + 1}</span>
            {:else}
               ?
            {/if}
         </div>
      {/each}
   </div>

   <div class="animal-image">
      {#if imageUrl}
         <img src={imageUrl} alt={animal} />
      {:else}
         <p>Bild wird geladen...</p>
      {/if}
   </div>
</div>

<div class="guess-box">
   <input 
      type="text" 
      placeholder="Tiername eingeben..." 
      bind:value={guessedName} 
   />
   <button on:click={checkGuess}>Überprüfen</button>
</div>

{#if isCorrect}
   <p class="success">Richtig! Das Tier ist ein {animal}.</p>
{:else if guessedName}
   <p class="error">Leider falsch. Versuche es erneut!</p>
{/if}

<style>
.puzzle-container {
    position: relative;
    width: 300px;
    height: 300px;
}

.puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    width: 100%;
    height: 100%;
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

.puzzle-piece.revealed {
    background-color: #fff; /* Zeigt aufgedeckte Teile */
}

.animal-image img {
    width: 300px;
    height: 300px;
    object-fit: cover; /* Zuschneiden auf quadratische Form */
}

.guess-box {
    margin-top: 20px;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>
