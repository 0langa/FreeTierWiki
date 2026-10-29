// Markdown for agents: a page request that prefers `text/markdown` gets the page's index.md,
// written next to index.html by scripts/markdown/build-markdown.mjs. Everyone else gets HTML.
// Cloudflare Pages runs this before serving static files (see public/_routes.json for the paths).

const SITE = "https://freetier.wiki";

interface Env {
  ASSETS: { fetch(input: Request | URL | string): Promise<Response> };
}

interface Context {
  request: Request;
  env: Env;
  next(): Promise<Response>;
}

function quality(params: string[]): number {
  const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
  const value = q ? Number(q.slice(2)) : 1;
  return Number.isFinite(value) ? value : 0;
}

// True when the client lists text/markdown and ranks it at least as high as text/html.
// Wildcards don't count for HTML: "text/markdown, */*" is an agent asking for Markdown first.
export function prefersMarkdown(accept: string | null): boolean {
  let markdown = 0;
  let html = 0;
  for (const range of (accept ?? "").toLowerCase().split(",")) {
    const [type, ...params] = range.split(";");
    if (type.trim() === "text/markdown") markdown = Math.max(markdown, quality(params));
    if (type.trim() === "text/html") html = Math.max(html, quality(params));
  }
  return markdown > 0 && markdown >= html;
}

// Pages are directories ("/services/supabase/"). Slashless URLs redirect to the slash form first.
export function markdownPath(pathname: string): string | null {
  return pathname.endsWith("/") ? `${pathname}index.md` : null;
}

// Rough count for the x-markdown-tokens header; about four characters per token for English text.
export function estimateTokens(markdown: string): number {
  return Math.ceil(markdown.length / 4);
}

export async function onRequest({ request, env, next }: Context): Promise<Response> {
  const url = new URL(request.url);
  const path = markdownPath(url.pathname);
  if (!path) return next();

  const readable = request.method === "GET" || request.method === "HEAD";
  if (readable && prefersMarkdown(request.headers.get("Accept"))) {
    const asset = await env.ASSETS.fetch(new URL(path, url));
    // A missing file falls through to the normal response. Check the type, not just the status:
    // the binding follows _redirects, so "/resources/x/index.md" can come back as the Explorer HTML.
    if (asset.ok && asset.headers.get("Content-Type")?.startsWith("text/markdown")) {
      const body = await asset.text();
      const headers = new Headers({
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "x-markdown-tokens": String(estimateTokens(body)),
        Link: `<${SITE}${url.pathname}>; rel="canonical"`,
      });
      const cacheControl = asset.headers.get("Cache-Control");
      if (cacheControl) headers.set("Cache-Control", cacheControl);
      return new Response(request.method === "HEAD" ? null : body, { headers });
    }
  }

  // The same URL has two representations, so caches must key HTML on Accept too.
  const response = await next();
  const varied = new Response(response.body, response);
  varied.headers.append("Vary", "Accept");
  return varied;
}
