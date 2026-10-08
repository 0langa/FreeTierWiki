import { DOMAIN_LABELS } from "@/lib/content";
import { getFreshness, type Freshness, type FreshnessState } from "@/lib/freshness";
import type {
  AtlasEntry,
  ContentKind,
  Domain,
  EntryStatus,
  FreeTierType,
  OverageRisk,
  ProductionReadiness,
} from "@/types/content";

/** One row in the explorer, category pages, and alternatives. Kept small because it ships as JSON. */
export type ListItem = {
  id: string;
  url: string;
  kind: ContentKind;
  title: string;
  provider: string;
  domain: Domain;
  offer: string[];
  risk: OverageRisk;
  card: boolean;
  cap: boolean;
  plan: FreeTierType;
  ready: ProductionReadiness;
  status: EntryStatus;
  freshness: Freshness;
  haystack: string;
  rank: number;
};

export function offerParts(entry: AtlasEntry): string[] {
  return entry.freeTierDetails.limits.slice(0, 3);
}

export function pricingUrl(entry: AtlasEntry): string | undefined {
  return (
    entry.pricingUrl ??
    entry.sourceUrls.find((url) => /^https?:\/\//i.test(url) && /pricing|plans|free-?tier/i.test(url)) ??
    entry.officialUrl
  );
}

const RISK_POINTS: Record<OverageRisk, number> = { none: 40, low: 30, medium: 15, high: 0 };
const FRESHNESS_POINTS: Record<FreshnessState, number> = { checked: 30, stale: 10, imported: 5, ended: 0 };

export function safetyScore(item: Pick<ListItem, "risk" | "card" | "cap" | "status" | "freshness">): number {
  if (item.status === "ended") return -1000;
  return (
    RISK_POINTS[item.risk] +
    (item.card ? 0 : 20) +
    (item.cap ? 10 : 0) +
    FRESHNESS_POINTS[item.freshness.state] -
    (item.status === "changed" ? 10 : 0)
  );
}

export function compareSafety(a: ListItem, b: ListItem): number {
  return safetyScore(b) - safetyScore(a) || b.rank - a.rank || a.title.localeCompare(b.title);
}

export function toListItem(entry: AtlasEntry, now: Date): ListItem {
  const details = entry.freeTierDetails;
  return {
    id: entry.id,
    url: entry.url,
    kind: entry.kind,
    title: entry.title,
    provider: entry.provider,
    domain: entry.domain,
    offer: offerParts(entry),
    risk: details.overageRisk,
    card: details.requiresCard,
    cap: details.hasHardCap,
    plan: details.freeTierType,
    ready: entry.productionReadiness,
    status: entry.status,
    freshness: getFreshness(entry, now),
    haystack: [entry.title, entry.provider, DOMAIN_LABELS[entry.domain], entry.description, ...entry.tags].join(" ").toLowerCase(),
    rank: Math.round((entry.usefulnessScore * 0.65 + entry.popularityScore * 0.35) * 10) / 10,
  };
}

/** Other live entries in the same category, safest first. Ended offers are never suggested. */
export function relatedItems(entry: AtlasEntry, all: AtlasEntry[], now: Date, limit = 4): ListItem[] {
  return all
    .filter((other) => other.domain === entry.domain && other.id !== entry.id && other.status !== "ended")
    .map((other) => toListItem(other, now))
    .sort(compareSafety)
    .slice(0, limit);
}
