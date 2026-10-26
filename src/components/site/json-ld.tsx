import { jsonLd } from "@/lib/structured-data";

/** Structured data for search engines, as one JSON-LD script. */
export function JsonLd({ graph }: { graph: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />;
}
