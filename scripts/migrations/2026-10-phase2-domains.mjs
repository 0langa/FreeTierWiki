// Phase 2 (2026-10-08): split the vague domains `productivity`, `integration`, and `operations`
// into real ones, and fold `operations` into `devops`. Rewrites `domain` and `category` in every
// listed entry, remaps old category URLs in public/_redirects, and remaps changelog records.
// Usage: node scripts/migrations/2026-10-phase2-domains.mjs
import fs from "node:fs";
import path from "node:path";

import { retarget } from "../verify/lib/remove.mjs";

const DOMAIN_FALLBACK = { productivity: "collaboration", integration: "apis", operations: "devops", other: "apis" };

const MOVES = {
  collaboration: [
    "atlassian-jira-free", "chanty", "eventbrite", "evernote", "fibery", "fizzy", "flock", "gitbook", "gokanban-io",
    "hackmd-io", "huly", "linear", "linkinize", "miro", "notion", "nuclino", "onlineinterview-io", "pendulums", "pumble",
    "quidlo-timesheets", "raindrop-io", "rocket-chat", "stickies", "talky-io", "teamcamp", "teamhood", "teamplify",
    "timecamp", "tldraw-com", "twist-com", "userforge-com", "webvizio", "visual-debug", "zoho-assist", "zoho-connect",
    "zoho-desk", "zoho-docs", "zoho-meeting", "zoho-notebook", "zoho-projects", "zoho-sprints", "zoho-wiki", "zulip",
    "zoho-cliq", "flat-social", "mintlify", "read-the-docs", "docssearch", "calendly", "cally-com", "zoho-bookings",
    "cal-com",
  ],
  forms: [
    "feathery", "wufoo", "fabform", "fluidforms", "form-taxi", "formcarry-com", "formester-com", "formkeep-com",
    "forms-app", "formspark-io", "formspree-io", "formsubmit-co", "formware-io", "heyform-net", "smartforms-dev", "tally",
    "zoho-forms", "herotofu-com", "kwes-io", "vidhook", "zoho-surveys", "waitlio",
  ],
  localization: [
    "autolocalise", "crowdin", "freepo-editor", "lingohub-com", "localazy-com", "localhero-ai", "localise-biz", "localit",
    "localizely-com", "poeditor", "texterify", "tolgee", "transifex-com",
  ],
  documents: [
    "doczilla", "dynamicdocs", "templatefox", "apitemplate-io", "craftmypdf", "export-sdk", "pdf-api-io", "pdfbolt",
    "simplepdf-eu", "zoho-sign", "waiverstevie-com", "tinymce", "conversion-tools", "cloudmersive", "parseur", "parsio-io",
  ],
  apis: [
    "calendarific", "canopy", "currencyscoop", "db-ip", "geolocated-io", "ip-geolocation", "ip2geo-dev", "ipbase-com",
    "ipinfo", "iplocate", "ip-api", "ip-geolocation-api-by-ipwho-org", "ip-geolocation-api", "ipapi", "the-ip-api",
    "abstract-api", "carapi-dev", "country-state-city-microservice-api", "news-api", "numlookupapi-com",
    "tomorrow-io-weather-api", "unirateapi", "vatcheckapi-com", "verimail-io", "zipcodebase", "zipcodestack", "hs-ping",
    "azure-maps", "rapidapi", "azure-api-management", "ibm-api-connect", "zoho-checkout", "zoho-subscriptions",
  ],
  scraping: ["browse-ai", "microlink-io", "scrapingant", "simplescraper", "webscraping-ai", "zenscrape", "apify", "serpapi", "wrapapi-com"],
  automation: [
    "azure-logic-apps", "azure-data-factory", "composio", "coupler", "data-fetcher", "dataimporter-io", "invantive-cloud",
    "make", "pipedream", "zapier", "smartparse", "sofodata", "hook0", "svix", "posthook", "usewebhook-com",
  ],
  messaging: ["emailjs", "azure-iot-hub", "bump", "improvmx", "mutant-mail"],
  devops: ["abby", "linkok-com", "azure-advisor", "azure-arc", "azure-lighthouse", "codekeep", "paste-sh"],
  ai: ["deepnote"],
  analytics: ["commandbar"],
};

const target = new Map();
for (const [domain, slugs] of Object.entries(MOVES)) for (const slug of slugs) {
  if (target.has(slug)) throw new Error(`${slug} listed twice`);
  target.set(slug, domain);
}

let moved = 0;
const unmapped = [];
for (const kind of ["services", "tools"]) {
  for (const file of fs.readdirSync(path.join("content", kind))) {
    if (!file.endsWith(".mdx")) continue;
    const slug = file.slice(0, -4);
    const p = path.join("content", kind, file);
    const text = fs.readFileSync(p, "utf8");
    const current = text.match(/^domain:\s*(\S+)\s*$/m)?.[1];
    if (!current) throw new Error(`${p}: no domain`);
    const next = target.get(slug);
    if (!next) {
      if (current in DOMAIN_FALLBACK) unmapped.push(`${kind}/${slug} (${current})`);
      continue;
    }
    if (next === current) continue;
    const out = text.replace(/^domain:\s*\S+\s*$/m, `domain: ${next}`).replace(/^category:\s*.+$/m, `category: ${next}`);
    fs.writeFileSync(p, out);
    moved++;
  }
}
for (const slug of target.keys()) {
  if (!fs.existsSync(`content/services/${slug}.mdx`) && !fs.existsSync(`content/tools/${slug}.mdx`)) unmapped.push(`missing: ${slug}`);
}
if (unmapped.length) throw new Error(`entries without a new domain:\n${unmapped.join("\n")}`);

// Old category pages keep working.
const redirectsFile = path.join("public", "_redirects");
let redirects = fs.readFileSync(redirectsFile, "utf8");
const OLD_DOMAINS = ["productivity", "integration", "operations"];
for (const old of OLD_DOMAINS) redirects = retarget(redirects, `/category/${old}/`, `/category/${DOMAIN_FALLBACK[old]}/`);
const extra = OLD_DOMAINS.flatMap((old) => [
  `/category/${old}/ /category/${DOMAIN_FALLBACK[old]}/ 301`,
  `/category/${old} /category/${DOMAIN_FALLBACK[old]}/ 301`,
]).filter((rule) => !redirects.includes(rule));
if (extra.length) {
  const catchAll = redirects.lastIndexOf("/resources/*");
  const added = `${extra.join("\n")}\n`;
  redirects = catchAll >= 0 ? redirects.slice(0, catchAll) + added + redirects.slice(catchAll) : `${redirects.trimEnd()}\n${added}`;
}
fs.writeFileSync(redirectsFile, redirects);

// Changelog removal records point at the nearest new domain.
const changelogFile = path.join("content", "changelog.json");
const changelog = JSON.parse(fs.readFileSync(changelogFile, "utf8"));
for (const record of changelog) if (record.category in DOMAIN_FALLBACK) record.category = DOMAIN_FALLBACK[record.category];
fs.writeFileSync(changelogFile, `${JSON.stringify(changelog, null, 2)}\n`);

console.log(`moved ${moved} entries`);
