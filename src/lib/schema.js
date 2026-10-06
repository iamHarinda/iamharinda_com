// JSON-LD builders. BaseLayout merges every page's nodes into one @graph with
// stable @ids, so search engines see one consistent entity across the site.
// No aggregateRating: Fiverr reviews are third-party and self-serving review
// markup is not eligible for rich results.

import site, { abs } from "../data/site.js";
import profile from "../data/profile.js";

const ID = {
  site: abs("/#website"),
  person: abs("/#harinda"),
  biz: abs("/#business"),
};

export function website() {
  return { "@type": "WebSite", "@id": ID.site, url: site.url, name: "Harinda Fernando", inLanguage: "en-US", publisher: { "@id": ID.biz } };
}

export function person() {
  const school = (e, type) => ({ "@type": type, name: e.school, ...(e.url && { url: e.url }) });
  return {
    "@type": "Person",
    "@id": ID.person,
    name: site.personName,
    alternateName: [profile.fullName, site.handle],
    jobTitle: site.personTitles,
    description: `${profile.name} is a photo editor, web developer and Android app maker from ${profile.hometown}, ${profile.country}, with a B.ICT (Hons) from Rajarata University of Sri Lanka.`,
    url: abs("/"),
    image: abs(site.personImage),
    homeLocation: { "@type": "Place", name: `${profile.hometown}, ${profile.region}, ${profile.country}` },
    telephone: site.contact.phoneLk,
    alumniOf: [
      school(profile.education[0], "CollegeOrUniversity"),
      school(profile.education[1], "CollegeOrUniversity"),
      school(profile.education[2], "HighSchool"),
      school(profile.education[3], "HighSchool"),
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Information Technology (B.ICT Hons)",
        credentialCategory: "degree",
        recognizedBy: { "@type": "CollegeOrUniversity", name: profile.education[0].school },
      },
      ...profile.certifications
        .filter((c) => c.issuer !== "LinkedIn Skill Assessment")
        .map((c) => ({ "@type": "EducationalOccupationalCredential", name: c.name, credentialCategory: "certificate", recognizedBy: { "@type": "Organization", name: c.issuer } })),
    ],
    knowsAbout: ["Wedding photo editing", "Adobe Lightroom Classic", "Adobe Photoshop", "Color correction", "Portrait retouching", "Product photo editing", "Web development", "WordPress", "PHP", "Laravel", "Android app development", "Live streaming", "Video editing", "vMix", "OBS Studio", "Social media management"],
    sameAs: [...profile.profiles.map((p) => p.url), abs("/orbitra/")],
    worksFor: { "@id": ID.biz },
  };
}

/** The home page is Harinda's profile page (Google: ProfilePage structured data). */
export function profilePage({ path = "/", modified } = {}) {
  return {
    "@type": "ProfilePage",
    "@id": abs(path) + "#profile",
    url: abs(path),
    name: `${site.personName}: photo editor, web developer and app maker`,
    inLanguage: "en-US",
    isPartOf: { "@id": ID.site },
    mainEntity: { "@id": ID.person },
    ...(modified && { dateModified: modified }),
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
