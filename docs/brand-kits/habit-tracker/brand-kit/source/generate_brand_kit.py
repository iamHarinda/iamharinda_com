"""Generates the Habit Tracker (by Orbitra) brand kit: SVG masters + PNG exports."""
import math, os, json
from playwright.sync_api import sync_playwright

import pathlib
ROOT = str(pathlib.Path(__file__).resolve().parent.parent)  # the brand-kit/ folder
NAVY, CORAL, TEAL, CREAM, INK, SUN, SLATE = "#14213D", "#FF6B4A", "#2EC4B6", "#FFF8F0", "#0B1220", "#FFC857", "#5C6B7A"
FONT = "Inter, 'Inter Display', Arial, sans-serif"


def arc(cx, cy, r, a0, a1):
    """SVG arc path between angles (deg, 0 = top, clockwise)."""
    def pt(a):
        t = math.radians(a - 90)
        return cx + r * math.cos(t), cy + r * math.sin(t)
    (x0, y0), (x1, y1) = pt(a0), pt(a1)
    large = 1 if (a1 - a0) % 360 > 180 else 0
    return f"M{x0:.2f} {y0:.2f} A{r} {r} 0 {large} 1 {x1:.2f} {y1:.2f}"


def mark(cx=512, cy=512, s=1.0, ring=CREAM, dim_opacity=0.22, check=CORAL, planet=TEAL, done=9):
    """The 'Orbit Check' mark: 12 day-segments in orbit (9 done), a check, a planet."""
    r = 300 * s
    w = 46 * s
    seg, gap = 30, 9  # degrees
    parts = []
    for i in range(12):
        a0 = i * seg + gap / 2
        a1 = (i + 1) * seg - gap / 2
        op = 1 if i < done else dim_opacity
        parts.append(f'<path d="{arc(cx, cy, r, a0, a1)}" fill="none" stroke="{ring}" stroke-opacity="{op}" stroke-width="{w:.1f}" stroke-linecap="round"/>')
    # planet at end of last done segment
    t = math.radians(done * seg - gap / 2 - 90)
    px, py = cx + r * math.cos(t), cy + r * math.sin(t)
    parts.append(f'<circle cx="{px:.2f}" cy="{py:.2f}" r="{40*s:.1f}" fill="{planet}"/>')
    # check
    cw = 70 * s
    pts = [(cx - 118 * s, cy + 8 * s), (cx - 32 * s, cy + 92 * s), (cx + 132 * s, cy - 92 * s)]
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts)
    parts.append(f'<path d="{d}" fill="none" stroke="{check}" stroke-width="{cw:.1f}" stroke-linecap="round" stroke-linejoin="round"/>')
    return "\n  ".join(parts)


def svg(w, h, body, bg=None):
    bgr = f'<rect width="{w}" height="{h}" fill="{bg}"/>' if bg else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">\n  {bgr}\n  {body}\n</svg>\n'


def squircle(size, fill, r_ratio=0.225):
    r = size * r_ratio
    return f'<rect width="{size}" height="{size}" rx="{r:.1f}" fill="{fill}"/>'


def wordmark(x, y, size, color, sub_color, sub=True, anchor="start"):
    t = f'<text x="{x}" y="{y}" font-family="{FONT}" font-weight="800" font-size="{size}" letter-spacing="{-0.02*size:.1f}" fill="{color}" text-anchor="{anchor}">Habit Tracker</text>'
    if sub:
        t += f'\n  <text x="{x}" y="{y + size*0.62:.0f}" font-family="{FONT}" font-weight="600" font-size="{size*0.34:.0f}" letter-spacing="{0.12*size*0.34:.1f}" fill="{sub_color}" text-anchor="{anchor}">BY ORBITRA</text>'
    return t


def orbitra_mark(cx, cy, s, color, accent):
    """Orbitra developer mark: a ring with an orbiting moon cut into it."""
    r = 300 * s
    rx, ry = 430 * s, 150 * s
    rot = f'transform="rotate(-24 {cx} {cy})"'
    front = f"M{cx - rx:.1f} {cy} A{rx:.1f} {ry:.1f} 0 0 0 {cx + rx:.1f} {cy}"
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx:.1f}" ry="{ry:.1f}" fill="none" stroke="{accent}" stroke-width="{26*s:.1f}" {rot}/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r:.1f}" fill="none" stroke="{color}" stroke-width="{70*s:.1f}"/>'
            f'<path d="{front}" fill="none" stroke="{accent}" stroke-width="{26*s:.1f}" stroke-linecap="round" {rot}/>'
            f'<circle cx="{cx + 300*s:.1f}" cy="{cy - 245*s:.1f}" r="{58*s:.1f}" fill="{accent}"/>')


def orbitra_word(x, y, size, color, anchor="start"):
    return f'<text x="{x}" y="{y}" font-family="{FONT}" font-weight="700" font-size="{size}" letter-spacing="{0.04*size:.1f}" fill="{color}" text-anchor="{anchor}">orbitra</text>'


files = {}
L = f"{ROOT}/logo/svg"

# --- App logo masters
files[f"{L}/habit-tracker-icon.svg"] = svg(1024, 1024, squircle(1024, NAVY) + "\n  " + mark())
files[f"{L}/habit-tracker-icon-fullbleed.svg"] = svg(1024, 1024, mark(), bg=NAVY)
files[f"{L}/habit-tracker-mark-on-light.svg"] = svg(1024, 1024, mark(ring=NAVY, dim_opacity=0.15))
files[f"{L}/habit-tracker-mark-on-dark.svg"] = svg(1024, 1024, mark())
files[f"{L}/habit-tracker-mark-mono-black.svg"] = svg(1024, 1024, mark(ring=INK, check=INK, planet=INK, dim_opacity=0.2))
files[f"{L}/habit-tracker-mark-mono-white.svg"] = svg(1024, 1024, mark(ring="#FFFFFF", check="#FFFFFF", planet="#FFFFFF", dim_opacity=0.3))

def horizontal(bg, fg, sub, ring):
    s = 0.55
    body = (f'<g>{squircle(1, bg) if False else ""}</g>' +
            f'<rect x="40" y="40" width="440" height="440" rx="99" fill="{NAVY}"/>' +
            mark(260, 260, 0.36) + "\n  " + wordmark(540, 270, 120, fg, sub))
    return svg(1600, 520, body, bg=bg)

files[f"{L}/habit-tracker-horizontal-light.svg"] = horizontal(CREAM, NAVY, CORAL, NAVY)
files[f"{L}/habit-tracker-horizontal-dark.svg"] = horizontal(INK, CREAM, CORAL, CREAM)
files[f"{L}/habit-tracker-horizontal-transparent.svg"] = svg(1600, 520,
    f'<rect x="40" y="40" width="440" height="440" rx="99" fill="{NAVY}"/>' + mark(260, 260, 0.36) + wordmark(540, 270, 120, NAVY, CORAL))
files[f"{L}/habit-tracker-stacked.svg"] = svg(1024, 1200,
    f'<rect x="262" y="80" width="500" height="500" rx="112" fill="{NAVY}"/>' + mark(512, 330, 0.41) +
    wordmark(512, 800, 128, NAVY, CORAL, anchor="middle"), bg=CREAM)

# --- Orbitra developer brand
files[f"{L}/orbitra-icon.svg"] = svg(1024, 1024, squircle(1024, INK) + orbitra_mark(512, 512, 0.95, CREAM, CORAL))
files[f"{L}/orbitra-horizontal-light.svg"] = svg(1400, 440, orbitra_mark(220, 220, 0.42, NAVY, CORAL) + orbitra_word(470, 275, 170, NAVY), bg=CREAM)
files[f"{L}/orbitra-horizontal-dark.svg"] = svg(1400, 440, orbitra_mark(220, 220, 0.42, CREAM, CORAL) + orbitra_word(470, 275, 170, CREAM), bg=INK)

# --- Android icons
A = f"{ROOT}/app-icons/android"
# Adaptive foreground: 108dp canvas, content must sit in centre 66dp (61%)
files[f"{A}/adaptive-icon-foreground.svg"] = svg(1024, 1024, mark(512, 512, 0.62))
files[f"{A}/adaptive-icon-background.svg"] = svg(1024, 1024, "", bg=NAVY)
files[f"{A}/adaptive-icon-monochrome.svg"] = svg(1024, 1024, mark(512, 512, 0.62, ring="#000", check="#000", planet="#000", dim_opacity=0.35))
files[f"{A}/splash-icon.svg"] = svg(1024, 1024, mark(512, 512, 0.8))

# --- Play Store
P = f"{ROOT}/play-store"
files[f"{P}/play-store-icon-512.svg"] = svg(512, 512, f'<g transform="scale(0.5)">{mark()}</g>', bg=NAVY)
feature = (
    f'<defs><radialGradient id="g" cx="78%" cy="45%" r="60%"><stop offset="0" stop-color="#22325A"/><stop offset="1" stop-color="{NAVY}"/></radialGradient></defs>'
    f'<rect width="1024" height="500" fill="url(#g)"/>'
    + mark(800, 250, 0.62) +
    f'<text x="72" y="200" font-family="{FONT}" font-weight="800" font-size="76" letter-spacing="-1.5" fill="{CREAM}">Habit Tracker</text>'
    f'<text x="74" y="262" font-family="{FONT}" font-weight="500" font-size="34" fill="{CREAM}" fill-opacity="0.82">When did I last…? How often?</text>'
    f'<text x="74" y="306" font-family="{FONT}" font-weight="500" font-size="34" fill="{CREAM}" fill-opacity="0.82">Log it. Count it. Remember it.</text>'
    f'<rect x="74" y="352" width="360" height="56" rx="28" fill="{CORAL}"/>'
    f'<text x="254" y="389" font-family="{FONT}" font-weight="700" font-size="24" fill="{INK}" text-anchor="middle">Private · Offline · No ads</text>'
)
files[f"{P}/feature-graphic-1024x500.svg"] = svg(1024, 500, feature)

# --- Social media
S = f"{ROOT}/social-media"
def profile(size, which):
    if which == "habit":
        return svg(size, size, f'<g transform="scale({size/1024})">{mark(512, 512, 0.92)}</g>', bg=NAVY)
    return svg(size, size, f'<g transform="scale({size/1024})">{orbitra_mark(512, 512, 0.95, CREAM, CORAL)}</g>', bg=INK)

profile_sizes = {"instagram": 1080, "facebook": 720, "x-twitter": 400, "linkedin": 400, "youtube": 800, "tiktok": 200, "threads": 320}
for plat, sz in profile_sizes.items():
    files[f"{S}/habit-tracker/profile-{plat}-{sz}x{sz}.svg"] = profile(sz, "habit")
    files[f"{S}/orbitra/profile-{plat}-{sz}x{sz}.svg"] = profile(sz, "orbitra")

def banner(w, h, which, tx=0.1, mx=None, ms=None, ty=None, fs=None):
    s = h / 1000
    if fs:  # explicit layout (e.g. YouTube safe area)
        s = fs
    if which == "habit":
        body = (f'<rect width="{w}" height="{h}" fill="{NAVY}"/>'
                + mark(w * (mx or 0.78), h / 2, (ms or 0.85 * s)) +
                f'<text x="{w*tx:.0f}" y="{h*0.47:.0f}" font-family="{FONT}" font-weight="800" font-size="{150*s:.0f}" letter-spacing="{-3*s:.1f}" fill="{CREAM}">Habit Tracker</text>'
                f'<text x="{w*tx+4*s:.0f}" y="{h*0.6:.0f}" font-family="{FONT}" font-weight="500" font-size="{62*s:.0f}" fill="{CREAM}" fill-opacity="0.8">Log anything. See when &amp; how often.</text>')
    else:
        body = (f'<rect width="{w}" height="{h}" fill="{INK}"/>'
                + orbitra_mark(w * (mx or 0.8), h / 2, (ms or 0.9 * s), CREAM, CORAL) +
                f'<text x="{w*tx:.0f}" y="{h*0.5:.0f}" font-family="{FONT}" font-weight="700" font-size="{200*s:.0f}" letter-spacing="{8*s:.1f}" fill="{CREAM}">orbitra</text>'
                f'<text x="{w*tx+6*s:.0f}" y="{h*0.63:.0f}" font-family="{FONT}" font-weight="500" font-size="{60*s:.0f}" fill="{CREAM}" fill-opacity="0.75">Simple apps for everyday life.</text>')
    return svg(w, h, body)

banners = {"x-header": (1500, 500), "linkedin-cover": (1584, 396), "facebook-cover": (1640, 624), "youtube-banner": (2560, 1440)}
layouts = {
    "linkedin-cover": dict(tx=0.36, mx=0.86),
    "youtube-banner": dict(tx=0.235, mx=0.72, ms=0.6, fs=0.8),  # keeps everything inside the 1546x423 safe area
}
for name, (w, h) in banners.items():
    kw = layouts.get(name, {})
    files[f"{S}/habit-tracker/{name}-{w}x{h}.svg"] = banner(w, h, "habit", **kw)
    okw = dict(kw)
    if "ms" in okw:
        okw["ms"] = okw["ms"] * 0.62; okw["mx"] = 0.74
    files[f"{S}/orbitra/{name}-{w}x{h}.svg"] = banner(w, h, "orbitra", **okw)

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

# --- PNG exports
exports = []  # (svg_path, png_path, w, h)
for path in files:
    if "/logo/svg/" in path:
        continue
    w = int(files[path].split('width="')[1].split('"')[0]); h = int(files[path].split('height="')[1].split('"')[0])
    exports.append((path, path.replace(".svg", ".png"), w, h))
logo_pngs = f"{ROOT}/logo/png"
for path in [p for p in files if "/logo/svg/" in p]:
    w = int(files[path].split('width="')[1].split('"')[0]); h = int(files[path].split('height="')[1].split('"')[0])
    base = os.path.basename(path).replace(".svg", "")
    exports.append((path, f"{logo_pngs}/{base}.png", w, h))
# extra icon sizes
icon = f"{L}/habit-tracker-icon.svg"
for sz in [16, 32, 48, 64, 128, 180, 192, 256, 512]:
    exports.append((icon, f"{logo_pngs}/sizes/habit-tracker-icon-{sz}.png", sz, sz))

with sync_playwright() as p:
    b = p.chromium.launch()
    for src, dst, w, h in exports:
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        content = open(src).read()
        ow = int(content.split('width="')[1].split('"')[0]); oh = int(content.split('height="')[1].split('"')[0])
        pg = b.new_page(viewport={"width": w, "height": h})
        html = f'<html><body style="margin:0;background:transparent"><div style="width:{w}px;height:{h}px">{content.replace(f"width=\"{ow}\" height=\"{oh}\"", f"width=\"{w}\" height=\"{h}\"", 1)}</div></body></html>'
        pg.set_content(html)
        pg.wait_for_timeout(50)
        pg.screenshot(path=dst, omit_background=True, clip={"x": 0, "y": 0, "width": w, "height": h})
        pg.close()
    b.close()
print(len(files), "svgs,", len(exports), "pngs")
