# Local browser handoff — PR #78

**Rechecked 2 November 2026, starting 22:45 CET (Europe/Berlin): all ten were retried serially. Crowdin and Zoom recovered; eight still need local-browser verification.** The 596-entry follow-up now has **588 complete / 8 incomplete**.

PR: https://github.com/0langa/FreeTierWiki/pull/78

Machine-readable queue: [2026-11-02-local-browser-handoff.json](2026-11-02-local-browser-handoff.json). Every task includes its content path, official URLs, exact unresolved claims, prior review context, and timestamped access results. These files are committed to the PR; no cloud-only cache is required.

## Start here

1. Check out and pull `routine/pricing-review-2026-11-02` from `0langa/FreeTierWiki`. Read this file and the JSON queue.
2. Use the user’s real local browser and its normal network connection to open the task’s official URLs, one entry at a time. Wait for dynamic content. Do not treat HTTP 200, a login page, or a security interstitial as evidence.
3. Compare the listed claims with readable official context and the full entry. Save the source URL, observation time, short exact quotation, and any conflict or unpublished policy in a new review report. Screenshots can support a rendered pricing table. Do not copy cookies, keys, or other session credentials into the repository.
4. Correct the indicated MDX file where supported. Advance `lastVerified` only after the material review is complete; use the actual review date. Advance `lastUpdated` for substantive edits. Preserve uncertainty when official sources conflict or omit a policy.
5. Update the matching entry and totals in [the current ledger](2026-11-02-followup-77.json), including `reviewCompleted`, `reviewStage`, `reviewStatus`, `outcome`, `summary`, `sources`, `remaining`, and `blocker`. Clear the blocker only when resolved. Preserve earlier pass counts as historical snapshots; add the new pass result and update latest-status pointers.
6. Run `npm run check:depth` and the relevant content/schema/answer tests after edits. Commit and push to the existing PR branch; do not merge it or acknowledge scanner revisions just because pages became accessible.

## Recovered in this recheck

### services/crowdin

Recovered in Chromium after a 15-second render wait; full Free card and comparison table visible. Confirmed 60K hosted words, unlimited public/one private project, public-only collaborators, one integration, no manager seats and mandatory translation donation; quota guide still gives ten days before translator suspension. Added the visible one-branch/three-file-format limits and paid-only webhooks; existing unspecified card policy stays qualified.

Source: https://crowdin.com/pricing

> Hosted words: 60K Private projects: 1

Source: https://crowdin.com/pricing

> *Users on a free plan donate translations to Crowdin's translation memory.

Source: https://crowdin.com/pricing

> File formats 3 5 15 Unlimited Unlimited

Source: https://support.crowdin.com/changing-subscription-plan

> You then have 10 more days to upgrade the subscription. Otherwise, your project will be suspended for translators.

### tools/zoom

Recovered in Chromium after a 15-second render wait: Sign up for free / No credit card required. This closes the only outstanding claim from the earlier pricing/time-limit comparison; no account was created.

Source: https://zoom.us/signup?signUpFrom=zoom-guided-tours

> Sign up for free No credit card required

## Remaining eight

### services/here

Entry: [file](../../content/services/here.mdx). Prior verification date: `2026-10-21`.

**Latest access:** Both checked official pages still return CloudFront HTTP 403.

**Verify:** Recheck Limited allowance and restrictions and establish current Base pricing once official sources are accessible.

**Already established:** Current pricing, rate limits, restrictions, legal terms and documentation all returned CloudFront 403 errors. A normal browser retry of pricing also returned 403; signup returned only an application shell. Prior qualified entry preserved and verification date unchanged.

Official URLs:

- https://legal.here.com/us-en/terms/here-platform-terms
- https://www.here.com/get-started/pricing/rps-limits-excluded-use-cases
- https://www.here.com/get-started/pricing
- https://www.here.com/get-started/pricing/base-plan-restrictions
- https://platform.here.com/sign-up

### services/ibm-watsonx-orchestrate

Entry: [file](../../content/services/ibm-watsonx-orchestrate.mdx). Prior verification date: `2026-10-26`.

**Latest access:** The detailed trial guide still returns IBM HTTP 403.

**Verify:** Reverify educational 90-day eligibility, invitation limit and trial-expiry behavior when IBM documentation becomes accessible.

**Already established:** Current product pricing confirms 30-day trial, $530 Essentials/$6360 Standard monthly starting prices, agent-building/chat/evaluation features and Assistant redirect. The detailed trial guide returned 403 in both HTTP client and browser, so educational eligibility, ten-member invitation and expiry behavior could not be reverified. Existing content and verification date preserved.

Official URLs:

- https://www.ibm.com/products/watsonx-orchestrate/pricing
- https://www.ibm.com/products/watsonx-assistant
- https://www.ibm.com/docs/en/watsonx/watson-orchestrate/base?topic=orchestrate-accessing-watsonx-trial-version

### services/neo4j-auradb

Entry: [file](../../content/services/neo4j-auradb.mdx). Prior verification date: `2026-10-26`.

**Latest access:** Pricing and quota documentation still return CloudFront HTTP 403.

**Verify:** Recheck Free graph/storage limits, backups, inactivity/deletion policy and no-card onboarding when official sources are accessible.

**Already established:** All nine official pricing, quota, backup, lifecycle and onboarding URLs returned CloudFront HTTP 403. A single Chromium retry of the quota guide also returned 403. No current plan comparison was possible and the verification date was preserved.

Official URLs:

- https://neo4j.com/docs/aura/managing-instances/backup-restore-export/
- https://neo4j.com/docs/aura/quotas-and-limits/
- https://neo4j.com/pricing/
- https://neo4j.com/docs/aura/managing-instances/instance-actions/
- https://neo4j.com/docs/aura/getting-started/create-account/
- https://neo4j.com/docs/aura/getting-started/create-instance/
- https://neo4j.com/docs/aura/getting-started/connect-instance/

### services/reddit-data-api

Entry: [file](../../content/services/reddit-data-api.mdx). Prior verification date: `2026-10-28`.

**Latest access:** Both announcement requests return thin HTTP 200 shells. Chromium renders an explicit network-security block.

**Verify:** Reverify October 31 request cutoff, January 12 removals, March 2027 public closure and November 13 RSS retirement from accessible official announcements.

**Already established:** Current official help pages confirm approval-only access, 100 QPM/OAuth client averaged over ten minutes, blocked unauthenticated requests and separate commercial permission/contract. The migration guide loads, but both announcement URLs return JavaScript interstitials; browser rendering of the API announcement ends in a network-security block. Could not reverify the central public-API/RSS retirement timetable; retained prior wording and verification date.

Official URLs:

- https://www.reddit.com/r/redditdev/comments/1wubcvf/moving_data_api_apps_to_the_developer_platform/
- https://www.reddit.com/r/modnews/comments/1wubgvt/continuing_our_infrastructure_updates_whats/
- https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki
- https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data
- https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy
- https://developers.reddit.com/docs/guides/migrate/public-api

### services/robohash

Entry: [file](../../content/services/robohash.mdx). Prior verification date: `2026-10-26`.

**Latest access:** Homepage still returns HTTP 403: Your request was blocked.

**Verify:** Recheck the hosted homepage free-service and bandwidth/banner statements when its access block clears.

**Already established:** Official GitHub README remains accessible and confirms anonymous image URLs, best-effort service, exponential backoff, Docker self-hosting and set-specific artwork licenses. The hosted homepage returns HTTP 403 in both curl and Chromium, so its free-service statement and bandwidth/banner warning could not be freshly verified. Kept the prior verification date.

Official URLs:

- https://robohash.org/
- https://github.com/e1ven/Robohash

### tools/figma

Entry: [file](../../content/tools/figma.mdx). Prior verification date: `2026-10-26`.

**Latest access:** Both hosts fail at proxy CONNECT with HTTP 403 (curl exit 56); no provider content received.

**Verify:** Recheck Figma pricing, Starter file quotas and AI billing/help policies when proxy access to www.figma.com and help.figma.com is available.

**Already established:** Retried all nine official pricing/help/home URLs sequentially. Curl failed with code56; explicit header diagnostic showed HTTP403 Forbidden from envoy during CONNECT. Chromium using the same configured proxy failed ERR_TUNNEL_CONNECTION_FAILED. No current source comparison was possible; preserved content and verification date.

Official URLs:

- https://help.figma.com/hc/en-us/articles/360046216313-Upgrade-or-downgrade-your-plan
- https://help.figma.com/hc/en-us/articles/29717597009431-Guide-to-billing-at-Figma
- https://www.figma.com/pricing/
- https://help.figma.com/hc/en-us/articles/360040328273-Figma-plans-and-features
- https://help.figma.com/hc/en-us/articles/14563969806359-Get-started-with-Figma-Design
- https://help.figma.com/hc/en-us/articles/33459875669015-How-Figma-AI-credits-work
- https://help.figma.com/hc/en-us/articles/35865276858647-Manage-AI-credits

### tools/ibm-api-connect

Entry: [file](../../content/tools/ibm-api-connect.mdx). Prior verification date: `2026-10-26`.

**Latest access:** Trial/getting-started documentation still returns IBM HTTP 403.

**Verify:** Revisit accessible IBM API Connect trial/getting-started documentation to verify onboarding and check whether it establishes expiry enforcement, asset retention or card requirements.

**Already established:** Compared accessible product/pricing pages:30-day SaaS trial, AWS usage-based or annual SaaS and self-managed subscription choices remain current; active trial assets migrate on same-IBMid upgrade. Corrected trial scope: PAYG/Standard/Premium SaaS offer trial, Reserved Instance/self-managed offer demos. IBM docs returned403 in curl and browser, preventing fresh verification of detailed onboarding and any additional expiry/card policy; retained prior verification date.

Official URLs:

- https://www.ibm.com/products/api-connect/pricing
- https://www.ibm.com/products/api-connect
- https://www.ibm.com/docs/en/api-connect/cloud/10.0.x_saas

### tools/testtls-com

Entry: [file](../../content/tools/testtls-com.mdx). Prior verification date: `2026-10-28`.

**Latest access:** Homepage still returns nginx HTTP 502 Bad Gateway.

**Verify:** Recheck the service's free features and policies if the homepage recovers.

**Already established:** The homepage still returns an nginx 502 Bad Gateway, consistent with the entry's existing outage warning. The historical free-service claims cannot be reverified while the service is unavailable; verification date preserved.

Official URLs:

- https://testtls.com

## Separate original-routine gap

`services/backblaze-b2` remains listed as unresolved in the [original 50-entry report](2026-11-02-pricing-77.md#unresolved), because its no-card source was inaccessible. It is outside the eight above and was not retried in this pass. The JSON includes its entry path and source URLs so it is not lost when finishing the full site review.

The earlier sequential report incorrectly called that separate unresolved item Cloud Vision. That label is corrected: Cloud Vision’s combined-request wording was already qualified, while Backblaze B2 is the original routine’s explicitly unresolved entry.

## Scope and validation

HTTP checks were serial, followed by serial Chromium retries for Crowdin, Reddit and Zoom with a 15-second render wait. No signup, purchase, environment configuration change, or proxy workaround was performed. Unrecovered entries keep their verification dates.

Validation: all 947 content-depth checks and 39 targeted content/schema/metadata/body/answer tests passed. The JSON queue matches the ledger’s eight incomplete entries, all entry paths exist, recovered source quotations match their captures, and `git diff --check` is clean.
