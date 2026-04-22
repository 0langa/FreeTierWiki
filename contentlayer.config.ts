import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

const FreeTierDetails = defineNestedType(() => ({
  name: "FreeTierDetails",
  fields: {
    summary: { type: "string", required: true },
    limits: { type: "list", of: { type: "string" }, required: true },
    caveats: { type: "list", of: { type: "string" }, required: false },
    resetPeriod: { type: "string", required: false },
    requiresCard: { type: "boolean", required: false, default: false },
  },
}));

const RatingBreakdown = defineNestedType(() => ({
  name: "RatingBreakdown",
  fields: {
    onboarding: { type: "number", required: true },
    reliability: { type: "number", required: true },
    ecosystem: { type: "number", required: true },
    valueDensity: { type: "number", required: true },
  },
}));

const BaseFields = {
  title: { type: "string", required: true },
  description: { type: "string", required: true },
  provider: { type: "string", required: true },
  category: { type: "string", required: true },
  tags: { type: "list", of: { type: "string" }, required: true },
  pricingModel: { type: "enum", options: ["free", "freemium", "trial"], required: true },
  freeTierDetails: { type: "nested", of: FreeTierDetails, required: true },
  useCases: { type: "list", of: { type: "string" }, required: true },
  difficulty: {
    type: "enum",
    options: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  lastUpdated: { type: "date", required: true },
  popularityScore: { type: "number", required: true },
  usefulnessScore: { type: "number", required: true },
  ratingBreakdown: { type: "nested", of: RatingBreakdown, required: false },
  officialUrl: { type: "string", required: false },
  docsUrl: { type: "string", required: false },
  featured: { type: "boolean", required: false, default: false },
} as const;

const computedFields = {
  slug: {
    type: "string" as const,
    resolve: (doc: { _raw: { flattenedPath: string } }) =>
      doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  kind: {
    type: "string" as const,
    resolve: (doc: { _raw: { sourceFileDir: string } }) => doc._raw.sourceFileDir,
  },
  url: {
    type: "string" as const,
    resolve: (doc: { _raw: { sourceFileDir: string; flattenedPath: string } }) => {
      const slug = doc._raw.flattenedPath.split("/").slice(1).join("/");
      return `/${doc._raw.sourceFileDir}/${slug}`;
    },
  },
} as const;

const Services = defineDocumentType(() => ({
  name: "Service",
  filePathPattern: "services/**/*.mdx",
  contentType: "mdx",
  fields: BaseFields,
  computedFields,
}));

const Tools = defineDocumentType(() => ({
  name: "Tool",
  filePathPattern: "tools/**/*.mdx",
  contentType: "mdx",
  fields: BaseFields,
  computedFields,
}));

const Resources = defineDocumentType(() => ({
  name: "Resource",
  filePathPattern: "resources/**/*.mdx",
  contentType: "mdx",
  fields: BaseFields,
  computedFields,
}));

const Guides = defineDocumentType(() => ({
  name: "Guide",
  filePathPattern: "guides/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...BaseFields,
    estimatedTime: { type: "string", required: false },
    prerequisites: { type: "list", of: { type: "string" }, required: false },
  },
  computedFields,
}));

const Playbooks = defineDocumentType(() => ({
  name: "Playbook",
  filePathPattern: "playbooks/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...BaseFields,
    objective: { type: "string", required: true },
  },
  computedFields,
}));

const Comparisons = defineDocumentType(() => ({
  name: "Comparison",
  filePathPattern: "comparisons/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...BaseFields,
    comparedProviders: { type: "list", of: { type: "string" }, required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Services, Tools, Resources, Guides, Playbooks, Comparisons],
});
