# Brand Kit — Harinda (iamharinda.com)

| | |
|---|---|
| **Brand name** | Harinda (wordmark `harinda.`) · legal/schema name **Harinda Fernando Photo Editing** · handle **@iamharinda** |
| **Website** | https://www.iamharinda.com/ |
| **Sister property** | https://premiumphotoedits.com/ (free photo tools → funnels to iamharinda.com) |
| **Date** | 2 October 2026 |
| **Version** | 1.0 |
| **Author role** | Senior Brand Identity Designer & Brand Strategist |
| **Aligned with** | `01-ui-ux-redesign-report.md` (design system), `02-website-redevelopment-plan.md` (tokens and build), `03-seo-audit-and-growth-report.md` (naming, spelling, schema) |

**Brief as interpreted.** The brief's context fields were left as templates, so this kit uses the details you gave in the audit request.
- **Business:** photo editing first; web development and polo/golf shirt design as secondary lines.
- **Audience:** busy wedding and portrait photographers in the US, UK, Europe and Australia, plus Fiverr buyers.
- **Personality:** professional, trustworthy, premium but approachable.
- **Avoid:** a generic blue tech look and a cartoonish style.
- **Keep:** the owner's real name and face, and the domain and handle.
- **Used on:** website, social media, Fiverr gig images, email, invoices, and the site's PWA icons. The Android apps live under the separate **Orbitra** brand, which already has its own kit in `docs/Habit-Tracker-Orbitra-Kit/`, so this kit does not restyle them.
- **premiumphotoedits.com** couldn't be fetched (its robots.txt refuses the audit fetcher), so its current design is **not** assessed here.

## Table of Contents
1. [Brand Audit (Current State)](#1-brand-audit-current-state)
2. [Brand Strategy](#2-brand-strategy)
3. [Brand Name & Tagline](#3-brand-name--tagline)
4. [Logo Concept](#4-logo-concept)
5. [Colour System](#5-colour-system)
6. [Typography](#6-typography)
7. [Visual Language](#7-visual-language)
8. [Brand Voice & Messaging](#8-brand-voice--messaging)
9. [UI Design Tokens (Developer Ready)](#9-ui-design-tokens-developer-ready)
10. [Brand Applications](#10-brand-applications)
11. [Asset Checklist](#11-asset-checklist)
12. [Implementation Plan](#12-implementation-plan)

---

## 1. Brand Audit (Current State)

### 1.1 What the current branding communicates vs. what it should

| | Currently communicates | Should communicate |
|---|---|---|
| Category | "Creative front-end developer" (the reactbits.dev aesthetic is credited in `global.css`) | "Professional photo editor photographers can trust with a client's wedding" |
| Colour | Purple/pink on near-black (`#0a0910`, `#a855f7`, `#f472b6`) with a moving WebGL aurora | Neutral and accurate: the brand *is* colour accuracy, so the UI must not tint the photos |
| Positioning | "One person. Photo editing, web builds, and fashion designing." (a generalist) | A specialist in hand-edited wedding and portrait galleries, with web and polo design as side services |
| Proof | A portrait and payment logos; no work, no reviews rendered | Before/after work, a 4.9★ record, a calibrated setup, a real person |
| Wordmark | `iam` + `harinda` in Fraunces with a violet→pink gradient on "harinda" | A confident, simple wordmark that works in one colour on a Fiverr thumbnail |

### 1.2 Strengths
- **A real name and face.** The portrait (OG image and hero avatar) is professional and builds trust immediately.
- **Fraunces** is a distinctive, editorial display face that suits weddings. It's worth keeping.
- **Clear offers:** free sample, pay after approval, unlimited revisions.
- **An honest, plain-English voice** in the copy ("Skin stays skin, whites stay white"). That line is genuinely good.

### 1.3 Weaknesses & inconsistencies
- **Three names for one service** (Pattern designing, Fashion Designing, Polo shirt design & patterns) and **two package ladders** for photo editing.
- **Misnamed tokens:** `--c-teal` is periwinkle and `--c-amber` is pink. The brand drifted and the system didn't follow.
- **OG images:** one image shared by three different services; the web-dev share card says "Colour correction and retouching".
- **The purple, animated backdrop contradicts the "neutral grey grading suite" story** told on `/about/`.
- **A personal handle as the brand** (`iamharinda`). It works on Fiverr, but reads as a social username on invoices and in Google results.

### 1.4 Competitor comparison & the gap

| | Visual identity | Feels like |
|---|---|---|
| **FixThePhoto** | White/blue corporate, stock-heavy, many badges | A factory: big, impersonal |
| **Signature Edits** | Bold, playful, lifestyle photography, "kickass" tone | A creator brand selling presets |
| **Fiverr gigs** | Busy thumbnails, red arrows, "BEFORE/AFTER" in giant type, Fiverr green | Marketplace noise |
| **iamharinda (now)** | Purple tech gradient | A developer portfolio |

**The gap is "the calm professional's editor".** No one in this set owns a *neutral, grading-suite* look: warm grey, paper white, photography framed like prints, with a single safelight-orange accent and the teal-and-orange grade as a signature. It's distinctive (not blue, not marketplace green, not purple tech), and it's the only look that *proves* colour accuracy rather than claiming it.

---

## 2. Brand Strategy

### 2.1 Brand purpose
**To give working photographers their evenings back, without giving up their style.** Every gallery is edited by a person who cares about the moment as much as the photographer does.

### 2.2 Positioning statement
> **For** busy wedding and portrait photographers in the US, UK, Europe and Australia **who** need galleries edited fast without losing their signature look, **Harinda** is **the hand-editing photo editor** that **matches your style on a calibrated screen, sends three free sample edits first, and lets you pay only after you approve**, **unlike** editing factories that route your gallery through a rotating team, or AI tools that apply a generic look.

### 2.3 Personas

**1. "Busy-Season Brooke," US wedding photographer (primary)**
- 32, Ohio, shoots 25–35 weddings a year and delivers 600–900 images per wedding.
- Pain: an October backlog, editing until 1 a.m., couples asking "when are the photos coming?"
- Needs: style matching (her Lightroom preset), predictable turnaround, Lightroom catalog workflow, US-morning replies.
- Decides by: before/afters in *her* style, reviews from other wedding photographers, a free sample.
- Channels: Google ("outsource wedding photo editing"), Facebook photographer groups, Instagram.

**2. "Scaling-Studio Sam," UK/EU studio owner**
- 41, Manchester, runs a 3-shooter studio (weddings and events).
- Pain: inconsistent freelance editors, a second shooter's gallery that doesn't match the lead's.
- Needs: one consistent overflow editor, invoices, reliability, GDPR-aware file handling.
- Decides by: consistency across a full gallery, a professional terms page, a clean invoice/PayPal flow.

**3. "Fiverr First-Timer Fiona," portrait or event photographer, small business**
- 27, Toronto, portrait and family sessions, plus some product shots for her own Etsy shop.
- Pain: is cheap editing any good? Is it safe?
- Needs: buyer protection, low entry price, a quick turnaround.
- Decides by: the Fiverr rating, a clear package table, the person behind the gig looking real and accountable.

### 2.4 Unique value proposition
**"Your style, hand-edited, three photos free, and you pay after you approve."** One named editor, a calibrated screen, no AI looks, from $0.20 a photo.

### 2.5 Brand personality

| Trait | We are… | We are not… |
|---|---|---|
| **Precise** | Exact about colour, numbers and deadlines ("2-day delivery for 50 images") | Pedantic, or lost in technical jargon |
| **Calm** | Quiet, confident, unhurried visuals; plain sentences | Flashy, hype-driven, "🔥 BEST EDITS 🔥" |
| **Personal** | "I" and a real face; the person you message does the work | Faceless "our team of experts" |
| **Honest** | Clear about limits ("blurry photos can't be fully rescued") and prices | Over-promising "fix anything" |
| **Craft-proud** | Showing the work, the setup and the before/after | Arrogant, or dismissive of photographers who edit their own work |

---

## 3. Brand Name & Tagline

### 3.1 Name evaluation: "iamharinda"

| Criterion | Assessment |
|---|---|
| Memorability | Medium. Unique, but "I am Harinda" is awkward to say aloud and easy to mistype (iamharinda / iam-harinda / harinda). |
| Clarity | Low. No category cue; reads like a social handle. |
| Domain fit | ✅ Owned, matches the Fiverr username, and has an established 90-post site and GSC history. |
| SEO fit | Neutral. Brand queries are small; service keywords should carry the titles (Report 3). |
| Trust | Using a real personal name is a **strength** for a one-person service; the "iam" prefix is the weakness. |

**Recommendation: keep the domain and handle, and change how the brand is *displayed*.**
- **Wordmark:** `harinda.` (lowercase, Fraunces 600, safelight-orange full stop).
- **Descriptor lockup:** `harinda.` + `PHOTO EDITING` (or `WEB DEVELOPMENT` / `POLO DESIGN` on those pages).
- **Schema / legal / invoices:** *Harinda Fernando Photo Editing*.
- **Handle everywhere:** @iamharinda (Fiverr, Instagram, Pinterest, Behance).
- **Don't** create a new photo-editing brand on premiumphotoedits.com. Two brands competing for the same buyer and the same keywords split trust and authority (Report 3 §9). Treat premiumphotoedits.com as a *free-tools* property "by Harinda".

### 3.2 Tagline options

| # | Tagline | Rationale |
|---|---|---|
| 1 | **Your style. Hand-edited. On deadline.** ⭐ *Top pick* | Hits all three buying criteria for Persona 1 (style match, human, speed) in the order she worries about them. Short enough for a Fiverr thumbnail and an email signature. |
| 2 | Skin stays skin. Whites stay white. | Lifted from your own best copy line; memorable and specific to colour accuracy. Good for portrait and headshot campaigns. Less useful as the main line because it doesn't mention speed. |
| 3 | Edit less. Shoot more. | Benefit-first and punchy; great for ads and social. Less distinctive (similar lines exist in the market). |
| 4 | The editor behind your best galleries. | Positions you as a trusted partner, good for the studio persona. A little long and abstract. |
| 5 | Real colour, by a real person. | Directly contrasts with AI editing; strong for the "AI vs human" content cluster. It doesn't convey turnaround. |

---

## 4. Logo Concept

### 4.1 Three concepts

**Concept A: "Split Frame" (recommended)**
- **Idea:** a rounded square split vertically, like the before/after slider every photographer knows. Left is neutral 18%-style grey (*before*), right is safelight orange (*after*), with a white divider and a round slider handle. A small teal corner wedge completes the teal-and-orange grade signature.
- **Symbolism:** transformation, comparison, colour grading; the handle invites interaction ("drag to see").
- **Style:** icon + wordmark (`harinda.`).
- **Why it fits:** instantly readable to photographers, and it doubles as the UI pattern (the before/after component) and the Fiverr thumbnail device. One idea is used everywhere.

**Concept B: "Eyedropper h"**
- **Idea:** a lowercase Fraunces "h" whose ascender ends in an eyedropper tip, the white-balance picker in Lightroom.
- **Symbolism:** precise colour sampling and white balance; a personal monogram.
- **Style:** lettermark + wordmark.
- **Why it fits:** clever and ownable, but needs explaining to non-Lightroom users (web-dev and polo clients), and loses detail below 24 px.

**Concept C: "Grey Card" wordmark**
- **Idea:** `harinda` set in Fraunces on a small grey-card tab with three swatches (teal, grey, orange) as the dot of the "i".
- **Symbolism:** the colour checker and grey card used to calibrate colour.
- **Style:** wordmark only.
- **Why it fits:** elegant and type-led, premium. Weak as a favicon or app icon because it has no standalone symbol.

### 4.2 Recommended concept (A): specification

| Version | Description | Use |
|---|---|---|
| **Primary (horizontal)** | Icon (64 u) + 18 u gap + `harinda.` wordmark (cap height ≈ 0.5 × icon) | Website header, invoices, email signature |
| **Stacked** | Icon centred above the wordmark; wordmark width = 1.6 × icon width | Social profile covers, splash, square formats |
| **Descriptor lockup** | Horizontal + `PHOTO EDITING` in Instrument Sans 600, 0.12em tracking, muted grey, aligned under the wordmark | Fiverr, OG images, business documents |
| **Icon only** | Split Frame with handle | Social avatars, PWA icon, watermark |
| **Favicon (≤ 32 px)** | Split Frame **without the handle and the teal wedge**: grey/orange halves + white line | Browser tab (the handle turns to mush at 16 px) |
| **Monochrome** | Left half `#141416` at 35% tint, right half `#141416`, divider white | Fax-style documents, embossing, single-colour print |
| **Reversed (on dark)** | Same icon (it carries its own background); wordmark in `#F2F1EE`, full stop `#F0875A` | Dark social banners, dark-mode UI |

**Clear space:** on every side, equal to the diameter of the slider handle × 2 (= 14 u at 64 u icon size, ≈ 22% of icon height).
**Minimum size:** horizontal lockup 120 px / 30 mm wide; icon 24 px (with handle), 16 px (favicon version).

**Misuse (Don'ts)**
- ❌ Don't swap the halves (orange "before" reads as "the edit made it worse").
- ❌ Don't recolour the halves in purple, blue or gradients.
- ❌ Don't add drop shadows, glows, bevels or the old violet→pink gradient to the wordmark.
- ❌ Don't stretch, skew or rotate the icon; the divider must stay vertical.
- ❌ Don't place the full-colour icon on a busy photo without a white or ink plate.
- ❌ Don't set the wordmark in any font other than the outlined Fraunces artwork.
- ❌ Don't write "iamharinda" as the logotype (use the handle only in URLs and social names).

### 4.3 SVG code

**Icon (Split Frame).** Pure shapes, so no font dependency. Saved as `brand-assets/logo-icon.svg`.
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-labelledby="t">
  <title id="t">Harinda — split-frame mark</title>
  <defs><clipPath id="r"><rect width="64" height="64" rx="14"/></clipPath></defs>
  <g clip-path="url(#r)">
    <rect width="64" height="64" fill="#8A8984"/>          <!-- before: neutral grey -->
    <path d="M30 0H64V64H30Z" fill="#B5451B"/>             <!-- after: safelight -->
    <path d="M44 64L64 44V64Z" fill="#0E5A61"/>            <!-- grade teal wedge -->
    <rect x="29" y="0" width="2.5" height="64" fill="#FFFFFF"/>
    <circle cx="30.25" cy="32" r="7" fill="#FFFFFF"/>      <!-- slider handle -->
    <path d="M27.6 32l2-2.4v4.8zM32.9 32l-2 2.4v-4.8z" fill="#141416"/>
  </g>
</svg>
```

**Favicon (simplified, for 16–32 px)**
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs><clipPath id="r"><rect width="32" height="32" rx="7"/></clipPath></defs>
  <g clip-path="url(#r)">
    <rect width="32" height="32" fill="#8A8984"/>
    <path d="M15 0H32V32H15Z" fill="#B5451B"/>
    <rect x="14" y="0" width="2" height="32" fill="#FFFFFF"/>
  </g>
</svg>
```

**Horizontal lockup.** The production file `brand-assets/logo-lockup.svg` has the wordmark **outlined to paths from the site's own Fraunces 600 font file** (no font needed). The editable version below uses live text; convert it to paths in Inkscape (*Path → Object to Path*) before exporting.
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 342 64" role="img" aria-labelledby="t">
  <title id="t">Harinda</title>
  <defs><clipPath id="r"><rect width="64" height="64" rx="14"/></clipPath></defs>
  <g clip-path="url(#r)">
    <rect width="64" height="64" fill="#8A8984"/><path d="M30 0H64V64H30Z" fill="#B5451B"/>
    <path d="M44 64L64 44V64Z" fill="#0E5A61"/><rect x="29" width="2.5" height="64" fill="#FFF"/>
    <circle cx="30.25" cy="32" r="7" fill="#FFF"/><path d="M27.6 32l2-2.4v4.8zM32.9 32l-2 2.4v-4.8z" fill="#141416"/>
  </g>
  <text x="82" y="47" font-family="Fraunces, Georgia, serif" font-weight="600" font-size="64"
        letter-spacing="-1" fill="#141416">harinda</text>
  <circle cx="334" cy="43" r="5" fill="#B5451B"/>
</svg>
```

---

## 5. Colour System

### 5.1 Core palette

| Role | Name | HEX | RGB | HSL | Psychology / rationale |
|---|---|---|---|---|---|
| **Primary (text/brand)** | Ink | `#141416` | rgb(20 20 22) | hsl(240 5% 8%) | Near-black with a hint of cool, like a print's deepest shadow. Authority without harshness. |
| **Accent (CTA)** | Safelight | `#B5451B` | rgb(181 69 27) | hsl(16 74% 41%) | The amber-red darkroom safelight, and the "orange" half of the teal-and-orange grade. Warm, human, urgent without being alarm-red. Absent from every listed competitor (blue, green, purple). |
| Accent hover | Safelight Deep | `#963814` | rgb(150 56 20) | hsl(17 76% 33%) | Pressed and hover state |
| **Secondary** | Grade Teal | `#0E5A61` | rgb(14 90 97) | hsl(185 75% 22%) | The "teal" half of the classic cinematic grade. Calm, trustworthy, technical. Used for focus rings, badges and info, so it is *not* used for CTAs. |
| **Neutral: background** | Paper | `#F6F5F2` | rgb(246 245 242) | hsl(45 18% 96%) | A warm print-paper white. Easier on the eye than pure white, and photos look "matted". |
| Neutral: surface | White | `#FFFFFF` | rgb(255 255 255) | hsl(0 0% 100%) | Cards, photo mats |
| Neutral: mid | Grey Card | `#8A8984` | rgb(138 137 132) | hsl(50 2% 53%) | A nod to the 18% grey card (logo "before" half and decorative use only; 3.48:1 on white, **not for text**) |
| Neutral: secondary text | Graphite | `#3D3D44` | rgb(61 61 68) | hsl(240 5% 25%) | Body copy on paper |
| Neutral: muted text | Muted | `#5E5E66` | rgb(94 94 102) | hsl(240 4% 38%) | Captions, metadata |
| Neutral: line | Line | `#DEDCD5` | rgb(222 220 213) | hsl(47 12% 85%) | Dividers (decorative) |
| Neutral: input border | Border | `#85837C` | rgb(133 131 124) | hsl(47 3% 50%) | Form-control borders (3.79:1 on white, meets WCAG 1.4.11) |
| Tints | Safelight Tint / Teal Tint | `#FBEDE6` / `#E3F1F1` | rgb(251 237 230) / rgb(227 241 241) | hsl(20 72% 94%) / hsl(180 33% 92%) | Callout backgrounds, badges |

### 5.2 Semantic colours

| Role | HEX | RGB | Notes |
|---|---|---|---|
| Success | `#1D7144` | rgb(29 113 68) | "Sent", "Approved" |
| Warning | `#8A5300` | rgb(138 83 0) | "Rush fee applies" |
| Error | `#B42318` | rgb(180 35 24) | Form errors (always paired with an icon and text). Deliberately redder than Safelight so the two are not confused. |
| Info | `#0E5A61` | rgb(14 90 97) | Grade Teal doubles as info |

### 5.3 Dark mode palette

| Role | HEX | RGB | HSL |
|---|---|---|---|
| Background | `#121214` | rgb(18 18 20) | hsl(240 5% 7%) |
| Surface | `#1C1C20` | rgb(28 28 32) | hsl(240 7% 12%) |
| Line | `#2E2E34` | rgb(46 46 52) | hsl(240 6% 19%) |
| Text | `#F2F1EE` | rgb(242 241 238) | hsl(45 13% 94%) |
| Muted text | `#A6A5A0` | rgb(166 165 160) | hsl(50 3% 64%) |
| Accent | `#F0875A` | rgb(240 135 90) | hsl(18 83% 65%) (buttons use **ink text** on this) |
| Teal | `#5EC4C8` | rgb(94 196 200) | hsl(182 49% 58%) |

> **Light mode is the default** for the website. A neutral light surround is the editing-industry norm for judging prints, and the brand promise is colour accuracy. Dark mode follows `prefers-color-scheme` and keeps the photos the hero.

### 5.4 WCAG contrast check (computed with the WCAG 2.x relative-luminance formula)

| Foreground | Background | Ratio | AA normal (4.5) | AAA normal (7) | AA large / UI (3) |
|---|---|---|---|---|---|
| Ink `#141416` | Paper `#F6F5F2` | **16.88:1** | ✅ | ✅ | ✅ |
| Graphite `#3D3D44` | Paper | **9.88:1** | ✅ | ✅ | ✅ |
| Muted `#5E5E66` | Paper | **5.89:1** | ✅ | ❌ | ✅ |
| Muted `#5E5E66` | White | **6.42:1** | ✅ | ❌ | ✅ |
| White | Safelight `#B5451B` (primary button) | **5.48:1** | ✅ | ❌ | ✅ |
| White | Safelight Deep `#963814` (hover) | **7.31:1** | ✅ | ✅ | ✅ |
| Safelight | Paper (links) | **5.03:1** | ✅ | ❌ | ✅ |
| Safelight | White | **5.48:1** | ✅ | ❌ | ✅ |
| Grade Teal `#0E5A61` | Paper | **7.26:1** | ✅ | ✅ | ✅ |
| White | Grade Teal | **7.91:1** | ✅ | ✅ | ✅ |
| Teal | Teal Tint `#E3F1F1` | **6.83:1** | ✅ | ❌ | ✅ |
| Safelight Deep | Safelight Tint `#FBEDE6` | **6.39:1** | ✅ | ❌ | ✅ |
| Success / Warning / Error | White | **6.00 / 6.33 / 6.57:1** | ✅ | ❌ | ✅ |
| Border `#85837C` | White (input outline) | **3.79:1** | n/a | n/a | ✅ (1.4.11) |
| Ink | Safelight (avoid) | 3.36:1 | ❌ | ❌ | ✅ large only |
| Line `#DEDCD5` | Paper | 1.26:1 | decorative only, never for text or control borders | | |
| **Dark:** Text `#F2F1EE` | `#121214` | **16.57:1** | ✅ | ✅ | ✅ |
| **Dark:** Muted `#A6A5A0` | `#121214` / `#1C1C20` | **7.58 / 6.88:1** | ✅ | ✅ / ❌ | ✅ |
| **Dark:** Accent `#F0875A` | `#121214` | **7.41:1** | ✅ | ✅ | ✅ |
| **Dark:** Ink on accent (button) | `#F0875A` | **7.29:1** | ✅ | ✅ | ✅ |
| **Dark:** Teal `#5EC4C8` | `#121214` | **9.09:1** | ✅ | ✅ | ✅ |

For comparison, the current site's `--text-faint #9d9daa` measures 7.40:1 on its base background, but an *estimated* ~3.6:1 over the purple peaks of the animated aurora. The new system has no moving backgrounds behind text.

### 5.5 Usage ratio: **70 / 20 / 7 / 3**
- **70%** neutrals (Paper and White surfaces, Ink text)
- **20%** photography (the real colour on the page should come from the work)
- **7%** Grade Teal (badges, focus, small highlights)
- **3%** Safelight (primary CTA and the logo full stop only; scarcity keeps it clickable)

---

## 6. Typography

### 6.1 Pairing (all free, SIL Open Font License, Google Fonts)

| Role | Font | Weights | Why |
|---|---|---|---|
| **Display / headings** | **Fraunces** (optical-size axis) | 500, 600 | Already in use, so continuity costs nothing. Soft, "wonky" editorial serif that feels like wedding stationery and fine-art print, warm and premium; very different from the sans-serif tech look of FixThePhoto and Fiverr. |
| **Body / UI** | **Instrument Sans** | 400, 600 | Replaces IBM Plex Sans. A contemporary grotesque that's neutral but not generic (unlike Inter or Roboto), highly legible at 15–17 px, and its slightly condensed width suits tables and price cards. |
| **Metadata (optional)** | **JetBrains Mono** | 500 | Camera-style labels on before/afters (`ISO 3200 · 1/200 · 5600K`) signal technical credibility. Use sparingly (labels only). |

### 6.2 Type scale

| Style | Font | Desktop size / weight / line-height | Mobile size / weight / line-height |
|---|---|---|---|
| Display | Fraunces | 56 px / 500 / 1.05 | 38 px / 500 / 1.08 |
| H1 | Fraunces | 44 px / 500 / 1.10 | 32 px / 500 / 1.12 |
| H2 | Fraunces | 34 px / 500 / 1.15 | 27 px / 500 / 1.18 |
| H3 | Instrument Sans | 24 px / 600 / 1.25 | 21 px / 600 / 1.28 |
| H4 | Instrument Sans | 20 px / 600 / 1.30 | 18 px / 600 / 1.30 |
| H5 | Instrument Sans | 17 px / 600 / 1.40 | 17 px / 600 / 1.40 |
| H6 / Eyebrow | Instrument Sans, uppercase, +0.08em | 13 px / 600 / 1.30 | 13 px / 600 / 1.30 |
| Body large | Instrument Sans | 20 px / 400 / 1.55 | 18 px / 400 / 1.55 |
| Body | Instrument Sans | 17 px / 400 / 1.60 | 17 px / 400 / 1.60 |
| Small | Instrument Sans | 15 px / 400 / 1.50 | 15 px / 400 / 1.50 |
| Caption / metadata | JetBrains Mono (or Instrument Sans 600) | 13 px / 500 / 1.40 | 13 px / 500 / 1.40 |

Measure: 60–72 characters for body copy. Never set body text below 15 px.

### 6.3 Embed code

**Quick (Google Fonts CDN):**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Sans:wght@400;600&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

**Recommended for the site (self-hosted, matches the existing `fetch-fonts.mjs` pattern; faster, no third-party request, GDPR-clean):**
```bash
npm i @fontsource-variable/fraunces @fontsource/instrument-sans @fontsource/jetbrains-mono
```
```js
// src/layouts/BaseLayout.astro (frontmatter)
import "@fontsource-variable/fraunces/opsz.css";          // variable opsz + wght
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/jetbrains-mono/500.css";
```
Preload only the Fraunces file used in the H1 and the Instrument Sans 400 file.

---

## 7. Visual Language

### 7.1 Iconography
- **Style:** line icons, **1.75 px stroke** at 24 px, round caps and joins, 2 px corner radius, no fills (except active states).
- **Library:** **Lucide** (ISC licence, free, tree-shakable `lucide-static` SVGs).
- **Core set:** `aperture` (photo editing), `sliders-horizontal` (adjustments), `layers` (batch), `scissors` (culling), `timer` (turnaround), `shield-check` (guarantee), `repeat` (revisions), `upload-cloud` (send files), `message-circle` (WhatsApp), `code-2` (web dev), `shirt` (polo design).
- Colour: Ink by default; Teal for informational emphasis; never Safelight (reserved for CTAs).

### 7.2 Photography & image guidelines

**The work (before/after)**
- Use **real client work only**, with written permission. Credit the photographer in the caption if they want it.
- **Pairs must be the same frame, same crop, same size.** Show the *honest* RAW (flat, cast and all) vs the final edit.
- Cover the hard cases buyers worry about: mixed venue light, backlit golden hour, dark reception, skin tones across ethnicities, white dresses, night portraits.
- **Presentation:** a 4 px white mat (print feel) on a Paper background; slider handle in white; caption bar in Ink 70% with a JetBrains Mono label: `Reception · mixed tungsten/LED · fixed in LR Classic`.
- **Aspect ratios:** 3:2 (landscape gallery), 4:5 (portrait/social), 16:10 (hero).
- Export: AVIF/WebP via Astro, long edge 1600 px for the hero and 1200 px for grid, sRGB, no watermark on-site (watermark only on social/Fiverr if needed: icon at 40% opacity, bottom-right, 6% of width).

**People & brand photos**
- Harinda at the desk with the calibrated monitor, natural window light, neutral grey wall (this matches the "grading suite" story). Already partially exists (`about-harinda.webp`).
- Warm, natural colour, no heavy filters; eye-level, relaxed, real workspace.
- **Avoid:** stock "team in an office" photos, AI-generated people, laptop-on-a-beach clichés.

### 7.3 Illustration
None by default; the photos are the illustration. The only graphic device is the **split-frame divider** (a 2 px vertical white or ink line with a round handle), used to separate before/after, mark section transitions on social templates, and as a bullet motif in decks.

### 7.4 Shapes, radius, shadows, gradients

| Element | Spec |
|---|---|
| Radius | 6 px (inputs, chips) · 10 px (buttons) · 16 px (cards, images) · 999 px (pills, slider handle) |
| Shadows | `0 1px 2px rgb(20 20 22/.06), 0 1px 1px rgb(20 20 22/.04)` (rest) · `0 8px 24px -8px rgb(20 20 22/.14)` (hover/raised) |
| Borders | 1 px Line `#DEDCD5` on cards; 1.5 px Border `#85837C` on inputs |
| Gradients | **None in UI.** One permitted brand gradient for social backgrounds only: `linear-gradient(100deg, #0E5A61 0%, #141416 55%, #B5451B 100%)` ("teal-and-orange grade"); never behind body text |
| Patterns | Optional subtle 8 px dot grid at 4% Ink on Paper for social templates (evokes a cutting mat or contact sheet) |
| Motion | 180 ms `cubic-bezier(.2,.7,.2,1)`; fades and slider only; no parallax, no WebGL; respect `prefers-reduced-motion` |

---

## 8. Brand Voice & Messaging

### 8.1 Tone of voice
**Like a calm, skilled colleague who answers your message at 7 a.m. your time with exactly the info you need.**

| Do | Don't |
|---|---|
| "Send three photos. I'll edit them free so you can see the style match." | "Unlock premium AI-free next-level editing solutions!" |
| "50 photos, 2 days, $10." | "Lightning-fast turnaround at unbeatable prices!!!" |
| "Very blurry or badly underexposed shots can't be fully rescued, but RAW gives me the most room." | "We can fix ANY photo!" |
| "I" / "you" (one person, one client) | "Our team of world-class experts" |
| US spelling in headlines and UI: *color, catalog* | Mixing *colour* and *color* on one page |
| Specific proof: "4.9★ from 183 Fiverr reviews" | Vague proof: "Loved by thousands" |

### 8.2 Writing samples

**Homepage hero**
> **H1:** Hand-edited wedding & portrait galleries, back on your deadline.
> **Sub:** I match your Lightroom style on a calibrated screen, with no AI and no batch presets. Three free sample edits first, and you pay only after you approve.

**CTA button set**
| Context | Primary | Secondary | Tertiary |
|---|---|---|---|
| Photo editing | **Get 3 photos edited free** | WhatsApp me | Order on Fiverr |
| Returning client | **Send a new gallery** | See turnaround | — |
| Web development | **Get a fixed-price quote** | See recent sites | — |
| Polo design | **Start your design brief** | See mockups | — |
| Blog post | **Try a free sample edit** | Read the editing guide | — |

**About-us intro**
> I'm Harinda Fernando. I spent years behind the camera before I moved to the other side of the workflow, and now I edit full time. Every gallery I take on is edited by me, on a factory-calibrated ASUS ProArt screen in a neutral grey room, in Lightroom Classic and Photoshop. No AI looks, no outsourcing to a team. You message me, I edit your photos, and I don't hand them back until they look like *you* edited them.

**Social post (Instagram / Facebook groups)**
> Reception lighting: tungsten from the chandeliers, cold LED from the DJ, and a white dress caught in between. 🎛️
> Swipe for the RAW → the edit. White balance set by eye, skin warmed back to real, dress kept white, all in Lightroom Classic.
> Drowning in October galleries? Send me 3 photos and I'll edit them free in your style. Link in bio.
> #weddingphotographer #lightroomedit #weddingediting #outsourceediting

### 8.3 Vocabulary

| Use | Avoid |
|---|---|
| hand-edited, by eye, calibrated, true-to-life | AI-powered, automagic, one-click |
| your style, your preset, match | our signature look (for client work) |
| gallery, catalog, RAW, culling, turnaround | assets, deliverables (too corporate) |
| free sample, pay after you approve, unlimited revisions | risk-free!!!, guaranteed perfection |
| color, catalog (US) | colour, catalogue in headlines |
| photographer, studio, couple | customer #, client base |
| "I", "you" | "we" (unless it really is plural) |
| simple, clear, natural, clean | stunning, breathtaking, magical (over-used in wedding marketing) |

---

## 9. UI Design Tokens (Developer Ready)

### 9.1 CSS custom properties
```css
/* src/styles/tokens.css */
:root {
  color-scheme: light;

  /* Colour: core */
  --color-ink: #141416;
  --color-graphite: #3D3D44;
  --color-muted: #5E5E66;
  --color-paper: #F6F5F2;
  --color-surface: #FFFFFF;
  --color-grey-card: #8A8984;      /* decorative only */
  --color-line: #DEDCD5;           /* decorative only */
  --color-border: #85837C;         /* inputs, 3:1+ */

  --color-accent: #B5451B;         /* Safelight */
  --color-accent-hover: #963814;
  --color-accent-tint: #FBEDE6;
  --color-on-accent: #FFFFFF;

  --color-teal: #0E5A61;           /* Grade Teal */
  --color-teal-tint: #E3F1F1;

  --color-success: #1D7144;
  --color-warning: #8A5300;
  --color-error: #B42318;
  --color-info: var(--color-teal);
  --color-focus: var(--color-teal);

  /* Semantic aliases */
  --bg: var(--color-paper);
  --bg-raised: var(--color-surface);
  --text: var(--color-ink);
  --text-2: var(--color-graphite);
  --text-3: var(--color-muted);
  --link: var(--color-accent);

  /* Typography */
  --font-display: "Fraunces Variable", "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;

  --text-display: clamp(2.375rem, 1.6rem + 3.2vw, 3.5rem);  /* 38 → 56 */
  --text-h1: clamp(2rem, 1.5rem + 2.2vw, 2.75rem);          /* 32 → 44 */
  --text-h2: clamp(1.6875rem, 1.4rem + 1.2vw, 2.125rem);    /* 27 → 34 */
  --text-h3: clamp(1.3125rem, 1.2rem + .5vw, 1.5rem);       /* 21 → 24 */
  --text-h4: clamp(1.125rem, 1.08rem + .2vw, 1.25rem);      /* 18 → 20 */
  --text-lg: clamp(1.125rem, 1.08rem + .2vw, 1.25rem);      /* 18 → 20 */
  --text-base: 1.0625rem;                                   /* 17 */
  --text-sm: .9375rem;                                      /* 15 */
  --text-xs: .8125rem;                                      /* 13 */

  /* Spacing (4px base) */
  --space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
  --space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 4rem; --space-9: 6rem;
  --container: 75rem; --measure: 68ch; --gutter: clamp(1rem, 4vw, 2rem);

  /* Radius */
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 16px; --radius-pill: 999px;

  /* Shadows */
  --shadow-1: 0 1px 2px rgb(20 20 22 / .06), 0 1px 1px rgb(20 20 22 / .04);
  --shadow-2: 0 8px 24px -8px rgb(20 20 22 / .14);

  /* Motion */
  --ease: cubic-bezier(.2, .7, .2, 1);
  --dur: 180ms;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
    --bg: #121214;
    --bg-raised: #1C1C20;
    --color-line: #2E2E34;
    --color-border: #76757E;          /* 3.73:1 on #1C1C20 */
    --text: #F2F1EE;
    --text-2: #D4D3CE;
    --text-3: #A6A5A0;
    --color-accent: #F0875A;
    --color-accent-hover: #F4A07B;
    --color-accent-tint: #3A2219;
    --color-on-accent: #141416;       /* ink text on light accent: 7.29:1 */
    --color-teal: #5EC4C8;
    --color-teal-tint: #12302F;
    --link: #F0875A;
    --shadow-1: 0 1px 2px rgb(0 0 0 / .4);
    --shadow-2: 0 10px 28px -10px rgb(0 0 0 / .6);
  }
}

@media (prefers-reduced-motion: reduce) {
  :root { --dur: 0ms; }
}
```

### 9.2 Tailwind CSS (`theme.extend`)
```js
// tailwind.config.js (Tailwind v3), or map the same values into @theme in v4
export default {
  theme: {
    extend: {
      colors: {
        ink: "#141416", graphite: "#3D3D44", muted: "#5E5E66",
        paper: "#F6F5F2", line: "#DEDCD5", border: "#85837C", greycard: "#8A8984",
        accent: { DEFAULT: "#B5451B", hover: "#963814", tint: "#FBEDE6", dark: "#F0875A" },
        teal: { DEFAULT: "#0E5A61", tint: "#E3F1F1", dark: "#5EC4C8" },
        success: "#1D7144", warning: "#8A5300", error: "#B42318",
        night: { bg: "#121214", surface: "#1C1C20", line: "#2E2E34", text: "#F2F1EE", muted: "#A6A5A0" },
      },
      fontFamily: {
        display: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
        sans: ['"Instrument Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(2.375rem, 1.6rem + 3.2vw, 3.5rem)", { lineHeight: "1.05", fontWeight: "500" }],
        h1: ["clamp(2rem, 1.5rem + 2.2vw, 2.75rem)", { lineHeight: "1.1", fontWeight: "500" }],
        h2: ["clamp(1.6875rem, 1.4rem + 1.2vw, 2.125rem)", { lineHeight: "1.15", fontWeight: "500" }],
        h3: ["clamp(1.3125rem, 1.2rem + .5vw, 1.5rem)", { lineHeight: "1.25", fontWeight: "600" }],
        base: ["1.0625rem", { lineHeight: "1.6" }],
        sm: ["0.9375rem", { lineHeight: "1.5" }],
        xs: ["0.8125rem", { lineHeight: "1.4" }],
      },
      borderRadius: { sm: "6px", md: "10px", lg: "16px" },
      boxShadow: {
        1: "0 1px 2px rgb(20 20 22 / .06), 0 1px 1px rgb(20 20 22 / .04)",
        2: "0 8px 24px -8px rgb(20 20 22 / .14)",
      },
      maxWidth: { container: "75rem", measure: "68ch" },
      transitionTimingFunction: { brand: "cubic-bezier(.2,.7,.2,1)" },
      transitionDuration: { brand: "180ms" },
    },
  },
};
```

### 9.3 Buttons
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  min-height: 48px; padding: 0 var(--space-5);
  font: 600 var(--text-base)/1 var(--font-body);
  border-radius: var(--radius-md); border: 1.5px solid transparent;
  text-decoration: none; cursor: pointer;
  transition: background-color var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease);
}
.btn:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 2px; }
.btn[disabled], .btn[aria-disabled="true"] {
  background: var(--color-line); color: var(--text-3); border-color: transparent; cursor: not-allowed;
}

/* Primary: Safelight */
.btn--primary { background: var(--color-accent); color: var(--color-on-accent); }
.btn--primary:hover { background: var(--color-accent-hover); }
.btn--primary:active { transform: translateY(1px); }

/* Secondary: outline */
.btn--secondary { background: transparent; color: var(--text); border-color: var(--text); }
.btn--secondary:hover { background: var(--text); color: var(--bg); }

/* Ghost: text link style */
.btn--ghost { background: transparent; color: var(--link); padding-inline: var(--space-2); min-height: 44px; }
.btn--ghost:hover { color: var(--color-accent-hover); text-decoration: underline; text-underline-offset: .2em; }
```

### 9.4 Component specs

**Card**
| Property | Value |
|---|---|
| Background | `--bg-raised` |
| Border | 1 px `--color-line` |
| Radius | `--radius-lg` (16 px) |
| Padding | 24 px (mobile 20 px) |
| Shadow | `--shadow-1`; hover `--shadow-2` (only if the whole card is a link) |
| Image card | 4 px white inner mat, image radius 12 px, caption `--text-xs` mono |

**Input / select / textarea**
| Property | Value |
|---|---|
| Height | 48 px (textarea min 140 px) |
| Border | 1.5 px `--color-border` · radius 10 px · bg `--bg-raised` |
| Label | above, `--text-sm` / 600 / `--text` |
| Hint | below, `--text-sm` / `--text-3`, linked with `aria-describedby` |
| Focus | border `--color-teal` + `0 0 0 3px` ring `--color-teal-tint` |
| Error | border `--color-error` + inline icon + message text (`role="alert"` on submit) |
| Placeholder | `--text-3`; never used as the label |

**Badge**
| Variant | Background | Text | Use |
|---|---|---|---|
| Neutral | `--color-paper` + 1 px line | `--text-2` | "RAW", "Lightroom Classic" |
| Teal | `--color-teal-tint` | `--color-teal` | "No AI", "Calibrated" |
| Accent | `--color-accent-tint` | `--color-accent-hover` | "Most popular" |
| Success | `#E5F2EA` | `--color-success` | "Delivered" |
Spec: height 24 px, padding 0 10 px, radius pill, `--text-xs` / 600 / +0.02em.

---

## 10. Brand Applications

### 10.1 Website
- **Navigation:** Paper background, 72 px tall (64 px mobile), horizontal lockup at 32 px height left, nav in Instrument Sans 600 15 px Graphite, a **Safelight "Get 3 free" button** right. Sticky with a 1 px Line bottom border once scrolled. No gradients.
- **Hero:** two columns (text 5/12, before/after slider 7/12). Eyebrow in mono ("WEDDING & PORTRAIT EDITING · NO AI"), Fraunces H1, Instrument Sans subhead, primary + secondary CTAs, review bar under the CTAs. Paper background; the slider image sits on a white mat with `--shadow-2`.

### 10.2 Social media

| Asset | Size | Design |
|---|---|---|
| Profile picture (all networks) | 800 × 800 (displays as a circle) | Icon only, centred on Paper, icon at 62% of width so the circle crop never clips the handle |
| Instagram post | 1080 × 1350 (4:5) | Before/after split with a vertical white divider + handle; mono caption bar bottom; logo icon top-left at 64 px |
| Instagram carousel | 1080 × 1350 ×N | Slide 1: problem headline in Fraunces on Paper. Slides 2–3: RAW, then the edit. Last: CTA "Send 3 photos free" |
| Instagram story / Reel cover | 1080 × 1920 | Safe zone: top 250 px and bottom 340 px clear |
| Facebook cover | 1640 × 624 (safe centre 1640 × 464) | Teal-to-orange brand gradient left → three before/after thumbnails right; tagline in Fraunces |
| LinkedIn banner | 1584 × 396 | Paper bg, lockup + tagline left; avoid the bottom-left 400 × 200 (avatar overlap) |
| X / Twitter header | 1500 × 500 | Same as LinkedIn, centred |
| Pinterest pin | 1000 × 1500 | Vertical before (top) / after (bottom) with a horizontal divider; title band in Ink; URL `iamharinda.com/work` |
| YouTube banner | 2560 × 1440 (safe 1546 × 423) | Lockup + tagline in the safe area |

### 10.3 Fiverr gig thumbnails
- **Size:** 1280 × 769 px (Fiverr's recommended gig image ratio; *verify current specs in the Fiverr seller dashboard*).
- **Layout:** full-bleed before/after of one strong frame (60% after side), white divider + handle, **one** short label in Instrument Sans 600 on an Ink 80% plate: "Hand-edited · Your style · 24h sample", icon bottom-right at 72 px.
- **Rules:** no red arrows, no "BEST" stickers, max 6 words, no Fiverr-prohibited contact info in images. Make a set of 3 per gig (wedding, portrait, mixed-light fix) so the gallery tells a story.
- Profile photo: the same portrait as the website (consistent face = trust when buyers cross-check).

### 10.4 App icon & splash
- **iamharinda.com PWA** (`site.webmanifest`): icon 192/512 px + maskable 512 px. Icon centred within the 80% safe zone on a `#F6F5F2` background; `theme_color: #F6F5F2`, `background_color: #F6F5F2`.
- **Android apps** are published under **Orbitra**, which has its own brand kit. Don't put the Harinda mark on the Orbitra apps; link to Orbitra from the iamharinda.com footer ("Apps by Orbitra") instead.

### 10.5 Email signature & documents
**Email signature** (600 px max width, images at 2×):
```
Harinda Fernando
Photo Editor · Lightroom & Photoshop
hello@iamharinda.com · WhatsApp +44 7355 229599
iamharinda.com/work · ★ 4.9 on Fiverr
[icon 48×48]  Your style. Hand-edited. On deadline.
```
Fonts: Arial/Helvetica fallback in email (custom fonts are unreliable in mail clients). Name in Ink bold 15 px, rest in Graphite 13 px, link in Safelight.

**Invoice / document header:** A4 / US Letter. Horizontal lockup top-left (40 mm wide), "INVOICE" in Fraunces 28 pt top-right, a 1 pt Line rule below. Business name "Harinda Fernando Photo Editing", email, website, country (Sri Lanka). Table in Instrument Sans 10 pt, totals row on Safelight Tint. Footer: "Paid after approval · Unlimited revisions included" + payment methods.

### 10.6 Favicon set

| File | Size | Source |
|---|---|---|
| `favicon.svg` | vector | Simplified favicon SVG (§4.3) with a `prefers-color-scheme` variant optional |
| `favicon.ico` | 16, 32, 48 (multi-size) | Simplified version |
| `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | 16 / 32 / 48 | Simplified |
| `apple-touch-icon.png` | 180 × 180 | Full icon, Paper background, no transparency |
| `icon-192.png`, `icon-512.png` | 192 / 512 | Full icon |
| `icon-maskable-512.png` | 512 (icon within the 80% safe zone) | Full icon on Paper |

The existing `npm run gen:icons` script already rasterises `public/favicon.svg` into this exact set. Replace the SVG and re-run it.

---

## 11. Asset Checklist

| Asset | Format | Size / Dimensions | Priority |
|---|---|---|---|
| Logo icon (Split Frame) | SVG (+ PNG 512, 1024) | 64 u viewBox | **P1** |
| Horizontal lockup (outlined) | SVG, PNG (transparent) | 342 × 64 u; PNG @ 1200 px wide | **P1** |
| Horizontal lockup, reversed | SVG, PNG | same | P1 |
| Stacked lockup | SVG, PNG | — | P2 |
| Descriptor lockups (Photo Editing / Web Development / Polo Design) | SVG | — | P2 |
| Monochrome icon + lockup | SVG | — | P3 |
| Favicon set | SVG, ICO, PNG | 16, 32, 48, 180, 192, 512, maskable 512 | **P1** |
| OG image: default | JPG | 1200 × 630 (< 300 KB) | **P1** |
| OG images per page (Home, Photo editing, Wedding, Work, Pricing, Web dev, Polo, About, Blog default) | JPG | 1200 × 630 | P1 |
| Blog post OG template | Astro/Satori or Figma | 1200 × 630 | P2 |
| Before/after portfolio pairs | JPG/TIFF master → AVIF/WebP | 1600 px long edge | **P1** |
| Hero before/after | AVIF/WebP | 1600 × 1000 | **P1** |
| Desk / setup photos (3) | JPG master → WebP | 1600 px | P2 |
| Social profile picture | PNG | 800 × 800 | **P1** |
| Instagram post + carousel templates | Figma/Canva | 1080 × 1350 | P2 |
| Story template | Figma/Canva | 1080 × 1920 | P3 |
| Facebook cover | PNG/JPG | 1640 × 624 | P2 |
| LinkedIn banner | PNG/JPG | 1584 × 396 | P2 |
| X header | PNG/JPG | 1500 × 500 | P3 |
| Pinterest pin template | Figma/Canva | 1000 × 1500 | P2 |
| Fiverr gig thumbnails (3 per gig × 3 gigs) | JPG/PNG | 1280 × 769 | **P1** |
| Email signature | HTML + PNG icon | 600 px; icon 96 × 96 @2× | P2 |
| Invoice template | Google Docs/Sheets or PDF | A4 + US Letter | P2 |
| Lead magnet PDF cover ("Wedding Gallery Editing Brief") | PDF | A4/Letter | P3 |
| Brand guidelines one-pager | PDF | A4 | P3 |

---

## 12. Implementation Plan

### 12.1 Roll out on the website without hurting SEO
1. **Keep every URL.** The brand change is visual; URL changes follow only the redirect plan in Report 2 §10.
2. **Swap tokens, not templates first.** Replace `:root` in `global.css` with §9.1 (`tokens.css`), map the old variables to the new ones for one release, then remove the old ones.
3. **Logo and favicon:** replace `public/favicon.svg` with the simplified favicon, run `npm run gen:icons`, and replace the header wordmark in `Header.astro` with the inline SVG lockup (`aria-label="Harinda — home"`).
4. **Update `site.webmanifest`**: `name: "Harinda — Photo Editing"`, `short_name: "Harinda"`, `theme_color` and `background_color: #F6F5F2`. Update `<meta name="theme-color">` in `BaseLayout.astro` (currently `#0a0910`) and `color-scheme` to `light dark`.
5. **OG images:** generate one per page (currently 3 identical files + 1 default). Keep the same filenames where pages exist so cached shares refresh naturally; bump the query string (`?v=2`) in `og:image` to force re-scrapes. Validate with the LinkedIn Post Inspector and the Facebook Sharing Debugger.
6. **Schema:** add `logo` (512 px PNG of the icon) to the ProfessionalService node; update `name` / `alternateName` per §3.1; keep `@id`s unchanged so Google's entity understanding carries over.
7. **Alt text:** every new image gets descriptive alt text ("After: bride's white dress kept white under tungsten reception light"). The logo `alt`/`aria-label` is "Harinda".
8. **Copy:** apply the voice rules and US spelling in titles, H1s, meta and UI (Report 3 §3.10); the tagline goes in the hero subhead and the footer, not in `<title>`.
9. **External profiles in the same week:** Fiverr avatar + gig images, Instagram, LinkedIn, Behance, Pinterest. The same face, icon and tagline everywhere = entity consistency (`sameAs`).
10. **premiumphotoedits.com:** add a "Free tools by Harinda" footer lockup and the security headers (Report 2 §4). Keep its own simple wordmark so the two sites don't look like duplicate service brands.
11. **Measure:** compare GSC CTR on the top 20 queries and GA4 sample-request conversion rate for the 28 days before and after.

### 12.2 Free tools for producing the assets

| Task | Tool | Notes |
|---|---|---|
| Logo refinement, outlining text, exports | **Inkscape** (free) or **Figma** (free tier) | Outline the Fraunces text before exporting |
| Social and Fiverr templates | **Figma** or **Canva** (free) | Build master templates with the tokens as styles |
| Before/after exports | Lightroom Classic (you already have it) | Export pairs with identical crop; sRGB; 1600 px |
| Image optimisation | **Squoosh** (web) or the Astro build (`astro:assets`) | AVIF/WebP |
| Favicon rasterising | Existing `npm run gen:icons` (sharp) or **RealFaviconGenerator** | — |
| Contrast checks | **WebAIM Contrast Checker**, Figma "Stark" free plan | All §5.4 pairs pre-verified |
| Icons | **Lucide** (lucide.dev) | ISC licence |
| Fonts | **Google Fonts** / **Fontsource** | OFL, free for commercial use |
| OG image generation | **Satori** / `astro-og-canvas` (open source) | Build-time, per page |
| Mockups (polo design) | Photoshop (existing) or free PSD mockups with commercial licences | Check each mockup's licence |

---

### Top 5 Next Steps
1. **Approve the Split Frame mark and the `harinda.` wordmark**, then export the P1 assets: icon, lockups, favicon set and an 800 px avatar.
2. **Drop the §9.1 tokens into the site** on the redesign branch, replacing the purple theme, so Report 1's components build on them.
3. **Produce the first 12 before/after pairs** to the §7.2 spec. They feed the website hero, `/work/`, the Fiverr thumbnails and Instagram at once.
4. **Update every external profile in the same week** (Fiverr, Instagram, LinkedIn, Behance, Pinterest) with the same face, icon and tagline.
5. **Generate per-page OG images and add the logo to the schema**, then compare CTR and sample-request rate 28 days before and after.
