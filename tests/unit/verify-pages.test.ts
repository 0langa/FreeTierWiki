import { describe, expect, it } from "vitest";

import { candidateUrls, excerpt, htmlToText, isThin } from "../../scripts/verify/lib/pages.mjs";

describe("htmlToText", () => {
  it("drops scripts and styles, keeps block breaks, decodes entities", () => {
    const html = "<style>p{}</style><script>var a=1</script><h2>Free</h2><p>5&nbsp;GB &amp; 1&#44;000 requests</p><li>No card</li>";
    expect(htmlToText(html)).toBe("Free\n5 GB & 1,000 requests\nNo card");
  });
});

describe("excerpt", () => {
  it("keeps keyword lines with one line of context", () => {
    const text = ["About us", "Team", "Free plan", "500 MB storage", "Careers", "Blog", "Contact"].join("\n");
    expect(excerpt(text)).toBe(["Team", "Free plan", "500 MB storage", "Careers"].join("\n"));
  });

  it("caps the size", () => {
    const text = Array.from({ length: 1000 }, (_, i) => `Plan ${i} costs $${i} per month`).join("\n");
    expect(excerpt(text, 200).length).toBeLessThanOrEqual(200);
  });

  it("returns empty text for empty input", () => {
    expect(excerpt("")).toBe("");
  });
});

describe("candidateUrls", () => {
  it("orders pricingUrl, pricing-like sources, the official URL, then /pricing", () => {
    expect(
      candidateUrls({
        pricingUrl: "https://a.dev/plans",
        sourceUrls: ["https://a.dev/docs", "https://a.dev/pricing", "ftp://bad"],
        officialUrl: "https://a.dev/",
      }),
    ).toEqual(["https://a.dev/plans", "https://a.dev/pricing", "https://a.dev/"]);
  });

  it("works with only an official URL", () => {
    expect(candidateUrls({ officialUrl: "https://b.io" })).toEqual(["https://b.io", "https://b.io/pricing"]);
  });

  it("caps at 4 URLs, pricingUrl first", () => {
    const result = candidateUrls({
      pricingUrl: "https://c.dev/plans",
      sourceUrls: ["https://c.dev/pricing", "https://c.dev/plans-2", "https://c.dev/free-tier"],
      officialUrl: "https://c.dev/",
    });
    expect(result).toHaveLength(4);
    expect(result[0]).toBe("https://c.dev/plans");
  });
});

describe("isThin", () => {
  it("marks thin pages", () => {
    expect(isThin("Loading…")).toBe(true);
    expect(isThin("x".repeat(400))).toBe(false);
  });
});
