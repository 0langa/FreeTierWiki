import type {
  Comparison,
  Guide,
  Playbook,
  Resource,
  Service,
  Tool,
} from "contentlayer/generated";

export const CONTENT_KINDS = [
  "services",
  "tools",
  "resources",
  "guides",
  "playbooks",
  "comparisons",
] as const;

export type ContentKind = (typeof CONTENT_KINDS)[number];
export type AtlasEntry = Service | Tool | Resource | Guide | Playbook | Comparison;

export type FilterDifficulty = "beginner" | "intermediate" | "advanced";

export type SearchRecord = {
  id: string;
  url: string;
  slug: string;
  kind: ContentKind;
  title: string;
  description: string;
  provider: string;
  tags: string[];
  content: string;
};

export type RegistryItem = {
  value: string;
  count: number;
};