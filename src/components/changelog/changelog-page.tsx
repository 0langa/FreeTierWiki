import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChangePill } from "@/components/entry/labels";
import { PageHeader } from "@/components/site/page-header";
import { CHANGELOG_FILTERS, changelogPage, changelogPath, type ChangelogFilter } from "@/lib/changelog-view";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { FEED_ALTERNATE, FEED_PATH } from "@/lib/feed";
import { formatMonth } from "@/lib/format";
import { latestChanges } from "@/lib/home-data";
import { pageUrl } from "@/lib/metadata";

export function changelogMetadata(filter: ChangelogFilter = "all", page = 1): Metadata {
  const label = CHANGELOG_FILTERS.find((item) => item.kind === filter)!.label;
  const title = filter === "all" ? "Free tier changelog" : `${label} free tiers · Changelog`;
  const subject = filter === "all" ? "free plan updates" : `${label.toLowerCase()} free plans`;
  return {
    title: page === 1 ? title : `${title} · Page ${page}`,
    description: `Browse ${subject} in the FreeTierWiki changelog${page > 1 ? `, page ${page}` : ""}. Follow dated changes with links to current limits, restrictions, and billing details.`,
    ...pageUrl(changelogPath(filter, page), { types: FEED_ALTERNATE }),
  };
}

export async function ChangelogPage({ filter = "all", page = 1 }: { filter?: ChangelogFilter; page?: number }) {
  const allRows = latestChanges(await getAllEntries(), undefined, await getRemovals());
  const { rows, total, pageCount, start } = changelogPage(allRows, filter, page);
  if (page > pageCount || (filter !== "all" && total === 0)) notFound();
  const years = [...new Set(rows.map((row) => row.date.slice(0, 4)))];
  const filters = CHANGELOG_FILTERS.map((item) => ({
    ...item,
    count: item.kind === "all" ? allRows.length : allRows.filter((row) => row.kind === item.kind).length,
  })).filter((item) => item.kind === "all" || item.count > 0);

  return (
    <div className="changelog max-w-3xl">
      <PageHeader
        title="Free tier changelog"
        lede="Free plans that were added, changed, ended, or removed from the catalog, newest first. Each item links to the entry with the current facts."
      >
        <p className="text-[14px] text-ink-3">
          Follow it in a feed reader:{" "}
          <a href={FEED_PATH} className="underline underline-offset-[3px] hover:text-ink">RSS feed</a>.
        </p>
      </PageHeader>
      {allRows.length > 0 ? (
        <nav aria-label="Change type" className="mt-7 flex flex-wrap gap-2">
          {filters.map(({ kind, label, count }) => (
            <Link
              key={kind}
              href={changelogPath(kind)}
              prefetch={false}
              aria-current={filter === kind ? "page" : undefined}
              className="btn h-9 px-3 text-[13.5px]"
            >
              {label} <span className="font-mono text-xs opacity-70">{count}</span>
            </Link>
          ))}
        </nav>
      ) : <p className="mt-8 text-sm text-ink-3">No changes recorded yet.</p>}
      {total > 0 && (
        <p className="mt-4 text-sm text-ink-3">
          Showing {start + 1}–{start + rows.length} of {total} changes · Page {page} of {pageCount}
        </p>
      )}
      {years.map((year) => (
        <section key={year} className="mt-8" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="eyebrow mb-3">{year}</h2>
          <ol className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {rows.filter((row) => row.date.startsWith(year)).map((row, index) => (
              <li key={`${row.url}-${row.date}-${row.kind}-${index}`} data-kind={row.kind} className="grid gap-1 px-4 py-4 sm:grid-cols-[110px_1fr] sm:gap-x-3 sm:px-5">
                <span className="font-mono text-xs font-medium leading-7 text-ink-3">{formatMonth(row.date)}</span>
                <div>
                  <span className="flex flex-wrap items-center gap-2 text-[15.5px] font-semibold">
                    <Link href={row.url} className="hover:underline">{row.title}</Link>
                    <ChangePill kind={row.kind} />
                  </span>
                  <p className="mt-0.5 text-[14px] leading-relaxed text-ink-2">{row.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
      {pageCount > 1 && (
        <nav aria-label="Changelog pages" className="mt-8 flex flex-wrap items-center gap-2">
          {page > 1 && <Link href={changelogPath(filter, page - 1)} prefetch={false} rel="prev" className="btn h-9 px-3 text-sm">Newer changes</Link>}
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <Link
              key={number}
              href={changelogPath(filter, number)}
              prefetch={false}
              aria-label={`Page ${number}`}
              aria-current={number === page ? "page" : undefined}
              className="btn h-9 min-w-9 px-3 text-sm"
            >{number}</Link>
          ))}
          {page < pageCount && <Link href={changelogPath(filter, page + 1)} prefetch={false} rel="next" className="btn h-9 px-3 text-sm">Older changes</Link>}
        </nav>
      )}
    </div>
  );
}
