import type { ChangeRow } from "@/lib/home-data";
import { absoluteUrl } from "@/lib/links";

export const FEED_PATH = "/changelog/feed.xml";
export const FEED_LIMIT = 50;

/** Page metadata `alternates.types` value that lets browsers and readers find the feed. */
export const FEED_ALTERNATE = { "application/rss+xml": [{ url: FEED_PATH, title: "freetier.wiki changelog" }] };

const KIND_LABELS: Record<ChangeRow["kind"], string> = {
  new: "New",
  changed: "Changed",
  ended: "Ended",
  removed: "Removed",
};

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function rfc822(day: string): string {
  return new Date(`${day}T00:00:00Z`).toUTCString();
}

/** RSS 2.0 feed of the newest changelog rows. `rows` must already be sorted newest first. */
export function changelogFeed(rows: ChangeRow[], buildDay: string): string {
  const items = rows.slice(0, FEED_LIMIT).map((row) => {
    const link = absoluteUrl(row.url);
    // A removed entry links to its category, so the guid needs the title to stay unique.
    const guid = `${link}#${row.kind}-${row.date}-${encodeURIComponent(row.title)}`;
    return [
      "    <item>",
      `      <title>${escapeXml(`${KIND_LABELS[row.kind]}: ${row.title}`)}</title>`,
      `      <link>${escapeXml(link)}</link>`,
      `      <guid isPermaLink="false">${escapeXml(guid)}</guid>`,
      `      <pubDate>${rfc822(row.date)}</pubDate>`,
      `      <description>${escapeXml(row.note)}</description>`,
      "    </item>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>freetier.wiki changelog</title>",
    `    <link>${absoluteUrl("/changelog/")}</link>`,
    `    <atom:link href="${absoluteUrl(FEED_PATH)}" rel="self" type="application/rss+xml"/>`,
    "    <description>Free plans that were added, changed, ended, or removed, newest first.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${rfc822(rows[0]?.date ?? buildDay)}</lastBuildDate>`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
