import { describe, expect, it } from "vitest";

import { absoluteUrl, reportUrl } from "@/lib/links";

describe("links", () => {
  it("builds a prefilled GitHub issue link", () => {
    const url = new URL(reportUrl({ title: "Neon", url: "/services/neon/" }));
    expect(url.origin + url.pathname).toBe("https://github.com/0langa/FreeTierWiki/issues/new");
    expect(url.searchParams.get("template")).toBe("outdated-info.yml");
    expect(url.searchParams.get("title")).toBe("Outdated: Neon");
    expect(url.searchParams.get("entry")).toBe("https://freetier.wiki/services/neon/");
  });

  it("makes absolute URLs on the site origin", () => {
    expect(absoluteUrl("/explorer/")).toBe("https://freetier.wiki/explorer/");
  });
});
