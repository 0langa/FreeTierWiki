export const CONTENT_KINDS = ["services", "tools"] as const;
export type ContentKind = (typeof CONTENT_KINDS)[number];

export const PRICING_MODELS = ["free", "freemium", "trial"] as const;
export type PricingModel = (typeof PRICING_MODELS)[number];

export const DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;
export type FilterDifficulty = (typeof DIFFICULTIES)[number];

export const DOMAINS = [
  "hosting",
  "compute",
  "database",
  "storage",
  "auth",
  "messaging",
  "observability",
  "ai",
  "devops",
  "security",
  "networking",
  "productivity",
  "learning",
  "design",
  "analytics",
  "integration",
  "operations",
  "other",
] as const;
export type Domain = (typeof DOMAINS)[number];

export const FREE_TIER_TYPES = ["always-free", "credit", "trial", "time-limited"] as const;
export type FreeTierType = (typeof FREE_TIER_TYPES)[number];

export const OVERAGE_RISKS = ["none", "low", "medium", "high"] as const;
export type OverageRisk = (typeof OVERAGE_RISKS)[number];

export const PRODUCTION_READINESS_LEVELS = ["prototype", "side-project", "production-light", "production-ready"] as const;
export type ProductionReadiness = (typeof PRODUCTION_READINESS_LEVELS)[number];

export const AUDIENCES = ["student", "indie", "startup", "team", "enterprise", "oss", "agency"] as const;
export type Audience = (typeof AUDIENCES)[number];

export const ENTRY_STATUSES = ["active", "changed", "ended"] as const;
export type EntryStatus = (typeof ENTRY_STATUSES)[number];

export const CHANGE_KINDS = ["ended", "changed", "new"] as const;
export type ChangeKind = (typeof CHANGE_KINDS)[number];

export type EntryChange = {
  date: string;
  kind: ChangeKind;
  note: string;
};

export type FreeTierDetails = {
  summary: string;
  limits: string[];
  caveats: string[];
  resetPeriod?: string;
  requiresCard: boolean;
  freeTierType: FreeTierType;
  hasHardCap: boolean;
  overageRisk: OverageRisk;
  billingRiskNotes: string[];
  trialDays?: number;
  monthlyCreditAmount?: string;
};

export type AtlasEntry = {
  id: string;
  kind: ContentKind;
  slug: string;
  url: string;

  title: string;
  description: string;
  provider: string;
  category: string;
  domain: Domain;
  subtypes: string[];
  audiences: Audience[];
  tags: string[];
  pricingModel: PricingModel;
  freeTierDetails: FreeTierDetails;
  useCases: string[];
  whenToUse: string;
  whenNotToUse: string;
  quickstartSteps: string[];
  bestFor: string[];
  avoidIf: string[];
  difficulty: FilterDifficulty;
  productionReadiness: ProductionReadiness;
  lastUpdated: string;
  popularityScore: number;
  usefulnessScore: number;
  officialUrl?: string;
  docsUrl?: string;
  sourceUrls: string[];
  featured: boolean;

  status: EntryStatus;
  lastVerified?: string;
  pricingUrl?: string;
  changes: EntryChange[];
};

export type AtlasEntryWithBody = AtlasEntry & {
  body: {
    raw: string;
  };
};

export type RegistryItem = {
  value: string;
  count: number;
};

export type SearchRecord = {
  id: string;
  url: string;
  title: string;
  provider: string;
  domain: Domain;
  description: string;
  tags: string[];
};
