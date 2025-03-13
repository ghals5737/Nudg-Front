import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	alias: {
		$stores: resolve('./src/stores'),
		$actions: resolve('./src/actions'),
		$lib: resolve('./src/lib'),
		$api: resolve('./src/routes/api'),
		$type: resolve('./src/type')
	}
};

export default config;
