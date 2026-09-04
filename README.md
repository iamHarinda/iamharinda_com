# iamharinda.com

Personal business site for a one-person photo editing and colour-correction
service. Built with **Astro** (static output), so every page is real HTML at
build time — readable by Google *and* by AI crawlers (GPTBot, ClaudeBot,
PerplexityBot, Google-Extended) that do not run JavaScript. The build output in
`dist/` is plain static files plus one PHP script, which is all Hostinger
Business shared hosting needs.

- **Stack:** Astro + `@astrojs/sitemap`, hand-written CSS, no Tailwind, no UI kit.
- **JavaScript:** none from a framework. About 1 KB of hand-written vanilla JS
  total — the mobile-menu toggle, the sticky-header shadow, and a scroll-in
  reveal. The FAQ is a native `<details>` disclosure. `@astrojs/react` is still
  installed for the dormant before/after component (see restore notes below) but
  nothing hydrates, so no runtime ships.
- **Server code:** `public/contact.php` only — the one server capability
  Hostinger gives us.
- **Canonical URL:** `https://www.iamharinda.com` (non-www redirects to www).

---

## 1. Run it locally

You need **Node 20 or newer**. Check with `node -v`.

- **macOS:** `brew install node`, or download the LTS installer from
  <https://nodejs.org>.
- **Windows:** the LTS installer from <https://nodejs.org>.
- Anywhere: [`nvm`](https://github.com/nvm-sh/nvm) then `nvm install 20`.

Then, in this folder:

```bash
npm install          # install dependencies (one time)
npm run setup        # download the self-hosted fonts + make placeholder images
npm run dev          # start the dev server
```

Open the URL it prints (usually <http://localhost:4321>).

`npm run setup` is optional but recommended on first run:

- `npm run fetch:fonts` downloads the Fraunces and IBM Plex Sans `woff2` files
  into `public/fonts/`. Without them the site still works — it falls back to
  system fonts. Needs internet access.
- `npm run gen:placeholders` writes neutral-grey placeholder images into
  `public/images/` and `public/og/` so nothing is broken before you add photos.
  **It never overwrites a file that already exists.**

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it |

---

## 2. Add your content

### Business details — one file

Everything editable lives in [`src/data/site.js`](src/data/site.js). Open it and
set these to match your business:

| Value | Where in `site.js` | Notes |
| --- | --- | --- |
| WhatsApp number | `contact.whatsapp` | Digits only, international format, no `+` or spaces. E.g. `14155550123`. Builds all the `wa.me` links. |
| Email address | `contact.email` | The mailbox you create in step 5. |
| Your name / bio | `personName`, and the intro paragraph in `src/pages/about.astro` | Optional but recommended. |
| Real review quotes | `testimonials` | The six seeded quotes are **paraphrased** from your Fiverr reviews and labelled "Verified Fiverr review" — replace them with verbatim wording and reviewer names as you get permission. Do **not** add a rating to the structured data until real named reviews are on the page. |
| Fiverr rating / count | `fiverrStats` | Shown as linked text ("Rated 4.9 on Fiverr over 183 reviews"). Confirm the numbers are current. |
| Free sample wording | `freeSample` | The offer text used in the hero, callouts, CTAs and `llms.txt`. |
| Fiverr URL | `contact.fiverr` | Already set to `fiverr.com/iamharinda`; change if needed. |
| Twitter/X handle | `seo.twitterHandle` | Leave `""` if you have none. |

### Photos

The only photo on the live site right now is the **About page portrait** (see
the next section). The hero before/after slider and the sample gallery are both
removed until there are real images — restore notes for each are below.

When you add before/after images, export them as **WebP**, keep pixel
dimensions close to the `width`/`height` in `site.js` (they set the aspect ratio
and prevent layout shift), aim for < 200 KB each, make each "before" and "after"
line up on the same crop, and write real `alt` text describing the colour
problem in the "before" and the result in the "after".

### Portraits (About page, OG card, structured data)

Full-resolution source portraits live in **`photos-source/`** (committed, but
not deployed). `npm run optimise:photos` turns them into the exact assets the
site uses:

| Output | From | Used by |
| --- | --- | --- |
| `public/images/about-harinda.webp` (1600×1067) | `photos-source/1.webp` | About page lead image |
| `public/images/harinda-portrait.webp` (800×800) | `photos-source/2.webp` | `Person` structured data |
| `public/og/og-default.jpg` (1200×630) | `photos-source/2.webp` | social share card |

To change them: drop new files into `photos-source/` (keep the names, or edit
the paths in `scripts/optimise-photos.mjs`), run `npm run optimise:photos`,
commit. `photos-source/3.webp` and `4.webp` are unused — `4.webp` in particular
is a stylised illustration that reads as AI-generated, which works against the
"human, real photos" positioning, so it is left out.

### Bringing back the hero before/after slider

Removed from `src/pages/index.astro` for now (no real matched pair). To restore:
add `public/images/hero-before.webp` + `hero-after.webp` (the same photo,
unedited vs edited, ~1600×1000), re-import `BeforeAfter` in `index.astro` and
put the `<figure class="hero__figure">…<BeforeAfter client:load variant="hero"
… /></figure>` back inside `<section class="hero">`, re-add the `.hero__figure`
and `.ba--hero` rules to `global.css`, and uncomment the hero block in
`scripts/gen-placeholders.mjs`. The `hero` data in `site.js` is still there.

### Bringing back the sample gallery / `/work/` page

Removed for now because there were only placeholders. To restore once you have
real before/after images: re-add the `{ label: "Work", href: "/work/" }` entry
to `nav` in `site.js`, restore the page with
`git checkout "$(git rev-list -n1 HEAD -- src/pages/work.astro)~1" -- src/pages/work.astro`,
and add a "Sample work" `<section>` back to the home page that maps
`site.samples` through the still-present `<Sample>` component (`[data-reveal]`
gives its images the "develop in" reveal).

### Social share image

Replace `public/og/og-default.jpg` with a real **1200×630** JPG (or let
`npm run gen:placeholders` make a plain one).

### The `llms.txt` file

`public/llms.txt` is a plain-text summary for AI answer engines. It has its own
`TODO` note at the bottom — update the name, WhatsApp link and email to match
`site.js`.

---

## 3. Deploy automatically (GitHub Actions → Hostinger FTP)

### Branches

| Branch | Purpose |
| --- | --- |
| `development` | Default branch. All work, commits and testing happen here. Pushing to it does **not** touch the live site. |
| `live` | Production. Every push to it triggers a build + FTPS upload to Hostinger `public_html`. |

Normal cycle:

```bash
git switch development
# ...make changes, commit, push, check locally with npm run dev / npm run build...

# When you're happy and want it live:
git switch live
git merge --ff-only development   # or: git merge development
git push origin live              # ← this deploys
git switch development            # back to work
```

On every push to `live`, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
builds the site and uploads `dist/` to `public_html` over FTPS. You can also run
it manually from the **Actions** tab (**Run workflow** → pick `live`).

### Get FTP credentials from Hostinger

1. Log in to **hPanel**.
2. Go to **Websites → Manage** for `iamharinda.com`, then **Files → FTP Accounts**.
3. Note the **FTP host** (often `ftp.iamharinda.com` or an IP), the
   **FTP username**, and set/reset the **password**.
   - The account's home directory should be the domain root, so the deploy
     target `public_html/` resolves correctly. If your FTP user lands *inside*
     `public_html` already, change `server-dir:` in the workflow to `./`.

### Add them as GitHub repository secrets

In the GitHub repo: **Settings → Secrets and variables → Actions → New
repository secret**. Add three:

| Secret name | Value |
| --- | --- |
| `FTP_HOST` | the FTP host from Hostinger |
| `FTP_USERNAME` | the FTP username |
| `FTP_PASSWORD` | the FTP password |

Merge `development` into `live` and push `live` (or run the workflow manually
from the **Actions** tab). Watch the run; the last step lists every file
uploaded.

> The workflow uses `dangerous-clean-slate: false`, so it adds and updates files
> but does not delete unrelated ones. Set it to `true` if you ever want the
> server to exactly mirror `dist/`.

---

## 4. Manual deploy (fallback, no GitHub needed)

```bash
npm install
npm run setup
npm run build
```

Then in Hostinger **hPanel → Files → File Manager**:

1. Open `public_html/`.
2. Delete the old site files (keep any mailbox/system files you did not put there).
3. Upload **the contents of `dist/`** — not the `dist` folder itself, its
   contents — into `public_html/`.
4. Confirm `public_html/.htaccess` and `public_html/contact.php` are present
   (`.htaccess` can be hidden — enable "show hidden files" in File Manager).

---

## 5. Create the mailbox and wire up the form

1. In hPanel go to **Emails → Email Accounts** and create
   **`hello@iamharinda.com`** (or another address). Set a password.
2. Open [`public/contact.php`](public/contact.php) and check the top:
   - `$TO` — the mailbox you just created.
   - `$FROM` — an address that exists on the domain (e.g.
     `no-reply@iamharinda.com`; create it, or reuse `hello@`). Some hosts drop
     mail whose `From:` is not a real local address.
3. Redeploy. Submit the form on `/contact/` once and confirm the mail arrives
   (check the spam folder too). On success the page shows a confirmation via the
   `#sent` anchor; on failure it shows the `#error` message pointing people to
   WhatsApp.

If Hostinger's `mail()` proves unreliable, the form's fallback is already on the
page (WhatsApp, Fiverr, direct email), so nothing is lost while you sort it out.

---

## 6. Submit the sitemap to Google

1. Go to **Google Search Console** (<https://search.google.com/search-console>).
2. Add the property **`https://www.iamharinda.com`** (Domain property is best;
   it needs a DNS TXT record, which you add in hPanel under **DNS**).
3. Verify.
4. **Sitemaps** (left menu) → enter `sitemap-index.xml` → **Submit**.
   The full URL is `https://www.iamharinda.com/sitemap-index.xml`, and it is
   already referenced in `public/robots.txt`.
5. Optionally use **URL Inspection** on the home page and "Request indexing".

Repeat step 2–4 in **Bing Webmaster Tools** if you want Bing coverage (it also
feeds some AI answer engines).

---

## Auto-commit hook

`.claude/settings.json` registers a `PostToolUse` hook that runs
`.claude/hooks/auto-commit.sh` after every file write, so each change lands as
its own commit (`auto: <files>`) and any point is easy to step back to with
`git log` / `git checkout`. It never runs during a merge or rebase and never
blocks the edit. To pause it, comment out the `hooks` block in
`.claude/settings.json`; to review or disable it interactively, run `/hooks`.
Squash the `auto:` commits at merge time if you prefer a tidy `live` history
(`git merge --squash development`).

## Atmosphere & motion

The interface stays neutral grey — the depth is all greyscale, and every moving
part is disabled under `prefers-reduced-motion`. It is CSS only (no JS):

- **Film grain** — a fixed, full-frame `feTurbulence` noise layer (`body::after`,
  ~8% opacity) so nothing reads as a flat fill. Static on phones; a slow jitter
  only at `≥ 48rem` where motion is welcome.
- **Hero light** — a soft neutral glow behind the hero text that drifts like a
  moving softbox (`transform` only, held still for reduced motion).
- **Grey bands** — the `--band` sections and footer use a faint neutral vertical
  gradient plus a top-left sheen instead of one flat tone.
- **Depth** — cards, the callout and the About image carry a two-part neutral
  shadow (`--lift` / `--lift-hover`); buttons have a subtle inset highlight and a
  1px press.
- The header is sticky and gains a shadow once the page scrolls; cards lift on
  hover.

A "develop in" reveal (images start desaturated and soft, like a RAW file
rendering, then resolve on scroll-in) runs on anything tagged `[data-reveal]` —
currently the About page portrait; it also picks up the sample gallery if that
is restored. Wired via `global.css` + the observer in `BaseLayout.astro`.

## Project layout

```
public/
  .htaccess          HTTPS + www redirect, compression, caching, headers
  robots.txt         allows Google + the AI crawlers, points to the sitemap
  llms.txt           plain-text summary for AI answer engines
  contact.php        contact-form handler (the only server-side code)
  favicon.svg
  fonts/             self-hosted woff2 (created by npm run fetch:fonts)
  images/            your photos (placeholders created by npm run gen:placeholders)
  og/                social share image
src/
  data/site.js       ← all business content and TODOs live here
  lib/schema.js      JSON-LD builders (ProfessionalService, OfferCatalog, FAQPage)
  layouts/BaseLayout.astro
  components/         Header, Footer, FaqAccordion (native <details>),
                     BeforeAfter + Sample (dormant React — future gallery)
  pages/             index, pricing, about, contact, 404
  styles/global.css  the whole design system, one file
scripts/
  fetch-fonts.mjs
  gen-placeholders.mjs
  optimise-photos.mjs   photos-source/*.webp -> the About / OG / schema images
photos-source/          full-res source portraits (committed, not deployed)
.github/workflows/deploy.yml
astro.config.mjs
```

## Notes on SEO / AI search

- Every page renders full HTML at build time — no content that only appears
  after JavaScript.
- One `<h1>` per page, descriptive `<title>` and meta description, canonical
  URL, Open Graph and Twitter tags — all handled by `BaseLayout.astro`.
- JSON-LD: `WebSite` + `ProfessionalService`/`Service` (with `areaServed`,
  `priceRange`, `founder`/`provider` as a `Person`, `availableChannel`,
  `sameAs` → Fiverr) site-wide; `OfferCatalog` on the pricing page; `FAQPage`
  on the home and pricing pages; `BreadcrumbList` on the interior pages.
- `robots.txt` names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  anthropic-ai, PerplexityBot, Google-Extended, Applebot, CCBot, Googlebot and
  Bingbot explicitly, and links the sitemap.
- FAQ answers in `site.js` are written as standalone, quotable statements,
  because that is the form answer engines extract.
- No `aggregateRating` anywhere. Add it only once real reviews are on the site.

## Expected Lighthouse (mobile)

Target: **Performance 99–100**, **Accessibility / Best Practices / SEO 100** on
every page — no framework JavaScript ships, CSS is inlined, fonts are
self-hosted, and there are no third-party requests.

What could still cost a point or two:

- **Font swap (small CLS / late text paint).** Mitigated with `font-display: swap`
  and a close system fallback stack; the two above-the-fold faces are preloaded.
- **Largest image.** On About, `about-harinda.webp` is the LCP element — it is
  loaded eager with `fetchpriority="high"` and kept ~70 KB. Keep any future hero
  image to the same budget.
- Everything else (CSS inlined into `<head>`, no third-party scripts, no
  webfonts from Google, long cache headers) is already in the green.
