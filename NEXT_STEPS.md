# FreeTierWiki — Status & Roadmap
_Portfolio audit: 2026-07-11. State refreshed: 2026-09-19._

## What this is
A decision-first atlas of free-tier offerings: ~760 MDX entries (594 services, 132 tools, 34
resources under `content/`) rated on billing risk, quota shape, and production readiness. Built as
a static Next.js 16 (App Router) export with TypeScript, Tailwind + shadcn/ui, a TanStack Table
explorer (`src/app/explorer/`), FlexSearch over a build-generated index
(`src/generated/search-index.json`, built by `scripts/build-search-index.mjs`), and Zustand filter
state. Content operations are supported by an AI batch-ingestion workflow under `development/`.

## Current state
Deployed to GitHub Pages via `.github/workflows/deploy-pages.yml` (base path `/FreeTierWiki`).
The current branch has 53 commits and no tags or releases. The latest commit, `3f0ef7a`, removed
the generated redesign patch from version control. `package.json` says 1.0.0, but nothing is
tagged. The site works end to end: home page,
explorer with multi-facet filtering/sorting, detail pages, client search, theme toggle.

Loose ends observed:
- README's deploy section still documents Cloudflare Pages and `wrangler.toml`, but the actual
  pipeline is GitHub Pages (`wrangler.toml` was deleted in commit `4e426c4`); `wrangler` also
  lingers in `devDependencies`. `development/docs/deployment.md` names the workflow `deploy.yml`
  but the real file is `deploy-pages.yml`.
- The generated `freetierwiki-explorer-redesign-v2.patch` is no longer tracked and root-level
  `*.patch` files are ignored. A local ignored copy can remain without affecting repository state.
- Commit history contains throwaway messages ("jj", "..", "hm") — fine for a solo repo, worth
  tidying habits before showcasing.
- No automated tests and no lint/typecheck gate in CI; a broken change deploys straight to Pages.
- Content freshness is unmanaged: entries have no visible "last verified" story, which matters for
  a site whose whole value is trustworthy free-tier limits.

## Definition of "finished"
A tagged 1.0: the live GitHub Pages site with accurate deploy docs, CI that lints/typechecks and
validates content before deploying, per-entry `lastVerified` dates surfaced in the UI, basic SEO
(sitemap, per-page metadata, OG images), and a repeatable content-refresh loop using the existing
`development/` batch tooling. No new product surface is required to call this done.

## Roadmap

### Phase 1 — Now (next 1-2 weeks)
- Fix documentation drift: rewrite the README deploy section for GitHub Pages, remove the
  Cloudflare/`wrangler.toml` instructions, drop `wrangler` from `package.json`, and correct the
  workflow name in `development/docs/deployment.md`.
- Add a CI job (extend `deploy-pages.yml` or a new `ci.yml`) running `npm run lint`,
  `npm run typecheck`, and `node scripts/validate-content.mjs content` as a required build step.
- Tag `v1.0.0` once the above is green, so the version in `package.json` means something.

### Phase 2 — Next (2-6 weeks)
- Add `lastVerified` (and optionally `sourceUrl`) to the content frontmatter schema, enforce it in
  `scripts/validate-content.mjs`, and render it on detail pages and as an explorer column.
- Run one full content-refresh pass over the highest-traffic categories (Hosting, Database, AI)
  using the `development/ai` batch scripts; archive stale `development/batch-intake/` and
  `development/reports/` artifacts that are no longer needed in-repo.
- SEO baseline: `sitemap.xml` + `robots.txt` generation in the build, per-entry metadata via App
  Router `generateMetadata`, and a default OG image.
- Add a minimal test layer: unit tests for the search-index builder and content validator, plus one
  Playwright smoke test that loads the exported `out/` site and exercises explorer filtering.

### Phase 3 — Later (optional/stretch)
- Semantic or weighted search ranking (current FlexSearch relevance is purely lexical, noted in
  `development/docs/project_state.md`).
- Community contributions: a "suggest an edit / report stale limits" link per entry backed by
  GitHub issue templates.
- Monitor client-side index size as the catalog grows; split the search index per category if it
  becomes heavy.
- Custom domain and lightweight privacy-friendly analytics to learn which categories people use.

## Effort to "finished"
M (1-4 weeks) part-time solo — the product is live and content-complete; what remains is cleanup,
CI, freshness metadata, and SEO rather than feature work.
