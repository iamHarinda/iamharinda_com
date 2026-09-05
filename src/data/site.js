// ─────────────────────────────────────────────────────────────────────────────
//  iamharinda.com — single source of truth for every business detail.
//
//  Edit values here; the page templates read from this file.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "iamharinda",
  // Your name as it should appear in schema.org / "About".
  personName: "Harinda Fernando",
  domain: "www.iamharinda.com",
  url: "https://www.iamharinda.com",

  // One line. Reused in the hero and as a meta-description fallback.
  tagline:
    "Photo retouching and colour correction done by a human eye on a calibrated screen.",

  // Full site description for meta tags and structured data.
  description:
    "Human photo editing and colour correction for photographers and studios in the United States, Canada and Europe. No AI presets, no one-click batch looks. True colours — skin stays skin, whites stay white. Free sample edit, unlimited revisions, payment after delivery.",

  // The free-sample offer — surfaced across the site. Edit the wording here.
  freeSample: {
    short: "Free sample edit",
    line: "Send two or three photos and get them back fully edited, free, before you decide anything.",
    cta: "Get a free sample edit",
  },

  // Public social proof from the Fiverr profile. Shown as linked text only —
  // not wired into structured data until real reviews are published on this
  // site.
  fiverrStats: {
    rating: "4.9",
    reviews: 183,
    ordersPlus: 300,
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  contact: {
    email: "hello@iamharinda.com", // create this mailbox in Hostinger (README step 5)
    // Digits only — international format, no "+", no spaces. Used to build wa.me links.
    whatsapp: "447355229599",
    // Same number, formatted for display. Shown as the link text; the link still opens WhatsApp.
    whatsappDisplay: "+44 7355 229599",
    whatsappNote: "Message any time. Replies within one working day.",
    fiverr: "https://www.fiverr.com/iamharinda",
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/pricing/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],

  // ── Availability badge (home hero) ───────────────────────────────────────
  availability: {
    on: true, // set false to show the offline state
    onLabel: "Available now — replies within a working day",
    offLabel: "Currently booked — leave a message and I'll reply",
  },
  // The /work/ page and its sample gallery are removed for now — re-add the
  // nav item above and recreate src/pages/work.astro when real before/after
  // images are ready. The `samples` data and <Sample> component are kept below.

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
    "A free sample edit before you order — a few photos, done, no charge",
    "Unlimited revisions until the edit is right",
    "High quality edited photos at full resolution",
    "Camera RAW files recommended — CR2, CR3, NEF, ARW, DNG",
    "Payment after delivery, once you have approved the work",
  ],

  // Service lines — used for structured data and the About page.
  services: [
    "Colour correction and white balance",
    "Portrait and headshot retouching",
    "Wedding and event album editing",
    "Bulk photo editing",
    "Skin retouching that keeps texture",
    "Exposure, contrast and RAW recovery",
  ],

  payments: [
    "PayPal invoice — covers credit and debit card, Venmo, Apple Pay and Google Pay",
    "PayPal transfer",
    "Payoneer",
    "Remitly",
    "TapSend",
    "Bank deposit",
  ],

  // Logos shown alongside the payments list on the pricing page.
  // Brand marks are official SVGs (/public/logos/); card and bank are
  // generic category icons, not tied to one provider.
  paymentLogos: [
    { logo: "/logos/paypal.svg", name: "PayPal" },
    { logo: "/logos/venmo.svg", name: "Venmo" },
    { logo: "/logos/payoneer.svg", name: "Payoneer" },
    { logo: "/logos/remitly.png", name: "Remitly" },
    { logo: "/logos/card.svg", name: "Credit / debit card" },
    { logo: "/logos/bank.svg", name: "Wire transfer" },
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

  // ── The setup — equipment and software used to do the work ──────────────
  tools: [
    {
      label: "Monitor",
      value: "Factory-calibrated ASUS ProArt display — true-to-life colour, judged on screen, not guessed at",
    },
    {
      label: "Editing software",
      value: "Adobe Lightroom Classic, Lightroom and Photoshop",
    },
    {
      label: "Delivery",
      value: "Google Drive — full-resolution files, no compression",
    },
  ],

  // Individual items for the home page "tools" logo strip.
  // Logos are official brand assets stored in /public/logos/.
  toolLogos: [
    { logo: "/logos/calman-verified-mark.png", name: "Calman Verified", note: "Factory-calibrated monitor" },
    { logo: "/logos/adobelightroom.svg", name: "Lightroom Classic & Lightroom", note: "RAW processing and cataloguing" },
    { logo: "/logos/adobephotoshop.svg", name: "Photoshop", note: "Retouching" },
    { logo: "/logos/googledrive.svg", name: "Google Drive", note: "Delivery" },
    { logo: "/logos/starlink.png", name: "Starlink", note: "High-speed internet connection" },
  ],

  // ── Testimonials ─────────────────────────────────────────────────────────
  // Paraphrased from public Fiverr feedback. Replace with verbatim quotes and
  // real first names as they come in, and only then add an aggregateRating to
  // the structured data.
  testimonials: [
    {
      quote:
        "The photos came back clean, vibrant and professionally done. A great eye for detail — everything was enhanced in a natural, balanced way.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
    },
    {
      quote:
        "I sent some really dark pictures and they came back looking exactly how I wanted. Fast, too.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
    },
    {
      quote:
        "Fernando was very professional — quick response time and fast delivery, and really flexible. I'll definitely use his services again.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
    },
    {
      quote:
        "Fernando did an excellent job editing some portraits for me. Super happy with the edits.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
    },
    {
      quote:
        "The whole process was really smooth — quick replies, good communication, fast delivery. No drama, just solid work.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
    },
    {
      quote:
        "Communication was easy from start to finish, and the edits came back looking natural — exactly the style I was after. Will order again.",
      name: "Verified Fiverr review",
      role: "Fiverr review",
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
      q: "Do you offer a free sample edit?",
      a: "Yes. Send two or three photos and they are edited and returned free, with no obligation to order. It is the easiest way to see the quality and the style before committing to a full shoot.",
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
    {
      q: "What equipment and software do you use?",
      a: "Colour is judged on a factory-calibrated ASUS ProArt monitor for true-to-life accuracy. Editing is done in Adobe Lightroom Classic, Lightroom and Photoshop. Finished files are delivered at full resolution through Google Drive.",
    },
  ],

  // ── Hero before/after ──────────────────────────────────────────────────────
  //  DORMANT: the hero slider is removed from index.astro for now because there
  //  is no real matched pair. To bring it back: add real
  //  /public/images/hero-before.webp + hero-after.webp (same photo, unedited vs
  //  edited) at the sizes below, restore the <figure> in src/pages/index.astro
  //  and the hero block in scripts/gen-placeholders.mjs.
  hero: {
    width: 1600,
    height: 1000,
    before: {
      src: "/images/hero-before.webp",
      alt: "Unedited RAW portrait: flat contrast and a green cast from mixed indoor lighting.",
    },
    after: {
      src: "/images/hero-after.webp",
      alt: "The same portrait after colour correction: neutral skin, clean whites, balanced contrast.",
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
      before: { src: "/images/sample-1-before.webp", alt: "Unedited wedding photo with a warm colour cast from mixed venue lighting." },
      after: { src: "/images/sample-1-after.webp", alt: "The same wedding photo with neutral white balance and balanced exposure." },
    },
    {
      id: "sample-2",
      caption: "Studio portrait — skin retouch",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-2-before.webp", alt: "Unedited studio portrait before retouching." },
      after: { src: "/images/sample-2-after.webp", alt: "Studio portrait after skin retouching with pores and texture kept." },
    },
    {
      id: "sample-3",
      caption: "Outdoor family session — white balance",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-3-before.webp", alt: "Unedited outdoor family photo with a cool colour cast." },
      after: { src: "/images/sample-3-after.webp", alt: "Outdoor family photo with corrected white balance and exposure." },
    },
    {
      id: "sample-4",
      caption: "Real estate interior — window pull",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-4-before.webp", alt: "Unedited real estate interior with a blown-out window." },
      after: { src: "/images/sample-4-after.webp", alt: "Real estate interior with window detail recovered and even light." },
    },
    {
      id: "sample-5",
      caption: "Event — high-ISO clean-up",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-5-before.webp", alt: "Unedited event photo with noisy shadows from a high ISO." },
      after: { src: "/images/sample-5-after.webp", alt: "Event photo with cleaned shadows and corrected colour." },
    },
    {
      id: "sample-6",
      caption: "Product — colour accuracy",
      width: 1200,
      height: 800,
      before: { src: "/images/sample-6-before.webp", alt: "Unedited product shot with inaccurate colour." },
      after: { src: "/images/sample-6-after.webp", alt: "Product shot with accurate colour on a neutral background." },
    },
  ],

  // ── Portraits ───────────────────────────────────────────────────────────
  //  Source files live in /photos-source/ (not deployed). Re-run
  //  `npm run optimise:photos` after changing them.
  aboutImage: {
    src: "/images/about-harinda.webp",
    alt: "Harinda Fernando at his desk, a colour-calibrated monitor showing a landscape photo and a colour wheel behind him.",
    width: 1600,
    height: 1067,
  },
  personImage: "/images/harinda-portrait.webp", // 800×800, used in structured data

  // ── Analytics ────────────────────────────────────────────────────────────
  analytics: {
    gaMeasurementId: "G-QP1FK83BL2",
    clarityProjectId: "yddumuy5ux",
  },

  // ── SEO defaults ─────────────────────────────────────────────────────────
  seo: {
    ogImage: "/og/og-default.jpg", // 1200×630, generated by npm run optimise:photos
    twitterHandle: "", // "@yourhandle" if you have one, otherwise leave blank
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
