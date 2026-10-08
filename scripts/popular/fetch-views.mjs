// Weekly "most visited" job: asks Cloudflare which entry pages real visitors opened in the last 30 days
// and writes the ordered list of paths to content/popular.json. Only paths go into the file, never counts,
// so the repo and the site do not reveal traffic numbers.
// Usage: CLOUDFLARE_API_TOKEN=... node scripts/popular/fetch-views.mjs [--host freetier.wiki] [--days 30] [--out content/popular.json]
// The token needs "Zone / Analytics / Read" and "Zone / Zone / Read" on that one zone.
import fs from "node:fs";
import path from "node:path";

import { dayWindows, rankEntryPaths, rowsFromResponse, VIEWS_QUERY } from "./lib/rank.mjs";

const argv = process.argv.slice(2);
/** @param {string} name */
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
};

const host = arg("host") ?? "freetier.wiki";
const days = Number(arg("days") ?? 30);
const outFile = path.resolve(arg("out") ?? "content/popular.json");
const token = process.env.CLOUDFLARE_API_TOKEN;
if (!token) {
  console.error("CLOUDFLARE_API_TOKEN is not set. Nothing fetched, nothing written.");
  process.exit(2);
}
const headers = { authorization: `Bearer ${token}`, "content-type": "application/json" };

async function zoneId() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/zones?name=${encodeURIComponent(host)}`, { headers });
  const body = await response.json();
  const id = body?.result?.[0]?.id;
  if (!response.ok || typeof id !== "string") throw new Error(`zone lookup for ${host} failed: HTTP ${response.status}`);
  return id;
}

/** @param {string} zone @param {{ since: string, until: string }} window */
async function fetchDay(zone, window) {
  const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query: VIEWS_QUERY, variables: { zone, host, ...window } }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return rowsFromResponse(await response.json());
}

const zone = await zoneId();
/** @type {Array<{ path: string, count: number }>} */
const rows = [];
let counted = 0;
for (const window of dayWindows(new Date(), days)) {
  try {
    rows.push(...(await fetchDay(zone, window)));
    counted++;
  } catch (error) {
    // Older days can sit outside the plan's retention window; count what is available.
    console.warn(`skip ${window.since.slice(0, 10)}: ${error instanceof Error ? error.message : error}`);
  }
}
if (counted === 0) {
  console.error("No day could be read. Leaving the file as it is.");
  process.exit(1);
}

const exists = (kind, slug) => fs.existsSync(path.resolve("content", kind, `${slug}.mdx`));
const paths = rankEntryPaths(rows, { limit: 24, exists });
const updated = new Date().toISOString().slice(0, 10);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify({ updated, days: counted, paths }, null, 2)}\n`);
console.log(`${paths.length} entry paths from ${counted} days → ${path.relative(process.cwd(), outFile)}`);
