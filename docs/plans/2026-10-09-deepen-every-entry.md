# Deepen every entry — one sweep (brief for a fresh session)

Written 2026-10-09 by the session that set up Search Console, Bing, and the human-only "most
visited" list. This file is the whole context a new session needs. Read it, then
`NEXT_STEPS.md` ("Where things stand — 2026-10-09"), then start. Do not re-derive the decisions
below; the owner made them.

## Status

- 2026-10-09 (later): sweep done. All 696 live entries deepened and checked; see the
  2026-10-09 block in `NEXT_STEPS.md` for removals, skipped entries, and open items.

- 2026-10-09: Day 0 done (validator, rendering, 5 hand-made entries, gates green). Waiting for the
  owner's yes before step 2. Note for workers: `npm run verify:evidence -- --ids <ids>` fetches the
  sources; read excerpts, not whole pages; run `npm run check:depth -- --ids <ids> --evidence`.
  Alternative lines and FAQ answers must not state numbers the entry's own sources lack.

## Why

- The site gets about 90 human visits per 30 days (Cloudflare Web Analytics, bots excluded, as of
  2026-10-09). The raw request log is 99 percent crawlers.
- Google had indexed only about 100 to 190 of the 752 sitemap URLs before Search Console existed.
  Search Console (domain property, verified by TXT) and Bing Webmaster Tools (imported from Search
  Console) both got the sitemap on 2026-10-09. Reports fill in 2 to 3 days.
- Every entry's body is one sentence. The structured frontmatter is good (limits, caveats, card
  rule, hard cap, overage risk, sources), but the page reads as thin content, which hurts indexing
  and never outranks a blog post on "X free tier limits".
- The owner's goal: everyone who could use a free tier should be able to find and trust the entry.
  Discovery, not design, is the bottleneck. Deeper, sourced pages are the lever.

## Decision (owner, 2026-10-09)

Option "one sweep": deepen **all 705 entries** (581 `content/services/*.mdx`, 124
`content/tools/*.mdx`) in one multi-day run, parallel workers, review at the end. Tiered rollout
was offered and declined. Run it on **Claude Opus 5.5** (owner's explicit cost decision; the
brief was written on Fable 5.1).

Sizing given to the owner: 15,000 to 20,000 tokens per entry, 15 to 18 million tokens total, about
7 hours of agent time with 6 parallel workers, 3 to 5 evenings of calendar time because of rate
limits and review. Say so again if the numbers change.

## Hard rules (do not relax)

1. **Every number comes from a page fetched in this run.** No limits, prices, quotas, or dates from
   memory. Fetch the entry's `pricingUrl` (fallbacks: `sourceUrls`, `docsUrl`, `officialUrl`) with
   the existing helpers in `scripts/verify/lib/` (`fetchText`, `htmlToText`, `excerpt`,
   `candidateUrls`, `isThin`). The fetched text is evidence; it is never pasted into the entry.
2. **A validator gates every entry.** Build `scripts/verify/check-depth.mjs` first. It fails when:
   a limit or price appears in the new body without a matching `sourceUrls` entry; the body is
   under 350 or over 700 words; a required section is missing; `lastVerified` is older than the
   fetch date for that entry; an alternative link points at a slug that does not exist or has
   `status: ended`. Add it to `npm test` or a new `npm run check:depth` and run it in CI.
3. **Existing gates stay green on every batch:** `npm run lint`, `npm run typecheck`, `npm test`,
   `npm run build`, `npm run check:budget`, `npm run test:e2e` (needs `out/`).
4. **Never commit, push, merge, or open a PR without the owner's explicit ask in that session.**
   Batches land as PRs the owner approves. The owner approves or rejects; do not wait on them for
   routine judgment calls.
5. **Freshness follows the text.** `.github/workflows/freshness.yml` hashes pricing pages weekly.
   New bodies cite the same pages, so no job change is needed, but every entry touched gets
   `lastUpdated` and `lastVerified` set to the fetch date.
6. **Do not touch** `content/popular.json`, `content/comparisons.json`, `content/changelog.json`,
   the popular or freshness workflows, or anything under `development/_archive/`.
7. Workspace rules apply: no `.env` reading, no secrets in logs, build output to external
   devstorage if it exceeds about 500 MB (it does not; `out/` is small).

## The deep-entry shape

Keep all current frontmatter. Add a body under the frontmatter, Markdown, rendered by
`next-mdx-remote` (already a dependency; the entry page must render the body; check
`src/app/services/[slug]` and the tools route first, and add rendering if the body is ignored
today). Sections, in this order, each a `##` heading:

1. **What the free plan gives you** — the limits that matter, in prose, each with the number the
   pricing page shows today. 80 to 140 words.
2. **When you hit a limit** — hard stop, pause, throttle, or a bill. Name which. If the page does
   not say, write "The pricing page does not say" and set `overageRisk` accordingly. 60 to 120 words.
3. **Gotchas** — three bullets people learn after sign-up (inactivity pauses, card required for a
   feature, region limits, project caps, data egress). Only what the source shows.
4. **Alternatives in this atlas** — two or three entries from `content/` with one line each on
   when to switch. Use the comparison tables in `content/comparisons.json` to pick them.
5. **Questions people ask** — three Q/A pairs, each answer one to three sentences, phrased like
   the Google "People also ask" rows for "<provider> free tier".

Body length: 350 to 700 words. Plain English, short sentences, no marketing voice. Match the
existing tone in `description`, `whenToUse`, `whenNotToUse`.

## Process

1. **Day 0, one worker, no parallelism yet:** build `check-depth.mjs` with unit tests in
   `tests/unit/`; confirm the entry page renders a Markdown body; deepen 5 entries by hand
   (`supabase`, `cloudflare-workers`, `koyeb`, `oracle-always-free-compute`, `formsubmit-co`,
   the first two are high-signal, the last three are real human-visited pages); run all gates;
   show the owner one rendered page. Get a yes before step 2.
2. **Batches of 100 entries, by domain** (`scripts/verify/lib/entries.mjs` has `selectEntries`
   with `domains` and `chunkByProvider`). Up to 6 workers, one batch each, isolated worktrees.
   Each worker: fetch sources for its entries, write bodies, run `check-depth` on its entries,
   run `npm test`. The orchestrator runs the full gate list once per batch before handing the
   owner a PR.
3. **Fetch failures:** if no candidate URL yields non-thin text, do not invent. Write the body
   from the frontmatter only, mark the entry in `development/verify/reports/<date>-deepen-skipped.md`
   with the reason, and leave `lastVerified` unchanged. Expect 5 to 10 percent of entries here.
4. **Review at the end:** one pass with `scripts/verify/check-freshness.mjs` over everything
   touched, one random sample of 30 entries read by the orchestrator against their sources, and
   the skipped report handed to the owner.
5. **Docs in the same change:** `development/docs/adding-content.md` gets the body shape;
   `development/docs/content-schema.md` gets the validator; `NEXT_STEPS.md` gets a dated status
   block and the open items.

## Where the facts came from

- Human visit numbers: Cloudflare dashboard, Web Analytics for freetier.wiki, "Exclude bots: Yes",
  last 30 days, read 2026-10-09. Site tag and account ID are GitHub repository variables
  (`CLOUDFLARE_SITE_TAG`, `CLOUDFLARE_ACCOUNT_ID`); the secret `CLOUDFLARE_API_TOKEN` is the
  Cloudflare user token "freetierwiki-analytics" (Zone Read, Zone Analytics Read, Account
  Analytics Read).
- Index coverage: `site:freetier.wiki` on Google ended between page 10 and page 19 of 10 results
  each. Google still showed the pre-2026-10 home title, so the home page had not been recrawled
  in weeks.
- Thin bodies: `wc -w` over `content/services/*.mdx` and `content/tools/*.mdx`: median 301 words
  per file, body one sentence.

## Suggested first message for the new session

> Read `docs/plans/2026-10-09-deepen-every-entry.md` and the 2026-10-09 block in
> `NEXT_STEPS.md`. Run the "one sweep" plan. Start with Day 0. Stop for my yes after the 5
> hand-made entries render. Do not commit without my ask.
