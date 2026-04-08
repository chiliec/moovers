# Moovers Quote Bot

A single-page chat-bot prototype that quotes US local moves.

## Run

Open `index.html` in any modern browser (double-click or drag into a tab).

## Test the pricing engine

    node --test pricing.test.mjs

## Deploy

Drag the project folder onto Vercel or Netlify. No build step.

## Tweak tariffs

All rates and surcharges live in the `CONFIG` object at the top of `pricing.js`.
