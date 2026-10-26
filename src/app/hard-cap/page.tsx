import type { Metadata } from "next";

import { FilterHub, filterHubMetadata } from "@/components/site/filter-hub";

export async function generateMetadata(): Promise<Metadata> {
  return filterHubMetadata("hard-cap");
}

export default function HardCapPage() {
  return <FilterHub filter="hard-cap" />;
}
