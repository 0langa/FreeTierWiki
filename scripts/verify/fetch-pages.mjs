// Saves the readable text of each entry's official pricing page for the content check.
// Usage: node scripts/verify/fetch-pages.mjs --domains hosting,database   |   --ids services/neon,tools/postman
import fs from "node:fs";
import path from "node:path";

import { parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";
import { candidateUrls, excerpt, htmlToText, isThin } from "./lib/pages.mjs";

const OUT = path.resolve("development", "verify", "pages");
const UA = "freetier.wiki-verify/1.0 (+https://freetier.wiki/about/)";
const CONCURRENCY = 6;

const argv = process.argv.slice(2);
const targets = selectEntries(readEntries(), { domains: parseListArg(argv, "domains"), ids: parseListArg(argv, "ids") });
fs.mkdirSync(OUT, { recursive: true });
const indexFile = path.join(OUT, "index.json");
const index = fs.existsSync(indexFile) ? JSON.parse(fs.readFileSync(indexFile, "utf8")) : {};

async function fetchText(url) {
  try {
    const response = await fetch(url, { redirect: "follow", headers: { "user-agent": UA, accept: "text/html" }, signal: AbortSignal.timeout(15_000) });
    const text = response.ok ? htmlToText(await response.text()) : "";
    return { url, status: response.status, finalUrl: response.url, text };
  } catch (error) {
    return { url, status: 0, error: String(error?.cause?.code ?? error?.name ?? error), text: "" };
  }
}

function saveIndex() {
  // Atomic write: a crash or interruption mid-batch must never leave index.json
  // truncated or half-written — write to a temp file, then rename over the target.
  const tmp = `${indexFile}.tmp`;
  fs.writeFileSync(tmp, `${JSON.stringify(index, null, 1)}\n`);
  fs.renameSync(tmp, indexFile);
}

async function handle(entry) {
  const tried = [];
  let best;
  for (const url of candidateUrls(entry.data)) {
    const result = await fetchText(url);
    tried.push({ url, status: result.status, chars: result.text.length });
    if (!best || result.text.length > best.text.length) best = result;
    if (result.status === 200 && !isThin(result.text)) break;
  }
  const base = path.join(OUT, `${entry.kind}__${entry.slug}`);
  const text = best?.text ?? "";
  fs.writeFileSync(`${base}.txt`, text);
  fs.writeFileSync(`${base}.excerpt.txt`, excerpt(text));
  index[entry.id] = { url: best?.finalUrl ?? best?.url ?? null, thin: isThin(text), tried, fetchedAt: new Date().toISOString() };
  saveIndex();
}

let next = 0;
let done = 0;
async function worker() {
  while (next < targets.length) {
    const entry = targets[next++];
    await handle(entry);
    if (++done % 25 === 0) console.log(`${done}/${targets.length}`);
  }
}
await Promise.all(Array.from({ length: CONCURRENCY }, worker));
const thin = targets.filter((entry) => index[entry.id].thin).length;
console.log(`fetched ${targets.length} entries; ${thin} thin (need WebFetch); index: ${indexFile}`);
