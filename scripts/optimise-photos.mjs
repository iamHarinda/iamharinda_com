/**
 * One-off: turn the source portraits in photos-source/ into the exact assets the
 * site uses. Re-run any time the source files change.
 *
 *   node scripts/optimise-photos.mjs
 *
 * Outputs (all overwritten each run):
 *   public/images/about-harinda.webp   1600×1067  — About page lead image
 *   public/images/harinda-portrait.webp 800×800   — Person schema / small uses
 *   public/og/og-default.jpg           1200×630   — social share card
 */

import { mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = (f) => join(root, "photos-source", f);
const out = (...p) => join(root, ...p);

async function has(p) {
  try { await access(p, constants.F_OK); return true; } catch { return false; }
}

async function main() {
  for (const f of ["1.webp", "2.webp"]) {
    if (!(await has(src(f)))) {
      console.error(`missing photos-source/${f} — nothing to do`);
      process.exit(0);
    }
  }
  await mkdir(out("public", "images"), { recursive: true });
  await mkdir(out("public", "og"), { recursive: true });

  // About lead image — 3:2 landscape from the desk portrait.
  await sharp(src("1.webp"))
    .resize(1600, 1067, { fit: "cover", position: "attention" })
    .webp({ quality: 78 })
    .toFile(out("public", "images", "about-harinda.webp"));
  console.log("+ public/images/about-harinda.webp  1600×1067");

  // Square portrait — from the clean studio headshot.
  await sharp(src("2.webp"))
    .resize(800, 800, { fit: "cover", position: "attention" })
    .webp({ quality: 80 })
    .toFile(out("public", "images", "harinda-portrait.webp"));
  console.log("+ public/images/harinda-portrait.webp  800×800");

  // OG card — neutral paper panel on the left, headshot on the right,
  // one ochre divider. Mirrors the favicon.
  const W = 1200, H = 630, split = 660;
  const photo = await sharp(src("2.webp"))
    .resize(W - split, H, { fit: "cover", position: "attention" })
    .toBuffer();
  // Dark card, to match the site.
  const layer = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#2ad3a1"/>
          <stop offset="0.55" stop-color="#37c26c"/>
          <stop offset="1" stop-color="#ffb454"/>
        </linearGradient>
        <linearGradient id="seam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#09090b"/>
          <stop offset="1" stop-color="#09090b" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="${split}" y="0" width="150" height="${H}" fill="url(#seam)"/>
      <rect x="${split - 2}" y="0" width="4" height="${H}" fill="url(#g)"/>
      <text x="76" y="250" font-family="Georgia,'Times New Roman',serif"
            font-size="68" fill="#f4f4f6">iamharinda</text>
      <text x="78" y="314" font-family="Helvetica,Arial,sans-serif"
            font-size="27" fill="#a7a7b3">Colour correction and retouching,</text>
      <text x="78" y="352" font-family="Helvetica,Arial,sans-serif"
            font-size="27" fill="#a7a7b3">done by a human eye.</text>
      <text x="78" y="432" font-family="Helvetica,Arial,sans-serif"
            font-size="22" fill="#37c26c">Free sample edit &#183; Rated 4.9 on Fiverr</text>
    </svg>`;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#09090b" } })
    .composite([
      { input: photo, left: split, top: 0 },
      { input: Buffer.from(layer), left: 0, top: 0 },
    ])
    .jpeg({ quality: 86 })
    .toFile(out("public", "og", "og-default.jpg"));
  console.log("+ public/og/og-default.jpg  1200×630 (dark)");
}

main().catch((e) => { console.error(e); process.exit(1); });
