// Animation layer: GSAP + ScrollTrigger + Lenis.
// Loaded as a deferred module, so it never blocks the first paint or LCP.
// Every element is fully visible in the HTML; animations only add movement.
// Visitors who prefer reduced motion get no smooth scrolling and no pins.

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduce) {
  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scrolling */
  const lenis = new Lenis({ lerp: 0.11 });
  window.__lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((a) =>
    a.addEventListener("click", (e) => {
      const el = document.querySelector(a.getAttribute("href"));
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -90 });
    })
  );
  window.__refreshScroll = () => ScrollTrigger.refresh();

  /* Hero entrance (time-based, once) */
  if (document.querySelector(".hero")) {
    gsap.from(".hero__frame img", { scale: 1.1, duration: 1.6, ease: "expo.out" });
    gsap.from(".hero h1 .ln > span", { yPercent: 105, duration: 1.05, ease: "expo.out", stagger: 0.09, delay: 0.1 });
    gsap.from(".hero__copy p, .hero__copy .btn-row, .hero__rating", { y: 16, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.07, delay: 0.4 });
    gsap.fromTo(".hero__frame img", { yPercent: 0 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  }
  gsap.from(".nav", { y: -20, opacity: 0, duration: 0.8, ease: "power3.out", clearProps: "opacity,transform" });

  /* Interior page headings */
  gsap.utils.toArray(".phero .head > *").forEach((el, i) =>
    gsap.from(el, { y: 18, opacity: 0, duration: 0.7, ease: "power3.out", delay: 0.05 * i })
  );

  /* Real Lightroom settings: sliders travel from 0 to the saved value */
  const edit = document.querySelector("[data-edit]");
  if (edit) {
    const sliders = [...edit.querySelectorAll("[data-sl]")].map((el) => ({
      el,
      out: el.querySelector("output"),
      knob: el.querySelector(".knob"),
      v: +el.dataset.v, min: +el.dataset.min, max: +el.dataset.max, dec: +(el.dataset.dec || 0),
    }));
    const pct = edit.querySelector("[data-pct]");
    const fmt = (x, d) => (x > 0 ? "+" : x < 0 ? "−" : "") + Math.abs(x).toFixed(d);
    const render = (p) => {
      sliders.forEach((s) => {
        const x = s.v * p;
        s.out.textContent = fmt(x, s.dec);
        s.knob.style.setProperty("--k", ((x - s.min) / (s.max - s.min)) * 100 + "%");
      });
      if (pct) pct.textContent = Math.round(p * 100) + "%";
    };
    const st = { p: 0 };
    render(0);
    // No pinning: the section scrolls normally and the sliders finish while it
    // passes through the viewport. Pinning held the page still for a full screen
    // of scrolling, which read as the end of the page.
    gsap.to(st, { p: 1, ease: "none", onUpdate: () => render(st.p),
      scrollTrigger: { trigger: edit, start: "top 80%", end: "center 45%", scrub: 0.6 } });
  }

  /* Count-up numbers */
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || "", o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", immediateRender: false,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
      onStart: () => (el.textContent = (0).toFixed(dec) + suf),
      onUpdate: () => (el.textContent = o.v.toFixed(dec) + suf) });
  });

  /* Horizontal work rail (wide screens). Phones get native swipe. */
  const rail = document.querySelector("[data-rail]");
  if (rail) {
    const track = rail.querySelector(".rail__track");
    gsap.matchMedia().add("(min-width: 900px)", () => {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: rail, start: "center center", end: () => "+=" + dist(), pin: true, scrub: 0.5, invalidateOnRefresh: true } });
    });
  }

  /* 3D print flips to its delivery note as it crosses the viewport */
  const print = document.querySelector("[data-print]");
  if (print) {
    gsap.fromTo(print, { rotateY: -12, rotateX: 5 }, { rotateY: 190, rotateX: -4, ease: "none",
      scrollTrigger: { trigger: print.closest("section"), start: "top 70%", end: "bottom 35%", scrub: 0.8 } });
  }

  /* Gentle rise for grids (content is visible before the animation starts) */
  gsap.utils.toArray("[data-rise]").forEach((group) => {
    gsap.from(group.children, { y: 28, duration: 0.8, ease: "power3.out", stagger: 0.06,
      scrollTrigger: { trigger: group, start: "top 88%", once: true } });
  });

  /* Image parallax inside framed photos */
  gsap.utils.toArray("[data-parallax] img").forEach((img) => {
    gsap.fromTo(img, { yPercent: -6, scale: 1.12 }, { yPercent: 6, ease: "none",
      scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
  });

  addEventListener("load", () => ScrollTrigger.refresh());
}
