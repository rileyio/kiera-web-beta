import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	plugins: [svelte(), purgeCss()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8234',
				changeOrigin: true
			}
		}
	}
});
