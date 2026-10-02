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
