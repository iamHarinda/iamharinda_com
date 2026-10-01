// Orbitra studio settings — one place for the values every /orbitra/ page shares.
// Per-app facts live in apps.json next to this file.

export default {
  name: "Orbitra",
  tagline: "Many worlds, one orbit.",
  basePath: "/orbitra/",

  // While true, every /orbitra/ page shows a "Draft" banner, is marked noindex and
  // is left out of the sitemap. Flip to false only after every TODO(owner) marker
  // is resolved and the Play Console Data safety forms match the pages.
  draft: true,

  // {{CONTACT_EMAIL}} — taken from the Habit Tracker brand kit
  // (docs/Habit-Tracker-Orbitra-Kit/.../tokens/brand.json). Set confirmed: true once
  // the mailbox exists and matches the Play Console developer email.
  contactEmail: "privacy@orbitra.app",
  contactEmailConfirmed: false,

  // {{PLAY_DEVELOPER_URL}}
  playDeveloperUrl: "https://play.google.com/store/apps/developer?id=Orbitra",
  playDeveloperUrlConfirmed: false,

  // Shown on every legal page.
  lastUpdated: "2026-10-02",
  effective: "2026-10-02",

  personalSiteUrl: "https://www.iamharinda.com/",
};
