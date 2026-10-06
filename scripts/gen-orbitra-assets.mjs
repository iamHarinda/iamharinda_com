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

// ── screenshots (design previews and Play listing shots from the app kits) ──
const shots = {
  habittracker: [1, 2, 4, 6].map((n) =>
    docs(`brand-kits/habit-tracker/design/screens/screen-0${n}-light.png`)),
  productwhite: [1, 2, 3, 4, 5].map((n) =>
    docs(`brand-kits/productwhite/03-play-store/phone-screenshot-${n}-1080x1920.png`)),
  // Portrait phone shots only; 02 is the landscape table.
  periodicelementtable: ["01-home", "03-element-copper", "04-molar-mass-calculator", "05-trends", "06-dark-mode-gold"]
    .map((n) => docs(`brand-kits/periodic-element-table/play-store/screenshots/${n}.png`)),
  toolsserver: ["01-home", "02-all-tools", "03-loan-calculator", "04-qr-code-generator", "05-json-formatter-dark"]
    .map((n) => docs(`brand-kits/toolsserver/store-assets/screenshots/phone-${n}.png`)),
  budgettracker: ["01-home", "02-journey", "03-budgets", "04-insights", "05-wealth"]
    .map((n) => docs(`brand-kits/budgettracker/store/screenshots/${n}-1080x1920.png`)),
};
for (const [slug, files] of Object.entries(shots)) {
  for (const [i, src] of files.entries()) {
    const dest = out(`apps/${slug}/screen-${i + 1}.webp`);
    await ensure(dest);
    await sharp(src).resize({ width: 400 }).webp({ quality: 80 }).toFile(dest);
  }
}

// ── landing-page screens: bare app UI at 720px, shown inside a CSS phone frame ──
// Budget Tracker's store shots have a caption and a drawn phone, so the screen is
// cropped out of them (box measured on the 1080×1920 originals).
const BUDGET_SCREEN = { left: 120, top: 441, width: 840, height: 1479 };
const ui = {
  habittracker: Object.fromEntries(
    ["01", "04", "05", "06", "07", "08", "09", "10", "11"].map((n) => [
      `s${n}`, { src: docs(`brand-kits/habit-tracker/design/screens/screen-${n}-light.png`) },
    ]),
  ),
  periodicelementtable: Object.fromEntries(
    ["01-home", "02-periodic-table-landscape", "03-element-copper", "04-molar-mass-calculator", "05-trends", "06-dark-mode-gold"]
      .map((n) => [n.slice(3), { src: docs(`brand-kits/periodic-element-table/play-store/screenshots/${n}.png`) }]),
  ),
  toolsserver: Object.fromEntries(
    ["01-home", "02-all-tools", "03-loan-calculator", "04-qr-code-generator", "05-json-formatter-dark", "06-percentage-calculator"]
      .map((n) => [n.slice(3), { src: docs(`brand-kits/toolsserver/store-assets/screenshots/phone-${n}.png`) }]),
  ),
  productwhite: Object.fromEntries(
    ["01-welcome", "02-home", "03-processing", "04-editor", "05-size", "06-photo-check", "07-pro-edit", "08-export", "09-settings", "10-no-product-found"]
      .map((n) => [n.slice(3), { src: docs(`brand-kits/productwhite/design-screens/${n}.png`) }]),
  ),
  budgettracker: Object.fromEntries(
    ["01-home", "02-journey", "03-budgets", "04-insights", "05-wealth", "06-privacy", "07-bills"]
      .map((n) => [n.slice(3), { src: docs(`brand-kits/budgettracker/store/screenshots/${n}-1080x1920.png`), crop: BUDGET_SCREEN }]),
  ),
};
for (const [slug, screens] of Object.entries(ui)) {
  for (const [name, { src, crop }] of Object.entries(screens)) {
    const dest = out(`apps/${slug}/ui/${name}.webp`);
    await ensure(dest);
    let img = sharp(src);
    if (crop) img = img.extract(crop);
    const { width = 0, height = 0 } = crop ?? (await sharp(src).metadata());
    // Landscape shots keep more pixels so they stay sharp at full width.
    await img.resize({ width: width > height ? 1280 : 720 }).webp({ quality: 82 }).toFile(dest);
  }
}

// ── per-app social share images 1200×630 ────────────────────────────────────
// The app's own colours, icon, name and tagline, with its home screen in a phone.
const { default: landing } = await import("../src/data/orbitra/landing.js");
const appsData = JSON.parse(await readFile(join(root, "src/data/orbitra/apps.json"), "utf8"));
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const wrap = (text, max) => {
  const lines = [""];
  for (const w of text.split(" ")) {
    const cur = lines[lines.length - 1];
    if ((cur + " " + w).trim().length > max) lines.push(w);
    else lines[lines.length - 1] = (cur + " " + w).trim();
  }
  return lines;
};
for (const app of appsData) {
  const t = landing[app.slug].theme;
  const title = wrap(app.tagline, 22).slice(0, 3);
  const bg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.deep}"/><stop offset="1" stop-color="${t.deep2}"/></linearGradient>
      <radialGradient id="r" cx="0.85" cy="0.1" r="0.6"><stop offset="0" stop-color="${t.accent}" stop-opacity="0.55"/><stop offset="1" stop-color="${t.accent}" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/><rect width="1200" height="630" fill="url(#r)"/>
    <text x="196" y="132" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#FFFFFF">${esc(app.name)}</text>
    <text x="196" y="174" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#FFFFFF" fill-opacity="0.75">by Orbitra · Android</text>
    ${title.map((l, i) => `<text x="80" y="${300 + i * 74}" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="800" letter-spacing="-1.5" fill="#FFFFFF">${esc(l)}</text>`).join("")}
    <rect x="80" y="${300 + title.length * 74 - 10}" width="120" height="8" rx="4" fill="${t.heroBtn ?? t.accent}"/>
    <rect x="808" y="56" width="324" height="640" rx="44" fill="#0b0c10"/>
  </svg>`;
  const icon = await sharp(out(`apps/${app.slug}/icon.svg`), { density: 300 }).resize(96, 96).png().toBuffer();
  const screenSrc = out(`apps/${app.slug}/ui/${landing[app.slug].hero.screen}.webp`);
  const screen = await sharp(screenSrc).resize({ width: 304 }).toBuffer({ resolveWithObject: true });
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="304" height="${screen.info.height}"><rect width="304" height="${screen.info.height}" rx="36" fill="#fff"/></svg>`);
  const rounded = await sharp(screen.data).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  const visible = await sharp(rounded).extract({ left: 0, top: 0, width: 304, height: Math.min(screen.info.height, 630 - 66) }).toBuffer();
  await sharp(Buffer.from(bg))
    .composite([
      { input: icon, left: 80, top: 80 },
      { input: visible, left: 818, top: 66 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out(`apps/${app.slug}/og-1200x630.png`));
}

console.log("Orbitra assets written to public/orbitra/assets/");
