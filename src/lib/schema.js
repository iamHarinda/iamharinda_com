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

/** The person behind the business. */
export function person() {
  return {
    "@type": "Person",
    "@id": abs("/#harinda"),
    name: site.personName,
    jobTitle: site.personTitles,
    url: site.url,
    mainEntityOfPage: abs("/about/"),
    image: abs(site.personImage),
    address: {
      "@type": "PostalAddress",
      addressCountry: site.location.country,
    },
    nationality: { "@type": "Country", name: site.location.country },
    sameAs: [site.contact.fiverr],
    knowsAbout: site.services,
  };
}

/** Standalone Person node (with @context) for the About page. */
export function personDocument() {
  return { "@context": "https://schema.org", ...person() };
}

/**
 * A single service line. Pass the frontmatter title/description straight through
 * so the structured data matches the visible page.
 */
export function service({ name, description, serviceType, path, lowPrice }) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    url: abs(path),
    provider: person(),
    areaServed: site.areasServed.map((n) => ({ "@type": "Country", name: n })),
  };
  if (lowPrice != null) {
    node.offers = {
      "@type": "AggregateOffer",
      priceCurrency: site.currency,
      lowPrice: String(lowPrice),
      availability: "https://schema.org/InStock",
      url: abs(path),
    };
  }
  return node;
}

/** The core business entity. Repeated site-wide, which is fine and expected. */
export function professionalService() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Service"],
    "@id": abs("/#business"),
    name: site.name,
    alternateName: "iamharinda photo editing",
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    image: abs(site.seo.ogImage),
    email: site.contact.email,
    priceRange: priceRange(),
    currenciesAccepted: site.currency,
    paymentAccepted:
      "PayPal, Payoneer, Remitly, TapSend, Bank deposit, Credit Card, Debit Card",
    serviceType: site.services,
    knowsLanguage: "en",
    founder: person(),
    provider: person(),
    areaServed: site.areasServed.map((name) => ({ "@type": "Country", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: site.contact.fiverr,
      availableLanguage: "en",
    },
    sameAs: [site.contact.fiverr],
    hasOfferCatalog: offerCatalog(),
  };
}

/** schema.org WebSite node — helps search understand the site as an entity. */
export function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": abs("/#business") },
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
