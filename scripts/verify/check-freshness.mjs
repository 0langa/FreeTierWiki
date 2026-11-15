// Weekly pricing check: fetch official pages, fingerprint full pricing text and table/icon markup, and report changes.
// Usage: node scripts/verify/check-freshness.mjs [--hashes data/source-hashes.json] [--report freshness-report.md] [--review-json freshness-review.json] [--ids services/neon,...] [--limit N]
// Scans never edit entry dates or acknowledge source revisions. Actual entry reviews set lastVerified;
// use acknowledge-freshness.mjs afterwards to record the reviewed fingerprint for the durable queue.
// Fetched HTML is only parsed and hashed. It is never executed, and it never goes into the report.
import fs from "node:fs";
import path from "node:path";

import { readEntries, selectEntries } from "./lib/entries.mjs";
import { compareRuns, renderReport, reviewQueue } from "./lib/freshness.mjs";
import { scanSources, trackedSourceUrls } from "./lib/scan-sources.mjs";

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
targets = targets.filter((entry) => trackedSourceUrls(entry.data).length > 0);
if (limit > 0) targets = targets.slice(0, limit);

let previous = {};
try {
  const baseline = JSON.parse(fs.readFileSync(hashesFile, "utf8"));
  if (!baseline?.entries || typeof baseline.entries !== "object" || Array.isArray(baseline.entries)) {
    throw new Error("Invalid source baseline: missing entries object");
  }
  previous = baseline.entries;
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

const results = await scanSources(targets, { previous });
results.sort((a, b) => a.id.localeCompare(b.id));

const now = new Date().toISOString();
const run = compareRuns(previous, results, now);
// A subset run keeps the old records of the entries it did not read. A full run drops removed entries.
const merged = subset ? { ...previous, ...run.next } : run.next;

// Frontmatter dates come back as Date objects when unquoted and strings when quoted.
const asDate = (/** @type {unknown} */ value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === "string" ? value.slice(0, 10) : undefined;
const entries = readEntries();
const lastVerifiedById = Object.fromEntries(entries.map((entry) => [entry.id, asDate(entry.data.lastVerified)]));
const policyFile = path.resolve("docs/reviews/source-review-policy.json");
const policy = fs.existsSync(policyFile) ? JSON.parse(fs.readFileSync(policyFile, "utf8")) : {};
const queue = reviewQueue(run, lastVerifiedById, policy);
const titles = Object.fromEntries(entries.map((e) => [e.id, String(e.data.title ?? e.id)]));
const urls = Object.fromEntries(results.map((r) => [r.id, r.url]));
fs.mkdirSync(path.dirname(reportFile), { recursive: true });
fs.mkdirSync(path.dirname(reviewFile), { recursive: true });
fs.writeFileSync(reportFile, renderReport({ ...run,
  pending: queue.filter((entry) => entry.reason === "unreviewed-change").map((entry) => entry.id),
  notFound: queue.filter((entry) => entry.reason === "source-not-found").map((entry) => entry.id),
  partial: queue.filter((entry) => entry.sourceIssues?.length && run.next[entry.id].state === "ok").map((entry) => entry.id),
  rendered: queue.filter((entry) => entry.reason === "rendered-source-review").map((entry) => entry.id),
  overdue: queue.filter((entry) => entry.reason === "overdue-review").map((entry) => entry.id),
}, { date: now.slice(0, 10), titles, urls, sourceIssues: Object.fromEntries(queue.map(({ id, sourceIssues }) => [id, sourceIssues])) }));
fs.writeFileSync(reviewFile, `${JSON.stringify({ checkedAt: now, entries: queue }, null, 2)}\n`);

fs.mkdirSync(path.dirname(hashesFile), { recursive: true });
const temporary = `${hashesFile}.${process.pid}.tmp`;
try {
  fs.writeFileSync(temporary, `${JSON.stringify({ updatedAt: now, entries: merged }, null, 1)}\n`);
  fs.renameSync(temporary, hashesFile);
} finally {
  fs.rmSync(temporary, { force: true });
}
const flagged = queue.length;
// GitHub Actions reads this to decide whether to open an issue.
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `flagged=${flagged}\n`);

if (flagged > 0) console.log(`${flagged} entries require source review. Report: ${reportFile}\nComplete queue: ${reviewFile}`);
