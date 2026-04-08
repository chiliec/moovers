import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote } from './pricing.js';

test('calculateQuote returns an object with total and breakdown', () => {
  const result = calculateQuote({
    size: '1br',
    originFloor: 'ground',
    destFloor: 'ground',
    miles: 5,
    specialItems: [],
    packing: 'self',
    date: '2026-04-15', // a Wednesday
  });
  assert.equal(typeof result, 'object');
  assert.equal(typeof result.total, 'number');
  assert.ok(Array.isArray(result.breakdown));
});
