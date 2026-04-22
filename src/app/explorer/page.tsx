import { ExplorerPageClient } from "@/components/explorer/explorer-page-client";
import { allEntries } from "@/lib/content";

export default function ExplorerPage() {
  return <ExplorerPageClient data={allEntries} />;
}
