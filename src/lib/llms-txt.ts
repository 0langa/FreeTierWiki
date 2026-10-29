import { DOMAIN_LABELS, FREE_TIER_TYPE_LABELS, OVERAGE_RISK_LABELS } from "@/lib/content";
import { absoluteUrl } from "@/lib/links";
import type { NavData } from "@/lib/nav-data";
import { API_DOCS_URL, ENTRIES_PATH, OPENAPI_PATH } from "@/lib/public-api";
import type { AtlasEntry, Domain, PolicyConfirmation } from "@/types/content";

// llms.txt (https://llmstxt.org/): a short, curated map of the site for language models, with links to
// the Markdown versions of the pages. llms-full.txt puts every entry's facts in one file.

const SUMMARY =
  "Free plans for developers, with the limits, card rules, hard caps, and billing risk spelled out. "
  + "Each entry is checked against the provider's official pricing page and shows the date of that check.";

const markdownUrl = (path: string) => absoluteUrl(`${path}index.md`);

export function llmsTxt(nav: NavData, entryCount: number): string {
  const lines = [
    "# freetier.wiki",
    "",
    `> ${SUMMARY}`,
    "",
    `The catalog has ${entryCount} services and tools. Every page is available as Markdown: send \`Accept: text/markdown\`, or add \`index.md\` to the page URL. "Not confirmed" means the provider does not publish that policy clearly; it is not a no.`,
    "",
    "## Catalog data",
    "",
    `- [Every entry in one file](${absoluteUrl("/llms-full.txt")}): limits, card rule, hard cap, billing risk, and check date for each free tier`,
    `- [Catalog API](${absoluteUrl(ENTRIES_PATH)}): the same data as JSON, described by the [OpenAPI document](${absoluteUrl(OPENAPI_PATH)})`,
    `- [API guide](${API_DOCS_URL}): field meanings and compatibility rules`,
    "",
    "## Comparisons",
    "",
    ...nav.comparisons.map((card) => `- [${card.label}](${markdownUrl(card.href)}): ${card.intro}`),
    "",
    "## Categories",
    "",
    ...nav.categories.map((category) => `- [${category.label}](${markdownUrl(`/category/${category.domain}/`)}): ${category.count} free tiers, safest first`),
    "",
    "## Quick lists",
    "",
    ...nav.lists.map((list) => `- [${list.label}](${markdownUrl(list.href)}): ${list.count} entries`),
    "",
    "## Optional",
    "",
    `- [How we rate](${markdownUrl("/about/")}): what billing risk, card rules, and freshness labels mean`,
    `- [Free tiers that ended or changed in 2026](${markdownUrl("/reports/free-tier-changes-2026/")}): dated report with a vendor source on every row, also as [CSV](${absoluteUrl("/api/v1/reports/free-tier-changes-2026.csv")})`,
    `- [Changelog](${markdownUrl("/changelog/")}): free plans added, changed, ended, or removed, newest first`,
    `- [Changelog feed](${absoluteUrl("/changelog/feed.xml")}): the latest changes as RSS`,
  ];
  return `${lines.join("\n")}\n`;
}

function policy(value: PolicyConfirmation, yes: string, no: string, what: string): string {
  return value === "unknown" ? `${what} not confirmed` : value ? yes : no;
}

function entryBlock(entry: AtlasEntry): string {
  const details = entry.freeTierDetails;
  const facts = [
    entry.provider,
    FREE_TIER_TYPE_LABELS[details.freeTierType],
    policy(details.requiresCard, "card required", "no card", "card rule"),
    policy(details.hasHardCap, "hard cap", "no hard cap", "hard cap"),
    `billing risk: ${OVERAGE_RISK_LABELS[details.overageRisk].toLowerCase()}`,
    details.resetPeriod && `resets ${details.resetPeriod.toLowerCase()}`,
    entry.lastVerified ? `checked ${entry.lastVerified}` : `data from ${entry.lastUpdated}, not re-checked`,
  ].filter(Boolean);
  const status = entry.status === "ended" ? "**The free tier has ended.** " : entry.status === "changed" ? "**The free tier changed recently.** " : "";
  return [
    `### ${entry.title}`,
    "",
    facts.join(" · "),
    "",
    `${status}${entry.answer}`,
    "",
    ...details.limits.map((limit) => `- ${limit}`),
    ...details.caveats.map((caveat) => `- Watch out: ${caveat}`),
    "",
    `Details: ${absoluteUrl(entry.url)}`,
  ].join("\n");
}

export function llmsFullTxt(entries: AtlasEntry[], generated: string): string {
  const byDomain = new Map<Domain, AtlasEntry[]>();
  for (const entry of entries) byDomain.set(entry.domain, [...(byDomain.get(entry.domain) ?? []), entry]);
  const sections = [...byDomain]
    .sort(([a], [b]) => DOMAIN_LABELS[a].localeCompare(DOMAIN_LABELS[b]))
    .map(([domain, group]) => [
      `## ${DOMAIN_LABELS[domain]}`,
      "",
      ...group.sort((a, b) => a.title.localeCompare(b.title)).map((entry) => `${entryBlock(entry)}\n`),
    ].join("\n"));
  return [
    "# freetier.wiki: every free tier",
    "",
    `> ${SUMMARY}`,
    "",
    `Built ${generated} from ${entries.length} entries, grouped by category. The same data is JSON at ${absoluteUrl(ENTRIES_PATH)}. Always confirm a plan on the provider's pricing page before you build on it.`,
    "",
    ...sections,
  ].join("\n");
}
