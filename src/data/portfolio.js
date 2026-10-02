// Portfolio images served from Cloudinary (cloud: cz17mu0x).
// Finished edits only — no before/after pairs are published.
// To add a photo: upload it to Cloudinary, then add one line here with its
// public_id, version (the "v123…" number in its URL), width, height and genre.

export const CLOUD = "cz17mu0x";
// Override only for local performance testing (e.g. PUBLIC_CLD_BASE=http://localhost:8772).
const BASE = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.PUBLIC_CLD_BASE) || "https://res.cloudinary.com";

/**
 * Build a Cloudinary delivery URL.
 * f_auto/q_auto pick AVIF or WebP and a sensible quality per browser.
 */
export function cld(img, { w = 800, ar, crop = "fill" } = {}) {
  const t = [ar ? `ar_${ar}` : null, ar ? `c_${crop}` : "c_limit", ar ? "g_auto" : null, `w_${w}`]
    .filter(Boolean)
    .join(",");
  return `${BASE}/${CLOUD}/image/upload/${t}/f_auto/q_auto/v${img.v}/${encodeURI(img.id)}`;
}

/** srcset string for responsive images. */
export function cldSrcset(img, widths = [400, 640, 960, 1280], opts = {}) {
  return widths.map((w) => `${cld(img, { ...opts, w })} ${w}w`).join(", ");
}

/** Pixel height for a given width and aspect ratio string like "4:5". */
export function arHeight(w, ar, img) {
  if (!ar) return Math.round((w * img.h) / img.w);
  const [a, b] = ar.split(":").map(Number);
  return Math.round((w * b) / a);
}

export const genres = [
  { key: "events", label: "Weddings & events" },
  { key: "portrait", label: "Portraits" },
  { key: "product", label: "Product" },
  { key: "food", label: "Food" },
];

export const portfolio = [
  // Weddings & events
  { id: "DSC_9296-Enhanced-NR", v: 1790496395, w: 8256, h: 5504, genre: "events", title: "Bridal shower, flash portrait", alt: "Bridal shower portrait with on-camera flash, edited in Lightroom Classic" },
  { id: "DSC_0943-Enhanced-NR", v: 1790496292, w: 5408, h: 3600, genre: "events", title: "Family gathering, group shot", alt: "Group photo at a family celebration with natural skin tones across every face" },
  { id: "DSC_0960-Enhanced-NR", v: 1790496288, w: 3600, h: 5408, genre: "events", title: "Celebration, candid portrait", alt: "Candid portrait from a family celebration, edited for clean colour and detail" },
  { id: "DSC_0972-Enhanced-NR", v: 1790496283, w: 3600, h: 5408, genre: "events", title: "Celebration, portrait", alt: "Vertical portrait from a family celebration, edited in Lightroom Classic" },
  // Portraits
  { id: "DSC01850", v: 1790496469, w: 5775, h: 3851, genre: "portrait", title: "Outdoor portrait, warm light", alt: "Outdoor portrait in warm natural light with balanced skin tones" },
  { id: "DSC01720", v: 1790496468, w: 2948, h: 4414, genre: "portrait", title: "Outdoor portrait, vertical", alt: "Vertical outdoor portrait edited for natural colour" },
  { id: "DSC01854", v: 1790496461, w: 4205, h: 2807, genre: "portrait", title: "Outdoor session", alt: "Outdoor portrait session frame with consistent colour grading" },
  { id: "DSC02117", v: 1790496460, w: 6959, h: 4639, genre: "portrait", title: "Outdoor session, wide", alt: "Wide frame from an outdoor portrait session" },
  { id: "DSC01857", v: 1790496460, w: 6009, h: 4008, genre: "portrait", title: "Outdoor session, close", alt: "Close outdoor portrait with clean, natural edit" },
  // Product
  { id: "IMG_9342", v: 1790496426, w: 3871, h: 5807, genre: "product", title: "Perfume bottle, studio", alt: "Perfume bottle product photo with accurate colour and clean highlights" },
  { id: "IMG_9434", v: 1790496422, w: 2541, h: 3801, genre: "product", title: "Perfume, styled", alt: "Styled perfume product photo edited for true-to-life colour" },
  { id: "IMG_8740", v: 1790496421, w: 3477, h: 5214, genre: "product", title: "Perfume, detail", alt: "Perfume product detail shot with controlled reflections" },
  { id: "IMG_8731", v: 1790496419, w: 2668, h: 3998, genre: "product", title: "Perfume, angle", alt: "Perfume product photo from a low angle" },
  { id: "IMG_8713", v: 1790496416, w: 2761, h: 4141, genre: "product", title: "Perfume, hero shot", alt: "Hero shot of a perfume bottle for an online store" },
  { id: "IMG_8720", v: 1790496411, w: 2349, h: 3521, genre: "product", title: "Perfume, close-up", alt: "Close-up perfume product photo with crisp edges" },
  { id: "IMG_8861", v: 1790496507, w: 3156, h: 4734, genre: "product", title: "Watch and fragrance", alt: "Watch and fragrance product photo edited for accurate metal and glass" },
  { id: "IMG_8873", v: 1790496502, w: 3854, h: 5780, genre: "product", title: "Watch, styled", alt: "Styled watch product photo with clean reflections" },
  { id: "IMG_8882", v: 1790496496, w: 3977, h: 5965, genre: "product", title: "Watch, detail", alt: "Watch detail photo edited for sharp, true colour" },
  { id: "IMG_8807", v: 1790496493, w: 3710, h: 2477, genre: "product", title: "Watch and fragrance, flat", alt: "Wide product photo of a watch and fragrance set" },
  // Food
  { id: "IMG_3960", v: 1790496356, w: 3920, h: 5880, genre: "food", title: "Argentinian kitchen, plated", alt: "Plated dish from an Argentinian restaurant with appetising, accurate colour" },
  { id: "IMG_3979", v: 1790496356, w: 5963, h: 3975, genre: "food", title: "Argentinian kitchen, table", alt: "Restaurant table spread edited for warm, natural colour" },
  { id: "IMG_3956", v: 1790496356, w: 5823, h: 3882, genre: "food", title: "Argentinian kitchen, grill", alt: "Grilled food photo with rich, realistic tones" },
  { id: "IMG_3970", v: 1790496356, w: 3634, h: 2428, genre: "food", title: "Argentinian kitchen, wide", alt: "Wide restaurant food photo edited in Lightroom" },
  { id: "IMG_3993", v: 1790496354, w: 3809, h: 5716, genre: "food", title: "Argentinian kitchen, dish", alt: "Vertical dish photo for a restaurant menu" },
  { id: "IMG_3982", v: 1790496351, w: 3991, h: 5988, genre: "food", title: "Argentinian kitchen, detail", alt: "Food detail photo with true-to-life colour" },
];

export const byGenre = (g) => portfolio.filter((p) => p.genre === g);
export const pick = (...ids) => ids.map((id) => portfolio.find((p) => p.id === id)).filter(Boolean);
