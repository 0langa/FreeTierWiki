# FreeTierWiki — Status & Roadmap
_State refreshed: 2026-09-26._

## What this is
A decision-first atlas of free-tier offerings for developers, tools, and learning resources, rated
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

Every entry now carries `status` (`active` / `changed` / `ended`), `lastVerified`, `pricingUrl`, and
a `changes` list. Freshness and status drive the UI: a checked date, an "not re-checked since"
import date, or a `Changed`/`Ended` pill. Four entries were verified and corrected during this pass:
PlanetScale (ended), Vercel Postgres (ended), Fly.io (changed), and Railway (changed) — sources are
in the redesign spec's deviations section.

Deployment moved to Cloudflare Pages only; GitHub Actions (`ci.yml`) now only runs checks
(lint, typecheck, unit tests, build, size budget, end-to-end tests) on push to `main` and on every
pull request — it does not deploy.

## Phase 2 — data trust (next)
- Verify the most-visited entries first (Hosting, Database, AI), setting `lastVerified` on each.
- Tighten rating rules: overage risk `none` only when there is a hard cap or the plan is truly
  unlimited, and no card is required. Re-rate entries against this rule.
- Review the AI-written long tail against each provider's own website; fix, label, or remove wrong
  entries (for example Cray, Huly, Plunk, Sweego, Pullflow).
- Recategorize vague domains (`integration`, `productivity`, `operations`); decide whether to keep
  free online utilities (JSON formatters, temp mail, IP checkers) at all.
- Add a caveat to the Fly.io entry: no card is needed to start the trial.

## Phase 3 — fresh by default (later)
- A weekly job that fetches each provider's pricing page, diffs it against the stored entry, and
  opens a pull request when something changed.
- Dead links (official site or docs URL returning an error) open an issue automatically.

## Phase 4 — release
- Tag `v1.0.0` once Phase 2's core-entry verification pass is done.

## Also worth doing (not phase-gated)
- Replace the Base UI dialog with a native `<dialog>` element — saves about 20 KB of JS and drops a
  dependency.
- Re-run Lighthouse against the live `freetier.wiki` domain after deploy (last run was against the
  local server, uncompressed: Performance 71, Accessibility 100, SEO 100 on `/` and
  `/services/supabase/`).
- Turn the changelog's Ended/Changed/New filters back on once the list is long enough to need them
  (postponed in Phase 1).

## Owner actions (outside the repo)
- Turn off GitHub Pages in the repository settings — the workflow no longer deploys there.
- Turn on Cloudflare Web Analytics for the Pages project.
- Optionally, redirect `freetierwiki.pages.dev` to `freetier.wiki`.
- Merge `redesign/phase1` into `main` when ready — pushing `main` deploys through Cloudflare Pages.

## Effort to next milestone
Phase 2 (data trust pass over ~145 core entries) is S–M (a few days to two weeks) part-time solo —
mostly verification against provider pricing pages, not new feature work.
