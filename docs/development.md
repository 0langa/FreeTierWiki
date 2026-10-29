# Development

## Setup

Use Node.js 22, pinned in [`.nvmrc`](../.nvmrc) and [`.node-version`](../.node-version).

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Checks

For application or content changes, run the checks used by [CI](../.github/workflows/ci.yml):

```sh
npm run lint
npm run typecheck
npm test
npm run check:depth
npm run build
npm run check:budget
npx playwright install chromium
npm run test:e2e
```

The end-to-end suite serves the static `out/` build on port 4173. Rebuild before running it after changes.

If a build runs out of memory, limit its workers. In a POSIX shell:

```sh
NEXT_BUILD_CPUS=2 npm run build
```

In PowerShell:

```powershell
$env:NEXT_BUILD_CPUS = '2'
npm run build
Remove-Item Env:NEXT_BUILD_CPUS
```

Documentation-only edits need a review of the text, file links, and affected commands; they do not need new application tests.

## Architecture

| Part | Implementation |
| --- | --- |
| Site | Next.js 16 App Router, static export (`output: "export"`) |
| Language | TypeScript in strict mode |
| Styling | Tailwind CSS 3.4 |
| Content | Frontmatter and MDX under `content/services/` and `content/tools/` |
| Comparisons | Entry references in `content/comparisons.json` |
| Search | FlexSearch, loaded when someone searches |
| Fonts | Self-hosted IBM Plex Sans and Mono under `src/fonts/` |
| Dialogs | Native `<dialog>` in `src/components/ui/modal.tsx` |
| Tests | Vitest unit tests and Playwright end-to-end tests |

## Deployment

Cloudflare Pages builds `main` with `npm run build` and serves `out/`. Node is pinned by `.nvmrc`. GitHub Actions runs checks on pushes to `main` and on PRs; the CI workflow does not deploy the site.

The canonical site is [freetier.wiki](https://freetier.wiki/). The former [GitHub Pages address](https://0langa.github.io/FreeTierWiki/) serves only a redirect, deployed by [`pages-redirect.yml`](../.github/workflows/pages-redirect.yml). It uploads [`deployment/github-pages/index.html`](../deployment/github-pages/index.html) as both `index.html` and `404.html`, so old deep links preserve their path, query, and fragment when JavaScript is enabled. Without JavaScript, visitors reach the canonical home page. This is a client-side redirect; GitHub Pages does not send an HTTP 301 for these pages.

Keep GitHub Pages configured with **GitHub Actions** as its publishing source, without a custom domain. The redirect workflow runs on `main` only when its source or workflow changes, or through **Run workflow** after the workflow has merged. It does not build the catalog. Cloudflare remains the catalog host.

[`public/_redirects`](../public/_redirects) contains redirects for moved or removed URLs. The [entry-removal tool](content-maintenance.md#remove-an-entry) adds a category redirect and a changelog record.

## Markdown for agents

Every page has a Markdown version for AI agents. A request whose `Accept` header ranks `text/markdown` at least as high as `text/html` gets Markdown; browsers and crawlers keep getting HTML. Cloudflare's own [Markdown for Agents](https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/) needs a Pro plan, so the site does it itself:

- `npm run build` runs [`scripts/markdown/build-markdown.mjs`](../scripts/markdown/build-markdown.mjs) after `next build`. It writes `index.md` next to every exported `index.html`: frontmatter from the page metadata, then the `<main>` content without breadcrumbs, "On this page" lists, buttons, or icons.
- [`functions/_middleware.ts`](../functions/_middleware.ts) is a Pages Function. For a page URL ending in `/`, it serves that `index.md` with `Content-Type: text/markdown`, `Vary: Accept`, an estimated `x-markdown-tokens` count, and a canonical `Link` header. Slashless URLs and `_redirects` entries redirect first, as they do for HTML.
- [`public/_routes.json`](../public/_routes.json) keeps `/_next/*` and other static files out of the Function.

Function requests count toward the Workers Free plan's 100,000 requests a day. Keep the Pages project's **Settings → Runtime → Fail open / closed** on **Fail open**, so pages are still served as HTML if the allowance runs out.

To try the middleware locally after a build, run `npx wrangler pages dev out`, then:

```sh
curl -H "Accept: text/markdown" http://127.0.0.1:8788/services/supabase/
```

## Changelog archives

The changelog exports 100 changes per page. `/changelog/page/2/` continues the full history; kind filters such as `/changelog/new/` have their own pagination and apply before slicing the rows. Every page has its own canonical URL and sitemap entry, and the links work without JavaScript. The RSS feed still contains the latest 50 changes.

`npm run check:budget` limits every changelog HTML file to 1 MB uncompressed, leaving room below Ahrefs' 2 MB crawl limit. Gzip size alone does not catch this problem.

## Explorer indexing

Explorer keeps its search, category, type, risk, and sort filters in the URL. Results are paged 50 at a time. `robots.txt` disallows query variants of `/explorer/` (including the slashless form) so crawlers do not spend time rendering combinations of filters. The unfiltered Explorer remains crawlable.

This follows Google's [faceted navigation guidance](https://developers.google.com/crawling/docs/faceted-navigation). Canonical tags alone are a weaker control for large filter spaces. Blocking crawling does not immediately remove previously known URLs from Google's reports, and blocked URLs cannot be crawled to read a `noindex` tag. Judge coverage using **All submitted pages**, not a goal of indexing every known filter URL.

The canonical URL stays `/explorer/`. Empty results retain the existing client-rendered `noindex, follow` fallback for crawlers that do render them. Loading and failed data requests do not trigger it. Static export cannot vary HTTP status by query string.

The [category directory](https://freetier.wiki/category/) links every populated category, and each category's static HTML links all its entries. The home page and site footer link the directory. This keeps every entry reachable within three links from home without JavaScript, query URLs, or the Explorer's load-more button. The sitemap contains only canonical landing pages and dates entries by actual content changes.

## Audience analytics

For audience measurement, use Cloudflare **Observability → Analytics → Web analytics**, select `freetier.wiki`, choose the period, and keep **Exclude bots = Yes**. The domain overview's **Unique Visitors** counts network activity, including automation; it is not a count of human readers.

Web Analytics **Visits** counts arrivals from an external referrer or direct link, not distinct people. One visit can have several page views. Its JavaScript beacon can be blocked, bot detection is imperfect, and longer reporting windows use sampling. Check **Manage site → Real User Measurements** when interpreting geographic coverage: **Enable, excluding visitor data in the EU** omits EU visits entirely. Collection changes affect future data and cannot recover historical gaps. See Cloudflare's [metric definitions](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/) and [collection limitations](https://developers.cloudflare.com/web-analytics/faq/).
