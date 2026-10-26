import Link from "next/link";

import { DomainIcon, JobIcon } from "@/components/site/icons";
import type { NavData } from "@/lib/nav-data";

// Menu links skip viewport prefetching: an open menu shows up to 25 links at once.
const ROW = "flex items-center gap-2.5 rounded-lg px-2 py-2 text-[14px] text-ink transition-colors hover:bg-surface-2";
const TEXT_LINK = "text-[14px] text-ink-2 underline decoration-line underline-offset-[3px] hover:text-ink hover:decoration-ink";
const MORE = `mt-2 inline-flex px-2 ${TEXT_LINK}`;
const COUNT = "font-mono text-[12px] text-ink-3";

/** The Explore menu: every category, the quick lists, and the biggest providers. */
export function ExplorePanel({ nav }: { nav: NavData }) {
  return (
    <div className="container-x grid gap-x-12 gap-y-6 py-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-7">
      <div className="min-w-0">
        <p className="eyebrow mb-2 px-2">Categories</p>
        <ul aria-label="Categories" className="grid grid-cols-2 gap-x-4 sm:grid-cols-3 xl:grid-cols-4">
          {nav.categories.map((category) => (
            <li key={category.domain} className="min-w-0">
              <Link href={`/category/${category.domain}/`} prefetch={false} className={ROW}>
                <DomainIcon domain={category.domain} className="h-4 w-4 shrink-0 text-ink-3" />
                <span className="min-w-0 flex-1 truncate">{category.label}</span>
                <span className={COUNT}>{category.count}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/category/" prefetch={false} className={MORE}>
          All categories →
        </Link>
      </div>
      <div className="grid content-start gap-6">
        <div>
          <p className="eyebrow mb-2 px-2">Quick lists</p>
          <ul aria-label="Quick lists">
            {nav.lists.map((list) => (
              <li key={list.href}>
                <Link href={list.href} prefetch={false} className={ROW}>
                  <span className="min-w-0 flex-1">{list.label}</span>
                  <span className={COUNT}>{list.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-2.5 px-2">Providers</p>
          <ul aria-label="Providers" className="flex flex-wrap gap-2 px-2">
            {nav.providers.map((provider) => (
              <li key={provider.href}>
                <Link href={provider.href} prefetch={false} className="chip">
                  {provider.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Phones have no room for these two in the bar. */}
        <ul aria-label="More pages" className="flex gap-5 px-2 md:hidden">
          <li>
            <Link href="/changelog/" prefetch={false} className={TEXT_LINK}>
              Changelog
            </Link>
          </li>
          <li>
            <Link href="/about/" prefetch={false} className={TEXT_LINK}>
              How we rate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

/** The Compare menu: every comparison table, in the same order as on the home page. */
export function ComparePanel({ nav }: { nav: NavData }) {
  return (
    <div className="container-x py-5 lg:py-7">
      <p className="eyebrow mb-2 px-2">Comparison tables, one per job</p>
      <ul aria-label="Comparison tables" className="grid gap-x-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {nav.comparisons.map((job) => (
          <li key={job.slug} className="min-w-0">
            <Link href={job.href} prefetch={false} className={ROW}>
              <JobIcon slug={job.slug} className="h-4 w-4 shrink-0 text-ink-3" />
              <span className="min-w-0 flex-1 truncate">{job.label}</span>
              <span className={COUNT}>{job.count}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/compare/" prefetch={false} className={MORE}>
        All comparisons →
      </Link>
    </div>
  );
}
