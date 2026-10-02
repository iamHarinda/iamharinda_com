# Orbitra Pages on iamharinda.com — Build Plan

> **For Claude (or any developer) working in the `iamharinda.com` GitHub repo.**
> Build a small, branded section at `iamharinda.com/orbitra` that matches the **Orbitra** Google Play developer profile, plus one page per app with its own **Privacy Policy** and **Delete Data** page.
> Read this whole file first, then follow the phases in order. Commit after each phase.

---

## 0. Context

- **Orbitra** is the Google Play developer name (umbrella studio). Tagline: **"Many worlds, one orbit."**
- Every app keeps its own name and is endorsed as **"<App>, by Orbitra"**.
- Package names follow `com.orbitra.<appname>`.
- These pages are needed for the Play Console: **Developer website**, **Privacy policy URL** and **Delete account / data URL** for each app.
- The **Orbitra Brand Kit** (zip) is supplied with this plan. Each app will later get **its own app brand kit** (icon + accent). The Orbitra frame stays the same on every page; only the app's icon/accent changes inside it.

### Apps in scope

| App | Slug | Package | What it is |
|---|---|---|---|
| Habit Tracker | `habittracker` | `com.orbitra.habittracker` | Log daily activities under your own topics on a calendar, tick them off, see counts per month / 3 months / year. |
| Periodic Element Table | `periodicelementtable` | `com.orbitra.periodicelementtable` *(confirm)* | Android app of PeriodicElementTable.com — interactive periodic table, chemistry tools and learning content. |
| ToolsServer | `toolsserver` | `com.orbitra.toolsserver` *(confirm)* | Android app of toolsserver.com — free online tools in one app. |
| ProductWhite | `productwhite` | `com.orbitra.productwhite` *(confirm)* | Product photo tool for online sellers — white background / background removal. |

> Items marked *(confirm)* must be checked with the owner before publishing. Do not invent facts — leave a visible `TODO` instead.

---

## 1. URL map (final routes)

```
iamharinda.com/orbitra                                   → Orbitra studio home (app directory)
iamharinda.com/orbitra/privacy-policy                    → Studio-wide privacy summary (optional, links to each app's policy)
iamharinda.com/orbitra/contact                           → Contact / support (optional; can be a section on home)

iamharinda.com/orbitra/habittracker                      → App page
iamharinda.com/orbitra/habittracker/privacy-policy       → App privacy policy
iamharinda.com/orbitra/habittracker/delete-data          → App data deletion page

iamharinda.com/orbitra/periodicelementtable              (+ /privacy-policy, /delete-data)
iamharinda.com/orbitra/toolsserver                       (+ /privacy-policy, /delete-data)
iamharinda.com/orbitra/productwhite                      (+ /privacy-policy, /delete-data)
```

Total: 1 home + 4 app pages + 4 privacy pages + 4 delete-data pages = **13 pages** (15 with optional studio privacy + contact).

Rules:
- Lowercase slugs, no file extensions in public URLs.
- Both `/orbitra/habittracker` and `/orbitra/habittracker/` must load (redirect one to the other — pick **trailing slash** if the site is static folders with `index.html`).
- These URLs go into the Play Console, so **never change them after launch**.

---

## 2. Before writing code — inspect the repo

1. Look at the existing `iamharinda.com` repo: framework (plain HTML? Astro? Next.js? Vite?), build output folder, hosting/deploy method (GitHub Actions FTP to Hostinger? GitHub Pages? Vercel?).
2. **Match the existing stack.** If the site is plain static HTML, use the folder structure in §3 as-is. If it is a framework, create equivalent routes and keep the same component split.
3. The Orbitra section must be **self-contained**: its own CSS file and layout, so it does not inherit or break the personal-site styles (and vice versa).
4. Create a branch: `feature/orbitra-pages`. Commit per phase. Open a PR at the end.

---

## 3. File structure (static HTML version)

```
/orbitra/
├── index.html                          # Studio home
├── privacy-policy/index.html           # optional studio-wide
├── assets/
│   ├── css/orbitra.css                 # tokens + components (single file)
│   ├── js/orbitra.js                   # theme toggle, year, small helpers (no framework)
│   ├── brand/                          # from Orbitra-Brand-Kit
│   │   ├── orbitra-mark.svg
│   │   ├── orbitra-mark-ink.svg
│   │   ├── orbitra-lockup.svg          # convert wordmark text to outlines OR render wordmark as live text in HTML
│   │   ├── orbitra-app-icon.svg
│   │   ├── orbitra-app-icon-512x512.png
│   │   └── og-orbitra-1200x630.png     # create: social share image
│   └── apps/
│       ├── habittracker/icon.svg       # placeholder until app kit arrives
│       ├── periodicelementtable/icon.svg
│       ├── toolsserver/icon.svg
│       └── productwhite/icon.svg
├── habittracker/
│   ├── index.html
│   ├── privacy-policy/index.html
│   └── delete-data/index.html
├── periodicelementtable/ (same 3 files)
├── toolsserver/          (same 3 files)
└── productwhite/         (same 3 files)
```

If the repo has a templating/build step, generate the 4 × 3 app pages from **one data file** (`orbitra/apps.json`) + 3 templates instead of hand-copying. If it is plain HTML, hand-write them but keep markup identical across apps.

### `apps.json` (single source of truth)

```json
[
  {
    "slug": "habittracker",
    "name": "Habit Tracker",
    "package": "com.orbitra.habittracker",
    "tagline": "Tick off your days. See your habits add up.",
    "summary": "Create your own topics, tick them on a calendar, and see how often each one happened this month, in 3 months, or this year.",
    "accent": "solar",
    "playUrl": "https://play.google.com/store/apps/details?id=com.orbitra.habittracker",
    "website": null,
    "status": "testing",
    "lastUpdated": "2026-10-02"
  }
]
```
`status` values: `live`, `testing`, `coming-soon` → shown as a pill on cards.

---

## 4. Design system (from the Orbitra Brand Kit)

### 4.1 CSS tokens — put at the top of `orbitra.css`

```css
:root {
  /* colour — light */
  --solar: #FF5A1F;         /* brand orange: mark, ONE primary button per screen */
  --solar-text: #B93A0B;    /* orange for links & text */
  --ion: #1C9C8C;           /* teal: icons, success, "new" badges (fills/icons only in light) */
  --halo: #FFD8C4;          /* soft orange tint: highlights, selected rows */
  --deep: #0F1222;          /* hero bands, dark cards, app icon ground */
  --ink: #0F1222;           /* primary text; text ON solar */
  --ink-muted: #565B6E;     /* secondary text */
  --surface: #F7F4EE;       /* page background */
  --surface-raised: #FFFFFF;/* cards */
  --line: #E4DFD4;          /* hairline borders */

  /* type */
  --font-display: "Space Grotesk", "Helvetica Neue", Arial, sans-serif;
  --font-sans: Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Menlo, monospace;

  /* spacing — 8px rhythm */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;

  /* radius */
  --radius-sm: 6px; --radius-md: 12px; --radius-full: 9999px;

  --maxw: 1080px;
  --maxw-prose: 720px;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --solar: #FF6B35; --solar-text: #FF8A5C; --ion: #34C6B4; --halo: #4A2A1A;
    --deep: #2E3554; --ink: #F2EFE8; --ink-muted: #A3A8BA;
    --surface: #0B0E1A; --surface-raised: #161A2B; --line: #262B40;
  }
}
:root[data-theme="dark"] {
  --solar: #FF6B35; --solar-text: #FF8A5C; --ion: #34C6B4; --halo: #4A2A1A;
  --deep: #2E3554; --ink: #F2EFE8; --ink-muted: #A3A8BA;
  --surface: #0B0E1A; --surface-raised: #161A2B; --line: #262B40;
}

body { background: var(--surface); color: var(--ink); font: 400 16px/24px var(--font-sans); }
```

### 4.2 Type scale

| Style | Font | Size / line | Weight | Use |
|---|---|---|---|---|
| display | Space Grotesk | 48/52 (mobile 34/40), `-0.02em` | 600 | Hero headline only |
| title | Space Grotesk | 28/34, `-0.01em` | 600 | Page titles |
| heading | Inter | 20/28 | 600 | Section headings |
| body | Inter | 16/24 | 400 | Everything else |
| caption | Inter | 12/16, `0.02em` | 500 | "by Orbitra", metadata, "Last updated" |
| code | JetBrains Mono | 13/20 | 400 | Package names, URLs, version numbers |

Load fonts from Google Fonts with `display=swap` (Inter 400/500/600, Space Grotesk 600, JetBrains Mono 400). Add `<link rel="preconnect">` for `fonts.googleapis.com` and `fonts.gstatic.com`.

### 4.3 Brand rules the build MUST follow

- **Text on solar is always `--ink`, never white** (white fails contrast).
- Colour ratio per screen: ~70% surface, ~20% ink/neutrals, **<10% solar**, a touch of ion.
- **One** solar primary button per screen. Everything else is secondary (outline with `--line`, ink text).
- Links use `--solar-text`, underline on hover/focus.
- Borders are 1px `--line` hairlines. **No heavy shadows, no gradients**, no blue-purple gradients, no glossy icons, no emoji as icons.
- Icons: line icons, 2px stroke, round caps/joins (e.g. Lucide). Ink by default, solar only for active state.
- Corners: `--radius-md` (12px) for cards/buttons, `--radius-sm` (6px) for inputs/badges, `--radius-full` for pills, status dots, avatars.
- Logo: never rotate the ring, close the gap, move the dot, or add effects. Clear space ≥ satellite-dot diameter. Min size 16px (mark), 96px wide (lockup).
- Write **Orbitra** in sentences; the wordmark in the logo is lowercase **orbitra**.
- Voice: clear, calm, a little playful. Short sentences, plain words, **no hype**. ("Your data stays on your device." ✅ — "Revolutionary AI-powered…" ❌)

### 4.4 Shared components

| Component | Spec |
|---|---|
| **Header** | Sticky, `--surface` bg, bottom 1px `--line`. Left: mark (28px) + live-text wordmark "orbitra" (Space Grotesk 600, 22px, lowercase). Right: "Apps", "Contact", theme toggle (sun/moon line icon). On app pages add a breadcrumb: `Orbitra / Habit Tracker / Privacy`. |
| **Hero band (home)** | `--deep` background, ink-on-dark text (`#F2EFE8`), large orbit-ring motif (the mark at ~360px, low opacity on the right; **not rotated**). Headline "Many worlds, one orbit." (display). Sub: "Orbitra makes small, useful apps and web tools. Each one is its own world." CTA: solar button "See our apps" (ink text). |
| **App card** | `--surface-raised`, 1px `--line`, `--radius-md`, 24px padding. App icon 64px (rounded square), name (heading), "by Orbitra" (caption, `--ink-muted`), one-line summary, status pill, links: "View app" (primary text link) · "Privacy" · "Delete data". Hover: border becomes `--solar`, no lift shadow. |
| **Status pill** | `--radius-full`, caption text. `live` → ion dot + "On Google Play"; `testing` → halo bg + "In testing"; `coming-soon` → line border + "Coming soon". |
| **App hero** | Icon 96px + app name (title) + "by Orbitra" + tagline + "Get it on Google Play" badge (official badge image, only when `status = live`; otherwise show the status pill). Package name in mono caption. |
| **Feature list** | 3–6 items, each a 2px line icon in ion + heading + one sentence. Grid: 1 col mobile, 2–3 cols desktop. |
| **Legal layout** | Single column, max 720px, title + "Last updated: <date>" caption + "Effective: <date>". Left sticky table of contents on ≥1024px (anchor links). Use `<h2>` per section with `id`s so Play reviewers can deep-link. |
| **Callout box** | `--halo` bg, `--radius-md`, used for "Short version" summary at top of legal pages. |
| **Footer** | `--deep` band. Mark-ink (light colour) + "© 2026 Orbitra. Many worlds, one orbit." · links: Apps, Privacy, Contact, `iamharinda.com` (back to personal site). Year via JS. |

### 4.5 How app brand kits plug in

Each app's page keeps the **Orbitra frame** (header, footer, type, surfaces, legal layout) and swaps only:
- the app icon (`/orbitra/assets/apps/<slug>/icon.svg|png`),
- an optional app accent used **only** in that app's hero (a thin top border on the hero card + icon glow ring), via a CSS variable set on `<body data-app="habittracker" style="--app-accent: …">`. Default `--app-accent: var(--solar)`.

Until an app kit arrives, use a placeholder icon that follows the Orbitra sub-brand rule: rounded square, `--deep` ground, one simple geometric symbol in solar or ion.

Suggested placeholder symbols:
- Habit Tracker → calendar grid with one ticked cell (ion)
- Periodic Element Table → a single element tile "Pe" or 2×2 tile grid (solar)
- ToolsServer → wrench/grid of 4 squares (ion)
- ProductWhite → square frame with a white product silhouette on solar halo (solar)

---

## 5. Page content

### 5.1 `/orbitra` — Studio home

Sections, in order:
1. **Header**
2. **Hero** — "Many worlds, one orbit." / short intro / CTA "See our apps".
3. **Apps grid** (`id="apps"`) — 4 app cards from `apps.json`.
4. **What we care about** — 3 short points with line icons:
   - "Small and useful." Each app does one job well.
   - "Your data, your device." We collect as little as we can.
   - "Free to start." Most of our tools cost nothing.
5. **Contact** (`id="contact"`) — Email `{{CONTACT_EMAIL}}` (mailto), "We reply within 2–3 working days." Link to Google Play developer page `{{PLAY_DEVELOPER_URL}}`.
6. **Footer**

Meta: `<title>Orbitra — Apps and web tools</title>`, description "Orbitra makes small, useful apps and web tools: Habit Tracker, Periodic Element Table, ToolsServer and ProductWhite."

### 5.2 `/orbitra/<slug>` — App page (same template for all 4)

1. Breadcrumb `Orbitra / <App>`
2. App hero (icon, name, by Orbitra, tagline, Play badge or status pill, package in mono)
3. **What it does** — 3–6 features (from §6)
4. **Screenshots** — horizontal scroll row of phone screenshots (placeholders until provided; `loading="lazy"`, `alt` text required)
5. **Privacy at a glance** — callout listing what's collected (from §6), links to full Privacy Policy and Delete Data
6. **Support** — contact email + "Include your app version (Settings → About)".
7. Footer

### 5.3 `/orbitra/<slug>/privacy-policy` — Privacy policy

Must satisfy Google Play's policy requirements: publicly accessible, not a PDF, not geo-blocked, names the developer (**Orbitra**) and app, has a privacy point of contact, explains what data is accessed/collected/used/shared, security, retention and deletion. Must be **consistent with the app's Data safety form** in Play Console.

Required sections (use these exact headings & anchors):

1. `#short-version` — **Short version** (callout, 3–5 bullets in plain words)
2. `#who-we-are` — Who we are: "<App> is published by Orbitra (Google Play developer). Contact: {{CONTACT_EMAIL}}."
3. `#data-we-collect` — What data we collect (table: Data type · Why · Stored where · Shared with)
4. `#data-we-dont-collect` — What we don't collect
5. `#permissions` — Device permissions the app uses and why
6. `#third-parties` — Third-party services (with links to their privacy policies: Google Analytics for Firebase / Google AdMob / AdSense / Google Play Services, as applicable)
7. `#how-we-use` — How we use data
8. `#sharing` — Sharing (no selling of personal data)
9. `#retention` — Retention
10. `#deletion` — Deleting your data → link to `/delete-data`
11. `#security` — Security (HTTPS in transit; local data protected by Android app sandbox)
12. `#children` — Children: not directed to children under 13 *(owner to confirm; Periodic Element Table may attract students — if the target audience in Play Console includes under-13s, Families Policy applies and this section must change)*
13. `#your-rights` — Your rights (GDPR/UK GDPR for Europe; CCPA/CPRA for California; how to request access/deletion)
14. `#international` — International transfers (Google services may process data outside your country)
15. `#changes` — Changes to this policy (we'll update the "Last updated" date)
16. `#contact` — Contact

Header shows: "Last updated: 2 October 2026" and "Effective: 2 October 2026".

### 5.4 `/orbitra/<slug>/delete-data` — Data deletion

Google Play asks for a deletion URL where the app lets users create an account; for apps without accounts it's still good practice and matches the owner's plan. The page must name the **app** and **developer (Orbitra)** and explain clearly:

1. `#short-version` — callout: "Your data lives on your phone. Deleting the app deletes it."
2. `#delete-on-device` — Steps:
   1. Open **Settings → Apps → <App>**
   2. Tap **Storage & cache → Clear storage** (deletes all your data in the app), or
   3. **Uninstall** the app.
   - If the app has an in-app "Reset / Delete all data" option, document it here as step 1.
3. `#delete-analytics` — Analytics / diagnostics data: "Analytics data is collected without your name or email. To ask us to delete data linked to your device, email {{CONTACT_EMAIL}} with the subject `Delete data – <App>`. We'll confirm within 30 days."
4. `#what-is-deleted` — What gets deleted vs. what may be kept (e.g. aggregated, anonymous statistics; data Google keeps under its own policies; retention period for analytics, default 14 months in GA4 unless changed — **owner to confirm the GA4 retention setting**)
5. `#request-form` — A simple `mailto:` button (solar primary): "Email a deletion request". No backend form needed.
6. `#contact`

---

## 6. Per-app data facts (fill the templates from this)

> ⚠️ These are the **current assumptions**. The owner must confirm each line before publishing, and the Play Console **Data safety** form must say the same thing. Anything uncertain stays as a visible `TODO` on a draft branch, never guessed on the live page.

### Habit Tracker — `com.orbitra.habittracker`
- **Features:** custom topics; tick activities on a calendar; per-topic history; counts per month / 3 months / year; English only; free, no ads (for now).
- **User content (topics, ticks):** stored **only on the device**, not uploaded. *(confirm: no cloud sync/backup?)*
- **Analytics:** Google Analytics (Firebase) — app interactions, device/app info, approximate location from IP (country), app instance ID. Not linked to name/email.
- **Crash reports:** *(confirm: Firebase Crashlytics?)*
- **Ads:** none. **Accounts:** none. **Permissions:** *(confirm: notifications for reminders?)*
- **Delete:** clear storage / uninstall; email request for analytics.

### Periodic Element Table — `com.orbitra.periodicelementtable` *(confirm package)*
- **Type:** Android webview app of `https://periodicelementtable.com`.
- **Features:** interactive periodic table, element details, tools (molar mass calculator, electron configuration, equation balancer, element comparison), learning articles.
- **Data:** the app loads the website, so the **website's** cookies/analytics apply (Google Analytics; **Google AdSense ads planned**). Must mention cookies, advertising ID / ad personalization once AdSense/AdMob is on, and link to `periodicelementtable.com` privacy policy if it has one.
- **Accounts:** none. **Permissions:** Internet only *(confirm)*.
- **Children:** chemistry audience includes students — check Play target age settings (see §5.3 #children).

### ToolsServer — `com.orbitra.toolsserver` *(confirm package)*
- **Type:** Android webview app of `https://toolsserver.com`.
- **Features:** collection of free online tools in one app *(owner to list top 4–6 tools)*.
- **Data:** website cookies/analytics; **files you choose to process** — state clearly whether tools run in the browser/on device or upload files to a server, and how long uploads are kept *(confirm per tool)*. Ads: *(confirm)*.
- **Permissions:** Internet; file/photo picker when a tool needs a file *(confirm)*.

### ProductWhite — `com.orbitra.productwhite` *(confirm package)*
- **Features:** remove background / put products on a clean white background for online stores; export ready-to-upload images; free.
- **Photos:** *(confirm: processed on device, or uploaded to a server/API for background removal? if uploaded, which service and how long kept)*. This decides most of the policy — **do not publish until confirmed**.
- **Permissions:** photo picker / camera *(confirm)*.
- **Links out:** in-app link to `premiumphotoedits.com` and WhatsApp contact for paid editing — mention that those are separate sites with their own policies.
- **Note:** an earlier plan put this app's privacy policy on `premiumphotoedits.com`. **New canonical URL is `iamharinda.com/orbitra/productwhite/privacy-policy`** — if the old page exists, redirect it here.

---

## 7. SEO, meta and accessibility

- Every page: unique `<title>` and `<meta name="description">`, `<link rel="canonical">` with the trailing-slash URL, Open Graph + Twitter card (`og-orbitra-1200x630.png`, per-app OG images later).
- Favicon set from `orbitra-app-icon` (32px PNG, 180px apple-touch-icon, SVG favicon). App pages may use the app icon as favicon.
- JSON-LD:
  - Home: `Organization` (name Orbitra, url, logo, email).
  - App page: `SoftwareApplication` (name, operatingSystem "Android", applicationCategory, offers price 0, publisher Orbitra).
- Add all 13 URLs to the site `sitemap.xml`. Legal pages: indexable (`index, follow`) — Play reviewers and users must reach them.
- Accessibility: semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, visible focus ring (2px `--solar` outline, 2px offset), colour contrast per tokens (don't use `--ion` for body text in light mode), `alt` on every image, `prefers-reduced-motion` respected.
- Performance: no JS framework for these pages; CSS < 20 KB; inline SVG logo; lazy-load screenshots; Lighthouse ≥ 95 on all four categories.

---

## 8. Responsive layout

- Mobile first. 16px side gutter on phones, 24px on tablets, content max 1080px (legal prose max 720px).
- Breakpoints: 640px (2-col app grid), 1024px (3-col features, sticky legal TOC).
- No horizontal scroll at 320px wide. Header collapses to mark + menu button under 640px.

---

## 9. Hosting / server notes

- If deployed to **Hostinger (Apache)**: folders with `index.html` give clean URLs automatically. Add to `.htaccess` (only if not already handled):
  ```apache
  # force trailing slash on /orbitra routes
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} ^/orbitra(/.*)?[^/]$
  RewriteRule ^(.*)$ /$1/ [R=301,L]
  ```
- If behind **Cloudflare**: make sure legal pages are not blocked by bot-fight/geo rules (Play's reviewer must be able to load them).
- Serve over HTTPS only.
- If the repo deploys via GitHub Actions FTP, confirm the `orbitra/` folder is included in the upload path.

---

## 10. Build phases & checklist

**Phase 1 — Setup**
- [ ] Inspect repo stack & deploy (§2), create `feature/orbitra-pages` branch
- [ ] Copy brand kit files into `/orbitra/assets/brand/`
- [ ] Create `orbitra.css` with tokens (§4.1) and components (§4.4); light + dark + theme toggle
- [ ] Commit: `feat(orbitra): brand tokens and base layout`

**Phase 2 — Studio home**
- [ ] `/orbitra/` with hero, apps grid, values, contact, footer
- [ ] `apps.json` with all 4 apps
- [ ] Commit: `feat(orbitra): studio home page`

**Phase 3 — App pages**
- [ ] 4 app pages from one template, placeholder icons (§4.5)
- [ ] Commit: `feat(orbitra): app pages`

**Phase 4 — Legal pages**
- [ ] 4 privacy policies (§5.3 + §6)
- [ ] 4 delete-data pages (§5.4 + §6)
- [ ] Every unconfirmed fact marked `TODO(owner): …` and listed in the PR description
- [ ] Commit: `feat(orbitra): privacy and data deletion pages`

**Phase 5 — SEO & QA**
- [ ] Meta, OG, favicons, JSON-LD, sitemap (§7)
- [ ] Test every URL with and without trailing slash
- [ ] Check 320px / 768px / 1280px widths, light + dark
- [ ] Lighthouse run, fix issues
- [ ] No placeholder text (`{{…}}`, `Lorem`) left on pages going live
- [ ] Commit: `chore(orbitra): seo and qa fixes`, open PR

**Phase 6 — Play Console hookup (owner)**
- [ ] Developer website → `https://iamharinda.com/orbitra/`
- [ ] Each app → Privacy policy URL → `https://iamharinda.com/orbitra/<slug>/privacy-policy/`
- [ ] Each app → Data deletion URL (if asked) → `https://iamharinda.com/orbitra/<slug>/delete-data/`
- [ ] Data safety form answers match §6 exactly
- [ ] Developer icon → `orbitra-app-icon-512x512.png`

---

## 11. Placeholders to replace

| Placeholder | Meaning |
|---|---|
| `{{CONTACT_EMAIL}}` | Orbitra support email (same as Play Console developer email) |
| `{{PLAY_DEVELOPER_URL}}` | `https://play.google.com/store/apps/developer?id=Orbitra` (confirm exact id) |
| `{{PLAY_URL_<SLUG>}}` | Each app's Play Store link (only once live) |
| `TODO(owner): …` | Facts the owner must confirm (see §6) |

---

## 12. Kick-off prompt (paste into Claude in the iamharinda.com repo)

```
Read ORBITRA_PAGES_PLAN.md in full. The Orbitra brand kit is in
/orbitra/assets/brand/ (or I'll attach it). Start with §2: inspect this repo's stack
and deploy setup and tell me what you found before writing code. Then build the
Orbitra section phase by phase (§10), on branch feature/orbitra-pages, committing
after each phase. Follow the brand rules in §4.3 strictly. Do not guess any data
practice in §6 — leave TODO(owner) markers and list them for me at the end.
```
