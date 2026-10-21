// Fetches every source page an entry names and keeps the readable text as evidence for the deepening.
// Usage: node scripts/verify/fetch-evidence.mjs --ids services/supabase,tools/postman   |   --domains hosting
//        node scripts/verify/fetch-evidence.mjs --add services/x --url https://x.dev/limits [--file page.txt]
// --numeric-locale en-US|de-DE|mixed explicitly interprets source number typography; retained per URL on refetch.
// --add fetches one more page for an entry; with --file it stores text read another way (a real browser,
// WebFetch) when the plain fetch comes back thin. Cite every page you use in the entry's sourceUrls.
// The text stays under development/ (gitignored). It is never pasted into an entry.
import fs from "node:fs";

import { parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";
import { writeEvidence } from "./lib/evidence.mjs";
import { fetchText } from "./lib/fetch.mjs";
import { evidenceUrls, isThin } from "./lib/pages.mjs";
import { parseNumericLocale } from "./lib/numeric-format.mjs";

const CONCURRENCY = 6;
const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const localeArg = arg("numeric-locale");
if (argv.includes("--numeric-locale") && (!localeArg || localeArg.startsWith("--"))) throw new Error("Missing numeric locale; use en-US, de-DE or mixed");
const numericLocale = parseNumericLocale(localeArg);

const addId = arg("add");
if (addId) {
  const url = arg("url");
  const file = arg("file");
  if (!url) throw new Error("--add needs --url");
  if (file) {
    const text = fs.readFileSync(file, "utf8");
    writeEvidence(addId, [{ url, status: 200, fetchedAt: new Date().toISOString(), via: arg("via") ?? "manual", text, numericLocale }]);
    process.exit(0);
  }
  const result = await fetchText(url);
  const accessIssue = result.accessIssue ?? (isThin(result.text) ? "thin" : undefined);
  writeEvidence(addId, [{ url, finalUrl: result.finalUrl, status: result.status, fetchedAt: new Date().toISOString(), via: "fetch", text: result.text, accessIssue, numericLocale }]);
  if (result.status !== 200 || accessIssue) {
    console.log(`${addId} ${result.status || result.error} ${accessIssue ?? "unavailable"} ${url}; earlier evidence invalidated for this source`);
    process.exit(1);
  }
  process.exit(0);
}

const domains = parseListArg(argv, "domains");
const ids = parseListArg(argv, "ids");
// Fetching every entry takes minutes and rewrites every evidence file; make it an explicit choice.
if (!domains && !ids && !argv.includes("--all")) {
  console.log("usage: fetch-evidence.mjs --ids services/a,tools/b | --domains hosting | --all | --add <id> --url <url> [--file <txt>] [--numeric-locale en-US|de-DE|mixed]");
  process.exit(2);
}
const targets = selectEntries(readEntries(), { domains, ids });
const thin = [];
let next = 0;
async function worker() {
  while (next < targets.length) {
    const entry = targets[next++];
    const pages = [];
    let usable = 0;
    for (const url of evidenceUrls(entry.data)) {
      const result = await fetchText(url);
      const accessIssue = result.accessIssue ?? (isThin(result.text) ? "thin" : undefined);
      const ok = result.status === 200 && !accessIssue;
      pages.push({ url, finalUrl: result.finalUrl, status: result.status, fetchedAt: new Date().toISOString(), via: "fetch", text: result.text, accessIssue, numericLocale });
      if (ok) usable++;
      else console.log(`${entry.id} ${result.status || result.error} ${accessIssue ?? "unavailable"} ${url}`);
    }
    if (pages.length) writeEvidence(entry.id, pages);
    if (usable === 0) thin.push(entry.id);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
if (thin.length) console.log(`${thin.length} entries have no usable source page: ${thin.join(", ")}`);
