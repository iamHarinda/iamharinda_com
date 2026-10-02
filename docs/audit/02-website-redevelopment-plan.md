# Website Redevelopment Plan — iamharinda.com

| | |
|---|---|
| **Website** | https://www.iamharinda.com/ |
| **Audit date** | 2 October 2026 |
| **Auditor role** | Senior Full-Stack Developer / Solutions Architect |
| **Report** | 2 of 4. Implements the design in Report 1 and the SEO plan in Report 3 |
| **Inputs** | Astro source (`iamharinda_com-development.zip`), deployed build (`iamharinda_com_public_html.zip`, 190 files), live headers via securityheaders.com (1 Oct 2026), local Chromium renders |
| **Assumed constraint** | Solo developer, ~10–15 h/week (the budget field in the brief was left as an example; adjust the estimates if your hours differ) |

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Current Tech Stack Assessment](#2-current-tech-stack-assessment)
3. [Performance Audit](#3-performance-audit)
4. [Security Audit](#4-security-audit)
5. [Code Quality & Front-End Review](#5-code-quality--front-end-review)
6. [Recommended Target Architecture](#6-recommended-target-architecture)
7. [Feature & Functionality Plan](#7-feature--functionality-plan)
8. [Development Roadmap](#8-development-roadmap)
9. [DevOps & Deployment](#9-devops--deployment)
10. [Migration Plan](#10-migration-plan)
11. [Testing & QA Checklist](#11-testing--qa-checklist)
12. [Prioritised Action Plan](#12-prioritised-action-plan)
13. [Top 5 Next Steps](#13-top-5-next-steps)

---

## 1. Executive Summary

**Current state.** iamharinda.com is a **well-engineered Astro 5 static site** on Hostinger Business (LiteSpeed) behind Cloudflare. It has self-hosted fonts, inlined CSS, ~7 KB of first-party JS, correct canonical and www redirects, a sitemap, JSON-LD and a minimal PHP contact handler. **This is not a site that needs a rebuild.** Its problems are content, information architecture and design (Reports 1 and 3), plus a handful of infrastructure gaps.

**Key technical risks**

| Risk | Evidence | Severity |
|---|---|---|
| No HSTS; CSP is only `upgrade-insecure-requests` | Live headers (securityheaders.com, grade A but HSTS flagged missing) | Medium |
| Cloudflare may be **blocking the AI crawlers** that `robots.txt` and `llms.txt` invite | The live site returns **403** to automated fetchers; premiumphotoedits.com's robots.txt refuses the audit fetcher (consistent with Cloudflare's "Block AI bots" managed rules) | Medium (*needs verification* in the Cloudflare dashboard) |
| HTML not cached at the edge | `cf-cache-status: DYNAMIC` on `/` | Low–Medium (TTFB) |
| Contact form: no rate limit or CAPTCHA, PHP `mail()` deliverability, version leak | `contact.php`: honeypot only; `X-Mailer: PHP/x.y` header | Medium |
| Analytics without consent | GA4 `G-QP1FK83BL2` + Clarity `un99vlx16e` load unconditionally in `BaseLayout.astro`; no privacy policy | **High** (legal: UK/EU visitors) |
| Placeholder and dead assets deployed | 12 grey `sample-*.webp` placeholders publicly reachable; 3 identical OG images (md5 `e875983d…`) used for 3 different services | Low |
| Deploy over FTPS with a password, no clean-up | `.github/workflows/deploy.yml` (SamKirkland FTP-Deploy, `dangerous-clean-slate: false`) | Low–Medium |

**Recommended direction: evolve, don't replace.** Keep **Astro**. Implement the new design system and IA. Move hosting to **Cloudflare Pages** (free, global edge cache, preview deploys per branch, Pages Functions for the forms) with Hostinger kept for email only. Add consent, Turnstile and HSTS. Total effort is about **8–10 weeks part-time** across the phases in §8.

---

## 2. Current Tech Stack Assessment

### 2.1 Detected stack

| Layer | Technology | Evidence |
|---|---|---|
| Framework | Astro ^5.13, `output: "static"`, `trailingSlash: "always"`, `build.format: "directory"` | `astro.config.mjs`, `package.json` |
| Styling | Hand-written CSS (1,838 lines `global.css` + 294 `orbitra.css`), inlined into `<head>` (`inlineStylesheets: "always"`) | config + build |
| JS | Vanilla: `aurora.js` (WebGL background), `fx.js` (menu, split text, reveal, tilt, magnetic), small page scripts. Total 6.3 KB shipped on most pages | `/_astro/*.js` |
| Unused deps | `@astrojs/react`, `react`, `react-dom` installed; `BeforeAfter.jsx` dormant; the config comment says React is not used | `package.json` vs `astro.config.mjs` |
| Content | Astro Content Collections (`blog`, 90 Markdown posts, schema: title, description, publishDate, updatedDate?) | `content.config.ts` |
| SEO | `@astrojs/sitemap` (97 URLs), JSON-LD builders (`lib/schema.js`), `robots.txt`, `llms.txt` | build output |
| Server | `contact.php` (PHP `mail()`) | `public/contact.php` |
| Hosting | Hostinger Business shared hosting, LiteSpeed (`x-turbo-charged-by: LiteSpeed`, `platform: hostinger`) | live headers |
| CDN | Cloudflare (`server: cloudflare`, `cf-ray`, NEL, HTTP/3 `alt-svc`) | live headers |
| CI/CD | GitHub Actions on branch `live` → FTPS to `public_html` | `deploy.yml` |
| Analytics | GA4 + Microsoft Clarity (+ Bing Webmaster verification meta) | `site.js` |
| Sub-section | `/orbitra/` (Google Play developer pages: privacy, delete-data), draft + `noindex` | `src/data/orbitra/studio.js` |

### 2.2 Strengths
- Static HTML: crawlable without JS, fast and cheap.
- A single source of truth, `src/data/site.js`. It isn't fully used yet (see §5), but the pattern is right.
- Correct 301s for the three renamed pages (`.htaccess`), a canonical host rule, and `X-Robots-Tag: noindex` on non-canonical hosts (folds the old `iamharinda-com.preview-domain.com` copy).
- Long-cache headers for static assets, `must-revalidate` for HTML.
- Accessibility basics (skip link, focus-visible, reduced motion).

### 2.3 Limitations & technical debt
| Debt | Evidence | Fix |
|---|---|---|
| Dead data in `site.js`: `testimonials`, `whatYouGet`, `howItWorks`, `toolLogos`, `samples`, `hero` are defined but **not rendered anywhere** | `grep` across `src/pages` and `src/components` | Render them (Report 1) or delete them |
| Facts duplicated in page files instead of `site.js` | Photo-editing packages hard-coded in `photo-editing.astro` (50/200/500) vs `site.packages` (50/100/200); turnaround in 3 places | Move all packages, turnaround and reply times into `site.js` → typed `src/data/services.ts` |
| Misnamed CSS variables | `--c-teal: #8b7bff` (periwinkle), `--c-amber: #f472b6` (pink) | Replaced by the new token set (Report 4 §9) |
| Monolithic CSS (1,838 lines) | `global.css` | Split into `tokens.css`, `base.css`, `components/*.css` (or Tailwind v4; see §6) |
| Placeholder generator still runs in CI | `npm run gen:placeholders` step in `deploy.yml` | Remove the step; delete the placeholder files |
| Sitemap `lastmod: new Date()` for every URL | `astro.config.mjs` | Use the real `updatedDate`/`publishDate` per URL (Report 3 §2) |

---

## 3. Performance Audit

> Lab numbers below come from the **local build** (bytes measured from files). Real Core Web Vitals field data **could not be fetched** (the PageSpeed Insights API rate-limited the audit environment). **Verify** in PageSpeed Insights (mobile) and Search Console → Core Web Vitals.

### 3.1 Page weight (first-party, uncompressed, excluding GA4/Clarity)

| Page | Requests | Total | HTML (CSS inlined) | Fonts | Images | JS | Other |
|---|---|---|---|---|---|---|---|
| `/` | 9 | **239 KB** | 45 KB | 83 KB | 15 KB | 6.7 KB | **90 KB world-map.svg (fetch)** |
| `/photo-editing/` | 6 | 146 KB | 56 KB | 83 KB | 0 | 6.3 KB | — |
| `/pricing/` | 12 | 155 KB | 52 KB | 83 KB | 14 KB | 6.3 KB | — |
| `/about/` | 9 | 298 KB | 48 KB | 83 KB | 70 KB | 6.7 KB | 90 KB map |
| `/blog/` | 7 | 167 KB | **77 KB** | 83 KB | 0 | 6.7 KB | — |
| Blog post | 6 | 137 KB | 48 KB | 83 KB | 0 | 6.3 KB | — |

Third-party on every page: `googletagmanager.com/gtag/js` and `clarity.ms/tag/…`. Typical size is roughly 150–170 KB gzipped for gtag plus ~25–30 KB for Clarity (*estimate*; verify in DevTools → Network).

### 3.2 Core Web Vitals (*estimates*)

| Metric | Estimate (mobile, 4G) | Reasoning | Main risk |
|---|---|---|---|
| **LCP** | ~1.8–2.6 s | Small HTML and inlined CSS are good, but the LCP element (the H1) is rendered at `opacity:0; filter:blur(10px)` until `fx.js` runs and the IntersectionObserver fires (`global.css` `@media (scripting: enabled) .split:not(.is-in) .sp`) | JS-gated LCP; GA4/Clarity compete for the main thread |
| **INP** | ~150–300 ms on low-end Android | The WebGL aurora runs `requestAnimationFrame` continuously; magnetic, tilt and spotlight listeners on `pointermove` | GPU and main-thread contention |
| **CLS** | < 0.05 | `width`/`height` on images, `font-display: swap` with preloads, no ads | Font swap of Fraunces (minor) |

### 3.3 Findings

| # | Finding → Evidence → Impact → Recommendation |
|---|---|
| P1 ⚡ | **Hero H1 hidden until JS.** → `fx.js` split-text plus CSS opacity/blur. → Delays LCP and paints the most important text last. → Remove split-text; render the H1 statically. |
| P2 | **Continuous WebGL background.** → `aurora.js` RAF loop on every page. → Battery and INP. → Remove in the redesign (Report 1 §5). |
| P3 ⚡ | **90 KB world map** fetched on `/` and `/about/`, with 193 labelled paths. → Network tab. → Heavier page and axe errors. → Replace with a text or flag strip, or optimise the SVG (SVGO, strip labels, ~25 KB). |
| P4 | **Six font files, 83 KB per page** (2 preloaded; the others load on use). → `/fonts/`. → Acceptable, but the new system needs only 4 files. → Subset to Latin, use 2 weights per family, preload one. |
| P5 | **HTML not edge-cached.** → `cf-cache-status: DYNAMIC`. → Every visitor hits Hostinger origin (TTFB from Sri Lanka/EU origin to US users). → Cloudflare Cache Rule "Cache everything" for HTML with Edge TTL 1 h + purge on deploy, or move to Cloudflare Pages (§6). |
| P6 | **No responsive images.** → Plain `<img>` for `about-harinda.webp` (1600 px, 70 KB) at every viewport. → Mobile downloads 1600 px. → Use Astro `<Picture>` (`astro:assets`) with AVIF/WebP and `widths={[480, 800, 1200, 1600]}`. Essential once the portfolio adds 30+ images. |
| P7 | **Blog index HTML is 77 KB** (90 cards, no pagination). → `/blog/`. → Grows linearly with posts. → Category pages + `paginate()` at 12 per page. |
| P8 | **GA4 + Clarity load before consent and on every page.** → `BaseLayout.astro`. → Main-thread cost plus a legal issue. → Load after consent; consider Cloudflare Zaraz to run them server-side. |

### 3.4 Performance budget for the rebuild
| Budget | Target |
|---|---|
| HTML + inlined CSS | ≤ 50 KB |
| JS (first-party) | ≤ 15 KB (before/after slider + menu + consent) |
| Fonts | ≤ 4 files, ≤ 90 KB |
| Hero image | ≤ 120 KB AVIF at 1200 px |
| LCP (p75 mobile) | ≤ 2.0 s |
| INP (p75) | ≤ 150 ms |
| CLS | ≤ 0.05 |

---

## 4. Security Audit

### 4.1 Response headers (live, `https://www.iamharinda.com/`, 1 Oct 2026)

| Header | Value | Status |
|---|---|---|
| `Strict-Transport-Security` | — | ❌ **Missing** |
| `Content-Security-Policy` | `upgrade-insecure-requests` | ⚠️ Present but provides no XSS/injection protection |
| `X-Content-Type-Options` | `nosniff` | ✅ |
| `X-Frame-Options` | `SAMEORIGIN` | ✅ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | ✅ |
| HTTPS / HTTP/3 | Cloudflare, `alt-svc: h3` | ✅ |

**premiumphotoedits.com** (same host, Hostinger + Cloudflare): grade **D**. Only `content-security-policy: upgrade-insecure-requests` is present; HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy are all missing. Apply the same header block there.

### 4.2 Recommended header block (`.htaccess` now; `_headers` on Cloudflare Pages later)

```apache
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://challenges.cloudflare.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com https://*.clarity.ms; style-src 'self' 'unsafe-inline'; font-src 'self'; frame-src https://challenges.cloudflare.com; form-action 'self'; base-uri 'self'; frame-ancestors 'self'; object-src 'none'; upgrade-insecure-requests"
  Header always set Cross-Origin-Opener-Policy "same-origin"
</IfModule>
```
- Start with `Content-Security-Policy-Report-Only` for a week, watch the console, then enforce.
- Only add `preload` and submit to hstspreload.org once **every** subdomain (including mail autoconfig) serves HTTPS.
- The simplest route is Cloudflare → SSL/TLS → Edge Certificates → enable HSTS.
- `'unsafe-inline'` is needed for the inline gtag/Clarity bootstraps and Astro's inlined CSS. Move the scripts to files or hashes later to drop it.

### 4.3 Findings

| # | Finding | Evidence | Impact | Recommendation |
|---|---|---|---|---|
| S1 ⚡ | No HSTS | live headers | First-visit SSL-strip possible | Enable HSTS in Cloudflare (2 minutes) |
| S2 | Contact form has no abuse protection beyond a honeypot | `contact.php` | Spam floods, mailbox reputation | Add **Cloudflare Turnstile** (free) verified server-side, plus a per-IP rate limit (Cloudflare WAF rate-limiting rule on `POST /contact.php`: 5 requests per 10 min) |
| S3 ⚡ | Version disclosure | `X-Mailer: PHP/` . `phpversion()` in `contact.php`; `<meta name="generator" content="Astro v5…">` | Fingerprinting | Delete both lines |
| S4 | PHP `mail()` deliverability | `$FROM = no-reply@iamharinda.com` via Hostinger | Leads landing in spam is a lost order | Verify SPF, DKIM and DMARC for iamharinda.com (check with mail-tester.com). Better: send through Resend, Brevo or Hostinger SMTP with authentication |
| S5 | Deploy credentials | FTPS user/password in GitHub secrets; `dangerous-clean-slate: false` | Password leakage risk; stale files accumulate on the server | Move to Cloudflare Pages (Git-connected, no credentials), or switch to SFTP/SSH key deploy |
| S6 | Placeholders and draft files publicly reachable | `/images/sample-1-before.webp` … `sample-6-after.webp` | Unprofessional if indexed in Google Images | Delete them; remove `gen:placeholders` from CI |
| S7 | Third-party trademarks used as "tool logos" | `public/logos/calman-verified-mark.png`, `starlink.png`, Adobe marks (`toolLogos`, currently unused) | "Calman Verified" is a certification mark for display manufacturers; using it as a personal badge can imply endorsement | Mention in text ("factory-calibrated, Calman Verified ASUS ProArt monitor") rather than displaying the mark |
| S8 | Analytics before consent; no privacy policy | `BaseLayout.astro` | UK GDPR / EU ePrivacy exposure; Google Consent Mode v2 required for EEA measurement features | Consent banner + Consent Mode v2 + `/privacy/` page (§7) |
| S9 | `.ftp-deploy-sync-state.json` in webroot | `public_html` zip | Lists every file and hash; **protected** by `.htaccess` `<FilesMatch "^\.">` ✅ | Keep the rule; it disappears with the Cloudflare Pages migration |
| S10 | Dependencies | Astro ^5.13, React 19 (unused), sharp ^0.34 (dev) | Low risk (static output) | Remove React; add Dependabot; run `npm audit` in CI |

---

## 5. Code Quality & Front-End Review

| Area | Finding | Recommendation |
|---|---|---|
| HTML semantics | ✅ Landmarks, one H1 per page, `<ol>` for steps, native `<details>` FAQ, `<figure>`/`<figcaption>`. ⚠️ Footer uses 4 `<h2>` on every page; a duplicate `<option>` "Not sure yet" in `contact.astro` | Footer titles as `<p>`; deduplicate the options |
| Data architecture | `site.js` is good but incomplete: page files hard-code prices, packages and FAQs | Typed `src/data/services.ts` (Zod-validated): every service's packages, turnaround, FAQs and CTA |
| Components | Pages repeat hero, steps, pricing grid and "also available" markup inline (300+ line page files) | Extract `Hero.astro`, `PriceTable.astro`, `Steps.astro`, `ReviewBar.astro`, `Testimonials.astro`, `BeforeAfter.astro` (vanilla, no React), `CtaBand.astro` |
| CSS | 1,838-line global file, misnamed tokens, many effect styles (`.shine`, `.beam`, `[data-tilt]`) | Token file + component styles; delete effect CSS (~40% of the file, *estimate*) |
| JS | `fx.js` ≈ 114 lines of effects; `aurora.js` 168 lines WebGL | Keep the menu toggle and a tiny reveal; delete the rest |
| Inline styles | `style="margin-top:1rem;margin-inline:auto"` etc. in page files | Utility classes |
| Blog | No `heroImage`, `category`, `tags` or `author` in the collection schema; 0 posts use `updatedDate` | Extend the schema (below) |
| Third-party | GA4, Clarity: synchronous bootstrap in `<head>` | Load via the consent manager, or move to Cloudflare Zaraz |

**Extended blog schema**
```ts
// src/content.config.ts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) => z.object({
    title: z.string().max(70),
    seoTitle: z.string().max(60).optional(),
    description: z.string().min(120).max(160),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(["photo-editing", "web-development", "apparel-design"]),
    tags: z.array(z.string()).default([]),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    service: z.enum(["/photo-editing/", "/web-development/", "/polo-shirt-design/"]),
    draft: z.boolean().default(false),
  }),
});
```

**Accessible vanilla before/after slider (replaces the dormant React `BeforeAfter.jsx`)**
```astro
---
// src/components/BeforeAfter.astro
const { before, after, alt, caption, width = 1200, height = 800 } = Astro.props;
---
<figure class="ba" style={`aspect-ratio:${width}/${height}`}>
  <img src={after.src} alt={`After: ${alt}`} width={width} height={height} loading="lazy" decoding="async" />
  <img class="ba__before" src={before.src} alt={`Before: ${alt}`} width={width} height={height} loading="lazy" decoding="async" />
  <input class="ba__range" type="range" min="0" max="100" value="50"
         aria-label="Drag to compare before and after" />
  <figcaption>{caption}</figcaption>
</figure>
<style>
  .ba{position:relative;overflow:hidden;border-radius:var(--radius-lg);--pos:50%}
  .ba img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .ba__before{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
  .ba__range{position:absolute;inset:0;width:100%;height:100%;opacity:0;cursor:ew-resize}
  .ba::after{content:"";position:absolute;top:0;bottom:0;left:var(--pos);width:2px;background:#fff;box-shadow:0 0 0 1px rgb(0 0 0/.25)}
  .ba figcaption{position:absolute;left:12px;bottom:12px;font:600 13px/1.3 var(--font-mono);background:rgb(20 20 22/.7);color:#fff;padding:4px 8px;border-radius:6px}
  .ba:has(.ba__range:focus-visible){outline:3px solid var(--color-teal);outline-offset:3px}
</style>
<script>
  document.querySelectorAll<HTMLElement>(".ba").forEach((el) => {
    const r = el.querySelector<HTMLInputElement>(".ba__range")!;
    r.addEventListener("input", () => el.style.setProperty("--pos", r.value + "%"));
  });
</script>
```
The keyboard works natively (arrow keys on the range input), it carries no framework runtime, and both images keep explicit dimensions, so there is no CLS.

---

## 6. Recommended Target Architecture

### 6.1 Options compared

| | **A. Astro on Cloudflare Pages** (recommended) | B. Astro, stay on Hostinger | C. Next.js on Vercel |
|---|---|---|---|
| Rendering | SSG + Pages Functions for forms | SSG + PHP | SSG/ISR + serverless |
| Rework | Low: same codebase; swap `contact.php` for a Function | None | High: full rewrite |
| Performance | Global edge HTML cache, HTTP/3, image resizing available | Origin-served HTML (`DYNAMIC`) unless you add a Cache Rule | Excellent |
| Preview deploys | ✅ every branch/PR gets a URL | ❌ | ✅ |
| Cost | $0 (free tier: unlimited bandwidth, 500 builds/mo) | Already paid (Hostinger Business) | $0 hobby; but **Vercel Hobby forbids commercial use**, so Pro at $20/mo |
| Forms / backend | Pages Functions (Workers) + Turnstile + Resend or MailChannels-style API | PHP `mail()` | API routes |
| Email hosting | Keep Hostinger mail (MX unchanged) | Hostinger | separate |
| Lock-in | Low (static output is portable) | Low | Medium |
| Fit for solo dev | ✅ | ✅ | ❌ overkill |

**Decision: Option A.** It keeps the investment in Astro, removes FTP and PHP, gives edge-cached HTML worldwide (your clients are in the US, Europe and Australia, not near the origin), and adds free preview URLs to review the redesign before merging. **Fallback:** if you'd rather not move, stay on Hostinger (B) and add a Cloudflare Cache Rule for HTML, Turnstile on `contact.php`, and HSTS.

### 6.2 Rendering strategy
- **SSG for everything** (pages, blog, portfolio, reviews).
- **Pages Functions** only for `POST /api/sample-request` and `POST /api/contact`.
- **No client framework.** Islands are vanilla `<script>` modules (slider, menu, consent, blog filter).
- **Images:** `astro:assets` `<Picture>` at build time (AVIF + WebP, multiple widths). Originals in `src/assets/work/`.

### 6.3 Target folder structure
```
iamharinda-com/
├─ astro.config.mjs
├─ public/
│  ├─ _headers            # security + cache headers (Cloudflare Pages)
│  ├─ _redirects          # 301 map (replaces .htaccess rules)
│  ├─ robots.txt  llms.txt  favicon.*  site.webmanifest
├─ functions/
│  └─ api/
│     ├─ sample-request.ts   # Turnstile verify → email via Resend → 303 /free-sample/thanks/
│     └─ contact.ts
├─ src/
│  ├─ assets/work/{wedding,portrait,family,real-estate}/*-before.jpg|*-after.jpg
│  ├─ components/ (Header, Footer, Hero, BeforeAfter, ReviewBar, Testimonials,
│  │               PriceTable, TurnaroundTable, Steps, Faq, CtaBand, ConsentBanner, BlogCard, AuthorCard)
│  ├─ content/
│  │  ├─ blog/*.md          # + category, heroImage, service
│  │  ├─ work/*.json        # portfolio entries (genre, problem, fix, metadata)
│  │  └─ reviews/*.json     # verbatim reviews (name, country, date, source URL)
│  ├─ data/ site.ts  services.ts  nav.ts
│  ├─ layouts/ BaseLayout.astro  ServiceLayout.astro  PostLayout.astro
│  ├─ lib/ schema.ts  seo.ts
│  ├─ pages/
│  │  ├─ index.astro  work.astro  reviews.astro  pricing.astro  about.astro  contact.astro
│  │  ├─ free-sample/index.astro  free-sample/thanks.astro
│  │  ├─ photo-editing/index.astro  wedding.astro  portrait-headshot.astro  culling.astro  how-to-send-files.astro
│  │  ├─ web-development.astro  polo-shirt-design.astro
│  │  ├─ blog/[...page].astro  blog/category/[cat]/[...page].astro  blog/[slug].astro
│  │  ├─ privacy.astro  terms.astro  404.astro
│  │  └─ orbitra/…          # unchanged
│  └─ styles/ tokens.css  base.css  utilities.css
└─ .github/workflows/ci.yml   # build + Lighthouse CI + link check (deploy handled by CF Pages)
```

### 6.4 Example Pages Function (sample request)
```ts
// functions/api/sample-request.ts
interface Env { TURNSTILE_SECRET: string; RESEND_API_KEY: string; }
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const f = await request.formData();
  if (f.get("company")) return Response.redirect(new URL("/free-sample/thanks/", request.url), 303); // honeypot
  const ts = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: String(f.get("cf-turnstile-response") ?? ""),
      remoteip: request.headers.get("CF-Connecting-IP") ?? "" }),
  }).then(r => r.json<{ success: boolean }>());
  const email = String(f.get("email") ?? "").trim();
  const link = String(f.get("photos_link") ?? "").trim();
  if (!ts.success || !/^\S+@\S+\.\S+$/.test(email) || !/^https?:\/\//.test(link))
    return Response.redirect(new URL("/free-sample/?error=1", request.url), 303);
  const text = ["name","email","shoot_type","gallery_size","style","reference","deadline","photos_link"]
    .map(k => `${k}: ${String(f.get(k) ?? "").replace(/[\r\n]+/g, " ").slice(0, 2000)}`).join("\n");
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: "Sample requests <samples@iamharinda.com>", to: ["hello@iamharinda.com"],
      reply_to: email, subject: `Free sample request — ${f.get("shoot_type") ?? "photos"}`, text }),
  });
  return Response.redirect(new URL("/free-sample/thanks/", request.url), 303);
};
```

---

## 7. Feature & Functionality Plan

| Keep | Improve | Remove | Add |
|---|---|---|---|
| Astro SSG, content collections | `site.js` → typed `services.ts` single source of truth | WebGL aurora (`aurora.js`) | `/work/` portfolio with accessible before/after slider |
| Self-hosted fonts | Contact form → Turnstile + transactional email | Split-text, tilt, magnetic, shine effects (`fx.js` effects) | `/free-sample/` form + thanks page (GA4 conversion) |
| JSON-LD builders | Blog: categories, pagination, hero images, author card, related posts | React deps + `BeforeAfter.jsx` | `/reviews/` (verbatim, sourced) + review bar component |
| 301 rules, canonical host | Sitemap with real `lastmod` | Placeholder images + `gen:placeholders` CI step | `/privacy/`, `/terms/` (revision and refund policy) |
| `llms.txt`, AI-crawler-friendly robots | Responsive images via `astro:assets` | 90 KB world-map SVG (→ text/flags) | Consent banner with Google Consent Mode v2 |
| WhatsApp deep links with prefilled text | Per-service OG images (currently 3 identical files) | Second email address on `/contact/` | Photo-editing child pages: wedding, portrait-headshot, culling, how-to-send-files |
| `/orbitra/` section | Pricing slider + number input | — | Sticky mobile CTA bar |
| — | 404 with service links + blog search | — | Blog category RSS feed (`@astrojs/rss`) |

**Consent banner (lightweight, no dependency).** Default-deny via Consent Mode v2, then load Clarity only after "Accept":
```html
<script is:inline>
  window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
  gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
  // on Accept: gtag('consent','update',{analytics_storage:'granted'}); then inject the Clarity script
</script>
```
(Or use Cloudflare Zaraz's built-in consent manager. That moves GA4 server-side and removes gtag.js from the page.)

---

## 8. Development Roadmap

Phases are shared with Report 1 (design) and Report 3 (SEO). Estimates assume ~12 h/week.

### Phase 0 — Setup & Quick Wins (Week 1, ~10 h)
| Task | Est. |
|---|---|
| ⚡ Enable HSTS in Cloudflare; add the CSP in Report-Only mode | 0.5 h |
| ⚡ Check Cloudflare → Security → Bots / AI Crawl Control: decide whether AI crawlers are allowed (to match `robots.txt` + `llms.txt`) | 0.5 h |
| ⚡ Remove the `X-Mailer` header and the generator meta; delete placeholders; drop `gen:placeholders` from CI | 0.5 h |
| ⚡ Fix contradictory facts → move packages, turnaround and reply time into `site.js`; render testimonials + review bar | 3 h |
| ⚡ `/privacy/` + `/terms/` pages; consent banner + Consent Mode v2 | 3 h |
| ⚡ Fix 193 ARIA errors (map) + duplicate `<option>` | 0.5 h |
| Create a `redesign` branch; connect the repo to Cloudflare Pages (preview only, no DNS change) | 2 h |

### Phase 1 — MVP Redesign (Weeks 2–4, ~36 h)
| Task | Est. |
|---|---|
| Tokens + base CSS from Report 4; remove effect CSS/JS | 6 h |
| Components: Header (with CTA), Hero, BeforeAfter, ReviewBar, GuaranteeStrip, PriceTable, TurnaroundTable, Steps, Testimonials, CtaBand, StickyMobileCta | 10 h |
| Prepare 12–18 before/after pairs (export, resize, alt text, captions) → `src/content/work/` | 6 h |
| New Home, `/photo-editing/`, `/work/`, `/free-sample/` + thanks | 8 h |
| `functions/api/sample-request.ts` + Turnstile + Resend (with DKIM on iamharinda.com) | 3 h |
| GA4 events (`generate_lead`, `whatsapp_click`, `fiverr_click`) | 1 h |
| QA pass (§11) and launch on Cloudflare Pages (§10) | 2 h |

### Phase 2 — Enhancements (Weeks 5–8, ~36 h)
| Task | Est. |
|---|---|
| `/photo-editing/wedding/`, `/portrait-headshot/`, `/culling/`, `/how-to-send-files/` | 10 h |
| Blog schema extension; categorise 90 posts; category pages + pagination; author card; related posts | 10 h |
| Hero images for the top 30 photo-editing posts (your own before/afters) | 6 h |
| `/reviews/` page + Review JSON content | 3 h |
| Restyle `/web-development/` (3 case studies) and the polo page (mockup gallery) | 5 h |
| Per-page OG images (Astro build-time generation with Satori or static exports) | 2 h |

### Phase 3 — Scale (Weeks 9–12+, ongoing)
| Task | Est. |
|---|---|
| Lead magnet: "Wedding Gallery Editing Brief" PDF + email capture (Brevo/Resend audience) | 6 h |
| Free-tools strategy with premiumphotoedits.com: each tool links to the matching iamharinda.com service page (see Report 3 §9) | ongoing |
| Client "send a gallery" page for repeat clients (prefilled form, saved preferences via query string) | 4 h |
| Lighthouse CI budgets enforced in PRs; monthly dependency updates | 2 h + 1 h/mo |
| Optional: Stripe Payment Links / PayPal invoice links on `/pricing/` for direct orders | 3 h |

---

## 9. DevOps & Deployment

| Area | Recommendation |
|---|---|
| **Git workflow** | `main` = production (rename `live` → `main`, or point Cloudflare Pages at `live`). Feature branches → PR → preview URL → merge. Drop the `development` long-lived branch; short-lived branches are simpler for a solo developer. |
| **CI** (`.github/workflows/ci.yml`) | On PR: `npm ci` → `astro check` → `astro build` → `lychee` link check on `dist/` → Lighthouse CI (budgets from §3.4) → `npm audit --omit=dev` |
| **CD** | Cloudflare Pages Git integration builds `main` (`npm run build`, output `dist`). Retire the FTP workflow after launch. |
| **Environments** | Production `www.iamharinda.com`; Preview `*.iamharinda.pages.dev` (add `X-Robots-Tag: noindex` for the preview host in `_headers`); Local `astro dev` |
| **Secrets** | `TURNSTILE_SECRET`, `RESEND_API_KEY` in Cloudflare Pages env vars (never in the repo) |
| **Backups** | The Git repo *is* the site backup. Also keep original before/after RAW/JPEG sources in Google Drive (they're not in Git). Export GA4/GSC monthly. Hostinger mail: enable Hostinger backups. |
| **Monitoring** | UptimeRobot or Better Stack free plan: HTTPS check on `/` and `/free-sample/` every 5 min, alerts to email + WhatsApp/Telegram. Cloudflare Web Analytics (cookieless) as a consent-free baseline. Search Console email alerts. |
| **Form monitoring** | A weekly synthetic test submission (GitHub Actions cron → POST to the Function with a test flag) so a broken form never goes unnoticed. |

**Cloudflare Pages `_headers`**
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms https://challenges.cloudflare.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.clarity.ms; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src https://challenges.cloudflare.com; form-action 'self'; frame-ancestors 'self'; object-src 'none'
/_astro/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
https://:project.pages.dev/*
  X-Robots-Tag: noindex
```

---

## 10. Migration Plan

### 10.1 URL map (keep every existing URL; add redirects only where a rename is approved)

| Old URL | New URL | Action |
|---|---|---|
| `/` | `/` | Keep |
| `/photo-editing/` | `/photo-editing/` | Keep (becomes the service hub) |
| `/pricing/` | `/pricing/` | Keep (becomes the summary hub; the photo detail moves to `/photo-editing/#pricing`) |
| `/web-development/` | `/web-development/` | Keep |
| `/fashion-designing/` | `/polo-shirt-design/` | **301 only if** GSC shows negligible clicks or impressions for "fashion design" queries (Report 3 §2.6); otherwise keep the URL and change the label/H1 only |
| `/about/`, `/contact/`, `/blog/`, `/blog/*` (90) | same | Keep |
| `/wedding-photo-editing/` (already 301 → `/photo-editing/`) | `/photo-editing/wedding/` | **Update the existing 301 target** (single hop) |
| `/apparel-pattern-tech-packs/` (301 → `/fashion-designing/`) | final polo URL | Update to a single hop |
| `/custom-web-development/` | `/web-development/` | Keep the 301 |
| `/images/sample-*.webp` | — | Delete (410 not needed; never linked) |
| `/orbitra/**` | same | Keep |

**`public/_redirects` (Cloudflare Pages)**
```
/wedding-photo-editing/        /photo-editing/wedding/   301
/wedding-photo-editing         /photo-editing/wedding/   301
/custom-web-development/       /web-development/         301
/custom-web-development        /web-development/         301
/apparel-pattern-tech-packs/   /polo-shirt-design/       301
/apparel-pattern-tech-packs    /polo-shirt-design/       301
/fashion-designing/            /polo-shirt-design/       301
/fashion-designing             /polo-shirt-design/       301
```
(Delete the last two lines if the polo rename is not approved, and point the apparel redirect at `/fashion-designing/` instead.)

**Host canonicalisation on Cloudflare:** add a Cloudflare **Redirect Rule**: `iamharinda.com/*` → `https://www.iamharinda.com/${1}` (301). `_redirects` can't match hostnames, and Cloudflare Pages already forces HTTPS.

### 10.2 Launch checklist
1. Crawl the current live site (Screaming Frog free, up to 500 URLs) and save the URL list + titles as a baseline.
2. Export GSC Performance (last 16 months) for pages and queries.
3. Build on Cloudflare Pages, add the custom domain `www.iamharinda.com`, and verify the preview.
4. Lower the DNS TTL to 300 s the day before.
5. Keep **MX, SPF, DKIM and DMARC records unchanged** (email stays on Hostinger).
6. Switch the `www` CNAME to `iamharinda.pages.dev` (Cloudflare does this when you attach the domain); add the apex redirect rule.
7. Post-launch: crawl again and diff (no 404s, all 301s single-hop), resubmit `sitemap-index.xml` in GSC and Bing, use URL Inspection → Request indexing on Home, `/photo-editing/`, `/photo-editing/wedding/`, `/free-sample/`.
8. Submit a test form and confirm the email lands in the inbox (not spam).
9. Watch GSC Coverage and Performance daily for 14 days.

### 10.3 Rollback plan
- Keep the Hostinger `public_html` untouched for 30 days.
- Rollback = point the `www` DNS record back to Hostinger (Cloudflare proxy, ~1–5 min propagation), or use Cloudflare Pages "Rollback to previous deployment" for code-level issues.
- Trigger: form failures, >5% 404s on previously indexed URLs, or LCP regression >30%.

---

## 11. Testing & QA Checklist

**Cross-browser / device**
- [ ] Chrome, Safari, Firefox, Edge (latest); Safari iOS 16+; Chrome Android on a mid-range device (e.g. Galaxy A-series)
- [ ] Widths 320, 375, 390, 768, 1024, 1280, 1440, 1920. No horizontal scroll *without* `overflow-x:hidden` on `html`

**Functional**
- [ ] Sample-request and contact forms: valid, invalid email, missing link, honeypot filled, Turnstile failure, email received with a correct reply-to
- [ ] WhatsApp links open with the correct prefilled text on mobile and desktop (WhatsApp Web)
- [ ] Fiverr links → `fiverr.com/iamharinda` (confirm the username; a code comment references `fiverr.com/users/oleezax/`)
- [ ] Before/after slider: mouse, touch, keyboard arrows
- [ ] Consent banner: deny → no GA/Clarity requests; accept → both load; choice persists
- [ ] All 301s single-hop (`curl -sI`); 404 page returns status 404

**Performance**
- [ ] Lighthouse mobile ≥ 95 performance on Home, `/photo-editing/`, `/work/`, a blog post
- [ ] PSI field data (once available) LCP ≤ 2.0 s, INP ≤ 150 ms, CLS ≤ 0.05
- [ ] Images served as AVIF/WebP with `srcset`; hero ≤ 120 KB

**Accessibility**
- [ ] axe DevTools: 0 serious/critical on all templates
- [ ] Keyboard-only run-through of every flow; focus visible; no traps in the mobile menu
- [ ] VoiceOver (iOS) + NVDA (Windows) on Home and `/free-sample/`
- [ ] Contrast spot-checks against the Report 4 tables; 200% zoom; `prefers-reduced-motion`

**SEO (see Report 3)**
- [ ] Unique title/description/H1 per page; canonical self-referencing; JSON-LD validates (Rich Results Test)
- [ ] Sitemap includes new pages with real `lastmod`; `robots.txt` reachable; preview hosts `noindex`

---

## 12. Prioritised Action Plan

| Task | Impact | Effort | Priority | Phase |
|---|---|---|---|---|
| ⚡ Enable HSTS (Cloudflare) | Med | Low | P1 | 0 |
| ⚡ Consent banner + Consent Mode v2 + privacy/terms pages | High | Low | P1 | 0 |
| ⚡ Unify facts in `site.js`; render testimonials | High | Low | P1 | 0 |
| ⚡ Verify Cloudflare bot/AI-crawler settings vs robots.txt intent | Med | Low | P1 | 0 |
| ⚡ Remove version leaks, placeholders, the CI placeholder step | Low | Low | P2 | 0 |
| ⚡ Fix map ARIA (193 errors) | Med | Low | P1 | 0 |
| Turnstile + rate limit on forms; SPF/DKIM/DMARC check | High | Low | P1 | 0–1 |
| New token system + remove aurora/split-text (LCP/INP) | High | Med | P1 | 1 |
| BeforeAfter component + `/work/` + responsive images | High | Med | P1 | 1 |
| `/free-sample/` + Pages Function + GA4 conversion events | High | Med | P1 | 1 |
| Move hosting to Cloudflare Pages (edge HTML cache, previews) | Med | Med | P2 | 1 |
| Enforce CSP (after Report-Only) | Med | Low | P2 | 1 |
| Blog schema, categories, pagination, related posts | Med | Med | P2 | 2 |
| Photo-editing child pages | High | Med | P2 | 2 |
| Per-page OG images | Low | Low | P3 | 2 |
| Lighthouse CI budgets + link check in CI | Med | Low | P2 | 2 |
| Remove React deps; Dependabot | Low | Low | P3 | 2 |
| Lead magnet + email capture | Med | Med | P3 | 3 |

---

## 13. Top 5 Next Steps

1. **Today (≈1 h):** turn on HSTS in Cloudflare, check the Bots / AI Crawl Control settings, and delete the `X-Mailer` line and the placeholder images.
2. **This week:** add the consent banner (Consent Mode v2) plus `/privacy/` and `/terms/`, and move all prices, turnaround and reply times into `site.js` so every page reads one source.
3. **Connect the repo to Cloudflare Pages on a `redesign` branch** so every change gets a preview URL. No DNS change yet.
4. **Build the BeforeAfter component, `/work/` and `/free-sample/`** (with Turnstile and a thank-you page tracked as a GA4 conversion).
5. **Ship the Phase 1 redesign, then cut DNS over** following §10.2, keeping Hostinger as a 30-day rollback.
