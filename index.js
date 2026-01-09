import {defineConfig} from 'eslint/config';
import xoBrowser from 'eslint-config-xo/browser';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

export default defineConfig([
	{
		extends: [xoBrowser, eslintPluginUnicorn.configs.recommended, jsdoc.configs['flat/recommended']],
		files: ['**/*.js'],
	},
]);
