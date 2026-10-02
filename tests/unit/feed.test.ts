import { describe, expect, it } from "vitest";

import { changelogFeed, FEED_LIMIT } from "@/lib/feed";
import type { ChangeRow } from "@/lib/home-data";

const row = (over: Partial<ChangeRow> = {}): ChangeRow => ({
  date: "2026-10-01",
  kind: "changed",
  note: "Free plan cut to 1 project.",
  title: "Acme",
  url: "/services/acme/",
  ...over,
});

describe("changelogFeed", () => {
  it("writes an RSS item per row with absolute links and RFC 822 dates", () => {
    const xml = changelogFeed([row()], "2026-10-02");
    expect(xml).toContain("<title>Changed: Acme</title>");
    expect(xml).toContain("<link>https://freetier.wiki/services/acme/</link>");
    expect(xml).toContain("<pubDate>Thu, 01 Oct 2026 00:00:00 GMT</pubDate>");
    expect(xml).toContain("<lastBuildDate>Thu, 01 Oct 2026 00:00:00 GMT</lastBuildDate>");
  });

  it("escapes XML characters", () => {
    const xml = changelogFeed([row({ title: "A & B <C>", note: `"quoted" & 'single'` })], "2026-10-02");
    expect(xml).toContain("Changed: A &amp; B &lt;C&gt;");
    expect(xml).toContain("&quot;quoted&quot; &amp; &apos;single&apos;");
  });

  it("gives removed entries that share a category link distinct guids", () => {
    const xml = changelogFeed(
      [row({ kind: "removed", title: "One", url: "/category/storage/" }), row({ kind: "removed", title: "Two", url: "/category/storage/" })],
      "2026-10-02",
    );
    const guids = [...xml.matchAll(/<guid[^>]*>([^<]+)<\/guid>/g)].map((match) => match[1]);
    expect(new Set(guids).size).toBe(2);
  });

  it("keeps only the newest rows and falls back to the build day when empty", () => {
    const rows = Array.from({ length: FEED_LIMIT + 5 }, (_, index) => row({ title: `T${index}` }));
    expect(changelogFeed(rows, "2026-10-02").match(/<item>/g)).toHaveLength(FEED_LIMIT);
    expect(changelogFeed([], "2026-10-02")).toContain("<lastBuildDate>Fri, 02 Oct 2026 00:00:00 GMT</lastBuildDate>");
  });
});
