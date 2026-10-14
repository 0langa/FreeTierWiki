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

// Filler words no one filters by; dropping them keeps the explorer JSON small.
const STOP_WORDS = new Set(["a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "in", "is", "it", "its", "of", "on", "or", "that", "the", "to", "with", "you", "your"]);

/** Each search word once, lowercase. Search matches words by substring, so order and repeats do not matter. */
export function searchWords(parts: string[]): string {
  const words = parts
    .join(" ")
    .toLowerCase()
    .split(/[^\p{L}\p{N}.+#-]+/u)
    .map((word) => word.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((word) => word && !STOP_WORDS.has(word));
  return [...new Set(words)].join(" ");
}

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
    haystack: searchWords([entry.title, entry.provider, DOMAIN_LABELS[entry.domain], entry.description, ...entry.tags]),
    rank: Math.round((entry.usefulnessScore * 0.65 + entry.popularityScore * 0.35) * 10) / 10,
  };
}

/**
 * A list row as shipped in explorer.json. `url` and `kind` are left out because the id carries both.
 * The haystack leaves out every word that sits inside a longer haystack word or inside the title,
 * provider, or category name: search matches words by substring, so those words never change what a
 * query finds, and the browser rebuilds the last three from the row.
 */
export type ExplorerRow = Omit<ListItem, "url" | "kind">;

/** Words the browser can rebuild from the row itself, so the shipped haystack leaves them out. */
function namedWords(row: Pick<ExplorerRow, "title" | "provider" | "domain">): string {
  return searchWords([row.title, row.provider, DOMAIN_LABELS[row.domain]]);
}

export function toExplorerRow(item: ListItem): ExplorerRow {
  const { url, kind, ...row } = item;
  void url;
  void kind;
  const named = namedWords(item).split(" ");
  const words = item.haystack.split(" ");
  const pool = [...words, ...named];
  const haystack = words.filter((word) => !pool.some((other) => other !== word && other.includes(word)) && !named.includes(word));
  return { ...row, haystack: haystack.join(" ") };
}

/** Rebuilds `kind` and `url` from an id such as `services:neon`, and puts the title, provider, and category back into the haystack. */
export function fromExplorerRow(row: ExplorerRow): ListItem {
  const [kind, slug] = row.id.split(":") as [ContentKind, string];
  const haystack = [namedWords(row), row.haystack].filter(Boolean).join(" ");
  return { ...row, kind, url: `/${kind}/${slug}/`, haystack };
}

/**
 * explorer.json, one array per field instead of one object per row, so the field names are not repeated
 * for every entry (about 15% of the gzipped file). Row `i` is made of the `i`th value of every array.
 */
export type ExplorerData = { [Field in keyof ExplorerRow]: ExplorerRow[Field][] };

// Every ExplorerRow field once. The Record type makes the compiler flag a field added to ListItem but not here.
const EXPLORER_FIELDS = Object.keys({
  id: 0,
  title: 0,
  provider: 0,
  domain: 0,
  offer: 0,
  risk: 0,
  card: 0,
  cap: 0,
  plan: 0,
  ready: 0,
  status: 0,
  freshness: 0,
  haystack: 0,
  rank: 0,
} satisfies Record<keyof ExplorerRow, 0>) as (keyof ExplorerRow)[];

export function toExplorerData(items: ListItem[]): ExplorerData {
  const rows = items.map(toExplorerRow);
  return Object.fromEntries(EXPLORER_FIELDS.map((field) => [field, rows.map((row) => row[field])])) as ExplorerData;
}

/** Turns explorer.json back into list items. Throws on any other shape, such as the row array an older build shipped. */
export function fromExplorerData(data: unknown): ListItem[] {
  const columns = (data ?? {}) as Partial<Record<keyof ExplorerRow, unknown>>;
  const count = Array.isArray(columns.id) ? columns.id.length : -1;
  const complete = EXPLORER_FIELDS.every((field) => {
    const column = columns[field];
    return Array.isArray(column) && column.length === count;
  });
  if (!complete) throw new Error("explorer.json does not have the expected columns");
  const table = columns as ExplorerData;
  return Array.from({ length: count }, (_, index) =>
    fromExplorerRow(Object.fromEntries(EXPLORER_FIELDS.map((field) => [field, table[field][index]])) as ExplorerRow),
  );
}

/** Other live entries in the same category, safest first. Ended offers are never suggested. */
export function relatedItems(entry: AtlasEntry, all: AtlasEntry[], now: Date, limit = 4): ListItem[] {
  return all
    .filter((other) => other.domain === entry.domain && other.id !== entry.id && other.status !== "ended")
    .map((other) => toListItem(other, now))
    .sort(compareSafety)
    .slice(0, limit);
}
