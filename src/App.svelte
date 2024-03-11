<script lang="ts">
	import './app.postcss';
	import Router, { location } from 'svelte-spa-router';
	import routes from './routes';
	import {
		AppShell,
		AppBar,
		AppRail,
		AppRailAnchor,
		AppRailTile,
		LightSwitch
	} from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Nav
	// import { navigating } from '$app/stores';
	let currentTile: number = -1;

	// Icons
	import Icon from '@iconify/svelte';

	console.log('start');
</script>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Kiera</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/rileyio/kiera-bot"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Sidebar -->
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<!-- Sidebar items -->
			<AppRailTile bind:group={currentTile} name="decisions" value={0} title="Decisions">
				<AppRailAnchor href="/#/decisions" selected={$location === '/decisions'}>
					<svelte:fragment slot="lead">
						<Icon icon="line-md:list-indented" height="28" width="28" />
					</svelte:fragment>
					<span>Decisions</span>
				</AppRailAnchor>
			</AppRailTile>

			<!-- End of Sidebar -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="http://localhost:8234/api/auth" title="Account">
					<svelte:fragment slot="lead">
						<Icon icon="line-md:account" height="28" width="28" />
					</svelte:fragment>
					<span>Account</span>
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!-- <nav>
		<a href="/" aria-current={$page.url.pathname === '/'}> home </a>
		<a href="/about" aria-current={$page.url.pathname === '/decision'}> decision </a>

		{#if $navigating}
			{#if $navigating.to}
				navigating to {$navigating.to.url.pathname}
			{/if}
		{/if}
	</nav> -->

	<!-- Page Route Content -->
	<main>
		<Router {routes} />
	</main>
</AppShell>
