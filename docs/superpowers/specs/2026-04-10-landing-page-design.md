# Moovers Landing Page — Design Spec

**Date:** 2026-04-10
**Status:** Approved

## 1. Purpose

Create a landing page (`index.html`) styled after bgmoving.com/form, with fake "Moovers" branding. The current chatbot moves to `form.html`. The chatbot is embedded into the landing page in two variants:

- `index.html` — iframe embed (no code duplication)
- `index-copy.html` — full inline copy (single self-contained file)

## 2. File Changes

| Before | After |
|---|---|
| `index.html` (chatbot) | `form.html` (chatbot, unchanged) |
| — | `index.html` (landing page, iframe variant) |
| — | `index-copy.html` (landing page, inline variant) |
| `pricing.js` | `pricing.js` (unchanged) |

## 3. form.html (renamed from index.html)

Exact copy of current `index.html`. No changes. The chatbot continues to work standalone at `form.html`.

## 4. Landing Page Structure (shared by both variants)

### 4.1 Header

- Sticky/fixed top bar, `background: #15679b`, white text
- Left: "Moovers" logo text (Manrope 800, ~20px)
- Center: nav links — Moving, Storage, Contact
- Right: fake phone number `(555) 123-4567`
- Height ~64px, responsive (hamburger on mobile not required for prototype)

### 4.2 Hero Section

- Full-width gradient banner: `linear-gradient(135deg, #15679b, #448cca)`
- Headline: "Get A Free Moving Quote" (Manrope 800, ~32px, white)
- Subtext: "Answer a few quick questions and get an instant estimate for your local move."
- Padding: ~56px top, ~40px bottom

### 4.3 Chatbot Area

Centered card (`max-width: 640px`), white background, `border-radius: 20px`, card shadow. Overlaps hero slightly (negative margin).

Section title: "Get Your Instant Quote"

**Variant A (index.html):**
- `<iframe src="form.html">` fills the card
- Borderless, no scrollbar visible (iframe height auto-adjusts or uses fixed tall height)
- `width: 100%; border: none; min-height: 700px;`

**Variant B (index-copy.html):**
- All CSS and JS from `form.html` copied inline
- Chat container renders directly in the card
- `pricing.js` imported via `<script type="module">` (same as current)

### 4.4 Footer

- `background: #15679b`, white text
- Three-column grid:
  - Contact: Moovers Inc., 123 Moving Lane, New York, NY 10001, (555) 123-4567
  - Hours: Mon-Fri 9AM-8PM, Sat 10AM-6PM, Sun Closed
  - Quick Links: Moving, Storage, Reviews, About Us
- Bottom bar: "© 2026 Moovers Inc. All rights reserved."

## 5. Visual Design

- Same palette as chatbot: `--bg: #f5f5f5`, `--text: #15679b`, `--accent: #448cca`
- Font: Manrope (already loaded)
- Border radius: 15-20px on cards
- Shadows: `0 10px 25px rgba(21,103,155,0.08)`
- No innerHTML — createElement + textContent only (per project rules)

## 6. What NOT to build

- No real form fields on the landing page (the chatbot IS the form)
- No backend, no real phone numbers
- No mobile hamburger menu (prototype scope)
- No additional pages
- No build step
