/**
 * Generates neutral grey placeholder images so nothing is broken on a fresh
 * checkout.
 *
 *   npm run gen:placeholders
 *
 * - True neutral grey (R = G = B), zero colour cast.
 * - "Before" frames are a touch darker and flatter than "after" frames, so the
 *   comparison slider visibly does something before you add real photos.
 * - Existing files are never overwritten — drop your real WebP exports into
 *   public/images/ with the same names and this script leaves them alone.
 *
 * Reads the required filenames + dimensions straight from src/data/site.js.
 */

import { mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.warn(
    "sharp is not installed — run `npm install` first. Skipping placeholder generation."
  );
  process.exit(0);
}

const { site } = await import(pathToFileURL(join(root, "src/data/site.js")).href);

const imagesDir = join(root, "public", "images");
const ogDir = join(root, "public", "og");

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/** One flat grey frame with a faint centred label. */
async function frame({ file, width, height, grey, label, sub }) {
  if (await exists(file)) {
    console.log(`  = kept ${basename(file)}`);
    return;
  }
  const g = grey;
  const line = Math.round(g > 128 ? g - 46 : g + 52);
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="rgb(${g},${g},${g})"/>
      <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}"
            fill="none" stroke="rgb(${line},${line},${line})" stroke-width="1"/>
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
            font-family="Menlo, Consolas, monospace" font-size="${Math.round(height / 16)}"
            fill="rgb(${line},${line},${line})">${label}</text>
      <text x="${cx}" y="${cy + Math.round(height / 11)}" text-anchor="middle"
            dominant-baseline="middle" font-family="Menlo, Consolas, monospace"
            font-size="${Math.round(height / 34)}" fill="rgb(${line},${line},${line})">${sub}</text>
    </svg>`;
  await sharp(Buffer.from(svg))
    .webp({ quality: 82 })
    .toFile(file);
  console.log(`  + ${basename(file)}  ${width}×${height}`);
}

async function pair(id, { width, height, beforeSrc, afterSrc }) {
  await frame({
    file: join(root, "public", beforeSrc),
    width,
    height,
    grey: 124,
    label: "BEFORE",
    sub: "placeholder — replace with your file",
  });
  await frame({
    file: join(root, "public", afterSrc),
    width,
    height,
    grey: 150,
    label: "AFTER",
    sub: "placeholder — replace with your file",
  });
}

async function ogImage() {
  const file = join(ogDir, basename(site.seo.ogImage));
  if (await exists(file)) {
    console.log(`  = kept ${basename(file)}`);
    return;
  }
  const W = 1200;
  const H = 630;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <rect width="100%" height="100%" fill="rgb(243,243,243)"/>
      <rect x="600" width="600" height="${H}" fill="rgb(94,94,94)"/>
      <rect x="597" width="6" height="${H}" fill="rgb(168,121,47)"/>
      <text x="72" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="64"
            fill="rgb(25,25,25)">iamharinda</text>
      <text x="72" y="360" font-family="Helvetica, Arial, sans-serif" font-size="28"
            fill="rgb(88,88,88)">Colour correction and retouching,</text>
      <text x="72" y="398" font-family="Helvetica, Arial, sans-serif" font-size="28"
            fill="rgb(88,88,88)">done by a human eye.</text>
    </svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 86 }).toFile(file);
  console.log(`  + ${basename(file)}  ${W}×${H}`);
}

async function main() {
  await mkdir(imagesDir, { recursive: true });
  await mkdir(ogDir, { recursive: true });

  await pair("hero", {
    width: site.hero.width,
    height: site.hero.height,
    beforeSrc: site.hero.before.src,
    afterSrc: site.hero.after.src,
  });

  for (const s of site.samples) {
    await pair(s.id, {
      width: s.width,
      height: s.height,
      beforeSrc: s.before.src,
      afterSrc: s.after.src,
    });
  }

  await ogImage();
  console.log("\nplaceholders done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
