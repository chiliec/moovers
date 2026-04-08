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

test('1br ground-to-ground self-pack: laborHours = 3.5', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.laborHours, 3.5);
});

test('2br with 4+ no elev at origin adds 1.5 labor hours', () => {
  const r = calculateQuote({
    size: '2br', originFloor: '4+-no-elev', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.laborHours, 6.5); // 5 + 1.5
});

test('studio short move with self-pack stays above minHours floor', () => {
  const r = calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.laborHours, 2.5); // baseHours studio = 2.5, above min of 2
});

test('packing multiplier applies after base hours', () => {
  // studio (2.5h) * 1.5 (full pack) = 3.75
  const r = calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'full', date: '2026-04-15',
  });
  assert.equal(r.laborHours, 3.75);
});

test('drive hours: 12 miles at 30 mph * 2 (double drive time) = 0.8 hours', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 12, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.driveHours, 0.8);
});
