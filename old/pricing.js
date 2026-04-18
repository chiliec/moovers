// pricing.js — Pure pricing engine for Moovers Quote Bot.
// Importable by Node (ESM) and by index.html via <script type="module">.

export const CONFIG = {
  hourlyRates: {
    studio: { crew: 2, rate: 140 },
    '1br':   { crew: 2, rate: 150 },
    '2br':   { crew: 3, rate: 190 },
    '3br':   { crew: 3, rate: 210 },
    '4br':   { crew: 4, rate: 260 },
  },
  baseHours: {
    studio: 2.5, '1br': 3.5, '2br': 5, '3br': 7, '4br': 9,
  },
  truckSpeedMph: 30,
  doubleDriveTime: true,
  travelFee: 95,
  floorSurcharge: {
    'ground':       0,
    '2-3-elev':     0,
    '2-3-no-elev':  0.5,
    '4+-elev':      0.25,
    '4+-no-elev':   1.5,
  },
  specialItems: {
    piano:    250,
    safe:     200,
    pooltable: 300,
    artwork:  100,
  },
  packing: {
    self:    { hoursMultiplier: 1.0, flat: 0 },
    partial: { hoursMultiplier: 1.2, flat: 150 },
    full:    { hoursMultiplier: 1.5, flat: 350 },
  },
  weekendSurcharge: 0.10,
  minHours: 2,
  // Fraction applied on either side of the central estimate to produce
  // the displayed range (e.g. 0.12 → "±12%"). Moving quotes are inherently
  // uncertain (traffic, stair difficulty, packing pace), so showing a range
  // is standard industry practice and sets honest expectations.
  estimateRangePct: 0.12,
};

const EARTH_RADIUS_KM = 6371;
const KM_PER_MILE = 1.609344;
const ROAD_COEFFICIENT = 1.3;

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

export function distanceMiles(originCoords, destCoords) {
  const dLat = toRadians(destCoords.lat - originCoords.lat);
  const dLng = toRadians(destCoords.lng - originCoords.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(originCoords.lat)) *
      Math.cos(toRadians(destCoords.lat)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = EARTH_RADIUS_KM * c * ROAD_COEFFICIENT;
  return Math.round((km / KM_PER_MILE) * 10) / 10;
}

export function calculateQuote(answers) {
  if (!answers || typeof answers !== 'object') {
    throw new Error('calculateQuote: answers object required');
  }
  if (!CONFIG.hourlyRates[answers.size]) {
    throw new Error(`calculateQuote: unknown size "${answers.size}"`);
  }
  if (!(answers.originFloor in CONFIG.floorSurcharge)) {
    throw new Error(`calculateQuote: unknown originFloor "${answers.originFloor}"`);
  }
  if (!(answers.destFloor in CONFIG.floorSurcharge)) {
    throw new Error(`calculateQuote: unknown destFloor "${answers.destFloor}"`);
  }
  if (!CONFIG.packing[answers.packing]) {
    throw new Error(`calculateQuote: unknown packing "${answers.packing}"`);
  }
  if (typeof answers.miles !== 'number' || answers.miles < 0) {
    throw new Error('calculateQuote: miles must be a non-negative number');
  }
  if (!answers.date || typeof answers.date !== 'string') {
    throw new Error('calculateQuote: date string required (YYYY-MM-DD)');
  }

  const sizeKey = answers.size;
  const rateInfo = CONFIG.hourlyRates[sizeKey];
  const baseHours = CONFIG.baseHours[sizeKey];
  const floorExtra =
    CONFIG.floorSurcharge[answers.originFloor] +
    CONFIG.floorSurcharge[answers.destFloor];
  const packing = CONFIG.packing[answers.packing];

  let laborHours = (baseHours + floorExtra) * packing.hoursMultiplier;
  if (laborHours < CONFIG.minHours) laborHours = CONFIG.minHours;
  laborHours = Math.round(laborHours * 10) / 10;

  let driveHours = answers.miles / CONFIG.truckSpeedMph;
  if (CONFIG.doubleDriveTime) driveHours *= 2;
  driveHours = Math.round(driveHours * 10) / 10;

  const totalHours = Math.round((laborHours + driveHours) * 10) / 10;
  const hourlyCost = totalHours * rateInfo.rate;

  const specialItemsCost = (answers.specialItems || []).reduce(
    (sum, key) => sum + (CONFIG.specialItems[key] || 0),
    0,
  );

  const extras = CONFIG.travelFee + specialItemsCost + packing.flat;
  let subtotal = hourlyCost + extras;

  const [yr, mo, dy] = answers.date.split('-').map(Number);
  const dayOfWeek = new Date(yr, mo - 1, dy).getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  if (isWeekend) subtotal *= (1 + CONFIG.weekendSurcharge);

  const total = Math.round(subtotal);

  // Range: apply ± estimateRangePct, then round outward to the nearest $5
  // so the displayed values feel like clean round quotes rather than
  // algorithmic noise (e.g. $1,310 – $1,660 not $1,307 – $1,663).
  const pct = CONFIG.estimateRangePct;
  const totalLow = Math.floor((total * (1 - pct)) / 5) * 5;
  const totalHigh = Math.ceil((total * (1 + pct)) / 5) * 5;

  const breakdown = [
    { label: `Crew time (${totalHours} hr × $${rateInfo.rate})`, value: Math.round(hourlyCost) },
    { label: 'Travel fee', value: CONFIG.travelFee },
  ];
  for (const key of (answers.specialItems || [])) {
    if (CONFIG.specialItems[key]) {
      breakdown.push({
        label: `${key.charAt(0).toUpperCase() + key.slice(1)} handling`,
        value: CONFIG.specialItems[key],
      });
    }
  }
  if (packing.flat > 0) {
    breakdown.push({
      label: `${answers.packing.charAt(0).toUpperCase() + answers.packing.slice(1)} packing`,
      value: packing.flat,
    });
  }
  if (isWeekend) {
    breakdown.push({ label: 'Weekend surcharge', value: '+10%' });
  }

  return {
    crew: rateInfo.crew,
    laborHours,
    driveHours,
    totalHours,
    rate: rateInfo.rate,
    miles: answers.miles,
    isWeekend,
    breakdown,
    total,
    totalLow,
    totalHigh,
  };
}

// Browser convenience: expose on window for console testing.
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
  window.calculateQuote = calculateQuote;
  window.distanceMiles = distanceMiles;
}
