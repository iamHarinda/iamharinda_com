import pathlib

blog_dir = pathlib.Path("src/content/blog")

PE = "/pricing/#photo-editing"
CT = "/contact/"
WD = "/web-development/"
WDP = "/web-development/#pricing"
FD = "/fashion-designing/#pricing"
FDH = "/fashion-designing/"

edits = {
"ai-vs-human-photo-editing.md": (
"You can send two or three photos over and get a free sample edit before committing to anything, or check the pricing page to see how packages work for full galleries.",
f"You can send two or three photos over and get a [free sample edit]({CT}) before committing to anything, or check the [pricing page]({PE}) to see how packages work for full galleries."
),
"wedding-photo-editing-cost-2026.md": (
"Curious what your own gallery would actually run? Pricing runs flat by volume, and sending two or three photos for a free sample edit first is a normal way to see the quality before spending anything.",
f"Curious what your own gallery would actually run? [Pricing]({PE}) runs flat by volume, and sending two or three photos for a [free sample edit]({CT}) first is a normal way to see the quality before spending anything."
),
"outsource-wedding-photo-editing-guide.md": (
"Sending two or three images over for a free sample edit is the easiest way to see the style before committing a whole gallery.",
f"Sending two or three images over for a [free sample edit]({CT}) is the easiest way to see the style before committing a whole gallery."
),
"lightroom-classic-vs-lightroom-wedding-photographers.md": (
"A free sample edit is the easiest way to see how it looks before committing to anything bigger, and the pricing page breaks down what full galleries cost.",
f"A [free sample edit]({CT}) is the easiest way to see how it looks before committing to anything bigger, and the [pricing page]({PE}) breaks down what full galleries cost."
),
"color-grade-wedding-photos-lightroom-guide.md": (
"Send two or three photos over for a free sample edit, or check the pricing page for full galleries.",
f"Send two or three photos over for a [free sample edit]({CT}), or check the [pricing page]({PE}) for full galleries."
),
"lightroom-masking-portraits-skin-sky-color.md": (
"Send a free sample edit request or check out the pricing page for full galleries.",
f"[Send a free sample edit request]({CT}) or check out the [pricing page]({PE}) for full galleries."
),
"batch-editing-lightroom-without-losing-consistency.md": (
"A free sample edit shows the quality before you commit, and pricing runs by volume for full galleries.",
f"A [free sample edit]({CT}) shows the quality before you commit, and [pricing]({PE}) runs by volume for full galleries."
),
"lightroom-presets-vs-custom-editing-wedding-galleries.md": (
"Send a free sample edit request, or check pricing for full galleries.",
f"[Send a free sample edit request]({CT}), or check [pricing]({PE}) for full galleries."
),
"fix-mixed-lighting-white-balance-lightroom.md": (
"Send a free sample edit request or check pricing for full galleries.",
f"[Send a free sample edit request]({CT}) or check [pricing]({PE}) for full galleries."
),
"lightroom-workflow-deliver-wedding-galleries-faster.md": (
"Send a free sample edit request or check the pricing page.",
f"[Send a free sample edit request]({CT}) or check the [pricing page]({PE})."
),
"skin-retouching-photoshop-keep-texture-wedding.md": (
"Send a free sample edit request or check pricing for full galleries.",
f"[Send a free sample edit request]({CT}) or check [pricing]({PE}) for full galleries."
),
"raw-vs-jpeg-photo-editing.md": (
"Send a free sample edit request or check the pricing page for full galleries.",
f"[Send a free sample edit request]({CT}) or check the [pricing page]({PE}) for full galleries."
),
"how-long-does-wedding-photo-editing-take.md": (
"Send a free sample edit request to see the process, or check current pricing.",
f"[Send a free sample edit request]({CT}) to see the process, or check [current pricing]({PE})."
),
"sneak-peek-gallery-48-hours-wedding-editing.md": (
"Send a free sample edit request or check current pricing.",
f"[Send a free sample edit request]({CT}) or check [current pricing]({PE})."
),
"wedding-photo-culling-guide.md": (
"Send a free sample edit request or check pricing by volume.",
f"[Send a free sample edit request]({CT}) or check [pricing]({PE}) by volume."
),
"what-to-include-wedding-photography-package.md": (
"Check current rates or send over a free sample edit request to check quality first.",
f"Check [current rates]({PE}) or [send over a free sample edit request]({CT}) to check quality first."
),
"second-shooter-vs-outsourced-editing.md": (
"Send a free sample edit request or check pricing by volume.",
f"[Send a free sample edit request]({CT}) or check [pricing]({PE}) by volume."
),
"common-editing-mistakes-unnatural-wedding-photos.md": (
"Send a free sample edit request or check pricing.",
f"[Send a free sample edit request]({CT}) or check [pricing]({PE})."
),
"build-consistent-editing-style-wedding-photography.md": (
"a free sample edit will show whether the match is close before you commit to a full gallery. Check pricing here too.",
f"a [free sample edit]({CT}) will show whether the match is close before you commit to a full gallery. [Check pricing here too]({PE})."
),
"wedding-client-gallery-delivery-expectations-2026.md": (
"Send a free sample edit request or check current pricing.",
f"[Send a free sample edit request]({CT}) or check [current pricing]({PE})."
),

# ---- web development ----
"do-you-need-a-website-or-is-social-media-enough.md": (
"A free scope call is the easiest way to find out what you'd actually need, no pressure, no charge attached.",
f"A [free scope call]({WD}) is the easiest way to find out what you'd actually need, no pressure, no charge attached."
),
"how-much-does-a-custom-website-cost.md": (
"A free scope call gets you a fixed price based on what you actually need, no hourly guessing involved.",
f"A [free scope call]({WD}) gets you a fixed price based on what you actually need, no hourly guessing involved."
),
"website-builder-wordpress-or-custom-coded.md": (
"A free scope call is a good place to get an honest answer, including \"you don't need custom development yet\" if that turns out to be true.",
f"A [free scope call]({WD}) is a good place to get an honest answer, including \"you don't need custom development yet\" if that turns out to be true."
),
"domain-vs-hosting-vs-website-explained.md": (
"That's part of the standard launch process here.",
f"That's part of the [standard launch process here]({WD})."
),
"what-is-a-cms-do-you-need-one.md": (
"That's exactly the kind of thing a scope call sorts out before any pricing even gets discussed.",
f"That's exactly the kind of thing a [scope call]({WD}) sorts out before any pricing even gets discussed."
),
"do-you-own-your-website.md": (
"Book a scope call, or reach out if you want to check your current setup.",
f"[Book a scope call]({WD}), or [reach out]({CT}) if you want to check your current setup."
),
"how-long-does-it-take-to-build-a-website.md": (
"A written proposal here includes a dated timeline once scope is agreed, no open-ended \"it depends\" left hanging over the project.",
f"A [written proposal]({WD}) includes a dated timeline once scope is agreed, no open-ended \"it depends\" left hanging over the project."
),
"what-to-prepare-before-hiring-a-web-developer.md": (
"A free thirty-minute scope call turns even a rough idea into a clear, fixed-price proposal.",
f"A [free thirty-minute scope call]({WD}) turns even a rough idea into a clear, fixed-price proposal."
),
"red-flags-hiring-someone-to-build-your-website.md": (
"Every project here starts with a free scope call and a written, fixed-price proposal before anything gets charged.",
f"Every project here starts with a [free scope call]({WD}) and a written, fixed-price proposal before anything gets charged."
),
"freelancer-agency-or-diy-builder-who-should-build-your-website.md": (
"Working directly with the person actually building your site, with fixed pricing from a free scope call?",
f"Working directly with the person actually building your site, with fixed pricing from a [free scope call]({WD})?"
),
"what-happens-if-your-website-breaks.md": (
"Thirty days of post-launch support comes included with every build here, and ongoing maintenance is available after that at a stated monthly rate, no surprises waiting down the road.",
f"Thirty days of post-launch support comes included with [every build here]({WD}), and ongoing maintenance is available after that at a stated monthly rate, no surprises waiting down the road."
),
"inherited-website-old-developer-disappeared.md": (
"Send over what you have and get an honest read on whether it's worth saving or better off rebuilt.",
f"[Send over what you have]({CT}) and get an honest read on whether it's worth saving or better off rebuilt."
),
"do-you-need-an-online-store.md": (
"That's exactly the kind of question a scope call is built for.",
f"That's exactly the kind of question a [scope call]({WD}) is built for."
),
"why-a-slow-website-is-costing-you-customers.md": (
"Custom-coded sites here ship without the bloat that comes bundled with heavy themes and page builders.",
f"[Custom-coded sites here]({WD}) ship without the bloat that comes bundled with heavy themes and page builders."
),
"what-mobile-friendly-actually-means.md": (
"Every site here is built mobile-first, not shrunk down from a desktop layout as an afterthought once the \"real\" version is finished.",
f"[Every site here]({WD}) is built mobile-first, not shrunk down from a desktop layout as an afterthought once the \"real\" version is finished."
),
"seo-for-non-technical-business-owners.md": (
"and that's baked into every build here, not sold separately as some kind of add-on you have to pay extra for later.",
f"and that's baked into [every build here]({WD}), not sold separately as some kind of add-on you have to pay extra for later."
),
"business-email-at-your-own-domain.md": (
"Business email setup is part of the standard launch process here, right alongside the domain and hosting configuration.",
f"Business email setup is part of the [standard launch process here]({WD}), right alongside the domain and hosting configuration."
),
"real-ongoing-costs-of-owning-a-website.md": (
"Ongoing maintenance here is a stated flat monthly rate, no surprise invoices, listed right alongside the build pricing from the start.",
f"Ongoing maintenance here is a stated flat monthly rate, no surprise invoices, listed right alongside the [build pricing]({WDP}) from the start."
),
"how-page-builders-and-no-code-tools-lock-you-in.md": (
"No platform lock-in, no proprietary format, the full source code transfers to you at launch, hosted wherever you choose to put it.",
f"No platform lock-in, no proprietary format, [the full source code transfers to you at launch]({WD}), hosted wherever you choose to put it."
),
"website-scope-101-how-to-explain-what-you-want.md": (
"A free scope call is built exactly for this.",
f"A [free scope call]({WD}) is built exactly for this."
),

# ---- pattern design ----
"what-is-a-seamless-pattern-clothing-fabric.md": (
"Every order includes a mockup so you can see exactly how the pattern sits on the actual product before anything goes to print.",
f"[Every order]({FD}) includes a mockup so you can see exactly how the pattern sits on the actual product before anything goes to print."
),
"how-seamless-repeat-patterns-are-made.md": (
"Every design comes with a mockup showing how it actually looks repeated on the garment itself.",
f"[Every design]({FD}) comes with a mockup showing how it actually looks repeated on the garment itself."
),
"seamless-pattern-vs-standalone-print.md": (
"Send a description of what you're picturing and get a straight answer before committing to a package.",
f"[Send a description]({CT}) of what you're picturing and get a straight answer before committing to a [package]({FD})."
),
"half-drop-brick-mirror-repeat-patterns-explained.md": (
"Every repeat gets tested and shown to you before it's finalized.",
f"[Every repeat]({FD}) gets tested and shown to you before it's finalized."
),
"what-makes-a-print-pattern-production-ready.md": (
"Every order here comes with Ai, PDF, PNG and JPG files at print resolution, the formats a print shop or supplier can actually run with directly.",
f"[Every order here]({FD}) comes with Ai, PDF, PNG and JPG files at print resolution, the formats a print shop or supplier can actually run with directly."
),
"2026-pattern-design-trends-apparel.md": (
"Send a brief and a couple of references you like, and get a design built around your brand specifically.",
f"[Send a brief]({CT}) and a couple of references you like, and get a design built around your brand specifically."
),
"vector-vs-raster-print-pattern-design.md": (
"Every design here includes the editable Ai vector source file, alongside PDF, PNG and JPG, not just flattened images handed over at the end of a project.",
f"[Every design here]({FD}) includes the editable Ai vector source file, alongside PDF, PNG and JPG, not just flattened images handed over at the end of a project."
),
"how-many-colours-repeat-pattern-screen-print-sublimation.md": (
"Tell your designer the production method up front and the design gets built to actually work with it from day one of the project.",
f"[Tell your designer]({CT}) the production method up front and the design gets built to actually work with it from day one of the project."
),
"what-goes-into-a-good-golf-polo-shirt-design.md": (
"Every polo and golf shirt design here includes a realistic front and back mockup on the actual garment, not just flat artwork sitting on a plain background.",
f"[Every polo and golf shirt design here]({FD}) includes a realistic front and back mockup on the actual garment, not just flat artwork sitting on a plain background."
),
"custom-team-polo-shirts-what-to-send-designer.md": (
"Have your logo and a rough idea ready? Send it over and get concepts back with a realistic mockup on the actual garment.",
f"Have your logo and a rough idea ready? [Send it over]({CT}) and get concepts back with a realistic mockup on the actual garment."
),
"embroidery-vs-sublimation-print-design-differences.md": (
"Different placements, different production methods, the design gets built to actually work for each one from the start.",
f"Different placements, different production methods, [the design gets built]({FD}) to actually work for each one from the start."
),
"2026-golf-polo-apparel-design-trends.md": (
"Bold or understated, the design gets built around your brand, not a generic trend template pulled off a shelf.",
f"Bold or understated, [the design gets built around your brand]({FD}), not a generic trend template pulled off a shelf."
),
"placement-matters-logo-stretched-polo-template.md": (
"Every design here gets shown on a realistic front and back mockup before it's finalized, never a flat template with artwork just pasted on top.",
f"[Every design here]({FD}) gets shown on a realistic front and back mockup before it's finalized, never a flat template with artwork just pasted on top."
),
"corporate-polo-shirt-design-small-canvas-branding.md": (
"Getting your brand right at garment scale, front and back, is exactly what this service is built around.",
f"Getting your brand right at garment scale, front and back, is exactly what [this service]({FDH}) is built around."
),
"how-to-brief-a-polo-golf-shirt-design.md": (
"Message first and talk it through before ordering anything, that's exactly what the process is built for.",
f"[Message first]({CT}) and talk it through before ordering anything, that's exactly what the process is built for."
),
"pattern-design-vs-patternmaking-difference.md": (
"Ask first if you're not sure it's a fit.",
f"[Ask first]({CT}) if you're not sure it's a fit."
),
"file-formats-print-pattern-designer.md": (
"Every order here includes Ai, PDF, PNG and JPG, the full set, not just a flattened preview handed over at the end of the project.",
f"[Every order here]({FD}) includes Ai, PDF, PNG and JPG, the full set, not just a flattened preview handed over at the end of the project."
),
"commercial-use-rights-pattern-designs.md": (
"Every design here is built from scratch for your specific brief, with full commercial use included, no separate licensing, no usage cap to worry about.",
f"[Every design here]({FD}) is built from scratch for your specific brief, with full commercial use included, no separate licensing, no usage cap to worry about."
),
"mockups-before-production-why-you-need-them.md": (
"A realistic front and back mockup on the actual garment comes standard with every package here, never an extra step you have to ask for separately.",
f"A realistic front and back mockup on the actual garment comes standard with [every package here]({FD}), never an extra step you have to ask for separately."
),
"concept-to-print-ready-polo-design-order-process.md": (
"Ready to see what this looks like for your own design? Message first with what you're picturing, no commitment required at that stage.",
f"Ready to see what this looks like for your own design? [Message first]({CT}) with what you're picturing, no commitment required at that stage."
),
}

assert len(edits) == 60, len(edits)

missing = []
for fname, (old, new) in edits.items():
    fpath = blog_dir / fname
    text = fpath.read_text()
    if old not in text:
        missing.append(fname)
        continue
    n = text.count(old)
    if n != 1:
        print(f"WARN: {fname} has {n} occurrences of the target string")
    text = text.replace(old, new, 1)
    fpath.write_text(text)

if missing:
    print("MISSING matches in:", missing)
else:
    print(f"All {len(edits)} files updated successfully.")
