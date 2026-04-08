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
};

export function calculateQuote(answers) {
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
  const laborCost = totalHours * rateInfo.rate;

  const specialItemsCost = (answers.specialItems || []).reduce(
    (sum, key) => sum + (CONFIG.specialItems[key] || 0),
    0,
  );

  const extras = CONFIG.travelFee + specialItemsCost + packing.flat;
  let subtotal = laborCost + extras;

  const dayOfWeek = new Date(answers.date + 'T12:00:00').getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  if (isWeekend) subtotal *= (1 + CONFIG.weekendSurcharge);

  const total = Math.round(subtotal);

  const breakdown = [
    { label: `Labor (${totalHours} hr × $${rateInfo.rate})`, value: Math.round(laborCost) },
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
  };
}

// Browser convenience: expose on window for console testing.
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
  window.calculateQuote = calculateQuote;
}
