import type { Metadata } from "next";

import { FilterHub, filterHubMetadata } from "@/components/site/filter-hub";

export async function generateMetadata(): Promise<Metadata> {
  return filterHubMetadata("no-card");
}

export default function NoCardPage() {
  return <FilterHub filter="no-card" />;
}
