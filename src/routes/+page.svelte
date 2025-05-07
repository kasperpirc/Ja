<script lang="ts">
	import { JsonGetValueTool } from 'langchain/tools';

	let history: [string, string][] = [];
	let message = '';
	let answer = '';
	let loading = false;

	async function onSend() {
		console.log(message);
		loading = true;

		history = [...history, ['human', message]];
		message = '';

		const response = await fetch('/api/chat', {
			method: 'POST',
			body: JSON.stringify({ history })
		});
		const data = await response.json();
		history = [...history, ['assistant', data.message]];
		loading = false;
	}
</script>

<main class="flex flex-col items-center justify-center h-screen">
	{#each history as h}
		<div
			class="p-4 m-2 gap-6 {h[0] == 'human' ? 'bg-lime-800' : 'bg-gray-700'} rounded-md text-white"
		>
			{h[1]}
		</div>
	{/each}

	<form class="border border-black rounded-sm" on:submit={onSend}>
		<input bind:value={message} placeholder="Your message here..." />
		<button class="rounded-sm bg-slate-500" disabled={loading} type="submit">Send</button>
	</form>
</main>
