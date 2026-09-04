// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Canonical host is https://www.iamharinda.com (see public/.htaccess for the redirect).
// No UI framework: the animated background (scripts/aurora.js) and the interaction
// effects (scripts/fx.js) are hand-written vanilla + WebGL. Re-add `@astrojs/react`
// only if the dormant BeforeAfter/Sample components are brought back.
export default defineConfig({
  site: "https://www.iamharinda.com",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory",
    // Inline all CSS into <head> — one small stylesheet, no render-blocking request,
    // no separate round-trip on a brochure site with no client-side routing.
    inlineStylesheets: "always",
    assets: "_astro",
  },
  integrations: [
    sitemap({
      // Every page is public and equally important; keep it simple.
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  scopedStyleStrategy: "class",
  vite: {
    build: {
      // Never base64-inline assets — keep them as hashed files so .htaccess can
      // cache them for a year.
      assetsInlineLimit: 0,
    },
  },
});
