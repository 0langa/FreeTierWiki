import {
  activeOnly,
  changedSummary,
  counted,
  countReady,
  describeOffers,
  endedSummary,
  formatNumber,
  isCapUnknown,
  isCard,
  isCardUnknown,
  isHardCap,
  isNoCard,
  joinNames,
  lineFacts,
  listOf,
  listed,
  riskIs,
  spanIn,
  waitBefore,
  type LineFact,
} from "@/lib/catalog-facts";
import type { AtlasEntry, Domain } from "@/types/content";

export type Faq = { question: string; answer: string };

/*
 * Every answer below is computed from the catalog at build time. Two rules keep them true:
 *  1. Structured fields (card, hard cap, overage risk, free-tier type, reset period, readiness) answer
 *     the yes/no questions. Free text is only read where no field exists.
 *  2. Text is matched one statement at a time, with word boundaries, and with the context that
 *     separates the fact from a look-alike ("pauses after a week idle" is not "pauses when the quota
 *     runs out"; "free training hours" is not "the vendor uses what you send").
 * The selectors that read text are exported so tests can pin the look-alikes they must reject.
 */

// ---------------------------------------------------------------------------------------------
// Shared structured answers
// ---------------------------------------------------------------------------------------------

function singular(noun: string): string {
  return noun.replace(/s$/, "");
}

/** "13 compute plans carry" or "1 compute plan carries": the count, the noun in its right number, and the matching verb. */
function subject(count: number, noun: string, one: string, many: string): string {
  return `${count} ${count === 1 ? singular(noun) : noun} ${count === 1 ? one : many}`;
}

function plural(count: number, one: string, many: string): string {
  return count === 1 ? one : many;
}

/** The one question shape shared across categories: can I start without a card? `noun` is plural, such as "hosting plans". */
function cardAnswer(noun: string, entries: AtlasEntry[]): string {
  const noCard = entries.filter(isNoCard);
  const required = entries.filter(isCard);
  const unknown = entries.filter(isCardUnknown);
  const requiredBit =
    required.length === 0
      ? "None of the active entries confirm that a card is required."
      : `${counted(required.length, "requires", "require")} a card${listed(required, 3)}.`;
  const unknownBit =
    unknown.length === 0
      ? ""
      : ` ${counted(unknown.length, "does not confirm the card rule, so it stays", "do not confirm the card rule, so they stay")} off the no-card page.`;
  return `${subject(noCard.length, noun, "confirms", "confirm")} you can start with no card${listed(noCard, 4)}. ${requiredBit}${unknownBit}`;
}

/** Hard-capped plans, and how many of them can still bill: a cap limits the free allowance, it does not promise a zero bill. */
function hardCapAnswer(noun: string, entries: AtlasEntry[]): string {
  const live = activeOnly(entries);
  const caps = live.filter(isHardCap);
  const unconfirmed = live.filter(isCapUnknown);
  if (caps.length === 0) return "No active entry confirms a hard cap.";
  const risky = caps.filter((entry) => entry.freeTierDetails.overageRisk !== "none");
  const lead = `${caps.length} of ${live.length} ${noun} ${plural(caps.length, "records", "record")} a hard cap, so the free allowance stops at the limit${listed(caps, 4)}.`;
  const riskBit =
    risky.length === 0
      ? "None of them carry billing risk."
      : `${risky.length} of them still ${plural(risky.length, "carries", "carry")} some billing risk${listed(risky, 3)}, so read the billing line on ${plural(risky.length, "that one", "those")} before you count on the cap.`;
  const unknownBit =
    unconfirmed.length === 0
      ? ""
      : ` ${counted(unconfirmed.length, "plan does not confirm a hard cap and stays", "plans do not confirm a hard cap and stay")} off the hard-cap page.`;
  return `${lead} ${riskBit}${unknownBit}`;
}

/** Which plans can bill past the free allowance, with the medium and high risk ones named. */
function billingAnswer(noun: string, entries: AtlasEntry[]): string {
  const live = activeOnly(entries);
  const higher = riskIs(live, "high", "medium");
  const low = riskIs(live, "low");
  const none = riskIs(live, "none");
  const tail = `${low.length} ${plural(low.length, "more carries", "more carry")} low risk, and ${none.length} ${plural(none.length, "is", "are")} marked no overage.`;
  if (higher.length === 0) return `None of the ${live.length} ${noun} carry medium or high billing risk. ${low.length} ${plural(low.length, "carries", "carry")} low risk, and ${none.length} ${plural(none.length, "is", "are")} marked no overage.`;
  return `${subject(higher.length, noun, "carries", "carry")} medium or high billing risk${listed(higher, 4)}. ${tail}`;
}

/** Production readiness as the facts box records it. */
function readinessAnswer(noun: string, entries: AtlasEntry[]): string {
  const live = activeOnly(entries);
  const ready = countReady(entries, "production-ready");
  const light = countReady(entries, "production-light");
  const side = countReady(entries, "side-project");
  const proto = countReady(entries, "prototype");
  const phrase = (rows: AtlasEntry[], label: string) => `${rows.length} ${plural(rows.length, "is", "are")} ${label}`;
  let lead: string;
  if (ready.length > 0) lead = `${subject(ready.length, noun, "is", "are")} marked production-ready${listed(ready, 4)}.`;
  else if (light.length > 0) lead = `None of the ${live.length} ${noun} is marked production-ready.`;
  else lead = `None of the ${live.length} ${noun} is marked production-ready or production-light.`;
  const lightBit = light.length === 0 ? "" : `${phrase(light, "production-light")}${ready.length === 0 && light.length <= 4 ? ` (${listOf(light.map((entry) => entry.title), 4, 4)})` : ""}`;
  const rest = [lightBit, side.length === 0 ? "" : phrase(side, plural(side.length, "a side-project fit", "side-project fits")), proto.length === 0 ? "" : phrase(proto, "prototype-only")].filter(Boolean);
  if (rest.length === 0) return lead;
  const joined = rest.length === 1 ? rest[0] : `${rest.slice(0, -1).join(", ")}, and ${rest[rest.length - 1]}`;
  return `${lead} Of the rest, ${joined}.`;
}

/** Trials, credits and timed offers, with renewing credits named apart from one-time credits and trials. */
function offersAnswer(label: string, entries: AtlasEntry[]): string {
  return describeOffers(entries, `${label} entries`) || `Every active ${label} entry is marked always free.`;
}

/** Entries whose reset period is the given one, such as "daily", and how many reset monthly instead. */
function resetAnswer(noun: string, entries: AtlasEntry[], period: string): string {
  const live = activeOnly(entries);
  const matching = live.filter((entry) => (entry.freeTierDetails.resetPeriod ?? "").toLowerCase() === period);
  const monthly = live.filter((entry) => /^monthly$/i.test(entry.freeTierDetails.resetPeriod ?? ""));
  if (matching.length === 0) return `No active entry resets its limits ${period}.`;
  return `${subject(matching.length, noun, `resets its limits ${period}`, `reset their limits ${period}`)}${listed(matching, 4)}. ${monthly.length} ${plural(monthly.length, "resets", "reset")} monthly instead.`;
}

// ---------------------------------------------------------------------------------------------
// Text selectors (exported so tests can pin what each one must reject)
// ---------------------------------------------------------------------------------------------

type Quantity = { entry: AtlasEntry; value: number; unit: string; line: string };

function amountOf(digits: string, suffix?: string): number {
  const base = Number(digits.replace(/,/g, ""));
  const key = (suffix ?? "").toLowerCase();
  if (key === "k" || key === "thousand") return base * 1_000;
  if (key === "m" || key === "million") return base * 1_000_000;
  return base;
}

/**
 * Facts written as "<number> <unit>". Each pattern lists three groups in order: the number, an optional
 * K/M suffix, and the unit. An entry takes the first pattern that matches one of its statements.
 */
function quantities(entries: AtlasEntry[], patterns: RegExp | RegExp[], accept?: (line: string, match: RegExpMatchArray, entry: AtlasEntry) => boolean): Quantity[] {
  const rows = new Map<AtlasEntry, Quantity>();
  for (const pattern of Array.isArray(patterns) ? patterns : [patterns]) {
    for (const { entry, match, line } of lineFacts(entries, pattern, accept)) {
      if (entry.freeTierDetails.freeTierType === "trial") continue;
      if (!rows.has(entry)) rows.set(entry, { entry, value: amountOf(match[1] ?? "0", match[2]), unit: (match[3] ?? "").trim(), line });
    }
  }
  return [...rows.values()];
}

function byValueDesc(rows: Quantity[]): Quantity[] {
  return [...rows].sort((a, b) => b.value - a.value || a.entry.title.localeCompare(b.entry.title));
}

/** Hosts that put an idle app to sleep or shut it down. A pause caused by an empty quota is not idle sleep. */
export function idleHosts(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:sleeps?|spins? down|scales? to zero|shuts? down|shut down)\b[^.;]*?\b(?:after|when|without)\b|\bidle\s+(?:apps?|services?|instances?)\b/i);
}

const BANDWIDTH_WORD = /\b(?:bandwidth|egress|data transfer|outbound data)\b/i;
const BILLED_WORD = /\b(?:billed|charged|overages?)\b|\bper G[iI]?B\b|\/\s*G[iI]?B\b/i;
const NO_OVERAGE = /\b(?:no overages?|overage is not allowed|no bandwidth billing)\b/i;

/** Entries that say bandwidth, egress or transfer past the free amount is billed, and are not marked no overage. */
export function bandwidthBilling(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, BANDWIDTH_WORD, (line, _match, entry) => BILLED_WORD.test(line) && !NO_OVERAGE.test(line) && entry.freeTierDetails.overageRisk !== "none");
}

/** "$0.15/GB" when an entry writes its overage rate. */
function ratePerGb(entry: AtlasEntry): string | undefined {
  const details = entry.freeTierDetails;
  const match = [details.summary, ...details.limits, ...details.caveats, ...details.billingRiskNotes].join("\n").match(/\$\d+(?:\.\d+)?\s*(?:per|\/)\s*G[iI]?B/);
  return match ? match[0].replace(/\s*per\s*/, "/") : undefined;
}

/** Statements that cap how long one function, render, or request may run. */
export function runTimeLimits(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:timeouts?|wall-clock|maximum duration)\b/i, (line) => spanIn(line) !== undefined);
}

const IDLE_WORD = /\b(?:inactivity|inactive|idle|unused|not used|zero connections|no connections|without traffic)\b/i;
const IDLE_ACTION = /\b(?:pauses?|paused|suspends?|suspended|turns? off|stops?|scales? to zero|archived?|deleted?)\b/i;

/** Databases that pause, suspend, archive or delete a project because nobody used it. A quota that pauses at its limit is not idle. */
export function idleDatabases(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, IDLE_WORD, (line) => IDLE_ACTION.test(line));
}

/** Of the idle databases, the ones that go on to delete the data. */
export function idleDeleters(idle: LineFact[]): LineFact[] {
  return idle.filter(({ entry }) => {
    const details = entry.freeTierDetails;
    return [details.summary, ...details.limits, ...details.caveats].some((line) => /\bdelet\w*\b/i.test(line) && /\b(?:paused|pause|suspend\w*|inactiv\w*|unused|idle)\b/i.test(line));
  });
}

/** Entries that record the vendor using what you send to improve its product. Free training hours for your own model do not count. */
export function usesYourContent(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:used|may be used)\s+(?:to improve|for (?:service|product) improvement)\b/i, undefined, { shortest: true });
}

/** A published per-minute request limit, such as "30 requests/minute". */
export function perMinuteLimits(entries: AtlasEntry[]): Quantity[] {
  return quantities(entries, /\b(\d[\d,]*)()\s*(?:requests?|transactions?|calls?|queries)\s*(?:\/|per\s+|a\s+)\s*min(?:ute)?s?\b/i);
}

/** A monthly-active-user cap, with "unlimited" as Infinity. */
export function activeUserCaps(entries: AtlasEntry[]): Quantity[] {
  const capped = quantities(entries, /\b(\d[\d,.]*)\s*(K|M|million)?\s*(?:MAUs?|monthly active users)\b/i);
  const unlimited = lineFacts(entries, /\bunlimited\s+(?:MAUs?|monthly active users)\b/i).map(({ entry, line }) => ({ entry, value: Infinity, unit: "", line }));
  return [...capped.filter((row) => !unlimited.some((u) => u.entry === row.entry)), ...unlimited];
}

/** Free plans that include a number of SSO or enterprise connections. */
export function ssoIncluded(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:\d+|unlimited)\s+(?:SSO|enterprise)(?:\s+(?:or\s+\w+\s+)?connections?)?/i);
}

/** Free plans that keep SSO or SAML behind a paid plan or bill it per connection. */
export function ssoWithheld(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(
    entries,
    /\b(?:SSO|SAML)\b/i,
    (line) => /\b(?:no|not|without)\b[^.;]*\b(?:SSO|SAML|enterprise)\b/i.test(line) || /\b(?:SSO|SAML)\b[^.;]*\b(?:requires?|paid|billed)\b/i.test(line),
  );
}

/** "300 emails per day", "20,000 messages per day". Zero is a statement about a missing allowance, not a cap. */
export function dailySends(entries: AtlasEntry[], noun: RegExp): Quantity[] {
  const pattern = new RegExp(`\\b(\\d[\\d,.]*)\\s*(K)?\\s*(?:${noun.source})\\s*(?:per day|a day|\\/day|daily)\\b`, "i");
  return quantities(entries, pattern, (_line, match) => amountOf(match[1], match[2]) > 0);
}

type Retention = { entry: AtlasEntry; label: string; seconds: number; line: string };

const RETENTION_UNIT = "(hour|day|week|month)";
const UNIT_SECONDS = { hour: 3600, day: 86400, week: 604800, month: 2592000 } as const;

/** How long an entry keeps your data: "7-day retention", "30 days of history", "retained 3 days". Data kept after an account lapses does not count. */
export function dataRetention(entries: AtlasEntry[]): Retention[] {
  const patterns = [
    new RegExp(`\\b(\\d+)[- ]${RETENTION_UNIT}s?\\s+(?:of\\s+)?(?:(?:data|log|event|metric|trace|hi-res|logging|message|version|check|page)\\s+){0,2}(?:retention|history)\\b`, "i"),
    new RegExp(`\\bretention\\b[^.;]{0,25}?\\b(?:of|is|for)\\s+(?:at least\\s+)?(\\d+)[- ]${RETENTION_UNIT}`, "i"),
    new RegExp(`\\bretained\\s+(?:for\\s+)?(\\d+)\\s+${RETENTION_UNIT}s?\\b`, "i"),
    new RegExp(`\\bhistory\\s+is\\s+kept\\s+for\\s+(\\d+)\\s+${RETENTION_UNIT}s?\\b`, "i"),
  ];
  const rows: Retention[] = [];
  for (const entry of activeOnly(entries)) {
    const details = entry.freeTierDetails;
    if (details.freeTierType === "trial") continue;
    for (const line of [details.summary, ...details.limits, ...details.caveats]) {
      if (/\b(?:upgrade|suspended|after the trial)\b/i.test(line)) continue;
      const match = patterns.map((pattern) => line.match(pattern)).find(Boolean);
      if (!match) continue;
      const unit = match[2].toLowerCase() as keyof typeof UNIT_SECONDS;
      const count = Number(match[1]);
      rows.push({ entry, label: `${count} ${unit}${count === 1 ? "" : "s"}`, seconds: count * UNIT_SECONDS[unit], line });
      break;
    }
  }
  return rows.sort((a, b) => b.seconds - a.seconds || a.entry.title.localeCompare(b.entry.title));
}

/** A stated check interval for uptime and page monitors, in minutes. */
export function checkIntervals(entries: AtlasEntry[]): Array<{ entry: AtlasEntry; minutes: number; line: string }> {
  const rows: Array<{ entry: AtlasEntry; minutes: number; line: string }> = [];
  const patterns = [
    /\b(\d+)[- ]min(?:ute)?s?\s+(?:checks?|check interval|intervals?)\b/i,
    /\b(?:checks?|checked|monitors? checked)\s+(?:every|each)\s+(\d+)\s+min(?:ute)?s?\b/i,
    /\bevery\s+(\d+)\s+min(?:ute)?s?\b/i,
    /\b(\d+)\s+min(?:ute)?s?\s+check interval\b/i,
  ];
  for (const entry of activeOnly(entries)) {
    const details = entry.freeTierDetails;
    for (const line of [details.summary, ...details.limits, ...details.caveats]) {
      const match = patterns.map((pattern) => line.match(pattern)).find(Boolean);
      if (!match) continue;
      rows.push({ entry, minutes: Number(match[1]), line });
      break;
    }
  }
  return rows.sort((a, b) => a.minutes - b.minutes || a.entry.title.localeCompare(b.entry.title));
}

const PAID_PLAN = /\b(?:paid|Starter|Premium|Pro\b|then charge|per minute|plans? start|starts? at|from \$)/i;
const CONDITIONAL = /\b(?:eligible|apply|applies|conditional|FOSS|unclear)\b/i;

/** Build or runner minutes included each month. A bare "30 minutes" idle timeout and a paid plan's minutes do not count. */
export function includedMinutes(entries: AtlasEntry[]): Quantity[] {
  return quantities(
    entries,
    [
      /\b(\d[\d,]*)()\s*((?:[\w-]+\s+){0,3}?)min(?:ute)?s?\s*(?:per month|\/month|a month|monthly|each month)\b/i,
      /\babout\s+(\d[\d,]*)()\s*((?:build\s+)?)minutes\b/i,
    ],
    (line) => !PAID_PLAN.test(line),
  );
}

/** DNS plans that state how many zones or domains they host. */
export function dnsZones(entries: AtlasEntry[]): Quantity[] {
  return quantities(entries, [/\b(\d+)()\s*(?:DNS\s+)?(zones?)\b/i, /\b(?:hosts?|covers?)\s+(\d+)()\s+(domains)\b/i]);
}

/** Seats a free plan allows: "up to 10 users", "3 seats". Offers for eligible projects only and paid-plan counts are left out. */
export function seatCaps(entries: AtlasEntry[]): Quantity[] {
  return quantities(
    entries,
    [
      /\b(?:up to|for|limited to|limit of|maximum of|max)\s+(\d[\d,]*)()\s*(users?|seats|members|editors|collaborators|team members)\b(?! at once)/i,
      /\b(\d[\d,]*)()\s*(users|seats|team members|editors)\b/i,
    ],
    (line) => !CONDITIONAL.test(line) && !PAID_PLAN.test(line) && !/\$|\bper (?:seat|user)\b|\bplans run\b/i.test(line),
  );
}

/** Form submissions or responses included each month. */
export function monthlySubmissions(entries: AtlasEntry[]): Quantity[] {
  return quantities(
    entries,
    [
      /\b(\d[\d,.]*)\s*(K|M)?\s*(?:form\s+)?(submissions?|responses?|entries|leads)\s*(?:per month|a month|\/month|monthly|each month)\b/i,
      /\b(\d[\d,.]*)\s*(K|M)?\s*monthly\s+(submissions?|responses?)\b/i,
    ],
    (line) => !CONDITIONAL.test(line) && !PAID_PLAN.test(line),
  );
}

/** Statements that the free plan carries the vendor's own branding or badge. */
export function vendorBranding(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:branding|badge|powered by)\b/i, (line) => !/\bno\b[^.;]*\bbranding\b|\bwithout\b[^.;]*\bbranding\b|\bwhite[- ]label\b/i.test(line));
}

/** What a localization plan hosts, such as "60,000 hosted words" or "200 source keys". A plan only some eligible projects get is left out. */
export function hostedVolume(entries: AtlasEntry[]): Quantity[] {
  return quantities(entries, /\b(\d[\d,]*)()\s*((?:hosted\s+|source\s+|translation\s+|string\s+)*(?:words|keys|strings|characters|translations))\b/i, (line) => !CONDITIONAL.test(line));
}

/** Statements that cap a plan at one project, one user, or one seat. */
export function singleProjectOrUser(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(entries, /\b(?:1|one|a single|single)\s+(project|user(?: license)?|seat|team member)\b/i, (line) => !CONDITIONAL.test(line));
}

/** Pages, documents, images or calls generated each month. */
export function monthlyOutput(entries: AtlasEntry[]): Quantity[] {
  return quantities(
    entries,
    /\b(\d[\d,.]*)\s*(K|M)?\s+((?:[A-Za-z-]+\s+){0,3}?(?:PDFs?|documents?|pages|images|conversions?|generations?|envelopes|API calls|API credits|credits|requests|renders|screenshots|calls))\s*(?:per month|a month|\/month|monthly|each month)\b/i,
    (line) => !PAID_PLAN.test(line),
  );
}

/** A key that is limited to personal or non-commercial use. A statement the entry itself calls unclear is left out. */
export function nonCommercialOnly(entries: AtlasEntry[]): LineFact[] {
  return lineFacts(
    entries,
    /\bnon-?commercial\b|\bpersonal use\b|\bnot for commercial\b|\bno commercial use\b|\bcommercial use (?:is )?(?:not allowed|prohibited|requires)/i,
    (line) => !CONDITIONAL.test(line) && !/\b(?:commercial (?:use )?(?:is )?(?:allowed|permitted|included|ok)|commercial and non-?commercial|for personal and commercial|personal or commercial)\b/i.test(line),
  );
}

/** Parallel or concurrent request limits. */
export function concurrencyLimits(entries: AtlasEntry[]): Quantity[] {
  return quantities(entries, /\b(\d[\d,]*)()\s*((?:concurrent|parallel|simultaneous)(?:\s+\w+)?)\b/i);
}

/** Tasks, runs or operations included each month. */
export function monthlyTasks(entries: AtlasEntry[]): Quantity[] {
  return quantities(
    entries,
    /\b(\d[\d,.]*)\s*(K|M)?\s+((?:[A-Za-z-]+\s+){0,2}?(?:tasks?|executions?|operations?|runs?|jobs?|zaps?|events?|requests?|calls?|credits))\s*(?:per month|a month|\/month|monthly|each month)\b/i,
    (line) => !PAID_PLAN.test(line),
  );
}

/** Pageviews, events or sessions included each month. A daily export cap, a daily limit, and a paid plan's volume do not count. */
export function monthlyTraffic(entries: AtlasEntry[]): Quantity[] {
  const unit = "(?:page ?views?|events?|session replay(?:s| recordings)?|sessions?|hits|visits|visitors|recordings)";
  return quantities(
    entries,
    [
      new RegExp(`\\b(\\d[\\d,.]*)\\s*(K|M|million)?\\s+((?:monthly\\s+)?${unit})\\s*(?:per month|a month|\\/month|each month)\\b`, "i"),
      new RegExp(`\\b(\\d[\\d,.]*)\\s*(K|M|million)?\\s+(monthly\\s+${unit})\\b`, "i"),
    ],
    (line) => !PAID_PLAN.test(line) && !/\bthen\b/i.test(line),
  );
}

// ---------------------------------------------------------------------------------------------
// Answer shapes built from the selectors
// ---------------------------------------------------------------------------------------------

/** "WorkOS (1,000,000), Logto (50,000)": the largest few and, when the list is long, the smallest few. */
function extremes(rows: Quantity[], fmt: (row: Quantity) => string, largest = 4, smallest = 3): string {
  const sorted = byValueDesc(rows.filter((row) => Number.isFinite(row.value)));
  const label = (row: Quantity) => `${row.entry.title} (${fmt(row)})`;
  if (sorted.length <= largest + smallest) return `They are ${listOf(sorted.map(label), 7, 7)}.`;
  const top = sorted.slice(0, largest).map(label);
  const bottom = sorted.slice(-smallest).reverse().map(label);
  return `The largest are ${joinNames(top)}, and the smallest are ${joinNames(bottom)}.`;
}

function withUnit(row: Quantity): string {
  const unit = row.unit || "";
  return `${formatNumber(row.value)} ${row.value === 1 ? singular(unit) : unit}`.trim();
}

/** "Brevo and EmailLabs allow 300 emails a day; Mailjet 200": entries that share a figure are named together. */
function groupedByValue(rows: Quantity[], lead: string, suffix: string): string {
  const groups = new Map<number, string[]>();
  for (const row of byValueDesc(rows)) groups.set(row.value, [...(groups.get(row.value) ?? []), row.entry.title]);
  return [...groups]
    .map(([value, titles], index) => `${listOf(titles, 4, 5)} ${index === 0 ? `${titles.length === 1 ? `${lead}s` : lead} ` : ""}${formatNumber(value)}${index === 0 ? suffix : ""}`)
    .join("; ");
}

/** The longest and shortest retention an entry states. */
function retentionAnswer(rows: Retention[]): string {
  if (rows.length === 0) return "No active entry states a retention period.";
  const label = (row: Retention) => `${row.entry.title} (${row.label})`;
  if (rows.length <= 6) return `${rows.length} ${plural(rows.length, "plan states how long it keeps data", "plans state how long they keep data")}: ${joinNames(rows.map(label))}.`;
  return `${rows.length} plans state how long they keep data. The longest are ${joinNames(rows.slice(0, 3).map(label))}, and the shortest are ${joinNames(rows.slice(-3).reverse().map(label))}.`;
}

function isOneOf(rows: LineFact[], entry: AtlasEntry): boolean {
  return rows.some((row) => row.entry === entry);
}

// ---------------------------------------------------------------------------------------------
// Per-category FAQs
// ---------------------------------------------------------------------------------------------

const FAQS: Record<Domain, (entries: AtlasEntry[]) => Faq[]> = {
  hosting(entries) {
    const idle = idleHosts(entries)
      .map((hit) => ({ entry: hit.entry, span: waitBefore(hit.line) }))
      .sort((a, b) => (a.span?.seconds ?? Infinity) - (b.span?.seconds ?? Infinity) || a.entry.title.localeCompare(b.entry.title));
    const billed = bandwidthBilling(entries);
    return [
      { question: "Which free hosts can I open without a credit card?", answer: cardAnswer("hosting plans", entries) },
      {
        question: "Which free hosts sleep when nobody is visiting?",
        answer:
          idle.length === 0
            ? "No active hosting entry records sleep or an idle shutdown."
            : `${counted(idle.length, "host sleeps or shuts down an idle app", "hosts sleep or shut down an idle app")}: ${listOf(idle.map((row) => (row.span ? `${row.entry.title} (after ${row.span.label})` : row.entry.title)), 6, 8)}. The other hosting entries do not record an idle sleep.`,
      },
      {
        question: "Which free hosts can bill for bandwidth once the free transfer runs out?",
        answer:
          billed.length === 0
            ? "No active hosting entry that can bill says bandwidth is charged past the free amount."
            : `${counted(billed.length, "host says", "hosts say")} bandwidth past the free amount is billed: ${listOf(billed.map((hit) => (ratePerGb(hit.entry) ? `${hit.entry.title} (${ratePerGb(hit.entry)})` : hit.entry.title)), 6, 8)}. Other hosts stop or lock the project instead, so check the bandwidth line on the entry.`,
      },
      { question: "Which free hosts stop at a hard cap instead of billing?", answer: hardCapAnswer("hosting plans", entries) },
      { question: "Which hosting offers are a trial or a credit and not an always-free plan?", answer: offersAnswer("hosting", entries) },
    ];
  },
  compute(entries) {
    const limits = runTimeLimits(entries)
      .map((hit) => ({ entry: hit.entry, span: spanIn(hit.line)! }))
      .sort((a, b) => b.span.seconds - a.span.seconds || a.entry.title.localeCompare(b.entry.title));
    return [
      { question: "Which free compute plans still let me start before I add a card?", answer: cardAnswer("compute plans", entries) },
      { question: "Which free compute offers renew each month, and which are a credit or time-limited?", answer: offersAnswer("compute", entries) },
      {
        question: "How long can a free function or job run before it is cut off?",
        answer:
          limits.length === 0
            ? "No active compute entry states a run-time limit."
            : `${counted(limits.length, "entry states", "entries state")} a run-time limit: ${listOf(limits.map((row) => `${row.entry.title} (${row.span.label})`), 6, 8)}. An entry that does not say is not unlimited, so check its limits.`,
      },
      { question: "Which free compute plans can bill past the free allowance?", answer: billingAnswer("compute plans", entries) },
      { question: "Which free compute plans stop at a hard cap?", answer: hardCapAnswer("compute plans", entries) },
    ];
  },
  database(entries) {
    const idle = idleDatabases(entries)
      .map((hit) => ({ hit, span: waitBefore(hit.line) }))
      .sort((a, b) => (a.span?.seconds ?? Infinity) - (b.span?.seconds ?? Infinity) || a.hit.entry.title.localeCompare(b.hit.entry.title));
    const deleters = idleDeleters(idle.map((row) => row.hit));
    return [
      { question: "Which free databases let me create a project with no credit card?", answer: cardAnswer("database plans", entries) },
      {
        question: "Which free databases pause or delete a project that sits idle?",
        answer:
          idle.length === 0
            ? "No active database entry records pausing or deleting an idle project."
            : `${counted(idle.length, "database stops serving a project nobody uses", "databases stop serving a project nobody uses")}: ${listOf(idle.map((row) => (row.span ? `${row.hit.entry.title} (after ${row.span.label})` : row.hit.entry.title)), 16, 16)}.${deleters.length === 0 ? "" : ` ${listOf(deleters.map((hit) => hit.entry.title), 8, 8)} ${plural(deleters.length, "goes", "go")} on to delete the data if the project stays unused.`}`,
      },
      { question: "Which free databases reset their usage limits every day?", answer: resetAnswer("databases", entries, "daily") },
      { question: "Which free databases stop at a hard cap instead of billing?", answer: hardCapAnswer("database plans", entries) },
      { question: "Which free databases can bill past the free allowance?", answer: billingAnswer("database plans", entries) },
    ];
  },
  storage(entries) {
    const egress = bandwidthBilling(entries);
    return [
      { question: "Which free storage plans can I open before I own a credit card?", answer: cardAnswer("storage plans", entries) },
      {
        question: "Which free storage plans bill for egress or bandwidth after the allowance?",
        answer:
          egress.length === 0
            ? "No active storage entry that can bill says egress is charged past the free amount."
            : `${counted(egress.length, "storage plan says", "storage plans say")} egress or bandwidth past the free amount is billed: ${listOf(egress.map((hit) => (ratePerGb(hit.entry) ? `${hit.entry.title} (${ratePerGb(hit.entry)})` : hit.entry.title)), 6, 8)}. Other plans stop at the limit or ask you to upgrade, so check the egress line on the entry.`,
      },
      { question: "Which free storage offers expire or come as a credit?", answer: offersAnswer("storage", entries) },
      { question: "Which free storage plans stop at a hard cap?", answer: hardCapAnswer("storage plans", entries) },
      { question: "Which free storage plans are marked production-ready?", answer: readinessAnswer("storage plans", entries) },
    ];
  },
  auth(entries) {
    const caps = activeUserCaps(entries);
    const finite = caps.filter((row) => Number.isFinite(row.value));
    const unlimited = caps.filter((row) => !Number.isFinite(row.value));
    const included = ssoIncluded(entries);
    const withheld = ssoWithheld(entries).filter((hit) => !isOneOf(included, hit.entry));
    const phrase = (text: string) => text.toLowerCase().replace(/\bsso\b/g, "SSO").replace(/\bscim\b/g, "SCIM");
    return [
      { question: "Which login providers let me start without a credit card?", answer: cardAnswer("auth plans", entries) },
      {
        question: "How many monthly active users do free login plans include?",
        answer:
          caps.length === 0
            ? "No active auth entry states a monthly-active-user cap."
            : `${caps.length} ${plural(caps.length, "plan states", "plans state")} a monthly-active-user figure. ${extremes(finite, (row) => formatNumber(row.value))}${unlimited.length === 0 ? "" : ` ${listOf(unlimited.map((row) => row.entry.title))} ${plural(unlimited.length, "lists", "list")} unlimited monthly active users.`}`,
      },
      {
        question: "Which free auth plans include SSO, and which keep it for a paid plan?",
        answer:
          included.length === 0 && withheld.length === 0
            ? "No active auth entry says whether SSO is included."
            : `${included.length === 0 ? "No entry states an included SSO or enterprise connection." : `${counted(included.length, "plan includes", "plans include")} SSO or enterprise connections: ${listOf(included.map((hit) => `${hit.entry.title} (${phrase(hit.match[0])})`), 6, 8)}.`}${withheld.length === 0 ? "" : ` ${listOf(withheld.map((hit) => hit.entry.title), 6, 8)} ${plural(withheld.length, "keeps SSO behind a paid plan or bills it", "keep SSO behind a paid plan or bill it")} per connection.`}`,
      },
      { question: "Which free auth plans can bill past the free allowance?", answer: billingAnswer("auth plans", entries) },
      { question: "Which free auth plans are marked production-ready?", answer: readinessAnswer("auth plans", entries) },
    ];
  },
  messaging(entries) {
    const emails = dailySends(entries, /emails?|mails?/);
    const messages = dailySends(entries, /messages?/);
    return [
      { question: "Which free email and chat tools skip the credit card?", answer: cardAnswer("messaging plans", entries) },
      {
        question: "How many emails or messages can I send per day on a free plan?",
        answer:
          emails.length + messages.length === 0
            ? "No active messaging entry states a daily cap."
            : [
                emails.length === 0 ? "" : `${counted(emails.length, "email plan caps", "email plans cap")} sends per day: ${groupedByValue(emails, "allow", " emails a day")}.`,
                messages.length === 0 ? "" : `${counted(messages.length, "realtime or notification plan caps", "realtime and notification plans cap")} messages per day: ${groupedByValue(messages, "allow", " messages a day")}.`,
              ]
                .filter(Boolean)
                .join(" "),
      },
      { question: "Which free messaging plans stop at a hard cap?", answer: hardCapAnswer("messaging plans", entries) },
      { question: "Which free messaging plans can bill past the free allowance?", answer: billingAnswer("messaging plans", entries) },
      { question: "Which free messaging offers are a trial or a credit?", answer: offersAnswer("messaging", entries) },
    ];
  },
  observability(entries) {
    const intervals = checkIntervals(entries);
    const groups = new Map<number, string[]>();
    for (const row of intervals) groups.set(row.minutes, [...(groups.get(row.minutes) ?? []), row.entry.title]);
    const intervalSentence = [...groups]
      .map(([minutes, titles]) => `${listOf(titles, 3, 4)} ${plural(titles.length, "checks", "check")} every ${minutes} ${plural(minutes, "minute", "minutes")}`)
      .join("; ");
    return [
      { question: "Which error trackers and uptime tools start without a credit card?", answer: cardAnswer("observability plans", entries) },
      { question: "How long do free error trackers and log plans keep data?", answer: retentionAnswer(dataRetention(entries)) },
      {
        question: "How often do free uptime monitors check a site?",
        answer: intervals.length === 0 ? "No active observability entry states a check interval." : `${intervals.length} ${plural(intervals.length, "plan states", "plans state")} a check interval: ${intervalSentence}.`,
      },
      { question: "Which free monitoring plans stop ingesting at a hard cap?", answer: hardCapAnswer("observability plans", entries) },
      { question: "Which monitoring tools are only a free trial?", answer: offersAnswer("observability", entries) },
    ];
  },
  ai(entries) {
    const rates = byValueDesc(perMinuteLimits(entries));
    const used = usesYourContent(entries);
    return [
      { question: "Which model APIs can I call before I add a credit card?", answer: cardAnswer("AI plans", entries) },
      { question: "Which free AI offers are a credit or a trial, and which renew?", answer: offersAnswer("AI", entries) },
      {
        question: "Which free AI APIs publish a per-minute request limit?",
        answer:
          rates.length === 0
            ? "No active AI entry states a per-minute request limit."
            : `${counted(rates.length, "entry publishes", "entries publish")} a per-minute request limit: ${listOf(rates.map((row) => `${row.entry.title} (${formatNumber(row.value)})`), 8, 8)}. Other entries set limits per model or per account, so check the entry.`,
      },
      {
        question: "Do free AI plans use what I send to improve their products?",
        answer:
          used.length === 0
            ? "No active AI entry records that the vendor uses what you send. That is not a promise that it does not, so read the provider's data terms before you send private data."
            : `${used.map((hit) => `${hit.entry.title}: ${hit.line.replace(/[.;]\s*$/, "")}.`).join(" ")} The other AI entries do not record how your content is used, which is not a promise that it stays private, so read the provider's data terms before you send private data.`,
      },
      { question: "Which free AI plans stop at a hard cap?", answer: hardCapAnswer("AI plans", entries) },
    ];
  },
  devops(entries) {
    const minutes = includedMinutes(entries);
    return [
      { question: "Which CI and DevOps tools let me sign up with no credit card?", answer: cardAnswer("DevOps plans", entries) },
      {
        question: "How many build or runner minutes do free DevOps plans include each month?",
        answer:
          minutes.length === 0
            ? "No active DevOps entry states included minutes."
            : `${minutes.length} ${plural(minutes.length, "plan states", "plans state")} included minutes per month. ${extremes(minutes, (row) => `${formatNumber(row.value)} minutes`, 4, 3)} Runner types and operating systems can use up minutes at different rates, so check the entry.`,
      },
      { question: "Which free DevOps tools stop at a hard cap?", answer: hardCapAnswer("DevOps plans", entries) },
      { question: "Which free DevOps plans can bill past the free allowance?", answer: billingAnswer("DevOps plans", entries) },
      { question: "Which free DevOps tiers have ended or changed?", answer: `${endedSummary(entries)} ${changedSummary(entries)}` },
    ];
  },
  security(entries) {
    return [
      { question: "Which scanners and secret checks start without a credit card?", answer: cardAnswer("security plans", entries) },
      { question: "Which free security tools stop at a hard cap?", answer: hardCapAnswer("security plans", entries) },
      { question: "Which free security tools can bill past the free allowance?", answer: billingAnswer("security plans", entries) },
      { question: "Which free security tools are marked production-ready?", answer: readinessAnswer("security plans", entries) },
    ];
  },
  networking(entries) {
    const zones = byValueDesc(dnsZones(entries));
    return [
      { question: "Which free DNS, CDN, and tunnel plans skip the credit card?", answer: cardAnswer("networking plans", entries) },
      {
        question: "How many DNS zones or domains do free DNS plans include?",
        answer:
          zones.length === 0
            ? "No active networking entry states a zone or domain limit."
            : `${counted(zones.length, "DNS plan states how many zones or domains it hosts", "DNS plans state how many zones or domains they host")}: ${listOf(zones.map((row) => `${row.entry.title} (${row.value} ${row.value === 1 ? singular(row.unit.toLowerCase()) : row.unit.toLowerCase()})`), 6, 8)}.`,
      },
      { question: "Which free networking plans stop at a hard cap?", answer: hardCapAnswer("networking plans", entries) },
      { question: "Which free networking plans can bill past the free allowance?", answer: billingAnswer("networking plans", entries) },
      { question: "Which free networking plans are marked production-ready?", answer: readinessAnswer("networking plans", entries) },
    ];
  },
  collaboration(entries) {
    const seats = seatCaps(entries);
    return [
      { question: "Which free docs, chat, and board tools can I start without a credit card?", answer: cardAnswer("collaboration plans", entries) },
      {
        question: "How many users can a team have on a free plan?",
        answer:
          seats.length === 0
            ? "No active collaboration entry states a seat limit."
            : `${seats.length} ${plural(seats.length, "plan states", "plans state")} a seat limit. ${extremes(seats, withUnit)}`,
      },
      { question: "How much history do free docs and chat tools keep?", answer: retentionAnswer(dataRetention(entries)) },
      { question: "Which free team tools stop at a hard cap?", answer: hardCapAnswer("collaboration plans", entries) },
      { question: "Which free team tools are marked production-ready?", answer: readinessAnswer("collaboration plans", entries) },
    ];
  },
  forms(entries) {
    const submissions = monthlySubmissions(entries);
    const branded = vendorBranding(entries);
    return [
      { question: "Which form backends can I embed before I add a credit card?", answer: cardAnswer("form plans", entries) },
      {
        question: "How many submissions per month do free form plans include?",
        answer:
          submissions.length === 0
            ? "No active form entry states a monthly submission cap."
            : `${submissions.length} ${plural(submissions.length, "plan states", "plans state")} a monthly cap. ${extremes(submissions, withUnit, 5, 4)} The rest do not state one.`,
      },
      {
        question: "Which free form builders keep their own branding on your forms?",
        answer:
          branded.length === 0
            ? "No active form entry says the free plan carries the vendor's branding."
            : `${counted(branded.length, "form plan says", "form plans say")} the free plan carries the vendor's branding or badge, or that removing it takes a paid plan: ${listOf(branded.map((hit) => hit.entry.title), 6, 8)}.`,
      },
      { question: "Which free form plans stop at a hard cap?", answer: hardCapAnswer("form plans", entries) },
      { question: "Which free form plans are fit for more than a side project?", answer: readinessAnswer("form plans", entries) },
    ];
  },
  localization(entries) {
    const volume = byValueDesc(hostedVolume(entries));
    return [
      { question: "Which translation tools let me start with no credit card?", answer: cardAnswer("localization plans", entries) },
      {
        question: "How many strings or words can I host on a free localization plan?",
        answer:
          volume.length === 0
            ? "No active localization entry states a hosted volume."
            : `${volume.length} ${plural(volume.length, "plan states what it hosts", "plans state what they host")} for free: ${listOf(volume.map((row) => `${row.entry.title} (${withUnit(row)})`), 9, 9)}. Words, keys, strings, and characters are counted differently, so compare the unit before the number.`,
      },
      { question: "Which free localization plans stop at a hard cap?", answer: hardCapAnswer("localization plans", entries) },
      { question: "Is any free localization offer only a trial?", answer: offersAnswer("localization", entries) },
      { question: "Which free localization plans are marked production-ready?", answer: readinessAnswer("localization plans", entries) },
    ];
  },
  documents(entries) {
    const output = byValueDesc(monthlyOutput(entries));
    return [
      { question: "Which PDF and document APIs start without a credit card?", answer: cardAnswer("document plans", entries) },
      {
        question: "How many PDFs or documents can I make per month on a free plan?",
        answer:
          output.length === 0
            ? "No active document entry states a monthly volume."
            : `${output.length} ${plural(output.length, "plan states", "plans state")} a monthly volume. ${extremes(output, withUnit, 5, 3)} The units differ, so compare the unit before the number.`,
      },
      { question: "Which free document tools stop at a hard cap?", answer: hardCapAnswer("document plans", entries) },
      { question: "Which free document tools are fit for more than a prototype?", answer: readinessAnswer("document plans", entries) },
    ];
  },
  apis(entries) {
    const personal = nonCommercialOnly(entries);
    return [
      { question: "Which data and utility APIs give me a key with no credit card?", answer: cardAnswer("API plans", entries) },
      { question: "Which free APIs reset their limits every day instead of every month?", answer: resetAnswer("APIs", entries, "daily") },
      {
        question: "Which free APIs limit the key to personal or non-commercial use?",
        answer:
          personal.length === 0
            ? "No active API entry limits the free key to non-commercial use."
            : `${counted(personal.length, "API limits", "APIs limit")} the free key to personal or non-commercial use: ${listOf(personal.map((hit) => hit.entry.title), 10, 12)}. Read the terms of any other key before you ship it in a product that earns money.`,
      },
      { question: "Which free APIs stop at a hard cap?", answer: hardCapAnswer("API plans", entries) },
      { question: "Which free APIs can bill past the free allowance?", answer: billingAnswer("API plans", entries) },
    ];
  },
  scraping(entries) {
    const volume = byValueDesc(monthlyOutput(entries));
    const concurrency = byValueDesc(concurrencyLimits(entries));
    return [
      { question: "Which scraping APIs let me try a crawl with no credit card?", answer: cardAnswer("scraping plans", entries) },
      {
        question: "How many screenshots, credits, or calls do free scraping plans include each month?",
        answer:
          volume.length === 0
            ? "No active scraping entry states a monthly volume."
            : `${volume.length} ${plural(volume.length, "plan states", "plans state")} a monthly volume: ${listOf(volume.map((row) => `${row.entry.title} (${withUnit(row)})`), 8, 8)}. The units differ, so compare the unit before the number.`,
      },
      {
        question: "Which free scrapers cap concurrent requests?",
        answer:
          concurrency.length === 0
            ? "No active scraping entry states a concurrency limit."
            : `${counted(concurrency.length, "scraper states", "scrapers state")} a concurrency limit: ${listOf(concurrency.map((row) => `${row.entry.title} (${formatNumber(row.value)} at once)`), 6, 8)}.`,
      },
      { question: "Which free scrapers stop at a hard cap?", answer: hardCapAnswer("scraping plans", entries) },
      { question: "Can I schedule a production crawl on a free scraper?", answer: readinessAnswer("scraping plans", entries) },
    ];
  },
  automation(entries) {
    const tasks = monthlyTasks(entries);
    return [
      { question: "Which workflow tools let me connect an account with no credit card?", answer: cardAnswer("automation plans", entries) },
      {
        question: "How many tasks or runs do free automation plans include each month?",
        answer:
          tasks.length === 0
            ? "No active automation entry states a monthly volume."
            : `${tasks.length} ${plural(tasks.length, "plan states", "plans state")} a monthly volume: ${listOf(byValueDesc(tasks).map((row) => `${row.entry.title} (${withUnit(row)})`), 8, 8)}. Each product counts tasks, runs, calls, and credits differently, so compare the unit before the number.`,
      },
      { question: "Which free automation tools stop at a hard cap?", answer: hardCapAnswer("automation plans", entries) },
      { question: "Which free automation tools can bill a runaway workflow?", answer: billingAnswer("automation plans", entries) },
      { question: "Which free automation plans are a credit or a trial rather than a monthly bucket?", answer: offersAnswer("automation", entries) },
    ];
  },
  design(entries) {
    const single = singleProjectOrUser(entries);
    return [
      { question: "Which of these design tools open without a credit card?", answer: cardAnswer("design plans", entries) },
      { question: "Which free design tools stop at a hard cap?", answer: hardCapAnswer("design plans", entries) },
      {
        question: "Which free design tools limit you to one project or one user?",
        answer:
          single.length === 0
            ? "No active design entry limits the free plan to one project or one user."
            : `${counted(single.length, "design tool limits", "design tools limit")} the free plan to one project or one user: ${listOf(single.map((hit) => hit.entry.title), 6, 8)}. The other design entries state different limits, so check the entry.`,
      },
      { question: "Which free design tools are marked production-ready?", answer: readinessAnswer("design plans", entries) },
    ];
  },
  analytics(entries) {
    const traffic = monthlyTraffic(entries);
    const family = (unit: string) => (/page ?view/i.test(unit) ? "pageviews" : /event/i.test(unit) ? "events" : /replay|recording/i.test(unit) ? "session replays" : "sessions");
    const sentence = ["pageviews", "events", "sessions", "session replays"]
      .map((name) => {
        const rows = byValueDesc(traffic.filter((row) => family(row.unit) === name));
        return rows.length === 0 ? "" : `${name[0].toUpperCase()}${name.slice(1)}: ${listOf(rows.map((row) => `${row.entry.title} (${formatNumber(row.value)})`), 4, 5)}.`;
      })
      .filter(Boolean)
      .join(" ");
    return [
      { question: "Which counters and product-analytics tools start with no credit card?", answer: cardAnswer("analytics plans", entries) },
      {
        question: "How many pageviews, events, or sessions do free analytics plans include each month?",
        answer: traffic.length === 0 ? "No active analytics entry states a traffic cap." : `${traffic.length} ${plural(traffic.length, "plan states", "plans state")} a volume. ${sentence}`,
      },
      { question: "How long do free analytics plans keep data?", answer: retentionAnswer(dataRetention(entries)) },
      { question: "Which free analytics offers are a trial and not an always-free plan?", answer: offersAnswer("analytics", entries) },
      { question: "Which free analytics tools stop at a hard cap?", answer: hardCapAnswer("analytics plans", entries) },
    ];
  },
  learning(entries) {
    return genericFaqs("learning", entries);
  },
  other(entries) {
    return genericFaqs("miscellaneous", entries);
  },
};

/** Answers built only from structured fields, so a category with no text-specific questions yet still gets a true FAQ. */
function genericFaqs(label: string, entries: AtlasEntry[]): Faq[] {
  const noun = `${label} plans`;
  if (activeOnly(entries).length === 0) {
    const empty = `No ${label} entry is listed yet, so there is nothing to compare.`;
    return [
      { question: `Which ${noun} can I start without a credit card?`, answer: empty },
      { question: `Which ${noun} stop at a hard cap instead of billing?`, answer: empty },
      { question: `Which ${noun} can bill past the free allowance?`, answer: empty },
      { question: `Which ${noun} are a trial or a credit and not an always-free plan?`, answer: empty },
      { question: `Which ${noun} are marked production-ready?`, answer: empty },
    ];
  }
  return [
    { question: `Which ${noun} can I start without a credit card?`, answer: cardAnswer(noun, entries) },
    { question: `Which ${noun} stop at a hard cap instead of billing?`, answer: hardCapAnswer(noun, entries) },
    { question: `Which ${noun} can bill past the free allowance?`, answer: billingAnswer(noun, entries) },
    { question: `Which ${noun} are a trial or a credit and not an always-free plan?`, answer: offersAnswer(label, entries) },
    { question: `Which ${noun} are marked production-ready?`, answer: readinessAnswer(noun, entries) },
  ];
}

export function categoryFaqs(domain: Domain, entries: AtlasEntry[]): Faq[] {
  const faqs = FAQS[domain](entries);
  if (entries.length > 0 && faqs.length === 0) throw new Error(`No category FAQ for ${domain}`);
  return faqs;
}
