import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { ChipRow, PageHeader } from "@/components/site/page-header";
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
  const cardNote = cardCount === 0 ? "None of them needs a card." : cardCount === items.length ? "All of them need a card." : `${cardCount} of them need a card.`;

  return (
    <div>
      <PageHeader
        crumbs={[{ href: "/explorer/", label: "Explore" }]}
        current={group.name}
        title={`${group.name} free tiers`}
        lede={`${items.length} free tiers from ${group.name}, safest first. ${cardNote}`}
      >
        <ChipRow label="In" name="Categories">
          {domains.map((domain) => (
            <Link key={domain} href={`/category/${domain}/`} className="chip">
              {DOMAIN_LABELS[domain]}
            </Link>
          ))}
        </ChipRow>
      </PageHeader>
      <div className="mt-7">
        <EntryList items={items} label={`${group.name} free tiers`} showCap />
      </div>
    </div>
  );
}
