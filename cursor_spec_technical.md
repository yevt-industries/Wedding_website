# Cursor Build Spec — Technical (Netlify + Static + GSAP + EN/UA)

This document is the **technical implementation spec** for Cursor to generate a static, animated, bilingual wedding website that runs locally via Python and deploys to Netlify with **no build step** and **no npm**.

---

## 0) Project goals (non‑negotiables)

- **No build tooling:** pure HTML/CSS/JS (ES modules allowed), hosted on Netlify as static files.
- **Local dev:** edit in Cursor → refresh browser. Run with Python:
  - `python3 -m http.server 5173`
  - open `http://localhost:5173`
- **Smooth, modern feel:** GSAP-based animations + tasteful micro-interactions; no “static brochure” vibe.
- **Bilingual (EN/UA):**
  - First thing on first visit: a **full-screen language chooser** modal.
  - Site remains **architecturally identical** in both languages; only text changes.
  - No duplicated pages per language.
  - Persist choice across pages via `localStorage`.
- **Photo-rich:** responsive hero + gallery sections; lazy-load; lightbox; optimized formats (WebP preferred).
- **Pages:**
  - Home
  - Schedule (placeholder)
  - RSVP (placeholder + link to Google Form later)
  - Event FAQ
  - Travel & Stay
  - Contact

---

## 1) Repository / file layout (what Cursor should create)

Create this folder structure:

- `/index.html`
- `/schedule.html`
- `/rsvp.html`
- `/faq.html`
- `/travel.html`
- `/contact.html`
- `/assets/`
  - `app.css`                (global styles, components, tokens)
  - `app.js`                 (bootstrap: nav/footer injection, i18n, language modal, animations)
  - `i18n.js`                (i18n engine: load dictionaries, apply translations)
  - `animations.js`          (GSAP setup: page transitions + scroll reveals)
  - `gallery.js`             (optional: lightbox + masonry grid behaviors)
  - `/i18n/`
    - `en.json`
    - `uk.json`
- `/photos/`
  - `hero.jpg` or `hero.webp` (placeholder)
  - `gallery-01.webp` ... etc
- `/public/` (optional; only if you want to separate, but not required)
- `/_redirects`              (only needed if using SPA routing; we are not)

**Important:** We are doing **multi-page** HTML (not SPA). That keeps Netlify simplest and reduces JS complexity.

---

## 2) Third‑party libraries (CDN only)

### GSAP (required)
Load via CDN on every page (preferably in `<head>` or end of `<body>`):

- GSAP core
- ScrollTrigger plugin (for scroll reveal)

Cursor should add (example):
- `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js" defer></script>`
- `<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js" defer></script>`

### Optional: Lightbox gallery (recommended)
Pick one CDN-friendly lightbox. Two strong options:

- **PhotoSwipe** (recommended)
  - Good mobile UX, no build step.
- **GLightbox** (lighter, easier)

Cursor should implement with **PhotoSwipe** unless told otherwise.

---

## 3) Typography & visual system (match Save-the-Date vibe)

We cannot guarantee the exact fonts from the image, so implement a **close match** with Google Fonts and make it easy to swap.

### Font pairing recommendation
- Display script (hero titles, “Save the Date” style): **"Allura"** or **"Parisienne"** (fallback to cursive)
- Elegant serif for section titles / accents: **"Cormorant Garamond"** (fallback serif)
- Clean sans for UI and body: **"Montserrat"** or **"Inter"** (fallback sans-serif)

Cursor should implement via Google Fonts `<link>` tags and define CSS variables:

- `--font-script`
- `--font-serif`
- `--font-sans`

### Type scale
- Hero title: large script (responsive clamp)
- Section headings: serif/sans with letter-spacing
- Body: readable sans with comfortable line-height

### Layout feel
- Mediterranean, romantic, intimate, fun:
  - lots of white space
  - soft shadows
  - subtle grain overlay (optional)
  - rounded cards
  - gentle motion, not “techy”

---

## 4) Design tokens (color palette placeholders)

Implement all colors as CSS variables in `:root` so you can plug in final wedding palette later.

In `assets/app.css`, create:

- `--bg` (overall background)
- `--text` (primary text)
- `--muted` (secondary text)
- `--card` (card background)
- `--border` (borders)
- `--accent` (primary accent)
- `--accent-2` (secondary accent)
- `--link` (links)
- `--shadow` (shadow color)

Also create a **palette block** with explicit placeholders:

- `--palette-1: /* TODO: wedding color code */`
- `--palette-2: /* TODO */`
- `--palette-3: /* TODO */`

Add a comment: “Update these 3 palette colors to the final wedding palette.”

---

## 5) Shared layout (no build step, but avoid duplication)

### Approach: JS “layout injection”
To keep pages consistent without a templating build system, do this:

- Each page includes:
  - `<header id="site-header"></header>`
  - `<main>...</main>`
  - `<footer id="site-footer"></footer>`

- `assets/app.js` injects a shared header/footer HTML template string into those containers on load.

Benefits:
- one place to update navigation
- no copying nav/footer across 6 files

**Cursor must implement**:
- `renderHeader(currentPageSlug)`
- `renderFooter()`

Navigation items:
- Home
- Schedule
- RSVP
- Event FAQ
- Travel & Stay
- Contact

Add an “EN | UA” language toggle in the header (small, elegant).

---

## 6) Internationalization (EN/UA) — exact mechanics

### Requirements
- Language modal appears on first visit:
  - if `localStorage.lang` is missing → show modal
  - else → apply saved language immediately
- Language codes:
  - English: `en`
  - Ukrainian: `uk`
- Identical pages; translations come from JSON dictionaries.

### Implementation details

#### 6.1 Data attributes for translation keys
Use `data-i18n="key.path"` on elements whose `textContent` should change.

Examples:
- `<a data-i18n="nav.home" href="/index.html"></a>`
- `<h1 data-i18n="home.heroTitle"></h1>`
- `<p data-i18n="home.heroSubtitle"></p>`

For elements needing HTML (line breaks, emphasis), support:
- `data-i18n-html="key.path"`

For inputs placeholders:
- `data-i18n-placeholder="key.path"`

#### 6.2 Dictionary files
- `/assets/i18n/en.json`
- `/assets/i18n/uk.json`

Structure:
- `nav.*`
- page sections grouped: `home.*`, `schedule.*`, `rsvp.*`, `faq.*`, `travel.*`, `contact.*`
- shared: `common.*`

#### 6.3 Apply translations
`assets/i18n.js` should:
- `loadDictionary(lang)` via `fetch`
- cache dictionary in memory
- `applyTranslations(lang)`:
  - iterate `data-i18n` / `data-i18n-html` / `data-i18n-placeholder`
  - set `document.documentElement.lang = lang`
  - set `dir` (both LTR)

#### 6.4 Language modal
- Full-screen overlay.
- Title: “Choose language / Оберіть мову”
- Buttons: English / Українська
- Save to `localStorage.lang`
- Close modal; apply translations; run entrance animations.

#### 6.5 URL override (nice-to-have)
Support `?lang=en` or `?lang=uk`:
- If present, it overrides stored language and updates storage.

---

## 7) Animations (GSAP) — “smooth and romantic” rules

### Animation principles
- Motion should feel **gentle and premium**, not loud:
  - fade + slight upward movement
  - subtle parallax in hero
  - stagger reveals for lists/cards
  - micro-interactions on buttons and nav
- Respect accessibility:
  - if `prefers-reduced-motion: reduce`, disable GSAP animations and use static fade.

### 7.1 Page load transition
On each page:
- initial state: `.page` opacity 0
- animate to visible: opacity 1 + y from 8px → 0
- hero elements: stagger (title, subtitle, buttons)

### 7.2 Scroll reveal
Use ScrollTrigger:
- `.reveal` sections animate when entering viewport
- stagger child `.reveal-item` for card grids

### 7.3 Navigation
- hover underline glide
- active page highlight (class `is-active`)

### 7.4 Buttons/cards
- button hover: slight lift + shadow
- card hover: subtle scale or lift

Cursor should implement this in `assets/animations.js` and invoked from `app.js`.

---

## 8) Images & performance (photo heavy, still fast)

### Image format guidance
- Prefer **WebP** for most photos.
- Keep hero image under ~400KB if possible.
- Keep gallery images under ~250KB if possible.

### Lazy loading
- Every non-hero image should use:
  - `loading="lazy"`
  - `decoding="async"`

### Responsive sizing
- Use `srcset` only if you want (optional). For simplicity:
  - implement CSS that constrains max-width and uses `object-fit: cover`.

### Lightbox
If PhotoSwipe:
- Provide a gallery grid
- Clicking opens lightbox with captions (optional)
- Ensure it works on mobile

### Folders
- Put photos in `/photos/` and reference as:
  - `/photos/gallery-01.webp`

---

## 9) RSVP integration (Google Forms later)

### Current requirement
- RSVP page is **placeholder** with:
  - explanation text
  - RSVP button (link placeholder)
  - section describing what questions guests will answer (from Content Spec)
- Implementation should be ready to:
  - embed an iframe later OR
  - link out to Google Form (recommended as primary CTA)

Cursor should implement:
- Button with `href="#"` placeholder and comment: “TODO: paste Google Form URL”
- Optional `<iframe ... hidden>` placeholder with comment.

---

## 10) Travel & Transport (Podgorica → Budva → Villa)

Travel page includes:
- “Most guests will arrive via Podgorica (TGD)”
- Arrival guidance: many will fly in May 23
- Transport options:
  - Private transfer (recommended)
  - Taxi
  - Bus (airport → Podgorica station → Budva) + taxi to villa

Also include 2–3 private transfer providers (names + placeholder links/phones), implemented as a list.
(Exact provider details are in the Content Spec file; keep technical file provider-agnostic.)

---

## 11) Venue details (public-safe)

We will include:
- Venue name: **Villa Mona Lisa**
- General area: **near Budva, Montenegro**
- Short descriptive location note (“hills above Budva”) and that it’s the wedding venue.

Do **not** include sleeping capacity or bedroom counts.

---

## 12) Page-by-page component patterns (implementation guidance)

### Global components
- Header (nav + language toggle)
- Footer (short sign-off)
- Language modal
- Section component styles (consistent spacing)
- Cards (for FAQ items, travel blocks)
- Buttons (primary, secondary)
- Photo sections (hero + gallery)

### HTML conventions
- Wrap main content in `<div class="page">`
- Use sections with:
  - `<section class="section reveal">`
  - headings and content
- Add `data-i18n` keys everywhere, even placeholders, so translation is consistent.

---

## 13) QA checklist (Cursor should self-check)

- Site runs via Python server and works on:
  - `http://localhost:5173`
- Language choice modal appears on first visit only.
- Switching language updates nav + page content instantly on all pages.
- All pages share identical header/footer.
- Animations:
  - run smoothly
  - do not re-trigger excessively
  - disable when reduced motion is set
- Gallery loads fast; images lazy-load; lightbox works.
- Mobile:
  - nav collapses into hamburger (recommended) OR a clean stacked nav.
  - modal fits small screens.

---

## 14) Deliverables Cursor should output

- All HTML pages with full content placeholders and i18n keys
- `assets/app.css` complete design system + responsive
- `assets/app.js` bootstrap:
  - inject header/footer
  - language modal logic
  - call i18n apply
  - call animations init
- `assets/i18n.js` i18n engine
- `assets/animations.js` GSAP animations
- `assets/i18n/en.json` and `assets/i18n/uk.json` with full strings from Content Spec
- Gallery/lightbox implementation
- Photo placeholders in `/photos/` (or references with TODO)

---

## 15) Netlify notes (no build)

- Publish directory: repo root (same folder as `index.html`)
- Build command: none
- Deploy: connect GitHub → Netlify auto-deploy on push

---

## 16) Cursor instructions (copy/paste into Cursor as the “task”)

Create a static multi-page site (no npm, no build). Use shared header/footer injection via JS, bilingual i18n via JSON files, language modal on first visit, GSAP animations and scroll reveals, and a photo gallery with lightbox. Build pages: Home, Schedule, RSVP, Event FAQ, Travel & Stay, Contact. Implement styling with romantic Mediterranean vibe, using Google Fonts script + serif + sans. Ensure everything works locally with `python3 -m http.server 5173`.
