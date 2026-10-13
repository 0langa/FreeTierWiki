import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { PageHeader } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { getAllEntries, getComparison, getComparisons } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getComparisons()).map((comparison) => ({ slug: comparison.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const comparison = await getComparison(slug);
  if (!comparison) return {};
  return {
    title: comparison.title,
    description: comparison.intro,
    alternates: { canonical: `/compare/${slug}/` },
  };
}

export default async function ComparePage({ params }: { params: Params }) {
  const { slug } = await params;
  const comparison = await getComparison(slug);
  if (!comparison) notFound();
  const wanted = new Set(comparison.entries);
  const items = (await getAllEntries())
    .filter((entry) => wanted.has(entry.id) && entry.status !== "ended")
    .map((entry) => toListItem(entry, BUILD_NOW))
    .sort(compareSafety);

  return (
    <div>
      <PageHeader crumbs={[{ href: "/compare/", label: "Compare" }]} current={comparison.title} title={comparison.title} lede={comparison.intro}>
        <p className="max-w-[64ch] text-[14px] leading-relaxed text-ink-3">
          {items.length} free tiers, safest first. Picked by hand; the facts come from each entry and its last check. A hard cap means the
          service stops at the limit; a soft cap means it keeps going and may bill you.
        </p>
      </PageHeader>
      <div className="mt-7">
        <EntryList items={items} showCap label={comparison.title} />
      </div>
    </div>
  );
}
