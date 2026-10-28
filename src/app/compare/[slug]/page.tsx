import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { getAllEntries, getComparison, getComparisons } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";
import { pageUrl } from "@/lib/metadata";
import { article, itemList } from "@/lib/structured-data";

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
    description: comparison.intro.length < 110 ? `${comparison.intro} Compare card rules and billing risks.` : comparison.intro,
    ...pageUrl(`/compare/${slug}/`),
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
          service stops at the free limit. No hard cap does not imply charges; the risk column describes billing risk.
        </p>
      </PageHeader>
      <JsonLd graph={[{
        ...article(`/compare/${slug}/`, comparison.title, comparison.intro),
        about: itemList(comparison.title, items),
      }]} />
      <div className="mt-7">
        <EntryList items={items} showCap label={comparison.title} />
      </div>
    </div>
  );
}
