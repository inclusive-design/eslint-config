import config from '../index.js';
import test from "node:test";
import assert from "node:assert";

test('eslintConfig', async () => {
	assert.ok(Array.isArray(config))
});
