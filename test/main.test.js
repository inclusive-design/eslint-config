import config from '../eslint.config.js';
import test from 'node:test';
import assert from 'node:assert';
import {ESLint} from 'eslint';
import {readFile} from 'node:fs/promises';

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId);

/**
 * @param {string} string The string against which ESLint should be run.
 * @param {object} config The ESLint configuration to use.
 * @param {string} fileExtension The extension corresponding to the file format being linted.
 * @returns {object} Messages from the lint action.
 */
async function runEslint(string, config, fileExtension = 'js') {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: config,
	});

	const [firstResult] = await eslint.lintText(string, {filePath: `test.${fileExtension}`});
	return firstResult.messages;
}

test('eslintConfig', async () => {
	assert.ok(Array.isArray(config));
});

test('javascript', async () => {
	const badFixture = await readFile('./test/fixtures/bad/javascript.js');
	const badFixtureErrors = await runEslint(badFixture.toString(), config);
	assert.ok(hasRule(badFixtureErrors, 'jsdoc/require-jsdoc'));

	const goodFixture = await readFile('./test/fixtures/good/javascript.js');
	const goodFixtureErrors = await runEslint(goodFixture.toString(), config);
	assert.ok(!hasRule(goodFixtureErrors, 'jsdoc/require-jsdoc'));
});

test('json', async () => {
	const badFixture = await readFile('./test/fixtures/bad/json.json');
	const badFixtureErrors = await runEslint(badFixture.toString(), config, 'json');
	assert.ok(hasRule(badFixtureErrors, 'json/no-duplicate-keys'));

	const goodFixture = await readFile('./test/fixtures/good/json.json');
	const goodFixtureErrors = await runEslint(goodFixture.toString(), config, 'json');
	assert.ok(!hasRule(goodFixtureErrors, 'json/no-duplicate-keys'));
});

test('jsonc', async () => {
	const badFixture = await readFile('./test/fixtures/bad/jsonc.jsonc');
	const badFixtureErrors = await runEslint(badFixture.toString(), config, 'jsonc');
	assert.ok(hasRule(badFixtureErrors, 'json/no-duplicate-keys'));

	const goodFixture = await readFile('./test/fixtures/good/jsonc.jsonc');
	const goodFixtureErrors = await runEslint(goodFixture.toString(), config, 'jsonc');
	assert.ok(!hasRule(goodFixtureErrors, 'json/no-duplicate-keys'));
});

test('markdown', async () => {
	const badFixture = await readFile('./test/fixtures/bad/markdown.md');
	const badFixtureErrors = await runEslint(badFixture.toString(), config, 'md');
	assert.ok(hasRule(badFixtureErrors, '@stylistic/indent'));
	assert.ok(hasRule(badFixtureErrors, 'no-unused-vars'));

	const goodFixture = await readFile('./test/fixtures/good/markdown.md');
	const goodFixtureErrors = await runEslint(goodFixture.toString(), config, 'md');
	assert.ok(!hasRule(goodFixtureErrors, '@stylistic/indent'));
	assert.ok(!hasRule(goodFixtureErrors, 'no-unused-vars'));
});
