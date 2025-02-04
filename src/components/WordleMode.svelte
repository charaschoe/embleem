<script lang="ts">
import { onMount } from 'svelte';
import confetti from 'canvas-confetti';

export let animalList = [];
export let correctAnimal = '';
export let highscoreStore;
export let country = '';

let playerName = '';
let showGame = false;
let selectedAnimal = '';
let feedback = '';
let randomizedAnimalList = [];
let clickedAnimals = new Set();
let isCorrect = false;

const placeholderNames = [
  'Kleiner Panda',
  'Süße Giraffe', 
  'Fröhlicher Pinguin',
  'Niedlicher Koala',
  'Bunter Papagei',
  'Sanfter Delfin',
  'Lustiger Otter',
  'Schlauer Fuchs',
  'Munteres Känguru',
  'Treuer Elefant'
];

function getRandomPlaceholder() {
  return placeholderNames[Math.floor(Math.random() * placeholderNames.length)];
}

function generateRandomName() {
  playerName = getRandomPlaceholder();
}

function startGame() {
  if (!playerName.trim()) {
    alert('Bitte gib deinen Namen ein!');
    return;
  }
  randomizedAnimalList = [...animalList].sort(() => Math.random() - 0.5);
  showGame = true;
}

function checkSelection(animal) {
  if (clickedAnimals.has(animal)) return;

  clickedAnimals.add(animal);
  selectedAnimal = animal;

  if (animal === correctAnimal) {
    isCorrect = true;
    feedback = `Super gemacht ${playerName}! Du hast das richtige Tier gefunden!`;
    saveHighscore();
    triggerConfetti();
  } else {
    feedback = `Nicht ganz richtig, ${playerName}. Versuche es nochmal!`;
  }
}

function saveHighscore() {
  if (highscoreStore) {
    highscoreStore.update((scores) => [
      ...scores,
      { 
        name: playerName, 
        mode: 'Wordle', 
        animal: correctAnimal,
        attempts: clickedAnimals.size,
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

<div class="wordle-mode">
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
    <div class="game-container">
      <p class="player-welcome">Los geht's, {playerName}!</p>

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
            <br>
            <span class="attempts">Du hast {clickedAnimals.size} Versuche gebraucht.</span>
          {/if}
        </p>
      {/if}
    </div>
  {/if}
</div>

<style>
.wordle-mode {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  border: 3px solid var(--jungle-primary);
  box-shadow: 0 4px 15px var(--jungle-shadow);
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

.wordle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  padding: 20px;
}

.animal-button {
  padding: 15px;
  font-size: 1.1rem;
  background: var(--jungle-light);
  border: 2px solid var(--jungle-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--jungle-text);
}

.animal-button:hover:not(:disabled) {
  background: var(--jungle-secondary);
  color: white;
  transform: translateY(-2px);
}

.animal-button.clicked {
  background: var(--jungle-dark);
  color: white;
  cursor: not-allowed;
}

.feedback {
  font-size: 1.2rem;
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: var(--jungle-secondary);
  color: white;
}

.feedback.success {
  background: var(--jungle-primary);
}

.hint {
  font-size: 1.2rem;
  margin: 15px 0;
  color: var(--jungle-text);
}

.player-welcome {
  font-size: 1.2rem;
  margin: 20px 0;
  color: var(--jungle-text);
}
</style>
