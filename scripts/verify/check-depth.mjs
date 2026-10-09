// Checks every deepened entry body against the shape in docs/plans/2026-10-09-deepen-every-entry.md.
// Usage: node scripts/verify/check-depth.mjs [--ids services/supabase,...] [--domains hosting] [--evidence] [--all]
//   --evidence  also check every number against the fetched source text and the fetch date (local runs;
//               the text lives under development/, which CI does not have)
//   --all       fail on any selected entry that is not deepened yet (for the end of the sweep)
import { parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";
import { checkDepth, isDeep } from "./lib/depth.mjs";
import { readEvidence, readSkipped } from "./lib/evidence.mjs";

const argv = process.argv.slice(2);
const useEvidence = argv.includes("--evidence");
const requireAll = argv.includes("--all");

const all = readEntries();
const entries = new Map(all.map((entry) => [entry.id, { status: entry.data.status }]));
const targets = selectEntries(all, { domains: parseListArg(argv, "domains"), ids: parseListArg(argv, "ids") });
const skipped = useEvidence ? readSkipped() : new Set();

let deep = 0;
let failed = 0;
const shallow = [];
for (const entry of targets) {
  if (!isDeep(entry.body)) {
    shallow.push(entry.id);
    continue;
  }
  deep++;
  const evidence = useEvidence ? (readEvidence(entry.id) ?? []) : undefined;
  const problems = checkDepth({ id: entry.id, data: entry.data, body: entry.body, entries, evidence, skipped: skipped.has(entry.id) });
  if (problems.length) {
    failed++;
    console.log(`FAIL ${entry.id}`);
    for (const problem of problems) console.log(`  - ${problem}`);
  }
}

console.log(`${deep} deepened, ${deep - failed} pass, ${failed} fail, ${shallow.length} not deepened yet${useEvidence ? " (numbers checked against fetched pages)" : ""}`);
if (requireAll && shallow.length) {
  console.log(`not deepened: ${shallow.slice(0, 20).join(", ")}${shallow.length > 20 ? ", ..." : ""}`);
}
process.exit(failed > 0 || (requireAll && shallow.length > 0) ? 1 : 0);
