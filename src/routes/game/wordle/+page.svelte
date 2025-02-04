<script>
	import { onMount } from 'svelte';
	import WordleMode from '../../../components/WordleMode.svelte';
	import { highscoreStore } from '../../../lib/highscoreStore';
	import { animalList } from '../../../lib/animalList';

	let animal = '';
	let currentAnimal;

	onMount(() => {
		const randomIndex = Math.floor(Math.random() * animalList.length);
		currentAnimal = animalList[randomIndex];
		animal = currentAnimal.name;
	});
</script>

<WordleMode
	animalList={animalList.map((a) => a.name)}
	correctAnimal={animal}
	{highscoreStore}
	country={currentAnimal?.country || 'Deutschland'}
/>
