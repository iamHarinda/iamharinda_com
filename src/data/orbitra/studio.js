// Orbitra studio settings — one place for the values every /orbitra/ page shares.
// Per-app facts live in apps.json next to this file.

export default {
  name: "Orbitra",
  tagline: "Many worlds, one orbit.",
  basePath: "/orbitra/",

  // While true, every /orbitra/ page is marked noindex and left out of the sitemap.
  // Off since 2026-10-06: four apps are released, so the studio and app pages
  // should be found in search.
  draft: false,

  // Privacy policies, terms and delete-data pages stay public (Play Console links
  // to them) but noindex and out of the sitemap while they still carry
  // TODO(owner) markers. Flip to false once every marker is resolved.
  legalNoindex: true,

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
