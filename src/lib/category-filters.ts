import { bySafety, canBill, describeOffers, isHardCap, isNoCard, listed, names } from "@/lib/catalog-facts";
import { metaFromProse, type Faq } from "@/lib/category-copy";
import { DOMAIN_LABELS, domainPhrase } from "@/lib/content";
import type { FilterSlug } from "@/lib/filter-pages";
import type { AtlasEntry, Domain } from "@/types/content";

/**
 * No-card and hard-cap pages do not repeat the base category FAQ.
 * The same questions on both URLs would be duplicate FAQ markup for Google.
 * These pages get a short intro and three questions about the filtered subset only:
 * the overlap with the other rule, trials versus always-free, and readiness.
 */

/**
 * One checked sentence per domain and filter, about the plans on that page. Each claim was compared
 * with the entries when it was written: "some" is fewer than half, "many" is a large minority, "most"
 * is more than half, and a hard cap never promises a zero bill.
 */
const NOTES: Record<Domain, Record<FilterSlug, string>> = {
  hosting: {
    "no-card": "Some still sleep when idle or stop at a bandwidth cap.",
    "hard-cap": "When the allowance is gone the plan stops, and some of these also sleep when idle.",
  },
  compute: {
    "no-card": "The limits to check are run time per call and whether the allowance resets daily or monthly.",
    "hard-cap": "The limits to check are run time per call and whether the allowance resets daily or monthly.",
  },
  database: {
    "no-card": "Storage caps still apply, and some pause a project that sits idle.",
    "hard-cap": "Usage stops at the cap, and some of these pause a project that sits idle.",
  },
  storage: {
    "no-card": "Bandwidth and egress limits still apply when you serve files from a public URL, and a couple of these are a credit or a trial.",
    "hard-cap": "Usage stops at the cap, and bandwidth has its own limit.",
  },
  auth: {
    "no-card": "Most of these cap monthly active users.",
    "hard-cap": "The list is short, so check each entry's active-user limit.",
  },
  messaging: {
    "no-card": "Sends are still capped per month or per day, and a few of these are trials.",
    "hard-cap": "Sends stop at the quota, and a couple of these are trials.",
  },
  observability: {
    "no-card": "Data retention is limited, and a few of these are trials.",
    "hard-cap": "Ingest stops at the cap, and data still expires on the entry's retention schedule.",
  },
  ai: {
    "no-card": "Some are a credit that runs out and some are an allowance that resets, so check each entry.",
    "hard-cap": "Usage stops at the cap, and some of these are credits or trials, so check which.",
  },
  devops: {
    "no-card": "Check the build minutes and seat limits on each entry, and a few of these are trials.",
    "hard-cap": "Usage stops at the cap, and ended DevOps offers are not listed here.",
  },
  security: {
    "no-card": "Check the scan, asset, or repository quota on each entry.",
    "hard-cap": "Scans stop at the cap, and plans with a cap that is not confirmed stay on the main security page.",
  },
  networking: {
    "no-card": "Check the bandwidth, zone, or query quota on each entry.",
    "hard-cap": "Usage stops at the cap, and plans with a cap that is not confirmed stay on the main networking page.",
  },
  collaboration: {
    "no-card": "Seats are the usual limit, and a few of these cap history.",
    "hard-cap": "Usage stops at the cap, and a couple of these are trials.",
  },
  forms: {
    "no-card": "Monthly submission caps still apply, and many of these carry the vendor's branding.",
    "hard-cap": "Submissions stop at the cap, and some of these carry the vendor's branding.",
  },
  localization: {
    "no-card": "Hosted strings, translated words, or seats are still capped.",
    "hard-cap": "Usage stops at the cap.",
  },
  documents: {
    "no-card": "Monthly volumes are small, and most of these are rated prototype or side-project.",
    "hard-cap": "New documents stop at the cap, and most of these are rated prototype.",
  },
  apis: {
    "no-card": "Each key still has a daily or monthly request cap.",
    "hard-cap": "Calls past the cap are refused, and some of these reset daily.",
  },
  scraping: {
    "no-card": "Monthly credit or call caps still apply, and none of these is rated production-ready.",
    "hard-cap": "The crawl stops at the cap, and none of these is rated production-ready.",
  },
  automation: {
    "no-card": "Task, run, or credit caps still apply, and each product counts a different unit.",
    "hard-cap": "Tasks stop at the cap, and each product counts a different unit.",
  },
  design: {
    "no-card": "Project, file, or user limits still apply on this short list.",
    "hard-cap": "Usage stops at the cap, and the list is short enough to read every row.",
  },
  analytics: {
    "no-card": "Pageview or event caps still apply, and some of these offers are trials.",
    "hard-cap": "Collection stops at the cap, which leaves a gap in the data.",
  },
  learning: {
    "no-card": "Expiry dates and school-email rules still apply where they exist.",
    "hard-cap": "A lab stops at the cap, and a student pack can still expire on its own date.",
  },
  other: {
    "no-card": "The card rule is all these rows share, so check each quota on its entry.",
    "hard-cap": "The hard cap is all these rows share, so check each quota on its entry.",
  },
};

const QUESTIONS: Record<Domain, Record<FilterSlug, [string, string, string]>> = {
  hosting: {
    "no-card": [
      "Which no-card hosts also stop at a hard cap?",
      "Which no-card hosts are a trial, a credit, or only free for a while?",
      "Which no-card hosts are marked as a prototype rather than production?",
    ],
    "hard-cap": [
      "Which hard-capped hosts can I open without a card?",
      "Which hard-capped hosts are not an always-free plan?",
      "Which hard-capped hosts are only safe as a prototype?",
    ],
  },
  compute: {
    "no-card": [
      "Which no-card compute plans also have a hard cap?",
      "Which no-card compute plans are a credit or time-limited?",
      "Which no-card compute plans are marked prototype-only?",
    ],
    "hard-cap": [
      "Which hard-capped compute plans skip the credit card?",
      "Which hard-capped compute plans expire or spend a credit?",
      "Which hard-capped compute plans are prototypes?",
    ],
  },
  database: {
    "no-card": [
      "Which no-card databases also hard-cap instead of billing?",
      "Which no-card databases are time-limited or a trial?",
      "Which no-card databases are prototype-only?",
    ],
    "hard-cap": [
      "Which hard-capped databases need no card?",
      "Which hard-capped databases are not always free?",
      "Which hard-capped databases should stay a prototype?",
    ],
  },
  storage: {
    "no-card": [
      "Which no-card storage plans also confirm a hard cap?",
      "Which no-card storage plans are time-limited or a credit?",
      "Which no-card storage plans are only a prototype?",
    ],
    "hard-cap": [
      "Which hard-capped storage plans need no card?",
      "Which hard-capped storage plans expire or use a credit?",
      "Which hard-capped storage plans are prototype buckets?",
    ],
  },
  auth: {
    "no-card": [
      "Which no-card auth providers also have a hard cap?",
      "Which no-card auth plans are a trial rather than always free?",
      "Which no-card auth plans are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped auth plans can I start without a card?",
      "Which hard-capped auth plans are not always free?",
      "Which hard-capped auth plans are prototypes?",
    ],
  },
  messaging: {
    "no-card": [
      "Which no-card email and chat tools also hard-cap?",
      "Which no-card messaging tools are a trial or a credit?",
      "Which no-card messaging tools are only a prototype?",
    ],
    "hard-cap": [
      "Which hard-capped messaging tools need no card?",
      "Which hard-capped messaging tools are not always free?",
      "Which hard-capped messaging tools are prototypes?",
    ],
  },
  observability: {
    "no-card": [
      "Which no-card monitors also confirm a hard cap?",
      "Which no-card observability tools are trials?",
      "Which no-card monitors are prototype-only?",
    ],
    "hard-cap": [
      "Which hard-capped monitors need no card?",
      "Which hard-capped observability tools are trials?",
      "Which hard-capped monitors are prototypes?",
    ],
  },
  ai: {
    "no-card": [
      "Which no-card AI plans also have a hard cap?",
      "Which no-card AI plans are a credit or a trial?",
      "Which no-card AI plans are only a prototype?",
    ],
    "hard-cap": [
      "Which hard-capped AI plans need no card?",
      "Which hard-capped AI plans are a credit or a trial?",
      "Which hard-capped AI plans are prototypes?",
    ],
  },
  devops: {
    "no-card": [
      "Which no-card CI tools also have a hard cap?",
      "Which no-card DevOps plans are a trial or a credit?",
      "Which no-card DevOps plans are prototype-only?",
    ],
    "hard-cap": [
      "Which hard-capped DevOps tools need no card?",
      "Which hard-capped DevOps plans are not always free?",
      "Which hard-capped DevOps plans are prototypes?",
    ],
  },
  security: {
    "no-card": [
      "Which no-card security tools also hard-cap?",
      "Which no-card security tools are a trial?",
      "Which no-card security tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped scanners need no card?",
      "Which hard-capped security tools are not always free?",
      "Which hard-capped security tools are prototype scans?",
    ],
  },
  networking: {
    "no-card": [
      "Which no-card DNS or tunnel plans also hard-cap?",
      "Which no-card networking plans are a trial or a credit?",
      "Which no-card networking tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped networking plans need no card?",
      "Which hard-capped networking plans are not always free?",
      "Which hard-capped networking tools are prototypes?",
    ],
  },
  collaboration: {
    "no-card": [
      "Which no-card team tools also have a hard cap?",
      "Which no-card collaboration plans are a trial?",
      "Which no-card collaboration tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped team tools need no card?",
      "Which hard-capped collaboration plans are not always free?",
      "Which hard-capped collaboration tools are prototypes?",
    ],
  },
  forms: {
    "no-card": [
      "Which no-card form tools also stop at a hard cap?",
      "Which no-card form plans are a credit rather than always free?",
      "Which no-card form tools are only a prototype?",
    ],
    "hard-cap": [
      "Which hard-capped form tools need no card?",
      "Which hard-capped form plans are not always free?",
      "Which hard-capped form tools are prototypes?",
    ],
  },
  localization: {
    "no-card": [
      "Which no-card translation tools also have a hard cap?",
      "Which no-card localization plans are a trial?",
      "Which no-card localization tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped localization plans need no card?",
      "Which hard-capped localization plans are not always free?",
      "Which hard-capped localization tools are prototypes?",
    ],
  },
  documents: {
    "no-card": [
      "Which no-card PDF tools also have a hard cap?",
      "Which no-card document plans are not always free?",
      "Which no-card document tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped document tools need no card?",
      "Which hard-capped document plans are a trial or a credit?",
      "Which hard-capped document tools are prototypes?",
    ],
  },
  apis: {
    "no-card": [
      "Which no-card APIs also confirm a hard cap?",
      "Which no-card APIs are a trial, a credit, or time-limited?",
      "Which no-card APIs are prototype-only?",
    ],
    "hard-cap": [
      "Which hard-capped APIs need no card?",
      "Which hard-capped APIs are not an always-free allowance?",
      "Which hard-capped APIs are prototypes?",
    ],
  },
  scraping: {
    "no-card": [
      "Which no-card scrapers also have a hard cap?",
      "Which no-card scrapers are a trial or a credit?",
      "Which no-card scrapers are marked ready for production?",
    ],
    "hard-cap": [
      "Which hard-capped scrapers need no card?",
      "Which hard-capped scrapers are not always free?",
      "Which hard-capped scrapers are more than a prototype?",
    ],
  },
  automation: {
    "no-card": [
      "Which no-card automation tools also hard-cap?",
      "Which no-card automation plans are a credit or a trial?",
      "Which no-card automation tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped automation tools need no card?",
      "Which hard-capped automation plans are not always free?",
      "Which hard-capped automation tools are prototypes?",
    ],
  },
  design: {
    "no-card": [
      "Which no-card design tools also have a hard cap?",
      "Which no-card design tools are a trial?",
      "Which no-card design tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped design tools need no card?",
      "Which hard-capped design tools are not always free?",
      "Which hard-capped design tools are prototypes?",
    ],
  },
  analytics: {
    "no-card": [
      "Which no-card analytics tools also have a hard cap?",
      "Which no-card analytics tools are a trial or time-limited?",
      "Which no-card analytics tools are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped analytics tools need no card?",
      "Which hard-capped analytics tools are a trial or time-limited?",
      "Which hard-capped analytics tools are prototypes?",
    ],
  },
  learning: {
    "no-card": [
      "Which no-card learning packs also have a hard cap?",
      "Which no-card learning packs are time-limited?",
      "Which no-card learning packs are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped learning packs need no card?",
      "Which hard-capped learning packs are not always free?",
      "Which hard-capped learning packs are prototypes?",
    ],
  },
  other: {
    "no-card": [
      "Which no-card oddities also have a hard cap?",
      "Which no-card oddities are not always free?",
      "Which no-card oddities are prototypes?",
    ],
    "hard-cap": [
      "Which hard-capped oddities need no card?",
      "Which hard-capped oddities are not always free?",
      "Which hard-capped oddities are prototypes?",
    ],
  },
};

function overlapAnswer(filter: FilterSlug, onPage: AtlasEntry[]): string {
  if (filter === "no-card") {
    const both = onPage.filter(isHardCap);
    const rest = onPage.length - both.length;
    if (both.length === 0) return `None of these ${onPage.length} no-card plans also confirm a hard cap. They skip the card without a recorded hard stop.`;
    if (rest === 0) return `All ${onPage.length} no-card plans also confirm a hard cap${listed(both, 4)}.`;
    const restSentence = rest === 1 ? "The other one skips the card without a recorded hard stop." : `The other ${rest} skip the card without a recorded hard stop.`;
    return `${both.length} of these ${onPage.length} no-card plans also ${both.length === 1 ? "confirms" : "confirm"} a hard cap${listed(both, 4)}. ${restSentence}`;
  }
  const both = onPage.filter(isNoCard);
  const rest = onPage.length - both.length;
  if (both.length === 0) return `None of these ${onPage.length} hard-capped plans also confirm no card. They ask for a card or do not confirm the card rule.`;
  if (rest === 0) return `All ${onPage.length} hard-capped plans also need no card${listed(both, 4)}.`;
  const restSentence =
    rest === 1
      ? "The other one has a hard cap but still asks for a card, or does not confirm the card rule."
      : `The other ${rest} have a hard cap but still ask for a card, or do not confirm the card rule.`;
  return `${both.length} of these ${onPage.length} hard-capped plans also ${both.length === 1 ? "needs" : "need"} no card${listed(both, 4)}. ${restSentence}`;
}

function planAnswer(onPage: AtlasEntry[]): string {
  const offers = describeOffers(onPage, "plans on this page");
  if (!offers) return `All ${onPage.length} plans on this page are marked always free, so none is recorded as a trial, a credit, or a timed window.`;
  return `${offers} The rest are marked always free.`;
}

/** Readiness counts for the plans on a page. `focus` is the one the question asks about, so the answer leads with it. */
function readyAnswer(onPage: AtlasEntry[], focus: "prototype" | "production"): string {
  const level = (name: AtlasEntry["productionReadiness"]) => onPage.filter((entry) => entry.productionReadiness === name);
  const production = level("production-ready");
  const light = level("production-light");
  const side = level("side-project");
  const proto = level("prototype");
  const verb = (count: number) => (count === 1 ? "is" : "are");
  const named = (rows: AtlasEntry[]) =>
    rows.length === 0 ? "" : rows.length <= 3 ? ` (${names(rows, 3)})` : ` (including ${bySafety(rows).slice(0, 3).map((row) => row.title).join(", ")}, and ${rows.length - 3} more)`;
  const phrase = (rows: AtlasEntry[], label: string, withNames: boolean) => `${rows.length} ${verb(rows.length)} ${label}${withNames ? named(rows) : ""}`;
  const lead =
    focus === "prototype"
      ? proto.length === 0
        ? "None are marked prototype-only."
        : proto.length === 1
          ? `${proto[0].title} is the one marked prototype-only.`
          : `${proto.length} are marked prototype-only${listed(proto, 3)}.`
      : production.length === 0
        ? "None are marked production-ready."
        : `${phrase(production, "marked production-ready", true)}.`;
  const others =
    focus === "prototype"
      ? [production.length ? phrase(production, "production-ready", true) : "", light.length ? phrase(light, "production-light", false) : "", side.length ? phrase(side, "side-project", false) : ""]
      : [light.length ? phrase(light, "production-light", false) : "", side.length ? phrase(side, "side-project", false) : "", proto.length ? phrase(proto, "prototype-only", false) : ""];
  const rest = others.filter(Boolean);
  if (rest.length === 0) return lead;
  const joined = rest.length === 1 ? rest[0] : `${rest.slice(0, -1).join(", ")}, and ${rest[rest.length - 1]}`;
  return `${lead} Of the rest, ${joined}.`;
}

export function filterIntro(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): string {
  const phrase = domain === "forms" ? "form" : domainPhrase(domain);
  const note = NOTES[domain][filter];
  if (filter === "no-card") {
    return `These ${onPage.length} ${phrase} plans confirm you can start without a credit card. ${note}`;
  }
  // A hard cap stops the free allowance; it does not promise the account can never bill, so say how many still can.
  const billable = canBill(onPage).length;
  const billBit =
    billable === 0 ? "" : ` ${billable === 1 ? "One still carries" : `${billable} still carry`} some billing risk, so check the billing line on each entry.`;
  return `These ${onPage.length} ${phrase} plans record a hard cap on the free allowance. ${note}${billBit}`;
}

export function filterDescription(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): string {
  const intro = filterIntro(domain, filter, onPage);
  const fitted = metaFromProse(intro);
  if (fitted.length >= 50 && fitted.length <= 160) return fitted;
  const label = DOMAIN_LABELS[domain];
  return filter === "no-card" ? `Free ${label} tiers that confirm no credit card. Limits and billing risk are on each entry.` : `Free ${label} tiers that confirm a hard cap. Card rules and limits are on each entry.`;
}

/** Pages whose third question asks about production readiness, so the answer leads with it. */
const PRODUCTION_FOCUS = new Set(["scraping/no-card", "scraping/hard-cap"]);

export function filterFaqs(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): Faq[] {
  const [overlap, plans, ready] = QUESTIONS[domain][filter];
  return [
    { question: overlap, answer: overlapAnswer(filter, onPage) },
    { question: plans, answer: planAnswer(onPage) },
    { question: ready, answer: readyAnswer(onPage, PRODUCTION_FOCUS.has(`${domain}/${filter}`) ? "production" : "prototype") },
  ];
}
