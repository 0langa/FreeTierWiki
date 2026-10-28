# Editorial suggestions and caching review — 28 October 2026

Final shipping scope: commit the catalog and label changes to `main` for the normal Cloudflare Pages deployment, retain native Pages caching, and enable Always Use HTTPS. The working tree already contained the cap-label replacement, initial compare wording, six redirect lines, two label-related test edits, and a terminology edit in `docs/content-maintenance.md`; those edits were retained and refined.

## Cap labels

The source is `freeTierDetails.hasHardCap` in entry frontmatter. `toListItem` in `src/lib/entry-view.ts` copies it unchanged into `ListItem.cap`, separately from `freeTierDetails.overageRisk` → `ListItem.risk`. `EntryList` calls `CapLabel` in `src/components/entry/labels.tsx` whenever `showCap` is enabled. The old label mapped every `false` value to **Soft cap**, irrespective of risk. Entry pages use `FactsLabel`, which already displays **Hard cap: No** and an independent billing-risk row.

There were 32 existing entries with `hasHardCap: false` and `overageRisk: none`. This is a label mismatch, not grounds to rewrite their provider policies. On production, GitHub Pages showed:

| View | Before on production | After in local export |
| --- | --- | --- |
| `/compare/static-site-hosting/` | Billing risk: None · No card · Soft cap | Billing risk: None · No card · No hard cap |
| `/provider/github/` | Billing risk: None · No card · Soft cap | Billing risk: None · No card · No hard cap |
| `/services/github-pages/` | Hard cap: No · Billing risk: None | Same separate facts |

The ordinary category page and initial Explorer HTML did **not** print a cap label in the sampled production responses. They use the shared list infrastructure; the regression also exercises filtered category and hydrated Explorer rows.

The compare explanation now says: “A hard cap means the service stops at the free limit. No hard cap does not imply charges; the risk column describes billing risk.” The previous draft's “without one it keeps going” was removed because a provider can still throttle, suspend or restrict usage.

Reproduction and export inspection:

```powershell
$softFiles = @(rg --no-ignore -l -F 'Soft cap' out -g '*.html')
$softFiles.Count
```

The final export contains **0 occurrences of Soft cap across 1,102 HTML files**. The initial prepared export also had **0 contradictory rows across 7,232 rendered list rows**. Unit coverage exercises the actual `toListItem` → `EntryList` path and detail facts across cap/risk combinations; browser coverage includes the compare, provider, filtered category, Explorer and detail pages.

## Redirects

All three production source URLs returned 404 during this review; all three destinations returned 200. The existing local changes add each requested 301 with both slash and slashless source forms:

| Source | Destination | Local exported rule |
| --- | --- | --- |
| `/services/ipstack/` | `/tools/iptrace/` | 301 |
| `/category/apis-and-data/` | `/category/apis/` | 301 |
| `/tools/lambdatest/` | `/tools/testmu-ai/` | 301 |

The rules are present in `out/_redirects`. This verifies the deployment artifact, not a live redirect: Pages must deploy it before the public URLs change.

## Reddit opportunity

The proposed dates are supported by Reddit's own announcements:

| Date | Scope |
| --- | --- |
| 31 October 2026 | New requests for public API access stop being accepted. |
| 13 November 2026 | RSS feed support ends. |
| 12 January 2027 | Access removal begins for apps and users that have not registered or engaged with Reddit. |
| March 2027 | Remaining public API access closes; no exact day is specified. |

Sources: [API migration announcement](https://www.reddit.com/r/redditdev/comments/1wubcvf/moving_data_api_apps_to_the_developer_platform/), [RSS announcement](https://www.reddit.com/r/modnews/comments/1wubgvt/continuing_our_infrastructure_updates_whats/), [Data API wiki](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki), [access and commercial-use explanation](https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data), [Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy).

Added `services/reddit-data-api` as **changed / time-limited**, with approval requirements and the free 100-query/minute quota distinguished from commercial contracts. Added `services/reddit-devvit` for Reddit-hosted community apps and `services/hacker-news-api` for an alternative public discussion dataset. The main entry compares those use cases and explains the narrower RSS moderator-alert route and separate researcher program. Neither alternative is represented as an equivalent Reddit data feed. Sources for the alternatives are [Reddit's hosting offer](https://developers.reddit.com/), [Devvit FAQ](https://developers.reddit.com/docs/guides/faq), [migration guide](https://developers.reddit.com/docs/guides/migrate/public-api), and [official HN API documentation](https://github.com/HackerNews/API).

A search for the free-API question did surface several commercial data vendors' articles, making an official-source guide a reasonable editorial opportunity. This is not evidence of search volume, an exhaustive competition analysis, or a promise of rankings. No ideas-board row was changed.

## Tugboat

Before: the live summary and FAQ asserted that a $0, 5GB Free plan was available. The initial local review qualified it as unconfirmed.

Final change: **ended / paid**, while retaining the page to answer whether Tugboat is still free. Removed Free limits and the affirmative Free FAQ. The summary states that Free is no longer offered to new users and was removed from pricing between 24 August and 16 October 2026. Intro starts at $39/month; terms and docs retain existing-account downgrade references. Added an ended change dated 28 October and advanced lastVerified to that date.

The [live pricing page](https://www.tugboatqa.com/pricing) lists Intro $39, Plus $119 and Premium $599+. The [24 August archived pricing page](https://web.archive.org/web/20260824061509/https://www.tugboatqa.com/pricing) shows Free at $0; the [October change tracker](https://stacksfree.com/blog/free-tier-change-tracker-2026-10-18/) records the removal interval. [Terms](https://www.tugboatqa.com/terms) and [billing docs](https://docs.tugboatqa.com/tugboat-billing/tugboat-pricing/index.html) explain the legacy references. This is an end to the new-user Free offer, not a claim that Tugboat shut down.

Added the supported pricing-model value **paid** to the content schema and label map. The historical freeTierType stays unchanged; ended entries already render **No free plan** and are excluded from free-tier filters.

## TestTLS availability

Before: the entry presented the scanner as usable and was last verified on 21 October. SSL Labs and HTTP Observatory recommended it as an alternative.

Final change: **changed**, with lastUpdated and lastVerified on 28 October, an outage caveat and dated change note. The homepage, /api and /pricing each returned **502** in a fresh check; the outage has been observed since at least 25 October. The summary, onboarding and FAQ now explain that the scanner is unavailable. DNS and TLS remain live, so permanent closure is not established.

Removed TestTLS from the SSL Labs and HTTP Observatory alternatives; the latter now links Internet.nl so it retains two usable alternatives. Keep the TestTLS page. If the domain lapses or a shutdown is announced, use the existing entry-removal command with a 301 to /category/security/; no removal was performed.

## Monday review and GitHub

- No open PRs or open issues were returned for the repository during this review.
- [PR #57](https://github.com/0langa/FreeTierWiki/pull/57), covering all 582 queued entries, is merged; [issue #56](https://github.com/0langa/FreeTierWiki/issues/56) is closed. The issue's sole comment describes only the first 50-entry pass and is stale. The merged review document is the fuller record: 67 corrections, 514 unchanged, one unresolved.
- [PR #58](https://github.com/0langa/FreeTierWiki/pull/58), reducing scanner noise, is merged. The `freshness-data` branch includes commit `01f83ed6`, recording the Monday acknowledgements; 569 stored readable fingerprints carry that review date. Unreadable sources are not fabricated into acknowledged fingerprints.
- **TestTLS outage recorded:** the earlier unresolved Monday item is now marked changed and unavailable, as described above. An outage alone does not prove permanent closure.
- The Monday document also retains ten source-conflict topics, six time-sensitive watch items and 125 optional offer additions. Those additions are an editorial backlog, not 125 unfinished corrections. See `docs/reviews/2026-10-26-pricing-56.md`.
- Tugboat was not in Monday's changed queue; its stored pricing fingerprint was unchanged. This illustrates why a stable pricing hash cannot settle a conflict with older official documents.

## Cloudflare: retain native Pages caching

Hosting is **Cloudflare Pages**, project freetierwiki, with Git integration building main using npm run build and publishing out/. The repository uses Next.js static export and has no _headers, Workers handler or Wrangler deployment config. GitHub Actions checks the build; it does not deploy the catalog.

The original custom-host samples returned HTTP 200, Cache-Control: public, max-age=0, must-revalidate and cf-cache-status: DYNAMIC. The Pages project and immutable deployment URLs had the same cache-control directive but no cf-cache-status header. DYNAMIC on the custom host does not establish that Pages' native asset cache is absent.

Cloudflare [documents automatic Pages asset caching and deploy invalidation](https://developers.cloudflare.com/pages/configuration/serving-pages/) and [warns against custom Cache Everything rules that can serve stale deployments](https://developers.cloudflare.com/pages/configuration/debugging-pages/). The owner confirmed that the zone has no leftover rules and directed us to retain native caching. Deleted the disabled cache-rule proposal. No cache rule, _headers cache policy or purge workflow was added, and no purge was performed.

Always Use HTTPS was **off** in SSL/TLS → Edge Certificates and is now **on**. HTTP already redirected through Pages; the zone now enforces HTTPS as well. A curl request to http://freetier.wiki/ followed one redirect to https://freetier.wiki/ and returned 200.

## Release evidence

Final local export: 1,102 HTML files, zero Soft cap strings, all three requested 301 mappings in out/_redirects, Tugboat's “This free tier ended” and “No free plan” notices, and TestTLS's changed notice and dated 502 caveat. All three new API entries are present.

Local validation covered lint, TypeScript, 276 unit tests, 946 content-depth checks, static build, bundle budgets, and 132 browser tests (11 conditional skips). The first run caught a metadata mismatch after changing Tugboat's historical freeTierType; preserving its historical value resolved it without weakening the check. Production response evidence is reported separately after deployment. No cache HIT or deploy-purge requirement remains in scope.
