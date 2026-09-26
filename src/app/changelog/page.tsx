import type { Metadata } from "next";
import Link from "next/link";

import { ChangePill } from "@/components/entry/labels";
import { getAllEntries } from "@/lib/content.server";
import { formatMonth } from "@/lib/format";
import { latestChanges } from "@/lib/home-data";

export const metadata: Metadata = {
  title: "Free tier changelog",
  description: "Free plans that ended or changed, newest first.",
  alternates: { canonical: "/changelog/" },
};

export default async function ChangelogPage() {
  const rows = latestChanges(await getAllEntries());
  const years = [...new Set(rows.map((row) => row.date.slice(0, 4)))];

  return (
    <div className="max-w-3xl pt-8">
      <h1 className="text-[28px] font-bold tracking-tight">Free tier changelog</h1>
      <p className="mt-2 text-ink-2">Free plans that ended or changed, newest first. Each item links to the entry with the current facts.</p>
      {rows.length === 0 ? <p className="mt-8 text-sm text-ink-3">No changes recorded yet.</p> : null}
      {years.map((year) => (
        <section key={year} className="mt-8" aria-labelledby={`year-${year}`}>
          <h2 id={`year-${year}`} className="eyebrow mb-3">
            {year}
          </h2>
          <ol className="divide-y divide-line rounded-xl border border-line bg-surface">
            {rows
              .filter((row) => row.date.startsWith(year))
              .map((row) => (
                <li key={`${row.url}-${row.date}`} className="grid gap-1 px-[18px] py-3.5 sm:grid-cols-[110px_1fr] sm:gap-x-3">
                  <span className="font-mono text-xs font-medium leading-7 text-ink-3">{formatMonth(row.date)}</span>
                  <div>
                    <span className="flex flex-wrap items-center gap-2 font-semibold">
                      <Link href={row.url} className="hover:underline">
                        {row.title}
                      </Link>
                      <ChangePill kind={row.kind} />
                    </span>
                    <p className="text-[13.5px] text-ink-2">{row.note}</p>
                  </div>
                </li>
              ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
