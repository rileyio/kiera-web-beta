<script lang="ts">
	import * as API from '$lib/api';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { Decision } from '$lib/objects/decision';
	import { clipboard } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let isLoading = true;
	let data = [] as Array<Decision>;

	onMount(async () => {
		const res = await API.getDecisions();

		if (res) {
			// Decisions List
			data = res.map((d) => new Decision(d));
		}

		isLoading = false;
	});

	function editDecision(id: string) {
		goto(`/decisions/${id}`, { replaceState: true });
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h3 class="h3">Decision Rolls</h3>
		<div class="m-8 p-8 grid grid-cols-2 grid-flow-row gap-4 auto-rows-min">
			{#each data as decision}
				<div class="card text-left card-hover decision">
					<header>
						<div class="edit-button-wrapper">
							<button
								class="btn bg-gradient-to-br variant-gradient-tertiary-secondary edit"
								on:click={() => editDecision(decision._id)}
							>
								<Icon icon="line-md:pencil-twotone-alt" width="24" height="24" class="mr-1" />
								Edit
							</button>
							<img
								src="https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D;ixlib=rb-4.0.3&amp;w=400&amp;h=175&amp;auto=format&amp;fit=crop"
								class="bg-black/50 w-full aspect-[21/9]"
								alt="Post"
							/>
						</div>
					</header>
					<div class="p-4 space-y-4">
						<h6 class="h4 name">
							{decision.name}
						</h6>
						<h6 class="h6">
							<!-- Enabled / Disabled Status -->
							{#if decision.enabled}
								<span class="badge variant-filled-success">Enabled</span>
							{:else}
								<span class="badge variant-filled-error">Disabled</span>
							{/if}
							<!-- Consumable Status -->
							{#if decision.consumeMode === 'Consume' || decision.consumeMode === 'Temporarily Consume'}
								<span class="badge variant-filled-surface">{decision.consumeMode}</span>
							{/if}
							<!-- Server Restricted Status -->
							{#if decision.serverWhitelist.length}
								<span class="badge variant-filled-surface"
									>Server Whitelist ({decision.serverWhitelist.length})</span
								>
							{/if}
							<!-- User is a Manager (not the primary owner) -->
							{#if decision.managerOnly}
								<span class="badge variant-ghost-secondary">Manager</span>
							{:else}
								<span class="badge variant-ghost-warning">Owner</span>
							{/if}
						</h6>
						<article>
							<p>
								Outcomes: {decision.options.length} <br />
							</p>
						</article>
					</div>
					<hr class="opacity-50" />
					<footer class="p-4 flex justify-start items-center space-x-4">
						<figure
							class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-8 rounded-full"
						>
							<img
								class="avatar-image w-full object-cover"
								style=""
								src={decision.avatarURL}
								alt=""
							/>
						</figure>
						<!-- Right: Avatar & Username -->
						<div class="flex-auto flex justify-between items-center">
							<h6 class="font-bold" data-toc-ignore="">{decision.username}</h6>
							<!-- Right: Controls -->
							<span
								class="chip variant-soft hover:variant-filled"
								use:clipboard={decision._decisionRollCommand}
							>
								<Icon icon="line-md:clipboard" class="pr-1" width="18" height="18" />
								Copy
							</span>
						</div>
					</footer>
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.decision .name {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.decision .edit-button-wrapper {
		position: relative;
	}

	.decision .edit-button-wrapper > button {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
		width: 125px;
		height: 40px;
		opacity: 0;
	}

	.decision:hover .edit-button-wrapper > button {
		opacity: 1;
	}
</style>
