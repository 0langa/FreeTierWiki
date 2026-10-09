import type { Comparison } from "@/lib/comparisons-file";

/** A comparison table as a card: its link, a short job label, and how many live entries it holds. */
export type ComparisonCard = Pick<Comparison, "slug" | "title" | "intro"> & { href: string; label: string; count: number };

/**
 * "Free Postgres hosting compared" reads as a job once the frame words are gone: "Postgres hosting".
 * Everything on the site is free, so "Free" carries nothing in a list of jobs.
 */
export function jobLabel(title: string): string {
  const core = title.replace(/^free\s+/i, "").replace(/\s+compared$/i, "");
  return core.charAt(0).toUpperCase() + core.slice(1);
}

export function liveComparisons(comparisons: Comparison[], liveIds: ReadonlySet<string>): ComparisonCard[] {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
    href: `/compare/${comparison.slug}/`,
    title: comparison.title,
    label: jobLabel(comparison.title),
    intro: comparison.intro,
    count: comparison.entries.filter((id) => liveIds.has(id)).length,
  }));
}

/** The comparison tables an entry appears in, in file order. */
export function comparisonsFor(entryId: string, comparisons: Comparison[]): Comparison[] {
  return comparisons.filter((comparison) => comparison.entries.includes(entryId));
}

/** Comparison tables where most entries belong to one category, for that category's page. */
export function comparisonsForDomain(domain: string, comparisons: Comparison[], domainOf: ReadonlyMap<string, string>): Comparison[] {
  return comparisons.filter((comparison) => {
    const inDomain = comparison.entries.filter((id) => domainOf.get(id) === domain).length;
    return inDomain > 0 && inDomain * 2 >= comparison.entries.length;
  });
}
