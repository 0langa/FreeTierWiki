import { notFound } from "next/navigation";

import { ContentPage } from "@/components/content/content-page";
import { allEntries, getEntryByPath, isContentKind } from "@/lib/content";
import type { ContentKind } from "@/types/content";

type DynamicContentPageProps = {
  params: {
    kind: string;
    slug: string[];
  };
};

export function generateStaticParams() {
  return allEntries.map((entry) => ({
    kind: entry.kind,
    slug: entry.slug.split("/"),
  }));
}

export function generateMetadata({ params }: DynamicContentPageProps) {
  if (!isContentKind(params.kind)) {
    return {};
  }

  const entry = getEntryByPath(params.kind, params.slug.join("/"));
  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} | FreeTierAtlas`,
    description: entry.description,
  };
}

export default function DynamicContentPage({ params }: DynamicContentPageProps) {
  if (!isContentKind(params.kind)) {
    notFound();
  }

  const kind = params.kind as ContentKind;
  const slug = params.slug.join("/");

  const entry = getEntryByPath(kind, slug);
  if (!entry) {
    notFound();
  }

  return <ContentPage entry={entry} kind={kind} />;
}
