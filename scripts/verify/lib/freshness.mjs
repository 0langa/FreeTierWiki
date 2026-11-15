// @ts-check
// Pure logic for the weekly pricing-page check: hash a page, classify a failed fetch, compare two runs, write the report.
import { normalizeUrl } from "./depth.mjs";
import { HASH_VERSION } from "./source-snapshot.mjs";
export { hashExcerpt } from "./source-snapshot.mjs";

/** Consecutive misses required before the report recommends fixing or removing the entry. */
export const DEAD_AFTER_RUNS = 3;
/** A page that changed in this many runs in a row is treated as noise (rotating text), not as a price change. */
export const NOISY_AFTER_RUNS = 3;

/**
 * `excerptChars` is the length of the page's price-related excerpt. A page without a single such line (a script
 * shell, a bot check, a sign-in page) is not a reading of the pricing: its hash would never change, so it counts
 * as thin, never as ok, and the weekly run cannot confirm the entry from it.
 * @param {Array<{ status: number, chars: number, excerptChars?: number, error?: string, accessIssue?: string }>} tried
 * @param {number} [thinBelow]
 * @returns {"ok" | "thin" | "dead" | "blocked"}
 */
export function classifyFetch(tried, thinBelow = 400) {
  if (tried.some((t) => t.status === 200 && !t.accessIssue && t.chars >= thinBelow && t.excerptChars !== 0)) return "ok";
  if (tried.some((t) => t.status === 200 && !t.accessIssue)) return "thin";
  const gone = (/** @type {{ status: number, error?: string }} */ t) =>
    t.status === 404 || t.status === 410 || t.error === "ENOTFOUND" || t.error === "ERR_INVALID_URL";
  if (tried.length > 0 && tried.every(gone)) return "dead";
  return "blocked";
}

/**
 * @typedef {{ requestedUrl: string, url: string, state: string, status: number, accessIssue?: string, error?: string, hash?: string, markupHash?: string, hashVersion?: number }} SourceDocument
 * @typedef {{ url: string, state: string, status: number, accessIssue?: string, error?: string }} SourceIssue
 * @typedef {{ hash: string, hashVersion: number, markupHash: string, url: string, coverageVersion?: number, verificationDate: string, acknowledgedAt: string }} ReviewedFingerprint
 * @typedef {{ hash?: string, hashVersion?: number, markupHash?: string, url?: string | null, coverageVersion?: number, sourceDocuments?: SourceDocument[], reviewedFingerprint?: ReviewedFingerprint, checkedAt: string, changedAt?: string, failures: number, flaps: number, state: string }} StoredEntry
 * @typedef {{ id: string, state: "ok" | "thin" | "dead" | "blocked", hash?: string, legacyHash?: string, hashVersion?: number, markupHash?: string, legacyMarkupHash?: string, url?: string | null, coverageVersion?: number, sourceDocuments?: SourceDocument[] }} RunResult
 * @typedef {{ next: Record<string, StoredEntry>, changed: string[], noisy: string[], dead: string[], thin: string[], blocked: string[], added: string[], counts: Record<string, number> }} Comparison
 */

/**
 * @param {Record<string, StoredEntry>} previous
 * @param {RunResult[]} results
 * @param {string} now
 * @returns {Comparison}
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
  /** @type {string[]} */
  const thin = [];
  /** @type {string[]} */
  const blocked = [];
  /** @type {Record<string, number>} */
  const counts = { ok: 0, thin: 0, dead: 0, blocked: 0 };
  for (const result of results) {
    const before = previous[result.id];
    counts[result.state] += 1;
    if (result.state === "ok" && result.hash) {
      const sourceChanged = normalizeUrl(before?.url ?? "") !== normalizeUrl(result.url ?? before?.url ?? "");
      const storedVersion = before?.hashVersion ?? 1;
      const comparableHash = storedVersion >= 2 ? result.hash : (result.legacyHash ?? result.hash);
      // Version 3 kept the text hash and normalised the markup, so a version 2 record is compared with the version 2 markup hash.
      const comparableMarkup = storedVersion === 2 && result.hashVersion !== 2 ? (result.legacyMarkupHash ?? result.markupHash) : result.markupHash;
      const markupChanged = before?.markupHash !== undefined && comparableMarkup !== undefined && before.markupHash !== comparableMarkup;
      const differs = Boolean(before?.hash) && (before?.hash !== comparableHash || sourceChanged || markupChanged);
      const expandedBaseline = Boolean(before?.hash) && (((result.hashVersion ?? 1) >= 2 && storedVersion < 2) || (result.coverageVersion ?? 0) > (before?.coverageVersion ?? 0));
      const flaps = differs && !expandedBaseline ? (before?.flaps ?? 0) + 1 : 0;
      next[result.id] = {
        hash: result.hash,
        hashVersion: result.hashVersion ?? before?.hashVersion,
        markupHash: result.markupHash,
        url: result.url ?? before?.url ?? null,
        checkedAt: now,
        changedAt: !before?.hash || differs || expandedBaseline ? now : before?.changedAt,
        failures: 0,
        flaps,
        state: "ok",
        ...(result.coverageVersion ? { coverageVersion: result.coverageVersion, sourceDocuments: result.sourceDocuments } : {}),
      };
      const reviewed = { ...next[result.id], reviewedFingerprint: before?.reviewedFingerprint };
      if (hasCurrentReview(reviewed)) next[result.id].reviewedFingerprint = before.reviewedFingerprint;
      // The reviewed revision is unchanged by the version 2 comparison, so its review now names the version 3 hashes.
      else if (!differs && !expandedBaseline && storedVersion === 2 && before?.reviewedFingerprint && reviewMatches(before) && result.hashVersion === HASH_VERSION && result.markupHash) {
        next[result.id].reviewedFingerprint = { ...before.reviewedFingerprint, hash: result.hash, hashVersion: result.hashVersion, markupHash: result.markupHash };
      }
      if (!before?.hash || expandedBaseline) added.push(result.id);
      else if (differs) (flaps >= NOISY_AFTER_RUNS ? noisy : changed).push(result.id);
      continue;
    }
    const failures = result.state === "dead" ? (before?.state === "dead" ? before.failures : 0) + 1 : 0;
    // Keep the last successful fingerprint and its provenance. Store current access failures separately.
    next[result.id] = {
      ...before,
      url: before?.hash ? before.url ?? null : result.url ?? before?.url ?? null,
      checkedAt: now,
      failures,
      flaps: before?.flaps ?? 0,
      state: result.state,
      sourceDocuments: result.sourceDocuments,
    };
    if (!reviewMatches(next[result.id])) delete next[result.id].reviewedFingerprint;
    if (result.state === "dead" && failures >= DEAD_AFTER_RUNS) dead.push(result.id);
    if (result.state === "thin") thin.push(result.id);
    if (result.state === "blocked") blocked.push(result.id);
  }
  return { next, changed, noisy, dead, thin, blocked, added, counts };
}

/**
 * The complete queue is independent of report length. An unchanged hash does not erase an earlier
 * unreviewed change; noisy and unreadable pages still need a source comparison.
 * @param {Comparison} run
 * @param {Record<string, string | undefined>} lastVerifiedById
 * @param {{browserSources?: Record<string, string[]>, browserMaxAgeDays?: number, maxAgeDays?: number}} [policy]
 * @returns {Array<{ id: string, reason: string, url: string | null, sourceIssues?: SourceIssue[], browserSources?: string[] }>}
 */
export function reviewQueue(run, lastVerifiedById, { browserSources = {}, browserMaxAgeDays = 7, maxAgeDays = 90 } = {}) {
  /** @type {Map<string, string>} */
  const reasons = new Map();
  for (const [reason, ids] of Object.entries({ changed: run.changed, noisy: run.noisy, dead: run.dead, thin: run.thin, blocked: run.blocked, "new-baseline": run.added })) {
    for (const id of ids) reasons.set(id, reason);
  }
  for (const [id, entry] of Object.entries(run.next)) {
    if (entry.state === "dead" && !reasons.has(id)) reasons.set(id, "source-not-found");
    const dateRolledBack = lastVerifiedById[id] && lastVerifiedById[id] < (entry.reviewedFingerprint?.verificationDate ?? "");
    if (entry.state === "ok" && (!hasCurrentReview(entry) || dateRolledBack) && !reasons.has(id)) {
      reasons.set(id, "unreviewed-change");
    }
    if (entry.state === "ok" && entry.sourceDocuments?.some((source) => source.state !== "ok") && !reasons.has(id)) reasons.set(id, "partial-source-access");
    const date = Object.hasOwn(lastVerifiedById, id) ? lastVerifiedById[id] : entry.reviewedFingerprint?.verificationDate;
    const elapsed = date ? (Date.parse(entry.checkedAt.slice(0, 10)) - Date.parse(date)) / 86_400_000 : Infinity;
    const ageDays = Number.isFinite(elapsed) ? elapsed : Infinity;
    if (browserSources[id]?.length && ageDays >= browserMaxAgeDays && !reasons.has(id)) reasons.set(id, "rendered-source-review");
    if (ageDays >= maxAgeDays && !reasons.has(id)) reasons.set(id, "overdue-review");
  }
  return [...reasons].sort(([a], [b]) => a.localeCompare(b)).map(([id, reason]) => {
    const sourceIssues = run.next[id]?.sourceDocuments?.filter((source) => source.state !== "ok").map(({ requestedUrl, state, status, accessIssue, error }) => ({
      url: requestedUrl, state, status, ...(accessIssue ? { accessIssue } : {}), ...(error ? { error } : {}),
    }));
    return { id, reason, url: run.next[id]?.url ?? null, ...(sourceIssues?.length ? { sourceIssues } : {}), ...(browserSources[id]?.length ? { browserSources: browserSources[id] } : {}) };
  });
}

/**
 * @param {{ changed: string[], noisy: string[], dead: string[], notFound?: string[], thin?: string[], blocked?: string[], partial?: string[], rendered?: string[], overdue?: string[], pending?: string[], added: string[], counts: Record<string, number> }} run
 * @param {{ date: string, titles: Record<string, string>, urls: Record<string, string | null | undefined>, sourceIssues?: Record<string, SourceIssue[] | undefined>, max?: number }} options
 * @returns {string}
 */
export function renderReport(run, { date, titles, urls, sourceIssues = {}, max = 80 }) {
  // The URL is shown as code so a redirect target is never a clickable link in the issue.
  const link = (/** @type {string} */ id) => (urls[id] ? ` — \`${urls[id]}\`` : "");
  const line = (/** @type {string} */ id) => {
    const errors = [...new Set((sourceIssues[id] ?? []).flatMap(({ error }) => error ? [error] : []))];
    const detail = errors.length ? ` (fetch errors ${errors.map((error) => `\`${error}\``).join(", ")})` : "";
    return `- \`${id}\` — ${titles[id] ?? id}${link(id)}${detail}`;
  };
  const section = (/** @type {string} */ heading, /** @type {string[]} */ ids) =>
    ids.length === 0
      ? ""
      : `\n## ${heading} (${ids.length})\n${ids.slice(0, max).map(line).join("\n")}${ids.length > max ? `\n- … and ${ids.length - max} more` : ""}\n`;
  const total = Object.values(run.counts).reduce((a, b) => a + b, 0);
  return `${[
    `# Pricing check ${date}`,
    "",
    `Read ${total} entries: ${run.counts.ok} readable, ${run.counts.thin} with too little readable text, ${run.counts.blocked} blocked, ${run.counts.dead} not found.`,
    section("Pricing source changed: re-check text, source URL and table/icon markup", run.changed),
    section(`Official page not found for ${DEAD_AFTER_RUNS}+ runs: fix the link or remove the entry`, run.dead),
    section("Source not found: recheck the cited URL", run.notFound ?? []),
    section("Too little readable source text: use a browser or another official source", run.thin ?? []),
    section("Source request blocked: use a browser or another official source", run.blocked ?? []),
    section("Some cited sources are unreadable: check the exact URLs in the complete queue", run.partial ?? []),
    section("Rendered source comparison is due: static text cannot establish current plan cells", run.rendered ?? []),
    section("Entry comparison is overdue even though source hashes may be stable", run.overdue ?? []),
    section("Text keeps changing every week: compare terms before dismissing as noise", run.noisy),
    section("Earlier source changes still need review", run.pending ?? []),
    section("New or expanded source baseline: compare the published entry", run.added),
    "\nThe complete review queue is saved as freshness-review.json (in the Actions pricing-check artifact for workflow runs). Section lists above may be shortened.\n",
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()}\n`;
}

/** A date label never acknowledges a source revision; only a deliberate fingerprint review does.
 * @param {StoredEntry} entry
 */
export function hasCurrentReview(entry) {
  return entry.hashVersion === HASH_VERSION && reviewMatches(entry);
}

/** @param {StoredEntry} entry */
function reviewMatches(entry) {
  const review = entry.reviewedFingerprint;
  return Boolean(review && entry.hash && entry.markupHash && entry.url &&
    review.hashVersion === entry.hashVersion && review.hash === entry.hash && review.markupHash === entry.markupHash &&
    review.coverageVersion === entry.coverageVersion &&
    normalizeUrl(review.url) === normalizeUrl(entry.url) && review.verificationDate && review.acknowledgedAt);
}

/** Validate the complete explicit batch before returning any changed records.
 * @param {Record<string, StoredEntry>} entries
 * @param {string[]} ids
 * @param {Record<string, string | undefined>} lastVerifiedById
 * @param {string} now
 * @returns {Record<string, StoredEntry>}
 */
export function acknowledgeSources(entries, ids, lastVerifiedById, now) {
  if (!ids.length) throw new Error("Acknowledgement requires explicit non-empty IDs");
  const next = { ...entries };
  for (const id of ids) {
    if (!Object.hasOwn(lastVerifiedById, id)) throw new Error(`Unknown content id: ${id}`);
    const entry = entries[id];
    let validUrl = false;
    try { const url = new URL(entry?.url ?? ""); validUrl = ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname); } catch { /* Invalid source identity cannot be acknowledged. */ }
    // A version 2 record (scanned before version 3) can still be acknowledged; compareRuns carries the review over.
    if (!entry || entry.state !== "ok" || (entry.hashVersion !== 2 && entry.hashVersion !== HASH_VERSION) || typeof entry.hash !== "string" || !entry.hash.trim() || typeof entry.markupHash !== "string" || !entry.markupHash.trim() || typeof entry.url !== "string" || !validUrl) {
      throw new Error(`${id}: acknowledgement needs a current readable v2 or v${HASH_VERSION} source fingerprint; scan the source first`);
    }
    if (entry.coverageVersion && (!Array.isArray(entry.sourceDocuments) || !entry.sourceDocuments.length ||
      entry.sourceDocuments.some((source) => source?.state !== "ok" || !source.hash || !source.markupHash))) {
      throw new Error(`${id}: acknowledgement requires a readable fingerprint for every cited source`);
    }
    const date = lastVerifiedById[id];
    const changedDate = (entry.changedAt ?? entry.checkedAt)?.slice(0, 10);
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !changedDate || !/^\d{4}-\d{2}-\d{2}$/.test(changedDate) || date < changedDate) {
      throw new Error(`${id}: lastVerified must record a source comparison on or after ${changedDate ?? "the stored revision date"}`);
    }
    next[id] = { ...entry, reviewedFingerprint: { hash: entry.hash, hashVersion: entry.hashVersion, markupHash: entry.markupHash, url: normalizeUrl(entry.url), ...(entry.coverageVersion ? { coverageVersion: entry.coverageVersion } : {}), verificationDate: date, acknowledgedAt: now } };
  }
  return next;
}
