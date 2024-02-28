<script lang="ts">
	import { clipboard, type ToastSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	// Strings
	// export let label = '';
	export let value = '';
	export let placeholder = '';
	export let type: 'text' | 'search' | 'password' | 'url' = 'text';
	export let buttonText = '';
	// export let buttonIcon = '';
	export let preText = '';

	// Booleans
	export let readonly = false;
	export let copyOnClick = false;

	// Component Only
	let copyButtonIcon = 'line-md:clipboard';
	let copyButtonColor = 'ml-2 variant-glass-secondary';

	function copied(e: any) {
		copyButtonIcon = 'line-md:clipboard-check';
		copyButtonColor = 'ml-2 variant-filled-primary';

		setTimeout(() => {
			copyButtonIcon = 'line-md:clipboard';
			copyButtonColor = 'ml-2 variant-glass-secondary';
		}, 3000);
	}
</script>

<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
	{#if preText}<div class="input-group-shim"></div>{/if}
	<input {placeholder} {value} {type} {readonly} class=" py-1" />
	{#if buttonText || copyOnClick}
		<button class={copyButtonColor} use:clipboard={value} on:click={copied}>
			<Icon icon={copyButtonIcon} class="pl-1" width="28" height="28" />
			{#if buttonText}
				{buttonText}
			{/if}
		</button>
	{/if}
</div>
