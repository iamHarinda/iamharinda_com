// Orbitra studio settings — one place for the values every /orbitra/ page shares.
// Per-app facts live in apps.json next to this file.

export default {
  name: "Orbitra",
  tagline: "Many worlds, one orbit.",
  basePath: "/orbitra/",

  // While true, every /orbitra/ page is marked noindex and left out of the sitemap.
  // Flip to false only after every TODO(owner) marker is resolved and the Play
  // Console Data safety forms match the pages.
  draft: true,

  // {{CONTACT_EMAIL}} — confirmed by the owner (2026-10-02).
  contactEmail: "orbitra.dev@gmail.com",
  contactEmailConfirmed: true,

  // {{PLAY_DEVELOPER_URL}} — confirmed by the owner (2026-10-02).
  // Numeric developer account IDs use /dev?id=, not /developer?id=<name>.
  playDeveloperUrl: "https://play.google.com/store/apps/dev?id=7254338090363385545",
  playDeveloperUrlConfirmed: true,

  // Shown on every legal page.
  lastUpdated: "2026-10-02",
  effective: "2026-10-02",

  personalSiteUrl: "https://www.iamharinda.com/",
};
