import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateQuote, distanceMiles } from './pricing.js';

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
  // studio (2.5h) * 1.5 (full pack) = 3.75 → rounds to 3.8
  const r = calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'full', date: '2026-04-15',
  });
  assert.equal(r.laborHours, 3.8);
});

test('drive hours: 12 miles at 30 mph * 2 (double drive time) = 0.8 hours', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 12, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.driveHours, 0.8);
});

test('full 2br quote with piano, partial pack, weekend, 12 miles', () => {
  const r = calculateQuote({
    size: '2br',
    originFloor: 'ground',
    destFloor: 'ground',
    miles: 12,
    specialItems: ['piano'],
    packing: 'partial',
    date: '2026-04-11', // Saturday
  });
  // labor: 5 * 1.2 = 6.0 hours
  // drive: 12/30*2 = 0.8 hours
  // total hours: 6.8
  // labor cost: 6.8 * 190 = 1292
  // extras: 95 (travel) + 250 (piano) + 150 (partial pack flat) = 495
  // subtotal: 1292 + 495 = 1787
  // weekend: 1787 * 1.10 = 1965.7 → 1966
  assert.equal(r.laborHours, 6);
  assert.equal(r.driveHours, 0.8);
  assert.equal(r.total, 1966);
});

test('weekday move does not get weekend surcharge', () => {
  const r = calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15', // Wednesday
  });
  // labor: 2.5h, drive: 0
  // labor cost: 2.5 * 140 = 350
  // extras: 95
  // subtotal: 445
  assert.equal(r.total, 445);
});

test('breakdown contains labor and travel rows summing toward total', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  // labor: 3.5 * 150 = 525, travel: 95, total: 620
  assert.equal(r.total, 620);
  assert.ok(r.breakdown.length >= 2);
  const labels = r.breakdown.map(row => row.label);
  assert.ok(labels.some(l => l.toLowerCase().includes('labor')));
  assert.ok(labels.some(l => l.toLowerCase().includes('travel')));
});

test('distanceMiles: NYC Times Square to Newark Penn ~ 8-14 miles', () => {
  const d = distanceMiles(
    { lat: 40.7580, lng: -73.9855 },
    { lat: 40.7345, lng: -74.1644 },
  );
  assert.ok(d > 8 && d < 14, `expected 8-14, got ${d}`);
});

test('distanceMiles: identical points = 0', () => {
  const d = distanceMiles({ lat: 40.7, lng: -74 }, { lat: 40.7, lng: -74 });
  assert.equal(d, 0);
});
