import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { ChipRow, PageHeader } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { DOMAIN_LABELS, isDomain } from "@/lib/content";
import { comparisonsForDomain, jobLabel } from "@/lib/comparison-view";
import { getAllEntries, getComparisons, getProviderGroups } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";

type Params = Promise<{ domain: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const domains = new Set((await getAllEntries()).map((entry) => entry.domain));
  return [...domains].map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { domain } = await params;
  if (!isDomain(domain)) return {};
  const label = DOMAIN_LABELS[domain];
  return {
    title: `Free ${label} tiers`,
    description: `Free ${label.toLowerCase()} plans for developers: limits, card rules, billing risk, and how fresh each entry is.`,
    alternates: { canonical: `/category/${domain}/` },
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { domain } = await params;
  if (!isDomain(domain)) notFound();
  const label = DOMAIN_LABELS[domain];
  const all = await getAllEntries();
  const comparisons = comparisonsForDomain(domain, await getComparisons(), new Map(all.map((entry) => [entry.id, entry.domain])));
  const providers = (await getProviderGroups()).filter((group) => group.entries.some((entry) => entry.domain === domain));
  const items = all
    .filter((entry) => entry.domain === domain)
    .map((entry) => toListItem(entry, BUILD_NOW))
    .sort(compareSafety);
  const activeCount = items.filter((item) => item.status !== "ended").length;

  return (
    <div>
      <PageHeader
        crumbs={[{ href: "/explorer/", label: "Explore" }]}
        current={label}
        title={`Free ${label} tiers`}
        lede={`${activeCount} free tiers, safest first. Each one shows the limits, whether it needs a card, and how fresh the data is.`}
      >
        {comparisons.length > 0 ? (
          <ChipRow label="Compare side by side" name="Comparison tables">
            {comparisons.map((comparison) => (
              <Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="chip">
                {jobLabel(comparison.title)}
              </Link>
            ))}
          </ChipRow>
        ) : null}
        {providers.length > 0 ? (
          <ChipRow label="By provider" name="Providers">
            {providers.map((group) => (
              <Link key={group.slug} href={`/provider/${group.slug}/`} className="chip">
                {group.name}
              </Link>
            ))}
          </ChipRow>
        ) : null}
      </PageHeader>
      <div className="mt-7">
        {items.length > 0 ? (
          <EntryList items={items} label={`Free ${label} tiers`} />
        ) : (
          <p className="rounded-2xl border border-dashed border-line p-6 text-sm text-ink-3">No entries in this category yet.</p>
        )}
      </div>
      <p className="mt-6 text-[14.5px]">
        <Link href={`/explorer/?cat=${domain}`} className="text-ink-2 underline underline-offset-[3px] hover:text-ink">
          Filter these in the Explorer →
        </Link>
      </p>
    </div>
  );
}
