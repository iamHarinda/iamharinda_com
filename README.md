# iamharinda.com — v2 (redesign)

Business site for Harinda Fernando: hand-edited photo editing for photographers
(primary), plus custom web development and polo/golf shirt design.

- **Stack:** Astro 5 (static output) · GSAP + ScrollTrigger · Lenis smooth scroll ·
  self-hosted fonts (Fontsource: Fraunces, Instrument Sans, JetBrains Mono) ·
  portfolio images from **Cloudinary** · one PHP file for the forms.
- **Hosting:** Hostinger (Apache/LiteSpeed) behind Cloudflare, deployed by GitHub
  Actions on push to `live` (unchanged from v1).
- **Design:** "Grading Suite" system from the brand kit, light and dark themes,
  Liquid Glass navbar, signature logo (concept D).

---

## 1. Run it locally

Node 20+ (`node -v`).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/ locally
```

---

## 2. Where to edit things

| What | File |
|---|---|
| Prices, turnaround, reply time, contact details, FAQs, reviews, Fiverr stats | `src/data/site.js` (single source of truth — every page reads it) |
| Portfolio photos (Cloudinary) | `src/data/portfolio.js` |
| Wedding / portrait / product page copy | `src/data/services.js` |
| Blog categories and their CTAs | `src/data/blog.js` |
| Blog posts | `src/content/blog/*.md` (each needs a `category:`) |
| Colours, type, components | `src/styles/global.css` (tokens at the top) |
| Animations | `src/scripts/motion.js` |
| Menu, glass effect, cookie consent, tracking | `src/scripts/site.js` |
| Logo | `src/components/Logo.astro` (outlined SVG paths), files in `public/brand/` |
| Security headers, redirects, caching | `public/.htaccess` |
| Form handling + email | `public/contact.php` |

### Add a portfolio photo
1. Upload it to Cloudinary (cloud `cz17mu0x`).
2. Add one line to `src/data/portfolio.js` with its `public_id`, version (the
   `v123…` number in its URL), width, height, genre and a descriptive `alt`.
3. Commit and push. Cloudinary serves AVIF/WebP at the right size automatically
   (`f_auto`, `q_auto`, `g_auto` cropping).

### Add a blog post
Create `src/content/blog/my-post.md`:
```md
---
title: "Post title"
description: "120–160 characters for Google."
category: photo-editing   # or web-development / apparel-design
publishDate: 2026-10-10
# updatedDate: 2026-11-01   # add when you update it (feeds the sitemap)
# seoTitle: "Shorter title for Google (max ~60 chars)"
---
```

---

## 3. Deploy

Same as before: merge into `live` → GitHub Actions builds and uploads `dist/` to
Hostinger over FTPS (secrets `FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`).

**One-time clean-up after the first v2 deploy** (the deploy never deletes old
files): in Hostinger File Manager, delete from `public_html/`:
`images/sample-*.webp`, `images/world-map.svg`, `images/og/`, `fonts/`, `logos/`,
and any old `_astro/*.js` files older than this deploy.

### Cloudflare settings to check (5 minutes)
- **SSL/TLS → Edge Certificates:** HSTS is also sent by `.htaccess`; you can enable it here too.
- **Security → Bots / AI Crawl Control:** `robots.txt` and `llms.txt` welcome AI
  crawlers. If Cloudflare's "Block AI bots" is on, they're blocked anyway — pick one policy.
- **Caching → Cache Rules (optional):** "Cache everything" for HTML with a 1-hour
  edge TTL, purged on deploy, makes the site faster for US/UK visitors.

### Content-Security-Policy
`.htaccess` sends CSP in **Report-Only** mode. After a week with no CSP
warnings in the browser console, rename the header to `Content-Security-Policy`.

### Optional: Cloudflare Turnstile on the forms
Create a Turnstile widget (free), put the **site key** in `site.turnstileSiteKey`
(`src/data/site.js`) and the **secret** in `$TURNSTILE_SECRET` (`public/contact.php`).

### Email deliverability
`contact.php` sends from `no-reply@iamharinda.com`. Make sure that mailbox exists
and that SPF, DKIM and DMARC are set for the domain in Hostinger (test with
mail-tester.com) so leads don't land in spam.

---

## 4. Please confirm before going live

These are facts the site now states. They were unified from the old site, but
please check each one:

- [ ] **Turnaround for 100 photos** set to 2 days (old site had no 100-photo package on the wedding page).
- [ ] **Package ladder** 50 / 100 / 200 / 500 at $0.20 each — used on every page now.
- [ ] **Fiverr stats** 4.9 ★ / 183 reviews / 300+ orders / 15 countries (`fiverrStats`).
- [ ] **Fiverr username** `fiverr.com/iamharinda` (old code comments mentioned `oleezax`).
- [ ] **Web development from $750** — your Fiverr web gigs may start lower.
- [ ] **File retention: deleted 30 days after approval** (privacy + terms pages). Change if you keep files longer.
- [ ] **Invoice due within 7 days of approval** (terms page).
- [ ] **Portfolio permission** — the 25 Cloudinary photos are client work; make sure you're allowed to show them.
- [ ] **Portfolio alt text and titles** in `src/data/portfolio.js` were written from folder names; adjust to describe each photo exactly.
- [ ] **Hero photo** is `DSC01850` (outdoor portrait). Swap the id in `src/pages/index.astro` if another shot is stronger.
- [ ] **Review quotes** are paraphrased Fiverr feedback. Replace with verbatim quotes + first names when clients agree.
- [ ] **Privacy & terms** are plain-English drafts, not legal advice.

---

## 5. Social share images

`public/og/*.jpg` (1200×630) are branded cards: default, photo editing, web
development, polo design. Blog posts use the card for their category. To make a
new one, duplicate a card in Figma/Canva at 1200×630 using the signature logo in
`public/brand/`.

## 6. What changed from v1

- New design system, signature logo, Liquid Glass navbar, GSAP/Lenis motion (all reduced-motion safe).
- Portfolio from Cloudinary on Home, Work and service pages (finished edits only).
- New pages: `/photo-editing/` hub, `/photo-editing/wedding/`, `/portrait-headshot/`,
  `/product-food/`, `/how-to-send-files/`, `/work/`, `/free-sample/` (+ thank-you),
  `/reviews/`, `/contact/thanks/`, `/privacy/`, `/terms/`, blog category pages, `/rss.xml`.
- Unified prices/turnaround/reply times; US spelling in headings and metadata.
- Cookie consent with Google Consent Mode v2; Clarity loads only after consent.
- GA4 events: `generate_lead`, `sample_request_sent`, `contact_sent`, `whatsapp_click`, `fiverr_click`, `email_click`, `sample_cta_click`.
- One JSON-LD `@graph` per page (WebSite, ProfessionalService, Person, Service + Offers, FAQPage, BreadcrumbList, BlogPosting, ImageObject).
- Sitemap uses real post dates; thank-you pages excluded.
- HSTS + security headers; form rate limit, optional Turnstile, no PHP version leak.
- Removed: purple WebGL background, React, world map, placeholder images, third-party logo strip.
- `/orbitra/` section is untouched (still draft/noindex).
