# FreeTierWiki — Status & Roadmap
_State refreshed: 2026-09-28._

## What this is
A decision-first atlas of free-tier offerings for developers and tools, rated
on billing risk, quota shape, and production readiness. Built as a static Next.js 16 (App Router)
export with TypeScript, Tailwind CSS 3.4, a Base UI search dialog, and FlexSearch loaded lazily on
first search. Content is frontmatter + MDX under `content/`.

## Current state — Phase 1 redesign done
The Phase 1 redesign (new home, explorer, category, detail, changelog, and about pages; honest
freshness labels; sitemap/robots/Open Graph; Cloudflare Pages hosting; checks-only CI; an
"Outdated info" issue form) is complete on `redesign/phase1`.

Gate results at the end of the redesign (Task 10): unit tests 59 passed across 9 files; end-to-end
tests 52 passed (26 tests, desktop and phone); lint 0 warnings; typecheck clean; size budget 4 of 4
checks OK.

The schema supports `status` (`active` / `changed` / `ended`), `lastVerified`, `pricingUrl`, and a
`changes` list; four entries used them at first. Freshness and status drive the UI: a checked date, a
"not re-checked since" import date, or a `Changed`/`Ended` pill. Two entries were verified and
corrected during this pass: Fly.io (changed, fly.io/docs/about/pricing/), and Railway
(changed, docs.railway.com/reference/pricing/plans).

Deployment moved to Cloudflare Pages only; GitHub Actions (`ci.yml`) now only runs checks
(lint, typecheck, unit tests, build, size budget, end-to-end tests) on push to `main` and on every
pull request — it does not deploy.

## Content check — done (2026-09-26 to 2026-09-30)
Every entry was checked against its provider's official pricing page twice. The first pass ran in
six batches (PRs #4 to #9; the tooling came in PR #3). A second, full pass re-read every checked
entry; more than 4 in 10 of them needed a fix (about 270 of 607) (mostly a user or seat count, a paid-plan number used for the
free plan, or a wrong card or risk flag).

- 639 entries remain. 607 of them (95%) have `lastVerified`, a `pricingUrl`, and limits taken from
  the official page.
- 95 entries were removed: no free plan, product gone, not a developer tool, only a cloud provider's
  general sign-up credit, or a duplicate. Each has a 301 redirect and a "Removed" record in
  `content/changelog.json`.
- 32 entries could not be checked (bot blocks, no public pricing). They keep the gray
  "not re-checked" date.
- Three Azure storage entries (Blob, Disk, File) keep their 2026-09-26 date. Microsoft's free
  services list is hidden behind JavaScript, so nobody could re-read it. Other sources show 5 GB of
  free blob and file storage for 12 months.
- A unit test keeps the risk fields consistent for every entry (`tests/unit/content-files.test.ts`).
- The tools live in `scripts/verify/`: `fetch-pages.mjs`, `list-entries.mjs`, `remove-entries.mjs`.

## Phase 2 — data trust (next)
- Re-check the 32 entries that could not be verified, by hand or with a real browser.
- Tighten rating rules: overage risk `none` only when there is a hard cap or the plan is truly
  unlimited, and no card is required. Re-rate entries against this rule.
- Recategorize vague domains (`integration`, `productivity`, `operations`); decide whether to keep
  free online utilities (JSON formatters, temp mail, IP checkers) at all.
- Add a caveat to the Fly.io entry: no card is needed to start the trial.

## Phase 3 — fresh by default (later)
- A weekly job that fetches each provider's pricing page, diffs it against the stored entry, and
  opens a pull request when something changed.
- Dead links (official site or docs URL returning an error) open an issue automatically.

## Phase 4 — release
- Tag `v1.0.0` now that the content check is done.

## Also worth doing (not phase-gated)
- Replace the Base UI dialog with a native `<dialog>` element — saves about 20 KB of JS and drops a
  dependency.
- Re-run Lighthouse against the live `freetier.wiki` domain after deploy (last run was against the
  local server, uncompressed: Performance 71, Accessibility 100, SEO 100 on `/` and
  `/services/supabase/`).
- Turn the changelog's Ended/Changed/New filters back on once the list is long enough to need them
  (postponed in Phase 1).
- Explorer: write the filter state to the URL, and pre-render the default view so crawlers and
  no-JS visitors see real rows.
- Detail pages: suggest alternatives (same category, lower risk, checked).
- Comparison pages generated from the data, for example "Free Postgres hosting compared".
- An RSS/Atom feed of the changelog.
- `CONTRIBUTING.md` and a PR template with a check list (source URL, quote, date).
- Self-host the fonts (`next/font/local`) so a CI build never depends on a Google Fonts download.

(Ideas above come partly from the 2026-09-24 audit on the retired branch `cld/sweet-hawking-isxiyq`;
the rest of that audit is done.)

## Owner actions (outside the repo)
- Turn off GitHub Pages in the repository settings — the workflow no longer deploys there.
- Turn on Cloudflare Web Analytics for the Pages project.
- Optionally, redirect `freetierwiki.pages.dev` to `freetier.wiki`.
- Merge `redesign/phase1` into `main` when ready — pushing `main` deploys through Cloudflare Pages.

## Effort to next milestone
Phase 2 (data trust pass over ~145 core entries) is S–M (a few days to two weeks) part-time solo —
mostly verification against provider pricing pages, not new feature work.
