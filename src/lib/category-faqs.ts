import {
  bySafety,
  changedSummary,
  countReady,
  endedSummary,
  isCapUnknown,
  isCard,
  isCardUnknown,
  isHardCap,
  isLimitedOffer,
  isNoCard,
  mentioning,
  names,
  planBit,
} from "@/lib/catalog-facts";
import type { Domain, AtlasEntry } from "@/types/content";

export type Faq = { question: string; answer: string };

function limitedAnswer(entries: AtlasEntry[], none: string, follow: string): string {
  const limited = bySafety(entries.filter(isLimitedOffer));
  if (limited.length === 0) return none;
  const bits = limited.slice(0, 6).map(planBit);
  const more = limited.length > bits.length ? ` ${limited.length - bits.length} more sit in that group too.` : "";
  return `${limited.length} ${limited.length === 1 ? "entry is" : "entries are"} not marked always free: ${bits.join(", ")}.${more} ${follow}`;
}

function readyAnswer(entries: AtlasEntry[], follow: string): string {
  const live = entries.filter((entry) => entry.status !== "ended");
  const production = countReady(live, "production-ready");
  const light = countReady(live, "production-light");
  const side = countReady(live, "side-project");
  const proto = countReady(live, "prototype");
  const lead = production.length > 0 ? names(production, 3) : light.length > 0 ? names(light, 3) : "none";
  return `${production.length} are marked production-ready and ${light.length} production-light${production.length + light.length > 0 ? `, including ${lead}` : ""}. ${side.length} are side projects and ${proto.length} are prototypes. ${follow}`;
}

const FAQS: Record<Domain, (entries: AtlasEntry[]) => Faq[]> = {
  hosting(entries) {
    const noCard = entries.filter(isNoCard);
    const card = entries.filter(isCard);
    const unknown = entries.filter(isCardUnknown);
    const hard = entries.filter(isHardCap);
    const both = entries.filter((entry) => isNoCard(entry) && isHardCap(entry));
    const sleep = mentioning(entries, /sleep|idle|scale to zero|scales to zero|spins down|spin down/i);
    return [
      {
        question: "Which free hosts can I open without a credit card?",
        answer: `Skip the card on ${names(noCard)}. That is ${noCard.length} hosting entries with a confirmed no; ${card.length} require one, including ${names(card, 3)}, and ${unknown.length} do not say.`,
      },
      {
        question: "Which hosts stop at a hard cap instead of billing me?",
        answer: `${hard.length} hosting entries record a hard cap. ${both.length} of those also need no card, including ${names(both)}. A missing hard cap is not the same as a promise that overage is free.`,
      },
      {
        question: "Do free hosts stay awake, or do they sleep?",
        answer: `${sleep.length} active hosting entries mention sleep, idle shutdown, or scale-to-zero in their limits or caveats, including ${names(sleep)}. The rest do not say that in the catalog, so read the entry rather than assuming the process stays up.`,
      },
      {
        question: "Which hosting offers are a trial or a credit, not a plan that renews?",
        answer: limitedAnswer(
          entries,
          "Every active hosting entry is marked always free. That still means a quota, not unlimited traffic.",
          "Always free on the others means the allowance renews, not that bandwidth is uncapped.",
        ),
      },
      {
        question: "Which hosting entries changed, so an old write-up may be stale?",
        answer: changedSummary(entries),
      },
    ];
  },
  compute(entries) {
    const noCard = entries.filter(isNoCard);
    const card = entries.filter(isCard);
    const expiry = mentioning(entries, /6 months|12 months|expires|expiry|credit/i);
    return [
      {
        question: "Does free compute last, or does the account expire?",
        answer: `${expiry.length} active compute entries mention a credit, an expiry, or a 6- or 12-month window in their own limits or caveats, including ${names(expiry)}. Treat those as a clock, not as a plan you can forget.`,
      },
      {
        question: "Which compute free tiers need a card, and which do not?",
        answer: `${card.length} confirm a card, including ${names(card, 3)}. ${noCard.length} confirm you can start without one, including ${names(noCard)}. ${entries.filter(isCardUnknown).length} still do not say.`,
      },
      {
        question: "Which compute plans can keep billing after the free amount, and which have a hard cap?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} active compute entries have a billing risk above none. ${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. Risk above none means do not assume the meter stops.`,
      },
      {
        question: "Which compute offers are credits or time-limited rather than always free?",
        answer: limitedAnswer(
          entries,
          "Every active compute entry is marked always free, which does not cancel a separate account-level expiry called out in a caveat.",
          "Read the caveat on those before you build a job that has to run next year.",
        ),
      },
      {
        question: "What changed recently for free compute?",
        answer: changedSummary(entries),
      },
    ];
  },
  database(entries) {
    const pause = mentioning(entries, /paus|suspend|inactiv/i);
    const both = entries.filter((entry) => isNoCard(entry) && isHardCap(entry));
    const hard = entries.filter(isHardCap);
    return [
      {
        question: "Which free databases pause or suspend when they sit idle?",
        answer: `${pause.length} active database entries mention pause, suspend, or inactivity in their limits or caveats, including ${names(pause)}. Storage is the other thing that runs out; the entry's limits line says which quota is the small one.`,
      },
      {
        question: "Which database free tiers need no card and also have a hard cap?",
        answer: `${entries.filter(isNoCard).length} database entries confirm no card, and ${hard.length} confirm a hard cap. ${both.length} confirm both, including ${names(both)}. ${entries.filter(isCard).length} require a card, including ${names(entries.filter(isCard), 3)}.`,
      },
      {
        question: "Which database offers expire, or are only a trial?",
        answer: limitedAnswer(
          entries,
          "Every active database entry is marked always free. Pausing a project is a separate rule from the plan type, and it is called out on the entries that do it.",
          "A time limit on those is not the same as a free database that pauses when idle.",
        ),
      },
      {
        question: "Which free databases are only for a prototype?",
        answer: readyAnswer(entries, "A prototype database is fine for a demo and a poor place to leave customer data."),
      },
      {
        question: "Which database entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  storage(entries) {
    const egress = mentioning(entries, /egress|bandwidth|transfer/i);
    const timed = mentioning(entries, /12 months|365|first year|expires/i);
    return [
      {
        question: "Which free storage plans can bill egress after the allowance?",
        answer: `${egress.length} active storage entries mention egress, bandwidth, or transfer in their limits or caveats, including ${names(egress)}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} storage entries have a billing risk above none, so a public file URL can become a bill.`,
      },
      {
        question: "Which object-storage free tiers are time-limited?",
        answer: `${timed.length} storage entries mention a 12-month window, a year, or an expiry in their own text, including ${names(timed)}. ${limitedAnswer(entries, "The plan-type field still marks the active entries always free unless a row below says otherwise.", "The plan-type field is the one that decides the no-card and hard-cap lists.")}`,
      },
      {
        question: "Can I store files without a credit card?",
        answer: `${entries.filter(isNoCard).length} storage entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}, and ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "Which storage plans have a hard cap?",
        answer: `${entries.filter(isHardCap).length} confirm a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave the cap unconfirmed, and those stay off the hard-cap list.`,
      },
      {
        question: "Which storage entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  auth(entries) {
    const mau = mentioning(entries, /MAU|monthly active|active users/i);
    return [
      {
        question: "What runs out first on a free auth plan?",
        answer: `${mau.length} active auth entries mention monthly active users or an active-user cap in their limits or caveats, including ${names(mau)}. Seats and social connections show up on other entries, so the cap is not one number for the whole category.`,
      },
      {
        question: "Which auth providers confirm I can start without a card?",
        answer: `${entries.filter(isNoCard).length} auth entries say no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require a card. ${entries.filter(isCardUnknown).length} leave it unconfirmed, which is common here and is not a quiet yes.`,
      },
      {
        question: "Which auth free tiers can bill past the allowance, and which have a hard cap?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none. Only ${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. An unconfirmed cap (${entries.filter(isCapUnknown).length} entries) is left off the hard-cap page.`,
      },
      {
        question: "Are any auth free tiers just a trial?",
        answer: limitedAnswer(entries, "Every active auth entry is marked always free. The user cap still applies.", "Do not treat a trial row as a directory you can leave in production."),
      },
      {
        question: "Which auth entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  messaging(entries) {
    const sends = mentioning(entries, /per day|daily|\/day|domain/i);
    return [
      {
        question: "Which free email and chat tools need no card?",
        answer: `${entries.filter(isNoCard).length} messaging entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}, and ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "What usually stops a free email plan: sends, or the domain?",
        answer: `${sends.length} active messaging entries mention a daily cap or a domain in their limits or caveats, including ${names(sends)}. Verification and a daily ceiling are different limits, and the entry says which one it records.`,
      },
      {
        question: "Which messaging free tiers have a hard cap so they cannot bill me?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} have overage risk none. Those two fields are not the same test.`,
      },
      {
        question: "Which email or realtime tools are a trial or a credit?",
        answer: limitedAnswer(
          entries,
          "Every active messaging entry is marked always free. A daily send cap can still stop the mail.",
          "A trial balance is not a monthly send allowance.",
        ),
      },
      {
        question: "Which messaging entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  observability(entries) {
    const retention = mentioning(entries, /retention|days of|hosts|spans|events/i);
    return [
      {
        question: "What do free monitoring plans typically cap?",
        answer: `${retention.length} active observability entries mention retention, hosts, spans, or events in their limits or caveats, including ${names(retention)}. There is no single free retention period for the category.`,
      },
      {
        question: "Which error trackers and uptime tools need no card?",
        answer: `${entries.filter(isNoCard).length} confirm no card, including ${names(entries.filter(isNoCard))}. Only ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say, so they are not on the no-card list.`,
      },
      {
        question: "Which observability plans have a hard cap and refuse to bill past it?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} are marked with no overage risk. Use both fields before you send production traffic.`,
      },
      {
        question: "Which observability free tiers are trials?",
        answer: limitedAnswer(entries, "Every active observability entry is marked always free. Retention can still be a few days.", "A trial ends even if you stay under the event cap."),
      },
      {
        question: "Is a free monitor enough for production?",
        answer: readyAnswer(entries, "A side-project tracker is a fine debugger and a weak place to be the only page on call."),
      },
    ];
  },
  ai(entries) {
    const credits = entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.freeTierType === "credit");
    return [
      {
        question: "Which AI free tiers are a credit or a trial that runs out?",
        answer: limitedAnswer(
          entries,
          "Every active AI entry is marked always free. Rate limits can still stop you for the day.",
          "A credit entry spends down. An always-free entry resets. They are not the same offer.",
        ),
      },
      {
        question: "Which AI APIs can I call without a credit card?",
        answer: `${entries.filter(isNoCard).length} AI entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require a card, including ${names(entries.filter(isCard), 3)}. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "Which AI plans have a hard cap, and which can charge overage?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none. A credit balance (${credits.length} credit-type entries) can hit zero without an overage invoice, and the entry says which.`,
      },
      {
        question: "What should I read first on a free model API?",
        answer: `Start with the plan type, then the card, then the cap. ${countReady(entries, "prototype").length} AI entries are marked prototype and ${countReady(entries, "production-ready").length} production-ready. Token and request limits live on the entry, because they are not shared.`,
      },
      {
        question: "Which AI offers changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  devops(entries) {
    const ceilings = mentioning(entries, /minute|seat|private/i);
    return [
      {
        question: "Which CI and DevOps tools can I start without a card?",
        answer: `${entries.filter(isNoCard).length} DevOps entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}, and ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "What do free CI plans usually run out of?",
        answer: `${ceilings.length} active DevOps entries mention minutes, seats, or private repos in their limits or caveats, including ${names(ceilings)}. The ceiling is on the entry, not a category-wide minute count.`,
      },
      {
        question: "Which DevOps free tiers have a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave the cap unconfirmed and stay off the hard-cap page.`,
      },
      {
        question: "Which DevOps offers have ended, and which are only a trial or a credit?",
        answer: `${endedSummary(entries)} ${limitedAnswer(entries, "Every other active DevOps entry is marked always free.", "Do not confuse those clocks with the ended row.")}`,
      },
      {
        question: "Which DevOps entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  security(entries) {
    const scans = mentioning(entries, /scan|asset|repo|seat/i);
    return [
      {
        question: "Which security tools can I run without a card?",
        answer: `${entries.filter(isNoCard).length} security entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say, so an absent card line is not a no.`,
      },
      {
        question: "What do free scanners usually limit?",
        answer: `${scans.length} active security entries mention scans, assets, repos, or seats in their limits or caveats, including ${names(scans)}. The quota is per product.`,
      },
      {
        question: "Which security free tiers confirm a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave it unconfirmed. Unconfirmed is why the hard-cap list is shorter than this page.`,
      },
      {
        question: "Which security tools are marked ready for a real product?",
        answer: readyAnswer(entries, "A prototype scanner can miss the check you actually needed in a pipeline."),
      },
      {
        question: "Which security entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  networking(entries) {
    const bandwidth = mentioning(entries, /bandwidth|transfer|zone|query/i);
    return [
      {
        question: "Which free DNS, CDN, or tunnel plans need no card?",
        answer: `${entries.filter(isNoCard).length} networking entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "Which networking free tiers can bill past the allowance?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none. ${bandwidth.length} mention bandwidth, transfer, zones, or queries in their limits or caveats, including ${names(bandwidth)}.`,
      },
      {
        question: "Which networking plans confirm a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} do not confirm one.`,
      },
      {
        question: "Which networking offers are a trial or a credit?",
        answer: limitedAnswer(entries, "Every active networking entry is marked always free. A query cap can still cut the zone off.", "Those are not the same as an always-free DNS zone."),
      },
      {
        question: "Which free networking tools are marked for production traffic?",
        answer: readyAnswer(entries, "A prototype tunnel is a convenience, not a second network."),
      },
    ];
  },
  collaboration(entries) {
    const seats = mentioning(entries, /seat|member|guest|history/i);
    return [
      {
        question: "Do any free collaboration tools here require a card?",
        answer: `${entries.filter(isCard).length} collaboration entries confirm a required card. ${entries.filter(isNoCard).length} confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCardUnknown).length} do not say, and those are not listed as no-card plans.`,
      },
      {
        question: "What do free team tools usually limit?",
        answer: `${seats.length} active collaboration entries mention seats, members, guests, or history in their limits or caveats, including ${names(seats)}. The free plan is often the product with a smaller room, not a separate toy.`,
      },
      {
        question: "Which collaboration plans have a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave the cap unconfirmed, which is most of this category.`,
      },
      {
        question: "Which free team tools are marked for a real group, not a solo demo?",
        answer: readyAnswer(entries, "A prototype workspace is fine for notes and a poor system of record."),
      },
      {
        question: "Have any collaboration free tiers changed or ended?",
        answer: `${changedSummary(entries)} ${endedSummary(entries)}`,
      },
    ];
  },
  forms(entries) {
    const submissions = mentioning(entries, /submission|response|upload/i);
    return [
      {
        question: "Which form backends can I use without a card?",
        answer: `${entries.filter(isNoCard).length} forms entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} confirm a required card. ${entries.filter(isCardUnknown).length} still do not say, so they are excluded from the no-card list.`,
      },
      {
        question: "What runs out on a free form: submissions, or uploads?",
        answer: `${submissions.length} active forms entries mention submissions, responses, or uploads in their limits or caveats, including ${names(submissions)}. Branding on the success page is a separate caveat when the entry records it.`,
      },
      {
        question: "Which form tools stop at a hard cap instead of billing?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} are marked with no overage risk.`,
      },
      {
        question: "Which free form plans are only for a prototype?",
        answer: readyAnswer(entries, "A prototype form is fine on a side project and easy to outgrow on a launch day."),
      },
      {
        question: "Is any forms offer a credit rather than always free?",
        answer: limitedAnswer(entries, "Every active forms entry is marked always free. The monthly submission cap still applies.", "Spend-down credit is not a form you can leave embedded for a year without looking."),
      },
    ];
  },
  localization(entries) {
    const words = mentioning(entries, /word|string|seat|character/i);
    return [
      {
        question: "Which translation tools need no card?",
        answer: `${entries.filter(isNoCard).length} localization entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "What is capped: strings, machine-translation words, or seats?",
        answer: `${words.length} active localization entries mention words, strings, characters, or seats in their limits or caveats, including ${names(words)}. Hosted strings and machine translation are often different quotas on the same entry.`,
      },
      {
        question: "Which localization plans confirm a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave it unconfirmed. The hard-cap page only keeps the confirmed ones.`,
      },
      {
        question: "Is a free localization plan a trial?",
        answer: limitedAnswer(entries, "Every active localization entry is marked always free. A word cap can still empty mid-release.", "A trial is a clock, even if the string count looks large."),
      },
      {
        question: "Which localization entries are marked for a shipping product?",
        answer: readyAnswer(entries, "Prototype translation is fine for a demo build."),
      },
    ];
  },
  documents(entries) {
    const docs = mentioning(entries, /document|PDF|watermark|template|render/i);
    return [
      {
        question: "Which PDF and document APIs need no card?",
        answer: `${entries.filter(isNoCard).length} document entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "What usually runs out: rendered documents, or a watermark?",
        answer: `${docs.length} active document entries mention documents, PDFs, watermarks, templates, or renders in their limits or caveats, including ${names(docs)}. A watermark is a product limit, not a billing event, unless the entry says otherwise.`,
      },
      {
        question: "Which document tools have a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave the cap unconfirmed.`,
      },
      {
        question: "Are any document free tiers only a trial?",
        answer: limitedAnswer(entries, "Every active document entry is marked always free. Monthly render caps still apply.", "A trial PDF API is not a pipeline you can leave running."),
      },
      {
        question: "Which document entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  apis(entries) {
    const calls = mentioning(entries, /request|call|per day|per month|credit/i);
    return [
      {
        question: "Which free APIs need no card and stop at a hard cap?",
        answer: `${entries.filter((entry) => isNoCard(entry) && isHardCap(entry)).length} API entries confirm both, including ${names(entries.filter((entry) => isNoCard(entry) && isHardCap(entry)))}. ${entries.filter(isNoCard).length} confirm no card in total, and ${entries.filter(isHardCap).length} confirm a hard cap.`,
      },
      {
        question: "What is usually limited on a free API key?",
        answer: `${calls.length} active API entries mention requests, calls, a daily or monthly window, or credits in their limits or caveats, including ${names(calls)}. The period is on the entry, because some reset daily and some monthly.`,
      },
      {
        question: "Which API free tiers can still bill me?",
        answer: `${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none. ${entries.filter(isCard).length} require a card, including ${names(entries.filter(isCard), 3)}. No overage risk is recorded on ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} entries.`,
      },
      {
        question: "Which APIs are a trial, a credit, or time-limited?",
        answer: limitedAnswer(entries, "Every active API entry is marked always free. The request cap still applies.", "Those run out on a different clock than a monthly request cap."),
      },
      {
        question: "Which API entries changed?",
        answer: changedSummary(entries),
      },
    ];
  },
  scraping(entries) {
    const pages = mentioning(entries, /request|page|credit|concurrent/i);
    return [
      {
        question: "Which scraping APIs can I try without a card?",
        answer: `${entries.filter(isNoCard).length} scraping entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "Do any free scrapers bill overage, or do they stop at a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "none").length} are marked with no overage risk. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk === "high").length} are marked high risk.`,
      },
      {
        question: "What is usually capped when you scrape on a free key?",
        answer: `${pages.length} active scraping entries mention requests, pages, credits, or concurrency in their limits or caveats, including ${names(pages)}. Blocked targets are a product limit when the entry records them, not a shared rule.`,
      },
      {
        question: "Are any free scrapers marked ready for production?",
        answer: readyAnswer(entries, "Most of this category is prototype or side-project work. Schedule a crawl only after you read that line."),
      },
      {
        question: "Which scraping entries changed, and is any of this a trial?",
        answer: `${changedSummary(entries)} ${limitedAnswer(entries, "Every active scraping entry is marked always free.", "A trial scraper is not an always-free request bucket.")}`,
      },
    ];
  },
  automation(entries) {
    const tasks = mentioning(entries, /task|run|webhook|zap|minute/i);
    return [
      {
        question: "Which automation tools need no card?",
        answer: `${entries.filter(isNoCard).length} automation entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "What runs out first: tasks, webhooks, or run time?",
        answer: `${tasks.length} active automation entries mention tasks, runs, webhooks, or minutes in their limits or caveats, including ${names(tasks)}. One product's task is not another's workflow run, so use the entry's own unit.`,
      },
      {
        question: "Which automation plans have a hard cap, and which can bill?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none, including the ones marked high when the facts box says so.`,
      },
      {
        question: "Is any automation offer just a credit or a trial?",
        answer: limitedAnswer(entries, "Every active automation entry is marked always free. Task caps still apply.", "A credit or trial ends even if you have tasks left in your head."),
      },
      {
        question: "Which free automation tools are only for a prototype?",
        answer: readyAnswer(entries, "A prototype workflow is fine for a personal job and brittle as the only integration."),
      },
    ];
  },
  design(entries) {
    return [
      {
        question: "Which design tools in this catalog need no card?",
        answer: `${entries.filter(isNoCard).length} design entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one. ${entries.filter(isCardUnknown).length} do not say. The category is short, so the unconfirmed rows are worth opening.`,
      },
      {
        question: "What do the free design plans actually limit?",
        answer: `Limits are per entry, not a shared export count. The safest confirmed rows are ${names(entries.filter((entry) => entry.status !== "ended"))}. Read files, seats, and exports on the facts box before you pick one for a team.`,
      },
      {
        question: "Which design tools confirm a hard cap?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter(isCapUnknown).length} leave it unconfirmed.`,
      },
      {
        question: "Are any design free tiers a trial?",
        answer: limitedAnswer(entries, "Every active design entry is marked always free.", "A trial editor is not a file you can keep opening next year."),
      },
      {
        question: "Which design entries are prototypes, and did any change?",
        answer: `${readyAnswer(entries, "There is no production-ready row unless the count above says so.")} ${changedSummary(entries)}`,
      },
    ];
  },
  analytics(entries) {
    const views = mentioning(entries, /pageview|page view|event|hit/i);
    return [
      {
        question: "Which analytics tools need no card?",
        answer: `${entries.filter(isNoCard).length} analytics entries confirm no card, including ${names(entries.filter(isNoCard))}. ${entries.filter(isCard).length} require one, including ${names(entries.filter(isCard), 3)}. ${entries.filter(isCardUnknown).length} do not say.`,
      },
      {
        question: "Which free analytics plans are trials or time-limited?",
        answer: limitedAnswer(
          entries,
          "Every active analytics entry is marked always free. A pageview cap can still stop the script.",
          "Leave a trial on a marketing site and the data stops when the clock does.",
        ),
      },
      {
        question: "What usually runs out: pageviews, events, or sites?",
        answer: `${views.length} active analytics entries mention pageviews, events, or hits in their limits or caveats, including ${names(views)}. Site and project caps show up as their own limit lines when the entry has them.`,
      },
      {
        question: "Which analytics plans have a hard cap so extra traffic cannot bill me?",
        answer: `${entries.filter(isHardCap).length} record a hard cap, including ${names(entries.filter(isHardCap))}. ${entries.filter((entry) => entry.status !== "ended" && entry.freeTierDetails.overageRisk !== "none").length} have a billing risk above none. A privacy-friendly badge is not the same thing as a hard cap.`,
      },
      {
        question: "Which analytics tools are marked fine for a production site?",
        answer: readyAnswer(entries, "A prototype counter is fine on a blog and thin as the only record of a business."),
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
  if (entries.length > 0 && faqs.length === 0) {
    throw new Error(`No category FAQ for ${domain}`);
  }
  return faqs;
}
