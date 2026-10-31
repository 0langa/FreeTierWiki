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

/** Joins items in full up to `max`; a longer list shows `shown` and counts the rest. */
export function listOf(items: string[], shown = 4, max = 6): string {
  if (items.length === 0) return "none";
  if (items.length <= max) return joinNames(items);
  return `${items.slice(0, shown).join(", ")}, and ${items.length - shown} more`;
}

/**
 * Names a short set in full. A longer set names a few and counts the rest. The count does not
 * point at "the list below": the FAQ renders under the list, and the same text goes into JSON-LD.
 */
export function nameList(entries: AtlasEntry[], limit = 4): string {
  return listOf(bySafety(entries).map((entry) => entry.title), limit);
}

/** ": A, B, and C" when every name fits, ", including A, B, and N more" when it does not, "" for none. */
export function listed(entries: AtlasEntry[], limit = 4): string {
  if (entries.length === 0) return "";
  return entries.length <= 6 ? `: ${nameList(entries)}` : `, including ${nameList(entries, limit)}`;
}

/** "1 plan confirms" or "3 plans confirm": the count with its singular or plural wording. */
export function counted(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}

export function isActive(entry: AtlasEntry): boolean {
  return entry.status !== "ended";
}

export function activeOnly(entries: AtlasEntry[]): AtlasEntry[] {
  return entries.filter(isActive);
}

export function isNoCard(entry: AtlasEntry): boolean {
  return isActive(entry) && entry.freeTierDetails.requiresCard === false;
}

export function isCard(entry: AtlasEntry): boolean {
  return isActive(entry) && entry.freeTierDetails.requiresCard === true;
}

export function isCardUnknown(entry: AtlasEntry): boolean {
  return isActive(entry) && entry.freeTierDetails.requiresCard === "unknown";
}

export function isHardCap(entry: AtlasEntry): boolean {
  return isActive(entry) && entry.freeTierDetails.hasHardCap === true;
}

export function isCapUnknown(entry: AtlasEntry): boolean {
  return isActive(entry) && entry.freeTierDetails.hasHardCap === "unknown";
}

/** Active entries whose overage risk is above none, so usage past the free allowance can be billed. */
export function canBill(entries: AtlasEntry[]): AtlasEntry[] {
  return entries.filter((entry) => isActive(entry) && entry.freeTierDetails.overageRisk !== "none");
}

export function riskIs(entries: AtlasEntry[], ...levels: Array<AtlasEntry["freeTierDetails"]["overageRisk"]>): AtlasEntry[] {
  return entries.filter((entry) => isActive(entry) && levels.includes(entry.freeTierDetails.overageRisk));
}

/** Every line of facts an entry records, one per list item, so a pattern can be tested against one statement at a time. */
export function factLines(entry: AtlasEntry): string[] {
  const details = entry.freeTierDetails;
  return [details.summary, ...details.limits, ...details.caveats, ...details.billingRiskNotes].filter((line) => line.trim().length > 0);
}

/** One active entry plus the statement and match that put it in a list. */
export type LineFact = { entry: AtlasEntry; line: string; match: RegExpMatchArray };

/**
 * The first statement of each active entry that matches `pattern` and passes `accept`. Matching is per
 * statement, never across the whole entry, so a word in one limit cannot borrow meaning from another.
 */
export function lineFacts(
  entries: AtlasEntry[],
  pattern: RegExp,
  accept?: (line: string, match: RegExpMatchArray, entry: AtlasEntry) => boolean,
  options: { shortest?: boolean } = {},
): LineFact[] {
  const out: LineFact[] = [];
  for (const entry of entries) {
    if (!isActive(entry)) continue;
    let best: LineFact | undefined;
    for (const line of factLines(entry)) {
      const match = line.match(pattern);
      if (!match || (accept && !accept(line, match, entry))) continue;
      if (!best || line.length < best.line.length) best = { entry, line, match };
      if (!options.shortest) break;
    }
    if (best) out.push(best);
  }
  return out;
}

const UNIT_SECONDS = { second: 1, minute: 60, hour: 3600, day: 86400, week: 604800, month: 2592000 } as const;
type TimeUnit = keyof typeof UNIT_SECONDS;
const NUMBER_WORDS: Record<string, number> = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7 };

export type Span = { label: string; seconds: number };

function spanFrom(amount: string, unit: string): Span {
  const parts = amount.toLowerCase().split(/\s+to\s+/);
  const numbers = parts.map((part) => NUMBER_WORDS[part] ?? Number(part));
  const key = unit.toLowerCase() as TimeUnit;
  const plural = numbers[numbers.length - 1] === 1 ? "" : "s";
  return { label: `${numbers.join(" to ")} ${key}${plural}`, seconds: numbers[0] * UNIT_SECONDS[key] };
}

/** "after 15 minutes", "for 4 days", "after an hour": the first span a statement gives, with a label such as "15 minutes". */
export function waitBefore(line: string): Span | undefined {
  const match = line.match(/\b(?:after|for)\s+(?:about\s+|around\s+|roughly\s+|at least\s+|more than\s+)?(an?|one|two|three|four|five|six|seven|\d+(?:\s+to\s+\d+)?)\s+(?:consecutive\s+)?(second|minute|hour|day|week|month)s?\b/i);
  return match ? spanFrom(match[1], match[2]) : undefined;
}

/** "5-minute checks", "150 second timeout", "1 minute": a span written as a quantity of time. */
export function spanIn(line: string): Span | undefined {
  const match = line.match(/\b(\d+)[- ]?(second|minute|hour)s?\b/i);
  return match ? spanFrom(match[1], match[2]) : undefined;
}

/** "12 months" for a year-long offer, otherwise "N days". `adjective` gives "12-month" or "30-day". */
export function dayLabel(days: number, adjective = false): string {
  if (days >= 360 && days <= 366) return adjective ? "12-month" : "12 months";
  return adjective ? `${days}-day` : `${days} days`;
}

export type OfferKind = "renewing-credit" | "one-time-credit" | "trial" | "time-limited" | "always-free";

function creditRenews(entry: AtlasEntry): boolean {
  const details = entry.freeTierDetails;
  const amount = details.monthlyCreditAmount ?? "";
  if (/\bnot (?:a )?monthly\b|\bnot recurring\b/i.test(amount)) return false;
  if (/\/\s*month|per month|monthly|every month|each month/i.test(amount)) return true;
  if (/one[- ]time|once/i.test(amount)) return false;
  return /^(monthly|weekly|daily|annual|hourly|rolling)/i.test(details.resetPeriod ?? "");
}

/** Tells a credit that renews apart from a one-time credit, a trial, and a time-limited offer, using the structured fields only. */
export function offerKind(entry: AtlasEntry): OfferKind {
  const type = entry.freeTierDetails.freeTierType;
  if (type === "credit") return creditRenews(entry) ? "renewing-credit" : "one-time-credit";
  if (type === "trial") return "trial";
  if (type === "time-limited") return "time-limited";
  return "always-free";
}

function renewalWord(entry: AtlasEntry): string {
  const first = (entry.freeTierDetails.resetPeriod ?? "").match(/^(monthly|weekly|daily|annual|hourly)/i);
  return first ? first[1].toLowerCase() : "on a schedule";
}

/** "12 months" when the summary of a timed offer states its length and no day count was recorded. */
function termInSummary(summary: string): string | undefined {
  const match =
    summary.match(/\b(\d+)[- ](day|week|month)s?\s+(?:free\s+)?trial\b/i) ??
    summary.match(/\bfree for (\d+) (month|day)s?\b/i) ??
    summary.match(/\b(\d+)-(month|day)\b/i) ??
    summary.match(/\bfor (\d+) (month|day)s\b/i);
  return match ? `${match[1]} ${match[2].toLowerCase()}${match[1] === "1" ? "" : "s"}` : undefined;
}

/** The title plus the figure that separates it from a plain allowance, such as "Railway ($1 monthly)" or "Fly.io (7-day trial)". */
export function offerBit(entry: AtlasEntry): string {
  const details = entry.freeTierDetails;
  const kind = offerKind(entry);
  const amountText = (details.monthlyCreditAmount ?? "").replace(/\s*\(([^)]*)\)/g, ", $1");
  if (kind === "renewing-credit") {
    const amount = amountText;
    if (!amount) return `${entry.title} (renews ${renewalWord(entry)})`;
    return /month|daily|weekly|annual/i.test(amount) ? `${entry.title} (${amount})` : `${entry.title} (${amount} ${renewalWord(entry)})`;
  }
  if (kind === "one-time-credit") {
    if (amountText) return `${entry.title} (${amountText})`;
    return details.trialDays ? `${entry.title} (${dayLabel(details.trialDays, true)} credit)` : entry.title;
  }
  if (kind === "trial") {
    const term = details.trialDays ? dayLabel(details.trialDays) : termInSummary(details.summary);
    return term ? `${entry.title} (${term})` : entry.title;
  }
  if (kind === "time-limited") {
    const term = details.trialDays ? dayLabel(details.trialDays) : termInSummary(details.summary);
    return term ? `${entry.title} (${term})` : entry.title;
  }
  return entry.title;
}

function offerGroup(label: string, group: AtlasEntry[]): string {
  if (group.length === 0) return "";
  const bits = bySafety(group).map(offerBit);
  return `${label}: ${listOf(bits, 4, 6)}.`;
}

/**
 * Says which entries are not an ongoing free allowance and what each one is. Renewing credits, one-time
 * credits, trials, and timed offers are named apart because they end in different ways. "" when every
 * entry is marked always free.
 */
export function describeOffers(entries: AtlasEntry[], noun = "entries"): string {
  const active = activeOnly(entries);
  const by = (kind: OfferKind) => active.filter((entry) => offerKind(entry) === kind);
  const renewing = by("renewing-credit");
  const oneTime = by("one-time-credit");
  const trials = by("trial");
  const timed = by("time-limited");
  const total = renewing.length + oneTime.length + trials.length + timed.length;
  if (total === 0) return "";
  const lead = `${total} of ${active.length} ${noun} ${total === 1 ? "is" : "are"} not marked always free.`;
  const parts = [
    offerGroup("Credits that renew", renewing),
    offerGroup("One-time credits that do not renew", oneTime),
    offerGroup("Trials", trials),
    offerGroup("Offers that end after a set time", timed),
  ].filter(Boolean);
  return `${lead} ${parts.join(" ")}`;
}

export function changedSummary(entries: AtlasEntry[]): string {
  const rows = entries
    .filter((entry) => entry.status === "changed")
    .sort((a, b) => (b.changes[0]?.date ?? "").localeCompare(a.changes[0]?.date ?? "") || a.title.localeCompare(b.title));
  if (rows.length === 0) return "No entry in this category is marked changed.";
  const verb = rows.length === 1 ? "entry is" : "entries are";
  if (rows.length <= 6) return `${rows.length} ${verb} marked changed: ${joinNames(rows.map((entry) => entry.title))}.`;
  const head = rows.slice(0, 4).map((entry) => entry.title).join(", ");
  return `${rows.length} ${verb} marked changed: ${head}, and ${rows.length - 4} more.`;
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
  return entries.filter((entry) => isActive(entry) && entry.productionReadiness === level);
}
