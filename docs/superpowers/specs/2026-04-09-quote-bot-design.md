# Moovers Quote Bot — Design Spec

**Date:** 2026-04-09
**Status:** Approved (brainstorming phase)
**Type:** Prototype / demo

## 1. Purpose

A single-page chat-bot prototype for an abstract US local-moving company. The bot replaces the human sales rep who would normally collect move details over the phone and quote a price. A visitor walks through a short scripted conversation, the bot calculates a price using a transparent formula, and shows a breakdown.

This is a **prototype-demo**, not a production product. Goal: a self-contained file that can be opened locally or dropped on any static host, used to demonstrate the concept (to a potential client, a partner, or as a portfolio piece).

### Out of scope
- Authentication, accounts, persistence
- Lead capture / contact form / PII collection
- Backend, database, admin panel
- Real bookings, payments, calendar integration
- LLM / NLP / freeform chat
- Long-distance pricing model (weight × distance) — single hourly model only
- Mobile app
- Localization (English only)
- A11y certification (basic semantic HTML only)

## 2. Architecture

A **single static HTML file** (`index.html`) containing inline CSS and JavaScript. No build step, no `node_modules`, no backend, no framework. Vanilla JS only.

The file is structured into three logical layers, separated by clear section comments:

### 2.1 Conversation Engine
A finite state machine driving the dialogue. Defined as an array of step objects:

```js
const STEPS = [
  { id: 'size',         botText: '...', input: 'buttons', options: [...], next: 'origin' },
  { id: 'origin',       botText: '...', input: 'address',                  next: 'originFloor' },
  // ...
];
```

Each step describes: bot prompt, input type, validation, and next-step id. Adding/removing/reordering questions is a one-line edit.

### 2.2 Pricing Engine
A pure function `calculateQuote(answers) → { breakdown, total }`. Zero DOM interaction. Reads from a single `CONFIG` object at the top of the file. Testable from the browser console.

### 2.3 Chat UI
DOM rendering for the chat column. Handles message append, typing indicator, button rendering, address autocomplete, and final breakdown screen. Listens to user actions, writes back into a single `answers` object, advances the state machine.

## 3. External dependencies (CDN, no install)

| Dependency | Purpose |
|---|---|
| Google Fonts: Cormorant Garamond + Inter | Premium typography |
| Photon (`photon.komoot.io`) | Address autocomplete + geocoding (free, OSM-based, no API key, CORS-friendly) |

That's it. No jQuery, no Alpine, no React. Estimated source size: 600–900 lines.

## 4. Conversation Flow

Scripted, linear, ~9 steps. Buttons everywhere possible; text input only for addresses.

| # | Step ID | Bot prompt | Input |
|---|---|---|---|
| 1 | `size` | "What size is your current home?" | Buttons: Studio / 1 BR / 2 BR / 3 BR / 4+ BR |
| 2 | `origin` | "What's the pickup address?" | Address autocomplete |
| 3 | `originFloor` | "Which floor? Is there an elevator?" | Buttons: Ground / 2-3 (no elev) / 2-3 (elev) / 4+ (no elev) / 4+ (elev) |
| 4 | `destination` | "And the destination address?" | Address autocomplete |
| 5 | `destFloor` | "Floor at the destination?" | Same as step 3 |
| 6 | `specialItems` | "Any of these items?" (multi-select) | Chips: Piano / Safe (>500 lb) / Pool table / Large artwork — plus a "None of these" button to skip |
| 7 | `packing` | "Do you need packing service?" | Buttons: I'll pack myself / Partial packing / Full packing |
| 8 | `date` | "Preferred move date?" | Date picker (min = today) |
| 9 | `result` | "Calculating your estimate…" → 1.5s typing → breakdown screen | (no input) |

### Flow rules
- No "Back" button. If a user wants to change something, they use "Start Over" on the result screen.
- No PII collected (no name, phone, email).
- No inline validation beyond "Photon returned a result" for addresses.
- After each user response: user bubble appears (right, black) → 600ms typing indicator → next bot message appears.

## 5. Pricing Engine

### 5.1 CONFIG (single source of truth)

```js
const CONFIG = {
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
```

### 5.2 Formula

```
1.  base_hours    = CONFIG.baseHours[size]
2.  floor_extra   = floorSurcharge[originFloor] + floorSurcharge[destFloor]
3.  labor_hours   = (base_hours + floor_extra) * packing.hoursMultiplier
4.  labor_hours   = max(labor_hours, CONFIG.minHours)

5.  drive_hours   = miles / truckSpeedMph
6.  if doubleDriveTime: drive_hours *= 2

7.  total_hours   = labor_hours + drive_hours
8.  labor_cost    = total_hours * hourlyRate

9.  extras        = travelFee
                  + sum(specialItems.selected)
                  + packing.flat

10. subtotal      = labor_cost + extras
11. if weekend:   subtotal *= (1 + weekendSurcharge)
12. total         = round(subtotal)
```

### 5.3 Distance calculation

1. After step 2 (`origin`), Photon returns lat/lng — store on `answers.origin.coords`.
2. After step 4 (`destination`), Photon returns lat/lng — store on `answers.destination.coords`.
3. Compute great-circle distance with the haversine formula.
4. Multiply by **1.3** (empirical road-network coefficient) to approximate driving distance.
5. Convert km → miles.

No cutoff for long distances. The bot will quote any distance, including absurd ones (LA → NY) — this is acceptable for a demo.

### 5.4 Result screen content

```
Your moving estimate

  $ 1,485

  ─────────────────────────────────
  Crew                  3 movers
  Estimated labor       6.0 hours
  Drive time            0.8 hours (12 mi × 2)
  ─────────────────────────────────
  Labor (6.8 hr × $190) $ 1,292
  Travel fee            $    95
  Piano handling        $   250
  Weekend surcharge     +10%
  ─────────────────────────────────
  Total estimate        $ 1,485

  This is a non-binding estimate.
  Final price depends on actual move time.

  [ Start Over ]
```

## 6. Visual Design — Premium Concierge

### 6.1 Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#faf7f2` | Page background (warm cream) |
| `--surface` | `#ffffff` | Bot bubble background |
| `--border` | `#e7e5e4` | Bubble borders, dividers |
| `--text` | `#1c1917` | Primary text (warm near-black) |
| `--text-muted` | `#78716c` | Secondary text |
| `--user-bg` | `#1c1917` | User bubble background |
| `--user-text` | `#faf7f2` | User bubble text |
| `--total` | `#166534` | Final total amount only |

Intentionally restrained. No accent colors elsewhere. Premium = quiet.

### 6.2 Typography

- **Cormorant Garamond** (400/600) — bot messages (17px / 1.55), final total (56px / 600)
- **Inter** (400/500) — buttons, labels, breakdown rows (14px), uppercase + 0.05em letter-spacing for buttons
- `font-variant-numeric: tabular-nums` on all numeric output (alignment in breakdown column)

### 6.3 Layout

- Centered chat column, `max-width: 560px`, padding-top 40px
- Discrete brand mark "MOOVERS" (Inter, 11px, uppercase) at very top, centered
- No header chrome, no avatar, no "online" indicator
- Bubbles: `border-radius: 14px`, padding `14px 18px`, no tail
- Buttons appear in a row under the latest bot message; collapse after click
- Auto-scroll to bottom on new message (smooth)

### 6.4 Micro-UX

- Typing indicator: three dots, opacity-pulse, ~600ms before each bot message, ~1500ms before final result
- Message appearance: fade-in + 8px slide-up, 250ms easing
- Address autocomplete dropdown: cream tones, hover = light beige
- Result screen: large total centered, thin horizontal divider, two-column breakdown (label left, value right, tabular-nums), text-only "Start Over" link

## 7. File structure

```
moovers/
├── index.html       ← the entire prototype
├── README.md        ← how to run / how to deploy / how to tweak CONFIG
└── .gitignore       ← .superpowers/, .DS_Store
```

That's it. No build, no package.json, no dependencies file.

## 8. Success criteria

- [ ] `index.html` opens in any modern browser via `file://` and works fully
- [ ] Complete a quote in under 60 seconds with mouse only
- [ ] Address autocomplete returns plausible matches for any continental US address
- [ ] `calculateQuote()` callable from console with a manual `answers` object
- [ ] All tariffs editable in the `CONFIG` object at the top of the file
- [ ] Visual style matches "Premium Concierge" mockup direction
- [ ] No console errors during a complete session
- [ ] Deploys to Vercel/Netlify with zero configuration (drag-and-drop)
