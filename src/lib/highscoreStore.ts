import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'embleem_highscores';

function loadScores() {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveScores(scores: any[]) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
	} catch {
		// storage full or disabled -- silently ignore
	}
}

const initialScores = loadScores();

export const highscoreStore = writable(initialScores);

highscoreStore.subscribe((scores) => {
	saveScores(scores);
});
