import { categoryFaqs, type Faq } from "@/lib/category-faqs";
import type { Domain, AtlasEntry } from "@/types/content";

export type { Faq };

/**
 * Category intros are editorial: what the category contains and what usually catches people.
 * Counts and entry names belong in the FAQs, which are computed from the entries at build time.
 * The first two sentences are also the meta description, so together they stay within 160 characters.
 */
const INTROS: Record<Domain, string> = {
  hosting:
    "Free hosting here covers static sites, small apps, and container hosts. Sleep, bandwidth, and a card hold are the usual catches. The list is safest first, and the no-card and hard-cap links keep only the plans that confirm those rules.",
  compute:
    "Free compute here is functions, small VMs, and a few always-on containers. Account expiry, credit burn, and a card on the big clouds are the usual catches. Read the entry before you treat a monthly grant as a plan that lasts.",
  database:
    "Free databases here are hosted Postgres, MySQL, Redis, and serverless stores. Storage caps and paused projects are the usual catches. Check compute hours and whether an idle project is suspended or deleted.",
  storage:
    "Free storage here is object buckets, file hosting, and drive-style plans. Egress fees and year-long allowances are the usual catches. Confirm the cap before a public file URL sits on a domain.",
  auth:
    "Free auth here is hosted login, user directories, and identity providers. Monthly active users and unpublished card rules are the usual catches. An unconfirmed card line is unknown, not a quiet no.",
  messaging:
    "Free messaging here is email, push, SMS, and realtime. Daily send caps and domain checks are the usual catches. A plan that looks unlimited often stops at a daily or hourly ceiling.",
  observability:
    "Free observability here is errors, logs, uptime, and metrics. Short retention and event or host caps are the usual catches. A free project often debugs one app and not every service you run.",
  ai:
    "Free AI here is model APIs, hosted models, and a few app builders. A credit that runs out is not a monthly free tier. Check whether the entry is a credit, a trial, or an allowance that resets.",
  devops:
    "Free DevOps here is CI, registries, previews, and hosted Git. Minutes, seats, and private-repo rules are the usual catches. Ended offers stay listed so you do not plan on a plan that is gone.",
  security:
    "Free security here is scanners, secret checks, and certificate tools. Scan quotas and unpublished card rules are the usual catches. An unconfirmed cap is not a promise that overage is free.",
  networking:
    "Free networking here is DNS, CDN, tunnels, and IP tools. Bandwidth, zone caps, and a required card are the usual catches. A hard cap stops the bill, and a missing cap may not.",
  collaboration:
    "Free collaboration here is docs, chat, wikis, and project boards. Seat caps and history limits are the usual catches. Check the card line in the facts box rather than assuming a hold.",
  forms:
    "Free forms here are backends, embeds, and a few survey tools. Monthly submissions and upload caps are the usual catches. Use the hard-cap list when a surprise invoice is the failure you care about.",
  localization:
    "Free localization here is string hosting and some machine translation. Word caps, seats, and translation credits are the usual catches. A free project often covers a small app, not a full string catalog.",
  documents:
    "Free document tools render PDFs, generate files, and host templates. Monthly caps and watermarks are the usual catches. Confirm whether the free output is stamped before a customer sees it.",
  apis:
    "Free APIs here are data, utility, and developer endpoints with a key. Call caps, by day or by month, are the usual catches. A credit balance is a different offer from an allowance that resets.",
  scraping:
    "Free scraping here is fetchers, proxies, and extraction APIs. Request caps and blocked targets are the usual catches. Read the readiness line before you schedule a crawl.",
  automation:
    "Free automation here is workflows, webhooks, and scheduled jobs. Task counts and run-time caps are the usual catches. A task is not always one workflow run, so read the entry's unit.",
  design:
    "Free design tools here are editors, asset hosts, and generators. Export limits and seat caps are the usual catches. The list is short, so read each facts box rather than hunting for a pattern.",
  analytics:
    "Free analytics here covers pageviews, product events, and privacy-first trackers. Pageview caps and short trials are the usual catches. A trial that expires is not a plan to leave on a marketing site.",
  learning:
    "Free learning entries are courses, labs, and student packs when this category has any. Expiry dates and a required school email are the usual catches. Read the entry before you treat a pack as a cloud account.",
  other:
    "Free tools that do not sit in a clearer category land here. The catch is that the quotas have nothing in common. Read the entry, and do not borrow a limit from a neighbor on the list.",
};

export function categoryIntro(domain: Domain): string {
  const intro = INTROS[domain];
  if (!intro) throw new Error(`No category intro for ${domain}`);
  return intro;
}

export function categoryFaqItems(domain: Domain, entries: AtlasEntry[]): Faq[] {
  return categoryFaqs(domain, entries);
}

export function proseSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]+/g)?.map((part) => part.trim()) ?? [text.trim()];
}

/** Search snippet: the first two sentences when they fit, otherwise the first sentence. */
export function metaFromProse(text: string): string {
  const parts = proseSentences(text);
  const two = parts.slice(0, 2).join(" ");
  if (two.length >= 80 && two.length <= 160) return two;
  const one = parts[0] ?? text;
  if (one.length >= 50 && one.length <= 160) return one;
  return two;
}

export function categoryDescription(domain: Domain): string {
  return metaFromProse(categoryIntro(domain));
}
