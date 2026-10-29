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
    "Free storage here is object buckets, file hosting, and drive-style plans. Egress fees and year-long allowances are the usual catches. Check the egress line before you serve public files from a bucket.",
  auth:
    "Free auth here is hosted login, user directories, and identity providers. Monthly active users and unpublished card rules are the usual catches. Treat a card rule marked not confirmed as unknown.",
  messaging:
    "Free messaging here is email, push, SMS, and realtime. Daily send caps and a hard stop at the quota are the usual catches. Check the daily figure on the entry before you plan a launch.",
  observability:
    "Free observability here is errors, logs, uptime, and metrics. Short retention and event or host caps are the usual catches. Most free plans fit one app's errors and logs.",
  ai:
    "Free AI here is model APIs, hosted models, and a few app builders. One-time credits and short trials are the usual catches. Check whether the entry is a credit, a trial, or an allowance that resets.",
  devops:
    "Free DevOps here is CI, registries, previews, and hosted Git. Minutes, seats, and private-repo rules are the usual catches. Ended offers stay listed and are marked ended.",
  security:
    "Free security here is scanners, secret checks, and certificate tools. Scan quotas and unpublished card rules are the usual catches. If the cap is not confirmed, assume extra usage could bill.",
  networking:
    "Free networking here is DNS, CDN, tunnels, and IP tools. Bandwidth, zone caps, and a required card are the usual catches. The hard-cap link keeps only plans that stop at the limit.",
  collaboration:
    "Free collaboration here is docs, chat, wikis, and project boards. Seat caps and history limits are the usual catches. The facts box on each entry shows whether a card is needed.",
  forms:
    "Free forms here are backends, embeds, and a few survey tools. Monthly submission caps and the vendor's branding are the usual catches. The hard-cap link keeps only forms that stop at the limit.",
  localization:
    "Free localization here is string hosting and some machine translation. Word caps, seats, and translation credits are the usual catches. Most free plans fit the strings of one small app.",
  documents:
    "Free document tools render PDFs, generate files, and host templates. Small monthly volumes are the usual catch, so check the unit. Plans count PDFs, pages, calls, and credits differently, and most entries are rated prototype or side-project.",
  apis:
    "Free APIs here are data, utility, and developer endpoints with a key. Call caps, by day or by month, and non-commercial keys are the usual catches. Check whether a key gets a one-time credit or an allowance that resets.",
  scraping:
    "Free scraping here is fetchers, proxies, and extraction APIs. Monthly credits and concurrency limits are the usual catches. Read the readiness line before you schedule a crawl.",
  automation:
    "Free automation here is workflows, webhooks, and scheduled jobs. Task counts and run-time caps are the usual catches. Products count tasks, runs, and operations differently, so check each entry's unit.",
  design:
    "Free design tools here are editors, asset hosts, and generators. Project, file, and user limits are the usual catches. The list is short, so check each entry's facts box.",
  analytics:
    "Free analytics here covers pageviews, product events, and privacy-first trackers. Pageview caps and short trials are the usual catches. Check whether a plan is a trial before you put it on a live site.",
  learning:
    "Free learning entries are courses, labs, and student packs when this category has any. Expiry dates and a required school email are the usual catches. Read the entry before you treat a pack as a cloud account.",
  other:
    "Free tools that do not sit in a clearer category land here. Their quotas have little in common, so read each entry on its own.",
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
