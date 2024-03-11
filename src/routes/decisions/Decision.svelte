<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as API from '../../lib/api';
	import { onMount, tick } from 'svelte';
	import { Decision } from '../../lib/objects/decision';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { DataHandler } from '@vincjo/datatables';

	// Transition
	import { fade } from 'svelte/transition';

	// Custom Components
	import Input from '../../components/input.svelte';
	import Switch from '../../components/switch.svelte';

	export let params = { id: '' };
	export let isLoading = true;
	export let decision: Decision = new Decision();
	const handler = new DataHandler([], { rowsPerPage: 5 });
	const rows = handler.getRows();

	onMount(async () => {
		isLoading = true;

		await tick();
		const res = await API.getDecision(params.id);

		if (res) decision = res;

		isLoading = false;
	});

	async function save() {
		isLoading = true;
		const res = await API.saveDecision(decision);

		if (res) alert('cool');

		isLoading = false;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5 text-center flex flex-col items-center">
		<h3 class="h3">Decision Roll Settings</h3>

		<div class="w-full text-right">
			<button class="btn btn-sm variant-outline-error" disabled>Delete</button>
			<button class="btn btn-sm variant-outline-secondary" on:click={() => save()}>Save</button>
		</div>

		{#if isLoading}
			<Icon icon="line-md:loading-loop" width="30" height="30" />
		{:else}
			<!-- 1st Row -->
			<div class="w-full card p-4" transition:fade={{ delay: 0 }}>
				<Input bind:value={decision._id} readonly copyOnClick />
			</div>

			<!-- 2nd Row -->
			<div class="card text-left w-full p-2" transition:fade={{ delay: 200 }}>
				<header>
					<h5 class="h5">Settings</h5>
				</header>
				<div class="p-4">
					<Switch bind:value={decision.enabled} label={decision.enabled ? 'Enabled' : 'Disabled'} />
				</div>

				<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
					<RadioItem bind:group={decision.consumeMode} name="justify" value={'Basic'}>
						Basic
					</RadioItem>
					<RadioItem bind:group={decision.consumeMode} name="justify" value={'Temporarily Consume'}>
						Temporarily Consume
					</RadioItem>
					<RadioItem bind:group={decision.consumeMode} name="justify" value={'Consume'}>
						Consume
					</RadioItem>
				</RadioGroup>

				<footer class="flex justify-start">
					<!-- Right: Avatar & Username -->
					<div class="flex-auto flex justify-between items-center">
						<h6 class="font-bold text-sm" data-toc-ignore="">{decision.username}</h6>
					</div>
				</footer>
			</div>

			<!-- 3rd Row -->
			<div class="card text-left w-full p-2" transition:fade={{ delay: 350 }}>
				<header>
					<h5 class="h5">Outcomes</h5>
				</header>

				<div class="table-container space-y-4">
					<table class="table table-hover table-compact table-auto w-full">
						<thead>
							<tr>
								<td>Result</td>
								<td>Type</td>
							</tr>
						</thead>
						<tbody>
							{#if decision.options.length}
								{#each decision.options as outcome}
									<tr>
										<td>{outcome.text}</td>
										<td>{outcome.type}</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>
