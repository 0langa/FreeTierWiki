// Weekly pricing check: fetch official pages, fingerprint full pricing text and table/icon markup, and report changes.
// Usage: node scripts/verify/check-freshness.mjs [--hashes data/source-hashes.json] [--report freshness-report.md] [--review-json freshness-review.json] [--ids services/neon,...] [--limit N]
// Scans never edit entry dates or acknowledge source revisions. Actual entry reviews set lastVerified;
// use acknowledge-freshness.mjs afterwards to record the reviewed fingerprint for the durable queue.
// Fetched HTML is only parsed and hashed. It is never executed, and it never goes into the report.
import fs from "node:fs";
import path from "node:path";

import { readEntries, selectEntries } from "./lib/entries.mjs";
import { fetchText } from "./lib/fetch.mjs";
import { classifyFetch, compareRuns, renderReport, reviewQueue } from "./lib/freshness.mjs";
import { candidateUrls, excerpt, isThin } from "./lib/pages.mjs";

const CONCURRENCY = 6;
const argv = process.argv.slice(2);
if (argv.some((value) => value === "--mark-verified" || value.startsWith("--mark-verified="))) {
  throw new Error("--mark-verified is no longer supported: source scans cannot verify complete entries. Review the entry against official sources and update lastVerified explicitly.");
}
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const hashesFile = path.resolve(arg("hashes") ?? "data/source-hashes.json");
const reportFile = path.resolve(arg("report") ?? "freshness-report.md");
const reviewFile = path.resolve(arg("review-json") ?? path.join(path.dirname(reportFile), "freshness-review.json"));
const ids = arg("ids")
  ?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const limit = Number(arg("limit") ?? 0);
const subset = Boolean(ids) || limit > 0;

let targets = selectEntries(readEntries(), { ids });
targets = targets.filter((entry) => candidateUrls(/** @type {never} */ (entry.data)).length > 0);
if (limit > 0) targets = targets.slice(0, limit);

const previous = fs.existsSync(hashesFile) ? (JSON.parse(fs.readFileSync(hashesFile, "utf8")).entries ?? {}) : {};

/** @type {import("./lib/freshness.mjs").RunResult[]} */
const results = [];
let next = 0;
async function worker() {
  while (next < targets.length) {
    const entry = targets[next++];
    const tried = [];
    let best;
    for (const url of candidateUrls(/** @type {never} */ (entry.data))) {
      const fetched = await fetchText(url);
      const kept = excerpt(fetched.text, Infinity);
      tried.push({ url, status: fetched.status, chars: fetched.text.length, excerptChars: kept.length, error: fetched.error, accessIssue: fetched.accessIssue });
      const quality = fetched.status === 200 && !fetched.accessIssue ? (!isThin(fetched.text) && kept ? 3 : 2) : 1;
      // Prefer a page with price-related text, then the longest one.
      if (!best || quality > best.quality || (quality === best.quality && ((kept && !best.kept) || (Boolean(kept) === Boolean(best.kept) && fetched.text.length > best.text.length)))) best = { ...fetched, kept, quality };
      // A page with no price-related line (a script shell, a bot check) is no answer: try the next address.
      if (quality === 3) break;
    }
    const state = classifyFetch(tried);
    results.push({
      id: entry.id,
      state,
      url: best?.finalUrl || best?.url || null,
      ...(state === "ok" ? { hash: best?.hash, legacyHash: best?.legacyHash, hashVersion: best?.hashVersion, markupHash: best?.markupHash } : {}),
    });
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
results.sort((a, b) => a.id.localeCompare(b.id));

const now = new Date().toISOString();
const run = compareRuns(previous, results, now);
// A subset run keeps the old records of the entries it did not read. A full run drops removed entries.
const merged = subset ? { ...previous, ...run.next } : run.next;
fs.mkdirSync(path.dirname(hashesFile), { recursive: true });
fs.writeFileSync(hashesFile, `${JSON.stringify({ updatedAt: now, entries: merged }, null, 1)}\n`);

// Frontmatter dates come back as Date objects when unquoted and strings when quoted.
const asDate = (/** @type {unknown} */ value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === "string" ? value.slice(0, 10) : undefined;
const entries = readEntries();
const lastVerifiedById = Object.fromEntries(entries.map((entry) => [entry.id, asDate(entry.data.lastVerified)]));
const queue = reviewQueue(run, lastVerifiedById);
const titles = Object.fromEntries(entries.map((e) => [e.id, String(e.data.title ?? e.id)]));
const urls = Object.fromEntries(results.map((r) => [r.id, r.url]));
fs.mkdirSync(path.dirname(reportFile), { recursive: true });
fs.mkdirSync(path.dirname(reviewFile), { recursive: true });
fs.writeFileSync(reportFile, renderReport({ ...run, pending: queue.filter((entry) => entry.reason === "unreviewed-change").map((entry) => entry.id) }, { date: now.slice(0, 10), titles, urls }));
fs.writeFileSync(reviewFile, `${JSON.stringify({ checkedAt: now, entries: queue }, null, 2)}\n`);
const flagged = queue.length;
// GitHub Actions reads this to decide whether to open an issue.
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `flagged=${flagged}\n`);

if (flagged > 0) console.log(`${flagged} entries require source review. Report: ${reportFile}\nComplete queue: ${reviewFile}`);
