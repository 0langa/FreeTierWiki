// Deletes catalog entries, adds 301s for their old URLs, and records them in content/changelog.json.
// Usage: node scripts/verify/remove-entries.mjs --from development/verify/reports/batch-1-deletes.json --date 2026-09-26
import fs from "node:fs";
import path from "node:path";

import { readEntries, selectEntries } from "./lib/entries.mjs";
import { insertRedirects, pickTarget, redirectRules, removalRecord, retarget } from "./lib/remove.mjs";

const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const from = arg("from");
const date = arg("date");
if (!from || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error("Usage: remove-entries.mjs --from <deletes.json> --date YYYY-MM-DD");
  process.exit(2);
}

/**
 * @typedef {{ id: string, reason: string, redirectTo?: string, changeDate?: string }} RemovalRequest
 */

/** @type {RemovalRequest[]} */
const requests = JSON.parse(fs.readFileSync(from, "utf8"));
if (!Array.isArray(requests) || requests.length === 0) {
  console.log("nothing to remove");
  process.exit(0);
}
const all = readEntries();
const targets = selectEntries(all, { ids: requests.map((r) => r.id) }); // throws on unknown ids before anything changes
const deleting = new Set(targets.map((t) => t.id));
const remainingDomains = new Set(all.filter((e) => !deleting.has(e.id)).map((e) => String(e.data.domain)));
for (const request of requests) {
  if (request.redirectTo && deleting.has(request.redirectTo.replace(/^\/|\/$/g, ""))) {
    throw new Error(`${request.id}: redirectTo points at an entry that is also being deleted`);
  }
}

const redirectsFile = path.resolve("public", "_redirects");
const changelogFile = path.resolve("content", "changelog.json");
let redirects = fs.readFileSync(redirectsFile, "utf8");
const changelog = JSON.parse(fs.readFileSync(changelogFile, "utf8"));

for (const entry of targets) {
  const request = requests.find((r) => r.id === entry.id);
  if (!request) throw new Error(`${entry.id}: missing removal request`);
  const target = pickTarget({ domain: String(entry.data.domain), redirectTo: request.redirectTo, remainingDomains });
  redirects = retarget(redirects, `/${entry.id}/`, target);
  redirects = insertRedirects(redirects, redirectRules(entry.id, target));
  changelog.push(
    removalRecord({ title: String(entry.data.title), domain: String(entry.data.domain), reason: request.reason, date: request.changeDate ?? date }),
  );
}

// A domain that just lost its last entry has no category page any more: move older rules that pointed there.
for (const domain of new Set(targets.map((t) => String(t.data.domain)))) {
  if (!remainingDomains.has(domain)) redirects = retarget(redirects, `/category/${domain}/`, "/explorer/");
}

changelog.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
fs.writeFileSync(redirectsFile, redirects);
fs.writeFileSync(changelogFile, `${JSON.stringify(changelog, null, 2)}\n`);
for (const entry of targets) fs.rmSync(entry.file);
console.log(`removed ${targets.length} entries; redirects and content/changelog.json updated`);
