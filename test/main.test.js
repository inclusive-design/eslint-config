import config from '../index.js';
import test from 'node:test';
import assert from 'node:assert';
import {ESLint} from 'eslint';
import {readFile} from 'node:fs/promises';

const hasRule = (errors, ruleId) => errors.some(error => error.ruleId === ruleId);

/**
 * @param {string} string The string against which ESLint should be run.
 * @param {object} config The ESLint config to use.
 */
async function runEslint(string, config) {
	const eslint = new ESLint({
		overrideConfigFile: true,
		overrideConfig: config,
	});

	const [firstResult] = await eslint.lintText(string);

	return firstResult.messages;
}

test('eslintConfig', async () => {
	assert.ok(Array.isArray(config));
});

test('jsdoc', async () => {
	const badFixture = await readFile('./test/fixtures/jsdoc-bad.js');
	const badFixtureErrors = await runEslint(badFixture.toString(), config);
	assert.ok(hasRule(badFixtureErrors, 'jsdoc/require-jsdoc'));

	const goodFixture = await readFile('./test/fixtures/jsdoc-good.js');
	const goodFixtureErrors = await runEslint(goodFixture.toString(), config);
	assert.ok(!hasRule(goodFixtureErrors, 'jsdoc/require-jsdoc'));
});
