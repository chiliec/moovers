# Moovers Quote Bot

A single-page chat-bot prototype that quotes US local moves through a scripted Q&A and shows a transparent price breakdown. Built as a demo — no backend, no build step, no `node_modules`.

## Run

Open `index.html` in any modern browser. Double-click the file or:

    open index.html      # macOS
    xdg-open index.html  # Linux
    start index.html     # Windows

## Test the pricing engine

Requires Node 20+ (uses the built-in test runner — no install).

    node --test pricing.test.mjs

You can also poke at the engine from the browser console once `index.html` is open:

    calculateQuote({
      size: '2br',
      originFloor: 'ground',
      destFloor: 'ground',
      miles: 12,
      specialItems: ['piano'],
      packing: 'partial',
      date: '2026-04-11',
    })

`distanceMiles({lat, lng}, {lat, lng})` is also exposed on `window`.

## Deploy

Drag the project folder onto Vercel or Netlify. No configuration. The two relevant files are `index.html` and `pricing.js`.

## Tweak tariffs

All rates, surcharges, and crew sizes live in the `CONFIG` object at the top of `pricing.js`. Edit the values, reload the browser, done.

## How it works

- **`pricing.js`** — pure pricing engine. CONFIG + `calculateQuote(answers)` + `distanceMiles(a, b)`. Importable in Node and browser. Zero DOM.
- **`index.html`** — chat UI, Premium Concierge styling, conversation state machine driven by a `STEPS` array. Address autocomplete via the free Nominatim API (OSM).
- **`pricing.test.mjs`** — fast unit tests covering labor, floor surcharge, drive time, weekend surcharge, breakdown structure, and distance.

## Conventions used in the pricing model

- Hourly local-move pricing (no long-distance / weight model).
- "Double drive time" — drive time is counted both ways (CA-style honest billing).
- 2-hour minimum.
- Weekend = +10%.
