import {defineConfig} from 'eslint/config';
import xoBrowser from 'eslint-config-xo/browser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';
import markdown from '@eslint/markdown';
import json from '@eslint/json';

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
		files: ['**/*.json'],
		ignores: ['package-lock.json'],
		plugins: {json},
		language: 'json/json',
		extends: ['json/recommended'],
	},
	{
		files: ['**/*.jsonc'],
		plugins: {json},
		language: 'json/jsonc',
		extends: ['json/recommended'],
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
