import type { Metadata } from "next";
import Link from "next/link";

import { JobIcon } from "@/components/site/icons";
import { PageHeader } from "@/components/site/page-header";
import { liveComparisons } from "@/lib/comparison-view";
import { getAllEntries, getComparisons } from "@/lib/content.server";

export const metadata: Metadata = {
  title: "Compare free tiers",
  description: "Side-by-side tables of free plans for one job: Postgres hosting, serverless functions, email APIs, LLM APIs, auth, and more.",
  alternates: { canonical: "/compare/" },
};

export default async function CompareIndexPage() {
  const live = new Set((await getAllEntries()).filter((entry) => entry.status !== "ended").map((entry) => entry.id));
  const comparisons = liveComparisons(await getComparisons(), live);

  return (
    <div>
      <PageHeader
        title="Compare free tiers"
        lede="One table per job. Each row shows what you get free, whether a card is needed, the billing risk, and how fresh the data is."
      />
      <ul className="tile-grid mt-7 sm:grid-cols-2 2xl:grid-cols-3">
        {comparisons.map((comparison) => (
          <li key={comparison.slug} className="bg-surface">
            <Link href={comparison.href} className="flex h-full items-start gap-3.5 px-4 py-4 transition-colors hover:bg-surface-2 sm:px-5">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-2 text-ink-2">
                <JobIcon slug={comparison.slug} className="h-[18px] w-[18px]" />
              </span>
              <span className="grid min-w-0 flex-1 gap-1">
                <span className="flex items-baseline justify-between gap-2 text-[15.5px] font-semibold leading-snug">
                  {comparison.title}
                  <span className="font-mono text-[13px] font-medium text-ink-3">{comparison.count}</span>
                </span>
                <span className="text-[13.5px] leading-relaxed text-ink-3">{comparison.intro}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
