# FreeTierWiki

**Choose free tiers with real constraints, not wishful thinking.**

[freetier.wiki](https://freetier.wiki) lists free plans for developers — services and tools — and shows what each one actually gives you: the limits, whether it needs a card, the billing risk, and how fresh that information is.

---

## How to use the site

### Home

The home page is built for a first visit: a search box, quick filter chips, "Most visited" (the entries real visitors opened in the last 30 days, from Cloudflare; until that list exists, a hand-picked "Common first picks" card), "Pick by job" (one card per comparison table), browsing by category, "Safe places to start", and, as a footnote at the bottom, the latest plans that changed or ended. New entries and removed listings stay on the changelog page.

### Explorer

Open **Explorer** to filter and search every entry. Every filter — search text, category, type, risk, and sort — lives in the URL, so a link or the back button always returns the same view. Results are paged 50 at a time.

### Category pages

Each category (Hosting, Database, AI, and so on) has its own page listing just its entries.

### Comparison pages

`/compare/` lists hand-picked tables for one job each, such as "Free Postgres hosting compared". A table reuses the entry list: what you get free, card, risk, freshness, safest first. Topics and their rows live in `content/comparisons.json`.

### Detail pages

Each entry has a detail page with a "Free tier facts" label: the plan type, whether a card is required, the billing risk, and the limits, styled like a nutrition label. On a phone the label comes right after the title. Below it: links to the official pricing page and docs, "Compared in" links to every comparison table the entry is in, when to use it, when not to, a quickstart, and other free options in the same category.

Every detail page also has a **freshness label**:
- A green date with a check mark means someone compared the entry with the official pricing page on that date.
- A gray date means the entry has not been re-checked since it was first written; it may be out of date.
- `Changed` or `Ended` pills mark offers that stopped being what they used to be.

If you spot something wrong, use **Report outdated info** on the entry — it opens a short GitHub issue form with the entry's link pre-filled.

### Changelog

The `/changelog/` page lists every entry that changed, ended, or was removed, newest first, with All / New / Changed / Removed filters that work without JavaScript. Follow it with the RSS feed at `/changelog/feed.xml`.

---

## Ratings & labels

See [`/about/`](https://freetier.wiki/about/) for the full explanation. Summary:

**Billing risk**
| Level | Meaning |
|---|---|
| **None** | The plan is unlimited, or going over the limit stops or throttles the service. You should not get a bill by accident. |
| **Low** | Going over is unlikely to cost money, but read the watch-out notes. |
| **Medium** | A card is on file and usage above the free amount is billed. Set a spending limit. |
| **High** | No real free plan, or usage is billed from the start. |

**Plan types**
- **Always free** — the free amount renews and does not expire.
- **Credit** — a money amount you spend down.
- **Trial** — free for a limited time.
- **Time-limited** — free for a set period after sign-up, then it changes.

**Freshness labels**
- Checked (date with a check mark) — compared against the official pricing page on that date; turns stale after 180 days.
- Imported (gray date) — the entry's data is from that date and has not been re-checked since.

**Status**
- `active` — the free tier is as described.
- `changed` — the free tier changed; see the entry's changelog notes.
- `ended` — the free tier no longer exists.

---

## Tech stack

- Next.js 16 (App Router), static export (`output: "export"`)
- TypeScript, strict mode
- Tailwind CSS 3.4
- IBM Plex Sans and Mono, self-hosted from `src/fonts/` (OFL-1.1)
- Native `<dialog>` for the search box and the phone filter sheet (`src/components/ui/modal.tsx`)
- FlexSearch, loaded lazily only when someone searches
- Frontmatter + MDX content pipeline
- Vitest (unit tests) and Playwright (end-to-end tests)

---

## Local development

```bash
npm ci
npm run dev
```

Before pushing, run the same checks CI runs:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run check:budget
npx playwright install chromium
npm run test:e2e
```

On a low-memory machine, the default build can run out of memory. Limit build workers instead:

```bash
NEXT_BUILD_CPUS=2 npm run build
```

---

## Content

Entries live under `content/services/` and `content/tools/` as MDX files with frontmatter. Key fields:

- `lastVerified` — ISO date (`2026-09-25`) someone last checked the entry against the official pricing page. Drives the freshness label; stale after 180 days (`STALE_AFTER_DAYS`).
- `status` — `active`, `changed`, or `ended`.
- `pricingUrl` — link to the provider's current pricing page.
- `changes` — a list of `{ date, kind, note }` entries, where `kind` is `ended`, `changed`, or `new`. Feeds the changelog.

`content/comparisons.json` holds the comparison pages: `slug`, `title`, `intro`, and `entries` (ids like `services:neon`). A unit test fails when an id is missing or its entry has ended.

**Rule:** an entry with `status: changed` or `status: ended` must have at least one `changes` item and a `lastVerified` date. This is enforced by the content parser and covered by unit tests (`npm test`).

### Checking entries

Every entry should match its official pricing page. The tools under `scripts/verify/` help:

- `npm run verify:fetch -- --domains hosting,database` saves the pricing-page text under `development/verify/pages/`.
- `npm run verify:list -- --domains hosting --size 20` prints the work chunks.
- `npm run verify:remove -- --from deletes.json --date YYYY-MM-DD` deletes entries, adds 301 redirects to their category, and records them in `content/changelog.json`.
- `npm run verify:freshness` reads every entry's pricing page, hashes the price-related text, and reports what changed since the last run. The weekly workflow `.github/workflows/freshness.yml` runs it and opens an issue.

Rules: an entry stays only if developers can use it free (always-free plan, credit, or trial). Paid-only, closed, off-topic, and duplicate entries are removed.

---

## Deploy

Cloudflare Pages builds the `main` branch with `npm run build`, serving the `out/` directory, using the Node version pinned in `.nvmrc`. `public/_redirects` holds the 301 redirects for URLs removed or moved during the redesign.

GitHub Actions (`.github/workflows/ci.yml`) runs lint, typecheck, unit tests, the build, the size budget check, and end-to-end tests on every push to `main` and every pull request. It only checks — it does not deploy.

---

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

---

## License

MIT — see the GitHub repository for details.

---

*FreeTierWiki is a living catalog. Each entry shows how fresh it is. Always verify current pricing and limits on the provider's official website before making architectural decisions.*
