// Blog categories: labels, the service each one supports, and its CTA.
export const categories = {
  "photo-editing": {
    label: "Photo editing",
    title: "Photo Editing & Wedding Workflow Guides",
    description: "Guides for wedding and portrait photographers: Lightroom workflow, culling, color, backups and outsourcing your editing.",
    service: { href: "/photo-editing/wedding/", label: "Wedding photo editing" },
    cta: { title: "Want your next gallery edited for you?", text: "Send 3 photos and get them back edited in your style, free.", href: "/free-sample/", label: "Get 3 photos edited free" },
    og: "/og/og-photo-editing.jpg",
  },
  "web-development": {
    label: "Web development",
    title: "Website Guides for Small Business Owners",
    description: "Plain-English guides to costs, timelines, ownership and choosing who builds your website.",
    service: { href: "/web-development/", label: "Custom web development" },
    cta: { title: "Need a website built properly?", text: "Hand-coded, fast, yours to keep. Fixed price after a free scope call.", href: "/web-development/", label: "See web development" },
    og: "/og/og-web-development.jpg",
  },
  "apparel-design": {
    label: "Polo & apparel design",
    title: "Polo Shirt & Print Pattern Design Guides",
    description: "Guides for teams and brands ordering custom polo and golf shirts: briefs, file formats, print methods and patterns.",
    service: { href: "/fashion-designing/", label: "Polo & golf shirt design" },
    cta: { title: "Planning a polo or golf shirt?", text: "Print-ready designs with front and back mockups, from $10.", href: "/fashion-designing/", label: "See polo design packages" },
    og: "/og/og-polo-design.jpg",
  },
};
export const catKeys = Object.keys(categories);
export const fmtDate = (d) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
