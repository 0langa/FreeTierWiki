// Fails when the static export grows past agreed size budgets. Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const OUT = path.resolve("out");
const gz = (file) => zlib.gzipSync(fs.readFileSync(file)).length;

function scriptsIn(htmlFile) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const sources = new Set();
  for (const [tag] of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
    // Modern browsers never fetch a noModule script; exclude the legacy polyfill bundle from the budget.
    if (/^<script\b/i.test(tag) && /\bnomodule\b/i.test(tag)) continue;
    const match = tag.match(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/);
    if (match) sources.add(match[1]);
  }
  return [...sources].map((src) => path.join(OUT, src.slice(1)));
}

// Home JS excludes noModule polyfills. 175 KB = React 19 + Next runtime + search dialog; see spec §8.
const budgets = [
  { name: "home JS (gzip)", bytes: scriptsIn(path.join(OUT, "index.html")).reduce((sum, file) => sum + gz(file), 0), max: 175 * 1024 },
  { name: "explorer HTML (gzip)", bytes: gz(path.join(OUT, "explorer", "index.html")), max: 150 * 1024 },
  { name: "detail HTML (gzip)", bytes: gz(path.join(OUT, "services", "supabase", "index.html")), max: 40 * 1024 },
  { name: "explorer.json (gzip)", bytes: gz(path.join(OUT, "data", "explorer.json")), max: 110 * 1024 },
];

// Crawlers limit the uncompressed HTML, even when the transfer compresses well.
// Leave headroom below Ahrefs' 2 MB limit, including every archive/filter page.
const changelogDir = path.join(OUT, "changelog");
for (const file of fs.readdirSync(changelogDir, { recursive: true })) {
  if (!file.endsWith(".html")) continue;
  budgets.push({
    name: `changelog/${file} (uncompressed)`,
    bytes: fs.statSync(path.join(changelogDir, file)).size,
    max: 1_000_000,
  });
}

let failed = false;
for (const budget of budgets) {
  const ok = budget.bytes <= budget.max;
  failed ||= !ok;
  if (!ok) console.error(`FAIL ${budget.name}: ${(budget.bytes / 1024).toFixed(1)} KB, max ${budget.max / 1024} KB`);
}
process.exitCode = failed ? 1 : 0;
