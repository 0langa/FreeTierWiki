// Weekly "most visited" job: asks Cloudflare Web Analytics which entry pages real visitors opened in the last
// 30 days and writes the ordered list of paths to content/popular.json. Only paths go into the file, never counts,
// so the repo and the site do not reveal traffic numbers.
// Web Analytics counts page loads from real browsers (its beacon runs in the page) with Cloudflare's own bot filter
// on. The raw request log counted every crawler and was 99 percent bots.
// Usage: CLOUDFLARE_API_TOKEN=... node scripts/popular/fetch-views.mjs [--host freetier.wiki] [--days 30] [--out content/popular.json]
// The token needs "Account / Account Analytics / Read" on the account that owns the Web Analytics site.
// Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_SITE_TAG to skip the lookups; the site lookup endpoint needs
// permissions beyond analytics read, so the workflow always passes both.
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
const API = "https://api.cloudflare.com/client/v4";

/** @param {string} url */
async function getJson(url) {
  const response = await fetch(url, { headers });
  const body = await response.json();
  if (!response.ok || body?.success === false) {
    const reason = body?.errors?.map((/** @type {{ message: string }} */ error) => error.message).join("; ") || `HTTP ${response.status}`;
    throw new Error(`${url.replace(API, "")}: ${reason}`);
  }
  return body;
}

/** The account that owns the site: from the environment, or the only account the token can see. */
async function accountId() {
  const fromEnv = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (fromEnv) return fromEnv;
  const accounts = (await getJson(`${API}/accounts`))?.result ?? [];
  if (accounts.length !== 1) throw new Error(`token sees ${accounts.length} accounts; set CLOUDFLARE_ACCOUNT_ID`);
  return accounts[0].id;
}

/** The Web Analytics site tag for the host: from the environment, or the site whose host matches. @param {string} account */
async function siteTag(account) {
  const fromEnv = process.env.CLOUDFLARE_SITE_TAG;
  if (fromEnv) return fromEnv;
  const sites = (await getJson(`${API}/accounts/${account}/rum/site_info/list?per_page=100`))?.result ?? [];
  const site = sites.find((/** @type {{ host?: string, site_tag?: string }} */ entry) => entry.host === host) ?? sites.find((/** @type {{ host?: string, site_tag?: string }} */ entry) => entry.host?.endsWith(host));
  if (!site?.site_tag) throw new Error(`no Web Analytics site for ${host}; set CLOUDFLARE_SITE_TAG`);
  return site.site_tag;
}

/** @param {string} account @param {string} site @param {{ since: string, until: string }} window */
async function fetchDay(account, site, window) {
  const response = await fetch(`${API}/graphql`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: VIEWS_QUERY, variables: { account, site, ...window } }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return rowsFromResponse(await response.json());
}

const account = await accountId();
const site = await siteTag(account);
/** @type {Array<{ path: string, count: number }>} */
const rows = [];
let counted = 0;
for (const window of dayWindows(new Date(), days)) {
  try {
    rows.push(...(await fetchDay(account, site, window)));
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
if (paths.length === 0) {
  console.error("No entry page had a real visitor in the window. Leaving the file as it is.");
  process.exit(1);
}
const updated = new Date().toISOString().slice(0, 10);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify({ updated, days: counted, paths }, null, 2)}\n`);
console.log(`${paths.length} entry paths from ${counted} days → ${path.relative(process.cwd(), outFile)}`);
