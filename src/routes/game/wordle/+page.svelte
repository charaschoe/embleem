<script>
	import { onMount } from 'svelte';
	import WordleMode from '../../../components/WordleMode.svelte';
	import { highscoreStore } from '$lib/highscoreStore';
	import { animalList } from '$lib/animalList';
	import type { NationalAnimal } from '$lib/animalList';

	let animal = '';
	let currentAnimal: NationalAnimal | undefined = undefined;

	onMount(() => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		animal = currentAnimal.name;
	});
</script>

<WordleMode
	correctAnimal={animal}
	{highscoreStore}
	country={currentAnimal?.country || 'Deutschland'}
/>
