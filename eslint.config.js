import {defineConfig} from 'eslint/config';
import eslintConfigInclusiveDesign from './index.js';

export default defineConfig([
	eslintConfigInclusiveDesign,
	{
		ignores: ['test/fixtures/*'],
	},
]);
