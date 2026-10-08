import type { Metadata } from "next";
import Link from "next/link";

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
    <div className="pt-8">
      <h1 className="text-[28px] font-bold tracking-tight">Compare free tiers</h1>
      <p className="mt-2 max-w-2xl text-ink-2">
        One table per job. Each row shows what you get free, whether a card is needed, the billing risk, and how fresh the data is.
      </p>
      <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {comparisons.map((comparison) => (
          <li key={comparison.slug} className="bg-surface">
            <Link href={comparison.href} className="grid h-full gap-1 px-5 py-[18px] hover:bg-surface-2">
              <span className="flex items-baseline justify-between gap-2 font-semibold">
                {comparison.title}
                <span className="font-mono text-[13px] font-medium text-ink-3">{comparison.count}</span>
              </span>
              <span className="text-[13px] text-ink-3">{comparison.intro}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
