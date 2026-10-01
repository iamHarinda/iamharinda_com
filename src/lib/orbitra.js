// Helpers for the /orbitra/ section.
import studio from "../data/orbitra/studio.js";
import apps from "../data/orbitra/apps.json";

export { studio, apps };

export const getApp = (slug) => apps.find((a) => a.slug === slug);

/** Absolute canonical URL for a path under the site. */
export const abs = (path) => new URL(path, "https://www.iamharinda.com").href;

export const appPath = (slug, page = "") =>
  `${studio.basePath}${slug}/${page ? `${page}/` : ""}`;

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Tiny inline formatter for strings in apps.json. Escapes HTML first, then:
 *   **bold**          → <strong>
 *   `code`            → <code>
 *   [text](url)       → <a>
 *   [[TODO: note]]    → visible <mark class="o-todo">TODO(owner): note</mark>
 *   {email}           → the studio contact email as a mailto link
 *   {app}             → the app name (pass `app`)
 */
export function rich(text, app) {
  let html = escapeHtml(text);
  html = html.replace(/\[\[TODO:\s*([^\]]+)\]\]/g, (_, note) => todoHtml(note));
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => {
    const ext = /^https?:/.test(href);
    return `<a href="${href}"${ext ? ' rel="noopener"' : ""}>${t}</a>`;
  });
  html = html.replace(/\{email\}/g, emailHtml());
  if (app) html = html.replace(/\{app\}/g, escapeHtml(app.name));
  return html;
}

export const todoHtml = (note) => `<mark class="o-todo">TODO(owner): ${note}</mark>`;

export function emailHtml() {
  const e = studio.contactEmail;
  const link = `<a href="mailto:${e}">${e}</a>`;
  return studio.contactEmailConfirmed ? link : `${link} ${todoHtml("confirm contact email")}`;
}

export const mailto = (subject) =>
  `mailto:${studio.contactEmail}?subject=${encodeURIComponent(subject)}`;

/** "2026-10-02" → "2 October 2026" */
export const longDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

export const STATUS_LABEL = { live: "On Google Play", testing: "In testing", "coming-soon": "Coming soon" };
