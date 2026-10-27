import type { Metadata } from "next";
import Link from "next/link";

import { DomainIcon } from "@/components/site/icons";
import { JsonLd } from "@/components/site/json-ld";
import { PageHeader } from "@/components/site/page-header";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries } from "@/lib/content.server";
import { pageUrl } from "@/lib/metadata";
import { collectionPage } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Free developer tools by category",
  description: "Browse free developer plans, credits, and trials by category, from hosting and databases to authentication and analytics.",
  ...pageUrl("/category/"),
};

export default async function CategoriesPage() {
  const entries = await getAllEntries();
  const categories = [...new Set(entries.map((entry) => entry.domain))]
    .sort((a, b) => DOMAIN_LABELS[a].localeCompare(DOMAIN_LABELS[b]))
    .map((domain) => {
      const items = entries.filter((entry) => entry.domain === domain);
      const examples = items
        .filter((entry) => entry.status !== "ended")
        .sort((a, b) => a.title.localeCompare(b.title))
        .slice(0, 3)
        .map((entry) => entry.title);
      return { domain, count: items.length, examples };
    });

  return (
    <div>
      <PageHeader
        crumbs={[{ href: "/", label: "Home" }]}
        current="Categories"
        title="Browse by category"
        lede={`${entries.length} services and tools across ${categories.length} categories. Find plans for your next project, with their limits, card rules, and billing risks in view.`}
      />
      <JsonLd graph={[collectionPage("/category/", "Browse by category", categories.map(({ domain }) => ({ title: DOMAIN_LABELS[domain], url: `/category/${domain}/` })))]} />
      <nav aria-label="All categories" className="tile-grid mt-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.domain} href={`/category/${category.domain}/`} className="flex items-start gap-3 bg-surface px-5 py-5 transition-colors hover:bg-surface-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2">
              <DomainIcon domain={category.domain} className="h-5 w-5" />
            </span>
            <span className="grid min-w-0 gap-1">
              <span className="text-[16px] font-semibold">{DOMAIN_LABELS[category.domain]}</span>
              <span className="font-mono text-[12.5px] text-ink-3">{category.count} listings</span>
              {category.examples.length > 0 ? <span className="text-[13px] text-ink-2">{category.examples.join(", ")}</span> : null}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
