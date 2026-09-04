/**
 * Rasterises public/favicon.svg into the full icon set browsers and mobile
 * launchers actually ask for, and writes the web app manifest.
 *
 *   node scripts/gen-icons.mjs        (also runs as part of `npm run setup`)
 *
 * Outputs (all overwritten each run):
 *   public/favicon-16.png  public/favicon-32.png  public/favicon-48.png
 *   public/favicon.ico            — 32×32, for /favicon.ico probes and old clients
 *   public/apple-touch-icon.png   — 180×180, iOS home screen
 *   public/icon-192.png  public/icon-512.png       — PWA / Android
 *   public/icon-maskable-512.png  — 512×512 with an Android maskable safe zone
 *   public/site.webmanifest
 *
 * The source SVG is a gradient ring on a dark rounded square; flattening onto
 * #0a0910 gives a clean opaque square at every size.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (...p) => join(root, "public", ...p);
const BG = "#0a0910";

const { site } = await import(pathToFileURL(join(root, "src/data/site.js")).href);
const svg = await readFile(pub("favicon.svg"));

/** Flatten the SVG onto the dark background at `size` and write a PNG. */
const png = (size, file) =>
  sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .png()
    .toFile(pub(file));

await Promise.all([
  png(16, "favicon-16.png"),
  png(32, "favicon-32.png"),
  png(48, "favicon-48.png"),
  png(180, "apple-touch-icon.png"),
  png(192, "icon-192.png"),
  png(512, "icon-512.png"),
]);

// favicon.ico — a 32×32 PNG under the .ico name. Every current browser sniffs
// the real type, and it stops /favicon.ico from 404-ing for bots and RSS readers.
await sharp(svg, { density: 384 })
  .resize(32, 32, { fit: "contain", background: BG })
  .flatten({ background: BG })
  .png()
  .toFile(pub("favicon.ico"));

// Maskable icon — the glyph sits inside the ~80% safe circle Android crops to,
// so it survives being masked to a circle or squircle.
const glyph = await sharp(svg, { density: 384 })
  .resize(346, 346, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: BG } })
  .composite([{ input: glyph, gravity: "centre" }])
  .png()
  .toFile(pub("icon-maskable-512.png"));

const manifest = {
  name: `${site.name} — human photo editing`,
  short_name: site.name,
  description: site.description,
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: BG,
  theme_color: BG,
  lang: "en",
  icons: [
    { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
    { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    {
      src: "/icon-maskable-512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "maskable",
    },
  ],
};
await writeFile(
  pub("site.webmanifest"),
  JSON.stringify(manifest, null, 2) + "\n",
);

console.log(
  "+ favicons (16/32/48/ico), apple-touch-icon, icon-192/512, icon-maskable-512, site.webmanifest",
);
