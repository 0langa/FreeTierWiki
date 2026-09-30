// @ts-check
// Pure logic for the weekly pricing-page check: hash a page, classify a failed fetch, compare two runs, write the report.
import { createHash } from "node:crypto";

/** A dead link is reported only after this many runs in a row, so one bad night does not open an issue. */
export const DEAD_AFTER_RUNS = 2;
/** A page that changed in this many runs in a row is treated as noise (rotating text), not as a price change. */
export const NOISY_AFTER_RUNS = 3;

/**
 * @param {string} excerptText
 * @returns {string}
 */
export function hashExcerpt(excerptText) {
  const normalized = excerptText.toLowerCase().replace(/\s+/g, " ").trim();
  return createHash("sha256").update(normalized).digest("hex").slice(0, 16);
}

/**
 * @param {Array<{ status: number, chars: number, error?: string }>} tried
 * @param {number} [thinBelow]
 * @returns {"ok" | "thin" | "dead" | "blocked"}
 */
export function classifyFetch(tried, thinBelow = 400) {
  if (tried.some((t) => t.status === 200 && t.chars >= thinBelow)) return "ok";
  if (tried.some((t) => t.status === 200)) return "thin";
  const gone = (/** @type {{ status: number, error?: string }} */ t) =>
    t.status === 404 || t.status === 410 || t.error === "ENOTFOUND" || t.error === "ERR_INVALID_URL";
  if (tried.length > 0 && tried.every(gone)) return "dead";
  return "blocked";
}

/**
 * @typedef {{ hash?: string, url?: string | null, checkedAt: string, changedAt?: string, failures: number, flaps: number, state: string }} StoredEntry
 * @typedef {{ id: string, state: "ok" | "thin" | "dead" | "blocked", hash?: string, url?: string | null }} RunResult
 */

/**
 * @param {Record<string, StoredEntry>} previous
 * @param {RunResult[]} results
 * @param {string} now
 * @returns {{ next: Record<string, StoredEntry>, changed: string[], noisy: string[], dead: string[], added: string[], counts: Record<string, number> }}
 */
export function compareRuns(previous, results, now) {
  /** @type {Record<string, StoredEntry>} */
  const next = {};
  /** @type {string[]} */
  const changed = [];
  /** @type {string[]} */
  const noisy = [];
  /** @type {string[]} */
  const dead = [];
  /** @type {string[]} */
  const added = [];
  /** @type {Record<string, number>} */
  const counts = { ok: 0, thin: 0, dead: 0, blocked: 0 };
  for (const result of results) {
    const before = previous[result.id];
    counts[result.state] += 1;
    if (result.state === "ok" && result.hash) {
      const differs = Boolean(before?.hash) && before?.hash !== result.hash;
      const flaps = differs ? (before?.flaps ?? 0) + 1 : 0;
      next[result.id] = {
        hash: result.hash,
        url: result.url ?? before?.url ?? null,
        checkedAt: now,
        changedAt: differs ? now : before?.changedAt,
        failures: 0,
        flaps,
        state: "ok",
      };
      if (!before?.hash) added.push(result.id);
      else if (differs) (flaps >= NOISY_AFTER_RUNS ? noisy : changed).push(result.id);
      continue;
    }
    const failures = result.state === "dead" ? (before?.failures ?? 0) + 1 : (before?.failures ?? 0);
    next[result.id] = { ...before, checkedAt: now, failures, flaps: before?.flaps ?? 0, state: result.state };
    if (result.state === "dead" && failures >= DEAD_AFTER_RUNS) dead.push(result.id);
  }
  return { next, changed, noisy, dead, added, counts };
}

/**
 * @param {{ changed: string[], noisy: string[], dead: string[], added: string[], counts: Record<string, number> }} run
 * @param {{ date: string, titles: Record<string, string>, urls: Record<string, string | null | undefined>, max?: number }} options
 * @returns {string}
 */
export function renderReport(run, { date, titles, urls, max = 80 }) {
  // The URL is shown as code so a redirect target is never a clickable link in the issue.
  const link = (/** @type {string} */ id) => (urls[id] ? ` — \`${urls[id]}\`` : "");
  const line = (/** @type {string} */ id) => `- \`${id}\` — ${titles[id] ?? id}${link(id)}`;
  const section = (/** @type {string} */ heading, /** @type {string[]} */ ids) =>
    ids.length === 0
      ? ""
      : `\n## ${heading} (${ids.length})\n${ids.slice(0, max).map(line).join("\n")}${ids.length > max ? `\n- … and ${ids.length - max} more` : ""}\n`;
  const total = Object.values(run.counts).reduce((a, b) => a + b, 0);
  return `${[
    `# Pricing check ${date}`,
    "",
    `Read ${total} entries: ${run.counts.ok} readable, ${run.counts.thin} with almost no text, ${run.counts.blocked} blocked, ${run.counts.dead} not found.`,
    section("Pricing page text changed: re-check these entries", run.changed),
    section(`Official page not found for ${DEAD_AFTER_RUNS}+ runs: fix the link or remove the entry`, run.dead),
    section("Text keeps changing every week (probably noise, not a price change)", run.noisy),
    run.added.length ? `\n${run.added.length} entries were added to the baseline this run.\n` : "",
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()}\n`;
}
