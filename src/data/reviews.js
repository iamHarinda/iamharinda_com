// Client reviews, verbatim, as published on premiumphotoedits.com (the same
// business; owner-approved for reuse on 2 Oct 2026). Names stay masked exactly
// as published there. Shown as text only, never as review schema.
import all from "./reviews.json";

export const reviews = all;

/** "2026-08" → "Aug 2026"; anything else (e.g. "2024-25") is shown as-is. */
export const reviewDate = (d) =>
  /^\d{4}-\d{2}$/.test(d)
    ? new Date(`${d}-01T00:00:00Z`).toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })
    : d;

/** Whole stars for display, rounded down so a 4.7 never shows as five: 4.7 → "★★★★☆". */
export const stars = (r) => "★".repeat(Math.floor(r)) + "☆".repeat(5 - Math.floor(r));

/**
 * A few strong reviews for cards: 5★, a real sentence or two, newest first,
 * one per client.
 */
export function featured(limit = 3) {
  const seen = new Set();
  return all
    .filter((r) => r.rating === 5 && r.text.length >= 110 && r.text.length <= 420)
    .filter((r) => (seen.has(r.name) ? false : seen.add(r.name)))
    .slice(0, limit);
}

/**
 * The reviews page selection: the most detailed 5★ review from each client (longest
 * text wins), at least a sentence long, up to `limit`, then shown newest first.
 */
export function best(limit = 50) {
  const byClient = new Map();
  for (const r of all) {
    if (r.rating !== 5 || r.text.length < 60) continue;
    const prev = byClient.get(r.name);
    if (!prev || r.text.length > prev.text.length) byClient.set(r.name, r);
  }
  return [...byClient.values()]
    .sort((a, b) => b.text.length - a.text.length)
    .slice(0, limit)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}
