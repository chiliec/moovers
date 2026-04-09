# Moovers (BG Moving Quote Bot)

## What this is
Single-page vanilla JS chatbot prototype that quotes US local moves. Replaces human sales reps. Will be integrated into bgmoving.com.

## Architecture
- `pricing.js` — pure ESM pricing engine (CONFIG + calculateQuote + distanceMiles). Zero DOM. Importable in Node and browser.
- `index.html` — chat UI with inline CSS/JS. Conversation state machine (STEPS array + RENDERERS dict). Address autocomplete via Nominatim (OSM).
- `pricing.test.mjs` — 12 tests using Node 22 built-in test runner.

## Commands
- Run: `open index.html`
- Test: `node --test pricing.test.mjs`
- Deploy: push to main → GitHub Actions runs tests → deploys to GitHub Pages

## Rules
- **No innerHTML** — security hook blocks it. Use createElement + textContent. The `el(tag, {className, text, children})` helper exists for convenience.
- **No build step, no node_modules, no frameworks** — vanilla JS only.
- All tariffs configurable via CONFIG object at top of pricing.js.
- Visual style matches bgmoving.com (dark blue #15679b, Manrope font, 15-20px radii).
