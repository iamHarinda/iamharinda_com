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
  const panel = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${split}" height="${H}">
      <text x="76" y="250" font-family="Georgia,'Times New Roman',serif"
            font-size="66" fill="rgb(25,25,25)">iamharinda</text>
      <text x="78" y="312" font-family="Helvetica,Arial,sans-serif"
            font-size="27" fill="rgb(88,88,88)">Colour correction and retouching,</text>
      <text x="78" y="350" font-family="Helvetica,Arial,sans-serif"
            font-size="27" fill="rgb(88,88,88)">done by a human eye.</text>
      <text x="78" y="430" font-family="Helvetica,Arial,sans-serif"
            font-size="22" fill="rgb(122,122,122)">Free sample edit &#183; Rated 4.9 on Fiverr</text>
    </svg>`;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#f3f3f3" } })
    .composite([
      { input: photo, left: split, top: 0 },
      { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="6" height="${H}"><rect width="6" height="${H}" fill="rgb(168,121,47)"/></svg>`), left: split - 3, top: 0 },
      { input: Buffer.from(panel), left: 0, top: 0 },
    ])
    .jpeg({ quality: 86 })
    .toFile(out("public", "og", "og-default.jpg"));
  console.log("+ public/og/og-default.jpg  1200×630");
}

main().catch((e) => { console.error(e); process.exit(1); });
