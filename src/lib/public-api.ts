import { DOMAIN_LABELS } from "@/lib/content";
import { pricingUrl } from "@/lib/entry-view";
import { absoluteUrl, REPO_URL } from "@/lib/links";
import {
  CONTENT_KINDS,
  DOMAINS,
  ENTRY_STATUSES,
  FREE_TIER_TYPES,
  OVERAGE_RISKS,
  PRODUCTION_READINESS_LEVELS,
  type AtlasEntry,
  type ContentKind,
  type Domain,
  type EntryStatus,
  type FreeTierType,
  type OverageRisk,
  type PolicyConfirmation,
  type ProductionReadiness,
} from "@/types/content";

/**
 * The public read-only catalog API: /api/v1/entries.json, described by /api/v1/openapi.json and
 * listed in /.well-known/api-catalog. Unlike /data/*.json, which are packed for the site's own UI,
 * these field names are a published contract. Add fields freely; rename or remove only in a /v2/.
 */
export const API_BASE = "/api/v1/";
export const ENTRIES_PATH = `${API_BASE}entries.json`;
export const OPENAPI_PATH = `${API_BASE}openapi.json`;
export const API_DOCS_URL = `${REPO_URL}/blob/main/docs/api.md`;

export type PublicEntry = {
  id: string;
  kind: ContentKind;
  name: string;
  provider: string;
  category: Domain;
  categoryName: string;
  url: string;
  markdownUrl: string;
  answer: string;
  description: string;
  status: EntryStatus;
  planType: FreeTierType;
  cardRequired: PolicyConfirmation;
  hardCap: PolicyConfirmation;
  billingRisk: OverageRisk;
  resets: string | null;
  trialDays: number | null;
  monthlyCredit: string | null;
  limits: string[];
  caveats: string[];
  billingNotes: string[];
  productionReadiness: ProductionReadiness;
  lastChecked: string | null;
  lastUpdated: string;
  pricingUrl: string | null;
  officialUrl: string | null;
  docsUrl: string | null;
  sources: string[];
};

export type PublicCatalog = {
  version: 1;
  generated: string;
  count: number;
  license: string;
  source: string;
  entries: PublicEntry[];
};

export function toPublicEntry(entry: AtlasEntry): PublicEntry {
  const details = entry.freeTierDetails;
  return {
    id: entry.id,
    kind: entry.kind,
    name: entry.title,
    provider: entry.provider,
    category: entry.domain,
    categoryName: DOMAIN_LABELS[entry.domain],
    url: absoluteUrl(entry.url),
    markdownUrl: absoluteUrl(`${entry.url}index.md`),
    answer: entry.answer,
    description: entry.description,
    status: entry.status,
    planType: details.freeTierType,
    cardRequired: details.requiresCard,
    hardCap: details.hasHardCap,
    billingRisk: details.overageRisk,
    resets: details.resetPeriod ?? null,
    trialDays: details.trialDays ?? null,
    monthlyCredit: details.monthlyCreditAmount ?? null,
    limits: details.limits,
    caveats: details.caveats,
    billingNotes: details.billingRiskNotes,
    productionReadiness: entry.productionReadiness,
    lastChecked: entry.lastVerified ?? null,
    lastUpdated: entry.lastUpdated,
    pricingUrl: pricingUrl(entry) ?? null,
    officialUrl: entry.officialUrl ?? null,
    docsUrl: entry.docsUrl ?? null,
    sources: entry.sourceUrls,
  };
}

export function publicCatalog(entries: AtlasEntry[], generated: string): PublicCatalog {
  const rows = entries.map(toPublicEntry).sort((a, b) => a.id.localeCompare(b.id));
  return { version: 1, generated, count: rows.length, license: "MIT", source: REPO_URL, entries: rows };
}

const text = (description: string) => ({ type: "string", description });
const nullable = (type: string, description: string) => ({ type: [type, "null"], description });
const list = (description: string) => ({ type: "array", items: { type: "string" }, description });
const policy = (description: string) => ({ oneOf: [{ type: "boolean" }, { type: "string", enum: ["unknown"] }], description });
const oneOf = (values: readonly string[], description: string) => ({ type: "string", enum: [...values], description });

const ENTRY_PROPERTIES = {
  id: text('Stable id, "<kind>:<slug>", for example "services:supabase".'),
  kind: oneOf(CONTENT_KINDS, "Hosted services or developer tools."),
  name: text("Product name."),
  provider: text("Company or project behind the product."),
  category: oneOf(DOMAINS, "Category slug, as in /category/<slug>/."),
  categoryName: text("Category name as shown on the site."),
  url: { type: "string", format: "uri", description: "The entry page." },
  markdownUrl: { type: "string", format: "uri", description: "The entry page as Markdown." },
  answer: text("One sentence: is it free, what you get, and whether it can bill you."),
  description: text("What the product is."),
  status: oneOf(ENTRY_STATUSES, '"changed" means the free tier changed recently; "ended" means it is gone.'),
  planType: oneOf(FREE_TIER_TYPES, "How the free offer works."),
  cardRequired: policy('Whether sign-up needs a payment card. "unknown" means the provider does not publish it clearly.'),
  hardCap: policy('Whether usage stops at the free limit instead of billing. "unknown" means not confirmed.'),
  billingRisk: oneOf(OVERAGE_RISKS, "How likely the free plan is to cost money. See https://freetier.wiki/about/."),
  resets: nullable("string", "How often the free allowance resets, for example Monthly."),
  trialDays: nullable("integer", "Trial length in days, for trials."),
  monthlyCredit: nullable("string", "Monthly credit amount, for credit plans."),
  limits: list("The free allowance, one limit per item. **Bold** marks the numbers."),
  caveats: list("Watch-out notes."),
  billingNotes: list("Notes on how billing can start."),
  productionReadiness: oneOf(PRODUCTION_READINESS_LEVELS, "What the free plan is good for."),
  lastChecked: nullable("string", "Day the entry was last compared with official sources (YYYY-MM-DD)."),
  lastUpdated: text("Day the entry data was last changed (YYYY-MM-DD)."),
  pricingUrl: nullable("string", "Official pricing page."),
  officialUrl: nullable("string", "Official website."),
  docsUrl: nullable("string", "Official documentation."),
  sources: list("Official pages the facts were checked against."),
} satisfies Record<keyof PublicEntry, unknown>;

export const OPENAPI = {
  openapi: "3.1.0",
  info: {
    title: "freetier.wiki catalog API",
    version: "1.0.0",
    summary: "Free tiers for developers: limits, card rules, hard caps, and billing risk.",
    description:
      "A read-only JSON export of every entry on freetier.wiki, rebuilt with the site. No key or sign-up. "
      + "Every page is also available as Markdown: request it with Accept: text/markdown, or add index.md to the page URL.",
    license: { name: "MIT", identifier: "MIT" },
    contact: { name: "freetier.wiki", url: `${REPO_URL}/issues` },
  },
  externalDocs: { description: "API guide", url: API_DOCS_URL },
  servers: [{ url: absoluteUrl("/") }],
  paths: {
    [ENTRIES_PATH]: {
      get: {
        operationId: "listEntries",
        summary: "Every catalog entry",
        description: "The whole catalog in one file, sorted by id. Filter it on your side.",
        responses: {
          "200": {
            description: "The catalog.",
            content: { "application/json": { schema: { $ref: "#/components/schemas/Catalog" } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Catalog: {
        type: "object",
        required: ["version", "generated", "count", "license", "source", "entries"],
        properties: {
          version: { type: "integer", const: 1, description: "Format version; matches the /v1/ in the path." },
          generated: text("Build day (YYYY-MM-DD)."),
          count: { type: "integer", description: "Number of entries." },
          license: text("License of the data."),
          source: { type: "string", format: "uri", description: "Source repository." },
          entries: { type: "array", items: { $ref: "#/components/schemas/Entry" } },
        },
      },
      Entry: {
        type: "object",
        required: Object.keys(ENTRY_PROPERTIES),
        properties: ENTRY_PROPERTIES,
      },
    },
  },
};
