import type { Metadata } from "next";
import Link from "next/link";

import { ChangePill } from "@/components/entry/labels";
import { PageHeader } from "@/components/site/page-header";
import type { ChangelogKind } from "@/types/content";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { FEED_ALTERNATE, FEED_PATH } from "@/lib/feed";
import { formatMonth } from "@/lib/format";
import { latestChanges } from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Free tier changelog",
  description: "Free plans that ended, changed, or were removed from the catalog, newest first.",
  alternates: { canonical: "/changelog/", types: FEED_ALTERNATE },
};

const FILTERS: { kind: ChangelogKind; label: string }[] = [
  { kind: "new", label: "New" },
  { kind: "changed", label: "Changed" },
  { kind: "ended", label: "Ended" },
  { kind: "removed", label: "Removed" },
];

export default async function ChangelogPage() {
  const rows = latestChanges(await getAllEntries(), undefined, await getRemovals());
  const years = [...new Set(rows.map((row) => row.date.slice(0, 4)))];
  const counts = new Map<ChangelogKind, number>();
  for (const row of rows) counts.set(row.kind, (counts.get(row.kind) ?? 0) + 1);
  // Only kinds that exist get a filter; `ended` shows up once an entry records that change.
  const kinds = FILTERS.filter((filter) => counts.has(filter.kind));

  return (
    <div className="changelog max-w-3xl">
      <PageHeader
        title="Free tier changelog"
        lede="Free plans that ended, changed, or were removed from the catalog, newest first. Each item links to the entry with the current facts."
      >
        <p className="text-[14px] text-ink-3">
          Follow it in a feed reader:{" "}
          <a href={FEED_PATH} className="underline underline-offset-[3px] hover:text-ink">
            RSS feed
          </a>
          .
        </p>
      </PageHeader>
      {rows.length > 0 ? (
        <fieldset className="mt-7 flex flex-wrap gap-2">
          <legend className="sr-only">Show only</legend>
          <input type="radio" name="kind" id="kind-all" value="all" defaultChecked className="sr-only" />
          <label htmlFor="kind-all" className="btn h-9 cursor-pointer px-3 text-[13.5px]">
            All <span className="font-mono text-xs opacity-70">{rows.length}</span>
          </label>
          {kinds.map(({ kind, label }) => (
            <span key={kind} className="contents">
              <input type="radio" name="kind" id={`kind-${kind}`} value={kind} className="sr-only" />
              <label htmlFor={`kind-${kind}`} className="btn h-9 cursor-pointer px-3 text-[13.5px]">
                {label} <span className="font-mono text-xs opacity-70">{counts.get(kind)}</span>
              </label>
            </span>
          ))}
        </fieldset>
      ) : (
        <p className="mt-8 text-sm text-ink-3">No changes recorded yet.</p>
      )}
      {years.map((year) => (
        <section key={year} className="mt-8" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="eyebrow mb-3">
            {year}
          </h2>
          <ol className="divide-y divide-line rounded-2xl border border-line bg-surface">
            {rows
              .filter((row) => row.date.startsWith(year))
              .map((row) => (
                <li key={`${row.url}-${row.date}`} data-kind={row.kind} className="grid gap-1 px-4 py-4 sm:grid-cols-[110px_1fr] sm:gap-x-3 sm:px-5">
                  <span className="font-mono text-xs font-medium leading-7 text-ink-3">{formatMonth(row.date)}</span>
                  <div>
                    <span className="flex flex-wrap items-center gap-2 text-[15.5px] font-semibold">
                      <Link href={row.url} className="hover:underline">
                        {row.title}
                      </Link>
                      <ChangePill kind={row.kind} />
                    </span>
                    <p className="mt-0.5 text-[14px] leading-relaxed text-ink-2">{row.note}</p>
                  </div>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
