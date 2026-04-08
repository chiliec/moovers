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
  const baseHours = CONFIG.baseHours[sizeKey];
  const floorExtra =
    CONFIG.floorSurcharge[answers.originFloor] +
    CONFIG.floorSurcharge[answers.destFloor];
  const packing = CONFIG.packing[answers.packing];
  let laborHours = (baseHours + floorExtra) * packing.hoursMultiplier;
  if (laborHours < CONFIG.minHours) laborHours = CONFIG.minHours;

  return {
    laborHours,
    total: 0,        // filled in by later tasks
    breakdown: [],   // filled in by later tasks
  };
}

// Browser convenience: expose on window for console testing.
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
  window.calculateQuote = calculateQuote;
}
