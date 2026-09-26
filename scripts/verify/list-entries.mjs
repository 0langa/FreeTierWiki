// Prints the entry chunks for a batch as JSON. Usage: node scripts/verify/list-entries.mjs --domains ai,analytics [--size 20]
import { chunkByProvider, parseListArg, readEntries, selectEntries } from "./lib/entries.mjs";

const argv = process.argv.slice(2);
const sizeArg = argv.indexOf("--size");
const size = sizeArg >= 0 ? Number(argv[sizeArg + 1]) : 20;
const selected = selectEntries(readEntries(), { domains: parseListArg(argv, "domains"), ids: parseListArg(argv, "ids") });
const chunks = chunkByProvider(selected, size).map((ids, i) => ({ chunk: i + 1, ids }));
console.log(JSON.stringify(chunks, null, 1));
