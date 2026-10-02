// Builds the raster assets for /orbitra/ from the brand kits in docs/brand-kits/.
//   node scripts/gen-orbitra-assets.mjs
// Writes favicon PNGs, the social share image and web-sized screenshots into
// public/orbitra/assets/. Safe to re-run; it overwrites its own outputs only.
import sharp from "sharp";
import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => join(root, "public/orbitra/assets", p);
const docs = (p) => join(root, "docs", p);

const ensure = async (file) => mkdir(dirname(file), { recursive: true });

// ── favicons from the Orbitra app icon ──────────────────────────────────────
const appIcon = await readFile(out("brand/orbitra-app-icon.svg"));
for (const [name, size] of [["favicon-32.png", 32], ["apple-touch-icon.png", 180]]) {
  await sharp(appIcon, { density: 300 }).resize(size, size).png().toFile(out(`brand/${name}`));
}

// ── social share image 1200×630 ─────────────────────────────────────────────
// Deep band, ink-on-dark text, the mark large and low-opacity on the right (not rotated).
const ring = (x, y, s, color, opacity = 1) => `
  <g transform="translate(${x} ${y}) scale(${s / 64})" opacity="${opacity}">
    <path d="M53.25 26.31 A22 22 0 1 1 37.69 10.75" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round"/>
    <circle cx="47.56" cy="16.44" r="6" fill="${color}"/>
  </g>`;
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0F1222"/>
  ${ring(700, 60, 520, "#FF5A1F", 0.22)}
  ${ring(96, 96, 72, "#FF5A1F")}
  <text x="186" y="152" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="56" font-weight="600" letter-spacing="-1" fill="#F2EFE8">orbitra</text>
  <text x="96" y="380" font-family="'Space Grotesk','Helvetica Neue',Arial,sans-serif" font-size="76" font-weight="600" letter-spacing="-1.5" fill="#F2EFE8">Many worlds, one orbit.</text>
  <text x="96" y="450" font-family="Inter,'Segoe UI',Arial,sans-serif" font-size="30" fill="#A3A8BA">Small, useful apps and web tools.</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out("brand/og-orbitra-1200x630.png"));

// ── screenshots (design previews from the app kits) ─────────────────────────
const shots = {
  habittracker: [1, 2, 4, 6].map((n) =>
    docs(`brand-kits/habit-tracker/design/screens/screen-0${n}-light.png`)),
  productwhite: [1, 2, 3, 4, 5].map((n) =>
    docs(`brand-kits/productwhite/03-play-store/phone-screenshot-${n}-1080x1920.png`)),
};
for (const [slug, files] of Object.entries(shots)) {
  for (const [i, src] of files.entries()) {
    const dest = out(`apps/${slug}/screen-${i + 1}.webp`);
    await ensure(dest);
    await sharp(src).resize({ width: 400 }).webp({ quality: 80 }).toFile(dest);
  }
}

console.log("Orbitra assets written to public/orbitra/assets/");
