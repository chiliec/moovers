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
  assert.ok(labels.some(l => l.toLowerCase().includes('crew')));
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

test('quote returns totalLow/totalHigh range bracketing total, rounded to $5', () => {
  const r = calculateQuote({
    size: '2br', originFloor: 'ground', destFloor: 'ground',
    miles: 12, specialItems: ['piano'], packing: 'partial', date: '2026-04-11',
  });
  // Canonical case: total === 1966 (Saturday, weekend surcharge applied).
  assert.equal(r.total, 1966);
  assert.equal(typeof r.totalLow, 'number');
  assert.equal(typeof r.totalHigh, 'number');
  assert.ok(r.totalLow < r.total, 'totalLow must be < total');
  assert.ok(r.totalHigh > r.total, 'totalHigh must be > total');
  // Rounded outward to $5 multiples.
  assert.equal(r.totalLow % 5, 0);
  assert.equal(r.totalHigh % 5, 0);
  // At ±12%, the range should span roughly 24% of total
  // (with a little slack for the outward $5 rounding).
  const span = r.totalHigh - r.totalLow;
  assert.ok(span / r.total >= 0.22 && span / r.total <= 0.28,
    `range span ${span} should be ~24% of ${r.total}`);
});

// --- Edge case tests ---

test('Sunday triggers weekend surcharge same as Saturday', () => {
  const r = calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-12', // Sunday
  });
  assert.ok(r.isWeekend, 'Sunday should be flagged as weekend');
  // Same base as weekday test (445) + 10% = 489.5 → 490
  assert.equal(r.total, 490);
});

test('zero miles produces zero drive hours', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  assert.equal(r.driveHours, 0);
  assert.equal(r.miles, 0);
});

test('all special items sum correctly', () => {
  const r = calculateQuote({
    size: '1br', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: ['piano', 'safe', 'pooltable', 'artwork'],
    packing: 'self', date: '2026-04-15',
  });
  // piano 250 + safe 200 + pooltable 300 + artwork 100 = 850
  // labor: 3.5h * 150 = 525, travel 95, specials 850 → 1470
  assert.equal(r.total, 1470);
  assert.equal(r.breakdown.length, 6); // crew time, travel, 4 specials
});

test('double 4+-no-elev floors stack surcharge', () => {
  const r = calculateQuote({
    size: 'studio', originFloor: '4+-no-elev', destFloor: '4+-no-elev',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  });
  // base 2.5 + 1.5 + 1.5 = 5.5 hours
  assert.equal(r.laborHours, 5.5);
});

// --- Validation tests ---

test('throws on missing answers object', () => {
  assert.throws(() => calculateQuote(null), /answers object required/);
  assert.throws(() => calculateQuote(undefined), /answers object required/);
});

test('throws on unknown size', () => {
  assert.throws(() => calculateQuote({
    size: 'mansion', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  }), /unknown size/);
});

test('throws on unknown floor', () => {
  assert.throws(() => calculateQuote({
    size: 'studio', originFloor: 'basement', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self', date: '2026-04-15',
  }), /unknown originFloor/);
});

test('throws on negative miles', () => {
  assert.throws(() => calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: -5, specialItems: [], packing: 'self', date: '2026-04-15',
  }), /miles must be a non-negative number/);
});

test('throws on missing date', () => {
  assert.throws(() => calculateQuote({
    size: 'studio', originFloor: 'ground', destFloor: 'ground',
    miles: 0, specialItems: [], packing: 'self',
  }), /date string required/);
});
