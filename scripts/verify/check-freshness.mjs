// Weekly pricing check: fetch every entry's official page, hash the price-related text, and report what changed.
// Usage: node scripts/verify/check-freshness.mjs [--hashes data/source-hashes.json] [--report freshness-report.md] [--ids services/neon,...] [--limit N]
// The fetched text is only hashed. It is never executed, and it never goes into the report.
import fs from "node:fs";
import path from "node:path";

import { readEntries, selectEntries } from "./lib/entries.mjs";
import { fetchText } from "./lib/fetch.mjs";
import { classifyFetch, compareRuns, hashExcerpt, renderReport } from "./lib/freshness.mjs";
import { candidateUrls, excerpt, isThin } from "./lib/pages.mjs";

const CONCURRENCY = 6;
const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const hashesFile = path.resolve(arg("hashes") ?? "data/source-hashes.json");
const reportFile = path.resolve(arg("report") ?? "freshness-report.md");
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
      tried.push({ url, status: fetched.status, chars: fetched.text.length, error: fetched.error });
      if (!best || fetched.text.length > best.text.length) best = fetched;
      if (fetched.status === 200 && !isThin(fetched.text)) break;
    }
    const state = classifyFetch(tried);
    results.push({
      id: entry.id,
      state,
      url: best?.finalUrl ?? best?.url ?? null,
      hash: state === "ok" ? hashExcerpt(excerpt(best?.text ?? "")) : undefined,
    });
    if (results.length % 50 === 0) console.log(`${results.length}/${targets.length}`);
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

const titles = Object.fromEntries(readEntries().map((e) => [e.id, String(e.data.title ?? e.id)]));
const urls = Object.fromEntries(results.map((r) => [r.id, r.url]));
fs.writeFileSync(reportFile, renderReport(run, { date: now.slice(0, 10), titles, urls }));
const flagged = run.changed.length + run.dead.length;
console.log(`checked ${results.length}: ${run.changed.length} changed, ${run.dead.length} dead, ${run.noisy.length} noisy, ${run.added.length} new baseline`);
console.log(`report: ${reportFile}\nhashes: ${hashesFile}`);
// GitHub Actions reads this to decide whether to open an issue.
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `flagged=${flagged}\n`);
