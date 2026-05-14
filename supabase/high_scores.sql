create table if not exists public.high_scores (
	id uuid primary key default gen_random_uuid(),
	name text not null check (char_length(name) between 1 and 80),
	mode text not null check (mode in ('Puzzle', 'Wordle')),
	animal text not null,
	attempts integer,
	tiles integer,
	difficulty text,
	score integer not null check (score >= 0),
	played_at timestamptz not null default now(),
	created_at timestamptz not null default now()
);

alter table public.high_scores enable row level security;

drop policy if exists "Public highscores are readable" on public.high_scores;
create policy "Public highscores are readable"
	on public.high_scores
	for select
	to anon, authenticated
	using (true);

drop policy if exists "Public highscores are insertable" on public.high_scores;
create policy "Public highscores are insertable"
	on public.high_scores
	for insert
	to anon, authenticated
	with check (true);

create index if not exists high_scores_score_played_at_idx
	on public.high_scores (score desc, played_at desc);

create index if not exists high_scores_mode_idx
	on public.high_scores (mode);
