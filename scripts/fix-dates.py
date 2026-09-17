import datetime, re, pathlib

order = [
    "lightroom-classic-vs-lightroom-wedding-photographers.md",
    "color-grade-wedding-photos-lightroom-guide.md",
    "lightroom-masking-portraits-skin-sky-color.md",
    "batch-editing-lightroom-without-losing-consistency.md",
    "lightroom-presets-vs-custom-editing-wedding-galleries.md",
    "fix-mixed-lighting-white-balance-lightroom.md",
    "lightroom-workflow-deliver-wedding-galleries-faster.md",
    "skin-retouching-photoshop-keep-texture-wedding.md",
    "raw-vs-jpeg-photo-editing.md",
    "how-long-does-wedding-photo-editing-take.md",
    "sneak-peek-gallery-48-hours-wedding-editing.md",
    "wedding-photo-culling-guide.md",
    "what-to-include-wedding-photography-package.md",
    "second-shooter-vs-outsourced-editing.md",
    "common-editing-mistakes-unnatural-wedding-photos.md",
    "build-consistent-editing-style-wedding-photography.md",
    "wedding-client-gallery-delivery-expectations-2026.md",
    "outsource-wedding-photo-editing-guide.md",
    "wedding-photo-editing-cost-2026.md",
    "ai-vs-human-photo-editing.md",
    "do-you-need-a-website-or-is-social-media-enough.md",
    "how-much-does-a-custom-website-cost.md",
    "website-builder-wordpress-or-custom-coded.md",
    "domain-vs-hosting-vs-website-explained.md",
    "what-is-a-cms-do-you-need-one.md",
    "do-you-own-your-website.md",
    "how-long-does-it-take-to-build-a-website.md",
    "what-to-prepare-before-hiring-a-web-developer.md",
    "red-flags-hiring-someone-to-build-your-website.md",
    "freelancer-agency-or-diy-builder-who-should-build-your-website.md",
    "what-happens-if-your-website-breaks.md",
    "inherited-website-old-developer-disappeared.md",
    "do-you-need-an-online-store.md",
    "why-a-slow-website-is-costing-you-customers.md",
    "what-mobile-friendly-actually-means.md",
    "seo-for-non-technical-business-owners.md",
    "business-email-at-your-own-domain.md",
    "real-ongoing-costs-of-owning-a-website.md",
    "how-page-builders-and-no-code-tools-lock-you-in.md",
    "website-scope-101-how-to-explain-what-you-want.md",
    "what-is-a-seamless-pattern-clothing-fabric.md",
    "how-seamless-repeat-patterns-are-made.md",
    "seamless-pattern-vs-standalone-print.md",
    "half-drop-brick-mirror-repeat-patterns-explained.md",
    "what-makes-a-print-pattern-production-ready.md",
    "2026-pattern-design-trends-apparel.md",
    "vector-vs-raster-print-pattern-design.md",
    "how-many-colours-repeat-pattern-screen-print-sublimation.md",
    "what-goes-into-a-good-golf-polo-shirt-design.md",
    "custom-team-polo-shirts-what-to-send-designer.md",
    "embroidery-vs-sublimation-print-design-differences.md",
    "2026-golf-polo-apparel-design-trends.md",
    "placement-matters-logo-stretched-polo-template.md",
    "corporate-polo-shirt-design-small-canvas-branding.md",
    "how-to-brief-a-polo-golf-shirt-design.md",
    "pattern-design-vs-patternmaking-difference.md",
    "file-formats-print-pattern-designer.md",
    "commercial-use-rights-pattern-designs.md",
    "mockups-before-production-why-you-need-them.md",
    "concept-to-print-ready-polo-design-order-process.md",
]

assert len(order) == 60, len(order)

today = datetime.date(2026, 9, 17)
end_date = today - datetime.timedelta(days=7)   # 2026-09-10, most recent post
gap = datetime.timedelta(days=3)
start_date = end_date - gap * (len(order) - 1)

blog_dir = pathlib.Path("src/content/blog")
date_re = re.compile(r"^publishDate:\s*\d{4}-\d{2}-\d{2}\s*$", re.M)

for i, fname in enumerate(order):
    d = start_date + gap * i
    date_str = d.isoformat()
    fpath = blog_dir / fname
    text = fpath.read_text()
    new_text, n = date_re.subn(f"publishDate: {date_str}", text, count=1)
    if n != 1:
        raise SystemExit(f"publishDate line not found/replaced cleanly in {fname}")
    fpath.write_text(new_text)
    print(f"{date_str}  {fname}")

print(f"\nRange: {start_date} .. {end_date}  (today={today})")
