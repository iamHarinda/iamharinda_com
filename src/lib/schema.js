// JSON-LD builders. BaseLayout merges every page's nodes into one @graph with
// stable @ids, so search engines see one consistent entity across the site.
// No aggregateRating: Fiverr reviews are third-party and self-serving review
// markup is not eligible for rich results.

import site, { abs } from "../data/site.js";

const ID = {
  site: abs("/#website"),
  person: abs("/#harinda"),
  biz: abs("/#business"),
};

export function website() {
  return { "@type": "WebSite", "@id": ID.site, url: site.url, name: "Harinda Fernando", inLanguage: "en-US", publisher: { "@id": ID.biz } };
}

export function person() {
  return {
    "@type": "Person",
    "@id": ID.person,
    name: site.personName,
    jobTitle: site.personTitles,
    url: abs("/about/"),
    image: abs(site.personImage),
    sameAs: [site.contact.fiverr],
    knowsAbout: ["Wedding photo editing", "Adobe Lightroom Classic", "Adobe Photoshop", "Color correction", "Portrait retouching", "Product photo editing", "Web development"],
    worksFor: { "@id": ID.biz },
  };
}

export function business() {
  return {
    "@type": "ProfessionalService",
    "@id": ID.biz,
    name: site.legalName,
    alternateName: site.handle,
    url: site.url,
    logo: abs("/icon-512.png"),
    image: abs(site.seo.ogImage),
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    founder: { "@id": ID.person },
    address: { "@type": "PostalAddress", addressCountry: site.location.countryCode },
    areaServed: site.areasServedCodes,
    priceRange: "$10–$100",
    currenciesAccepted: site.currency,
    paymentAccepted: "PayPal, Payoneer, Remitly, TapSend, Bank transfer",
    sameAs: [site.contact.fiverr],
  };
}

/** A service with one Offer per real package. */
export function service({ name, path, description, offers = true }) {
  const node = {
    "@type": "Service",
    "@id": abs(path) + "#service",
    name,
    serviceType: name,
    description,
    url: abs(path),
    provider: { "@id": ID.biz },
    areaServed: site.areasServedCodes,
  };
  if (offers === true) {
    node.offers = site.packages.map((p) => ({
      "@type": "Offer",
      name: `${p.photos} photos`,
      price: p.price.toFixed(2),
      priceCurrency: site.currency,
      url: abs("/pricing/"),
    }));
  } else if (typeof offers === "number") {
    node.offers = { "@type": "Offer", price: offers.toFixed(2), priceCurrency: site.currency, url: abs(path) };
  }
  return node;
}

export function faqPage(faqs) {
  return { "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

export function breadcrumb(trail) {
  return { "@type": "BreadcrumbList", itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: abs(t.path) })) };
}

export function blogPosting(post, image) {
  const path = `/blog/${post.id}/`;
  return {
    "@type": "BlogPosting",
    headline: post.data.title,
    description: post.data.description,
    image: [abs(image)],
    datePublished: post.data.publishDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.publishDate).toISOString(),
    url: abs(path),
    mainEntityOfPage: abs(path),
    inLanguage: "en-US",
    author: { "@id": ID.person },
    publisher: { "@id": ID.biz },
  };
}

export function imageObject(img, url) {
  return { "@type": "ImageObject", contentUrl: url, name: img.title, description: img.alt, creator: { "@id": ID.person }, creditText: "Edited by Harinda Fernando" };
}

/** Merge page nodes with the site-wide entities into a single @graph. */
export function graph(nodes = []) {
  return { "@context": "https://schema.org", "@graph": [website(), business(), person(), ...nodes] };
}
