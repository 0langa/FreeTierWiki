import type { Metadata } from "next";
import { Suspense } from "react";

import { EntryList } from "@/components/entry/entry-list";
import { ExplorerClient } from "@/components/explorer/explorer-client";
import { BUILD_NOW } from "@/lib/build-info";
import { getAllEntries } from "@/lib/content.server";
import { toListItem } from "@/lib/entry-view";
import { applyQuery, DEFAULT_QUERY } from "@/lib/explorer-query";

export const metadata: Metadata = {
  title: "Explore free tiers",
  description: "Filter free plans by category, card rules, hard caps, billing risk, and freshness.",
  alternates: { canonical: "/explorer/" },
};

const PAGE_SIZE = 50;

export default async function ExplorerPage() {
  const all = (await getAllEntries()).map((entry) => toListItem(entry, BUILD_NOW));
  const initial = applyQuery(all, DEFAULT_QUERY);
  const firstPage = initial.slice(0, PAGE_SIZE);

  return (
    <Suspense
      fallback={
        <div className="pt-6 lg:pt-8">
          <h1 className="text-[28px] font-bold tracking-tight">Explore free tiers</h1>
          <p className="mt-3.5 text-sm text-ink-2">
            <strong className="text-ink">{initial.length}</strong> results, safest first
          </p>
          <div className="mt-4">
            <EntryList items={firstPage} />
          </div>
        </div>
      }
    >
      <ExplorerClient initialItems={firstPage} initialTotal={initial.length} />
    </Suspense>
  );
}
