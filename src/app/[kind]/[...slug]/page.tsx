import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryPage } from "@/components/entry/entry-page";
import { BUILD_NOW } from "@/lib/build-info";
import { isContentKind } from "@/lib/content";
import { comparisonsFor } from "@/lib/comparison-view";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries, getComparisons, getEntryWithBody, getProviderGroups } from "@/lib/content.server";
import { bodyQuestions } from "@/lib/entry-body";
import { relatedItems } from "@/lib/entry-view";
import { absoluteUrl } from "@/lib/links";
import { providerHref } from "@/lib/providers";
import type { AtlasEntryWithBody } from "@/types/content";

type Params = Promise<{ kind: string; slug: string[] }>;

function metaDescription(entry: AtlasEntryWithBody): string {
  const summary = entry.status === "ended" ? "" : entry.freeTierDetails.summary;
  const text = summary.length >= 60 ? `${entry.title} free tier: ${summary}` : entry.description;
  return text.length > 300 ? `${text.slice(0, 297).replace(/\s+\S*$/, "")}...` : text;
}

/** Breadcrumbs for every entry, plus the "Questions people ask" pairs once the body has them. */
function structuredData(entry: AtlasEntryWithBody, provider: string | undefined): string {
  const crumbs = [
    { name: "Explore", url: "/explorer/" },
    { name: DOMAIN_LABELS[entry.domain], url: `/category/${entry.domain}/` },
    ...(provider ? [{ name: entry.provider, url: provider }] : []),
    { name: entry.title, url: entry.url },
  ];
  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, name: crumb.name, item: absoluteUrl(crumb.url) })),
    },
  ];
  const questions = bodyQuestions(entry.body.raw);
  if (questions.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: questions.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    });
  }
  // Escape "<" so text from content can never close the script element.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllEntries()).map((entry) => ({ kind: entry.kind, slug: entry.slug.split("/") }));
}

async function load(params: Params) {
  const { kind, slug } = await params;
  if (!isContentKind(kind)) return undefined;
  return getEntryWithBody(kind, slug.join("/"));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const entry = await load(params);
  if (!entry) return {};
  const title = entry.status === "ended" ? `${entry.title} free tier (ended)` : `${entry.title} free tier: limits, card, billing risk`;
  // The free-tier summary holds the numbers people search for; the product description is the fallback.
  const description = metaDescription(entry);
  return {
    title,
    description,
    alternates: { canonical: entry.url },
    openGraph: {
      type: "article",
      siteName: "freetier.wiki",
      title,
      description,
      url: entry.url,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function DynamicEntryPage({ params }: { params: Params }) {
  const entry = await load(params);
  if (!entry) notFound();
  const related = relatedItems(entry, await getAllEntries(), BUILD_NOW);
  const comparisons = comparisonsFor(entry.id, await getComparisons());
  const provider = providerHref(entry, await getProviderGroups());
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(entry, provider) }} />
      <EntryPage entry={entry} related={related} comparisons={comparisons} providerHref={provider} />
    </>
  );
}
