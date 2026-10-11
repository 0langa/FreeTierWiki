# Coverage sweep — add the free tiers the atlas is missing (brief for a fresh session)

Written 2026-10-11 by the session that sized the owner's cloud-credit spend. This file is the whole
context a new session needs. Read it, then the 2026-10-09 blocks in `NEXT_STEPS.md`, then start. The
deepen brief (`docs/plans/2026-10-09-deepen-every-entry.md`) is the model for how a sweep runs here;
this one adds entries instead of rewriting them.

## Status

- 2026-10-11: brief written. Nothing started. Day 0 waits for the owner's yes on the defaults below.

## Why

- The atlas has 685 live entries (566 `content/services/*.mdx`, 119 `content/tools/*.mdx`). Every
  one was deepened and checked against its official pricing page in October 2026, so nothing is
  stale before April 2027. Depth is done; breadth is the gap.
- A slug and title check on 2026-10-11 found no entry for, among others: Airtable, Baserow, NocoDB,
  Retool, Appsmith, Budibase, LiveKit, Daily, Agora, Mapbox, Google Maps Platform, OpenWeatherMap,
  PagerDuty, Atlassian Statuspage, IFTTT, ReadMe, BrowserStack, Back4App, FullStory, LogRocket,
  Umami, Hotjar. Some of these will turn out to have no real free plan. That is the sweep's job to
  find out, from the pages, not from memory.
- The owner's goal is unchanged: everyone who could use a free tier should be able to find and trust
  the entry. About 90 human visits per 30 days (Cloudflare Web Analytics, 2026-10-09). A new entry
  is a new page that can rank for "<provider> free tier" and a new row for the comparison tables.
- Cost context: the owner is spending promotional cloud credits that bill at API rates. A measured
  session on 2026-10-11 spent 71 percent of its cost on new context (cache writes), 24 percent on
  output. Fable 5.1 costs about 2.4 times Opus 5.5 for the same work. So: workers on **Claude Opus
  5.5**, effort **high**, and read excerpts, never whole pages.

## Defaults to confirm at kickoff (owner)

The owner asked for this brief on 2026-10-11 and has not yet said yes to these. Confirm or change
them in the first reply, then do not re-derive them.

1. Model Opus 5.5, effort high, for every worker. (The deepen sweep ran on Opus 5.5 by owner decision.)
2. Day 0 first: candidate list plus 5 hand-made entries, then a stop for the owner's yes.
3. Batches of about 25 candidates per worker, up to 6 workers, grouped by job.
4. Budget cap: the owner names a dollar amount; the orchestrator stops opening new batches when the
   session meters pass it. Rough sizing is at the end of this file.

## Hard rules (do not relax)

1. **Every number comes from a page fetched in this run.** No limits, prices, quotas, or dates from
   memory. Store the fetched text with `npm run verify:evidence -- --add <id> --url <url>` (the
   helpers in `scripts/verify/lib/` do the fetching; `--add` works before the entry file exists).
   The fetched text is evidence; it is never pasted into the entry.
2. **The inclusion rule** (from `CONTRIBUTING.md` and the removals of 2026-09-30 and 2026-10-08):
   an entry exists only if developers can use the product free today: an always-free plan, a
   product-specific credit, or a trial. Not listed: a cloud provider's general sign-up credit; a
   product whose free offer exists only in a blog post or a sales conversation; self-hosted open
   source with no hosted free plan (it is software, not a free tier); products that are not for
   developers; payment processors and the like that charge per use with no free amount; duplicates
   of an existing entry; sites that antivirus software flags.
3. **Check the removed list before adding.** `content/changelog.json` has every removal with its
   reason, and `public/_redirects` has the old URLs. Something removed on purpose (SendGrid, Gcore,
   Supermaven, Pastefy, and others) is not re-added unless the official page now shows a free plan
   the removal note said was missing; then say so in the `changes` note.
4. **A validator gates every entry.** `npm run check:depth -- --ids <id> --evidence` must pass
   (body shape, every number backed by a stored page, fetch date not older than `lastVerified`,
   alternative links to live entries). `npm test` must pass (risk fields agree, real tags, no
   `misc`, comparison ids exist, redirects). Then the full gates per batch: `npm run lint`,
   `npm run typecheck`, `npm test`, `npm run check:depth`, `npm run build`, `npm run check:budget`,
   `npm run test:e2e` (needs `out/`). CI runs the same.
5. **Never commit, push, merge, or open a PR without the owner's explicit ask in that session.**
   Batches land as PRs the owner approves. Do not wait on the owner for routine judgment calls.
6. **Do not touch** `content/popular.json`, `content/changelog.json` (removals only, none expected),
   the workflows, or `content/comparisons.json` before the final step below.
7. **No new domains, no new frontmatter fields, no schema changes.** Use the 20 domains that have
   entries today; `learning` and `other` exist in the schema but are empty, so avoid them.
8. **Rejected candidates are recorded where the next sweep will see them**: a "Checked but not
   added" list with the reason and date in the `NEXT_STEPS.md` block for this sweep (the 2026-10-01
   block has the precedent). `development/` is gitignored, so a report there alone is lost.
9. Alternative lines and FAQ answers must not state numbers the entry's own sources lack.
10. Workspace rules apply: no `.env` reading, no secrets in logs.

## What a new entry needs

Copy the closest recent entry as the template (for example `content/services/supabase.mdx`), keep
every field, and set:

- **File and slug.** `content/services/<slug>.mdx` for infrastructure and APIs an app depends on at
  runtime; `content/tools/<slug>.mdx` for things a developer uses while building (API clients,
  testing, automation, utilities). When unsure, follow the closest existing entry. Slugs are
  lowercase with hyphens; a multi-product provider gets `provider-product` (`cloudflare-workers`,
  `azure-ai-vision`), so the provider page groups them (`src/lib/providers.ts`, two or more entries).
- **Enums** (`src/types/content.ts`): `domain` one of the 20 in use; `pricingModel` free, freemium,
  or trial; `freeTierType` always-free, credit, trial, or time-limited; `overageRisk` none, low,
  medium, or high; `difficulty` beginner, intermediate, or advanced; `productionReadiness`
  prototype, side-project, production-light, or production-ready; `audiences` from student, indie,
  startup, team, enterprise, oss, agency. `category` mirrors `domain`.
- **Risk fields agree** (`tests/unit/content-files.test.ts`): `overageRisk: none` needs
  `requiresCard: false` and either `hasHardCap: true` or an always-free plan. `hasHardCap: false`
  when no page states a stop. `requiresCard: true` only when a page says the free plan needs a card.
- **Dates and sources.** `lastUpdated` and `lastVerified` are the fetch date. `sourceUrls` includes
  `pricingUrl` and every page a number came from. `officialUrl` and `docsUrl` must load.
- **Changelog.** `changes: [{ date, kind: new, note }]` so the entry shows as New on `/changelog/`
  and in the RSS feed. `status` stays `active`.
- **Tags.** Real, whole-word tags that feed search; never `misc`.
- **Scores.** `popularityScore` and `usefulnessScore` only order lists; set them like the closest
  existing entry in the same domain.
- **Body.** The five sections from `CONTRIBUTING.md`, 350 to 700 words: what the free plan gives
  you, when you hit a limit, three gotchas, two or three alternatives in this atlas (live entries
  only; the comparison tables are the place to find them), three questions people ask. Plain
  English, no marketing voice, no `<`, `>`, `{`, `}`.

## Candidates

All unverified. The expected outcome is a guess to be replaced by what the page says. Group work by
job so one worker sees a whole table's worth and can judge the comparison candidates at the end.

- **Internal tools and no-code databases:** Airtable, Baserow, NocoDB, Retool, Appsmith, Budibase.
  With the 13 live `no-code` entries this is a comparison-table candidate.
- **Video and voice APIs:** LiveKit, Daily, Agora, Mux. Expect credits or minute allowances; check
  whether the amount renews.
- **Maps and weather:** Mapbox, Google Maps Platform, HERE, OpenWeatherMap. Google's monthly amount
  is product-specific, so it passes rule 2 if the page confirms it; a general cloud credit does not.
- **On-call, alerting, status:** PagerDuty, Atlassian Statuspage, Opsgenie (check whether it is
  being retired). 14 live entries carry the `alerting` subtype already.
- **Product analytics and session replay:** FullStory, LogRocket, Umami Cloud, Hotjar.
- **Developer tooling:** ReadMe, BrowserStack (open-source plan?), IFTTT, Back4App.
- **Likely no free plan; verify once, record the result, do not write an entry unless the page
  disagrees:** Twilio, PlanetScale, Replicate, RunPod, Typesense Cloud, Meilisearch Cloud, Together
  AI, n8n Cloud, Directus Cloud, Payload Cloud, Plausible, 1Password. Stripe, Paddle, and Lemon
  Squeezy are out of scope under rule 2.

More candidates, in this order of yield:

1. **Names the atlas already mentions without linking.** Grep the entry bodies and
   `whenToUse`/`whenNotToUse` text for product names that have no entry. These are gaps the
   writers themselves felt.
2. **Per-product always-free lists of the big providers.** The atlas already splits Cloudflare,
   Azure, AWS, and Google Cloud into per-product entries (`azure-*`, `compute-engine-e2-micro`,
   `cloudflare-workers`). Read each provider's always-free page and list the products with no entry.
3. **Curated lists** such as free-for.dev on GitHub. Treat them as a list of names to verify, never
   as a source for a number.

Expect about a third of candidates to be rejected. Rejections cost a page fetch, not a body.

## Process

0. **Day 0, one worker, no parallelism.** Build the candidate list from the sources above, deduped
   against existing slugs, titles, `provider` fields, and the removed list; write it to
   `development/verify/reports/<date>-coverage-candidates.md` with, per name: the job, the pricing
   URL to check, and the one-line guess. Then add 5 entries by hand end to end, from different
   domains, with the full gates green. Show the owner the candidate list and one rendered page.
   Get a yes before step 1.
1. **Batches of about 25 candidates, by job.** Up to 6 workers, one batch each, isolated worktrees.
   Each worker, per candidate: fetch the pricing page with `verify:evidence -- --add`; decide
   include or reject from the text; write the entry; run `check:depth --ids <id> --evidence` and
   `npm test`; log rejects with the reason. The orchestrator runs the full gate list once per batch
   before handing the owner a PR.
2. **Pages that block plain fetches.** The cloud container has Chromium and Playwright. Render the
   page headless, save its visible text to a `.txt`, and store it with
   `verify:evidence -- --add <id> --url <url> --file <txt> --via browser`. Read excerpts of the
   stored text, not the whole page. If nothing readable comes back either way, reject with reason
   "no readable pricing page"; do not invent.
3. **Size budget.** `explorer.json` has a 100 KB gzip budget (`scripts/check-budget.mjs`); it was
   78.8 KB at 717 entries on 2026-10-02, before the search-word dedupe. Run `check:budget` after
   every batch. If it fails, trim fields the explorer list does not show; raise the budget only with
   the owner's yes.
4. **Final step, with the owner's yes:** comparison tables in `content/comparisons.json` for jobs
   that now have at least seven live entries. Subtype counts on 2026-10-11 that already cross that
   bar and have no table: `no-code` 13, `alerting` 14, `continuous integration` 7, `NoSQL` 7,
   `surveys` 7, `testing` 7. The 2026-10-08 session judged by hand that no topic was left, so
   recheck each against the actual entries, not the subtype label. A unit test rejects missing ids.
5. **Docs in the same change:** `NEXT_STEPS.md` gets a dated block with the counts, the PRs, the
   "Checked but not added" list, and open items; this file's Status gets a line per milestone.

## Sizing

- The deepen sweep was sized at 15,000 to 20,000 tokens per entry. A new entry reads the same pages
  and also writes the frontmatter, so plan 20,000 to 30,000 tokens per candidate, with a third of
  candidates ending as a cheap reject.
- At Opus 5.5 list prices ($4 per million input, $20 per million output, cache reads at $0.20),
  that is roughly $0.15 to $0.40 per verified new entry; 100 new entries land around $20 to $50
  plus Day 0. On Fable 5.1 multiply by about 2.4. The owner's balance, not this estimate, is the
  stop signal: read the session meters.
- Calendar time, not money, bounded the last sweep: 3 to 5 evenings because of rate limits. Run
  workers as separate parallel sessions.
- Cost levers for workers: excerpts not whole pages (`excerpt` in `scripts/verify/lib/pages.mjs`),
  no skill loads, no repeated `cat` of whole entries, one gate run per batch rather than per entry.

## Where the facts came from

- Entry counts, domain and subtype counts, and the missing names: grep and a Python count over
  `content/` on 2026-10-11, on main at `76de9b1`.
- Cost split and model ratio: this session's own meter on 2026-10-11 (Fable 5.1, effort xhigh,
  $3.92 for 139k cache-write, 809k cache-read, 19k output tokens) and Anthropic list prices.
- Visit numbers, indexing, and the deepen sizing: `docs/plans/2026-10-09-deepen-every-entry.md`.
- The inclusion rule and removal reasons: `CONTRIBUTING.md`, the 2026-09-30, 2026-10-01, and
  2026-10-08 blocks in `NEXT_STEPS.md`, and `content/changelog.json`.

## Suggested first message for the new session

> Read `docs/plans/2026-10-11-coverage-sweep.md`, then the 2026-10-09 blocks in `NEXT_STEPS.md`.
> The defaults in the brief stand. Run Day 0 of the coverage sweep: build the candidate list and add
> 5 entries by hand. Stop for my yes after the candidate list and one rendered page. Do not commit
> without my ask.
