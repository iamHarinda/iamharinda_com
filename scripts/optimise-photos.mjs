/**
 * One-off: turn the source portraits in photos-source/ into the exact assets the
 * site uses. Re-run any time the source files change.
 *
 *   node scripts/optimise-photos.mjs
 *
 * Outputs (all overwritten each run):
 *   public/images/about-harinda.webp   1600×1067  — About page lead image
 *   public/images/harinda-portrait.webp 800×800   — Person schema / small uses
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

  // Social share cards (public/og/*.jpg) are committed artwork now and are
  // not regenerated here. See README → "Social share images".

}

main().catch((e) => { console.error(e); process.exit(1); });
