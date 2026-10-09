import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { BUILD_NOW } from "@/lib/build-info";
import { DOMAIN_LABELS } from "@/lib/content";
import { getProviderGroups } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProviderGroups()).map((group) => ({ slug: group.slug }));
}

async function load(params: Params) {
  const { slug } = await params;
  return (await getProviderGroups()).find((group) => group.slug === slug);
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const group = await load(params);
  if (!group) return {};
  return {
    title: `${group.name} free tiers`,
    description: `Every ${group.name} free tier in one list: ${group.entries.length} products with their limits, card rules, and billing risk.`,
    alternates: { canonical: `/provider/${group.slug}/` },
  };
}

export default async function ProviderPage({ params }: { params: Params }) {
  const group = await load(params);
  if (!group) notFound();
  const items = group.entries.map((entry) => toListItem(entry, BUILD_NOW)).sort(compareSafety);
  const domains = [...new Set(group.entries.map((entry) => entry.domain))].sort();
  const cardCount = items.filter((item) => item.card).length;

  return (
    <div className="pt-8">
      <nav aria-label="Breadcrumb" className="flex gap-2 text-[13.5px] text-ink-3">
        <Link href="/explorer/" className="hover:text-ink">
          Explore
        </Link>
        <span aria-hidden>/</span>
        <span aria-current="page">{group.name}</span>
      </nav>
      <h1 className="mt-3 text-[28px] font-bold tracking-tight">{group.name} free tiers</h1>
      <p className="mt-2 max-w-2xl text-ink-2">
        {items.length} free tiers from {group.name}, safest first.{" "}
        {cardCount === 0 ? "None of them needs a card." : cardCount === items.length ? "All of them need a card." : `${cardCount} of them need a card.`}
      </p>
      <nav aria-label="Categories" className="mt-4 flex flex-wrap items-center gap-2 text-[13.5px] text-ink-2">
        <span>In</span>
        {domains.map((domain) => (
          <Link
            key={domain}
            href={`/category/${domain}/`}
            className="inline-flex h-7 items-center rounded-full border border-line bg-surface px-2.5 hover:border-ink-3 hover:text-ink"
          >
            {DOMAIN_LABELS[domain]}
          </Link>
        ))}
      </nav>
      <div className="mt-6">
        <EntryList items={items} label={`${group.name} free tiers`} showCap />
      </div>
    </div>
  );
}
