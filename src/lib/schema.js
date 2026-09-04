// JSON-LD builders. Pages pass the results to BaseLayout via the `jsonLd` prop.
// No aggregateRating anywhere — add that only when real reviews are on the site.

import site, { priceRange, abs } from "../data/site.js";

/** schema.org OfferCatalog for the three fixed packages. */
export function offerCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Photo editing packages",
    itemListElement: site.packages.map((p) => ({
      "@type": "Offer",
      name: `${p.photos} photos edited`,
      description: `Colour correction and retouching for ${p.photos} photos, by hand.`,
      price: String(p.price),
      priceCurrency: site.currency,
      category: "Photo retouching and colour correction",
      availability: "https://schema.org/InStock",
      url: abs("/pricing/"),
    })),
  };
}

/** Standalone OfferCatalog node (with @context) for the pricing page. */
export function offerCatalogDocument() {
  return { "@context": "https://schema.org", ...offerCatalog() };
}

/** The core business entity. Repeated site-wide, which is fine and expected. */
export function professionalService() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": abs("/#business"),
    name: site.name,
    description: site.description,
    url: site.url,
    image: abs(site.seo.ogImage),
    email: site.contact.email,
    priceRange: priceRange(),
    currenciesAccepted: site.currency,
    paymentAccepted:
      "PayPal, Payoneer, Remitly, TapSend, Bank deposit, Credit Card, Debit Card",
    serviceType: "Photo retouching and colour correction",
    knowsLanguage: "en",
    areaServed: site.areasServed.map((name) => ({ "@type": "Place", name })),
    sameAs: [site.contact.fiverr],
    hasOfferCatalog: offerCatalog(),
  };
}

/** FAQPage from an array of { q, a }. */
export function faqPage(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** BreadcrumbList for interior pages. */
export function breadcrumb(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
