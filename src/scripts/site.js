// Site-wide behaviour that is not animation: mobile menu, liquid-glass
// refraction, Microsoft Clarity, sticky mobile CTA and conversion tracking.

const $ = (s, r = document) => r.querySelector(s);

/* ── Mobile menu sheet ─────────────────────────────────────────────────── */
const toggle = $("#nav-toggle");
const sheet = $("#nav-sheet");
if (toggle && sheet) {
  const set = (open) => {
    sheet.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    document.documentElement.style.overflow = open ? "hidden" : "";
    window.__lenis?.[open ? "stop" : "start"]();
  };
  toggle.addEventListener("click", () => set(sheet.dataset.open !== "true"));
  sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => set(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && sheet.dataset.open === "true") { set(false); toggle.focus(); } });
}

/* ── Services dropdown: click/tap toggle, Escape and outside click close ─ */
document.querySelectorAll("[data-dd]").forEach((dd) => {
  const btn = dd.querySelector("button");
  const set = (open) => { dd.dataset.open = String(open); btn.setAttribute("aria-expanded", String(open)); };
  btn.addEventListener("click", () => set(dd.dataset.open !== "true"));
  dd.addEventListener("mouseleave", () => set(false));
  addEventListener("click", (e) => { if (!dd.contains(e.target)) set(false); });
  dd.addEventListener("keydown", (e) => { if (e.key === "Escape") { set(false); btn.focus(); } });
});

/* ── Liquid glass: edge refraction map (Chromium only; others keep the blur) */
const nav = $(".nav");
const mapImg = document.getElementById("lg-map");
function glassMap() {
  if (!nav || !mapImg) return;
  const w = Math.round(nav.offsetWidth), h = Math.round(nav.offsetHeight);
  if (!w || !h) return;
  const r = h / 2, b = Math.min(10, h * 0.22);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="#f00"/></linearGradient><linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="#00f"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#000"/><rect width="${w}" height="${h}" rx="${r}" fill="url(#r)"/><rect width="${w}" height="${h}" rx="${r}" fill="url(#b)" style="mix-blend-mode:difference"/><rect x="${b}" y="${b}" width="${w - 2 * b}" height="${h - 2 * b}" rx="${r - b}" fill="rgb(128 128 128 / .94)" style="filter:blur(6px)"/></svg>`;
  mapImg.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
}
if (nav && window.chrome && !matchMedia("(prefers-reduced-transparency: reduce)").matches) {
  requestAnimationFrame(() => {
    glassMap();
    document.documentElement.classList.add("lg-refract");
  });
  let t;
  addEventListener("resize", () => { clearTimeout(t); t = setTimeout(glassMap, 150); }, { passive: true });
}

/* ── Glass gets more opaque once content scrolls under it (readability) ─ */
if (nav) {
  const onNav = () => nav.classList.toggle("is-scrolled", scrollY > (document.querySelector(".hero") ? innerHeight * 0.6 : 24));
  addEventListener("scroll", onNav, { passive: true });
  onNav();
}

/* ── Sticky mobile CTA: appears after the first screen ─────────────────── */
const sticky = $("#sticky-cta");
if (sticky) {
  const onScroll = () => { sticky.dataset.show = String(scrollY > innerHeight * 0.8); };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ── Microsoft Clarity (runs on every visit, like GA4; see /privacy/) ───── */
(function loadClarity() {
  if (window.clarity || !window.__clarityId) return;
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", window.__clarityId);
  // No cookie banner (owner's choice): analytics is accepted up front, ads stay off,
  // matching the GA4 consent defaults in BaseLayout.
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
})();

/* ── Conversion tracking (GA4 events) ──────────────────────────────────── */
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (!a || !window.gtag) return;
  const h = a.href || "";
  const page_path = location.pathname;
  if (h.includes("wa.me/")) gtag("event", "whatsapp_click", { page_path });
  else if (h.includes("fiverr.com")) gtag("event", "fiverr_click", { page_path });
  else if (h.startsWith("mailto:")) gtag("event", "email_click", { page_path });
  else if (a.pathname === "/free-sample/") gtag("event", "sample_cta_click", { page_path });
});
document.querySelectorAll("form[data-lead]").forEach((f) =>
  f.addEventListener("submit", () => window.gtag?.("event", "generate_lead", { form: f.dataset.lead }))
);

/* ── Portfolio filter (work page) ──────────────────────────────────────── */
const chips = document.querySelectorAll("[data-filter]");
if (chips.length) {
  const items = document.querySelectorAll("[data-genre]");
  chips.forEach((c) => c.addEventListener("click", () => {
    chips.forEach((x) => x.setAttribute("aria-pressed", String(x === c)));
    const g = c.dataset.filter;
    items.forEach((it) => { it.hidden = g !== "all" && it.dataset.genre !== g; });
    window.__refreshScroll?.();
  }));
}

/* ── Blog search ───────────────────────────────────────────────────────── */
const q = document.getElementById("blog-q");
if (q) {
  const cards = [...document.querySelectorAll("[data-post]")];
  const hay = cards.map((c) => c.textContent.toLowerCase());
  const empty = document.getElementById("blog-empty");
  q.addEventListener("input", () => {
    const v = q.value.trim().toLowerCase();
    let n = 0;
    cards.forEach((c, i) => { const m = !v || hay[i].includes(v); c.hidden = !m; if (m) n++; });
    if (empty) empty.hidden = n > 0;
  });
}
