// Orbitra landing pages (app pages and the studio home): scroll reveals,
// count-ups, the screenshot carousel, hero tilt, before/after slider and the
// sticky install bar. Content is fully visible without JavaScript; the
// `lp-js` class only turns the motion on.
const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
root.classList.add("lp-js");

// ── reveal on scroll ────────────────────────────────────────────────────────
const revealables = document.querySelectorAll("[data-reveal]");
if (reduced || !("IntersectionObserver" in window)) {
  revealables.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  revealables.forEach((el) => io.observe(el));
}

// ── count up the numbers once they are on screen ────────────────────────────
const fmt = new Intl.NumberFormat("en-US");
const countUp = (el) => {
  const target = Number(el.dataset.count);
  if (!target || reduced) return;
  const start = performance.now();
  const dur = 1400;
  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - p, 3))));
    if (p < 1) requestAnimationFrame(tick);
  };
  el.textContent = "0";
  requestAnimationFrame(tick);
};
const counters = document.querySelectorAll("[data-count]");
if ("IntersectionObserver" in window) {
  const co = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        countUp(e.target);
        co.unobserve(e.target);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => co.observe(el));
}

// ── screenshot carousel buttons ─────────────────────────────────────────────
const track = document.querySelector("[data-gal-track]");
document.querySelectorAll("[data-gal]").forEach((btn) =>
  btn.addEventListener("click", () => {
    if (!track) return;
    const step = track.clientWidth * 0.8 * Number(btn.dataset.gal);
    track.scrollBy({ left: step, behavior: reduced ? "auto" : "smooth" });
  }),
);

// ── hero phones follow the pointer a little ─────────────────────────────────
const stage = document.querySelector("[data-tilt]");
if (stage && !reduced && matchMedia("(hover: hover) and (pointer: fine)").matches) {
  let raf = 0;
  window.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      stage.style.setProperty("--tx", x.toFixed(3));
      stage.style.setProperty("--ty", y.toFixed(3));
    });
  });
}

// ── before / after slider ───────────────────────────────────────────────────
document.querySelectorAll("[data-ba]").forEach((ba) => {
  const range = ba.querySelector("input[type=range]");
  const set = (v) => ba.style.setProperty("--pos", `${v}%`);
  range?.addEventListener("input", () => set(range.value));
  // A gentle sweep the first time it is seen, so people know it moves.
  if (!reduced && "IntersectionObserver" in window) {
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      o.disconnect();
      const start = performance.now();
      const anim = (now) => {
        const p = Math.min(1, (now - start) / 2200);
        const v = 50 + Math.sin(p * Math.PI * 2) * 30 * (1 - p);
        set(v.toFixed(1));
        if (range) range.value = String(v);
        if (p < 1) requestAnimationFrame(anim);
      };
      requestAnimationFrame(anim);
    }, { threshold: 0.5 });
    o.observe(ba);
  }
});

// ── sticky install bar after the hero ───────────────────────────────────────
const sticky = document.querySelector("[data-sticky]");
const hero = document.querySelector(".lp-hero");
const final = document.querySelector(".lp-final");
if (sticky && hero && "IntersectionObserver" in window) {
  let heroVisible = true;
  let finalVisible = false;
  const update = () => sticky.classList.toggle("is-on", !heroVisible && !finalVisible);
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; update(); }).observe(hero);
  if (final) new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; update(); }).observe(final);
}
