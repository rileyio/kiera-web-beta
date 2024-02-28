<script src="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	// Transition
	import { fly } from 'svelte/transition';

	export let value = false;
	export let label = '';
	export let disabled = false;
	export let loading = false;
</script>

<SlideToggle name="test" bind:checked={value} {disabled} active="bg-primary-500" size="sm">
	<span class="inline-flex items-center">
		<span>{label}</span>
		{#if loading}
			<span transition:fly={{ delay: 0, x: -5, duration: 250 }}>
				<Icon icon="line-md:loading-loop" class="ml-2" width="24" height="24" />
			</span>
		{/if}
	</span>
</SlideToggle>
