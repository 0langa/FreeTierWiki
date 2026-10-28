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
  const shown = rows.slice(0, 3).map((entry) => {
    const note = entry.changes[0]?.note?.trim();
    if (!note || note.length > 120) return entry.title;
    return `${entry.title} (${note.replace(/\.$/, "")})`;
  });
  const hidden = rows.length - shown.length;
  const more = hidden > 0 ? ` ${hidden} other changed ${hidden === 1 ? "entry is" : "entries are"} on the list.` : "";
  const verb = rows.length === 1 ? "entry is" : "entries are";
  return `${rows.length} ${verb} marked changed: ${shown.join("; ")}.${more}`;
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
