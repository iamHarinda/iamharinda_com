// ─────────────────────────────────────────────────────────────────────────────
//  iamharinda.com — single source of truth for every business detail.
//
//  Edit values here; the page templates read from this file. Anything marked
//  TODO must be filled in before you launch. Search this file for "TODO".
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "iamharinda",
  // Your name as it should appear in schema.org / "About". TODO: confirm.
  personName: "Harinda",
  domain: "www.iamharinda.com",
  url: "https://www.iamharinda.com",

  // One line. Reused in the hero and as a meta-description fallback.
  tagline:
    "Photo retouching and colour correction done by a human eye on a calibrated screen.",

  // Full site description for meta tags and structured data.
  description:
    "Human photo editing and colour correction for photographers and studios in the United States, Canada and Europe. No AI presets, no one-click batch looks. True colours — skin stays skin, whites stay white. Unlimited revisions, payment after delivery.",

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    email: "hello@iamharinda.com", // TODO: create this mailbox in Hostinger (README step 5)
    // Digits only — international format, no "+", no spaces. Used to build wa.me links.
    whatsapp: "0000000000", // TODO: e.g. "14155550123"
    whatsappNote: "Message any time. Replies within one working day.",
    fiverr: "https://www.fiverr.com/iamharinda",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Work", href: "/work/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  // ── Areas served ──────────────────────────────────────────────────────────
  areasServed: ["United States", "Canada", "Europe"],

  // ── Pricing ───────────────────────────────────────────────────────────────
  currency: "USD",
  packages: [
    { photos: 50, price: 10 },
    { photos: 100, price: 20 },
    { photos: 200, price: 40 },
  ],
  bulkNote:
    "Over 200 photos: custom offers for bulk editing. Send the shoot size and the deadline and you get a fixed quote back.",

  includes: [
    "Unlimited revisions until the edit is right",
    "High quality edited photos at full resolution",
    "Camera RAW files recommended — CR2, CR3, NEF, ARW, DNG",
    "Payment after delivery, once you have approved the work",
  ],

  payments: [
    "PayPal invoice — covers credit and debit card, Venmo, Apple Pay and Google Pay",
    "PayPal transfer",
    "Payoneer",
    "Remitly",
    "TapSend",
    "Bank deposit",
  ],

  ordering: [
    "Message on WhatsApp, or book through the Fiverr profile.",
    "Send your RAW files and any reference shots or notes on the look you want.",
    "First proofs come back for review, then unlimited revisions until you sign off.",
    "Pay after delivery, by whichever method suits you.",
  ],

  // ── Home: "What you get" ─────────────────────────────────────────────────
  whatYouGet: [
    {
      title: "Colour that matches reality",
      body:
        "White balance set by eye on a calibrated screen. Neutral whites, believable skin, no colour cast dragged across the frame.",
    },
    {
      title: "Skin that still looks like skin",
      body:
        "Blemishes and distractions go. Pores, texture and tone stay. No plastic smoothing, no face filter.",
    },
    {
      title: "One look across the whole shoot",
      body:
        "Every frame graded to sit next to the others, so the gallery holds together from the first image to the last.",
    },
    {
      title: "Exposure and detail recovered",
      body:
        "Highlights pulled back, shadows opened, contrast placed where it belongs — worked from the RAW, not baked onto a JPEG.",
    },
  ],

  // ── Home: "How it works" — the only numbered sequence on the site ────────
  howItWorks: [
    {
      title: "Send your files",
      body:
        "Share RAW files by whatever link you use. Add reference edits or a short note on the look you are after.",
    },
    {
      title: "First proofs come back",
      body:
        "A small batch first, so the direction is agreed before the full set is done. First proofs usually land within a day.",
    },
    {
      title: "Revise until it is right",
      body:
        "Mark up anything that is off. Revisions are unlimited and included — there is no per-change fee.",
    },
    {
      title: "Approve, then pay",
      body:
        "Final files are delivered at full resolution. You pay once the work is approved, by whichever method suits you.",
    },
  ],

  // ── Testimonials ─────────────────────────────────────────────────────────
  // TODO: replace with real, verbatim quotes from your Fiverr reviews. If you
  // can, add the reviewer's first name and role/location. Delete any you do
  // not have yet — three real ones beat six invented ones, and do NOT add an
  // aggregateRating to the structured data until real reviews are on the page.
  testimonials: [
    {
      quote:
        "TODO — paste a real Fiverr review here, word for word. Two or three sentences reads best.",
      name: "TODO — first name",
      role: "TODO — e.g. Wedding photographer, Oregon",
    },
    {
      quote: "TODO — a second real review, verbatim.",
      name: "TODO — first name",
      role: "TODO — e.g. Studio owner, Toronto",
    },
    {
      quote: "TODO — a third real review, verbatim.",
      name: "TODO — first name",
      role: "TODO — e.g. Portrait photographer, Berlin",
    },
  ],

  // ── FAQ — answers written as standalone, quotable statements ─────────────
  //  Each answer must make sense on its own, with no surrounding context,
  //  because that is the form AI answer engines quote.
  faqs: [
    {
      q: "Do you use AI or automatic presets?",
      a: "No. Every photo is edited by hand on a colour-calibrated screen. There are no AI looks, no one-click batch filters and no auto-retouch. A person judges each frame.",
    },
    {
      q: "What does photo editing cost?",
      a: "Editing is priced by volume: 50 photos is 10 US dollars, 100 photos is 20 US dollars, and 200 photos is 40 US dollars. Orders over 200 photos get a custom bulk quote. Every order includes unlimited revisions and is paid only after delivery.",
    },
    {
      q: "When do I pay?",
      a: "You pay after the edited photos are delivered and you have approved them. There is no upfront deposit. Payment can be made by PayPal invoice, PayPal transfer, Payoneer, Remitly, TapSend or bank deposit.",
    },
    {
      q: "What files should I send?",
      a: "Camera RAW files give the best result — CR2, CR3, NEF, ARW and DNG are all fine. High-quality JPEGs can be edited too, but RAW allows proper recovery of colour, highlight and shadow detail.",
    },
    {
      q: "How many revisions do I get?",
      a: "Revisions are unlimited and included in the price. You can send notes back as many times as needed until the edit is right, with no extra charge for any change.",
    },
    {
      q: "How long does editing take?",
      a: "A set of 50 to 100 photos is usually returned in two to four days. Larger volumes and rush deadlines are quoted individually. First proofs are normally sent within a day so the direction can be confirmed early.",
    },
    {
      q: "Who do you work with?",
      a: "Clients are professional photographers and studios in the United States, Canada and Europe. Work is delivered online, so physical location does not matter.",
    },
    {
      q: "How do I place an order?",
      a: "Message on WhatsApp, or book through the Fiverr profile at fiverr.com/iamharinda. Send the RAW files and any reference edits, and the first proofs come back for review.",
    },
  ],

  // ── Hero before/after ──────────────────────────────────────────────────────
  //  Files live in /public/images/. Replace the generated placeholders with
  //  real WebP exports at the stated dimensions and keep the filenames (or
  //  change them here). Alt text must honestly describe each image.
  hero: {
    width: 1600,
    height: 1000,
    before: {
      src: "/images/hero-before.webp",
      alt: "Unedited RAW portrait: flat contrast and a green cast from mixed indoor lighting.", // TODO: describe your real image
    },
    after: {
      src: "/images/hero-after.webp",
      alt: "The same portrait after colour correction: neutral skin, clean whites, balanced contrast.", // TODO
    },
  },

  // ── Sample before/afters ──────────────────────────────────────────────────
  //  Home shows the first three; /work/ shows all of them.
  samples: [
    {
      id: "sample-1",
      caption: "Wedding — mixed venue light",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-1-before.webp", alt: "TODO — unedited wedding photo; describe the colour problem." },
      after: { src: "/images/sample-1-after.webp", alt: "TODO — the same photo corrected; describe the result." },
    },
    {
      id: "sample-2",
      caption: "Studio portrait — skin retouch",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-2-before.webp", alt: "TODO — unedited studio portrait." },
      after: { src: "/images/sample-2-after.webp", alt: "TODO — retouched portrait with texture kept." },
    },
    {
      id: "sample-3",
      caption: "Outdoor family session — white balance",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-3-before.webp", alt: "TODO — unedited outdoor family photo." },
      after: { src: "/images/sample-3-after.webp", alt: "TODO — corrected white balance and exposure." },
    },
    {
      id: "sample-4",
      caption: "Real estate interior — window pull",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-4-before.webp", alt: "TODO — unedited interior, blown-out window." },
      after: { src: "/images/sample-4-after.webp", alt: "TODO — balanced interior with window detail held." },
    },
    {
      id: "sample-5",
      caption: "Event — high-ISO clean-up",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-5-before.webp", alt: "TODO — unedited event photo, noisy shadows." },
      after: { src: "/images/sample-5-after.webp", alt: "TODO — cleaned shadows, corrected colour." },
    },
    {
      id: "sample-6",
      caption: "Product — colour accuracy",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-6-before.webp", alt: "TODO — unedited product shot, off colour." },
      after: { src: "/images/sample-6-after.webp", alt: "TODO — accurate product colour on a neutral background." },
    },
  ],

  // ── SEO defaults ─────────────────────────────────────────────────────────
  seo: {
    ogImage: "/og/og-default.jpg", // TODO: a real 1200×630 export
    twitterHandle: "", // TODO: "@yourhandle" if you have one, otherwise leave blank
    locale: "en_US",
  },
};

// ── Derived helpers ───────────────────────────────────────────────────────

/** wa.me link with an optional pre-filled message. */
export function waLink(text) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Human price range string, e.g. "$10–$40 USD". */
export function priceRange() {
  const prices = site.packages.map((p) => p.price);
  return `$${Math.min(...prices)}–$${Math.max(...prices)} ${site.currency}`;
}

/** Absolute URL for a site-relative path. */
export function abs(path = "/") {
  return new URL(path, site.url).href;
}

export default site;
