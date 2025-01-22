import { writable } from 'svelte/store';

// Speichert die Highscores als Liste von Objekten mit Name und Zügen
export const highscoreStore = writable([]);
