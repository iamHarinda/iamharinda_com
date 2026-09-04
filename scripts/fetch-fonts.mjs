/**
 * Downloads the self-hosted woff2 files into public/fonts/.
 *
 *   npm run fetch:fonts
 *
 * Source: the Fontsource CDN on jsDelivr (open-source fonts, no tracking).
 * Files that already exist are left alone, so this is safe to run in CI and
 * safe to re-run. If you are offline, the site still builds and renders with
 * the system fallback stack defined in src/styles/global.css.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "fonts");

// family id on Fontsource → weights we want (latin subset, normal style)
const FONTS = [
  { id: "fraunces", family: "fraunces", weights: [400, 500, 600] },
  { id: "ibm-plex-sans", family: "ibm-plex-sans", weights: [400, 500, 600] },
];

const url = (id, weight) =>
  `https://cdn.jsdelivr.net/fontsource/fonts/${id}@latest/latin-${weight}-normal.woff2`;

const fileFor = (family, weight) => `${family}-latin-${weight}-normal.woff2`;

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const font of FONTS) {
    for (const weight of font.weights) {
      const dest = join(outDir, fileFor(font.family, weight));
      if (await exists(dest)) {
        skipped++;
        continue;
      }
      try {
        const res = await fetch(url(font.id, weight));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        await writeFile(dest, buf);
        console.log(`  ↓ ${fileFor(font.family, weight)}  (${(buf.length / 1024).toFixed(1)} KB)`);
        downloaded++;
      } catch (err) {
        failed++;
        console.warn(`  ! could not fetch ${fileFor(font.family, weight)} — ${err.message}`);
      }
    }
  }

  console.log(
    `\nfonts: ${downloaded} downloaded, ${skipped} already present, ${failed} failed.`
  );
  if (failed && downloaded === 0) {
    console.log(
      "No fonts were downloaded. The site will use its system fallback stack until this succeeds."
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(0); // never fail the build over fonts
});
