import { notFound } from "next/navigation";

import { ChangelogPage, changelogMetadata } from "@/components/changelog/changelog-page";
import { changelogRoutes, parseChangelogPath } from "@/lib/changelog-view";
import { getAllEntries, getRemovals } from "@/lib/content.server";
import { latestChanges } from "@/lib/home-data";

export const dynamicParams = false;

type Props = { params: Promise<{ view: string[] }> };

export async function generateStaticParams() {
  const rows = latestChanges(await getAllEntries(), undefined, await getRemovals());
  return changelogRoutes(rows)
    .filter(({ path }) => path !== "/changelog/")
    .map(({ path }) => ({ view: path.slice("/changelog/".length).split("/").filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const parsed = parseChangelogPath((await params).view);
  if (!parsed) notFound();
  return changelogMetadata(parsed.filter, parsed.page);
}

export default async function ChangelogArchivePage({ params }: Props) {
  const parsed = parseChangelogPath((await params).view);
  if (!parsed) notFound();
  return <ChangelogPage {...parsed} />;
}
