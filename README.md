# FreeTierAtlas

FreeTierAtlas is a fully static, content-first platform for evaluating and using free-tier products with engineering-grade decision support.

## Stack

- Next.js (App Router) with static export
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Contentlayer + MDX content pipeline
- TanStack Table explorer
- FlexSearch client search using build-generated index
- Zustand UI/filter state

## Quick Start

```bash
npm install
npm run search:index
npm run build:static
```

For local development:

```bash
npm run dev
```

## Project Layout

- `content/` source MDX entries grouped by type
- `src/app` static routes and page templates
- `src/components` layout, explorer, and content rendering modules
- `src/lib/content.ts` typed registry and navigation datasets
- `scripts/build-search-index.mjs` build-time search record generator
- `docs/` contributor and operations docs

## Build + Export

`npm run build:static` performs:

1. search index generation
2. Contentlayer build
3. Next.js build
4. static export

Artifacts are written to `out/` and are ready for GitHub Pages deployment.

## Content Categories

- services
- tools
- resources
- guides
- playbooks
- comparisons

Each entry is an MDX file with strict frontmatter and shared schema fields.

See [docs/content-schema.md](./docs/content-schema.md) and [docs/adding-content.md](./docs/adding-content.md).
