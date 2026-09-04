// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// Canonical host is https://www.iamharinda.com (see public/.htaccess for the redirect).
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
    react(),
    sitemap({
      // Every page is public and equally important; keep it simple.
      changefreq: "monthly",
      priority: 0.7,
    }),
  ],
  vite: {
    build: {
      // Never base64-inline assets — keep them as hashed files so .htaccess can
      // cache them for a year.
      assetsInlineLimit: 0,
    },
  },
});
