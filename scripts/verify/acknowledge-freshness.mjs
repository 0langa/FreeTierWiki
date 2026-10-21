// Deliberately acknowledge sources only after comparing entries with the stored source revision.
// node scripts/verify/acknowledge-freshness.mjs --hashes data/source-hashes.json --ids services/a,tools/b
// --ids-file accepts a JSON array of ID strings or review-result objects with an id field.
// No fetches, content date edits, or implicit acknowledgement of the entire catalog.
import fs from "node:fs";
import path from "node:path";
import { readEntries } from "./lib/entries.mjs";
import { acknowledgeSources } from "./lib/freshness.mjs";

const argv = process.argv.slice(2);
const options = new Map();
for (let i = 0; i < argv.length; i += 2) {
  if (!["--hashes", "--ids", "--ids-file"].includes(argv[i]) || options.has(argv[i]) || !argv[i + 1] || argv[i + 1].startsWith("--")) {
    throw new Error("Use --hashes <file> and exactly one of --ids <IDs> or --ids-file <JSON file>");
  }
  options.set(argv[i], argv[i + 1]);
}
if (options.has("--ids") === options.has("--ids-file")) throw new Error("Acknowledgement requires exactly one explicit --ids or --ids-file");
let ids;
if (options.has("--ids-file")) {
  const values = JSON.parse(fs.readFileSync(options.get("--ids-file"), "utf8"));
  if (!Array.isArray(values)) throw new Error("--ids-file must contain a JSON array of IDs or review-result objects");
  ids = values.map(value => typeof value === "string" ? value : value?.id);
} else ids = options.get("--ids").split(",").map(id => id.trim());
if (!ids.length || ids.some(id => typeof id !== "string" || !/^(services|tools)\/[a-z0-9][a-z0-9-]*$/.test(id))) throw new Error("Acknowledgement requires valid non-empty content IDs");
const hashesFile = path.resolve(options.get("--hashes") ?? "data/source-hashes.json");
const baseline = JSON.parse(fs.readFileSync(hashesFile, "utf8"));
if (!baseline.entries || typeof baseline.entries !== "object" || Array.isArray(baseline.entries)) throw new Error("Invalid source baseline: missing entries object");
const dates = Object.fromEntries(readEntries().map(entry => {
  const value = entry.data.lastVerified;
  return [entry.id, value instanceof Date ? value.toISOString().slice(0, 10) : typeof value === "string" ? value.slice(0, 10) : undefined];
}));
const entries = acknowledgeSources(baseline.entries, [...new Set(ids)], dates, new Date().toISOString());
const temporary = `${hashesFile}.${process.pid}.tmp`;
fs.writeFileSync(temporary, `${JSON.stringify({ ...baseline, entries }, null, 1)}\n`);
fs.renameSync(temporary, hashesFile);
