# Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a bgmoving.com-styled landing page with "Moovers" branding that embeds the existing chatbot, in two variants (iframe and inline copy).

**Architecture:** Rename current `index.html` → `form.html` (chatbot, untouched). Create `index.html` (landing page shell + iframe). Create `index-copy.html` (landing page shell + chatbot code inlined). Update deploy workflow to ship all files.

**Tech Stack:** Vanilla HTML/CSS/JS, Manrope font (Google Fonts), ESM import of `pricing.js`. No build step.

---

### Task 1: Rename index.html → form.html

**Files:**
- Rename: `index.html` → `form.html`

- [ ] **Step 1: Rename the file**

```bash
git mv index.html form.html
```

- [ ] **Step 2: Verify chatbot still works standalone**

Open `form.html` in a browser. Walk through the chatbot — pick a size, enter addresses, complete the flow. Confirm the result screen renders.

- [ ] **Step 3: Run pricing tests to confirm nothing broke**

```bash
node --test pricing.test.mjs
```

Expected: all 12 tests pass (tests don't touch HTML).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: rename index.html to form.html for chatbot"
```

---

### Task 2: Create index.html (iframe variant)

**Files:**
- Create: `index.html`

The landing page is pure static HTML + CSS. No JS needed (the chatbot JS lives inside the iframe). It must NOT use innerHTML — but since this file has no `<script>` tags, that rule is satisfied automatically.

- [ ] **Step 1: Create index.html with full landing page markup**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Moovers — Free Moving Quote</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #f5f5f5;
      --surface: #ffffff;
      --border: #e1e8ee;
      --text: #15679b;
      --text-muted: #6b8aa5;
      --accent: #448cca;
      --shadow-card: 0 10px 25px rgba(21, 103, 155, 0.08);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Manrope', system-ui, Arial, sans-serif;
      font-size: 14px;
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Header ── */
    .header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 32px;
      background: var(--text);
      color: var(--bg);
    }
    .header-logo {
      font-size: 20px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .header-nav {
      display: flex;
      gap: 24px;
      list-style: none;
    }
    .header-nav a {
      color: var(--bg);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      opacity: 0.85;
      transition: opacity 200ms;
    }
    .header-nav a:hover { opacity: 1; }
    .header-phone {
      font-size: 15px;
      font-weight: 700;
    }

    /* ── Hero ── */
    .hero {
      background: linear-gradient(135deg, #15679b 0%, #448cca 100%);
      color: var(--bg);
      text-align: center;
      padding: 56px 24px 64px;
    }
    .hero h1 {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 12px;
    }
    .hero p {
      font-size: 16px;
      opacity: 0.85;
      max-width: 500px;
      margin: 0 auto;
      line-height: 1.5;
    }

    /* ── Chatbot card ── */
    .chatbot-card {
      max-width: 640px;
      margin: -32px auto 0;
      padding: 32px;
      background: var(--surface);
      border-radius: 20px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-card);
      position: relative;
      z-index: 2;
    }
    .chatbot-card h2 {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
      color: var(--text);
    }
    .chatbot-card iframe {
      width: 100%;
      border: none;
      min-height: 700px;
      border-radius: 15px;
      display: block;
    }

    /* ── Footer ── */
    .footer {
      background: var(--text);
      color: var(--bg);
      padding: 40px 32px;
      margin-top: 48px;
    }
    .footer-grid {
      max-width: 900px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      font-size: 13px;
      line-height: 1.7;
    }
    .footer-grid h4 {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
      opacity: 0.9;
    }
    .footer-grid p {
      opacity: 0.7;
    }
    .footer-bottom {
      max-width: 900px;
      margin: 24px auto 0;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 12px;
      opacity: 0.5;
      text-align: center;
    }
  </style>
</head>
<body>
  <header class="header">
    <div class="header-logo">Moovers</div>
    <nav>
      <ul class="header-nav">
        <li><a href="#">Moving</a></li>
        <li><a href="#">Storage</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
    <div class="header-phone">(555) 123-4567</div>
  </header>

  <section class="hero">
    <h1>Get A Free Moving Quote</h1>
    <p>Answer a few quick questions and get an instant estimate for your local move.</p>
  </section>

  <main class="chatbot-card">
    <h2>Get Your Instant Quote</h2>
    <iframe src="form.html" title="Moving quote chatbot"></iframe>
  </main>

  <footer class="footer">
    <div class="footer-grid">
      <div>
        <h4>Contact</h4>
        <p>Moovers Inc.<br>123 Moving Lane<br>New York, NY 10001</p>
        <p>(555) 123-4567</p>
      </div>
      <div>
        <h4>Hours</h4>
        <p>Mon–Fri: 9 AM – 8 PM<br>Sat: 10 AM – 6 PM<br>Sun: Closed</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <p>Moving<br>Storage<br>Reviews<br>About Us</p>
      </div>
    </div>
    <div class="footer-bottom">&copy; 2026 Moovers Inc. All rights reserved.</div>
  </footer>
</body>
</html>
```

- [ ] **Step 2: Open index.html in a browser and verify**

Check:
- Header shows "Moovers" logo, nav links, phone number
- Hero gradient displays headline and subtext
- Chatbot card loads `form.html` in the iframe — the chatbot conversation works
- Footer shows three columns of info
- Card overlaps hero slightly (negative top margin)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add landing page with iframe chatbot embed"
```

---

### Task 3: Create index-copy.html (inline variant)

**Files:**
- Create: `index-copy.html`

This is a single self-contained file: the landing page shell (header, hero, footer) with all chatbot CSS and JS copied inline. The chatbot renders directly in the card instead of in an iframe.

Key differences from `index.html`:
- No `<iframe>` — instead a `<div id="chat">` inside the card
- All chatbot CSS from `form.html` merged into the `<style>` block
- All chatbot JS from `form.html` copied into a `<script type="module">` block
- `pricing.js` imported via ESM (same as `form.html`)

- [ ] **Step 1: Create index-copy.html**

Build the file by combining:

1. The landing page `<head>` (same as `index.html` Task 2)
2. Merge all chatbot CSS variables and rules from `form.html` into the `<style>` block — the landing page CSS comes first, then chatbot CSS. Chatbot selectors (`.chat`, `.bubble`, `.typing`, `.input-area`, `.choice-btn`, `.text-input`, `.autocomplete`, `.submit-btn`, `.calendar`, `.cal-*`, `.result`, `.breakdown`, `.disclaimer`, `.start-over`, `.phone-capture`, `.phone-form`, `.phone-error`, `.phone-success`) are appended after the landing page styles.
3. The landing page `<body>` — same header, hero, footer as `index.html`, but replace the `<iframe>` with:

```html
<main class="chatbot-card">
  <h2>Get Your Instant Quote</h2>
  <div class="chat" id="chat"></div>
</main>
```

4. The full chatbot `<script type="module">` block from `form.html` — copied verbatim. The only change: the `.chat` container is already inside `.chatbot-card`, so `scrollToBottom` should still work (it scrolls the window, not a container).

The file will be ~500 lines. This is expected — it's a deliberate full copy.

- [ ] **Step 2: Verify chatbot works inline**

Open `index-copy.html` in a browser. Walk through the full chatbot flow inside the landing page. Check:
- Chat bubbles appear inside the card (not full-page)
- Address autocomplete works
- Calendar renders
- Result screen shows with breakdown
- Header/hero/footer are all visible around the chatbot

- [ ] **Step 3: Commit**

```bash
git add index-copy.html
git commit -m "feat: add single-file landing page with inline chatbot"
```

---

### Task 4: Update deploy workflow

**Files:**
- Modify: `.github/workflows/deploy.yml:39-41`

The current deploy copies only `index.html` and `pricing.js`. Update it to also copy `form.html` and `index-copy.html`.

- [ ] **Step 1: Update the cp command in deploy.yml**

Change line 41 from:

```yaml
          cp index.html pricing.js _site/
```

to:

```yaml
          cp index.html form.html index-copy.html pricing.js _site/
```

- [ ] **Step 2: Verify the workflow file is valid YAML**

```bash
cat .github/workflows/deploy.yml
```

Confirm the indentation is correct and all four files are listed.

- [ ] **Step 3: Run tests to confirm nothing is broken**

```bash
node --test pricing.test.mjs
```

Expected: all 12 tests pass.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy form.html and index-copy.html to GitHub Pages"
```

---

### Task 5: Final smoke test

No files changed — this is a verification pass.

- [ ] **Step 1: Verify all files exist**

```bash
ls -la index.html form.html index-copy.html pricing.js pricing.test.mjs
```

All five files should be present.

- [ ] **Step 2: Run tests**

```bash
node --test pricing.test.mjs
```

Expected: all 12 tests pass.

- [ ] **Step 3: Open each page in browser**

1. `form.html` — chatbot works standalone (same as before)
2. `index.html` — landing page with chatbot in iframe
3. `index-copy.html` — landing page with chatbot inline

Verify all three complete a full quote flow.
