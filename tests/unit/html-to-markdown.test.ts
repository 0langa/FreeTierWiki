import { describe, expect, it } from "vitest";

import { htmlToMarkdown } from "../../scripts/markdown/lib/html-to-markdown.mjs";

const page = (main: string, head = "") => `<!DOCTYPE html><html><head>
<title>Supabase free tier: limits &amp; billing · freetier.wiki</title>
<meta name="description" content="Supabase &quot;free&quot; tier guide."/>
<link rel="canonical" href="https://freetier.wiki/services/supabase/"/>
<meta property="article:modified_time" content="2026-10-26"/>${head}
</head><body><header><nav aria-label="Main"><a href="/explorer/">Explore</a></nav></header>
<main id="main">${main}</main><footer><p>Data built 29 Oct 2026</p></footer>
<script>self.__next_f.push([1,"payload"])</script></body></html>`;

describe("htmlToMarkdown", () => {
  it("writes frontmatter from the page metadata", () => {
    expect(htmlToMarkdown(page("<h1>Supabase</h1>"))).toBe(
      [
        "---",
        'title: "Supabase free tier: limits & billing · freetier.wiki"',
        'description: "Supabase \\"free\\" tier guide."',
        'url: "https://freetier.wiki/services/supabase/"',
        'updated: "2026-10-26"',
        "---",
        "",
        "# Supabase",
        "",
      ].join("\n"),
    );
  });

  it("keeps only the main content, without site chrome or scripts", () => {
    const markdown = htmlToMarkdown(page(`
      <nav aria-label="Breadcrumb"><ol><li><a href="/explorer/">Explore</a></li></ol></nav>
      <h1>Supabase</h1><nav aria-label="On this page"><ol><li><a href="#fit">Fit</a></li></ol></nav>
      <button type="button">Copy</button><svg><path d="M0 0"/></svg><p>Postgres with auth.</p>`))!;
    expect(markdown).toContain("# Supabase\n\nPostgres with auth.\n");
    expect(markdown).not.toMatch(/Explore|Fit|Copy|Data built|payload/);
  });

  it("makes site links absolute", () => {
    expect(htmlToMarkdown(page('<p>See <a href="/services/neon/">Neon</a>.</p>'))).toContain("See [Neon](https://freetier.wiki/services/neon/).");
  });

  it("turns the facts list into labelled bullets", () => {
    const markdown = htmlToMarkdown(page("<dl><div><dt>Card required</dt><dd>No card</dd></div><div><dt>Hard cap</dt><dd>Yes</dd></div></dl>"));
    expect(markdown).toContain("- **Card required:** No card\n- **Hard cap:** Yes");
  });

  it("renders ARIA grid tables as Markdown tables", () => {
    const markdown = htmlToMarkdown(page(`<div role="table">
      <div role="row"><span role="columnheader">Free tier</span><span role="columnheader">Card</span></div>
      <div role="row"><div role="cell"><a href="/services/neon/">Neon</a></div><div role="cell"><span>No card | ever</span></div></div>
    </div>`));
    expect(markdown).toContain("| Free tier | Card |\n| --- | --- |\n| [Neon](https://freetier.wiki/services/neon/) | No card \\| ever |");
  });

  it("links only the name on card tiles and separates their labels", () => {
    // Exported markup has no whitespace between tags; a space there is an intended plain space.
    const markdown = htmlToMarkdown(page('<ol><li><a href="/services/koyeb/"><span><span>Koyeb</span><span>Hosting</span></span>'
      + "<span><span><b>1</b> free web service</span><span><span> · </span><b>1</b> free database</span></span></a></li></ol>"));
    expect(markdown).toContain("1. [Koyeb](https://freetier.wiki/services/koyeb/) · Hosting · **1** free web service · **1** free database");
  });

  it("keeps the gap left by decorative glyphs", () => {
    const markdown = htmlToMarkdown(page('<p><span>By Neon</span><span aria-hidden="true">·</span><a href="/category/database/">Database</a></p><ul><li><span aria-hidden="true">!</span><span>Pauses after 5 minutes.</span></li></ul>'));
    expect(markdown).toContain("By Neon · [Database](https://freetier.wiki/category/database/)");
    expect(markdown).toContain("- Pauses after 5 minutes.");
  });

  it("returns null for a page without <main>", () => {
    expect(htmlToMarkdown("<html><body><p>Hi</p></body></html>")).toBeNull();
  });
});
