# Catalog baseline — 15 November 2026

This review covers all 947 entries against current official sources. Dates use Europe/Berlin; source timestamps retain UTC. It supersedes the incomplete [November 14 review](2026-11-14-pricing-review.md) and is delivered in [PR #82](https://github.com/0langa/FreeTierWiki/pull/82).

| Outcome | Entries |
| --- | ---: |
| Complete comparisons | 940 |
| Unchanged | 519 |
| Catalog corrections | 403 |
| Provider changes or ended offers | 18 |
| Unresolved comparisons | 7 |
| Not reviewed | 0 |

The [complete manifest](2026-11-15-full-baseline.json) records every entry, source, comparison, correction and remaining claim. Unchanged entries advance only lastVerified. Inaccessible material claims retain their previous date; no blocked entry is labelled verified merely to complete the baseline.

## Remaining source problems

- **services/abby** (last verified 2026-10-21): Current pricing fetch timed out and Chrome navigation never left a blank page. React/Next SDK documentation remains readable but cannot establish hosted plan quotas. Added an explicit current access warning while retaining prior verification date. Retry official pricing after origin recovery; compare the full entry before advancing lastVerified.
- **services/feathery** (last verified 2026-11-09): The current rendered pricing page offers quotes and demos without a public Free table. Alternate official comparison pages actively advertise Free but give conflicting 500-submission / five-form and 100-submission / two-form allowances. The two-year-old account FAQ describes no-card signup and a paid upgrade, but no quotas. On November 15, the public entry was revised to identify the conflicting official ranges and label the previously verified quotas and policies as historical. Obtain the current Free schedule from Feathery or a current account plan page. Vendor comparisons conflict and rendered pricing does not show a Free plan.
- **services/sikkerkey** (last verified 2026-11-10): Both the public pricing page and homepage returned HTTP 502. The active official docs explain usage and onboarding but still do not establish the current Developer offer or resolve prior conflicting billing statements. Added the November 15 pricing outage and last-verified terms to the public caveat, answer and FAQs while retaining the previous verification date. Retry the public pricing and homepage once the origin is responding, or locate current pricing terms in an official availability or pricing announcement.
- **services/what-is-my-ip** (last verified 2026-11-14): Preserved the complete November 14 browser comparison already present in PR #82. Fresh static and web reads return Automated Access Notice; two ordinary Chrome navigations timed out before leaving blank tabs, so no new full comparison was recorded. Retry the ordinary dedicated Chrome browser when the provider responds; retain November 14 content and date meanwhile.
- **tools/avo** (last verified 2026-11-09): The current primary pricing page and official hosting mirror show a sales/demo page with no public Free/Team comparison. The older official article still advertises cardless Free but gives different allowances; current general availability and limits remain unconfirmed. Added a public warning and qualified older Free and Team terms while retaining the previous verification date. Verify current Free and Team entitlements from a published plan comparison or provider confirmation before advancing verification.
- **tools/testtls-com** (last verified 2026-10-28): Official homepage returned HTTP 502 in fresh fetch and rendered browser. Updated the observed outage date; historical features and offer remain inaccessible, and permanent closure is unproven. Retry after service recovery; do not label ended without authoritative evidence.
- **tools/tickgit-com** (last verified 2026-11-10): Verified advertised public and private offer terms and the separate local open-source CLI instructions. Both official hosted examples returned a network error. Updated the public entry with that caveat and retained its previous verification date. Retry the public React and Kubernetes examples or consult a first-party status notice to confirm whether the hosted service currently returns results. The local open-source CLI is documented separately.

## Provider changes

- **services/composio**: Compared the developer plan on its new dedicated pricing URL, all free and managed OAuth quotas and gates, execution-mode add-ons, Pro spend controls, SDK setup and transition dates. Verified a dated provider change to managed-app dollar rates for new signups, with Google Maps treated separately.
- **services/courier**: Developer log retention now shows 30 days in the current public comparison, up from seven in the earlier desktop table. Current send allowance, no-card setup, test counting and conversion price were compared as well.
- **services/deno-deploy**: Confirmed current Free quota, card verification and pause, paid rates, GitHub setup and conflicting workspace guidance. Added the provider’s April 2027 shutdown and corrected Classic’s dated closure.
- **services/helicone**: Confirmed no-card Hobby logging quotas, retention, ingestion/API limits, hidden logs beyond quota and separately metered paid plans. Updated owner from the live banner and clarified model inference billing and setup.
- **services/incidenthub-cloud**: Current price table lists a new Basic plan below Starter. Nov 9 pricing did not list Basic. Free remains five vendor monitors, Discord and Slack with no status page. Updated paid starting price, signup verification scope and unquantified notification timing.
- **services/keywords-ai**: Confirmed Free log/score/data resource limits, no-card policy, calendar-month blur/export behavior, separate inference credits, SDK setup, and the current seven-day Free query window. The live pricing table changed published default retention to 30 days.
- **services/kinde**: Confirmed no-card MAU quota, M2M, flags, environments, roles, webhooks and organization/permission/add-on counts, paid rates, exclusions and onboarding. Current free custom-role limit is five, up from two in prior provider evidence.
- **services/mixpanel**: Both current official sources now list unlimited Free saved reports. November 9 official pricing and billing evidence listed five per seat, so the change is a provider update.
- **services/nx-cloud**: Compared no-card Hobby credit and other limits, exhaustion, OSS, local Nx usage and Team pricing. Nx's November 12 announcement introduces a separately priced hosted CI private beta. Verified Hobby and Team use External CI with the earlier grants.
- **services/othor-ai**: The November 11 release changed onboarding to invitation-only for Othor AI 2.0. The old pricing page is unavailable. Current public site describes invoice billing and no public new-user Free terms. Updated the former Free entry for that scoped closure and preserved uncertainty for existing accounts.
- **services/packagecloud**: Packagecloud’s documented Free and general signup routes both show the product migration notice. Marked the legacy plan ended for new signups, scoped the remaining published limits to existing accounts, and linked Buildkite’s separate cardless Free registry offer.
- **services/pingram-io**: The current pricing FAQ confirms that Voice draws from the monthly budget, and developer docs list Voice as available. Compared selector versus FAQ channel pooling, number conflict, WhatsApp pending, 10DLC, signup, rates/renewal/upgrade and SDK.
- **services/simplescraper**: Current credits documentation and rendered pricing say only pages after the first five cost a browser run credit. The November 10 documentation charged each page on runs over five. Compared Free and paid grants, cloud costs and API enforcement, and retained unpublished account card terms.
- **services/twist-com**: Twist publicly announced a shutdown on March 1, 2027 and deletion of remaining workspace data on May 1, 2027. Reviewed the current price and signup form, plus the documented migration to Todoist Comms.
- **services/uptimeobserver-com**: Pricing changed since November 10 for first-time paid subscribers. Free explicitly requires no card, while paid trials require one and auto-bill unless canceled.
- **services/vaadin**: Updated Vaadin Pro to $175 per developer per month after comparing November 10's $159 price. Labeled Collaboration Kit deprecated in the current Vaadin docs.
- **services/val-town**: Officially ended for new users Nov 10, 2026. Existing subscriptions continue at no cost during announced wind-down. Checked past plan limits as context and replaced signup guidance with migration. Cloudflare Workers and Windmill remain as active alternatives after removing Deno Deploy because of its separate shutdown. During the wind-down, private vals, custom domains and sending email to others are existing subscription entitlements.
- **services/zoho-campaigns**: Vendor support documents a November 11 reduction from 6,000 to 2,000 monthly email sends for new users, with contact and send blocks at their respective 2,000 caps. Legacy pricing and the marketing homepage still show the older allowance.

## Monday's comparison baseline

The previous source branch was `4cd2cb1de8488702ccc45e90995d8794fe459c16`; the last scheduled scan was [42532797082](https://github.com/0langa/FreeTierWiki/actions/runs/42532797082). This review collected fresh official-source evidence and prepared source coverage version 1 for all cited documents. A page's hash format remains version 3.

The scanner now tracks every explicitly cited pricing/policy document instead of stopping after the first readable page. Shared URLs are fetched once, with six requests maximum and one in flight per hostname plus spacing. Bot notices and humanity challenges cannot count as readable pricing. Secondary source failures stay in the complete queue with exact URLs.

730 complete reviews have matching, fully readable aggregate fingerprints eligible for acknowledgement after the content reaches main. Other entries retain explicit fingerprint/access gaps even when alternate official evidence completes the entry comparison. Scanner flags and unverified catalog entries are different counts. No newly unmerged review clears the source queue.

The [source review policy](source-review-policy.json) records 193 entries whose evidence required rendering; they become due again after seven days even if static hashes match. All entries become due after 90 days, and Monday also keeps its 50-oldest rotation and unresolved carryovers. Review tabs close immediately after evidence capture; each reviewer keeps only one or two open.

## Publication and validation

Content and source acknowledgements are prepared for the same authorized baseline release. The source branch must be updated only after this PR merges, with an expected-head check to avoid overwriting a scanner run. The [publication receipt](https://github.com/0langa/FreeTierWiki/blob/freshness-data/review-publication-2026-11-15.json) records the merged content commit and source-baseline publication. The seven unresolved entry comparisons and the 217 scanner source gaps are separate queues; neither is silently cleared. The complete 940-entry numeric-evidence audit used actual provider text, including rendered captures, with no per-entry exemptions.
