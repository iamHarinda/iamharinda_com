// Tells search engines (Bing, Yandex, Seznam, Naver… via IndexNow) which pages changed
// in this deploy, so they recrawl them quickly.
//
//   node scripts/indexnow.mjs            compare, submit changes, save the new state
//   node scripts/indexnow.mjs --dry-run  compare and list, submit nothing, save nothing
//
// How it decides what changed: it reads the URLs from the built sitemap
// (dist/sitemap-index.xml → sitemap-*.xml), hashes each page's built HTML, and compares
// with the hashes from the last deploy in .indexnow/state.json (kept between runs by the
// GitHub Actions cache). New or changed pages are submitted, and so are pages that
// disappeared from the sitemap, so engines drop them. Builds are deterministic, so an
// unchanged page keeps its hash. With no previous state (first run), every URL is sent.
//
// The key is the name of the <32 hex>.txt file in public/, served at the site root.
// Run it after the files are live: IndexNow fetches that key file to verify ownership.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const stateFile = join(root, ".indexnow", "state.json");
const dryRun = process.argv.includes("--dry-run");
const ENDPOINT = "https://api.indexnow.org/indexnow";
const BATCH = 10000; // IndexNow's per-request limit

const siteUrl = (process.env.SITE_URL || "https://www.iamharinda.com").replace(/\/$/, "");
const host = new URL(siteUrl).host;

const keyFile = readdirSync(join(root, "public")).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("No IndexNow key file (<32 hex>.txt) in public/.");
const key = keyFile.replace(/\.txt$/, "");

// ── URLs from the built sitemap ─────────────────────────────────────────────
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const index = readFileSync(join(dist, "sitemap-index.xml"), "utf8");
const urls = locs(index).flatMap((sm) => locs(readFileSync(join(dist, new URL(sm).pathname), "utf8")));

// ── Hash each page's built HTML ─────────────────────────────────────────────
const fileFor = (url) => {
  const p = decodeURIComponent(new URL(url).pathname);
  return join(dist, p.endsWith("/") ? `${p}index.html` : p);
};
const current = {};
for (const url of urls) {
  const f = fileFor(url);
  if (!existsSync(f)) { console.warn(`IndexNow: no built file for ${url}, skipped`); continue; }
  current[url] = createHash("sha256").update(readFileSync(f)).digest("hex");
}

// ── Compare with the last deploy ────────────────────────────────────────────
const previous = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")).pages ?? {} : null;
const changed = Object.keys(current).filter((u) => !previous || previous[u] !== current[u]);
const removed = previous ? Object.keys(previous).filter((u) => !(u in current)) : [];
const toSend = [...changed, ...removed];

console.log(
  previous
    ? `IndexNow: ${urls.length} URLs in the sitemap, ${changed.length} new or changed, ${removed.length} removed.`
    : `IndexNow: no previous state, sending all ${urls.length} URLs.`
);
for (const u of changed) console.log(`  changed  ${u}`);
for (const u of removed) console.log(`  removed  ${u}`);

if (dryRun) { console.log("IndexNow: dry run, nothing submitted."); process.exit(0); }

// ── Submit ──────────────────────────────────────────────────────────────────
let ok = true;
for (let i = 0; i < toSend.length; i += BATCH) {
  const body = { host, key, keyLocation: `${siteUrl}/${keyFile}`, urlList: toSend.slice(i, i + BATCH) };
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    // 200 = accepted, 202 = accepted, key check pending. Anything else is a problem.
    console.log(`IndexNow: submitted ${body.urlList.length} URLs → HTTP ${res.status}`);
    if (res.status !== 200 && res.status !== 202) { ok = false; console.warn(await res.text()); }
  } catch (err) {
    ok = false;
    console.warn(`IndexNow: request failed: ${err.message}`);
  }
}

// Save the new state only when the submission went through, so failed URLs are retried next deploy.
if (ok) {
  mkdirSync(dirname(stateFile), { recursive: true });
  writeFileSync(stateFile, JSON.stringify({ site: siteUrl, updated: new Date().toISOString(), pages: current }, null, 2));
  console.log(`IndexNow: state saved (${Object.keys(current).length} pages).`);
} else {
  console.warn("IndexNow: state not saved; changed URLs will be sent again next deploy.");
}
