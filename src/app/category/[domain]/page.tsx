import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
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
    <div className="pt-8">
      <nav aria-label="Breadcrumb" className="flex gap-2 text-[13.5px] text-ink-3">
        <Link href="/explorer/" className="hover:text-ink">
          Explore
        </Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{label}</span>
      </nav>
      <h1 className="mt-3 text-[28px] font-bold tracking-tight">Free {label} tiers</h1>
      <p className="mt-2 max-w-2xl text-ink-2">
        {activeCount} free tiers, safest first. Each one shows the limits, whether it needs a card, and how fresh the data is.
      </p>
      {comparisons.length > 0 ? (
        <nav aria-label="Comparison tables" className="mt-4 flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
          <span>Compare side by side</span>
          {comparisons.map((comparison) => (
            <Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-2.5 hover:border-ink-3 hover:text-ink">
              {jobLabel(comparison.title)}
            </Link>
          ))}
        </nav>
      ) : null}
      {providers.length > 0 ? (
        <nav aria-label="Providers" className="mt-3 flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
          <span>By provider</span>
          {providers.map((group) => (
            <Link key={group.slug} href={`/provider/${group.slug}/`} className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-2.5 hover:border-ink-3 hover:text-ink">
              {group.name}
            </Link>
          ))}
        </nav>
      ) : null}
      <div className="mt-6">
        {items.length > 0 ? (
          <EntryList items={items} label={`Free ${label} tiers`} />
        ) : (
          <p className="rounded-xl border border-dashed border-line p-6 text-sm text-ink-3">No entries in this category yet.</p>
        )}
      </div>
      <p className="mt-6 text-sm">
        <Link href={`/explorer/?cat=${domain}`} className="text-ink-2 underline underline-offset-2 hover:text-ink">
          Filter these in the Explorer →
        </Link>
      </p>
    </div>
  );
}
