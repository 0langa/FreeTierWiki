import {
  endedSummary,
  isCard,
  isCardUnknown,
  isHardCap,
  isLimitedOffer,
  isNoCard,
  mentioning,
  nameList,
  planBit,
} from "@/lib/catalog-facts";
import type { AtlasEntry, Domain } from "@/types/content";

export type Faq = { question: string; answer: string };

/** The one question shape shared across categories: can I start without a card? */
function cardAnswer(noun: string, entries: AtlasEntry[]): string {
  const noCard = entries.filter(isNoCard);
  const required = entries.filter(isCard);
  const unknown = entries.filter(isCardUnknown);
  const requiredBit =
    required.length === 0
      ? "None of the active entries confirm that a card is required."
      : `${required.length} require a card, including ${nameList(required, 3)}.`;
  const unknownBit =
    unknown.length === 0 ? "" : ` ${unknown.length} leave the card rule unconfirmed, so they stay off the no-card page.`;
  return `${noCard.length} ${noun} confirm you can start with no card, including ${nameList(noCard, 4)}. ${requiredBit}${unknownBit}`;
}

function mentioned(entries: AtlasEntry[], pattern: RegExp, phrase: string): string {
  const rows = mentioning(entries, pattern);
  if (rows.length === 0) return `No active entry records ${phrase}.`;
  if (rows.length === 1) return `${rows[0].title} is the entry that records ${phrase}.`;
  if (rows.length <= 6) return `${rows.length} record ${phrase}: ${nameList(rows, 6)}.`;
  return `${rows.length} record ${phrase}, including ${nameList(rows, 4)}.`;
}

function trialClause(entries: AtlasEntry[], none: string): string {
  const limited = entries.filter(isLimitedOffer);
  if (limited.length === 0) return none;
  const shown = limited.length <= 8 ? limited : limited.slice(0, 5);
  const rest = limited.length - shown.length;
  const more = rest > 0 ? `, and ${rest} more in the list below` : "";
  return `${limited.length} ${limited.length === 1 ? "is" : "are"} not an always-free allowance: ${shown.map(planBit).join(", ")}${more}.`;
}

const FAQS: Record<Domain, (entries: AtlasEntry[]) => Faq[]> = {
  hosting(entries) {
    const bandwidth = mentioning(entries, /bandwidth|egress|transfer/i);
    const billed = bandwidth.filter((entry) => entry.freeTierDetails.overageRisk !== "none");
    return [
      {
        question: "Which free hosts can I open without a credit card?",
        answer: cardAnswer("hosting plans", entries),
      },
      {
        question: "Which free hosts sleep or shut down when nobody is visiting?",
        answer: `${mentioned(entries, /sleep|idle|scale to zero|scales to zero|spins down|spin down/i, "sleep, idle shutdown, or scale-to-zero")} A host that stays awake in one product's docs can still sleep on another.`,
      },
      {
        question: "Which hosts can bill bandwidth after the free transfer is gone?",
        answer: `${bandwidth.length} hosting entries mention bandwidth, egress, or transfer. ${billed.length} of those have a billing risk above none, including ${nameList(billed, 4)}. A hard cap, when the entry records one, is what stops that meter.`,
      },
      {
        question: "Which free hosts mention a custom domain, whether they include one or refuse it?",
        answer: `${mentioned(entries, /custom domain/i, "a custom domain")} Some of those lines include a domain and some withhold it, so the entry is the place to check before you buy one.`,
      },
      {
        question: "Which hosts that look free are only a short trial or a starter credit?",
        answer: trialClause(entries, "Every active hosting entry is marked always free. That still means a quota, not unlimited traffic."),
      },
    ];
  },
  compute(entries) {
    return [
      {
        question: "Which free compute plans still let me start before I add a card?",
        answer: cardAnswer("compute plans", entries),
      },
      {
        question: "Does the free cloud account expire, or does the monthly grant keep renewing?",
        answer: `${mentioned(entries, /6 months|12 months|expires|expiry|credit exhaustion|suspend/i, "an expiry, a 6- or 12-month window, or an account suspension")} A monthly function grant can sit on an account that itself closes.`,
      },
      {
        question: "Which serverless platforms bill the next second after the free compute?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} active compute entries have a billing risk above none, including ${nameList(entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none"), 4)}. ${entries.filter(isHardCap).length} record a hard cap that stops the meter instead.`,
      },
      {
        question: "Which free function plans exclude always-on or provisioned capacity?",
        answer: mentioned(entries, /provisioned|always-on|always on|minimum instance|cold start/i, "provisioned capacity, always-on instances, or cold starts"),
      },
    ];
  },
  database(entries) {
    return [
      {
        question: "Which free databases let me create a project with no credit card?",
        answer: cardAnswer("database plans", entries),
      },
      {
        question: "Which free databases pause, suspend, or delete the project when it sits idle?",
        answer: mentioned(entries, /paus|suspend|inactiv|delet/i, "pause, suspend, inactivity, or deletion"),
      },
      {
        question: "Which free databases are small enough that the disk is measured in megabytes?",
        answer: mentioned(entries, /\d+(\.\d+)?\s*MB/i, "a disk measured in megabytes"),
      },
      {
        question: "Which free databases meter compute hours or branches, not just disk?",
        answer: mentioned(entries, /GB-hours|CU-hours?|compute hours?|hours\/month|hours a month|branch/i, "compute hours or branches"),
      },
    ];
  },
  storage(entries) {
    return [
      {
        question: "Which free storage plans can I open before I own a credit card?",
        answer: cardAnswer("storage plans", entries),
      },
      {
        question: "Which free buckets bill egress after the allowance?",
        answer: `${mentioned(entries, /egress|bandwidth|transfer/i, "egress, bandwidth, or transfer")} ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} storage entries have a billing risk above none, so a public file URL can become the expensive part.`,
      },
      {
        question: "Which object stores are only free for the first year?",
        answer: `${mentioned(entries, /12 months|365 days|first year|expires/i, "a 12-month window, a first year, or an expiry")} ${trialClause(entries, "The plan-type field marks the rest always free, which is separate from a year-long cloud credit.")}`,
      },
      {
        question: "Which free storage plans delete files that sit unused?",
        answer: mentioned(entries, /delet|inactiv|90 days|unused/i, "deletion or an inactivity window"),
      },
    ];
  },
  auth(entries) {
    return [
      {
        question: "Which login providers let me start without a credit card?",
        answer: cardAnswer("auth plans", entries),
      },
      {
        question: "What monthly-active-user cap shows up on a free login plan?",
        answer: mentioned(entries, /MAU|monthly active|active users/i, "monthly active users or an active-user cap"),
      },
      {
        question: "Which free auth plans cut off SMS, social login, or enterprise SSO?",
        answer: mentioned(entries, /SMS|social|SAML|SSO|enterprise/i, "SMS, social login, SAML, or SSO"),
      },
      {
        question: "Which free auth plans are only a trial of a paid directory?",
        answer: trialClause(entries, "Every active auth entry is marked always free. The user cap still applies on those."),
      },
    ];
  },
  messaging(entries) {
    return [
      {
        question: "Which free email and chat tools skip the credit card?",
        answer: cardAnswer("messaging plans", entries),
      },
      {
        question: "Which free email plans stop at a daily send cap?",
        answer: mentioned(entries, /per day|\/day|daily/i, "a daily send or message cap"),
      },
      {
        question: "Which free mail tools make you verify a domain before real mail goes out?",
        answer: mentioned(entries, /domain|verif/i, "a domain or verification step"),
      },
      {
        question: "Which free email plans send only to authorized recipients or from a shared pool?",
        answer: mentioned(entries, /shared IP|shared pool|authorized recipient|sandbox/i, "a shared IP, a shared pool, authorized recipients, or a sandbox"),
      },
    ];
  },
  observability(entries) {
    return [
      {
        question: "Which error trackers and uptime tools start without a credit card?",
        answer: cardAnswer("observability plans", entries),
      },
      {
        question: "How long do free error trackers and log plans keep data?",
        answer: mentioned(entries, /retention|days|kept for/i, "retention or a day limit"),
      },
      {
        question: "Which free monitors cap hosts, spans, or events rather than calendar time?",
        answer: mentioned(entries, /host|span|event|metric series/i, "hosts, spans, events, or metric series"),
      },
      {
        question: "Which free uptime checks run less often than once a minute?",
        answer: mentioned(entries, /minute|interval|check every/i, "a check interval in minutes"),
      },
    ];
  },
  ai(entries) {
    const credits = entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.freeTierType === "credit");
    return [
      {
        question: "Which model APIs can I call before I add a credit card?",
        answer: cardAnswer("AI plans", entries),
      },
      {
        question: "Which AI offers are a credit that runs out, not a monthly allowance that renews?",
        answer:
          credits.length === 0
            ? `${trialClause(entries, "No active AI entry is marked as a credit. Rate limits can still stop you for the day.")}`
            : `${credits.length} AI entries are credit-based, including ${nameList(credits, 4)}. ${trialClause(entries, "")} A credit spends down. An always-free allowance resets.`,
      },
      {
        question: "Which free model APIs throttle by the minute, not only by the month?",
        answer: mentioned(entries, /per minute|requests a minute|RPM|rate limit|tokens per/i, "a per-minute rate, RPM, or a token rate"),
      },
      {
        question: "Which free AI plans say the vendor may train on what you send?",
        answer: mentioned(entries, /train|improve (its|their|our) products|use your (data|content|prompts)/i, "training on your content or using it to improve the product"),
      },
    ];
  },
  devops(entries) {
    return [
      {
        question: "Which CI and DevOps tools let me sign up with no credit card?",
        answer: cardAnswer("DevOps plans", entries),
      },
      {
        question: "Which free CI plans run out of build minutes?",
        answer: mentioned(entries, /minute/i, "minutes"),
      },
      {
        question: "Which free DevOps tools cap private repositories or seats?",
        answer: mentioned(entries, /private|seat|user/i, "private repos, seats, or users"),
      },
      {
        question: "Has a DevOps free tier in this catalog already ended?",
        answer: `${endedSummary(entries)} ${trialClause(entries, "The active plans are marked always free, which still leaves the minute and seat caps.")}`,
      },
    ];
  },
  security(entries) {
    return [
      {
        question: "Which scanners and secret checks start without a credit card?",
        answer: cardAnswer("security plans", entries),
      },
      {
        question: "What do free security tools cap: scans, assets, or repositories?",
        answer: mentioned(entries, /scan|asset|repo/i, "scans, assets, or repositories"),
      },
      {
        question: "Which free security tools are only for public or open-source projects?",
        answer: mentioned(entries, /public|open-source|open source/i, "public or open-source limits"),
      },
      {
        question: "Which free scanners record a hard stop instead of a bill?",
        answer: `${entries.filter(isHardCap).length} security entries record a hard cap, including ${nameList(entries.filter(isHardCap), 4)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.hasHardCap === "unknown").length} leave the cap unconfirmed and stay off the hard-cap page.`,
      },
    ];
  },
  networking(entries) {
    return [
      {
        question: "Which free DNS, CDN, and tunnel plans skip the credit card?",
        answer: cardAnswer("networking plans", entries),
      },
      {
        question: "Which free DNS or CDN plans meter queries or bandwidth?",
        answer: mentioned(entries, /bandwidth|query|queries|transfer/i, "bandwidth, queries, or transfer"),
      },
      {
        question: "Which free tunnels or VPNs cap devices, peers, or traffic?",
        answer: mentioned(entries, /device|peer|tunnel|bandwidth/i, "devices, peers, tunnels, or bandwidth"),
      },
      {
        question: "Which free DNS plans limit how many zones you can keep?",
        answer: mentioned(entries, /zone|domain/i, "zones or domains"),
      },
    ];
  },
  collaboration(entries) {
    return [
      {
        question: "Do any free docs, chat, or board tools here require a credit card?",
        answer: cardAnswer("collaboration plans", entries),
      },
      {
        question: "Which free team tools cap seats, members, or guests?",
        answer: mentioned(entries, /seat|member|guest|user/i, "seats, members, guests, or users"),
      },
      {
        question: "Which free docs and chat tools throw away history?",
        answer: mentioned(entries, /history|retention|days of/i, "history or retention"),
      },
      {
        question: "Which free boards or wikis cap projects, files, or storage?",
        answer: mentioned(entries, /project|file|storage|GB/i, "projects, files, or storage"),
      },
    ];
  },
  forms(entries) {
    return [
      {
        question: "Which form backends can I embed before I add a credit card?",
        answer: cardAnswer("form plans", entries),
      },
      {
        question: "What monthly submission cap do free forms actually record?",
        answer: mentioned(entries, /submission|response|\/month|per month/i, "submissions, responses, or a monthly cap"),
      },
      {
        question: "Which free forms keep a badge or block file uploads?",
        answer: mentioned(entries, /badge|brand|upload|file/i, "a badge, branding, or file uploads"),
      },
      {
        question: "Which free forms drop the next submission instead of charging for it?",
        answer: `${entries.filter(isHardCap).length} form entries record a hard cap, including ${nameList(entries.filter(isHardCap), 4)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} are marked with no overage risk.`,
      },
    ];
  },
  localization(entries) {
    return [
      {
        question: "Which translation tools let me start with no credit card?",
        answer: cardAnswer("localization plans", entries),
      },
      {
        question: "What is capped on a free localization plan: hosted strings, or machine-translation words?",
        answer: mentioned(entries, /string|word|character/i, "strings, words, or characters"),
      },
      {
        question: "Which free translation plans also cap seats or projects?",
        answer: mentioned(entries, /seat|project|user/i, "seats, projects, or users"),
      },
      {
        question: "Is any free localization offer a trial that expires?",
        answer: trialClause(entries, "Every active localization entry is marked always free. A word cap can still empty mid-release."),
      },
    ];
  },
  documents(entries) {
    return [
      {
        question: "Which PDF and document APIs start without a credit card?",
        answer: cardAnswer("document plans", entries),
      },
      {
        question: "Which free PDF tools stamp a watermark on the file?",
        answer: mentioned(entries, /watermark/i, "a watermark"),
      },
      {
        question: "What monthly render or document cap shows up on free PDF APIs?",
        answer: mentioned(entries, /document|render|PDF|template/i, "documents, renders, PDFs, or templates"),
      },
      {
        question: "Which document tools stop generating files at a hard cap?",
        answer: `${entries.filter(isHardCap).length} document entries record a hard cap, including ${nameList(entries.filter(isHardCap), 4)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.hasHardCap === "unknown").length} leave the cap unconfirmed.`,
      },
    ];
  },
  apis(entries) {
    return [
      {
        question: "Which data and utility APIs give me a key with no credit card?",
        answer: cardAnswer("API plans", entries),
      },
      {
        question: "Which free API keys reset daily rather than monthly?",
        answer: mentioned(entries, /per day|\/day|daily/i, "a daily reset or a per-day cap"),
      },
      {
        question: "Which free APIs forbid commercial use of the key?",
        answer: mentioned(entries, /non-commercial|noncommercial|personal use|no commercial/i, "non-commercial or personal-use limits"),
      },
      {
        question: "Which free APIs return an error at the cap instead of billing the next call?",
        answer: `${entries.filter(isHardCap).length} API entries record a hard cap, including ${nameList(entries.filter(isHardCap), 4)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none.`,
      },
    ];
  },
  scraping(entries) {
    const production = entries.filter((entry) => entry.status !== "ended" && (entry.productionReadiness === "production-ready" || entry.productionReadiness === "production-light"));
    return [
      {
        question: "Which scraping APIs let me try a crawl with no credit card?",
        answer: cardAnswer("scraping plans", entries),
      },
      {
        question: "Which free scrapers cap concurrent requests?",
        answer: mentioned(entries, /concurrent|parallel|at a time/i, "concurrency or parallel requests"),
      },
      {
        question: "Which free scrapers block targets or stop at a page cap?",
        answer: mentioned(entries, /block|page|request|credit/i, "blocks, pages, requests, or credits"),
      },
      {
        question: "Can I schedule a production crawl on any of these free scrapers?",
        answer:
          production.length === 0
            ? `None are marked production-ready or production-light. ${entries.filter((entry) => entry.status !== "ended" && entry.productionReadiness === "prototype").length} are prototypes. Read that line before you schedule a crawl.`
            : `${production.length} are marked production-light or production-ready, including ${nameList(production, 3)}. The rest are side projects or prototypes.`,
      },
    ];
  },
  automation(entries) {
    return [
      {
        question: "Which workflow tools let me connect an account with no credit card?",
        answer: cardAnswer("automation plans", entries),
      },
      {
        question: "What runs out first on a free automation plan: tasks, webhooks, or minutes?",
        answer: mentioned(entries, /task|webhook|minute|run/i, "tasks, webhooks, minutes, or runs"),
      },
      {
        question: "Which free automation tools can bill a runaway workflow?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none, including ${nameList(entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none"), 4)}. ${entries.filter(isHardCap).length} record a hard cap that stops the next task.`,
      },
      {
        question: "Which free automation plans are a credit or a trial rather than a monthly task bucket?",
        answer: trialClause(entries, "Every active automation entry is marked always free. The task cap still applies."),
      },
    ];
  },
  design(entries) {
    return [
      {
        question: "Which of these design tools open without a credit card?",
        answer: cardAnswer("design plans", entries),
      },
      {
        question: "What do the free design plans limit: files, exports, or seats?",
        answer: mentioned(entries, /file|export|seat|project/i, "files, exports, seats, or projects"),
      },
      {
        question: "Which design tools confirm a hard stop on the free plan?",
        answer: `${entries.filter(isHardCap).length} design entries record a hard cap, including ${nameList(entries.filter(isHardCap), 4)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.hasHardCap === "unknown").length} leave the cap unconfirmed.`,
      },
      {
        question: "Are any of these design free tiers a trial that expires?",
        answer: trialClause(entries, "Every active design entry is marked always free."),
      },
    ];
  },
  analytics(entries) {
    return [
      {
        question: "Which counters and product-analytics tools start with no credit card?",
        answer: cardAnswer("analytics plans", entries),
      },
      {
        question: "Which free analytics plans cap pageviews or events?",
        answer: mentioned(entries, /pageview|page view|event|hit/i, "pageviews, events, or hits"),
      },
      {
        question: "Which free analytics plans are a trial or expire after a set number of days?",
        answer: trialClause(entries, "Every active analytics entry is marked always free. A pageview cap can still stop the script."),
      },
      {
        question: "Which free analytics tools cap sites, projects, or history rather than traffic?",
        answer: mentioned(entries, /site|project|history|retention|month of/i, "sites, projects, history, or retention"),
      },
    ];
  },
  learning() {
    return [];
  },
  other() {
    return [];
  },
};

export function categoryFaqs(domain: Domain, entries: AtlasEntry[]): Faq[] {
  const faqs = FAQS[domain](entries);
  if (entries.length > 0 && faqs.length === 0) throw new Error(`No category FAQ for ${domain}`);
  return faqs;
}
