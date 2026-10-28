import type { AtlasEntry, ProductionReadiness } from "@/types/content";

const RISK_RANK = { none: 0, low: 1, medium: 2, high: 3 } as const;

/** Active entries first, then no-card, hard-cap, and no-overage plans. Freshness is left out so the wording does not change just because a check went stale. */
export function bySafety(entries: AtlasEntry[]): AtlasEntry[] {
  const score = (entry: AtlasEntry) => {
    if (entry.status === "ended") return -100;
    const details = entry.freeTierDetails;
    return (details.requiresCard === false ? 8 : 0) + (details.hasHardCap === true ? 6 : 0) + (details.overageRisk === "none" ? 4 : 0) - RISK_RANK[details.overageRisk];
  };
  return [...entries].sort((a, b) => score(b) - score(a) || a.title.localeCompare(b.title));
}

export function joinNames(titles: string[]): string {
  if (titles.length === 0) return "none";
  if (titles.length === 1) return titles[0];
  if (titles.length === 2) return `${titles[0]} and ${titles[1]}`;
  return `${titles.slice(0, -1).join(", ")}, and ${titles[titles.length - 1]}`;
}

export function names(entries: AtlasEntry[], limit = 4): string {
  return joinNames(bySafety(entries).slice(0, limit).map((entry) => entry.title));
}

/**
 * Names a short set in full. A longer set names a few and points at the list on the page,
 * instead of a clipped "N more sit in that group."
 */
export function nameList(entries: AtlasEntry[], limit = 4): string {
  const titles = bySafety(entries).map((entry) => entry.title);
  if (titles.length === 0) return "none";
  if (titles.length <= 6) return joinNames(titles);
  const shown = titles.slice(0, limit);
  const rest = titles.length - shown.length;
  const head = shown.length === 1 ? shown[0] : shown.join(", ");
  return `${head}, and ${rest} more in the list below`;
}

export function isNoCard(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.requiresCard === false;
}

export function isCard(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.requiresCard === true;
}

export function isCardUnknown(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.requiresCard === "unknown";
}

export function isHardCap(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.hasHardCap === true;
}

export function isCapUnknown(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.hasHardCap === "unknown";
}

export function isLimitedOffer(entry: AtlasEntry): boolean {
  return entry.status !== "ended" && entry.freeTierDetails.freeTierType !== "always-free";
}

export function factText(entry: AtlasEntry): string {
  const details = entry.freeTierDetails;
  return [details.summary, ...details.limits, ...details.caveats, ...details.billingRiskNotes].join("\n");
}

export function mentioning(entries: AtlasEntry[], pattern: RegExp): AtlasEntry[] {
  return entries.filter((entry) => entry.status !== "ended" && pattern.test(factText(entry)));
}

export function planBit(entry: AtlasEntry): string {
  const details = entry.freeTierDetails;
  if (details.freeTierType === "trial") return details.trialDays ? `${entry.title} (${details.trialDays}-day trial)` : `${entry.title} (trial)`;
  if (details.freeTierType === "credit") return details.monthlyCreditAmount ? `${entry.title} (${details.monthlyCreditAmount})` : `${entry.title} (credit)`;
  if (details.freeTierType === "time-limited") return details.trialDays ? `${entry.title} (${details.trialDays} days)` : `${entry.title} (time-limited)`;
  return entry.title;
}

export function changedSummary(entries: AtlasEntry[]): string {
  const rows = entries
    .filter((entry) => entry.status === "changed")
    .sort((a, b) => (b.changes[0]?.date ?? "").localeCompare(a.changes[0]?.date ?? "") || a.title.localeCompare(b.title));
  if (rows.length === 0) return "No entry in this category is marked changed.";
  const verb = rows.length === 1 ? "entry is" : "entries are";
  if (rows.length <= 6) return `${rows.length} ${verb} marked changed: ${joinNames(rows.map((entry) => entry.title))}.`;
  const head = rows.slice(0, 4).map((entry) => entry.title).join(", ");
  return `${rows.length} ${verb} marked changed: ${head}, and ${rows.length - 4} more in the list below.`;
}

export function endedSummary(entries: AtlasEntry[]): string {
  const rows = entries.filter((entry) => entry.status === "ended");
  if (rows.length === 0) return "No entry in this category is marked ended.";
  const titled = joinNames(rows.map((entry) => entry.title));
  return rows.length === 1
    ? `${titled} is marked ended, so it stays here as a record and not as a plan you can open.`
    : `${titled} are marked ended, so they stay here as a record and not as plans you can open.`;
}

export function countReady(entries: AtlasEntry[], level: ProductionReadiness): AtlasEntry[] {
  return entries.filter((entry) => entry.status !== "ended" && entry.productionReadiness === level);
}
