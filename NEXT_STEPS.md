# FreeTierWiki — Status & Roadmap
_State refreshed: 2026-10-09._

## Visitor-first pass — 2026-10-08 (on main, live)
Home: a trust line under the hero ("Every entry is checked against its official pricing page"),
a "Pick by job" grid with one card per comparison table (`liveComparisons` in
`src/lib/comparison-view.ts`, shared with `/compare/`), and the home changelog now lists only
`changed` and `ended` rows. The "Recently added" grid is gone; new entries and removed listings
stay on `/changelog/`. Entry pages: the facts label now comes right after the title on a phone
(the buttons moved below it), and a "Compared in" row links to every comparison table the entry
is in (`comparisonsFor`). Tests: `tests/unit/comparison-view.test.ts`, home and detail e2e specs. The hero card is "Most visited"
once `content/popular.json` exists: `.github/workflows/popular.yml` runs every Monday, asks Cloudflare
Web Analytics (GraphQL `rumPageloadEventsAdaptiveGroups` with `bot: 0`, page loads from real browsers,
last 30 days, one query per day so plan retention limits only shorten the window) and commits the
ordered entry paths — never counts — to main (`scripts/popular/fetch-views.mjs`,
`src/lib/popular-file.ts`, `src/lib/popular-view.ts`). Until 2026-10-09 it read the raw request log
(`httpRequestsAdaptiveGroups`), which was 99 percent crawlers, so the list ranked what bots fetched.
It needs the repository secret `CLOUDFLARE_API_TOKEN` (Account/Account Analytics/Read on the account
that owns the Web Analytics site) plus the repository variables `CLOUDFLARE_ACCOUNT_ID` and
`CLOUDFLARE_SITE_TAG` (the site-lookup endpoint needs more than analytics read); without the token
the job ends early. Until the first run the hand-picked "Common first picks" card
(`POPULAR_PICKS`) shows instead.

## Deepen sweep done — 2026-10-09 (read this first)
The one-sweep plan (`docs/plans/2026-10-09-deepen-every-entry.md`) is done on branch `deepen/day0`
(PR #32). Every live entry (696) has the five-section body and passes `npm run check:depth --
--all --evidence`. 36 worker chunks, each checked against official pages fetched that day; the whole
entry was reworked, not only pricing (description, use cases, fit text, sign-up and first steps,
tags, sources). Many frontmatter facts were corrected; entries whose free offer changed got
`status: changed` and a dated `changes` item.
- Removed (redirects + changelog): Pastefy and PullFlow (antivirus warns about their sites);
  Supermaven, Gemini Code Assist, Hugging Face Inference Providers, Huly, HeyForm, Atlas App
  Services, AWS CodeCommit (free plan or product gone).
- Site: entry pages have an "On this page" jump menu, fit cards first, a visible "How to get
  started" list, provider and category links, all sources in the facts box, breadcrumb and FAQPage
  structured data, and the free-tier summary as meta description. New provider pages
  (`/provider/<slug>/`, providers with two or more entries) are in the sitemap. The explorer's
  search text keeps each word once (`searchWords`), so `explorer.json` stays under its budget.
- Tools: `npm run verify:evidence` (fetch sources), `npm run verify:show` (excerpts),
  `npm run check:depth` (CI step). Evidence lives in `development/verify/deepen/` (gitignored).
- Gates: lint, typecheck, unit (156), build, budget (4 of 4), e2e (73 passed, 5 skipped).

Open items for the owner:
1. Merge PR #32 (the merge was blocked for the agent).
2. Skipped (bodies from frontmatter only, dates unchanged, no page readable): `tools/seotest-me`,
   `services/contentful` (429 to every fetch), `services/localit`, `services/azure-blob-storage`,
   `services/azure-disk-storage`.
3. Worth a decision: `services/gcore` (no clearly labeled free CDN plan), `services/teamhood`
   (free plan only on the Classic plans page), `services/waiverstevie-com` (free = watermarked test
   environment), `services/pingbreak-com` (sign-in asks for broad X permissions),
   `tools/virgil-security` (pages from 2020/2021), `services/azure-ai-face` (approval only),
   trial-only entries (SendGrid, HostedScan, Seafile, CatchJS, elmah.io).
4. Recheck by hand: `services/gtmetrix-com` (pricing 403), `services/cloudflare-zero-trust`
   (50-user figure from a 2021 post), `tools/tomorrow-io-weather-api` (rate figures unverified),
   `tools/zapier` (webhooks on Free: pricing table and help article disagree).

## Where things stand — 2026-10-09 (earlier)
Discovery day. Real traffic measured for the first time: about 90 human visits per 30 days
(Cloudflare Web Analytics, bots excluded); the raw request log (117k requests) is 99 percent
crawlers. Google Search Console now exists (domain property, TXT-verified, sitemap submitted) and
Bing Webmaster Tools imported it (sitemap submitted). The weekly "most visited" job switched from
the request log to Web Analytics page loads with the bot filter on (`aa34a95`, `5a108e4`); the new
list is on main (`df8c073`). Three commits, no release tag; `v1.1.0` stays the last tag.

Open work, in the order I would do it:
1. **Deepen every entry, one sweep.** Owner decision, brief in
   `docs/plans/2026-10-09-deepen-every-entry.md`. Run it on Claude Opus 5.5. Start
   with Day 0 (validator, body rendering, 5 hand-made entries), then batches of 100.
2. In 2 to 3 days: read the first Search Console and Bing reports (index coverage, queries) and
   fold what they show into the sweep's FAQ sections.
3. Weekly pricing issue (label `freshness`) as before.

## Where things stand — 2026-10-08 (previous)
Main is clean, deployed, and tagged `v1.1.0`. Eleven PRs merged on 2026-10-08 (#21–#31): OCR.space
fix, Phase 2 domains and utility removals, native dialog, alternatives fix, self-hosted fonts,
comparison pages (16 topics), live Lighthouse run, changelog filters, release 1.1.0, and one revert
(idle explorer fetch, measured as worse). GitHub Pages is off. Branches are deleted after merge;
only `main` and `freshness-data` exist.

Open work, in the order I would do it:
1. Weekly pricing issue (label `freshness`) every Monday: re-check listed entries with
   `scripts/verify/`, fix, open a PR, close the issue. Issue #18 stays open for six evidence gaps.
2. More comparison topics in `content/comparisons.json` when a job has at least seven live entries.
   22 exist (2026-10-08: web scraping, log management, realtime messaging, message queues, PDF
   generation, and translation management were the last six). Skipped: Redis/KV (four entries),
   search APIs (two), webhook delivery (three), containers (six). No candidate with seven live
   entries is left; add one when the content grows.
3. Nothing else is open. The list below is history.

Gates for any change: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`,
`npm run check:budget`, `npm run test:e2e` (needs the build in `out/`). CI runs the same.

## Pricing review — 2026-10-06
The [issue #18 review ledger](docs/reviews/2026-10-06-pricing-18.md) accounts for all 127 follow-up
entries (120 distinct pricing URLs): 26 corrected, 95 verified unchanged, and 6 unresolved.
Corrections include Neon storage, Firebase Spark versus Blaze limits, v0 credit renewal,
Gemini paid-tier grounding, Appetize quotas, and RapidAPI billing risks. Pipedream's announced
March 31, 2027 Workflows/String shutdown is recorded; Connect remains supported.
The documentation follow-up resolves nine more gaps and partially corrects four others, including
Azure billing risk and Zipcodestack credit units. On 2026-10-08 five of the six gaps were closed in a
real browser: HS Ping and Invantive verified unchanged; Zipcodestack has no daily cap; Namae's hosted
site is live; W&B pricing moved to CoreWeave Forge and lists no free self-hosted plan. One gap remains:
Azure disk redundancy (the free-services list does not render in any browser). Keep #18 open for it. Four corroborated unchanged offers received new verification
dates; all unresolved entries retain their prior verification dates.

## What this is
A decision-first atlas of free-tier offerings for developers and tools, rated
on billing risk, quota shape, and production readiness. Built as a static Next.js 16 (App Router)
export with TypeScript, Tailwind CSS 3.4, native `<dialog>` elements, and FlexSearch loaded lazily on
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
- 32 entries could not be checked at first (bot blocks, no public pricing). On 2026-10-01 they were
  read with a real browser: 21 were corrected and dated, and 11 were removed (site gone, no free plan,
  wrong product, or no way to check, like GitGud). Every entry now has `lastVerified`.
- Three Azure storage entries (Blob, Disk, File) keep their 2026-09-26 date. Microsoft's free
  services list is hidden behind JavaScript, so nobody could re-read it. Other sources show 5 GB of
  free blob and file storage for 12 months.
- A unit test keeps the risk fields consistent for every entry (`tests/unit/content-files.test.ts`).
- The tools live in `scripts/verify/`: `fetch-pages.mjs`, `list-entries.mjs`, `remove-entries.mjs`.

## New entries — 2026-10-01
84 new entries were added (the atlas now has 723). Each one was read from its official pricing page
on 2026-10-01 and has `lastVerified`, a `pricingUrl`, and a `new` item in `changes`, so it shows as
"New" in the changelog. Main gaps filled: Cloudflare's developer platform (Workers AI, AI Gateway,
Durable Objects, Queues, Hyperdrive, Vectorize, Images, Turnstile, Web Analytics), AI coding tools
(GitHub Copilot Free, Cursor, Kiro, Gemini Code Assist), AI data tools (Firecrawl, Jina Reader, Exa,
E2B), vector and serverless databases (Weaviate, Zilliz, TiDB, Prisma Postgres, Convex), background
jobs (Trigger.dev, Inngest, Hatchet), auth (Cognito, Stytch, Hanko, Frontegg), monitoring
(Honeycomb, UptimeRobot, Healthchecks.io), product analytics (Mixpanel, Amplitude, Clarity),
networking (Tailscale, ZeroTier, ngrok), and well-known tools (Figma, Penpot, Linear, Tally, Docker
Hub).

Checked but not added: GitHub Models (retired 2026-07-30), SambaNova and Cerebras (no free tier,
only paid credits or a card-gated trial), InstantDB (team joined OpenAI), Xata, Strapi Cloud, Unkey
(no free plan), and Chroma Cloud (one-time credit only).

On 2026-10-02 five entries that first needed a browser were read and added (the atlas now has 717, after the 11 removals of 2026-10-01):
Appwrite Cloud, Mistral API, Snyk, hCaptcha (10,000 free requests a month on the official plans page),
and LaunchDarkly.

`explorer.json` reached 78.8 KB (gzip), so its size budget was raised from 80 KB to 100 KB. Cloudflare
Pages serves static files at no cost, so the budget is only a speed guard. Trimming fields the
explorer list does not show would win the room back.

## Home page for visitors — 2026-10-01
The home page now leads with what a first-time visitor needs. A "Popular free picks" card (one
well-known free plan per common need, set in `POPULAR_PICKS` in `src/app/page.tsx`) replaced the
sample facts label. A "Recently added" grid replaced the "How we rate" legend (the About page still
explains the ratings). The "N of M entries checked" progress strip is gone. The home changelog skips
"new" items, because they have their own section.

## Small wins — 2026-10-02
- Search tags cleaned: the meaningless `misc` tag is gone from every entry, and about 20 wrong tags are
  gone too (for example `ai` on a username checker). The old `scripts/normalize-tags.mjs` matched parts
  of words ("ai" inside "domain"); it now matches whole words and never adds `misc`. A unit test keeps
  every entry with at least one real tag and no `misc`.
- The changelog has an RSS feed at `/changelog/feed.xml` (newest 50 items), linked from the changelog
  page and the page head.
- `CONTRIBUTING.md` and `.github/pull_request_template.md` (source URL, quote, date) added.
- The Fly.io card caveat was already in the entry; that roadmap item is closed.

## Phase 2 — data trust (done 2026-10-08)
- Done: the rating rule is enforced by `tests/unit/content-files.test.ts` ("risk and plan fields
  agree"): overage risk `none` needs no card and either a hard cap or an always-free plan. All 717
  entries pass (the 38 always-free entries without a hard cap are "no limits" services with no
  paid overage, checked 2026-10-08). The content check of 2026-09-30 had already re-rated the rest.
- Done: the vague domains `productivity`, `integration`, and `operations` are gone. Their 183
  entries now sit in `collaboration`, `forms`, `localization`, `documents`, `apis`, `scraping`,
  `automation`, or an existing domain (`devops`, `messaging`, `ai`, `analytics`). The mapping is
  `scripts/migrations/2026-10-phase2-domains.mjs`; old category URLs redirect; changelog records
  were remapped. The `category` field still mirrors `domain`.
- Done: 12 online utilities that are not developer services were removed (JSON formatters, diff
  pages, CyberChef, a username checker, disposable inboxes). Old URLs redirect to the category and
  the removals are in `content/changelog.json`. 705 entries remain.

## Phase 3 — fresh by default (built, running weekly)
- The weekly check is `.github/workflows/freshness.yml` (Mondays 04:17 UTC, or run it by hand from the
  Actions tab). It reads every entry's official page, hashes the price-related text, and compares it with
  last week. The hashes live on the `freshness-data` branch, so `main` and the production deploy do not
  change. The first run only builds the baseline.
- It opens an issue (label `freshness`) that lists entries whose text changed, and entries whose page was
  not found in two runs in a row. Pages that change every week are listed as noise. Pages that block bots
  or show almost no text are counted but never flagged.
- A changed hash means "look at this entry", not "the price changed". Re-check the entry with the tools in
  `scripts/verify/`, fix it, and set a new `lastVerified`.
- Not built: opening pull requests with drafted fixes, and a check of `docsUrl`.

## Phase 4 — release
- Done: `v1.0.0` is tagged.

## Also worth doing (not phase-gated)
- Done 2026-10-08: the search box and the phone filter sheet use a native `<dialog>`
  (`src/components/ui/modal.tsx`). `@base-ui/react` is gone. Home JS went from 170.7 KB to 150.4 KB
  (gzip).
- Done 2026-10-08: Lighthouse 13 (mobile, headless) against the live domain. Performance / A11y /
  Best practices / SEO: home 92/100/100/100, `/services/supabase/` 94/100/100/100,
  `/compare/postgres-hosting/` 94/100/100/100, `/explorer/` 80/100/100/100. LCP is the `h1` text at
  about 3.0 s; the explorer is slower (LCP 4.0 s, TBT 240 ms) because it loads `explorer.json` and
  the filter code. Cheap win applied: the three mono font files are no longer preloaded (45 KB less
  before first paint). "No compression" in the report is a headless-Chrome artefact: the live HTML
  is 10 KB with brotli (75 KB plain). Left alone: 14 KB of polyfills in a Next chunk, 12 KB unused
  CSS. Tried the same day and reverted: fetching `explorer.json` on idle instead of at mount. Four
  live runs: blocking time went up (410–660 ms vs 210–350 ms), LCP unchanged at about 4 s. The cost
  is parsing and ranking 705 rows plus five facet counts, not the download. A real fix would ship
  precomputed facet counts and a smaller first payload; not started.
- Done 2026-10-08: the changelog has All / New / Changed / Removed filters (Ended appears once an
  entry records that change). Radio inputs plus CSS `:has()`, no JavaScript; rows carry `data-kind`.
- Already done (since the Phase 1 explorer, checked 2026-10-08): filters live in the URL
  (`src/lib/explorer-query.ts`) and the default view is pre-rendered with the first 50 rows.
- Already done (checked 2026-10-08): detail pages show "Other free … options", the four safest live
  entries in the same category (`relatedItems` in `src/lib/entry-view.ts`). Ended offers are now
  excluded.
- Done 2026-10-08: comparison pages at `/compare/` (index) and `/compare/<slug>/`. Eight hand-picked
  topics in `content/comparisons.json` (Postgres, serverless functions, email APIs, object storage,
  auth, uptime monitoring, static hosting, error tracking). Rows reuse the entry list, safest first;
  ended entries are dropped and a unit test rejects missing ids. Linked from the header, footer, and
  sitemap. Later the same day: 16 topics, and a hard/soft cap label in the card column (`showCap`).
- Done 2026-10-08: IBM Plex Sans and Mono are self-hosted from `src/fonts/` (`next/font/local`, OFL).
  A build never calls Google Fonts. The OG image template still links Google Fonts; it is rendered
  by hand, not in CI.

(Ideas above come partly from the 2026-09-24 audit on the retired branch `cld/sweet-hawking-isxiyq`;
the rest of that audit is done.)

## Owner actions (outside the repo)
- Done: GitHub Pages is off (it was found on again and turned off via the API on 2026-10-08; the
  raw repo had been published at 0langa.github.io/FreeTierWiki). Cloudflare Web Analytics is on for freetier.wiki ("Enable, excluding visitor
  data in the EU").
- Optionally, redirect `freetierwiki.pages.dev` to `freetier.wiki`.
- The first weekly run only builds the baseline and opens no issue. Read the issue from the second run on.

## Effort to next milestone
Phases 1–4 and the first pricing review are done. What is left is small and incremental: the weekly
issue and more comparison topics. v1.1.0 is tagged (2026-10-08).
