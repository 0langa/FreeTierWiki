import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryPage } from "@/components/entry/entry-page";
import { JsonLd } from "@/components/site/json-ld";
import { BUILD_NOW } from "@/lib/build-info";
import { isContentKind } from "@/lib/content";
import { comparisonsFor } from "@/lib/comparison-view";
import { DOMAIN_LABELS } from "@/lib/content";
import { getAllEntries, getComparisons, getEntryWithBody, getProviderGroups } from "@/lib/content.server";
import { bodyQuestions } from "@/lib/entry-body";
import { relatedItems } from "@/lib/entry-view";
import { absoluteUrl } from "@/lib/links";
import { OPEN_GRAPH } from "@/lib/metadata";
import { providerHref } from "@/lib/providers";
import { breadcrumbList, WEBSITE_ID } from "@/lib/structured-data";
import type { AtlasEntryWithBody } from "@/types/content";

type Params = Promise<{ kind: string; slug: string[] }>;

function pageTitle(entry: AtlasEntryWithBody): string {
  return entry.status === "ended" ? `${entry.title} free tier (ended)` : `${entry.title} free tier: limits, card, billing risk`;
}

function metaDescription(entry: AtlasEntryWithBody): string {
  const summary = entry.status === "ended" ? "" : entry.freeTierDetails.summary;
  const text = summary.length >= 60 ? `${entry.title} free tier: ${summary}` : entry.description;
  return text.length > 300 ? `${text.slice(0, 297).replace(/\s+\S*$/, "")}...` : text;
}

/**
 * Breadcrumbs for every entry, and the page with its two dates: the last content change and the last check against
 * official sources. The page carries the "Questions people ask" pairs once the body has them.
 */
function structuredData(entry: AtlasEntryWithBody, provider: string | undefined): object[] {
  const crumbs = breadcrumbList([
    { name: "Explore", url: "/explorer/" },
    { name: DOMAIN_LABELS[entry.domain], url: `/category/${entry.domain}/` },
    ...(provider ? [{ name: entry.provider, url: provider }] : []),
    { name: entry.title, url: entry.url },
  ]);
  const questions = bodyQuestions(entry.body.raw);
  const page = {
    "@type": questions.length > 0 ? "FAQPage" : "WebPage",
    "@id": absoluteUrl(entry.url),
    url: absoluteUrl(entry.url),
    name: pageTitle(entry),
    isPartOf: { "@id": WEBSITE_ID },
    dateModified: entry.lastUpdated,
    ...(entry.lastVerified ? { lastReviewed: entry.lastVerified } : {}),
    ...(questions.length > 0
      ? {
          mainEntity: questions.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }
      : {}),
  };
  return [crumbs, page];
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
  const title = pageTitle(entry);
  // The free-tier summary holds the numbers people search for; the product description is the fallback.
  const description = metaDescription(entry);
  return {
    title,
    description,
    alternates: { canonical: entry.url },
    openGraph: { ...OPEN_GRAPH, type: "article", title, description, url: entry.url, modifiedTime: entry.lastUpdated },
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
      <JsonLd graph={structuredData(entry, provider)} />
      <EntryPage entry={entry} related={related} comparisons={comparisons} providerHref={provider} />
    </>
  );
}
