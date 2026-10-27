import type { Metadata } from "next";
import Link from "next/link";

import { EntryList } from "@/components/entry/entry-list";
import { DomainIcon } from "@/components/site/icons";
import { JsonLd } from "@/components/site/json-ld";
import { ChipRow, PageHeader } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";
import { FILTER_PAGES, filterDomains, filterItems, otherFilter, type FilterSlug } from "@/lib/filter-pages";
import { pageUrl } from "@/lib/metadata";
import { collectionPage } from "@/lib/structured-data";

// The hub shows this many entries; the category pages and the explorer have the rest.
const PICKS = 10;

async function load(filter: FilterSlug) {
  const all = (await getAllEntries()).map((entry) => toListItem(entry, BUILD_NOW));
  return { all, matching: filterItems(all, filter).sort(compareSafety) };
}

export async function filterHubMetadata(filter: FilterSlug): Promise<Metadata> {
  const { matching } = await load(filter);
  const page = FILTER_PAGES[filter];
  return {
    title: page.hubTitle,
    description: `${matching.length} free developer plans ${page.promise}, by category: ${page.facts}.`,
    ...pageUrl(`/${filter}/`),
  };
}

/** One filter across the catalog: a tile per category that has its own page, then the safest matches. */
export async function FilterHub({ filter }: { filter: FilterSlug }) {
  const { all, matching } = await load(filter);
  const page = FILTER_PAGES[filter];
  const other = otherFilter(filter);
  const tiles = filterDomains(all, filter)
    .map((domain) => ({
      domain,
      count: matching.filter((item) => item.domain === domain).length,
      total: all.filter((item) => item.domain === domain && item.status !== "ended").length,
    }))
    .sort((a, b) => b.count - a.count || DOMAIN_LABELS[a.domain].localeCompare(DOMAIN_LABELS[b.domain]));

  return (
    <div>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }]}
        current={page.name}
        title={page.hubHeading}
        lede={`${matching.length} free tiers ${page.promise}. Pick a category to see its list, safest first. Entries whose policy is not confirmed are left out.`}
      >
        <ChipRow label="See also" name="Related lists">
          <Link href={`/${other}/`} className="chip">
            {FILTER_PAGES[other].hubHeading}
          </Link>
          <Link href="/about/" className="chip">
            How we rate
          </Link>
        </ChipRow>
      </PageHeader>
      <JsonLd graph={[collectionPage(`/${filter}/`, page.hubHeading, tiles.map(({ domain }) => ({ title: DOMAIN_LABELS[domain], url: `/category/${domain}/${filter}/` })))]} />
      {/* Two columns on phones, like the home page categories, so 20 tiles stay within a few screens. */}
      <nav aria-label="Categories" className="tile-grid mt-7 grid-cols-2 lg:grid-cols-4">
        {tiles.map((tile) => (
          <Link
            key={tile.domain}
            href={`/category/${tile.domain}/${filter}/`}
            className="flex items-start gap-3 bg-surface px-3.5 py-4 transition-colors hover:bg-surface-2 sm:px-5 sm:py-5"
          >
            <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2 sm:grid">
              <DomainIcon domain={tile.domain} className="h-5 w-5" />
            </span>
            <span className="grid min-w-0 gap-1">
              <span className="text-[16px] font-semibold">{DOMAIN_LABELS[tile.domain]}</span>
              <span className="font-mono text-[12.5px] text-ink-3">
                {tile.count} of {tile.total} free tiers
              </span>
            </span>
          </Link>
        ))}
      </nav>
      <section className="mt-14" aria-labelledby="picks-title">
        <h2 id="picks-title" className="mb-5 text-[22px] font-semibold tracking-tight sm:text-[24px]">
          Safest picks
        </h2>
        <EntryList items={matching.slice(0, PICKS)} showCap label={`Safest picks: ${page.name}`} />
      </section>
      <p className="mt-6 text-[14.5px]">
        <Link href={`/explorer/?${page.param}`} className="text-ink-2 underline underline-offset-[3px] hover:text-ink">
          See all {matching.length} in the Explorer →
        </Link>
      </p>
    </div>
  );
}
