import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EntryPage } from "@/components/entry/entry-page";
import { BUILD_NOW } from "@/lib/build-info";
import { isContentKind } from "@/lib/content";
import { getAllEntries, getEntryWithBody } from "@/lib/content.server";
import { relatedItems } from "@/lib/entry-view";

type Params = Promise<{ kind: string; slug: string[] }>;

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
  return {
    title: `${entry.title} free tier: limits, card, billing risk`,
    description: entry.description,
    alternates: { canonical: entry.url },
  };
}

export default async function DynamicEntryPage({ params }: { params: Params }) {
  const entry = await load(params);
  if (!entry) notFound();
  const related = relatedItems(entry, await getAllEntries(), BUILD_NOW);
  return <EntryPage entry={entry} related={related} />;
}
