// ─────────────────────────────────────────────────────────────────────────────
//  iamharinda.com — single source of truth for every business fact.
//  Every page reads prices, turnaround, reply times and contact details from
//  here, so a change in one place updates the whole site.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Harinda",
  legalName: "Harinda Fernando Photo Editing",
  handle: "iamharinda",
  personName: "Harinda Fernando",
  personTitles: ["Photo editor", "Web developer", "Polo and golf shirt designer"],
  domain: "www.iamharinda.com",
  url: "https://www.iamharinda.com",

  tagline: "Your style. Hand-edited. On deadline.",
  description:
    "Hand-edited wedding, portrait and product photo editing for professional photographers in the US, UK, Canada, Europe and Australia. Lightroom, no AI, 3 free sample edits, pay after you approve.",

  // ── Offer facts (used everywhere — keep these consistent) ────────────────
  currency: "USD",
  perPhoto: "$0.20",
  freeSample: {
    count: 3,
    short: "3 free sample edits",
    line: "Send three photos and get them back edited in your style, free, before you decide anything.",
    cta: "Get 3 photos edited free",
    turnaround: "usually within 24 hours",
  },
  replyTime: "within one business day",
  packages: [
    { photos: 50, price: 10, days: 2, label: "Starter", note: "Portrait sessions and small shoots" },
    { photos: 100, price: 20, days: 2, label: "Session", note: "Family, engagement and event coverage" },
    { photos: 200, price: 40, days: 3, label: "Event", note: "Small weddings and full events", featured: true },
    { photos: 500, price: 100, days: 4, label: "Wedding", note: "A full wedding gallery" },
  ],
  bulkNote:
    "Over 500 photos, regular weekly work or a whole season? Send the shoot size and deadline and you get a fixed quote back within one business day.",
  includes: [
    "3 free sample edits before you order",
    "Unlimited revisions until it looks like your work",
    "Full-resolution JPEG delivery (TIFF or PNG on request)",
    "RAW files welcome: CR2, CR3, NEF, ARW, DNG",
    "Direct orders are paid after you approve the final gallery",
  ],
  pricesUpdated: "2026-10-02",

  // Direct vs Fiverr — the two ways to order.
  orderWays: [
    { label: "Order direct", price: "Packages from $10", pay: "After you approve the gallery", protection: "Free sample first, then pay after approval", best: "Repeat clients and studios" },
    { label: "Order on Fiverr", price: "Same packages, plus Fiverr's service fee", pay: "Upfront, held by Fiverr until delivery", protection: "Fiverr buyer protection", best: "A first order through a platform you know" },
  ],

  // Public social proof from the Fiverr profile. Check these against Fiverr
  // before every redeploy — they are shown as text only, never as review schema.
  fiverrStats: { rating: "4.9", reviews: 183, ordersPlus: 300, countries: 15 },

  clientCountries: [
    "United States", "Canada", "United Kingdom", "France", "Germany", "Spain", "Italy",
    "Colombia", "South Africa", "India", "Thailand", "Philippines", "Japan", "Australia", "New Zealand",
  ],
  areasServed: ["United States", "United Kingdom", "Canada", "Europe", "Australia"],
  areasServedCodes: ["US", "GB", "CA", "AU", "EU"],

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    email: "hello@iamharinda.com",
    whatsapp: "447355229599",
    whatsappDisplay: "+44 7355 229599",
    fiverr: "https://www.fiverr.com/iamharinda", // confirm this is the live username
    services: [
      "Wedding photo editing",
      "Portrait or headshot editing",
      "Product or food photo editing",
      "Custom web development",
      "Polo or golf shirt design",
      "Something else",
    ],
  },
  location: {
    country: "Sri Lanka",
    countryCode: "LK",
    note: "Studio in Sri Lanka, UK WhatsApp number, hours that overlap US mornings.",
  },
  // Optional: Cloudflare Turnstile site key for the forms. Leave empty to skip.
  turnstileSiteKey: "",

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Photo editing", href: "/photo-editing/" },
    { label: "Work", href: "/work/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "Reviews", href: "/reviews/" },
    { label: "Blog", href: "/blog/" },
    { label: "About", href: "/about/" },
  ],

  // ── Other services (secondary) ────────────────────────────────────────────
  otherServices: [
    { label: "Custom web development", href: "/web-development/", line: "Hand-coded websites, no WordPress. Fixed price from $750, and you keep the code." },
    { label: "Polo & golf shirt design", href: "/fashion-designing/", line: "Print-ready polo and golf shirt patterns with front and back mockups, from $10." },
  ],

  // ── Reviews (paraphrased from public Fiverr feedback) ─────────────────────
  // Replace with verbatim quotes and first names when clients agree.
  testimonials: [
    { quote: "I sent some really dark pictures and they came back looking exactly how I wanted. Fast, too.", tag: "Event photos" },
    { quote: "The photos came back clean, vibrant and professionally done. A great eye for detail, with everything enhanced in a natural, balanced way.", tag: "Portrait session" },
    { quote: "Fernando was very professional: quick response time, fast delivery and really flexible. I'll definitely use his services again.", tag: "Repeat client" },
    { quote: "Fernando did an excellent job editing some portraits for me. Super happy with the edits.", tag: "Portraits" },
    { quote: "The whole process was really smooth. Quick replies, good communication, fast delivery. No drama, just solid work.", tag: "Gallery edit" },
    { quote: "Communication was easy from start to finish, and the edits came back looking natural, exactly the style I was after. Will order again.", tag: "Style match" },
  ],

  // ── Photo editing FAQ (standalone answers; quotable by AI answer engines) ─
  faqs: [
    { q: "Do you use AI or automatic presets?", a: "No. Every photo is edited by hand in Lightroom Classic on a factory-calibrated, Calman-verified ASUS ProArt monitor. Lightroom's own denoise and lens tools are used where they help, but no AI look or one-click batch preset decides the edit." },
    { q: "Is the sample edit really free?", a: "Yes. Send three photos and they come back edited in your style, usually within 24 hours, with no payment details and no obligation to order." },
    { q: "How much does photo editing cost?", a: "Editing costs $0.20 a photo: 50 photos for $10, 100 for $20, 200 for $40 and 500 for $100. Over 500 photos or regular work gets a fixed custom quote. Every package includes unlimited revisions." },
    { q: "How long does editing take?", a: "50 or 100 photos take 2 days, 200 photos take 3 days and a 500-photo wedding gallery takes 4 days. The free sample usually comes back within 24 hours. Rush deadlines are quoted individually." },
    { q: "When do I pay?", a: "Direct orders are paid after the edited gallery is delivered and approved, by PayPal invoice, Payoneer, Remitly, TapSend or bank transfer. Orders placed on Fiverr are paid upfront through Fiverr, which holds the payment until delivery." },
    { q: "Can you match my Lightroom preset or editing style?", a: "Yes. Send your preset, a Lightroom catalog with a few edited frames, or three reference photos. The free sample is how the style is agreed before the full gallery is edited." },
    { q: "What files should I send?", a: "RAW files give the best result: CR2, CR3, NEF, ARW and DNG all work. High-quality JPEGs can be edited too. Share them by Google Drive, Dropbox or WeTransfer." },
    { q: "How many revisions do I get?", a: "Revisions are unlimited and included in every package. Send notes back as many times as needed until the gallery looks like your work." },
  ],

  // The edit shown in the home-page "How I edit" section. Settings are the
  // real Lightroom Classic values read from this photo's XMP metadata.
  featuredEdit: {
    id: "DSC_9296-Enhanced-NR",
    v: 1790496395,
    w: 8256,
    h: 5504,
    alt: "Bridal shower portrait lit by on-camera flash, edited in Lightroom Classic",
    camera: "Nikon D850 · 85mm f/1.8 · 1/100 s · ISO 200",
    settings: [
      { label: "Exposure", value: -0.16, min: -1, max: 1, dec: 2 },
      { label: "Contrast", value: 6, min: -50, max: 50 },
      { label: "Shadows", value: 28, min: -100, max: 100 },
      { label: "Whites", value: 10, min: -100, max: 100 },
      { label: "Blacks", value: -12, min: -100, max: 100 },
      { label: "Vibrance", value: 10, min: -100, max: 100 },
    ],
    passes: ["Denoise", "Enhance details", "Lens corrections", "sRGB export"],
  },

  // ── Analytics (loaded only after cookie consent) ──────────────────────────
  analytics: { gaMeasurementId: "G-QP1FK83BL2", clarityProjectId: "un99vlx16e" },

  seo: {
    ogImage: "/og/og-default.jpg",
    locale: "en_US",
    googleSiteVerification: "",
    bingSiteVerification: "B58752A2FD1D5782E50E38AB422508D1",
  },

  aboutImage: {
    src: "/images/about-harinda.webp",
    alt: "Harinda Fernando at his desk, a color-calibrated monitor showing a landscape photo and a color wheel behind him.",
    width: 1600,
    height: 1067,
  },
  personImage: "/images/harinda-portrait.webp",
};

// ── Helpers ─────────────────────────────────────────────────────────────────
export function waLink(text) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
export function abs(path = "/") {
  return new URL(path, site.url).href;
}
export function priceRange() {
  const p = site.packages.map((x) => x.price);
  return `$${Math.min(...p)}–$${Math.max(...p)}`;
}

export default site;
