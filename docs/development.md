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

## Explorer indexing

Explorer keeps its search, category, type, risk, and sort filters in the URL. Results are paged 50 at a time. A query with no results adds `noindex, follow` to the rendered page head; loading and failed data requests do not trigger it. The tag is removed when filters produce results again.

This follows Google's [client-rendered soft 404 guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics#avoid-soft-404s). Static export cannot vary HTTP status by query string, so the rule requires JavaScript rendering. The canonical URL stays `/explorer/`; category and entry pages remain eligible for indexing.
