# iamharinda.com

Personal business site for a one-person photo editing and colour-correction
service. Built with **Astro** (static output) and a few **React islands**, so
every page is real HTML at build time — readable by Google *and* by AI crawlers
(GPTBot, ClaudeBot, PerplexityBot, Google-Extended) that do not run JavaScript.
The build output in `dist/` is plain static files plus one PHP script, which is
all Hostinger Business shared hosting needs.

- **Stack:** Astro + `@astrojs/react` + `@astrojs/sitemap`, hand-written CSS, no
  Tailwind, no UI kit.
- **Interactive bits (React):** the before/after slider, the FAQ accordion, the
  mobile menu. Nothing else ships JavaScript.
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
search for **`TODO`**. At minimum, fill in:

| Value | Where in `site.js` | Notes |
| --- | --- | --- |
| WhatsApp number | `contact.whatsapp` | Digits only, international format, no `+` or spaces. E.g. `14155550123`. Builds all the `wa.me` links. |
| Email address | `contact.email` | The mailbox you create in step 5. |
| Your name / bio | `personName`, and the `TODO` comment in `src/pages/about.astro` | Optional but recommended. |
| Real review quotes | `testimonials` | Paste them **verbatim** from Fiverr. Delete any you do not have yet. Do **not** add a rating to the structured data until real reviews are on the page. |
| Fiverr URL | `contact.fiverr` | Already set to `fiverr.com/iamharinda`; change if needed. |
| Twitter/X handle | `seo.twitterHandle` | Leave `""` if you have none. |

### Photos

Put your images in **`public/images/`**. The filenames are listed in `site.js`
under `hero` and `samples` — keep the same names, or change them in `site.js`.

- Export as **WebP**. Keep the pixel dimensions close to the `width`/`height`
  in `site.js` (they set the aspect ratio and prevent layout shift).
- Suggested sizes: hero `1600×1000`, samples `1200×800`. Aim for < 200 KB each.
- Each "before" and "after" must line up (same crop) so the slider looks right.
- **Write real `alt` text** for every image in `site.js` — describe the colour
  problem in the "before" and the result in the "after".

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
  components/         Header, Footer, SiteNav (island), BeforeAfter (island),
                     FaqAccordion (island), Sample
  pages/             index, work, pricing, about, contact, 404
  styles/global.css  the whole design system, one file
scripts/
  fetch-fonts.mjs
  gen-placeholders.mjs
.github/workflows/deploy.yml
astro.config.mjs
```

## Notes on SEO / AI search

- Every page renders full HTML at build time — no content that only appears
  after JavaScript.
- One `<h1>` per page, descriptive `<title>` and meta description, canonical
  URL, Open Graph and Twitter tags — all handled by `BaseLayout.astro`.
- JSON-LD: `ProfessionalService` (with `areaServed`, `priceRange`, `sameAs` →
  Fiverr) site-wide; `OfferCatalog` on the pricing page; `FAQPage` on the home
  and pricing pages.
- `robots.txt` names GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  anthropic-ai, PerplexityBot, Google-Extended, Applebot, CCBot, Googlebot and
  Bingbot explicitly, and links the sitemap.
- FAQ answers in `site.js` are written as standalone, quotable statements,
  because that is the form answer engines extract.
- No `aggregateRating` anywhere. Add it only once real reviews are on the site.

## Expected Lighthouse (mobile)

Target: **Performance 95+**, **Accessibility / Best Practices / SEO 100**.

What could drag Performance down and what to do:

- **React runtime for the islands (~40 KB gzip).** The home page hydrates the
  hero slider on load. If the score dips below 95, switch the React integration
  to **Preact + `preact/compat`** (`@astrojs/preact`) — same component code,
  roughly 30 KB less. Documented but not done, because the brief asked for React.
- **Font swap (small CLS/late text paint).** Mitigated with `font-display: swap`
  and a close system fallback stack; the two above-the-fold faces are preloaded.
- **Large hero image.** Keep the real hero WebP under ~200 KB; it is loaded
  `eager` with `fetchpriority="high"` so it is the LCP element.
- Everything else (CSS inlined into `<head>`, no third-party scripts, no
  webfonts from Google, long cache headers) is already in the green.
