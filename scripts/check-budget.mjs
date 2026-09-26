// Fails when the static export grows past agreed gzip budgets. Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const OUT = path.resolve("out");
const gz = (file) => zlib.gzipSync(fs.readFileSync(file)).length;

function scriptsIn(htmlFile) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const sources = new Set([...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/g)].map((match) => match[1]));
  return [...sources].map((src) => path.join(OUT, src.slice(1)));
}

const budgets = [
  { name: "home JS", bytes: scriptsIn(path.join(OUT, "index.html")).reduce((sum, file) => sum + gz(file), 0), max: 170 * 1024 },
  { name: "explorer HTML", bytes: gz(path.join(OUT, "explorer", "index.html")), max: 150 * 1024 },
  { name: "detail HTML", bytes: gz(path.join(OUT, "services", "supabase", "index.html")), max: 40 * 1024 },
  { name: "explorer.json", bytes: gz(path.join(OUT, "data", "explorer.json")), max: 80 * 1024 },
];

let failed = false;
for (const budget of budgets) {
  const ok = budget.bytes <= budget.max;
  failed ||= !ok;
  console.log(`${ok ? "OK  " : "FAIL"} ${budget.name} (gzip): ${(budget.bytes / 1024).toFixed(1)} KB, max ${budget.max / 1024} KB`);
}
process.exitCode = failed ? 1 : 0;
