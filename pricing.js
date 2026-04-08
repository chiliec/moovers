// pricing.js — Pure pricing engine for Moovers Quote Bot.
// Importable by Node (ESM) and by index.html via <script type="module">.

export const CONFIG = {};

export function calculateQuote(answers) {
  throw new Error('not implemented');
}

// Browser convenience: expose on window for console testing.
if (typeof window !== 'undefined') {
  window.CONFIG = CONFIG;
  window.calculateQuote = calculateQuote;
}
