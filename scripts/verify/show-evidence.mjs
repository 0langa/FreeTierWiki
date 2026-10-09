// Prints the price-related lines of every page fetched for an entry, so a writer reads excerpts, not whole pages.
// Usage: node scripts/verify/show-evidence.mjs services/supabase [--max 5000] [--grep "pause|inactiv"] [--find "free plan pauses"]
// --find searches the whole text of every page, ignoring case and line breaks, and prints each hit in context.
import { readEvidence } from "./lib/evidence.mjs";
import { excerpt } from "./lib/pages.mjs";

const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const id = argv.find((value) => /^(services|tools)\//.test(value));
if (!id) throw new Error("usage: show-evidence.mjs <services|tools>/<slug> [--max N] [--grep regex]");
const max = Number(arg("max") ?? 5000);
const grep = arg("grep") ? new RegExp(arg("grep"), "i") : undefined;
const find = arg("find")?.toLowerCase().replace(/\s+/g, " ");

const pages = readEvidence(id);
if (!pages?.length) {
  console.log(`${id}: no fetched pages. Run: node scripts/verify/fetch-evidence.mjs --ids ${id}`);
  process.exit(1);
}
for (const page of pages) {
  console.log(`=== ${page.url} (fetched ${page.fetchedAt.slice(0, 10)}, ${page.text.length} chars, via ${page.via})`);
  if (find) {
    const flat = page.text.replace(/\s+/g, " ");
    const lower = flat.toLowerCase();
    let at = lower.indexOf(find);
    let hits = 0;
    while (at >= 0 && hits < 10) {
      console.log(`... ${flat.slice(Math.max(0, at - 200), at + find.length + 200)} ...`);
      hits++;
      at = lower.indexOf(find, at + find.length);
    }
    if (!hits) console.log("(not found on this page)");
  } else if (grep) {
    const lines = page.text.split("\n");
    const keep = new Set();
    lines.forEach((line, i) => grep.test(line) && [i - 1, i, i + 1].forEach((j) => j >= 0 && j < lines.length && keep.add(j)));
    console.log([...keep].sort((a, b) => a - b).map((i) => lines[i]).join("\n").slice(0, max));
  } else {
    console.log(excerpt(page.text, max));
  }
}
