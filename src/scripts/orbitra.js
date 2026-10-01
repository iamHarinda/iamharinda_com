// Orbitra pages: theme toggle, mobile menu, footer year. No framework.
const root = document.documentElement;

document.getElementById("o-theme")?.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("orbitra-theme", next);
  } catch {}
});

const header = document.getElementById("o-header");
const menu = document.getElementById("o-menu");
menu?.addEventListener("click", () => {
  const open = !header.hasAttribute("data-open");
  header.toggleAttribute("data-open", open);
  menu.setAttribute("aria-expanded", String(open));
});
// Close the menu after following an in-page link.
document.getElementById("o-nav-links")?.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    header.removeAttribute("data-open");
    menu?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
