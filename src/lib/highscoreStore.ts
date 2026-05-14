import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { isSupabaseConfigured, supabase } from '$lib/supabase';

const STORAGE_KEY = 'embleem_highscores';
const TABLE_NAME = 'high_scores';

export interface Highscore {
	name: string;
	mode: 'Puzzle' | 'Wordle' | string;
	animal: string;
	attempts?: number;
	tiles?: number;
	difficulty?: string;
	score: number;
	date: string;
}

interface HighscoreRow {
	name: string;
	mode: string;
	animal: string;
	attempts: number | null;
	tiles: number | null;
	difficulty: string | null;
	score: number;
	played_at: string;
}

export const highscoreSyncStatus = writable({
	configured: isSupabaseConfigured,
	syncing: false,
	error: ''
});

function loadScores(): Highscore[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveScores(scores: Highscore[]) {
	if (!browser) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
	} catch {
		// storage full or disabled -- silently ignore
	}
}

function getScoreKey(score: Highscore) {
	return [score.name, score.mode, score.animal, score.score, score.date].join('|');
}

function mergeScores(localScores: Highscore[], remoteScores: Highscore[]) {
	const byKey = new Map<string, Highscore>();
	[...remoteScores, ...localScores].forEach((score) => {
		byKey.set(getScoreKey(score), score);
	});
	return Array.from(byKey.values());
}

function toHighscore(row: HighscoreRow): Highscore {
	return {
		name: row.name,
		mode: row.mode,
		animal: row.animal,
		attempts: row.attempts ?? undefined,
		tiles: row.tiles ?? undefined,
		difficulty: row.difficulty ?? undefined,
		score: row.score,
		date: row.played_at
	};
}

function toRow(score: Highscore): HighscoreRow {
	return {
		name: score.name,
		mode: score.mode,
		animal: score.animal,
		attempts: score.attempts ?? null,
		tiles: score.tiles ?? null,
		difficulty: score.difficulty ?? null,
		score: score.score,
		played_at: score.date
	};
}

async function fetchRemoteScores() {
	if (!supabase) return [];

	const { data, error } = await supabase
		.from(TABLE_NAME)
		.select('name, mode, animal, attempts, tiles, difficulty, score, played_at')
		.order('score', { ascending: false })
		.order('played_at', { ascending: false })
		.limit(500);

	if (error) throw error;
	return (data ?? []).map((row) => toHighscore(row as HighscoreRow));
}

async function insertRemoteScore(score: Highscore) {
	if (!supabase) return;

	const { error } = await supabase.from(TABLE_NAME).insert(toRow(score));
	if (error) throw error;
}

function createHighscoreStore() {
	const initialScores = loadScores();
	const store = writable<Highscore[]>(initialScores);
	let currentScores = initialScores;

	store.subscribe((scores) => {
		currentScores = scores;
		saveScores(scores);
	});

	async function refreshFromSupabase() {
		if (!browser || !isSupabaseConfigured) return;

		highscoreSyncStatus.set({ configured: true, syncing: true, error: '' });
		try {
			const remoteScores = await fetchRemoteScores();
			store.set(mergeScores(currentScores, remoteScores));
			highscoreSyncStatus.set({ configured: true, syncing: false, error: '' });
		} catch (error) {
			console.warn('Supabase highscore refresh failed:', error);
			highscoreSyncStatus.set({
				configured: true,
				syncing: false,
				error: 'Cloud-Bestenliste gerade nicht erreichbar'
			});
		}
	}

	async function syncAddedScores(previousScores: Highscore[], nextScores: Highscore[]) {
		if (!browser || !isSupabaseConfigured) return;

		const previousKeys = new Set(previousScores.map(getScoreKey));
		const addedScores = nextScores.filter((score) => !previousKeys.has(getScoreKey(score)));
		if (!addedScores.length) return;

		highscoreSyncStatus.set({ configured: true, syncing: true, error: '' });
		try {
			await Promise.all(addedScores.map(insertRemoteScore));
			highscoreSyncStatus.set({ configured: true, syncing: false, error: '' });
		} catch (error) {
			console.warn('Supabase highscore insert failed:', error);
			highscoreSyncStatus.set({
				configured: true,
				syncing: false,
				error: 'Punktzahl lokal gespeichert, Cloud-Sync fehlgeschlagen'
			});
		}
	}

	return {
		subscribe: store.subscribe,
		set(scores: Highscore[]) {
			store.set(scores);
		},
		update(updater: (scores: Highscore[]) => Highscore[]) {
			const previousScores = currentScores;
			const nextScores = updater(previousScores);
			store.set(nextScores);
			void syncAddedScores(previousScores, nextScores);
		},
		refreshFromSupabase
	};
}

export const highscoreStore = createHighscoreStore();

if (browser) {
	void highscoreStore.refreshFromSupabase();
}
