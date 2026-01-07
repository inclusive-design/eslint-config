import {defineConfig} from 'eslint/config';
import xoBrowser from 'eslint-config-xo/browser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default defineConfig([
	{
		extends: [xoBrowser, eslintPluginUnicorn.configs.recommended],
		files: ['**/*.js'],
	},
]);
