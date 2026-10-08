import type { MetadataRoute } from "next";

import { getAllEntries, getComparisons } from "@/lib/content.server";
import { absoluteUrl } from "@/lib/links";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getAllEntries();
  const comparisons = await getComparisons();
  const domains = [...new Set(entries.map((entry) => entry.domain))];
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/explorer/"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/changelog/"), changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.4 },
    { url: absoluteUrl("/compare/"), changeFrequency: "weekly", priority: 0.8 },
    ...comparisons.map((comparison) => ({ url: absoluteUrl(`/compare/${comparison.slug}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...domains.map((domain) => ({ url: absoluteUrl(`/category/${domain}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
    ...entries.map((entry) => ({
      url: absoluteUrl(entry.url),
      lastModified: entry.lastVerified ?? entry.lastUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
