import { bySafety, isHardCap, isLimitedOffer, isNoCard, names, planBit } from "@/lib/catalog-facts";
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

const NOTES: Record<Domain, Record<FilterSlug, string>> = {
  hosting: {
    "no-card": "A host that skips the card can still sleep after idle time or cut you off at a bandwidth cap.",
    "hard-cap": "A hard cap stops the bill, and the app may sleep, pause, or return errors once the allowance is gone.",
  },
  compute: {
    "no-card": "No card does not mean the free account lasts: several compute plans expire or burn a credit.",
    "hard-cap": "A hard cap on compute stops the meter, and it does not keep a free VM past an account expiry.",
  },
  database: {
    "no-card": "No card still leaves storage caps and projects that pause when nobody connects.",
    "hard-cap": "A hard cap protects the invoice, and a paused or read-only database is the usual way it shows up.",
  },
  storage: {
    "no-card": "No card does not cap egress: a public object URL can still be the expensive part.",
    "hard-cap": "A hard cap stops new writes or bills, and it does not promise cheap bandwidth.",
  },
  auth: {
    "no-card": "No card still leaves a monthly active user ceiling on most login plans.",
    "hard-cap": "A hard cap on auth usually blocks new signups or stops the API, rather than charging per user.",
  },
  messaging: {
    "no-card": "No card still leaves daily send caps and domain verification in the way.",
    "hard-cap": "A hard cap on mail or chat stops delivery at the quota instead of charging the next message.",
  },
  observability: {
    "no-card": "No card still leaves short retention and a cap on hosts, spans, or events.",
    "hard-cap": "A hard cap stops ingest, and older telemetry still expires on the retention clock.",
  },
  ai: {
    "no-card": "No card does not tell you whether the offer is a credit that runs out or a monthly allowance.",
    "hard-cap": "A hard cap stops the API, which is a different ending from a credit balance hitting zero.",
  },
  devops: {
    "no-card": "No card still leaves build minutes, seats, and private-repo rules as the thing that runs out.",
    "hard-cap": "A hard cap stops the job or the seat, and an ended DevOps offer is not on this list.",
  },
  security: {
    "no-card": "No card still leaves scan, asset, and repo quotas as the limit that matters.",
    "hard-cap": "A hard cap stops the scan, and an unconfirmed cap was left on the main security page.",
  },
  networking: {
    "no-card": "No card still leaves bandwidth, zones, or queries as the quota to read.",
    "hard-cap": "A hard cap stops the zone or the tunnel instead of billing the next gigabyte.",
  },
  collaboration: {
    "no-card": "No card is common here, and the limit that bites is usually seats or history.",
    "hard-cap": "A hard cap on a team tool locks a seat or a history window rather than charging a surprise user.",
  },
  forms: {
    "no-card": "No card still leaves a monthly submission or upload cap, and sometimes a badge on the form.",
    "hard-cap": "A hard cap stops new submissions instead of billing the next response.",
  },
  localization: {
    "no-card": "No card still leaves a cap on hosted strings, translated words, or seats.",
    "hard-cap": "A hard cap stops translation or new strings, which is the point of this shorter list.",
  },
  documents: {
    "no-card": "No card still leaves a monthly render cap, and some free PDFs carry a watermark.",
    "hard-cap": "A hard cap stops new documents, and a watermark can still sit on the ones you already made.",
  },
  apis: {
    "no-card": "No card still leaves a daily or monthly request cap on the key.",
    "hard-cap": "A hard cap rejects the next call instead of charging it.",
  },
  scraping: {
    "no-card": "No card still leaves a request or page cap, and some targets are simply blocked.",
    "hard-cap": "A hard cap stops the crawl, which is what you want if a loop would otherwise bill.",
  },
  automation: {
    "no-card": "No card still leaves a task, webhook, or run-time cap, and the unit differs by product.",
    "hard-cap": "A hard cap stops the next task instead of billing a runaway workflow.",
  },
  design: {
    "no-card": "No card still leaves export, file, or seat limits on a short list of tools.",
    "hard-cap": "A hard cap stops the export or the file, and this list is short enough to read every row.",
  },
  analytics: {
    "no-card": "No card still leaves a pageview or event cap, and some of these offers are trials.",
    "hard-cap": "A hard cap stops collection, which is safer than an analytics bill and worse for a gap in the data.",
  },
  learning: {
    "no-card": "No card still leaves an expiry date or a school-email rule when those entries exist.",
    "hard-cap": "A hard cap stops the lab, and a student pack can still expire on its own clock.",
  },
  other: {
    "no-card": "No card is the only thing these rows share, so read each quota on its own entry.",
    "hard-cap": "A hard cap is the only thing these rows share, so read each quota on its own entry.",
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
      "Which no-card auth plans are marked below production?",
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
      "Which hard-capped monitors are not marked for production?",
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
    const restSentence = rest === 0 ? "Every plan on this page also has a hard cap." : `The other ${rest} skip the card without a recorded hard stop.`;
    const lead = both.length === 0 ? `None of these ${onPage.length} no-card plans also confirm a hard cap.` : `${both.length} of these ${onPage.length} no-card plans also confirm a hard cap, including ${names(both)}.`;
    return `${lead} ${restSentence}`;
  }
  const both = onPage.filter(isNoCard);
  const rest = onPage.length - both.length;
  const restSentence = rest === 0 ? "Every plan on this page also skips the card." : `The other ${rest} have a hard cap but still ask for a card, or do not confirm the card rule.`;
  const lead = both.length === 0 ? `None of these ${onPage.length} hard-capped plans also confirm no card.` : `${both.length} of these ${onPage.length} hard-capped plans also need no card, including ${names(both)}.`;
  return `${lead} ${restSentence}`;
}

function planAnswer(onPage: AtlasEntry[]): string {
  const limited = bySafety(onPage.filter(isLimitedOffer));
  if (limited.length === 0) {
    return `All ${onPage.length} plans on this page are marked always free, so none are recorded as a trial, a credit, or a timed window. Always free still has a quota.`;
  }
  const shown = limited.length <= 6 ? limited : limited.slice(0, 4);
  const bits = shown.map(planBit);
  const rest = limited.length - shown.length;
  const more = rest > 0 ? `, and ${rest} more in the list below` : "";
  return `${limited.length} of ${onPage.length} are not an ongoing free allowance: ${bits.join(", ")}${more}. The rest are marked always free.`;
}

function readyAnswer(onPage: AtlasEntry[]): string {
  const production = onPage.filter((entry) => entry.productionReadiness === "production-ready");
  const light = onPage.filter((entry) => entry.productionReadiness === "production-light");
  const proto = onPage.filter((entry) => entry.productionReadiness === "prototype");
  const side = onPage.length - production.length - light.length - proto.length;
  const productionBit = production.length > 0 ? ` (${names(production, 3)})` : "";
  const protoBit = proto.length > 0 ? `, including ${names(proto, 3)}` : "";
  return `${production.length} are marked production-ready${productionBit}, ${light.length} production-light, ${side} side-project, and ${proto.length} prototype-only${protoBit}.`;
}

export function filterIntro(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): string {
  const phrase = domainPhrase(domain);
  const note = NOTES[domain][filter];
  if (filter === "no-card") {
    return `These ${onPage.length} ${phrase} plans confirm you can start without a credit card. ${note}`;
  }
  return `These ${onPage.length} ${phrase} plans confirm a hard cap, so the recorded limit stops use instead of billing you. ${note}`;
}

export function filterDescription(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): string {
  const intro = filterIntro(domain, filter, onPage);
  const fitted = metaFromProse(intro);
  if (fitted.length >= 50 && fitted.length <= 160) return fitted;
  const label = DOMAIN_LABELS[domain];
  return filter === "no-card" ? `Free ${label} tiers that confirm no credit card. Limits and billing risk are on each entry.` : `Free ${label} tiers that confirm a hard cap. Card rules and limits are on each entry.`;
}

export function filterFaqs(domain: Domain, filter: FilterSlug, onPage: AtlasEntry[]): Faq[] {
  const [overlap, plans, ready] = QUESTIONS[domain][filter];
  return [
    { question: overlap, answer: overlapAnswer(filter, onPage) },
    { question: plans, answer: planAnswer(onPage) },
    { question: ready, answer: readyAnswer(onPage) },
  ];
}
