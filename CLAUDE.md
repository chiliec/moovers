# Moovers — BG Moving Quote Bot
Vanilla JS chatbot prototype that quotes US local moves. Integrates into bgmoving.com.

## Architecture
- `pricing.js` — pure ESM pricing engine (CONFIG + calculateQuote + distanceMiles). Zero DOM. Importable in Node and browser.
- `index.html` — chat UI, inline CSS/JS. Conversation state machine (STEPS array + RENDERERS dict). Address autocomplete via Nominatim (OSM).
- `pricing.test.mjs` — 12 tests, Node 22 built-in test runner.

## Commands
- Run: `open index.html`
- Test: `node --test pricing.test.mjs`
- Deploy: push to main → GitHub Actions (tests → GitHub Pages)

## Rules
- **No `innerHTML`** — security hook blocks it. Use `createElement + textContent`. Helper: `el(tag, {className, text, children})`.
- **No build step, no node_modules, no frameworks** — vanilla JS only.
- All tariffs configurable via CONFIG object in `pricing.js`.
- Style: dark blue `#15679b`, Manrope font, 15-20px radii (matches bgmoving.com).
