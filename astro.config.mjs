// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync } from "node:fs";
import orbitraStudio from "./src/data/orbitra/studio.js";

// Real per-post dates for the sitemap (Google ignores lastmod values that
// change on every build, so core pages simply omit it).
const postDates = Object.fromEntries(
  readdirSync("./src/content/blog")
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const src = readFileSync(`./src/content/blog/${f}`, "utf8");
      const d = (src.match(/^updatedDate:\s*(.+)$/m) || src.match(/^publishDate:\s*(.+)$/m))?.[1]?.trim();
      return [`/blog/${f.replace(/\.md$/, "")}/`, d ? new Date(d).toISOString() : undefined];
    })
);

// Real last-change dates for core pages (Google ignores lastmod that changes on
// every build). Update a page's date here when its content changes.
const pageDates = {
  "/": "2026-10-06",
  "/about/": "2026-10-06",
  "/photo-editing/": "2026-10-06",
  "/contact/": "2026-10-06",
};
const ORBITRA_UPDATED = "2026-10-06";

export default defineConfig({
  site: process.env.SITE_URL || "https://www.iamharinda.com",
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "always", assets: "_astro" },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes("/404") &&
        !page.includes("/thanks/") &&
        !(orbitraStudio.draft && page.includes("/orbitra/")) &&
        // Orbitra legal pages stay out while they carry TODO(owner) markers.
        !(orbitraStudio.legalNoindex && /\/orbitra\/(?:[^/]+\/)?(?:privacy-policy|terms|delete-data)\/$/.test(page)),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const pageDate = pageDates[path] ?? (path.startsWith("/orbitra/") ? ORBITRA_UPDATED : null);
        if (postDates[path]) item.lastmod = postDates[path];
        else if (pageDate) item.lastmod = pageDate;
        else delete item.lastmod;
        delete item.changefreq;
        delete item.priority;
        return item;
      },
    }),
  ],
  vite: { build: { assetsInlineLimit: 0 } },
});
