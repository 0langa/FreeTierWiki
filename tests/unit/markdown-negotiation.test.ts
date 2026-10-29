import { describe, expect, it } from "vitest";

import { estimateTokens, markdownPath, onRequest, prefersMarkdown } from "../../functions/_middleware";

const MARKDOWN = "---\ntitle: \"Supabase\"\n---\n\n# Supabase\n";

// The ASSETS binding follows _redirects; this one sends every old /resources/ URL to the Explorer page.
const REDIRECTED = "<!DOCTYPE html><title>Explore free tiers</title>";

function context(path: string, init: RequestInit = {}, files: Record<string, string> = { "/services/supabase/index.md": MARKDOWN }) {
  const fetched: string[] = [];
  return {
    fetched,
    request: new Request(`https://freetier.wiki${path}`, init),
    env: {
      ASSETS: {
        async fetch(input: Request | URL | string) {
          const { pathname } = new URL(input instanceof Request ? input.url : input);
          fetched.push(pathname);
          if (pathname.startsWith("/resources/")) return new Response(REDIRECTED, { headers: { "Content-Type": "text/html; charset=utf-8" } });
          const file = files[pathname];
          return file === undefined
            ? new Response("<h1>Not found</h1>", { status: 404, headers: { "Content-Type": "text/html" } })
            : new Response(file, { headers: { "Content-Type": "text/markdown", "Cache-Control": "public, max-age=0, must-revalidate" } });
        },
      },
    },
    next: async () => new Response("<h1>Supabase</h1>", { headers: { "Content-Type": "text/html; charset=utf-8" } }),
  };
}

describe("prefersMarkdown", () => {
  it.each([
    ["text/markdown", true],
    ["text/markdown, text/html, */*", true],
    ["text/html;q=0.9, text/markdown", true],
    ["text/markdown, */*;q=0.8", true],
    ["TEXT/MARKDOWN", true],
  ])("serves Markdown for %s", (accept, expected) => {
    expect(prefersMarkdown(accept)).toBe(expected);
  });

  it.each([
    [null],
    [""],
    ["*/*"],
    ["text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"],
    ["text/html, text/markdown;q=0.5"],
    ["text/markdown;q=0"],
  ])("keeps HTML for %s", (accept) => {
    expect(prefersMarkdown(accept)).toBe(false);
  });
});

describe("markdownPath", () => {
  it("maps directory pages to their index.md", () => {
    expect(markdownPath("/")).toBe("/index.md");
    expect(markdownPath("/services/supabase/")).toBe("/services/supabase/index.md");
  });

  it("leaves files and slashless URLs alone", () => {
    expect(markdownPath("/sitemap.xml")).toBeNull();
    expect(markdownPath("/services/supabase")).toBeNull();
    expect(markdownPath("/services/supabase/index.md")).toBeNull();
  });
});

describe("onRequest", () => {
  it("returns the Markdown file with agent headers", async () => {
    const ctx = context("/services/supabase/", { headers: { Accept: "text/markdown" } });
    const response = await onRequest(ctx);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("Vary")).toBe("Accept");
    expect(response.headers.get("x-markdown-tokens")).toBe(String(estimateTokens(MARKDOWN)));
    expect(response.headers.get("Link")).toBe('<https://freetier.wiki/services/supabase/>; rel="canonical"');
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=0, must-revalidate");
    expect(await response.text()).toBe(MARKDOWN);
    expect(ctx.fetched).toEqual(["/services/supabase/index.md"]);
  });

  it("answers HEAD with headers and no body", async () => {
    const response = await onRequest(context("/services/supabase/", { method: "HEAD", headers: { Accept: "text/markdown" } }));
    expect(response.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
    expect(response.body).toBeNull();
  });

  it("keeps HTML as the default and marks it as varying on Accept", async () => {
    const ctx = context("/services/supabase/", { headers: { Accept: "text/html,*/*;q=0.8" } });
    const response = await onRequest(ctx);
    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("Vary")).toBe("Accept");
    expect(response.headers.get("Link")).toBe('</services/supabase/index.md>; rel="alternate"; type="text/markdown"');
    expect(await response.text()).toBe("<h1>Supabase</h1>");
    expect(ctx.fetched).toEqual([]);
  });

  it("keeps Link headers the static site already sends", async () => {
    const ctx = context("/");
    ctx.next = async () => new Response("<h1>Home</h1>", {
      headers: { "Content-Type": "text/html; charset=utf-8", Link: '</.well-known/api-catalog>; rel="api-catalog"' },
    });
    const response = await onRequest(ctx);
    expect(response.headers.get("Link")).toBe('</.well-known/api-catalog>; rel="api-catalog", </index.md>; rel="alternate"; type="text/markdown"');
  });

  it("falls back to the normal response when a page has no Markdown file", async () => {
    const ctx = context("/no-such-page/", { headers: { Accept: "text/markdown" } });
    ctx.next = async () => new Response("<h1>Not found</h1>", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } });
    const response = await onRequest(ctx);
    expect(response.status).toBe(404);
    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("Link")).toBeNull();
  });

  it("does not label a redirected HTML page as Markdown", async () => {
    const response = await onRequest(context("/resources/gitbook/", { headers: { Accept: "text/markdown" } }));
    expect(response.headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(await response.text()).toBe("<h1>Supabase</h1>");
  });

  it("does not negotiate for files or other methods", async () => {
    const file = context("/sitemap.xml", { headers: { Accept: "text/markdown" } });
    expect((await onRequest(file)).headers.get("Vary")).toBeNull();
    const post = context("/services/supabase/", { method: "POST", headers: { Accept: "text/markdown" } });
    expect((await onRequest(post)).headers.get("Content-Type")).toBe("text/html; charset=utf-8");
    expect(file.fetched).toEqual([]);
    expect(post.fetched).toEqual([]);
  });
});
