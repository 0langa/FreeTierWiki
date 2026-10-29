import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryList } from "@/components/entry/entry-list";
import { FaqList } from "@/components/site/faq-list";
import { JsonLd } from "@/components/site/json-ld";
import { ChipRow, PageHeader } from "@/components/site/page-header";
import { BUILD_NOW } from "@/lib/build-info";
import { filterDescription, filterFaqs, filterIntro } from "@/lib/category-filters";
import { DOMAIN_LABELS, isDomain } from "@/lib/content";
import { getAllEntries } from "@/lib/content.server";
import { compareSafety, toListItem } from "@/lib/entry-view";
import { categoryFilterTitle, FILTER_PAGES, FILTER_SLUGS, filterDomains, filterItems, isFilterSlug, otherFilter } from "@/lib/filter-pages";
import { pageUrl } from "@/lib/metadata";
import { collectionPage, faqPage } from "@/lib/structured-data";

type Params = Promise<{ domain: string; filter: string }>;

export const dynamicParams = false;

async function catalog() {
  const entries = await getAllEntries();
  return { entries, items: entries.map((entry) => toListItem(entry, BUILD_NOW)) };
}

export async function generateStaticParams() {
  const { items } = await catalog();
  return FILTER_SLUGS.flatMap((filter) => filterDomains(items, filter).map((domain) => ({ domain, filter })));
}

async function load(params: Params) {
  const { domain, filter } = await params;
  if (!isDomain(domain) || !isFilterSlug(filter)) return undefined;
  const { entries, items: all } = await catalog();
  const items = filterItems(all, filter)
    .filter((item) => item.domain === domain)
    .sort(compareSafety);
  const ids = new Set(items.map((item) => item.id));
  const onPage = entries.filter((entry) => ids.has(entry.id));
  return { domain, filter, items, all, onPage };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await load(params);
  if (!page) return {};
  return {
    title: `Free ${DOMAIN_LABELS[page.domain]}: ${page.filter === "no-card" ? "no card" : "hard cap"}`,
    description: filterDescription(page.domain, page.filter, page.onPage),
    ...pageUrl(`/category/${page.domain}/${page.filter}/`),
  };
}

export default async function CategoryFilterPage({ params }: { params: Params }) {
  const page = await load(params);
  if (!page) notFound();
  const { domain, filter, items, all, onPage } = page;
  const faqs = filterFaqs(domain, filter, onPage);
  const label = DOMAIN_LABELS[domain];
  const title = categoryFilterTitle(label, filter);
  const other = otherFilter(filter);
  const otherHasPage = filterDomains(all, other).includes(domain);

  return (
    <div>
      <PageHeader
        crumbs={[
          { href: "/category/", label: "Categories" },
          { href: `/category/${domain}/`, label },
        ]}
        current={FILTER_PAGES[filter].name}
        title={title}
        lede={filterIntro(domain, filter, onPage)}
        note={`${items.length} free tiers ${FILTER_PAGES[filter].promise}, safest first. Each one shows ${FILTER_PAGES[filter].rest}.`}
      >
        <ChipRow label="See also" name="Related lists">
          {otherHasPage ? (
            <Link href={`/category/${domain}/${other}/`} className="chip">
              {FILTER_PAGES[other].name}
            </Link>
          ) : null}
          <Link href={`/category/${domain}/`} className="chip">
            All {label} tiers
          </Link>
          <Link href={`/${filter}/`} className="chip">
            {FILTER_PAGES[filter].name} in every category
          </Link>
        </ChipRow>
      </PageHeader>
      <JsonLd graph={[collectionPage(`/category/${domain}/${filter}/`, title, items), faqPage(`/category/${domain}/${filter}/`, faqs)]} />
      <div className="mt-7">
        <EntryList items={items} showCap label={title} />
      </div>
      <FaqList items={faqs} />
      <p className="mt-6 text-[14.5px]">
        <Link href={`/explorer/?cat=${domain}&${FILTER_PAGES[filter].param}`} className="text-ink-2 underline underline-offset-[3px] hover:text-ink">
          Filter these in the Explorer →
        </Link>
      </p>
    </div>
  );
}
