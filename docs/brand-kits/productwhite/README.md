# ProductWhite Brand Kit

ProductWhite is a free Android app that puts product photos on a pure white background. The brand borrows from the product photographer's studio: a **white seamless sweep** (the curved paper backdrop) inside a **chroma-blue** frame, the colour you cut away in compositing.

## Logo

| File | Use |
| --- | --- |
| `01-logo/svg/productwhite-mark.svg` | App icon, avatars, favicons — the primary mark |
| `01-logo/svg/productwhite-logo-horizontal.svg` | Website header, documents, store graphics (on light backgrounds) |
| `01-logo/svg/productwhite-logo-horizontal-white.svg` | Same, on dark or blue backgrounds |
| `01-logo/svg/productwhite-logo-stacked.svg` | Square spaces, splash, merch |
| `01-logo/svg/productwhite-wordmark-*.svg` | Text-only placements |
| `01-logo/svg/productwhite-mark-mono-*.svg` | One-colour printing, stamps, notification icon |
| `01-logo/svg/productwhite-mark-ink-bg.svg` / `-white-bg.svg` | Alternate frames for dark / white contexts |
| `01-logo/png/` | PNG exports of all of the above (transparent) |

**Construction:** a squircle frame (corner radius 23.5% of size), a white sweep that flares into a light-grey floor, and an ink shopping bag standing on the floor with a soft shadow. The bag says "selling", the sweep says "studio white".

**Rules**
- Clear space: ¼ of the mark's width on every side.
- Minimum size: mark 24 px; horizontal logo 96 px wide.
- Don't stretch, rotate, recolour the sweep, add shadows/gradients, or put the full-colour mark on busy photos.
- The wordmark is outlined artwork. Don't retype it.

## App icon (`02-app-icon/`)
- `android/res/` — drop into `android/app/src/main/res/`: legacy + round icons for every density, adaptive-icon foreground, **themed (monochrome) icon** for Android 13+, notification icon `ic_stat_productwhite`, Android 12 splash icon, and `mipmap-anydpi-v26` XML.
- `play-store-icon-512.png` — full-bleed square for Play Console (Google applies the mask).
- `source/` — SVG sources for the foreground and monochrome layers.

## Play Store (`03-play-store/`)
`feature-graphic-1024x500.png` and five `phone-screenshot-*-1080x1920.png`. Replace the illustrated mug with real photos made in the app once it runs.

## Social (`04-social/`)
Profile pictures (1080, 800, 400, 320, 170 px; centred to survive circle crops), covers for Facebook, X, LinkedIn and YouTube (YouTube art stays inside the 1546 × 423 safe area), a launch post and a story template. Sizes per platform and the bio text are in `social-kit.json`.

## Colour & tokens (`05-colors-tokens/`)

| Name | Hex | Role |
| --- | --- | --- |
| Chroma blue | #1E4DFF | Brand, primary actions |
| Chroma blue 600 | #1A3FD6 | Pressed |
| Chroma blue 50 | #EDF1FF | Selected / info tint |
| Ink | #121826 | Text, the bag |
| Slate | #4A5568 | Secondary text |
| Mist | #8A94A6 | Captions |
| Line | #E3E7EE | Borders |
| Sweep | #E9ECF2 | Studio floor |
| Paper | #F4F6FA | App background |
| Studio white | #FFFFFF | Canvas — always true white |
| Score good / fair / poor | #12A150 / #C97A00 / #D93A3F | Photo check only |

Files: `design-tokens.json` (W3C Design Tokens format: colour, type, spacing, radius, shadow, motion), `colors.json` (flat), `tokens.css` (CSS variables), `android/colors.xml` and `android/themes.xml` (Material 3 + splash theme).

## Typography (`06-typography/`)
**Plus Jakarta Sans** (SIL Open Font License — free for app, web and print). Weights 400 / 600 / 700 / 800 bundled as woff2 with the licence. Scale and rules in `typography.json`. Sentence case everywhere; no all-caps labels.

## Voice
Helpful shop assistant: short, plain, specific. Say what the button does ("Save to phone"). Say how to fix a problem. Never hype, never guilt.

| Do | Don't |
| --- | --- |
| "Product fills 68%. Aim for 85%." | "Oops! Something's not quite right 😅" |
| "Free. Your photos never leave your phone." | "100% FREE AI MAGIC!!!" |
| "Need a perfect edit?" | "Upgrade now to unlock pro quality" |

## Brand facts (`brand.json`)
Name, store title, package `com.orbitra.productwhite`, publisher Orbitra, email, privacy URL, colours and logo paths in one machine-readable file.
