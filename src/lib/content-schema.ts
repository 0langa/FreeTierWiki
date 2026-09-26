import {
  AUDIENCES,
  CHANGE_KINDS,
  DIFFICULTIES,
  DOMAINS,
  ENTRY_STATUSES,
  FREE_TIER_TYPES,
  OVERAGE_RISKS,
  PRICING_MODELS,
  PRODUCTION_READINESS_LEVELS,
  type AtlasEntry,
  type ContentKind,
  type EntryChange,
} from "@/types/content";

export class ContentError extends Error {
  constructor(
    readonly entryId: string,
    readonly problems: string[],
  ) {
    super(`${entryId}: ${problems.join("; ")}`);
    this.name = "ContentError";
  }
}

const BULLET_PREFIX = /^\s*[•●▪◦\-–—]\s*/;

/** Frontmatter lists sometimes hold `Key: value` lines that YAML parsed as objects. Turn every item back into text. */
export function normalizeListItem(value: unknown): string {
  if (typeof value === "string") return value.replace(BULLET_PREFIX, "").trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, inner]) => `${key}: ${inner !== null && typeof inner === "object" ? JSON.stringify(inner) : String(inner)}`)
      .join("; ");
  }
  throw new TypeError(`Cannot turn ${JSON.stringify(value)} into text`);
}

function toDateString(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    const head = value.slice(0, 10);
    const parsed = new Date(`${head}T00:00:00Z`);
    // JS rolls an impossible day (e.g. 2024-02-30) into the next month instead of failing to parse.
    // Reject anything the parsed UTC date doesn't echo back exactly.
    if (!Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === head) return head;
  }
  return undefined;
}

type ParseInput = {
  kind: ContentKind;
  slug: string;
  data: Record<string, unknown>;
};

export function parseEntry({ kind, slug, data }: ParseInput): AtlasEntry {
  const id = `${kind}:${slug}`;
  const problems: string[] = [];

  const text = (value: unknown, field: string): string => {
    if (typeof value === "string" && value.trim()) return value.trim();
    problems.push(`'${field}' must be non-empty text`);
    return "";
  };
  const optionalText = (value: unknown, field: string): string | undefined => {
    if (value == null || value === "") return undefined;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return text(value, field);
  };
  const list = (value: unknown, field: string, required = false): string[] => {
    if (value == null) {
      if (required) problems.push(`'${field}' is required`);
      return [];
    }
    if (!Array.isArray(value)) {
      problems.push(`'${field}' must be a list`);
      return [];
    }
    const items: string[] = [];
    value.forEach((item, index) => {
      try {
        const normalized = normalizeListItem(item);
        if (normalized) items.push(normalized);
      } catch {
        problems.push(`'${field}[${index}]' must be text`);
      }
    });
    return items;
  };
  const oneOf = <T extends string>(value: unknown, allowed: readonly T[], field: string, fallback?: T): T => {
    if ((value == null || value === "") && fallback !== undefined) return fallback;
    if (typeof value === "string" && (allowed as readonly string[]).includes(value)) return value as T;
    problems.push(`'${field}' must be one of: ${allowed.join(", ")}`);
    return fallback ?? allowed[0];
  };
  const flag = (value: unknown, field: string, fallback: boolean): boolean => {
    if (value == null) return fallback;
    if (typeof value === "boolean") return value;
    problems.push(`'${field}' must be true or false`);
    return fallback;
  };
  const number = (value: unknown, field: string): number => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) return Number(value);
    problems.push(`'${field}' must be a number`);
    return 0;
  };
  const optionalNumber = (value: unknown, field: string): number | undefined =>
    value == null || value === "" ? undefined : number(value, field);
  const date = (value: unknown, field: string, required: boolean): string | undefined => {
    if (value == null || value === "") {
      if (required) problems.push(`'${field}' is required`);
      return undefined;
    }
    const parsed = toDateString(value);
    if (!parsed) problems.push(`'${field}' must be a date like 2026-09-25`);
    return parsed;
  };
  const url = (value: unknown, field: string): string | undefined => {
    const raw = optionalText(value, field);
    if (raw === undefined) return undefined;
    try {
      const parsed = new URL(raw);
      if (parsed.protocol === "https:" || parsed.protocol === "http:") return raw;
    } catch {
      // reported below
    }
    problems.push(`'${field}' must be an http(s) URL`);
    return undefined;
  };

  const rawDetails = data.freeTierDetails;
  const details =
    rawDetails && typeof rawDetails === "object" && !Array.isArray(rawDetails) ? (rawDetails as Record<string, unknown>) : undefined;
  if (!details) problems.push("'freeTierDetails' is required");
  const ft = details ?? {};

  const limits = list(ft.limits, "freeTierDetails.limits", true);
  if (details && Array.isArray(ft.limits) && limits.length === 0) {
    problems.push("'freeTierDetails.limits' needs at least one item");
  }

  const audiences = list(data.audiences, "audiences").filter((value, index) => {
    if ((AUDIENCES as readonly string[]).includes(value)) return true;
    problems.push(`'audiences[${index}]' must be one of: ${AUDIENCES.join(", ")}`);
    return false;
  }) as AtlasEntry["audiences"];

  const changes: EntryChange[] = [];
  if (data.changes != null) {
    if (!Array.isArray(data.changes)) {
      problems.push("'changes' must be a list");
    } else {
      data.changes.forEach((raw, index) => {
        const change = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
        changes.push({
          date: date(change.date, `changes[${index}].date`, true) ?? "",
          kind: oneOf(change.kind, CHANGE_KINDS, `changes[${index}].kind`),
          note: text(change.note, `changes[${index}].note`),
        });
      });
      changes.sort((a, b) => b.date.localeCompare(a.date));
    }
  }

  const useCases = list(data.useCases, "useCases", true);

  const entry: AtlasEntry = {
    id,
    kind,
    slug,
    url: `/${kind}/${slug}/`,
    title: text(data.title, "title"),
    description: text(data.description, "description"),
    provider: text(data.provider, "provider"),
    category: text(data.category, "category"),
    domain: oneOf(data.domain, DOMAINS, "domain"),
    subtypes: list(data.subtypes, "subtypes"),
    audiences: data.audiences == null ? ["indie", "startup"] : audiences,
    tags: list(data.tags, "tags", true),
    pricingModel: oneOf(data.pricingModel, PRICING_MODELS, "pricingModel"),
    freeTierDetails: {
      summary: text(ft.summary, "freeTierDetails.summary"),
      limits,
      caveats: list(ft.caveats, "freeTierDetails.caveats"),
      resetPeriod: optionalText(ft.resetPeriod, "freeTierDetails.resetPeriod"),
      requiresCard: flag(ft.requiresCard, "freeTierDetails.requiresCard", false),
      freeTierType: oneOf(ft.freeTierType, FREE_TIER_TYPES, "freeTierDetails.freeTierType"),
      hasHardCap: flag(ft.hasHardCap, "freeTierDetails.hasHardCap", false),
      overageRisk: oneOf(ft.overageRisk, OVERAGE_RISKS, "freeTierDetails.overageRisk"),
      billingRiskNotes: list(ft.billingRiskNotes, "freeTierDetails.billingRiskNotes"),
      trialDays: optionalNumber(ft.trialDays, "freeTierDetails.trialDays"),
      monthlyCreditAmount: optionalText(ft.monthlyCreditAmount, "freeTierDetails.monthlyCreditAmount"),
    },
    useCases,
    whenToUse: text(data.whenToUse, "whenToUse"),
    whenNotToUse: text(data.whenNotToUse, "whenNotToUse"),
    quickstartSteps: list(data.quickstartSteps, "quickstartSteps"),
    bestFor: data.bestFor == null ? useCases : list(data.bestFor, "bestFor"),
    avoidIf: list(data.avoidIf, "avoidIf"),
    difficulty: oneOf(data.difficulty, DIFFICULTIES, "difficulty"),
    productionReadiness: oneOf(data.productionReadiness, PRODUCTION_READINESS_LEVELS, "productionReadiness"),
    lastUpdated: date(data.lastUpdated, "lastUpdated", true) ?? "",
    popularityScore: number(data.popularityScore, "popularityScore"),
    usefulnessScore: number(data.usefulnessScore, "usefulnessScore"),
    officialUrl: url(data.officialUrl, "officialUrl"),
    docsUrl: url(data.docsUrl, "docsUrl"),
    sourceUrls: list(data.sourceUrls, "sourceUrls"),
    featured: flag(data.featured, "featured", false),
    status: oneOf(data.status, ENTRY_STATUSES, "status", "active"),
    lastVerified: date(data.lastVerified, "lastVerified", false),
    pricingUrl: url(data.pricingUrl, "pricingUrl"),
    changes,
  };

  if (entry.status !== "active") {
    if (changes.length === 0) problems.push(`'status: ${entry.status}' needs at least one 'changes' item`);
    if (!entry.lastVerified) problems.push(`'status: ${entry.status}' needs 'lastVerified'`);
  }

  if (problems.length > 0) throw new ContentError(id, problems);
  return entry;
}
