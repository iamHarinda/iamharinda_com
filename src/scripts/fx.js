/* Interaction + reveal effects — all vanilla, all optional.
   Nothing here is required to read the page; it enhances a fully static DOM. */

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover)").matches;

/* ---- sticky header shadow ------------------------------------------------ */
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => header.classList.toggle("is-stuck", scrollY > 4);
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
}

/* ---- mobile menu ------------------------------------------------------- */
for (const nav of document.querySelectorAll(".site-nav")) {
  const btn = nav.querySelector(".site-nav__toggle");
  const label = nav.querySelector(".site-nav__toggle-label");
  if (!btn) continue;
  const set = (open) => {
    nav.dataset.open = String(open);
    btn.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
  };
  btn.addEventListener("click", () => set(nav.dataset.open !== "true"));
  nav.querySelectorAll(".site-nav__panel a").forEach((a) =>
    a.addEventListener("click", () => set(false)),
  );
  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.dataset.open === "true") {
      set(false);
      btn.focus();
    }
  });
  addEventListener("pointerdown", (e) => {
    if (nav.dataset.open === "true" && !nav.contains(e.target)) set(false);
  });
}

/* ---- split text (hero heading) -------------------------------------------- */
for (const el of document.querySelectorAll(".split")) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const s = document.createElement("span");
    s.className = "sp";
    s.style.setProperty("--i", i);
    s.textContent = w;
    el.append(s, i < words.length - 1 ? document.createTextNode(" ") : "");
  });
  el.setAttribute("aria-label", words.join(" "));
}

/* ---- scroll-in: .split / .reveal / .rise -------------------------------- */
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
);
document
  .querySelectorAll(".split, .reveal, .rise")
  .forEach((el) => io.observe(el));
// kick the hero heading immediately (it is above the fold)
requestAnimationFrame(() =>
  document.querySelectorAll(".hero .split").forEach((el) => el.classList.add("is-in")),
);

/* ---- card spotlight + tilt ------------------------------------------------ */
if (canHover && !reduce) {
  for (const card of document.querySelectorAll(".card[data-spot]")) {
    const tilt = card.hasAttribute("data-tilt");
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (tilt) {
        card.style.setProperty("--ry", `${((x / r.width) * 2 - 1) * 4}deg`);
        card.style.setProperty("--rx", `${(1 - (y / r.height) * 2) * 4}deg`);
      }
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  }
}

/* ---- magnetic buttons -------------------------------------------------- */
if (canHover && !reduce) {
  for (const btn of document.querySelectorAll("[data-magnetic]")) {
    const strength = 0.28;
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  }
}
