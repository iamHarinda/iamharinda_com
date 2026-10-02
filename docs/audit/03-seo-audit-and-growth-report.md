# SEO Audit & Growth Report — iamharinda.com

| | |
|---|---|
| **Website** | https://www.iamharinda.com/ |
| **Audit date** | 2 October 2026 |
| **Auditor role** | Senior Technical SEO Auditor |
| **Report** | 3 of 4. Aligned with the redesign (Report 1), the dev plan (Report 2) and the brand kit (Report 4) |
| **Data sources** | Astro source + deployed build (97-URL sitemap, 90 posts), local Chromium crawl of key templates, live headers (securityheaders.com), competitor homepages (fixthephoto.com, signatureedits.com) |
| **Not available** | Search Console, GA4, backlink and keyword-volume tools (the Ahrefs connector returned "insufficient plan"). **All traffic, volume, difficulty and backlink figures below are labelled *estimate* or *verify*, with the tool to use.** |

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Technical SEO](#2-technical-seo)
3. [On-Page SEO](#3-on-page-seo)
4. [Keyword Strategy](#4-keyword-strategy)
5. [Content Audit & Strategy](#5-content-audit--strategy)
6. [E-E-A-T & Trust](#6-e-e-a-t--trust)
7. [Structured Data (Schema)](#7-structured-data-schema)
8. [Internal Linking](#8-internal-linking)
9. [Off-Page SEO & Link Building](#9-off-page-seo--link-building)
10. [Local / International SEO](#10-local--international-seo)
11. [Competitor Analysis](#11-competitor-analysis)
12. [Measurement Setup](#12-measurement-setup)
13. [90-Day SEO Roadmap](#13-90-day-seo-roadmap)
14. [Prioritised Action Plan](#14-prioritised-action-plan)
15. [Top 5 Next Steps](#15-top-5-next-steps)

---

## 1. Executive Summary

**SEO health score: 58 / 100** (*auditor's weighted estimate*: technical 80, on-page 55, content 55, E-E-A-T 45, off-page *unknown*, scored conservatively at 30).

The technical foundation is above average for a one-person site: static HTML, canonicals, a sitemap, JSON-LD, clean 301s, AI-crawler-friendly robots.txt and llms.txt. What holds it back is **targeting and proof**. Pages target broad or mixed intents, two pages compete for "photo editing", the 90 blog posts barely link to the money pages, and there is no visual or review evidence for Google or buyers to reward.

### Top 10 issues
| # | Issue | Area |
|---|---|---|
| 1 | **Homepage targets nothing specific.** Title: "Photo Editing, Web Development & Fashion Design · iamharinda" | On-page |
| 2 | **Cannibalisation:** `/pricing/` (bulk "photo editing & colour correction") vs `/photo-editing/` (packages); plus blog pairs (`wedding-photo-editing-cost-2026` vs `photo-editing-pricing-guide`; `is-outsourcing-wedding-photo-editing-actually-worth-it` vs `outsource-wedding-photo-editing-guide`) | Technical / content |
| 3 | **Zero images on service pages and on all 90 posts.** No image search visibility, no rich previews, weak engagement | Content |
| 4 | **Weak internal linking:** each post contains exactly one in-body internal link, and 51 of 90 point to `/contact/` rather than a service page | Internal links |
| 5 | **No dedicated pages for the money keywords** ("wedding photo editing service", "outsource wedding photo editing", "photo culling service") | Keyword / IA |
| 6 | **British spelling for a US-first audience:** "colour correction", "colour grader" in titles, meta and schema (`slogan`, `serviceType`) | On-page |
| 7 | **Thin E-E-A-T signals:** no reviews on-site (the testimonials data is unused), no portfolio, no author bio on posts, no privacy/terms pages | E-E-A-T |
| 8 | **Possible Cloudflare bot blocking** contradicts `robots.txt`, which explicitly allows GPTBot, ClaudeBot and PerplexityBot (the live site returns 403 to automated fetchers) | Technical (*verify*) |
| 9 | **Generic OG images:** the photo, web and fashion pages share one identical image (md5 match), which reads "Colour correction and retouching" even on the web-dev page; all posts use the default | Social / CTR |
| 10 | **Sitemap `lastmod` = build time for all 97 URLs** (`lastmod: new Date()`), so the signal is useless to Google; 0 posts use `updatedDate` | Technical |

### Biggest growth opportunities
1. **Build a wedding photo-editing cluster** around a new `/photo-editing/wedding/` money page. The 39 existing photographer-focused posts are already the cluster; they just need to link into it.
2. **Portfolio + reviews** → image search, higher CTR, higher conversion, and stronger E-E-A-T.
3. **Comparison and "vs" content** (human editor vs AI editing tools, Fiverr vs editing companies, cost per photo) where small sites can rank for high-intent long-tail queries.
4. **The free tools on premiumphotoedits.com** as a link-earning engine that feeds iamharinda.com (§9).

---

## 2. Technical SEO

| Check | Status | Evidence | Recommendation |
|---|---|---|---|
| **Crawlability** | ✅ | Static HTML, all content in source; no JS-dependent links | — |
| **Bot access at the CDN** | ⚠️ *verify* | The live site returns 403 to automated fetchers; premiumphotoedits.com's robots.txt refuses the audit fetcher (pattern matches Cloudflare's managed "block AI bots" rules) | Cloudflare → Security → Bots and AI Crawl Control: allow verified search bots (always), and decide on AI crawlers to match `robots.txt` intent. Confirm Googlebot gets 200 with GSC → URL Inspection → Live test. |
| **robots.txt** | ✅ | `Allow: /` for all; named AI bots; `Sitemap: https://www.iamharinda.com/sitemap-index.xml` | Fine. The per-bot groups are redundant but harmless. |
| **XML sitemap** | ⚠️ | 97 URLs (7 core + 90 posts); `/orbitra/` correctly excluded while draft; `changefreq`/`priority` constant; `lastmod` = build date | Per-URL `lastmod` from `updatedDate ?? publishDate` (code below). Drop `changefreq`/`priority` (Google ignores them). |
| **Indexability** | ✅ | `index, follow, max-image-preview:large, max-snippet:-1` on public pages; `noindex` on 404 and Orbitra drafts | Verify the index count in GSC → Pages (expect ~97) |
| **Canonicals** | ✅ | Self-referencing absolute canonicals with trailing slash on all audited pages | Keep |
| **Host / HTTPS redirects** | ✅ | `.htaccess` → single 301 to `https://www.` + `X-Robots-Tag: noindex` on any other host (folds the old `iamharinda-com.preview-domain.com`) | In GSC, check the preview host is out of the index (`site:preview-domain.com iamharinda`) |
| **Legacy redirects** | ✅ | `/wedding-photo-editing/`, `/custom-web-development/`, `/apparel-pattern-tech-packs/` → 301 | When `/photo-editing/wedding/` launches, retarget `/wedding-photo-editing/` there (Report 2 §10) |
| **Broken links** | ✅ (internal) | All internal hrefs in the crawl resolve to built pages; anchors `/pricing/#photo-editing`, `/photo-editing/#pricing` exist | Add `lychee` to CI |
| **Duplicate content** | ⚠️ | Same FAQ answers in `site.faqs` reused across `/pricing/` and `llms.txt`; two pricing ladders; near-duplicate blog pairs (Issue #2) | Consolidate (§5.2) |
| **URL structure** | ⚠️ | Clean and lowercase, but flat: no `/photo-editing/wedding/` hierarchy; `/fashion-designing/` mismatches the content | Hierarchical service URLs (§2.6) |
| **Mobile-friendliness** | ✅ | Responsive; 17 px body; no overflow at 390 px | Tap targets → Report 1 §6 |
| **Core Web Vitals** | *estimate* | LCP ~1.8–2.6 s (H1 hidden until JS), INP risk from WebGL, CLS < 0.05 | Verify in PSI / GSC CWV; fixes in Report 2 §3 |
| **JS rendering** | ⚠️ minor | Split-text H1 is rebuilt by JS; text exists in the HTML, so Google sees it | Remove split-text (LCP) |
| **Hreflang** | N/A | English only | §10 |
| **Image SEO** | ❌ | 0 content images on service pages and posts | §5 |
| **Structured data** | ✅/⚠️ | WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, Person, BlogPosting present; BlogPosting lacks `image`; `sameAs` only Fiverr | §7 |
| **HTTPS / security** | ⚠️ | No HSTS | Report 2 §4 |

### 2.1 Sitemap fix (`astro.config.mjs`)
```js
import { getPostDates } from "./src/lib/post-dates.mjs"; // map: "/blog/slug/" -> ISO date, built from frontmatter
sitemap({
  filter: (page) => !page.endsWith("/404/") && !(orbitraStudio.draft && page.includes("/orbitra/")),
  serialize(item) {
    const path = new URL(item.url).pathname;
    const d = getPostDates()[path];
    if (d) item.lastmod = d;          // real per-post date
    else delete item.lastmod;         // core pages: omit rather than lie
    delete item.changefreq; delete item.priority;
    return item;
  },
}),
```

### 2.6 URL decision: `/fashion-designing/`
- **Finding:** The URL and nav say "fashion designing"; the page sells polo and golf shirt graphic and print-pattern design.
- **Evidence:** H1 "Polo Shirt Pattern Design and Mockups, Print-Ready"; your own post `/blog/pattern-design-vs-patternmaking-difference/` explains the distinction.
- **Impact:** "Fashion designing" queries are dominated by courses, careers and garment design (*informational*, wrong audience).
- **Recommendation:** Check GSC → Performance → Pages → `/fashion-designing/`. If it has <20 clicks per 3 months (*likely*, *verify*), 301 it to `/polo-shirt-design/`. Otherwise keep the URL and change the title, H1 and nav label only.

---

## 3. On-Page SEO

Character counts as rendered. Brand suffix recommendation: **"| Harinda Fernando"** (a real person ranks and earns trust better than the lowercase handle "iamharinda").

### 3.1 Home `/`
| Element | Current | Optimised |
|---|---|---|
| Title | Photo Editing, Web Development & Fashion Design · iamharinda (60) | **Wedding & Portrait Photo Editing, Hand-Edited \| Harinda** (55) |
| Meta | Harinda Fernando runs three services from Sri Lanka for clients in the US, Canada and Europe: photo editing, custom web development, and fashion designing. (155) | **Outsource your wedding and portrait editing to a human editor. Lightroom, no AI, from $0.20 a photo. 3 free sample edits, pay after you approve.** (144) |
| H1 | One person. Photo editing, web builds, and fashion designing. | **Hand-edited wedding & portrait galleries, back on your deadline** |
| H2s | Four things I do. One line each. / Clients, worldwide. / Not sure which you need? | See the work · How outsourced editing works · Pricing per photo · What photographers say · Meet your editor · Also from Harinda: web development & polo design · FAQ |

### 3.2 Photo editing `/photo-editing/`
| Element | Current | Optimised |
|---|---|---|
| Title | Photo Editing for Photographers \| Harinda Fernando (50) | **Photo Editing Services for Photographers — Lightroom, No AI** (59) |
| Meta | Professional Lightroom editing for wedding, portrait and headshot photographers. No AI, hand-edited on a Calman-verified monitor. Packages from $10. (148) | **Hand-edited Lightroom photo editing for wedding, portrait and event photographers. Color correction, culling, retouching. From $10 per 50 photos.** (145) |
| H1 | Photo Editing That Looks Like You Edited It | **Photo Editing Services for Professional Photographers** (keep "…looks like you edited it" as the subhead) |
| H2s | Every order, every package. / From style reference to finished gallery. / Three packages… / Beyond weddings. / Frequently asked questions / Ready to elevate your images? | What's included in every edit · Before & after examples · Photo editing prices · Turnaround times · Genres we edit (→ child pages) · How to send your files · Reviews · FAQ |

### 3.3 New `/photo-editing/wedding/` (primary money page)
| Element | Optimised |
|---|---|
| Title | **Wedding Photo Editing Service — Outsource Your Editing** (54) |
| Meta | **Outsource wedding photo editing to a hand-editing Lightroom pro. Your style matched, culling available, 2–4 day turnaround, from $0.20 per image.** (145) |
| H1 | **Wedding Photo Editing Service, Hand-Edited in Lightroom** |
| H2s | Before & after wedding edits · Styles I match (light & airy, moody, film, classic) · Culling + editing · Wedding editing prices · Turnaround for a full wedding · Sending your Lightroom catalog · Reviews from wedding photographers · Wedding editing FAQ |

### 3.4 Pricing `/pricing/`
| Element | Current | Optimised |
|---|---|---|
| Title | Pricing · iamharinda (20) | **Photo Editing Prices per Image, Web & Design Rates** (51) |
| Meta | What each service costs: photo editing from $10, web development from $750, fashion designing from $10. All prices in USD. (122) | **Photo editing from $0.20 per image, with no deposit and pay after approval. Custom websites from $750, polo shirt design from $10. All prices in USD.** (149) |
| H1 | What everything costs. | **Prices for Photo Editing, Web Development & Polo Design** |
| H2s | Flat rates. Paid after delivery. / Free sample edit / What is always in the price. / However works for you. / How to place an order. | Photo editing prices (summary → link) · Web development prices · Polo design prices · Order direct vs on Fiverr · Payment methods · Pricing FAQ |

### 3.5 Web development `/web-development/`
| Element | Current | Optimised |
|---|---|---|
| Title | Custom Web Development \| Harinda Fernando (41) | **Custom Small Business Websites — No WordPress, No Builders** (59) |
| Meta | Custom-coded websites and web apps for small businesses. No WordPress, no page builders. Fixed-price projects from $750, with the code handed over to you. (154) | Keep (good). Optionally add "fast-loading" and "you own the code". |
| H1 | Custom Web Development – No WordPress, No Page Builders | **Custom Website Development — Fast, Hand-Coded, Yours to Keep** |
| H2s | Four kinds of project. / Scope call to handover. / Fixed price… / Why not WordPress? / FAQ / Get a fixed-price quote | Websites I build · Recent projects (case studies) · Process · Fixed prices · Why not WordPress · FAQ |

### 3.6 Polo design `/fashion-designing/` → `/polo-shirt-design/`
| Element | Current | Optimised |
|---|---|---|
| Title | Fashion Designing — Polo & Golf Patterns \| Harinda Fernando (59) | **Custom Polo & Golf Shirt Design — Print-Ready Patterns** (54) |
| Meta | Polo and golf shirt pattern design with realistic mockups, built in Adobe Illustrator and Photoshop. Unlimited revisions, packages from $10. (140) | **Custom polo and golf shirt designs with front/back mockups and print-ready AI, PDF and PNG files. Sublimation-ready patterns from $10.** (134) |
| H1 | Polo Shirt Pattern Design and Mockups, Print-Ready | **Custom Polo & Golf Shirt Design with Print-Ready Patterns** |

### 3.7 About `/about/`
| Element | Current | Optimised |
|---|---|---|
| Title | About Harinda Fernando · iamharinda (35) | **About Harinda Fernando — Photo Editor & Web Developer** (53) |
| Meta | (153, fine) | **Meet Harinda Fernando: a former photographer turned full-time Lightroom editor and web developer, working with photographers in the US, UK and Europe.** (150) |
| H1 | One person. Three things, done properly. | **Hi, I'm Harinda — the person who edits your photos** |

### 3.8 Contact `/contact/`
| Title | Contact · iamharinda (20) → **Contact Harinda — Free Sample Edit or Quote** (43) |
|---|---|
| H1 | Tell me about the project. → **Contact & free sample requests** |

### 3.9 Blog `/blog/` and posts
| Element | Current | Optimised |
|---|---|---|
| Blog title | Blog · iamharinda (17) | **Photo Editing & Wedding Workflow Blog \| Harinda Fernando** (56) |
| Blog H1 | Notes on photo editing, web builds and pattern design. | **Guides for photographers, small businesses & apparel brands** + category tabs |
| Post titles | Full H1 + " · iamharinda", up to **96 chars** (e.g. "How Much Does Wedding Photo Editing Cost in 2026? A Pricing Guide for Photographers · iamharinda") | Add an optional `seoTitle` (≤ 60): **"Wedding Photo Editing Cost in 2026: Per-Photo Prices"** (52) |

### 3.10 Spelling localisation ⚡
Your target buyers are US-first. Use **American spelling in titles, meta, H1/H2 and schema** ("color correction", "color grading", "catalog"). British spelling can stay in long-form body copy if you prefer, but US is recommended for consistency. Files to change: `site.js` (`tagline`, `description`, `personTitles`, `services`), `schema.js` (`slogan`), page meta.

---

## 4. Keyword Strategy

> **Volumes and difficulty are not measured** (no keyword tool access). The *Relative demand* column is the auditor's judgement. **Verify** with Google Keyword Planner (free), Ahrefs/Semrush, or GSC impressions once the pages exist.

### 4.1 Keyword groups by intent

**Transactional (money pages)**
| Keyword | Relative demand (*est.*) | Difficulty (*est.*) | Target page |
|---|---|---|---|
| wedding photo editing service | Medium | Medium–High | `/photo-editing/wedding/` |
| outsource wedding photo editing | Medium | Medium | `/photo-editing/wedding/` |
| wedding photo editing services for photographers | Low–Med | Medium | `/photo-editing/wedding/` |
| lightroom editing service | Low–Med | Medium | `/photo-editing/` |
| photo editing services for photographers | Medium | High | `/photo-editing/` |
| photo culling service | Low | Low–Med | `/photo-editing/culling/` |
| wedding photo culling and editing | Low | Low | `/photo-editing/culling/` |
| headshot retouching service | Medium | Medium | `/photo-editing/portrait-headshot/` |
| portrait retouching service | Medium | High | `/photo-editing/portrait-headshot/` |
| bulk photo editing service | Low–Med | Medium | `/photo-editing/` |
| free sample photo editing | Low | Low | `/free-sample/` |
| custom polo shirt design / golf polo design service | Low–Med | Medium | `/polo-shirt-design/` |
| custom website developer for small business | Medium | High | `/web-development/` |

**Commercial investigation**
| Keyword | Target |
|---|---|
| wedding photo editing cost / price per photo | `/blog/wedding-photo-editing-cost-2026/` (merge in the pricing guide) |
| best wedding photo editing company | NEW: "Best Wedding Photo Editing Services Compared (2026)" |
| AI photo editing vs human editor (wedding) | `/blog/ai-vs-human-photo-editing/` (expand) |
| Imagen vs Aftershoot vs human editor | NEW comparison post |
| is outsourcing photo editing worth it | merge the two outsourcing posts |
| Fiverr photo editor vs editing company | NEW post |

**Informational (cluster support)**
| Keyword | Target (existing post unless NEW) |
|---|---|
| how to color grade wedding photos in lightroom | `color-grade-wedding-photos-lightroom-guide` |
| how to fix mixed lighting lightroom | `fix-mixed-lighting-white-balance-lightroom` |
| lightroom classic vs lightroom for wedding photographers | existing |
| wedding photo culling tips | `wedding-photo-culling-guide` |
| how long does wedding photo editing take | existing |
| how to send lightroom catalog to editor / smart previews | NEW → `/photo-editing/how-to-send-files/` |
| light and airy lightroom editing | NEW |
| moody wedding editing lightroom | NEW |

### 4.2 Long-tail opportunities (low competition, high intent; *estimates*)
- "wedding photo editing service usa"
- "outsource lightroom editing for wedding photographers"
- "editor who matches my lightroom preset"
- "wedding photo editing 2 day turnaround"
- "photo editing pay after delivery"
- "hand edited wedding photos no ai"
- "real estate photo editing per image" (only if you want that genre)
- "sneak peek wedding photo editing service"

### 4.3 Keyword-to-page map

| Page | Primary keyword | Secondary keywords |
|---|---|---|
| `/` | wedding & portrait photo editing service | outsource photo editing, human photo editor, lightroom editing service |
| `/photo-editing/` | photo editing services for photographers | lightroom editing service, bulk photo editing, color correction service |
| `/photo-editing/wedding/` | wedding photo editing service | outsource wedding photo editing, wedding editing for photographers, wedding culling |
| `/photo-editing/portrait-headshot/` | headshot retouching service | portrait retouching, skin retouching natural |
| `/photo-editing/culling/` | photo culling service | wedding culling and editing |
| `/photo-editing/how-to-send-files/` | how to send lightroom catalog to editor | smart previews outsourcing, send RAW files to editor |
| `/work/` | wedding photo editing before and after | lightroom before after examples |
| `/free-sample/` | free sample photo editing | free test edit |
| `/pricing/` | photo editing prices per image | wedding editing price list |
| `/web-development/` | custom website development small business | no wordpress website, hand-coded website |
| `/polo-shirt-design/` | custom polo shirt design | golf polo design, sublimation polo pattern |
| `/about/` | Harinda Fernando photo editor | (brand) |

---

## 5. Content Audit & Strategy

### 5.1 Inventory (90 posts, 17 Dec 2025 → 17 Sep 2026, ~1 post / 3 days)

| Cluster | Posts | Words (median) | Notes |
|---|---|---|---|
| Photographers (editing, Lightroom, backup, gear, business) | **39** | ~1,060 | The right audience for the money service. Gear and backup posts (drives, SD cards, camera bag) are top-of-funnel and loosely related. |
| Small business websites | 31 | ~1,060 | Supports `/web-development/`; buyers are non-technical owners |
| Apparel / pattern design | 20 | ~1,060 | Supports the polo page |

Word count range: 545–1,174. Images: **0**. In-body internal links: **exactly 1 per post** (51 → `/contact/`, 24 → `/pricing/#photo-editing`, 23 → `/web-development/`, 17 → `/fashion-designing/#pricing`; counts include CTA links in the body). `updatedDate`: 0 posts.

**Quality note.** The posts read cleanly, but uniform length, uniform structure, a fixed 3-day cadence, no images and no first-hand artefacts (screenshots, before/afters, real gallery numbers) is the pattern Google's helpful-content and scaled-content systems are designed to discount. **Adding first-hand evidence to the top posts matters more than publishing more posts.**

### 5.2 Consolidation (cannibalisation fixes)
| Merge from | Into (keep URL) | Action |
|---|---|---|
| `photo-editing-pricing-guide` | `wedding-photo-editing-cost-2026` → retitle "Photo Editing Prices per Image in 2026 (Wedding, Portrait, Bulk)" | Merge content, 301 the old URL |
| `is-outsourcing-wedding-photo-editing-actually-worth-it` | `outsource-wedding-photo-editing-guide` | Merge, 301 |
| `can-you-trust-an-editor-youve-never-met` + `what-if-you-dont-like-the-edited-photos-you-get-back` | Keep both, but link each to `/reviews/` and `/terms/` (revision policy) | Differentiate |

### 5.3 Upgrade the top 15 photographer posts (Phase 2)
For each: a hero before/after from your own work, 1–2 Lightroom screenshots, 3+ contextual links (one to `/photo-editing/wedding/`, two to sibling posts), an author card, `updatedDate`, a unique OG image. Priority list: color-grade guide, mixed lighting, culling guide, Lightroom workflow, presets vs custom, consistent style, outsourcing guide, cost guide, AI vs human, turnaround, sneak peek, skin retouching, batch editing, masking, Classic vs Lightroom.

### 5.4 Content gaps vs competitors
- **FixThePhoto** shows extensive before/after sets, per-genre service pages (portrait, wedding, real estate, product…), a free trial, free presets and tutorials. **Gaps here:** genre pages, examples, free resources.
- **Signature Edits** wins photographer attention with free presets, RAW practice files, a "Join the Tribe" email list and SEO courses. **Gaps here:** a lead magnet and an email list.
- **Fiverr gigs** (*not fetched; general observation*): before/after thumbnails, package tables and review counts up front. **Gap here:** all three are missing on-site.

### 5.5 Topic clusters
```
PILLAR: /photo-editing/wedding/  (money page)
 ├─ Outsourcing: outsource guide · cost guide · AI vs human · second shooter vs outsourcing · Fiverr vs company (NEW) · best services compared (NEW)
 ├─ Workflow: Lightroom workflow · culling guide · sneak peek · batch editing · presets vs custom · how to send files (NEW)
 ├─ Style: color grade guide · light & airy (NEW) · moody (NEW) · film look (NEW) · B&W conversion (NEW) · consistent style
 └─ Fixes: mixed lighting · skin retouching · masking · common mistakes · RAW vs JPEG
PILLAR: /web-development/ → cost · timeline · ownership · builder vs custom · ongoing costs …
PILLAR: /polo-shirt-design/ → brief · file formats · sublimation vs embroidery · mockups …
```

### 5.6 3-month content calendar (Oct–Dec 2026; 2 posts/month new + 2 upgrades/month)

| Week | Type | Title | Target keyword | Links to |
|---|---|---|---|---|
| Oct W1 | NEW | How to Send Your Lightroom Catalog to an Editor (Smart Previews, RAW Links, Presets) | how to send lightroom catalog to editor | `/photo-editing/how-to-send-files/`, wedding page |
| Oct W2 | UPGRADE | Merge → "Photo Editing Prices per Image in 2026 (Wedding, Portrait, Bulk)" | photo editing price per image | `/pricing/`, wedding page |
| Oct W3 | NEW | Human Editor vs Imagen vs Aftershoot: What Wedding Photographers Actually Get | imagen vs aftershoot vs human editor | wedding page, `/free-sample/` |
| Oct W4 | UPGRADE | Merge → "How to Outsource Wedding Photo Editing Without Losing Your Style" | outsource wedding photo editing | wedding page |
| Nov W1 | NEW | Light and Airy Wedding Edits in Lightroom: Settings, Mistakes, Before/After | light and airy lightroom | `/work/`, wedding page |
| Nov W2 | UPGRADE | Color Grade Wedding Photos in Lightroom (add 6 real before/afters) | how to color grade wedding photos | wedding page |
| Nov W3 | NEW | Fiverr Photo Editor vs Editing Company vs Freelancer: An Insider's Comparison | fiverr photo editor vs company | `/pricing/` (Fiverr vs Direct) |
| Nov W4 | UPGRADE | Wedding Photo Culling Guide (add a culling checklist PDF) | wedding photo culling | `/photo-editing/culling/` |
| Dec W1 | NEW | Moody Wedding Editing in Lightroom: How to Go Dark Without Muddy Skin | moody wedding edit lightroom | `/work/` |
| Dec W2 | UPGRADE | Fix Mixed Lighting & White Balance (add reception before/afters) | fix mixed lighting lightroom | wedding page |
| Dec W3 | NEW | Off-Season Checklist: Clear Your Wedding Editing Backlog Before January | wedding editing backlog | wedding page, `/free-sample/` |
| Dec W4 | NEW | Best Wedding Photo Editing Services Compared (2026): Price, Turnaround, Style Matching | best wedding photo editing services | wedding page |

Pause new web-dev and apparel posts for this quarter (31 + 20 already exist). Focus on the cluster that drives orders.

---

## 6. E-E-A-T & Trust

| Signal | Current | Recommendation |
|---|---|---|
| **Experience** | Claims ("former photographer", calibrated ASUS ProArt, Lightroom Classic) in text only | Photos of your actual setup; before/after case studies with a problem → fix narrative; a short screen-recording of editing |
| **Expertise** | 39 photographer posts, no author box | Author card on every post (photo, 2-line bio, years editing, number of galleries edited, link to `/about/`); a `Person` node with `sameAs` |
| **Authoritativeness** | No external mentions known (*verify* backlinks in Ahrefs Webmaster Tools, free) | Guest posts, podcasts, photographer communities (§9) |
| **Trust: reviews** | 4.9★ / 183 Fiverr reviews mentioned once, 6 testimonials unused | `/reviews/` with verbatim quotes, dates, countries and links to the Fiverr profile; review bar sitewide. **Don't add `aggregateRating` schema for these** (third-party reviews on your own business aren't eligible and are against Google's self-serving review guidelines) |
| **Trust: policies** | No privacy policy, terms, or revision/refund policy for the main site | `/privacy/`, `/terms/` (incl. revision policy, file retention and deletion, confidentiality, client image usage rights) |
| **Trust: contact** | WhatsApp (+44), two emails, no address | Keep hello@ only; state "Studio in Sri Lanka; UK WhatsApp number; replies within 1 business day" |
| **Consistency** | Contradictory turnaround and package facts (Report 1 §1) | One source of truth |
| **Fiverr identity** | Footer links `fiverr.com/iamharinda`; a code comment references `fiverr.com/users/oleezax/portfolio` | Confirm which username is live; use one everywhere (site, schema `sameAs`, social bios) |

---

## 7. Structured Data (Schema)

**Keep:** WebSite, BreadcrumbList, FAQPage (note: since 2023 Google shows FAQ rich results only for authoritative government and health sites, so keep it for AI answer engines and Bing, not for Google SERP features), Person, BlogPosting.
**Fix:** use one `@graph` per page with stable `@id`s; add `image` to BlogPosting; add `sameAs` profiles; use US spelling; one Offer per real package.

### 7.1 Site-wide graph (Home)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.iamharinda.com/#website",
      "url": "https://www.iamharinda.com/",
      "name": "Harinda Fernando — Photo Editing",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://www.iamharinda.com/#business" }
    },
    {
      "@type": "Person",
      "@id": "https://www.iamharinda.com/#harinda",
      "name": "Harinda Fernando",
      "jobTitle": "Photo editor and web developer",
      "url": "https://www.iamharinda.com/about/",
      "image": "https://www.iamharinda.com/images/harinda-portrait.webp",
      "sameAs": [
        "https://www.fiverr.com/iamharinda",
        "https://www.linkedin.com/in/REPLACE",
        "https://www.instagram.com/REPLACE",
        "https://github.com/REPLACE"
      ],
      "knowsAbout": ["Wedding photo editing", "Adobe Lightroom Classic", "Color correction", "Photo culling", "Web development"]
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.iamharinda.com/#business",
      "name": "Harinda Fernando Photo Editing",
      "alternateName": "iamharinda",
      "url": "https://www.iamharinda.com/",
      "logo": "https://www.iamharinda.com/brand/logo-512.png",
      "image": "https://www.iamharinda.com/og/og-default.jpg",
      "description": "Hand-edited wedding and portrait photo editing for professional photographers. Lightroom, no AI, pay after approval.",
      "email": "hello@iamharinda.com",
      "founder": { "@id": "https://www.iamharinda.com/#harinda" },
      "address": { "@type": "PostalAddress", "addressCountry": "LK" },
      "areaServed": ["US", "GB", "CA", "AU", "EU"],
      "priceRange": "$10–$100",
      "sameAs": ["https://www.fiverr.com/iamharinda"]
    }
  ]
}
```

### 7.2 Service + Offers (`/photo-editing/wedding/`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.iamharinda.com/photo-editing/wedding/#service",
  "name": "Wedding photo editing",
  "serviceType": "Wedding photo editing",
  "provider": { "@id": "https://www.iamharinda.com/#business" },
  "areaServed": ["US", "GB", "CA", "AU", "EU"],
  "url": "https://www.iamharinda.com/photo-editing/wedding/",
  "offers": [
    { "@type": "Offer", "name": "50 images", "price": "10.00", "priceCurrency": "USD", "url": "https://www.iamharinda.com/photo-editing/wedding/#pricing" },
    { "@type": "Offer", "name": "200 images", "price": "40.00", "priceCurrency": "USD", "url": "https://www.iamharinda.com/photo-editing/wedding/#pricing" },
    { "@type": "Offer", "name": "500 images", "price": "100.00", "priceCurrency": "USD", "url": "https://www.iamharinda.com/photo-editing/wedding/#pricing" }
  ]
}
```
(Use the final, unified package ladder from Report 1.)

### 7.3 BlogPosting with image and author
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Color Grade Wedding Photos in Lightroom (A Practical Guide)",
  "description": "…",
  "image": ["https://www.iamharinda.com/_astro/color-grade-hero.1200.webp"],
  "datePublished": "2026-03-20T00:00:00Z",
  "dateModified": "2026-11-12T00:00:00Z",
  "author": { "@id": "https://www.iamharinda.com/#harinda" },
  "publisher": { "@id": "https://www.iamharinda.com/#business" },
  "mainEntityOfPage": "https://www.iamharinda.com/blog/color-grade-wedding-photos-lightroom-guide/",
  "about": { "@id": "https://www.iamharinda.com/photo-editing/wedding/#service" }
}
```

### 7.4 Portfolio item (`/work/`)
```json
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://www.iamharinda.com/_astro/reception-mixed-light-after.1600.webp",
  "name": "Wedding reception — mixed tungsten and LED light corrected",
  "description": "After: neutral skin and white dress under mixed venue lighting, edited in Lightroom Classic.",
  "creator": { "@id": "https://www.iamharinda.com/#harinda" },
  "creditText": "Edited by Harinda Fernando",
  "copyrightNotice": "Photo © the original photographer; edit by Harinda Fernando"
}
```

### 7.5 `schema.js` changes
- `professionalService()`: replace the `["ProfessionalService","Service"]` type array with `ProfessionalService`; add `logo`; switch `slogan` and `serviceType` to US spelling.
- `blogPosting()`: add `image` from `heroImage`, `author` by `@id` reference.
- Remove `nationality` from `person()` (not needed; country lives in the business address).

---

## 8. Internal Linking

**Current issues**
1. One in-body link per post; 51 posts send their only link to `/contact/` (a page with no ranking value).
2. No related-post module; no category pages; no breadcrumbs on-page (they exist only in JSON-LD).
3. Service pages don't link to any blog content.
4. Anchor text is generic ("free sample edit", "pricing").
5. Footer links "Wedding photo editing" → `/photo-editing/` and "Photo editing" → `/pricing/#photo-editing`. The anchors teach Google the wrong page-to-topic mapping.

**Plan**
| Rule | Implementation |
|---|---|
| Every photographer post links to `/photo-editing/wedding/` with a descriptive anchor in the first 30% of the body | e.g. "if you'd rather **outsource your wedding photo editing**, here's how I handle it" |
| 2–3 contextual links to sibling posts in the same cluster | Manual for the top 15; then a `related` frontmatter field |
| Related posts (3) at the end of each post | Same `category`, newest first |
| Service pages link to 3–5 supporting guides | "Guides for wedding photographers" block on the wedding page |
| Visible breadcrumbs | `Home › Photo editing › Wedding` |
| Fix footer anchors | "Wedding photo editing" → `/photo-editing/wedding/`; "Photo editing services" → `/photo-editing/` |
| Category CTA | Photo posts → free sample; web posts → quote; apparel posts → design brief |

Target: each money page receives **≥ 20 contextual internal links** within 60 days (measure with Screaming Frog → Inlinks).

---

## 9. Off-Page SEO & Link Building

> Current backlink profile **unknown**. Check it free with Ahrefs Webmaster Tools (verify via GSC) and Bing Webmaster Tools → Backlinks.

**Realistic white-hat tactics for a solo photo editor**

| Tactic | How | Effort | Expected value |
|---|---|---|---|
| **Profile and citation links** | Behance and Dribbble portfolio (before/afters), LinkedIn, Instagram, Pinterest (before/after pins → `/work/`), Fiverr profile "website" field, GitHub (web dev), Clutch/GoodFirms profile for web dev | Low | Entity signals + `sameAs`; small link value |
| **Free tools on premiumphotoedits.com** (already planned) | Each tool (passport photo maker, resizer, product photo checker…) earns links from forums, Reddit and resource pages. Add a contextual "Need a professional edit? → iamharinda.com/photo-editing/" link and footer credit on every tool | Med | **Highest link-earning potential.** Keep one clear funnel; don't duplicate photo-editing service pages on both domains (they would compete for the same keywords) |
| **Free resource for photographers** | "Wedding Gallery Editing Brief" template + "Lightroom culling checklist" PDF; pitch to wedding-photography blogs and Facebook groups | Med | Links + email list |
| **Guest posts / expert quotes** | Pitch "outsourcing editing" and "color grading mixed light" articles to wedding-photography education blogs and photography podcasts; answer journalist requests via Qwoted / Featured / HARO-style platforms | Med | Authority links |
| **Communities** | Genuinely helpful answers (with before/afters) in r/WeddingPhotography and r/Lightroom (*observe self-promotion rules*), Facebook wedding-photographer groups, ShootDotEdit-style forums | Med | Referral traffic, brand mentions |
| **Case-study swaps** | With repeat photographer clients: "How [Studio] cut editing time" case study on your site; they link from their "workflow" or "vendors" page | Low | Relevant, trusted links |
| **Web-dev portfolio credits** | "Site by Harinda" footer credit (nofollow is fine) on sites you build | Low | Referral + entity |

**Avoid:** buying links, PBNs, mass directory submissions, link exchanges with unrelated sites.

---

## 10. Local / International SEO

- **Google Business Profile: not recommended.** GBP requires in-person contact with customers (a storefront or service-area visits). An online-only editing service doesn't qualify and risks suspension.
- **Language and hreflang:** single English version; no hreflang needed. Set `<html lang="en-US">` if you adopt US spelling (currently `lang="en"`, which is fine either way). `og:locale` is already `en_US`.
- **Target country:** GSC no longer has a country-targeting setting; signals come from content. Use USD pricing (already), US spelling, time-zone overlap copy ("replies by US morning"), and US/UK/AU client reviews.
- **Areas served copy:** currently "United States, Canada and Europe", while your client map shows the UK, Australia and New Zealand too. Update to **"US, UK, Canada, Europe and Australia"** in `site.areasServed` and `areaServed` schema (ISO codes `US, GB, CA, AU, EU`).
- **Bing:** already verified (`msvalidate.01`). Submit the sitemap there; Bing powers several AI answer engines.

---

## 11. Competitor Analysis

| | FixThePhoto | Signature Edits | Fiverr gigs (editing) | **iamharinda.com (now)** |
|---|---|---|---|---|
| Model | Retouching company, 90+ retouchers, since 2003 | Presets, templates, courses (not an editing service) | Marketplace sellers | One-person editor |
| Hero | "Photo Retouching Services \| Professional Photo Editing" | "Kickass Presets & Marketing Tools For Photographers" | Before/after thumbnail | "One person. Photo editing, web builds, and fashion designing." |
| Pricing shown | Per image by genre: wedding **$0.25**, portrait $6, real estate $1.50 | $35–$97 products | Package tiers | $0.20/photo (but in two conflicting ladders) |
| Proof | 11+ before/after sets; "2M+ orders", "70 countries"; testimonials | "201k community", 2,294+ reviews, 4.7–4.8★ | Review count + stars at top | None rendered on-site |
| Free entry offer | "Try for free" | Free presets and RAW files | — | Free sample (only on `/pricing/` + posts) |
| Content | Blog, YouTube, free presets/actions, app | Tutorials, freebies, SEO course | — | 90 posts, no images |

**How to outrank and out-convert them**
1. **Be the human alternative.** FixThePhoto is a factory; you're "the person who edits your photos". Lead with your face, your setup and your name on every page.
2. **Price advantage, shown honestly:** $0.20/photo hand-edited vs $0.25 at the market leader. Put this on a comparison page (don't name competitors in ads).
3. **Out-specialise on long-tail:** genre and style pages (light & airy, moody, film; culling) that big competitors cover with one generic page.
4. **Proof parity:** 12–18 before/afters plus a review page closes the biggest gap in weeks, not years.
5. **Borrow Signature Edits' playbook:** a free resource + email list for photographers, which drives repeat business.

---

## 12. Measurement Setup

| Tool | Status | Action |
|---|---|---|
| **Google Search Console** | Verified (DNS, Domain property, per `site.js`) | Submit `sitemap-index.xml`; set up page groups (money pages, posts); enable email alerts |
| **GA4** `G-QP1FK83BL2` | Installed, **no consent** | Consent Mode v2; mark key events: `generate_lead` (sample form), `contact_submit`, `whatsapp_click`, `fiverr_click`, `email_click`; link GA4 ↔ GSC |
| **Microsoft Clarity** `un99vlx16e` | Installed, no consent | Load after consent; use heatmaps on Home and `/photo-editing/wedding/` |
| **Bing Webmaster Tools** | Verified | Submit the sitemap; use IndexNow (Cloudflare "Crawler Hints" sends it automatically) |
| **Cloudflare Web Analytics** | — | Cookieless baseline that isn't affected by consent denials |
| **Rank tracking** | — | Free: GSC query filters. Paid: Ahrefs Webmaster Tools (free tier) or SE Ranking for the 20 keywords in §4 |

**GA4 click tracking snippet (vanilla)**
```html
<script>
document.addEventListener('click', (e) => {
  const a = e.target.closest('a'); if (!a || typeof gtag !== 'function') return;
  const h = a.href;
  if (h.includes('wa.me/'))        gtag('event', 'whatsapp_click', { link_url: h, page_path: location.pathname });
  else if (h.includes('fiverr.com')) gtag('event', 'fiverr_click',  { link_url: h, page_path: location.pathname });
  else if (h.startsWith('mailto:'))  gtag('event', 'email_click',   { page_path: location.pathname });
});
</script>
```

**KPIs**
| KPI | Baseline | 90-day target (*directional*) |
|---|---|---|
| Organic clicks to money pages (GSC) | *verify* | +50% |
| Impressions for "wedding photo editing" queries | *verify* | 3× |
| Avg position, primary money keyword | *verify* | Top 30 → working toward the top 10 |
| Sample requests / month (form + WhatsApp) | *verify* | ≥ 10 |
| Sample → paid order rate | *track manually* | ≥ 30% |
| Referring domains (AWT) | *verify* | +15 relevant |
| CWV pass (mobile) | *verify* | 100% URLs "Good" |

**Reporting cadence:** weekly 15-minute check (GSC clicks and queries, form leads); monthly report (KPIs table, top movers, content shipped, links earned); quarterly strategy review.

---

## 13. 90-Day SEO Roadmap

| Weeks | Focus | Tasks |
|---|---|---|
| **1** (Phase 0) | Quick wins | ⚡ New titles and meta for Home, `/photo-editing/`, `/pricing/`, `/about/`, `/contact/`, `/blog/` · ⚡ US spelling in titles and schema · ⚡ Fix footer anchors · ⚡ Verify Cloudflare bot settings + URL Inspection · ⚡ Sitemap `lastmod` fix · Privacy and terms pages · GA4 key events |
| **2–4** (Phase 1) | Proof + money page | `/work/` with 12–18 before/afters (alt text, ImageObject) · `/free-sample/` · reviews on-site · Home and `/photo-editing/` rewrite · launch `/photo-editing/wedding/` + retarget the `/wedding-photo-editing/` 301 · per-page OG images · Oct content (2 new + 2 merges) |
| **5–8** (Phase 2) | Cluster + links | `/portrait-headshot/`, `/culling/`, `/how-to-send-files/` · categorise the blog, related posts, author card · upgrade the top 8 posts with images and 3+ links each · Behance/LinkedIn/Pinterest profiles + `sameAs` · first free-tool link from premiumphotoedits.com · Nov content |
| **9–12** (Phase 3) | Authority | Lead magnet + outreach to 30 wedding-photography blogs/podcasts · 2 guest posts · case study with a repeat client · upgrade 7 more posts · Dec content · polo URL decision executed (if approved) · 90-day review against the KPIs |

---

## 14. Prioritised Action Plan

| Issue | SEO Impact | Effort | Priority |
|---|---|---|---|
| ⚡ Rewrite the homepage title, meta and H1 around wedding/portrait photo editing | High | Low | P1 |
| ⚡ Rewrite titles and meta for `/photo-editing/`, `/pricing/`, `/about/`, `/contact/`, `/blog/` | High | Low | P1 |
| ⚡ Fix footer anchors and the `/pricing/` vs `/photo-editing/` cannibalisation | High | Low | P1 |
| ⚡ US spelling in titles, meta and schema | Med | Low | P1 |
| ⚡ Verify Cloudflare isn't blocking search/AI bots | High (if blocked) | Low | P1 |
| ⚡ Sitemap real `lastmod` | Low–Med | Low | P2 |
| Launch `/photo-editing/wedding/` (pillar) | High | Med | P1 |
| Portfolio `/work/` with optimised images + ImageObject | High | Med | P1 |
| Reviews on-site + `/reviews/` | High (conversion/E-E-A-T) | Low | P1 |
| Merge the 2 cannibalising blog pairs (301s) | Med | Low | P2 |
| Internal-link pass: 3+ contextual links per photographer post | High | Med | P1 |
| Blog categories, related posts, author card, `updatedDate` | Med | Med | P2 |
| Images + first-hand evidence in the top 15 posts | High | Med | P2 |
| Privacy/terms pages | Med (trust) | Low | P1 |
| Per-page OG images | Low–Med (CTR) | Low | P3 |
| Schema `@graph` refactor + `sameAs` + BlogPosting `image` | Med | Low | P2 |
| New comparison and how-to content (calendar) | Med–High | Med | P2 |
| Link building (profiles, free tools, outreach) | High | Med–High | P2–P3 |
| Polo URL rename (conditional) | Low | Low | P3 |

---

## 15. Top 5 Next Steps

1. **Rewrite the homepage and `/photo-editing/` titles, meta and H1s** to target wedding and portrait photo editing (in US spelling), and fix the footer anchors. This is about 1 hour of work.
2. **Confirm in Cloudflare and GSC URL Inspection** that Googlebot (and the AI crawlers you invite in `robots.txt`) get HTTP 200 rather than a block.
3. **Launch `/photo-editing/wedding/` and `/work/`** with real before/afters, and point the old `/wedding-photo-editing/` 301 at the new page.
4. **Run an internal-linking pass** on the 39 photographer posts: three contextual links each, at least one to the wedding page with a descriptive anchor. Then merge the two cannibalising post pairs.
5. **Set up GA4 key events** (sample form, WhatsApp, Fiverr, email) under Consent Mode v2, and start the monthly KPI report from this baseline.
