import {
  DOMAIN_LABELS,
  FREE_TIER_TYPE_LABELS,
  KIND_LABELS,
  OVERAGE_RISK_LABELS,
  PRODUCTION_READINESS_LABELS,
} from "@/lib/content";
import { compareSafety, type ListItem } from "@/lib/entry-view";
import { freshnessDate } from "@/lib/freshness";
import {
  CONTENT_KINDS,
  DOMAINS,
  FREE_TIER_TYPES,
  OVERAGE_RISKS,
  PRODUCTION_READINESS_LEVELS,
  type ContentKind,
  type Domain,
  type FreeTierType,
  type OverageRisk,
  type ProductionReadiness,
} from "@/types/content";

export const SORT_MODES = ["safest", "recent", "az"] as const;
export type SortMode = (typeof SORT_MODES)[number];

export type ExplorerQuery = {
  q: string;
  type: ContentKind | "all";
  cats: Domain[];
  risks: OverageRisk[];
  plans: FreeTierType[];
  ready: ProductionReadiness[];
  noCard: boolean;
  hardCap: boolean;
  recent: boolean;
  sort: SortMode;
};

export const DEFAULT_QUERY: ExplorerQuery = {
  q: "",
  type: "all",
  cats: [],
  risks: [],
  plans: [],
  ready: [],
  noCard: false,
  hardCap: false,
  recent: false,
  sort: "safest",
};

export type Facet = "cats" | "type" | "risks" | "plans" | "ready";

function csv<T extends string>(raw: string | null, allowed: readonly T[]): T[] {
  if (!raw) return [];
  const wanted = new Set(raw.split(",").map((value) => value.trim()));
  return allowed.filter((value) => wanted.has(value));
}

/** Reads the explorer URL. Accepts the old parameter names (kind, domain, overageRisk, …) so old links keep working. */
export function parseQuery(params: URLSearchParams): ExplorerQuery {
  const pick = (key: string, legacy: string) => params.get(key) ?? params.get(legacy);
  const typeRaw = pick("type", "kind");
  const sortRaw = params.get("sort") ?? "";
  const q = [params.get("q"), params.get("provider"), params.get("tag")]
    .map((value) => value?.trim() ?? "")
    .find((value) => value !== "" && value !== "all");

  return {
    q: q ?? "",
    type: typeRaw && (CONTENT_KINDS as readonly string[]).includes(typeRaw) ? (typeRaw as ContentKind) : "all",
    cats: csv(pick("cat", "domain"), DOMAINS),
    risks: csv(pick("risk", "overageRisk"), OVERAGE_RISKS),
    plans: csv(pick("plan", "freeTierType"), FREE_TIER_TYPES),
    ready: csv(pick("ready", "productionReadiness"), PRODUCTION_READINESS_LEVELS),
    noCard: params.get("nocard") === "1" || params.get("requiresCard") === "no",
    hardCap: params.get("cap") === "1",
    recent: params.get("recent") === "1",
    sort: (SORT_MODES as readonly string[]).includes(sortRaw) ? (sortRaw as SortMode) : "safest",
  };
}

export function serializeQuery(query: ExplorerQuery): string {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set("q", query.q.trim());
  if (query.type !== "all") params.set("type", query.type);
  if (query.cats.length) params.set("cat", query.cats.join(","));
  if (query.risks.length) params.set("risk", query.risks.join(","));
  if (query.plans.length) params.set("plan", query.plans.join(","));
  if (query.ready.length) params.set("ready", query.ready.join(","));
  if (query.noCard) params.set("nocard", "1");
  if (query.hardCap) params.set("cap", "1");
  if (query.recent) params.set("recent", "1");
  if (query.sort !== "safest") params.set("sort", query.sort);
  return params.toString().replace(/%2C/g, ",");
}

export function isDefaultQuery(query: ExplorerQuery): boolean {
  return serializeQuery(query) === "";
}

export function matches(item: ListItem, query: ExplorerQuery, ignore?: Facet): boolean {
  if (ignore !== "type" && query.type !== "all" && item.kind !== query.type) return false;
  if (ignore !== "cats" && query.cats.length > 0 && !query.cats.includes(item.domain)) return false;
  if (ignore !== "risks" && query.risks.length > 0 && !query.risks.includes(item.risk)) return false;
  if (ignore !== "plans" && query.plans.length > 0 && !query.plans.includes(item.plan)) return false;
  if (ignore !== "ready" && query.ready.length > 0 && !query.ready.includes(item.ready)) return false;
  if (query.noCard && item.card) return false;
  if (query.hardCap && !item.cap) return false;
  if (query.recent && item.freshness.state !== "checked") return false;
  const words = query.q.toLowerCase().split(/\s+/).filter(Boolean);
  return words.every((word) => item.haystack.includes(word));
}

const COMPARE: Record<SortMode, (a: ListItem, b: ListItem) => number> = {
  safest: compareSafety,
  recent: (a, b) => (freshnessDate(b.freshness) ?? "").localeCompare(freshnessDate(a.freshness) ?? "") || compareSafety(a, b),
  az: (a, b) => a.title.localeCompare(b.title),
};

export function applyQuery(items: ListItem[], query: ExplorerQuery): ListItem[] {
  return items.filter((item) => matches(item, query)).sort(COMPARE[query.sort]);
}

const FACET_FIELD = { cats: "domain", type: "kind", risks: "risk", plans: "plan", ready: "ready" } as const;

export function facetCounts(items: ListItem[], query: ExplorerQuery, facet: Facet): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    if (!matches(item, query, facet)) continue;
    const value = item[FACET_FIELD[facet]];
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

export function activeFilterCount(query: ExplorerQuery): number {
  return [
    query.q.trim() !== "",
    query.type !== "all",
    query.cats.length > 0,
    query.risks.length > 0,
    query.plans.length > 0,
    query.ready.length > 0,
    query.noCard,
    query.hardCap,
    query.recent,
  ].filter(Boolean).length;
}

export function toggleValue<T extends string>(list: T[], value: T, on: boolean, order: readonly T[]): T[] {
  const set = new Set(list);
  if (on) set.add(value);
  else set.delete(value);
  return order.filter((item) => set.has(item));
}

export type FilterChip = { key: string; label: string; patch: Partial<ExplorerQuery> };

export function filterChips(query: ExplorerQuery): FilterChip[] {
  const chips: FilterChip[] = [];
  if (query.q.trim()) chips.push({ key: "q", label: `"${query.q.trim()}"`, patch: { q: "" } });
  if (query.type !== "all") chips.push({ key: "type", label: KIND_LABELS[query.type], patch: { type: "all" } });
  if (query.cats.length) chips.push({ key: "cats", label: query.cats.map((c) => DOMAIN_LABELS[c]).join(", "), patch: { cats: [] } });
  if (query.risks.length) {
    chips.push({ key: "risks", label: `Risk: ${query.risks.map((r) => OVERAGE_RISK_LABELS[r]).join(", ")}`, patch: { risks: [] } });
  }
  if (query.plans.length) {
    chips.push({ key: "plans", label: query.plans.map((p) => FREE_TIER_TYPE_LABELS[p]).join(", "), patch: { plans: [] } });
  }
  if (query.ready.length) {
    chips.push({
      key: "ready",
      label: `Good for: ${query.ready.map((r) => PRODUCTION_READINESS_LABELS[r]).join(", ")}`,
      patch: { ready: [] },
    });
  }
  if (query.noCard) chips.push({ key: "noCard", label: "No card", patch: { noCard: false } });
  if (query.hardCap) chips.push({ key: "hardCap", label: "Hard cap", patch: { hardCap: false } });
  if (query.recent) chips.push({ key: "recent", label: "Recently checked", patch: { recent: false } });
  return chips;
}
