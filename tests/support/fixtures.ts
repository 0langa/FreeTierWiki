import type { ListItem } from "@/lib/entry-view";
import type { AtlasEntry } from "@/types/content";

export function makeEntry(overrides: Partial<AtlasEntry> = {}): AtlasEntry {
  return {
    id: "services:neon",
    kind: "services",
    slug: "neon",
    url: "/services/neon/",
    title: "Neon",
    description: "Serverless Postgres.",
    provider: "Neon",
    category: "database",
    domain: "database",
    subtypes: [],
    audiences: ["indie"],
    tags: ["postgres", "sql"],
    pricingModel: "freemium",
    freeTierDetails: {
      summary: "Free plan.",
      limits: ["0.5 GB storage", "1 project", "190 compute hours", "10 branches"],
      caveats: [],
      requiresCard: false,
      freeTierType: "always-free",
      hasHardCap: true,
      overageRisk: "none",
      billingRiskNotes: [],
    },
    useCases: [],
    whenToUse: "Small apps.",
    whenNotToUse: "Large apps.",
    quickstartSteps: [],
    bestFor: [],
    avoidIf: [],
    difficulty: "beginner",
    productionReadiness: "side-project",
    lastUpdated: "2024-06-09",
    popularityScore: 8,
    usefulnessScore: 8,
    officialUrl: "https://neon.tech/",
    sourceUrls: ["https://neon.tech/docs", "https://neon.tech/pricing"],
    featured: false,
    status: "active",
    changes: [],
    ...overrides,
  };
}

export function makeItem(overrides: Partial<ListItem> = {}): ListItem {
  return {
    id: "services:neon",
    url: "/services/neon/",
    kind: "services",
    title: "Neon",
    provider: "Neon",
    domain: "database",
    offer: ["0.5 GB storage"],
    risk: "none",
    card: false,
    cap: true,
    plan: "always-free",
    ready: "side-project",
    status: "active",
    freshness: { state: "imported", date: "2024-06-09" },
    haystack: "neon neon database serverless postgres. postgres sql",
    ...overrides,
  };
}
