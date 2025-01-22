import { writable } from 'svelte/store';

// Initialisiere den Highscore-Store ohne Dummy-Werte
export const highscoreStore = writable([]);
