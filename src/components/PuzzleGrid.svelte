<script>
  export let animal; // Tiername wird übergeben
  let pieces = Array(9).fill(false); // Array für Puzzleteile (verdeckt)
  let guessedName = ''; // Eingabe des Benutzers
  let isCorrect = false; // Status, ob der Name korrekt ist

  function revealPiece(index) {
    pieces[index] = true; // Deckt das Puzzleteil auf
  }

  function checkGuess() {
    isCorrect = guessedName.toLowerCase() === animal.toLowerCase(); // Überprüfung des Namens
  }
</script>

<div class="puzzle-grid">
  <!-- Puzzle-Raster -->
  {#each pieces as revealed, index}
    <div 
      class="puzzle-piece {revealed ? 'revealed' : ''}" 
      on:click={() => revealPiece(index)}
    >
      {#if revealed}
        <span>Teil {index + 1}</span> <!-- Platzhalter für das Puzzleteil -->
      {:else}
        ?
      {/if}
    </div>
  {/each}
</div>

<!-- Bild des Tieres -->
<div class="animal-image">
  <img src={`/static/${animal}.jpg`} alt={animal} />
</div>

<!-- Eingabebox für den Tiernamen -->
<div class="guess-box">
  <input 
    type="text" 
    placeholder="Tiername eingeben..." 
    bind:value={guessedName} 
  />
  <button on:click={checkGuess}>Überprüfen</button>
</div>

<!-- Ergebnisanzeige -->
{#if isCorrect}
  <p class="success">Richtig! Das Tier ist ein {animal}.</p>
{:else if guessedName}
  <p class="error">Leider falsch. Versuche es erneut!</p>
{/if}

<style>
  .puzzle-grid {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
  }

  .puzzle-piece {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px #999;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  .puzzle-piece:hover {
    transform: scale(1.1);
    background-color: #ddd;
  }

  .puzzle-piece.revealed {
    background-color: #fff; /* Zeigt aufgedeckte Teile */
    cursor: default;
  }

  .animal-image {
    margin-top: 20px;
    text-align: center;
  }

  .animal-image img {
    max-width: 300px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0,0,0,0.2);
  }

  .guess-box {
    margin-top: 20px;
    text-align: center;
  }

  .guess-box input {
    padding: 8px;
    font-size: 16px;
    width: calc(100% - 120px);
    max-width: 200px;
    margin-right: 10px;
    border-radius: 5px;
    border: solid #ccc thin;
  }

  .guess-box button {
    padding: 8px;
    font-size: 16px;
    background-color: #0077cc;
    color: white;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color ease-in-out .2s;
  }

  .guess-box button:hover {
    background-color: #005fa3;
  }

  .success {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
  }

  .error {
    color: red;
    text-align: center;
    margin-top: 10px;
  }
</style>
