import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/page-header";
import { getEndedEntries } from "@/lib/content.server";
import { formatDay } from "@/lib/format";
import { pageUrl } from "@/lib/metadata";

const TITLE = "Ended offers";
const DESCRIPTION = "Former free tiers kept here as a record of what changed. Each listing includes its history and sources.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: true },
  ...pageUrl("/ended-offers/"),
};

export default async function EndedOffersPage() {
  const rows = (await getEndedEntries())
    .map((entry) => {
      const change = entry.changes.find(({ kind }) => kind === "ended");
      return {
        entry,
        date: change?.date ?? entry.lastUpdated,
        note: change?.note ?? entry.answer,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date) || a.entry.title.localeCompare(b.entry.title));

  return (
    <div className="max-w-3xl">
      <PageHeader
        crumbs={[{ href: "/changelog/", label: "Changelog" }]}
        current={TITLE}
        title={TITLE}
        lede={DESCRIPTION}
      />
      {rows.length > 0 ? (
        <ul aria-label={TITLE} className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
          {rows.map(({ entry, date, note }) => (
            <li key={entry.id} className="grid gap-1 px-4 py-4 sm:grid-cols-[110px_1fr] sm:gap-x-3 sm:px-5">
              <time dateTime={date} className="font-mono text-xs font-medium leading-7 text-ink-3">
                {formatDay(date)}
              </time>
              <div>
                <Link href={entry.url} className="text-[15.5px] font-semibold hover:underline">
                  {entry.title}
                </Link>
                <p className="mt-0.5 text-[14px] leading-relaxed text-ink-2">{note}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-ink-3">No ended offers have been recorded yet.</p>
      )}
    </div>
  );
}
