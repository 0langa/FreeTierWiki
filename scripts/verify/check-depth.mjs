// Checks every entry body against the shape in scripts/verify/lib/depth.mjs.
// A body with no `##` heading fails. Usage:
//   node scripts/verify/check-depth.mjs [--ids services/supabase,...] [--domains hosting] [--evidence]
//   --evidence  also check every number against the fetched source text and the fetch date (local runs;
//               the text lives under development/, which CI does not have)
import { parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";
import { checkDepth, isDeep } from "./lib/depth.mjs";
import { readEvidence, readSkipped } from "./lib/evidence.mjs";

const argv = process.argv.slice(2);
const useEvidence = argv.includes("--evidence");

const all = readEntries();
const entries = new Map(all.map((entry) => [entry.id, { status: entry.data.status }]));
const targets = selectEntries(all, { domains: parseListArg(argv, "domains"), ids: parseListArg(argv, "ids") });
const skipped = useEvidence ? readSkipped() : new Set();

let failed = 0;
for (const entry of targets) {
  const problems = isDeep(entry.body)
    ? checkDepth({
        id: entry.id,
        data: entry.data,
        body: entry.body,
        entries,
        evidence: useEvidence ? (readEvidence(entry.id) ?? []) : undefined,
        skipped: skipped.has(entry.id),
      })
    : ["missing a ## heading"];
  if (problems.length) {
    failed++;
    console.log(`FAIL ${entry.id}`);
    for (const problem of problems) console.log(`  - ${problem}`);
  }
}

console.log(`${targets.length} checked, ${targets.length - failed} pass, ${failed} fail${useEvidence ? " (numbers checked against fetched pages)" : ""}`);
process.exit(failed > 0 ? 1 : 0);
