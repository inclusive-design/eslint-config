import {defineConfig} from 'eslint/config';
import xoBrowser from 'eslint-config-xo/browser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';
import markdown from '@eslint/markdown';

export default defineConfig([
	{
		files: ['**/*.js'],
		extends: [
			xoBrowser,
			eslintPluginUnicorn.configs.recommended,
			jsdoc.configs['flat/recommended'],
		],
	},
	{
		files: ['**/*.md'],
		plugins: {
			markdown,
		},
		extends: ['markdown/processor'],
	},
	{
		files: ['**/*.md/*'],
		rules: {
			'unicorn/filename-case': 'off',
		},
	},
]);
