import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit()
	],
	build: { sourcemap: true },
	resolve: {
		alias: {
			$lib: '/src/lib',
			$api: '/src/routes/api'
		}
	}
});
