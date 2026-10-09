// Fetches every source page an entry names and keeps the readable text as evidence for the deepening.
// Usage: node scripts/verify/fetch-evidence.mjs --ids services/supabase,tools/postman   |   --domains hosting
//        node scripts/verify/fetch-evidence.mjs --add services/x --url https://x.dev/limits [--file page.txt]
// --add fetches one more page for an entry; with --file it stores text read another way (a real browser,
// WebFetch) when the plain fetch comes back thin. Cite every page you use in the entry's sourceUrls.
// The text stays under development/ (gitignored). It is never pasted into an entry.
import fs from "node:fs";

import { parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";
import { EVIDENCE_DIR, writeEvidence } from "./lib/evidence.mjs";
import { fetchText } from "./lib/fetch.mjs";
import { isThin } from "./lib/pages.mjs";

const CONCURRENCY = 6;
const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const addId = arg("add");
if (addId) {
  const url = arg("url");
  const file = arg("file");
  if (!url) throw new Error("--add needs --url");
  if (file) {
    const text = fs.readFileSync(file, "utf8");
    writeEvidence(addId, [{ url, status: 200, fetchedAt: new Date().toISOString(), via: arg("via") ?? "manual", text }]);
    console.log(`stored ${text.length} chars for ${addId} from ${url}`);
    process.exit(0);
  }
  const result = await fetchText(url);
  if (result.status !== 200 || isThin(result.text)) {
    console.log(`${addId} ${result.status || result.error} thin ${url}; nothing stored`);
    process.exit(1);
  }
  writeEvidence(addId, [{ url, finalUrl: result.finalUrl, status: 200, fetchedAt: new Date().toISOString(), via: "fetch", text: result.text }]);
  console.log(`stored ${result.text.length} chars for ${addId} from ${url}`);
  process.exit(0);
}

/** @param {Record<string, unknown>} data */
function sourceList(data) {
  const urls = [];
  const add = (/** @type {unknown} */ url) => {
    if (typeof url === "string" && /^https?:\/\//i.test(url) && !urls.includes(url)) urls.push(url);
  };
  add(data.pricingUrl);
  for (const url of Array.isArray(data.sourceUrls) ? data.sourceUrls : []) add(url);
  add(data.docsUrl);
  add(data.officialUrl);
  return urls.slice(0, 6);
}

const domains = parseListArg(argv, "domains");
const ids = parseListArg(argv, "ids");
// Fetching every entry takes minutes and rewrites every evidence file; make it an explicit choice.
if (!domains && !ids && !argv.includes("--all")) {
  console.log("usage: fetch-evidence.mjs --ids services/a,tools/b | --domains hosting | --all | --add <id> --url <url> [--file <txt>]");
  process.exit(2);
}
const targets = selectEntries(readEntries(), { domains, ids });
const thin = [];
let next = 0;
async function worker() {
  while (next < targets.length) {
    const entry = targets[next++];
    const pages = [];
    for (const url of sourceList(entry.data)) {
      const result = await fetchText(url);
      const ok = result.status === 200 && !isThin(result.text);
      if (ok) pages.push({ url, finalUrl: result.finalUrl, status: result.status, fetchedAt: new Date().toISOString(), via: "fetch", text: result.text });
      console.log(`${entry.id} ${result.status || result.error} ${ok ? `${result.text.length} chars` : "thin"} ${url}`);
    }
    if (pages.length) writeEvidence(entry.id, pages);
    else thin.push(entry.id);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
console.log(`fetched ${targets.length} entries into ${EVIDENCE_DIR}; ${thin.length} with no usable page${thin.length ? `: ${thin.join(", ")}` : ""}`);
