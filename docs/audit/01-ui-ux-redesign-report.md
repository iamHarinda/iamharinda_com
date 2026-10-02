# UI/UX Audit & Redesign Report — iamharinda.com

| | |
|---|---|
| **Website** | https://www.iamharinda.com/ |
| **Sister site** | https://premiumphotoedits.com/ (partial; see *Scope & limitations*) |
| **Audit date** | 2 October 2026 |
| **Auditor role** | Senior UI/UX Designer |
| **Report** | 1 of 4. Read with `02-website-redevelopment-plan.md`, `03-seo-audit-and-growth-report.md` and `04-brand-kit.md` |
| **Business** | One-person studio: photo editing (primary), custom web development, polo-shirt pattern design |
| **Primary audience** | Busy wedding and portrait photographers in the US, UK, Canada, Europe and Australia; Fiverr photo-editing buyers |
| **Primary goal** | Orders: free sample edit → paid photo-editing order |

## Table of Contents
0. [Scope & Limitations](#0-scope--limitations)
1. [Executive Summary](#1-executive-summary)
2. [First Impressions & Brand Perception](#2-first-impressions--brand-perception)
3. [Heuristic Evaluation (Nielsen's 10)](#3-heuristic-evaluation-nielsens-10)
4. [Information Architecture & Navigation](#4-information-architecture--navigation)
5. [Visual Design Audit](#5-visual-design-audit)
6. [Mobile & Responsive Experience](#6-mobile--responsive-experience)
7. [Accessibility (WCAG 2.2 AA)](#7-accessibility-wcag-22-aa)
8. [Conversion (CRO) Analysis](#8-conversion-cro-analysis)
9. [Page-by-Page Findings](#9-page-by-page-findings)
10. [Redesign Proposal](#10-redesign-proposal)
11. [Design System Starter](#11-design-system-starter)
12. [Prioritised Action Plan](#12-prioritised-action-plan)
13. [Top 5 Next Steps](#13-top-5-next-steps)

---

## 0. Scope & Limitations

**What was analysed.** The live site returns HTTP 403 to automated fetchers from the audit environment, so the audit was run against:

- the **Astro source code** (`iamharinda_com-development.zip`), and
- the **exact deployed build** (`iamharinda_com_public_html.zip`), served locally and rendered in Chromium at 1440×900 (desktop) and 390×844 (mobile), with axe-core 4.x accessibility scans,
- the **live HTTP response headers**, retrieved through securityheaders.com on 1 Oct 2026. The `last-modified` header matches the build in the zip (28 Sep 2026).

**Pages analysed:** `/`, `/photo-editing/`, `/pricing/`, `/web-development/`, `/fashion-designing/`, `/about/`, `/contact/` (+ `contact.php`), `/blog/` and a sample of the 90 posts (e.g. `/blog/wedding-photo-editing-cost-2026/`), `/404.html`, and the `/orbitra/` section (currently draft and `noindex`).

**Could not verify:**
- Real-user behaviour (Clarity heatmaps and recordings, GA4 funnels). These are installed, so please export them; they would sharpen the CRO section.
- How the live WebGL background performs on real low-end Android phones. The estimate is flagged in §6.
- **premiumphotoedits.com.** Its robots.txt refuses the audit fetcher and the browser route is blocked. Only its live headers were readable (securityheaders.com grade **D**). To audit it, send its source or `public_html` zip, or full-page screenshots.

---

## 1. Executive Summary

**Overall UX score: 5 / 10.**

The build is technically careful: semantic HTML, a skip link, visible focus rings, `prefers-reduced-motion` support, no layout overflow, and fast static pages. But the experience is **designed like a developer portfolio, not a photo-editing storefront**. A photographer landing here cannot see a single edited photo, cannot see a single review, and gets three different answers to "how long does it take?".

### The 5 most critical problems

| # | Problem | Evidence | Impact |
|---|---|---|---|
| 1 | **Zero portfolio on a visual service** | `/photo-editing/` renders **0 images** (Chromium count). The samples section is commented out in `photo-editing.astro` ("Hidden until real portfolio images replace the placeholder slots"). The only images site-wide are the owner's portrait and the payment logos. | Photographers buy with their eyes. Without before/after proof, the free-sample CTA is the only persuasion left, and it asks for effort before any trust is built. |
| 2 | **Social proof exists but is never shown** | `site.js` holds 6 testimonials and `fiverrStats` (4.9★, 183 reviews, 300+ orders). `grep` shows `testimonials` is **not rendered on any page**. The rating appears once, in a paragraph on `/about/`. | This is the strongest trust asset (a 4.9★ Fiverr record) and it is hidden. Reviews are the #1 deciding factor for outsourcing editing to a stranger abroad. |
| 3 | **Homepage splits attention four ways** | H1: "One person. Photo editing, web builds, and fashion designing." Hero copy says "three services", then the H2 says "Four things I do". | A wedding photographer has to work out whether this is a photo editor at all. The primary goal (photo-editing orders) gets ¼ of the homepage. |
| 4 | **Contradictory facts across pages** | Turnaround: "24 to 48 hours" vs "2 / 3 / 4-day delivery" (both on `/photo-editing/`) vs "two to four days" (`site.faqs`). Reply time: "Replies within an hour" vs "within one business day". Packages: 50/100/200 photos on `/pricing/` vs 50/200/500 on `/photo-editing/`. "Paid after delivery, no deposit" vs "book through Fiverr", where buyers pay up front. | Each contradiction is a small trust leak, and on a service bought from overseas, trust is the whole sale. |
| 5 | **Dark purple, motion-heavy UI fights the product** | `global.css`: `--bg:#0a0910`, a full-viewport animated WebGL "aurora" in violet and pink (`aurora.js`), glass cards, magnetic buttons, split-text blur-in on every H1. | A purple, moving backdrop biases colour perception. That is the opposite of the "neutral grey room, calibrated screen" promise on `/about/`. It also reads as "tech/crypto" rather than "trusted wedding editor". |

**Biggest opportunity.** Reposition the homepage around one job: *"Hand-edited wedding and portrait galleries, back on your deadline."* Add a before/after gallery and reviews above the fold. Unify every fact into a single source. Move to a neutral, photo-first visual system (Report 4). Most of this is content and layout work inside the existing Astro codebase, not a rebuild.

---

## 2. First Impressions & Brand Perception

### 2.1 Five-second test (homepage, desktop and mobile)

**Finding:** The value proposition is unclear within 5 seconds.
- **Evidence:** Above the fold on the homepage: portrait + "online" badge, H1 "One person. Photo editing, web builds, and fashion designing.", CTAs "See the services" and "Contact". No photo, no price, no review, no outcome.
- **Impact:** A photographer cannot answer "What do I get, why this person, what next?" A generalist positioning reads as "not a specialist" to the highest-value audience, US wedding photographers.
- **Recommendation:** Make the homepage a photo-editing page with one clear H1 (see the wireframe in §10.4 and Report 3 §3.1). Move web dev and pattern design into a secondary "Also from Harinda" band lower down. They keep their own pages and SEO; they just stop competing for the hero.

### 2.2 Trust signals

| Signal | Present? | Where | Verdict |
|---|---|---|---|
| Real face & name | ✅ | Hero avatar, `/about/` desk photo | Strong. Keep it, but make it larger and with context. |
| Reviews / ratings | ⚠️ | One sentence on `/about/` | Hidden. Surface 4.9★ / 183 reviews site-wide (§8). |
| Portfolio / before-after | ❌ | — | Critical gap. |
| Guarantees | ✅ (text) | "Unlimited revisions", "pay after delivery", "free sample" | Strong offers, but buried in body copy. Turn them into a visual guarantee strip. |
| Tools / credentials | ⚠️ | `/about/` list (ASUS ProArt, Calman, Lightroom) | Good, but `toolLogos` (Calman, Adobe, Starlink) is defined and unused. Show as text badges, not third-party logos (trademark risk; see Report 2 §4). |
| Business identity | ⚠️ | Footer "trading as iamharinda", UK WhatsApp number (+44), Sri Lanka base | A UK number with a Sri Lanka base and no explanation raises questions. Add one line: "UK WhatsApp number, studio in Sri Lanka, hours overlap US mornings." |
| Policies | ❌ | No privacy policy, terms, or refund/revision policy for the main site | The Orbitra section has privacy pages; the main business has none. Required for GA4 + Clarity + a contact form with EU/UK visitors. |

### 2.3 Visual identity
- **Finding:** The identity is the "reactbits.dev" style (code comment in `global.css`: *"The reference is reactbits.dev: an animated backdrop, effect text, glass cards…"*), and it is generic to the developer-portfolio genre.
- **Impact:** It signals "front-end developer", which supports the web-dev line but undercuts the photo-editing line, which brings in the orders. Competitors in the buyer's mind (FixThePhoto, Fiverr gigs) lead with photos, not effects.
- **Recommendation:** Adopt the neutral "studio grey + safelight orange + grade teal" brand in Report 4, built around the colour-grading world (grey card, teal and orange grade, darkroom safelight).

---

## 3. Heuristic Evaluation (Nielsen's 10)

Severity: 0 = none, 4 = catastrophic.

| # | Heuristic | Severity | Site-specific evidence | Fix |
|---|---|---|---|---|
| 1 | Visibility of system status | 1 | ✅ `aria-current` underline on the nav; contact form shows `#sent` / `#error` banners via `:target`. ⚠️ The "online" presence badge is a hard-coded flag (`availability.on: true`), so it shows "online" at 3 a.m. Sri Lanka time. | Replace "online" with "Usually replies within X hours" (a true, static claim), or compute it from working hours in JS with a static fallback. |
| 2 | Match with the real world | 3 | The nav says "Pattern designing", the URL is `/fashion-designing/`, the footer says "Fashion Designing", the H1 says "Polo Shirt Pattern Design", and the form says "Polo shirt design & patterns". "Fashion designing" suggests garment or sewing-pattern work; your own blog post `/blog/pattern-design-vs-patternmaking-difference/` explains why that's a different thing. | Use one name everywhere: **"Polo & Golf Shirt Design"**. |
| 3 | User control & freedom | 1 | Mobile menu closes on Esc and on outside tap (good). The pricing slider has no text input fallback for exact counts. | Add a number input paired with the range slider. |
| 4 | Consistency & standards | **4** | See Executive Summary #4. Also: the "Photo editing & colour correction" card links to `/pricing/` while "Wedding photo editing" links to `/photo-editing/`, a page whose H1 is general ("Photo Editing That Looks Like You Edited It") and covers portraits, real estate, drones and more. | One page per job, one fact per thing, stored in `site.js` (Report 2 §5). |
| 5 | Error prevention | 2 | The contact form accepts no files and gives no guidance on what to send for a free sample; users must then switch to WhatsApp or email. A duplicate "Not sure yet" appears in the service `<select>` (an empty option plus the same item in `site.contact.services`). | Add a "Free sample request" form with photo-link and photo-count fields (§10.4). Remove the duplicate option. |
| 6 | Recognition rather than recall | 2 | Prices for photo editing live on two pages with two different package ladders, so users must remember which page said what. | One canonical price table, reused as a component. |
| 7 | Flexibility & efficiency | 2 | Returning photographers (the repeat-business goal) have no fast path such as "Send a new gallery". WhatsApp deep links with prefilled text are good. | Add a persistent "Send a gallery" header CTA. Add a `/start/` page with an upload-link brief. |
| 8 | Aesthetic & minimalist design | 3 | Every H1 animates word-by-word with blur. Cards tilt and spotlight on hover (`data-tilt`, `data-spot`). Buttons are "magnetic". The homepage service list fills only ~50% of the 1440 px container (screenshot), leaving a dead right half. A 90 KB world map takes a full screen to say "15 countries". | Calm motion down to one subtle fade. Use a 2×2 service grid. Shrink the map to a compact "Clients in 15 countries" row of flags or text. |
| 9 | Help users recover from errors | 1 | The 404 page is clean, with home and WhatsApp links. The form error banner offers email and WhatsApp alternatives (good). | Add the top 4 service links and a blog search to the 404. |
| 10 | Help & documentation | 2 | Good FAQ coverage (8–10 per service page, native `<details>`). But there is no "How to send files / prepare a Lightroom catalog" guide, the biggest practical question for outsourced editing. | Add `/photo-editing/how-to-send-files/` (doubles as an SEO page). |

---

## 4. Information Architecture & Navigation

### 4.1 Current structure (from `site.nav` and the sitemap: 7 core pages + 90 posts)

```
Home
├── Photo editing        → /photo-editing/      (labelled "Wedding photo editing" in footer & home)
├── Pattern designing    → /fashion-designing/  (labelled "Fashion Designing" in footer)
├── Web development      → /web-development/
├── Blog                 → /blog/  (90 posts, one flat list, 3 unrelated audiences, no categories)
├── Pricing              → /pricing/ (also the de-facto "photo editing & colour correction" service page)
├── About                → /about/
└── Contact              → /contact/
(Hidden: /orbitra/ — draft, not linked from nav)
```

**Problems**
1. **8 top-level nav items** at desktop, all equal weight, and no primary CTA button in the header.
2. **Two photo-editing pages competing:** `/pricing/#photo-editing` (bulk colour correction) and `/photo-editing/` (packages). Users and Google can't tell which is "the" page (cannibalisation; see Report 3 §2).
3. **The blog mixes three audiences.** 20 apparel posts appear first on `/blog/` (newest-first sort), so a photographer arriving from a Lightroom article sees polo-shirt articles at the top.
4. **No portfolio, reviews, process, or policy pages.**

### 4.2 Proposed sitemap

```
/                               Photo-editing-first home (with "Also from Harinda" band)
/photo-editing/                 Service hub: overview, gallery, pricing table, process, FAQ
  /photo-editing/wedding/       Wedding & engagement editing         (NEW — main money page)
  /photo-editing/portrait-headshot/  Portrait & headshot retouching  (NEW)
  /photo-editing/culling/       Culling + editing bundles            (NEW)
  /photo-editing/how-to-send-files/  Lightroom catalog / RAW handoff guide (NEW)
/work/                          Before/after portfolio, filter by genre (NEW)
/reviews/                       Verbatim Fiverr reviews + screenshots (NEW)
/free-sample/                   Sample request form (NEW — main conversion page)
/pricing/                       Hub: one summary card per service, links out (keep URL)
/polo-shirt-design/             (rename of /fashion-designing/, 301 — conditional, see Report 3 §2.6)
/web-development/               Keep
/about/                         Keep, expand (story, setup photos, timezone)
/contact/                       Keep
/blog/                          Index with 3 category tabs
  /blog/category/photo-editing/  (wedding workflow, Lightroom, backup)
  /blog/category/web-development/
  /blog/category/apparel-design/
/privacy/  /terms/              (NEW — legal; required for GA4/Clarity/consent)
```

**Proposed header nav (desktop):** `Photo editing ▾` · `Work` · `Pricing` · `Reviews` · `Blog` · `About` · **[Get a free sample]** (primary button).
Web development and polo design move into a small "More services" item under the Photo-editing dropdown's footer, or into a "Services ▾" menu. They stay in the footer and on `/pricing/`.

### 4.3 Primary user flows

**Flow A: First-time photographer (target: 3 clicks to a sample request)**
`Google "outsource wedding photo editing"` → `/photo-editing/wedding/` (see the gallery, price, reviews) → `Get a free sample` → `/free-sample/` (name, email, gallery link, style notes) → confirmation page with a WhatsApp option and "what happens next".

**Flow B: Fiverr buyer checking the person off-platform**
`Fiverr profile` → `iamharinda.com` → hero shows the same face and the same 4.9★ → `/work/` → `Order on Fiverr` (buyer protection) or `Free sample`.

**Flow C: Returning client**
`Home` → header `Get a free sample` / `Send a gallery` → `/free-sample/?returning=1` (skips the style questionnaire).

---

## 5. Visual Design Audit

| Area | Current (evidence) | Assessment | Recommendation |
|---|---|---|---|
| **Typography** | Fraunces (display, 400–600) + IBM Plex Sans (400–600), 6 self-hosted woff2 files (~125 KB total), root `font-size:106.25%`, modular scale `--step--1`…`--step-5` | Good pairing for editorial tone; correct `font-display:swap` and preloads. Six weights are more than needed, and Plex reads "IBM/enterprise". | Keep Fraunces for display. Switch body to **Instrument Sans**. Ship 2 weights per family (Report 4 §6). |
| **Colour** | `--bg:#0a0910`, violet `#a855f7`, periwinkle `#8b7bff` (variable misleadingly named `--c-teal`), pink `#f472b6` (named `--c-amber`), gradient text on prices | Variable names no longer match values (tech debt). Purple and pink signal "creative tech", not colour accuracy. Gradient-filled prices (`.grad-text`) cut legibility. | Neutral light theme with a single warm accent and a teal secondary (Report 4 §5). Solid-colour prices. |
| **Spacing / grid** | `--container:72rem`, generous `--space-7` section padding (up to 7 rem) | Section padding plus the empty map area make the homepage feel sparse: 4,467 px tall on mobile with ~213 words of content. | Tighten sections to 4–5 rem. Use a 12-col grid with a 2×2 service grid on desktop. |
| **Imagery** | 1 portrait, 1 desk photo, 0 work samples. 12 grey "placeholder — replace with your file" images are **deployed** at `/images/sample-*-before/after.webp` (not linked, but publicly reachable) | The most important visual asset is missing. | Commission or curate 12–18 before/after pairs from past Fiverr work, with client permission (§10). Delete the placeholder files. |
| **Consistency** | Button styles: `.btn` (white), `.btn--ghost`, `.btn--grad` (gradient border). Card styles vary by page. | Three button variants with no clear hierarchy. The secondary CTA "Use the contact form" uses the flashiest style (`btn--grad`). | Primary (accent fill), secondary (outline), tertiary (text link). The primary is always the sample or quote action. |
| **Motion** | Aurora WebGL canvas, split-text blur, `.reveal` clip-path, `.rise` fade, tilt, spotlight, magnetic buttons, shine on H2s. All gated behind `prefers-reduced-motion` ✅ | Too much for a trust-led service; it also delays the visible H1 (LCP; Report 2 §3). | One entrance fade (150–200 ms) and hover states only. Remove the aurora. |

---

## 6. Mobile & Responsive Experience

Tested at 390×844 (iPhone 14-class) on the local build.

| Finding | Evidence | Impact | Recommendation |
|---|---|---|---|
| ✅ No horizontal scroll, readable 17 px body text, full-width stacked CTAs | Screenshots `mobile-home-fold`; `scrollWidth` ≤ viewport (an `overflow-x:hidden` safety net on `html` hides one ~469 px-wide element on `/`, `/photo-editing/`, `/web-development/`, `/fashion-designing/`) | Good baseline | Find and fix the over-wide element instead of relying on `overflow-x:hidden` (likely the hero `.split` heading or the canvas). |
| ⚠️ Very long pages with little content | Mobile document height: `/photo-editing/` 9,843 px, `/fashion-designing/` 9,202 px, `/blog/` 30,657 px (90 cards, no pagination) | Scroll fatigue; the CTA is far from the decision moment | Add a sticky bottom CTA bar on mobile ("Free sample · WhatsApp"). Paginate or filter the blog by category. |
| ⚠️ Tap targets at the minimum | 12–17 links per page measure 22 px tall (footer and inline links, e.g. "WhatsApp 79×22", "hello@iamharinda.com 176×22"). The pricing range input is 16 px tall. | Passes WCAG 2.2 **2.5.8 (24×24, with spacing exception)** only through spacing; hard to tap with a thumb | Give footer links `padding-block: 10px` (target ≥ 44 px). Make the slider thumb ≥ 28 px. |
| ⚠️ Menu panel overlaps the hero | `mobile-menu-open.png`: a dropdown floats over the H1 without a scrim | Minor; it works, but looks unfinished | Full-width sheet with a scrim, plus the primary CTA at the bottom of the sheet. |
| ⚠️ WebGL background on phones (*estimate*) | `aurora.js` caps DPR at 1 on mobile and pauses on `visibilitychange` (good), but runs `requestAnimationFrame` continuously while visible | Battery drain and INP risk on low-end Android (*verify* with the PageSpeed Insights field INP and a mid-range Android device) | Remove it in the redesign, or render one static frame. |

---

## 7. Accessibility (WCAG 2.2 AA)

axe-core 4.x scan (WCAG 2.0/2.1/2.2 A+AA + best-practice) on 10 pages, desktop and mobile.

| # | Finding | Evidence | WCAG | Severity | Fix |
|---|---|---|---|---|---|
| A1 | Prohibited ARIA on SVG map paths | axe `aria-prohibited-attr` × **193 nodes** on `/` and `/about/` (`aria-label` on `<path>` with no role) | 4.1.2 | Serious | Remove the per-path labels; give the map container `role="img"` plus one `aria-label="Client countries: Canada, United States, …"`. The text fallback list already exists. |
| A2 | Possible low contrast over the animated background | `--text-faint #9d9daa` is 7.40:1 on `#0a0910`, but **~3.6:1** over the aurora's purple peaks (*estimated* sample `#5b2d8a`). axe cannot measure text over a canvas. | 1.4.3 | Moderate (*verify manually*) | The redesign removes the canvas; all new pairs are pre-checked in Report 4 §5. |
| A3 | Split-text H1 is rewritten into word `<span>`s | `fx.js` empties the H1 and adds `aria-label` to the inner span | 1.3.1 | Minor | Remove it. `aria-label` on a non-interactive `<span>` is unreliable across screen readers. |
| A4 | Form placeholder used as instructions | `/contact/` textarea guidance sits only in `placeholder` | 3.3.2 | Minor | Move the guidance into a visible hint linked with `aria-describedby`. |
| A5 | Status banners are hidden with CSS `:target` | `#sent` uses `role="status"` but is static on load, so it is not announced on redirect | 4.1.3 | Minor | Render a dedicated `/contact/thanks/` page (better for GA4 conversions too). |
| ✅ | Skip link, `lang="en"`, visible `:focus-visible` ring (pink 2 px outline, screenshot `desktop-focus`), `aria-expanded` on the menu, Esc to close, native `<details>` FAQ, all images have `alt`, `prefers-reduced-motion` respected | — | — | Pass | Keep all of these in the rebuild. |
| A6 | Headings in footer use `<h2>` | Every page ends with 4 footer H2s ("Get in touch", "Services", …) | 1.3.1 / best practice | Minor | Use `<p class="footer__title">` or `<h2 class="sr-only">Site footer</h2>` + lists. |

---

## 8. Conversion (CRO) Analysis

### 8.1 CTA inventory (rendered)

| Page | CTAs (in order) | Problem |
|---|---|---|
| `/` | See the services · Contact · Message on WhatsApp · Use the contact form | No "free sample" CTA on the homepage at all, even though it is the strongest offer. |
| `/photo-editing/` | Message me first · See pricing · Message me first · Use the contact form | "Message me first" is a friction-framed label (it sounds like a gate). |
| `/pricing/` | Get a free sample edit · Order on WhatsApp · Book on Fiverr | ✅ Best page. The free-sample block exists here only. |
| `/web-development/` | Get a fixed-price quote ×2 · See pricing · Use the contact form | OK |
| `/fashion-designing/` | Send me your design ×2 · See packages · Use the contact form | OK |
| Blog posts | Get a free sample edit (on all 90 posts, including web-dev and apparel posts) | Wrong offer on 43 of 90 posts. |

### 8.2 Friction points
1. **The sample request has no form.** Every sample CTA opens WhatsApp. WhatsApp works for many people, but US photographers often prefer email and forms, and a WhatsApp click isn't trackable as a conversion without extra setup.
2. **Fiverr vs direct is unexplained.** "Pay after delivery" (direct) and "Book on Fiverr" (pay first, buyer protection) sit side by side with no comparison.
3. **No price anchor next to the photos**, because there are no photos.
4. **No urgency or capacity signal** that is honest (for example, "Taking 6 new wedding clients for the 2027 season").

### 8.3 Recommended conversion system
- **One primary CTA site-wide:** **"Get 3 photos edited free"**. Concrete beats "free sample edit".
- **Secondary:** "WhatsApp me" (icon button). **Tertiary:** "Order on Fiverr".
- **Guarantee strip** under every hero: `✓ 3 free sample edits` · `✓ Pay after you approve` · `✓ Unlimited revisions` · `✓ Your style, matched`.
- **Review bar** under the hero: `★★★★★ 4.9 · 183 Fiverr reviews · 300+ orders`, linked to `/reviews/`. *Verify the numbers against Fiverr before publishing; the code says "read off a screenshot".*
- **Fiverr vs Direct table** on `/pricing/`:

| | Order direct | Order on Fiverr |
|---|---|---|
| Price | From $10 / 50 photos | Same packages + Fiverr fees |
| When you pay | After you approve | Upfront (held by Fiverr) |
| Protection | Free sample + pay-after | Fiverr buyer protection |
| Best for | Repeat clients | First order, if you prefer a platform |

- **Track:** `generate_lead` events for the form submit, WhatsApp click, Fiverr click and email click in GA4 (Report 3 §12).

---

## 9. Page-by-Page Findings

### Home `/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| H1 lists three unrelated services ⚡ | No specialist positioning; photographers bounce | H1: "Hand-edited wedding & portrait galleries, back on your deadline" |
| No photos, no reviews, no prices above the fold ⚡ | Nothing to evaluate | Before/after slider + review bar + "from $0.20/photo" |
| "Three services" vs "Four things I do" ⚡ | Credibility | Fix copy (photo editing counts as one service with sub-types) |
| Service list at 50% width on desktop; 90 KB map uses a full screen | Wasted prime space | 2×2 grid; replace the map with a one-line country strip |

### Photo editing `/photo-editing/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| 0 images; samples section commented out | The core sales page cannot show the product | Gallery of 6–9 before/after pairs per genre |
| "24 to 48 hours" vs "2-, 3-, 4-day delivery" on the same page ⚡ | Contradiction at the decision point | One turnaround table: 50 → 2 days, 200 → 3 days, 500 → 4 days; rush on request |
| Packages 50/200/500 here vs 50/100/200 on `/pricing/` ⚡ | Confusion and cannibalisation | One ladder: 50 / 100 / 200 / 500 at $0.20 per photo, from a shared component |
| "Message me first" CTA ⚡ | Sounds like a gate | "Get 3 photos edited free" |
| H1 "Photo Editing That Looks Like You Edited It" is clever but vague, and the hero is two long paragraphs | Slow to scan | Keep the line as the subhead; H1 = keyword + benefit (Report 3 §3) |

### Pricing `/pricing/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| Also acts as the "photo editing & colour correction" service page | Two pages compete | Make `/pricing/` a hub; move the photo-editing detail to `/photo-editing/` |
| Gradient-filled, underlined price numbers (`grad-text` inside links) | Looks like links, low legibility | Solid ink-coloured prices; the link goes on a "See details →" button |
| Payment logos include Venmo, but Venmo works only through the PayPal invoice | Could mislead | Caption: "Venmo via PayPal invoice (US)" |

### Web development `/web-development/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| No portfolio of sites built | Same proof gap as photo editing | Add 3 case cards (iamharinda.com itself, ToolsServer, PeriodicElementTable/Orbitra pages) with Lighthouse scores |
| Prices start at $750 here; please check against your Fiverr gig and other offers (packages from $65 have been mentioned) | Price mismatch across channels erodes trust | Align, or explain: "Fiverr starter sites from $X; custom builds from $750" |

### Polo design `/fashion-designing/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| 0 images of polo designs | Visual product, no visuals | 6–9 mockups (front/back) |
| Naming chaos (see H2) ⚡ | Wrong expectations | "Polo & Golf Shirt Design" everywhere |

### About `/about/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| Good story, but the rating is buried mid-paragraph | Wasted proof | Pull-quote card with the rating and 2 reviews |
| "Former photographer" (on `/photo-editing/`) is not expanded | Credible differentiator left unsupported | 2–3 sentences: what you shot, for how long |

### Contact `/contact/`
| Problem | Why it matters | Recommended fix |
|---|---|---|
| Generic form; no file-link field; duplicate "Not sure yet" option ⚡ | Sample requests need photo links | Separate `/free-sample/` form; fix the duplicate |
| Two emails shown (hello@ and a gmail) | Looks less professional; splits replies | Show hello@ only |

### Blog `/blog/` and posts
| Problem | Why it matters | Recommended fix |
|---|---|---|
| 90 posts on one page, no categories, apparel posts first | Wrong content for most visitors | Category tabs + per-category landing pages |
| Posts have no images, no author box, no related posts, exactly 1 in-body internal link each | Low engagement, weak E-E-A-T | Hero image (your own before/after), author card, 3 related posts, contextual service CTA |
| Free-sample CTA on web and apparel posts | Irrelevant CTA | CTA chosen by post category |

---

## 10. Redesign Proposal

### 10.1 Design direction: "The Grading Suite"
A calm, neutral, light interface, like a professional editing room. Mid-grey and paper-white surfaces let the photos carry the colour, and the brand colours borrow from colour grading itself: **teal & orange** (the world's most recognisable grade) and a **darkroom safelight** accent. Motion is minimal; photography is maximal. Details in `04-brand-kit.md`.

### 10.2 Palette & type (summary; full spec in Report 4)

| Token | Hex | Use |
|---|---|---|
| Ink | `#141416` | Headings, body |
| Graphite | `#3D3D44` | Secondary text |
| Muted | `#5E5E66` | Captions (5.89:1 on paper) |
| Paper | `#F6F5F2` | Page background |
| White | `#FFFFFF` | Cards, image mats |
| Line | `#DEDCD5` | Dividers (decorative only) |
| Safelight (accent) | `#B5451B` | Primary buttons (white text 5.48:1), links |
| Grade Teal (secondary) | `#0E5A61` | Badges, highlights, info |

**Fonts:** Fraunces (display, 500/600) + Instrument Sans (body, 400/600) + JetBrains Mono (metadata labels like `ISO 3200 · 5600K`; optional).

### 10.3 Component list
Header with primary CTA · Mobile sheet nav · Hero with before/after slider · Review bar · Guarantee strip · Before/after card (drag slider, keyboard-accessible) · Genre filter chips · Price table (shared component) · Turnaround table · Process steps (4) · Testimonial card (verbatim quote, first name, country, genre, Fiverr link) · FAQ accordion (native `<details>`) · Sample-request form · Fiverr-vs-Direct comparison · Blog card with image + category · Author card · Sticky mobile CTA bar · Footer with policies.

### 10.4 Wireframes

**Homepage (desktop)**
```
┌──────────────────────────────────────────────────────────────────────────┐
│ harinda.  Photo editing▾  Work  Pricing  Reviews  Blog  About [Get 3 free]│
├──────────────────────────────────────────────────────────────────────────┤
│  WEDDING & PORTRAIT EDITING · HAND-EDITED, NO AI                         │
│  Hand-edited wedding galleries,            ┌───────────────────────────┐ │
│  back on your deadline.                    │   BEFORE ◀──┃──▶ AFTER    │ │
│  Your style matched on a calibrated        │   (real wedding photo)    │ │
│  screen. From $0.20 a photo.               └───────────────────────────┘ │
│  [Get 3 photos edited free]  (WhatsApp me)   "Mixed venue light · 5600K" │
│  ★★★★★ 4.9 · 183 Fiverr reviews · 300+ orders                            │
├──────────────────────────────────────────────────────────────────────────┤
│ ✓ 3 free sample edits  ✓ Pay after you approve  ✓ Unlimited revisions    │
├──────────────────────────────────────────────────────────────────────────┤
│ SEE THE WORK   [Wedding] [Portrait] [Family] [Real estate]               │
│ ┌──────┐ ┌──────┐ ┌──────┐                                               │
│ │ B/A  │ │ B/A  │ │ B/A  │   → View full portfolio                       │
│ └──────┘ └──────┘ └──────┘                                               │
├──────────────────────────────────────────────────────────────────────────┤
│ HOW IT WORKS  1 Send a link → 2 Sample in 24h → 3 Full gallery → 4 Pay   │
├──────────────────────────────────────────────────────────────────────────┤
│ PRICING  50 $10 │ 100 $20 │ 200 $40 │ 500 $100   Turnaround 2–4 days      │
├──────────────────────────────────────────────────────────────────────────┤
│ REVIEWS  ┌quote┐ ┌quote┐ ┌quote┐   (verbatim, name, country)              │
├──────────────────────────────────────────────────────────────────────────┤
│ MEET HARINDA  [desk photo]  Former photographer · ASUS ProArt · LR Classic│
├──────────────────────────────────────────────────────────────────────────┤
│ ALSO FROM HARINDA   Web development →     Polo & golf shirt design →     │
├──────────────────────────────────────────────────────────────────────────┤
│ FAQ (5)                         Latest from the blog (3 photo posts)     │
├──────────────────────────────────────────────────────────────────────────┤
│ Final CTA band: "Send 3 photos. See the difference."  [Get 3 free]       │
│ Footer: services · policies · contact · © · Privacy · Terms              │
└──────────────────────────────────────────────────────────────────────────┘
```

**Homepage (mobile order):** Header (logo + Menu) → eyebrow → H1 → subhead → before/after (16:10) → primary CTA (full width) → review bar → guarantees (2×2) → work carousel (swipe) → steps → pricing (stacked) → reviews (swipe) → about → also-from → FAQ → final CTA → footer. **A sticky bottom bar** `[Get 3 free] [WhatsApp]` appears after the hero scrolls out.

**`/photo-editing/wedding/`**
```
Breadcrumb: Home › Photo editing › Wedding
H1  Wedding Photo Editing Service — Hand-Edited in Lightroom
Sub "Send the gallery after the wedding. Get it back in your style in 2–4 days."
[Get 3 photos edited free]  ★ 4.9 (183)
─ Gallery: ceremony / reception / golden hour / B&W (before/after) ─
─ What's included (6 cards with icons) ─
─ Styles we match: Light & airy · Moody · Film · Classic (one B/A each) ─
─ Pricing table (shared) + Culling add-on ─
─ Turnaround table ─
─ How to send your files (Lightroom catalog / Smart Previews / RAW link) ─
─ Reviews filtered to weddings ─
─ FAQ (wedding-specific, 8) ─
─ Related guides (3 blog posts) ─
─ Final CTA ─
```

**`/free-sample/` (the main conversion page)**
```
H1  Get 3 photos edited free
"No payment details. No obligation. Usually back within 24 hours."
┌ Form ───────────────────────────────────────┐
│ Name*            Email*                     │
│ Link to 3 photos* (Drive/Dropbox/WeTransfer)│
│ Shoot type [Wedding ▾]  Gallery size [~500] │
│ Style: (•) Match my reference  ( ) Natural  │
│ Reference link (optional)                   │
│ Deadline for the full gallery (optional)    │
│ [Send my free sample request]               │
│ Prefer WhatsApp? → +44 7355 229599          │
└─────────────────────────────────────────────┘
Right column: what happens next (3 steps), privacy note, 2 reviews
```

**`/work/`**: filter chips (genre) → masonry of before/after cards → each card opens a lightbox with the slider, a caption (problem → fix) and camera metadata.

**`/pricing/`**: 4 service summary cards → Fiverr-vs-Direct table → payment methods → FAQ.

---

## 11. Design System Starter

Developer-ready tokens (the same values ship as CSS/Tailwind in Report 4 §9).

### 11.1 Colour tokens
```css
:root {
  --color-ink: #141416;      --color-graphite: #3D3D44;  --color-muted: #5E5E66;
  --color-paper: #F6F5F2;    --color-surface: #FFFFFF;   --color-line: #DEDCD5;
  --color-border-input: #85837C;            /* 3.79:1 on white — meets 1.4.11 */
  --color-accent: #B5451B;   --color-accent-hover: #963814; --color-accent-tint: #FBEDE6;
  --color-teal: #0E5A61;     --color-teal-tint: #E3F1F1;
  --color-success: #1D7144;  --color-warning: #8A5300; --color-error: #B42318;
}
```

### 11.2 Type scale (1.250 major third, base 17 px)
| Token | Desktop | Mobile | Weight | Line height | Font |
|---|---|---|---|---|---|
| `display` | 56 px | 38 px | 500 | 1.05 | Fraunces |
| `h1` | 44 px | 32 px | 500 | 1.1 | Fraunces |
| `h2` | 34 px | 27 px | 500 | 1.15 | Fraunces |
| `h3` | 24 px | 21 px | 600 | 1.25 | Instrument Sans |
| `body-lg` | 20 px | 18 px | 400 | 1.55 | Instrument Sans |
| `body` | 17 px | 17 px | 400 | 1.6 | Instrument Sans |
| `small` | 15 px | 15 px | 400 | 1.5 | Instrument Sans |
| `label` | 13 px | 13 px | 600, +0.06em, uppercase | 1.3 | Instrument Sans / JetBrains Mono |

### 11.3 Spacing (4 px base)
`--space-1: 4px · 2: 8px · 3: 12px · 4: 16px · 5: 24px · 6: 32px · 7: 48px · 8: 64px · 9: 96px`
Section padding: `--space-8` (mobile) / `--space-9` (desktop). Container: 1200 px; text measure 68 ch.

### 11.4 Radius, shadow, motion
`--radius-sm: 6px · --radius-md: 10px · --radius-lg: 16px · --radius-pill: 999px`
`--shadow-1: 0 1px 2px rgb(20 20 22 / .06), 0 1px 1px rgb(20 20 22 / .04)`
`--shadow-2: 0 8px 24px -8px rgb(20 20 22 / .14)`
`--ease: cubic-bezier(.2,.7,.2,1); --dur: 180ms` (no motion when `prefers-reduced-motion`).

### 11.5 Buttons
| Variant | Default | Hover | Focus | Disabled |
|---|---|---|---|---|
| Primary | bg `#B5451B`, text `#FFF`, 48 px tall, radius 10 | bg `#963814` | 3 px outline `#0E5A61`, offset 2 | bg `#DEDCD5`, text `#5E5E66` |
| Secondary | 1.5 px border `#141416`, text ink, transparent | bg `#141416` / text `#FFF` | same | border `#DEDCD5` |
| Ghost / text | text `#B5451B`, underline on hover | text `#963814` | same | text `#85837C` |

### 11.6 Cards
Surface `#FFF`, 1 px `--color-line`, radius 16, padding 24, `--shadow-1`. Image cards: 4 px white mat around photos (like a print), caption in `label` style.

### 11.7 Form elements
Input height 48 px; border 1.5 px `--color-border-input`; radius 10; label above (15 px / 600); hint below (15 px muted, linked via `aria-describedby`); focus = 3 px teal ring; error = border `#B42318` + icon + message text (never colour alone).

---

## 12. Prioritised Action Plan

⚡ = quick win (high impact, low effort). Phases match Reports 2 and 3.

| # | Issue | Impact | Effort | Priority | Phase |
|---|---|---|---|---|---|
| 1 | ⚡ Render the existing testimonials + 4.9★ review bar on Home, `/photo-editing/`, `/pricing/` | High | Low | P1 | 0 |
| 2 | ⚡ Unify turnaround, reply-time and package facts in `site.js`; fix "three/four services" | High | Low | P1 | 0 |
| 3 | ⚡ Add a free-sample CTA to the homepage hero and header; rename "Message me first" | High | Low | P1 | 0 |
| 4 | ⚡ One name for the polo service; fix the duplicate "Not sure yet" option | Med | Low | P1 | 0 |
| 5 | ⚡ Fix the 193 ARIA errors on the world map | Med | Low | P1 | 0 |
| 6 | Before/after portfolio (12–18 pairs) + `/work/` page | High | Med | P1 | 1 |
| 7 | Photo-editing-first homepage redesign | High | Med | P1 | 1 |
| 8 | `/free-sample/` form page + thank-you page | High | Med | P1 | 1 |
| 9 | New design system (light neutral theme, remove aurora / split-text) | High | Med | P1 | 1 |
| 10 | `/photo-editing/wedding/` and `/portrait-headshot/` child pages | High | Med | P2 | 1–2 |
| 11 | Privacy, terms and revision policy pages + consent banner | High | Low | P1 | 0 |
| 12 | Blog categories, post images, author card, related posts | Med | Med | P2 | 2 |
| 13 | Sticky mobile CTA bar; 44 px footer tap targets | Med | Low | P2 | 1 |
| 14 | `/reviews/` page with verbatim quotes | Med | Low | P2 | 2 |
| 15 | Web-dev case studies; polo design mockup gallery | Med | Med | P3 | 2 |
| 16 | Fiverr-vs-Direct comparison table | Med | Low | P2 | 1 |

---

## 13. Top 5 Next Steps

1. **This week:** surface the testimonials and the 4.9★ / 183-review bar, and fix every contradictory fact (turnaround, reply time, package ladder, service names) in `site.js`.
2. **Collect 12–18 before/after pairs** from past work, with client permission, and publish `/work/` plus a hero slider.
3. **Make "Get 3 photos edited free" the single primary CTA** and build `/free-sample/` with a photo-link field and a thank-you page.
4. **Redesign the homepage photo-editing-first** using the wireframe in §10.4, with web dev and polo design moved to an "Also from Harinda" band.
5. **Switch to "The Grading Suite" design system** (Report 4): neutral light theme, Fraunces + Instrument Sans, safelight-orange CTA, no animated background.
