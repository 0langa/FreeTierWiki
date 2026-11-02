# Follow-up review — issue #77 — tool batch 6 — 2026-11-02

> Latest status: the [sequential review](2026-11-02-sequential-77.md) attempted all 325 pending entries and completed 315. **586 of 596 follow-up comparisons are complete; 10 remain incomplete.** The report below preserves its historical checkpoint; the [current ledger](2026-11-02-followup-77.json) records current entry status.

Coverage: **96 assigned entries; 20 completed comparisons (17 unchanged, 3 corrected), 76 incomplete.** Incomplete rows are attempted source checks, not verified entries. Their verification dates are unchanged.

Source text was retrieved from the cited official pages on 2026-11-02. Each completed comparison considered the material entry limits, card requirement, billing behavior and body claims; numeric matching was used only as a supporting check. Existing explicit unknown/conflicting policies were retained where the sources still did not resolve them.

The environment began returning the same HTTP 503 gateway error for unrelated sites, including a previously successful source. The observed response was `upstream connect error or disconnect/reset before headers ... Invalid argument|remote address:envoy://cloudflare_https_tunnel/`. These failures do not establish a provider outage, a discontinued offer, or a changed price. Thin JavaScript pages and selector-dependent tables also require follow-up; a 200 response alone was not counted as a review.

## Corrections

- **FlutterFlow:** removed the unsupported 10 Lite-credit allocation. The current table explicitly publishes 5 lifetime AI-generation requests and does not publish a separate Free Lite allocation. This records a catalog correction, not a vendor-change date.
- **Cypress:** aligned the last FAQ with the already-cited billing documentation: recording continues, parallelization is disabled, and new Cloud results are hidden until reset or upgrade.
- **Formspark:** corrected the direct answer to say the *first* workspace gets 250 free submissions; additional user-created workspaces begin with zero. The finite buffer/Overflow/discard behavior and absence of automatic payments are unchanged.

## Validation

- Completed-entry evidence/depth check: 20 checked, 20 passed.
- Direct-answer/category-copy tests initially passed 9/9. The latest shared-catalog run reports only an unrelated `services/deed-page` 46-word answer; no batch-6 answer violation. Final whole-catalog validation is recorded by the main review.
- No date was advanced for incomplete entries; unchanged entries preserve `lastUpdated`.

## Entry dispositions

### `tools/chromatic` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current pricing and billing documentation confirm 5,000 Chrome snapshots, no-card signup, TurboSnap accounting and paused testing after exhaustion.

- [Official source](https://www.chromatic.com/pricing): “redit card required Start testing $0 / month 5,000 billed snapshots Equivalent to 25k turbosnaps Test on Chrome Unlimited projects & users Unlimited collaborators Git and CI integrations UI version tr”
- [Official source](https://www.chromatic.com/docs/billing): “napshots. If your usage reaches that amount: Free plan: Review and testing will be paused once you use all 5,000 included billed snapshots per month. You can resume testing by upgrading to a paid plan or waiting until your included billed ”
- [Official source](https://www.chromatic.com/docs/billing): “ssibility data, and running diffs. Turbosnap Copied (0.2 billed snapshots): Chromatic identifies tests that have no code changes associated with them or their dependencies and copies over the existing snaps”

### `tools/circleci` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current pricing and credit documentation support the 30,000-credit personal allowance, concurrency/storage allocation, no-card signup and personal-build block; OSS credit exceptions remain documented.

- [Official source](https://circleci.com/pricing/): “machine type and size, and premium features. 30,000 free credits/month 30,000 credits 30,000 free credits/month + $15 for every additional 25,000 credits. /month included Custom Users ? Any user who commits code changes ”
- [Official source](https://circleci.com/docs/guides/plans-pricing/credits/): “credits rather than being billed separately. When your available credits reach 0, personal builds are blocked until your credits refill at the start of the next month. Open source builds are not subject to this block and continu”
- [Official source](https://circleci.com/docs/guides/plans-pricing/credits/): “Organizations on our Free Plan can use up to 400,000 credits per month, for free, for Linux open source builds. Using our Free Plan and keeping your repository public will enable this for you. Open source credi”

### `tools/clickup` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

Free limits and current Core pricing match. The source still conflicts between the Free card and Trial feature table for time tracking; the entry already discloses that conflict and retains unknown enforcement.

- [Official source](https://clickup.com/pricing): “² Trial 500 credits / workspace Key features 60 MB Storage Unlimited Tasks & Subtasks Unlimited Free Members Collaborative Docs Kanban Boards Calendar View Sprint Management Time Tracking SyncUps Video Calls ”
- [Official source](https://clickup.com/pricing): “es Trial Included Included Included Included Time Tracking Trial Included Included Included Included Advanced Time Tracking Trial Trial Trial Included Included Granular Time Estimates Not included Not included Incl”
- [Official source](https://clickup.com/pricing): “rkspace and they do not reset or count down. When you reach a use limit, you won't lose any data, but you won't be able to edit or create new items with that feature. You can find a breakdown which features have usage lim”
- [Official source](https://clickup.com/pricing): “ I upgrade myself or do I have to upgrade my entire Workspace? To upgrade ClickUp, you'll need to upgrade your entire Workspace, which means all members in your Workspace. What payment methods do you accept? We ”

### `tools/clockify` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

The current page confirms five total Free users, one-month report range, unlimited tracking/projects, the seven-day no-card trial and retained data on cancellation; exact sixth-user enforcement remains qualified.

- [Official source](https://clockify.me/pricing): “ for the Bundle plan. FREE Time Tracking $ 0 For up to 5 users Try now Watch demo Unlimited tracking Time tracker Timesheet Auto tracker Calendar Mobile & desktop app Pomodoro timer Idle detection & reminders Tra”
- [Official source](https://clockify.me/pricing): “y you earn, and review your team's time. The data range on the FREE plan is 1 month. Learn more Project status Project status See how much time is tracked on projects and tasks. Learn more Project export Project export Export project”
- [Official source](https://clockify.me/pricing): “ry out all PRO features for free for 7 days, no credit card required. Simply sign up for free, the free trial will activate automatically. If you need more time, be sure to contact our sales team for an extension and a”
- [Official source](https://clockify.me/pricing): “ion and no further charges will be made. You won't lose any data (canceling only affects access to the extra features). What types of payment are supported? We support payments by credit card for all plans. For lar”

### `tools/codeberg` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

FAQ and CI documentation support the noncommercial free-hosting scope, private-content/resource-request limits and request-based Woodpecker access; this remains a donation-funded service, not metered paid hosting.

- [Official source](https://docs.codeberg.org/getting-started/faq/): “r to free/libre software projects , we allow up to 100 MB of private content for your convenience. Use it for your personal notes, your side project or any other you want to keep private. I need more clarifi”
- [Official source](https://docs.codeberg.org/getting-started/faq/): “other users. If you intend to use more than: 750 MiB for Git storage 1.5 GiB of packages, LFS and attachments generally large CI resources You should request these resources first ! I need to request mo”
- [Official source](https://docs.codeberg.org/ci/): “ structure or many individual collaborators. linux/amd64 is the sole build target on the Woodpecker CI deployment. Issues and general feedback should be reported in our dedicated Codeberg CI feedback reposi”

### `tools/codecov` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

The pricing text confirms the Developer allowance, but extracted text loses feature checkmark/column associations needed to validate private Team flags/components/project-coverage claims. A rendered-table check remains required.

- [Official source](https://about.codecov.io/pricing/): “nlimited Unlimited Private Unlimited Uploads Private repo uploads 250 Public repo uploads Unlimited Unlimited Code Coverage PR Comments Status Checks API Access Patch Coverage Project Coverage Flags Components Carryforw”

Outstanding: The pricing text confirms the Developer allowance, but extracted text loses feature checkmark/column associations needed to validate private Team flags/components/project-coverage claims. A rendered-table check remains required.

Source attempts:
- [https://about.codecov.io/pricing/](https://about.codecov.io/pricing/) — HTTP 200.
- [https://docs.codecov.com/docs/quick-start](https://docs.codecov.com/docs/quick-start) — HTTP 200.
- [https://codecov.io/](https://codecov.io/) — HTTP 200.
- [https://docs.codecov.com/docs](https://docs.codecov.com/docs) — HTTP 200.

### `tools/codekeep` — unresolved

Comparison complete: **no**. Scan signal: `thin`.

The pricing and homepage responses are HTTP 200 with insufficient readable content. The public-snippet/folder/bookmark allowance requires a rendered page; the subsequent environment outage prevents that follow-up.


Outstanding: The pricing and homepage responses are HTTP 200 with insufficient readable content. The public-snippet/folder/bookmark allowance requires a rendered page; the subsequent environment outage prevents that follow-up.

Source attempts:
- [https://codekeep.io/home/pricing](https://codekeep.io/home/pricing) — HTTP 200, thin.
- [https://codekeep.io](https://codekeep.io) — HTTP 200, thin.
- [https://docs.codekeep.io](https://docs.codekeep.io) — HTTP 200, thin.

### `tools/codemagic` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Pricing and billing docs support the personal-account-only 500 monthly M2 minutes, no collaborators, 120-minute builds and opt-in card billing for extra minutes; machine prices match.

- [Official source](https://docs.codemagic.io/billing/pricing): “ning a proof of concept. Individuals receive 500 free minutes per month on macOS M2 machines on a personal account. These 500 free minutes are reset on the 1st of each month . Free minutes are not available if y”
- [Official source](https://codemagic.io/pricing/): “le concurrencies Custom Build duration limit 120 min 120 min 120 min Custom Cache storage 3GB per build 10GB per build 10GB per build Custom Build minutes rates Linux & Windows machines $0.045 / minute ”
- [Official source](https://docs.codemagic.io/billing/billing): “ar. On clicking Enable billing , you will be asked to enter credit card information or offered the option to select an existing credit card if you have had billing enabled previously. To finish, click Confirm and enable b”
- [Official source](https://docs.codemagic.io/billing/pricing): “ype is shown below. Item Price macOS (M2) VM $0.095 / minute macOS (M4) VM $0.114 / minute Linux X2 & Windows VMs $0.045 / minute Pricing for Teams 1. Pay-as-you-go For teams, all build minutes using m”

### `tools/coderabbit` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

The open-source/public-repository scope, no-card account creation, paid prices, hourly paid allowances and optional usage billing remain supported. Table rates are 5/8/10, as recorded; no correction needed.

- [Official source](https://coderabbit.ai/pricing): “deRabbit on a public repository, and receive free reviews forever for public repositories. No additional setup is required. View all questions English Product CodeRabbit Review CodeRabbit Triage CodeRabbit Explain CodeRabbit Secure CodeRab”
- [Official source](https://docs.coderabbit.ai/getting-started/quickstart): “ account to create your CodeRabbit account . No credit card required! 2 Add your repositories Add repositories that CodeRabbit should review. You control exactly which repos have access. For detailed instructions, choo”
- [Official source](https://coderabbit.ai/pricing): “monthly spending cap. Continued reviews cost $0.25 per reviewed file and are added to the monthly invoice. Enterprise customers can arrange usage-based billing with their account team. How are on demand products priced”
- [Official source](https://coderabbit.ai/pricing): “consumption with the ability to cap budgets) 5* 8* 10* 12* CodeRabbit AI Engineer Trigger the CodeRabbit cloud-based coding agent to execute changes, refactoring, or custom final touches without leaving t”

### `tools/curlhub` — unresolved

Comparison complete: **no**. Scan signal: `thin`.

Pricing, homepage, signup and FAQ returned thin shells; the 10,000-request allowance and paid tiers could not be re-established without a rendered page. The subsequent environment outage blocks that path.


Outstanding: Pricing, homepage, signup and FAQ returned thin shells; the 10,000-request allowance and paid tiers could not be re-established without a rendered page. The subsequent environment outage blocks that path.

Source attempts:
- [https://curlhub.io/pricing](https://curlhub.io/pricing) — HTTP 200, thin.
- [https://curlhub.io](https://curlhub.io) — HTTP 200, thin.
- [https://curlhub.io/signup](https://curlhub.io/signup) — HTTP 200, thin.
- [https://curlhub.io/faq](https://curlhub.io/faq) — HTTP 200, thin.

### `tools/cursor` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current pricing/help support qualitative Free usage, weekly reset, separate legacy Hobby rules and off-by-default Auto Top-up. The entry correctly preserves unknown exact Free counts/card/enforcement.

- [Official source](https://cursor.com/docs/models-and-pricing): “and $2,000/yr for Ultra. Prices exclude tax. Free. Agent and Chat with limited usage. Plus. Agent with Cursor's own models (Grok 4.7, Grok 4.6, Grok 4.5, and Composer 2.5) at fixed settings: Fast is off, effort is medium, and Grok 4.7 ”
- [Official source](https://cursor.com/help/models-and-usage/usage-limits): “hen does my usage reset? The X Subscription: your included pool refreshes weekly. The next reset date is shown under Usage at grok.com/dashboard . Prepaid credit doesn't reset with your weekly pool; each top-up stays available unt”
- [Official source](https://cursor.com/help/account-and-billing/overages): “sage credits at grok.com/dashboard/billing . Auto Top-up: off until you turn it on. When it's on, it charges your saved payment method and adds the amount you chose whenever your balance drops below your threshold. Teams: the team s”

### `tools/cypress` — corrected

Comparison complete: **yes**. Scan signal: `noisy`.

Aligned the FAQ with already-cited billing documentation: recording continues, but new results are hidden and parallelization disabled until reset or upgrade. Current Free allowance and no-card signup remain supported.

- [Official source](https://www.cypress.io/pricing): “o credit card required Get started Includes: 10 users 500 test results / month 100 prompt execs / month What's included: + Expand Parallelization Test Replay Project Analytics Cloud MCP Cloud CLI Premium features Unlock all feat”
- [Official source](https://docs.cypress.io/cloud/account-management/billing-and-usage): “on-demand usage, recording keeps working but parallelization is disabled and new results are hidden from the dashboard until you upgrade or the cycle resets: Once included and bundled test results are used Behavior Recording ( --record ) Still runs ”

### `tools/docker-hub` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Detailed pull docs still state 200 authenticated Personal pulls per six hours and one private repo; pricing still says 100 pulls/hour. The entry explicitly preserves this disagreement and the fair-use caveat.

- [Official source](https://docs.docker.com/docker-hub/usage/): “authenticated) Unlimited Unlimited Unlimited Personal (authenticated) 200 Unlimited Up to 1 Unauthenticated users 100 per IPv4 address or IPv6 /64 subnet Not applicable Not applicable For more details, see Pull usage and li”
- [Official source](https://www.docker.com/pricing/): “) Public and Private Repos – pull Rate Limit 100 pulls/hr per user Unlimited ( fair use ) Private Repos – Number of Repos 1 Unlimited ( fair use ) Docker Scout Health Scores on Docker Hub – Local Vulnerability Analys”
- [Official source](https://docs.docker.com/docker-hub/usage/pulls/): “d and Docker Personal users are subject to a 6-hour pull rate limit on Docker Hub. In contrast, Docker Pro, Team, and Business users benefit from an unlimited pull rate. The following pull usage and limits apply based”

### `tools/everystep-automation-com` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Official pricing still separates the free Web Recorder from paid hosted monitoring beginning at $38.99/month. No new signup-card or enforcement guarantee was inferred.

- [Official source](https://everystep-automation.com/pricing/): “tiple Browsers Perform Load & Stress Testing Free Plan EveryStep Web Recorder Launch Web Recorder Premium Plans Starting at $38.99/month (see plans) Start a Free Trial Enterprise Plans Contact for a Quote Contact Us Privacy Pol”
- [Official source](https://everystep-automation.com/pricing/): “b Recorder Launch Web Recorder Premium Plans Starting at $38.99/month (see plans) Start a Free Trial Enterprise Plans Contact for a Quote Contact Us Privacy Policy | Terms of Service | License Agreement | Blog | Top 25 ”

### `tools/excalidraw` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

The annual-price page confirms the Free scene/AI features, but its extracted response does not expose the stated $7 monthly Plus rate. Monthly selector verification remains necessary; do not advance the date from the annual view alone.

- [Official source](https://plus.excalidraw.com/pricing): “ons 1 infinite scene Unlimited collaborators Generative AI, 10 requests a day Export to .png, .svg or 'save to file' Notion, Obsidian and other integrations Libraries E2EE locally in your browser Open-source software for devs P”
- [Official source](https://plus.excalidraw.com/pricing): “s Plus Plus $6 a month per user Try for free 14 days of free trial Everything in Free + Unlimited scenes and folders Securely saved on cloud Access management Sharing with edit/view rights Read-Only links & Embeds Ex”

Outstanding: The annual-price page confirms the Free scene/AI features, but its extracted response does not expose the stated $7 monthly Plus rate. Monthly selector verification remains necessary; do not advance the date from the annual view alone.

Source attempts:
- [https://plus.excalidraw.com/pricing](https://plus.excalidraw.com/pricing) — HTTP 200.
- [https://docs.excalidraw.com](https://docs.excalidraw.com) — HTTP 200.
- [https://excalidraw.com](https://excalidraw.com) — HTTP 200, thin.

### `tools/export-sdk` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Core 250-page/3-template Free and paid tier prices match, but FAQ answers are not present in captured text. The 85% alert, page-count exclusions and 1,000-page top-up workflow need a rendered FAQ check.

- [Official source](https://exportsdk.com/pricing): “rt for free. Pay as you grow. Generate up to 250 pages per month — no credit card required. Forever Free $0 /mo Get Started for Free For hobbyists and low-volume use cases What's included 250 pages per month 3 temp”
- [Official source](https://exportsdk.com/pricing): “se cases What's included 250 pages per month 3 templates Startup $29 /mo Get Started for Free For early-stage companies that need a bit more volume What's included 2,500 pages per month 10 templates Chat & ”

Outstanding: Core 250-page/3-template Free and paid tier prices match, but FAQ answers are not present in captured text. The 85% alert, page-count exclusions and 1,000-page top-up workflow need a rendered FAQ check.

Source attempts:
- [https://exportsdk.com/pricing](https://exportsdk.com/pricing) — HTTP 200.
- [https://exportsdk.com](https://exportsdk.com) — HTTP 200.
- [https://docs.exportsdk.com/docs/getting-started/overview/](https://docs.exportsdk.com/docs/getting-started/overview/) — HTTP 200.
- [https://docs.exportsdk.com/docs/getting-started/create-account](https://docs.exportsdk.com/docs/getting-started/create-account) — HTTP 200.
- [https://docs.exportsdk.com/docs/api/endpoint](https://docs.exportsdk.com/docs/api/endpoint) — HTTP 200.
- [https://docs.exportsdk.com](https://docs.exportsdk.com) — HTTP 200, thin.

### `tools/figma` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

The pricing request timed out and no usable cited source was captured. Current Starter AI credits, shared-file limits and enforcement remain unverified in this run.


Outstanding: The pricing request timed out and no usable cited source was captured. Current Starter AI credits, shared-file limits and enforcement remain unverified in this run.

Source attempts:
- [https://www.figma.com/pricing/](https://www.figma.com/pricing/) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/360046216313-Upgrade-or-downgrade-your-plan](https://help.figma.com/hc/en-us/articles/360046216313-Upgrade-or-downgrade-your-plan) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/29717597009431-Guide-to-billing-at-Figma](https://help.figma.com/hc/en-us/articles/29717597009431-Guide-to-billing-at-Figma) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/360040328273-Figma-plans-and-features](https://help.figma.com/hc/en-us/articles/360040328273-Figma-plans-and-features) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/14563969806359-Get-started-with-Figma-Design](https://help.figma.com/hc/en-us/articles/14563969806359-Get-started-with-Figma-Design) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/33459875669015-How-Figma-AI-credits-work](https://help.figma.com/hc/en-us/articles/33459875669015-How-Figma-AI-credits-work) — HTTP 0, unavailable.
- [https://help.figma.com/hc/en-us/articles/35865276858647-Manage-AI-credits](https://help.figma.com/hc/en-us/articles/35865276858647-Manage-AI-credits) — HTTP 0, unavailable.
- [https://help.figma.com](https://help.figma.com) — HTTP 0, unavailable.
- [https://www.figma.com](https://www.figma.com) — HTTP 0, unavailable.

### `tools/firebase-app-distribution` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current Firebase pricing and App Distribution FAQ support no-cost distribution, no-payment-method Spark signup, 2048 MiB binaries, 500/200 tester limits and 1,000 releases/150-day retention.

- [Official source](https://firebase.google.com/pricing): “n) check Generous no-cost usage limits check No payment method needed Get started Pay as you go (Blaze plan) check Access more services and higher usage levels check If eligible, get $300 in free credit check No-cost us”
- [Official source](https://firebase.google.com/docs/app-distribution/troubleshooting): “ maximum file size limit for all binaries is 2048 MiB, which is a little over 2 GB. If the IPA size is within the file size limit and is reproducible, follow these steps: Check your Info.plist file and c”
- [Official source](https://firebase.google.com/docs/app-distribution/troubleshooting): “he following tester limits: Add a maximum of 500 testers to a Firebase project Add a maximum of 200 testers to an App Distribution group To add more testers, request a no-cost limit increase . Do my tester ”
- [Official source](https://firebase.google.com/docs/app-distribution/troubleshooting): “lease is older than 150 days. You exceed the 1,000 app release limit, and the app release is older than the 1,000 most recent app releases. For more information, see App Distribution supports a maximum of 1,000 release”

### `tools/flat-social` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

Pricing and home page support free five-person rooms, unlimited duration, no-card start and the stated monthly/day-pass capacity pricing. Exact free overflow enforcement remains explicitly unknown.

- [Official source](https://flat.social/pricing): “ats, no per-guest surprises. Free $0 forever Up to 5 people at once Unlimited session length Spatial audio + video rooms Your own maps & look Embed button for your site Create your flat Most popular Monthly $6 per sea”
- [Official source](https://flat.social/pricing): “r site Create your flat Most popular Monthly $6 per seat / month 6 25 seats — $150/month 100 Everything in Free Your capacity, your call — 6 to 100 seats Attendance insights & analytics Remove flat.social branding ”
- [Official source](https://flat.social/pricing): “anytime · resize whenever, prorated Day Pass $2 per seat / day · min 6 seats One-off events — no subscription Valid for 24 hours Up to 100 people On Monthly? Pay only for extra seats Cancel free until 24h before ”
- [Official source](https://flat.social): “en you are Spin up a room in under a minute. No install, no credit card. Invite your team, students, or friends and just hit go. Get Started Absurdly Delightful Online Meetings Create a playful virtual space where your gu”

### `tools/flutterflow` — corrected

Comparison complete: **yes**. Scan signal: `changed`.

Removed the unsupported 10 Lite credits allocation from summary, limits, body and FAQ. Current pricing explicitly lists 5 lifetime AI-generation requests and does not publish a separate Free Lite-credit allowance. This is a catalog correction, not a dated vendor-change claim.

- [Official source](https://www.flutterflow.io/pricing): “unt 2 projects Unlimited Unlimited Unlimited AI Generation 5 requests/lifetime 50 requests/mo 200 requests/mo 500 requests/mo Native AI Agent Usage Included 2.5x usage 5x usage Data & Integrations Firebase Integration Supabase I”
- [Official source](https://www.flutterflow.io/pricing): “ Integration AI Agents 1 Unlimited Unlimited API Endpoints Up to 2 Unlimited Unlimited Unlimited Swagger/OpenAPI Imports Development Environment 1 (default only) 1 (default only) Up to 1 additional (+default) Up to 2”
- [Official source](https://www.flutterflow.io/pricing): “Library Publishing Deployment Web Deployment Free Subdomains Up to 2 Up to 20 Up to 20 Up to 20 Custom Domains 1 free, more purchasable 1 free, more purchasable 1 free, more purchasable Custom Web Favicon FlutterFlow W”

### `tools/form-taxi` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Free quota and over-quota retention are supported. The captured English pricing page displays USD ($18.50/$15 for Standard), while the entry cites euro rates (€15/€12 and €58/€47). Verify the EUR selector/localized view before treating this as a price change or advancing the date.

- [Official source](https://form.taxi/en/plans): “ getting started and small websites Register 3 forms 40 Submissions Email notifications 5 recipient addresses Spam Shield Monthly archive Custom success page No-code Automation Tools Webhooks Standard $18.50 $15 / Mon”
- [Official source](https://form.taxi/en/plans): “ccess page No-code Automation Tools Webhooks Standard $18.50 $15 / Month monthly billing annual billing Optimal for personal projects and freelancers Purchase In addition to FREE: 15 forms 1000 Submissions 20 recip”
- [Official source](https://form.taxi/en/plans): “onthly quota of form submissions is reached, all further submissions will continue to be accepted and securely stored by Form.taxi. However, the submissions contents can only be viewed after upgrading to a plan with a higher submissions limit. Is ”

Outstanding: Free quota and over-quota retention are supported. The captured English pricing page displays USD ($18.50/$15 for Standard), while the entry cites euro rates (€15/€12 and €58/€47). Verify the EUR selector/localized view before treating this as a price change or advancing the date.

Source attempts:
- [https://form.taxi/en/plans](https://form.taxi/en/plans) — HTTP 200.
- [https://docs.form.taxi](https://docs.form.taxi) — HTTP 200.
- [https://docs.form.taxi/en/form-setup](https://docs.form.taxi/en/form-setup) — HTTP 200.
- [https://docs.form.taxi/en/limitations](https://docs.form.taxi/en/limitations) — HTTP 200.
- [https://form.taxi/](https://form.taxi/) — HTTP 200.

### `tools/formspark-io` — corrected

Comparison complete: **yes**. Scan signal: `noisy`.

Corrected the direct answer to say the first workspace gets 250 submissions; additional user-created workspaces start empty. Finite buffer/Overflow/discard behavior and no automatic payments are documented; the existing cap flag is retained.

- [Official source](https://documentation.formspark.io/troubleshooting/limits-and-plans.html): “dles, and deals apply to a single workspace. Additional user-created workspaces start with 0 submissions and can be upgraded separately. See additional workspaces . Team members ​ Free workspaces include 5 team members, and upgraded workspaces include 50”
- [Official source](https://documentation.formspark.io/troubleshooting/limits-and-plans.html): “your pace, and buy another when it runs out. There are no automatic payments. Running out of submissions ​ Formspark does not cut you off at exactly zero. There is a small buffer past the end of your submissions, and recent su”
- [Official source](https://documentation.formspark.io/troubleshooting/limits-and-plans.html): “matic payments. Running out of submissions ​ Formspark does not cut you off at exactly zero. There is a small buffer past the end of your submissions, and recent submissions that arrive beyond it are held back rather than discarded. You find”

### `tools/formspree-io` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current plans and over-limit documentation support 50 monthly submissions, free-plan file/team/email/archive limits and saved over-limit submissions that need reprocessing; signup-card uncertainty remains qualified.

- [Official source](https://formspree.io/plans/): “bers | 1 | 1 | 2 | Unlimited | Unlimited | | Monthly Submissions | 50 | 200 | 2,000 | 20,000 | Unlimited | | Submission Archive | 30 Days | Unlimited | Unlimited | Unlimited | Unlimited | | Linked Emails | 2 | Unlimited”
- [Official source](https://formspree.io/plans/): “ | 50 | 200 | 2,000 | 20,000 | Unlimited | | Submission Archive | 30 Days | Unlimited | Unlimited | Unlimited | Unlimited | | Linked Emails | 2 | Unlimited | Unlimited | Unlimited | Unlimited | | File Uploads | 0 GB | 1 GB ”
- [Official source](https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions): “e you have room in your limit again, you can reprocess them from the dashboard. Finding over-limit submissions Open your form and go to the Submissions tab. If any submissions arrived while you were over your limit, a banner tel”

### `tools/freeipapi` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

Current rate-limit and API docs support 60/minute with 10/10-second pacing, visitor/server IP accounting and separate free /api/v1/ endpoint; exact above-limit response remains unpublished as the entry states.

- [Official source](https://app.freeipapi.com/rate-limit): “om/api/v1/ 10 requests per 10 seconds, up to 60 requests per minute Paid Regional paid servers using /api/ No rate limits (whitelisted domains: 60 requests per minute per visitor IP) Free plan The ”
- [Official source](https://freeipapi.com/docs/api-reference/get-ip-info): “p} GET https://de.freeipapi.com/api/xml/{ip} Only the free API uses /api/v1/ . Paid API URLs stay on /api/ . Parameters Parameters Description Type Required Default ip The IP address you want to get the info of string No The r”
- [Official source](https://freeipapi.com): “ow it works? FreeIPAPI is a free service for commercial and non-commercial uses. We're using multiple data sources and various ways of calculations, to provide this API. Since we're running servers to provide this service, t”

### `tools/geekflare-api` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

Current pricing confirms all core credit, throughput, team, retention and per-endpoint costs. Exhaustion FAQ still gives renewal/manual-purchase options without an exact API enforcement response; existing uncertainty is retained.

- [Official source](https://geekflare.com/api/): “000 Plan Growth · $69/mo Free No card $0 /mo 500 credits / month 1 team member 7 days log retention 1 request per second Starter $19 /mo 10K credits / month 3 team members 30 days log retention 5 requests per secon”
- [Official source](https://geekflare.com/api/): “NS lookup and redirect checks cost 1 credit; search costs 2; screenshots and PDFs cost 5. Failed requests cost nothing. Does scraping handle JavaScript and SPAs? Yes. JavaScript is rendered automatically when a page needs it, or you can f”
- [Official source](https://geekflare.com/api/): “ice. What happens when free credits run out? The free tier renews every month at 500 credits. Paid plans start at $19/mo, or top up with a credit pack from $10 without a subscription. How many requests per second can I send? 1 on Free, 5 on S”

### `tools/gemini-api` — confirmed

Comparison complete: **yes**. Scan signal: `noisy`.

Current pricing, billing and rate-limit docs support selected-model Free usage, product-improvement use, project-level quotas and midnight-Pacific reset. Paid grounding allowances remain correctly excluded from Free.

- [Official source](https://ai.google.dev/gemini-api/docs/billing?hl=en): “first successful payment $20,000 - $100,000+ New accounts begin on the Free Tier, which allows access to certain models in the Gemini API and AI Studio, up to the models' free tier rate limits . To deploy your applications directl”
- [Official source](https://ai.google.dev/gemini-api/docs/rate-limits): “t, not per API key. Requests per day ( RPD ) quotas reset at midnight Pacific time. Limits vary depending on the specific model being used, and some limits only apply to specific models. For example, Images per minute, or IPM, is on”
- [Official source](https://ai.google.dev/gemini-api/docs/pricing): “_circle Google AI Studio access check_circle Content used to improve our products * Get started for Free Paid For production applications that require higher volumes and advanced features. check_circle Higher rate limits for produc”
- [Official source](https://ai.google.dev/gemini-api/docs/pricing): “Grounding with Google Search * Not available 5,000 free search requests per month (shared across all Gemini 3 and newer models), then $14 per 1,000 requests (subject to a daily cap of 1,500 requests per day). Grounding with Google ”

### `tools/gitdailies` — confirmed

Comparison complete: **yes**. Scan signal: `changed`.

Current provider, Marketplace and GitHub billing docs support the 14-day paid-plan trial, $59 Pro price, contributor bands and required payment method/automatic conversion unless cancelled. No perpetual free Community offer is listed.

- [Official source](https://gitdailies.com): “nnual -17% Switch to annual and save 17% Pro $59 / month Billed monthly Up to 15 contributors A contributor is anyone who opened a pull request or left a review in the last 30 days. Bots are never counted. ”
- [Official source](https://github.com/marketplace/gitdailies): “Next: Confirm your installation location and payment information GitDailies is provided by a third-party and is governed by separate terms of service , privacy policy , and support documentation About PR & DORA met”
- [Official source](https://docs.github.com/en/apps/github-marketplace/selling-your-app-on-github-marketplace/pricing-plans-for-github-marketplace-apps): “nt to offer free trials. These provide free, 14-day trials of OAuth or GitHub Apps to customers. When you set up a Marketplace pricing plan, you can select the option to provide a free trial for flat-rate or ”

### `tools/gitguardian` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

The current pricing page supports the headline Starter allowances, but the plan-usage and ggshield pages failed after the transport outage. Developer-count enforcement, scanning limits and CLI scope need those sources.

- [Official source](https://www.gitguardian.com/pricing): “ Secrets Monitoring free Plan also includes: Up to 25 devs Unlimited real-time scanning Up to 500 historical scan detection Business Teams Let’s Talk Start Trial Capabilities Internal Secrets Monitoring Every”
- [Official source](https://www.gitguardian.com/pricing): “scanning Up to 500 historical scan detection 10K API calls/month Start for free Growth Everything in Starter, plus: Internal secrets monitoring: code, CI/CD, containers, custom Public secrets monitoring (limited) D”

Outstanding: The current pricing page supports the headline Starter allowances, but the plan-usage and ggshield pages failed after the transport outage. Developer-count enforcement, scanning limits and CLI scope need those sources.

Source attempts:
- [https://www.gitguardian.com/pricing](https://www.gitguardian.com/pricing) — HTTP 200.
- [https://docs.gitguardian.com/platform/user-account/plan-usage](https://docs.gitguardian.com/platform/user-account/plan-usage) — HTTP 503, thin.
- [https://www.gitguardian.com](https://www.gitguardian.com) — HTTP 503, thin.
- [https://docs.gitguardian.com/](https://docs.gitguardian.com/) — HTTP 503, thin.
- [https://docs.gitguardian.com/ggshield-docs/getting-started](https://docs.gitguardian.com/ggshield-docs/getting-started) — HTTP 503, thin.

### `tools/github-codespaces` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://docs.github.com/en/billing/concepts/product-billing/github-codespaces](https://docs.github.com/en/billing/concepts/product-billing/github-codespaces) — HTTP 503, thin.
- [https://docs.github.com/en/codespaces](https://docs.github.com/en/codespaces) — HTTP 503, thin.
- [https://docs.github.com/en/codespaces/quickstart](https://docs.github.com/en/codespaces/quickstart) — HTTP 503, thin.
- [https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces](https://docs.github.com/en/codespaces/setting-your-user-preferences/setting-your-timeout-period-for-github-codespaces) — HTTP 503, thin.
- [https://github.com/features/codespaces](https://github.com/features/codespaces) — HTTP 503, thin.

### `tools/github-copilot` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Current pricing supports 2,000 completions and limited AI credit usage, but plan/signup documentation failed during the transport outage. The no-card claim and complete Free enforcement comparison remain incomplete.

- [Official source](https://github.com/features/copilot/plans): “rts CLI and agent mode. Learn more Free plan Limited chat and agent usage Pro plan $15 per month Pro+ plan $70 per month Max plan $200 per month Base credits Free plan Limited chat and agent usage Pro plan $10 per month Pro”

Outstanding: Current pricing supports 2,000 completions and limited AI credit usage, but plan/signup documentation failed during the transport outage. The no-card claim and complete Free enforcement comparison remain incomplete.

Source attempts:
- [https://github.com/features/copilot/plans](https://github.com/features/copilot/plans) — HTTP 200.
- [https://github.com/features/copilot](https://github.com/features/copilot) — HTTP 503, thin.
- [https://docs.github.com/en/copilot/get-started/plans](https://docs.github.com/en/copilot/get-started/plans) — HTTP 503, thin.
- [https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals](https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-individuals) — HTTP 200.
- [https://docs.github.com/en/copilot](https://docs.github.com/en/copilot) — HTTP 503, thin.

### `tools/houndci-com` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://houndci.com/](https://houndci.com/) — HTTP 503, thin.
- [http://help.houndci.com](http://help.houndci.com) — HTTP 503, thin.

### `tools/ibm-api-connect` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.ibm.com/products/api-connect/pricing](https://www.ibm.com/products/api-connect/pricing) — HTTP 503, thin.
- [https://www.ibm.com/products/api-connect](https://www.ibm.com/products/api-connect) — HTTP 503, thin.
- [https://www.ibm.com/docs/en/api-connect/cloud/10.0.x_saas](https://www.ibm.com/docs/en/api-connect/cloud/10.0.x_saas) — HTTP 503, thin.
- [https://www.ibm.com/cloud/api-connect](https://www.ibm.com/cloud/api-connect) — HTTP 503, thin.

### `tools/imgur-api` — unresolved

Comparison complete: **no**. Scan signal: `thin`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://apidocs.imgur.com/](https://apidocs.imgur.com/) — HTTP 503, thin.
- [https://api.imgur.com](https://api.imgur.com) — HTTP 503, thin.

### `tools/ip-geolocation-api` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.abstractapi.com/api/ip-geolocation-api](https://www.abstractapi.com/api/ip-geolocation-api) — HTTP 503, thin.
- [https://docs.abstractapi.com/api/ip-intelligence](https://docs.abstractapi.com/api/ip-intelligence) — HTTP 503, thin.
- [https://www.abstractapi.com/ip-geolocation-api](https://www.abstractapi.com/ip-geolocation-api) — HTTP 503, thin.

### `tools/ip-geolocation-api-by-ipwho-org` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.ipwho.org/pricing](https://www.ipwho.org/pricing) — HTTP 503, thin.
- [https://ipwho.org/](https://ipwho.org/) — HTTP 503, thin.
- [https://www.ipwho.org/docs](https://www.ipwho.org/docs) — HTTP 503, thin.
- [https://www.ipwho.org/docs/guides/rate-limits](https://www.ipwho.org/docs/guides/rate-limits) — HTTP 503, thin.
- [https://www.ipwho.org/faqs](https://www.ipwho.org/faqs) — HTTP 503, thin.
- [https://www.ipwho.org/llms.txt](https://www.ipwho.org/llms.txt) — HTTP 503, thin.

### `tools/ipapi` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://ipapi.co/](https://ipapi.co/) — HTTP 503, thin.
- [https://ipapi.co/faq/](https://ipapi.co/faq/) — HTTP 503, thin.
- [https://ipapi.co/api/](https://ipapi.co/api/) — HTTP 503, thin.

### `tools/jitsi-meet` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://meet.jit.si/](https://meet.jit.si/) — HTTP 503, thin.
- [https://jitsi.org/blog/changes-coming](https://jitsi.org/blog/changes-coming) — HTTP 503, thin.
- [https://jitsi.org/jitsi-meet/](https://jitsi.org/jitsi-meet/) — HTTP 503, thin.
- [https://jitsi.org/meet-jit-si-terms-of-service/](https://jitsi.org/meet-jit-si-terms-of-service/) — HTTP 503, thin.
- [https://jitsi.org/security/](https://jitsi.org/security/) — HTTP 503, thin.
- [https://jitsi.org/blog/authentication-on-meet-jit-si/](https://jitsi.org/blog/authentication-on-meet-jit-si/) — HTTP 503, thin.
- [https://jitsi.github.io/handbook/](https://jitsi.github.io/handbook/) — HTTP 503, thin.

### `tools/katalon` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://katalon.com/pricing](https://katalon.com/pricing) — HTTP 503, thin.
- [https://docs.katalon.com](https://docs.katalon.com) — HTTP 503, thin.
- [https://katalon.com](https://katalon.com) — HTTP 503, thin.

### `tools/kiro` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://kiro.dev/pricing/](https://kiro.dev/pricing/) — HTTP 503, thin.
- [https://kiro.dev/docs/billing/add-on-credits/](https://kiro.dev/docs/billing/add-on-credits/) — HTTP 503, thin.
- [https://kiro.dev/docs/billing/](https://kiro.dev/docs/billing/) — HTTP 503, thin.
- [https://kiro.dev/docs/getting-started/first-project/](https://kiro.dev/docs/getting-started/first-project/) — HTTP 503, thin.
- [https://kiro.dev/docs/getting-started/authentication/](https://kiro.dev/docs/getting-started/authentication/) — HTTP 503, thin.
- [https://kiro.dev/downloads/](https://kiro.dev/downloads/) — HTTP 503, thin.
- [https://kiro.dev/docs/](https://kiro.dev/docs/) — HTTP 503, thin.
- [https://kiro.dev](https://kiro.dev) — HTTP 503, thin.

### `tools/linear` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://linear.app/pricing](https://linear.app/pricing) — HTTP 503, thin.
- [https://linear.app/docs/github-integration](https://linear.app/docs/github-integration) — HTTP 503, thin.
- [https://linear.app](https://linear.app) — HTTP 503, thin.
- [https://linear.app/docs/start-guide](https://linear.app/docs/start-guide) — HTTP 503, thin.
- [https://linear.app/docs/billing-and-plans](https://linear.app/docs/billing-and-plans) — HTTP 503, thin.
- [https://linear.app/docs](https://linear.app/docs) — HTTP 503, thin.

### `tools/localhost-run` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://localhost.run](https://localhost.run) — HTTP 503, thin.
- [https://localhost.run/docs/](https://localhost.run/docs/) — HTTP 503, thin.
- [https://localhost.run/docs/forever-free/](https://localhost.run/docs/forever-free/) — HTTP 503, thin.
- [https://localhost.run/docs/faq/](https://localhost.run/docs/faq/) — HTTP 503, thin.

### `tools/localxpose` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://localxpose.io/pricing](https://localxpose.io/pricing) — HTTP 503, thin.
- [https://localxpose.io/docs](https://localxpose.io/docs) — HTTP 503, thin.
- [https://localxpose.io](https://localxpose.io) — HTTP 503, thin.

### `tools/lucidchart` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.lucidchart.com/pages/pricing](https://www.lucidchart.com/pages/pricing) — HTTP 503, thin.
- [https://help.lucid.co](https://help.lucid.co) — HTTP 503, thin.
- [https://www.lucidchart.com](https://www.lucidchart.com) — HTTP 503, thin.

### `tools/market-data-api` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.marketdata.app/pricing](https://www.marketdata.app/pricing) — HTTP 503, thin.
- [https://www.marketdata.app/docs/api](https://www.marketdata.app/docs/api) — HTTP 503, thin.
- [https://www.marketdata.app/docs/api/authentication](https://www.marketdata.app/docs/api/authentication) — HTTP 503, thin.
- [https://www.marketdata.app/docs/api/rate-limits](https://www.marketdata.app/docs/api/rate-limits) — HTTP 503, thin.
- [https://www.marketdata.app](https://www.marketdata.app) — HTTP 503, thin.

### `tools/mendix` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.mendix.com/pricing/](https://www.mendix.com/pricing/) — HTTP 503, thin.
- [https://docs.mendix.com/developerportal/deploy/mendix-cloud-deploy/](https://docs.mendix.com/developerportal/deploy/mendix-cloud-deploy/) — HTTP 503, thin.
- [https://docs.mendix.com/](https://docs.mendix.com/) — HTTP 503, thin.
- [https://www.mendix.com/](https://www.mendix.com/) — HTTP 503, thin.

### `tools/mockapi` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

The GitHub quickstart was readable, but pricing and product documentation failed in the transport outage. The current free project/endpoint allocation and signup/billing policy remain unverified.

- [Official source](https://github.com/mockapi-io/docs/wiki/Quick-start-guide): “add our first project and call it Todo app . Each project gets its own unique base URL that all endpoints under it will share. Resources Next, you'll need to add endpoints to your project. In mockapi.io, this is achieved by creating a R”

Outstanding: The GitHub quickstart was readable, but pricing and product documentation failed in the transport outage. The current free project/endpoint allocation and signup/billing policy remain unverified.

Source attempts:
- [https://mockapi.io/pricing](https://mockapi.io/pricing) — HTTP 503, thin.
- [https://github.com/mockapi-io/docs/wiki/Quick-start-guide](https://github.com/mockapi-io/docs/wiki/Quick-start-guide) — HTTP 200.
- [https://mockapi.io/docs](https://mockapi.io/docs) — HTTP 503, thin.
- [https://www.mockapi.io/](https://www.mockapi.io/) — HTTP 503, thin.

### `tools/mockerito` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://mockerito.com/](https://mockerito.com/) — HTTP 503, thin.
- [https://mockerito.com/tos](https://mockerito.com/tos) — HTTP 503, thin.
- [https://mockerito.com/free-apis](https://mockerito.com/free-apis) — HTTP 503, thin.

### `tools/mockfly` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.mockfly.dev/pricing](https://www.mockfly.dev/pricing) — HTTP 503, thin.
- [https://www.mockfly.dev/docs/import-postman-collection-to-mock-api/](https://www.mockfly.dev/docs/import-postman-collection-to-mock-api/) — HTTP 503, thin.
- [https://www.mockfly.dev/](https://www.mockfly.dev/) — HTTP 503, thin.
- [https://www.mockfly.dev/docs](https://www.mockfly.dev/docs) — HTTP 503, thin.

### `tools/mozilla-observatory` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://developer.mozilla.org/en-US/observatory](https://developer.mozilla.org/en-US/observatory) — HTTP 503, thin.
- [https://developer.mozilla.org/en-US/observatory/docs/faq](https://developer.mozilla.org/en-US/observatory/docs/faq) — HTTP 503, thin.
- [https://developer.mozilla.org/en-US/observatory/docs/tests_and_scoring](https://developer.mozilla.org/en-US/observatory/docs/tests_and_scoring) — HTTP 503, thin.
- [https://github.com/mdn/mdn-http-observatory](https://github.com/mdn/mdn-http-observatory) — HTTP 503, thin.

### `tools/ngrok` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://ngrok.com/pricing](https://ngrok.com/pricing) — HTTP 503, thin.
- [https://ngrok.com/docs/getting-started/](https://ngrok.com/docs/getting-started/) — HTTP 503, thin.
- [https://ngrok.com/docs/share-localhost/quickstart/](https://ngrok.com/docs/share-localhost/quickstart/) — HTTP 503, thin.
- [https://ngrok.com/docs](https://ngrok.com/docs) — HTTP 503, thin.
- [https://ngrok.com](https://ngrok.com) — HTTP 503, thin.

### `tools/numlookupapi-com` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://numlookupapi.com/pricing/](https://numlookupapi.com/pricing/) — HTTP 503, thin.
- [https://numlookupapi.com](https://numlookupapi.com) — HTTP 503, thin.
- [https://numlookupapi.com/docs](https://numlookupapi.com/docs) — HTTP 503, thin.
- [https://numlookupapi.com/docs/validate](https://numlookupapi.com/docs/validate) — HTTP 503, thin.
- [https://numlookupapi.com/docs/rate-limit](https://numlookupapi.com/docs/rate-limit) — HTTP 503, thin.
- [https://numlookupapi.com/docs/status-codes](https://numlookupapi.com/docs/status-codes) — HTTP 503, thin.

### `tools/openapi3-designer` — unresolved

Comparison complete: **no**. Scan signal: `thin`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://openapidesigner.com/](https://openapidesigner.com/) — HTTP 503, thin.
- [https://openapidesigner.com/docs](https://openapidesigner.com/docs) — HTTP 503, thin.

### `tools/openobserve-ai` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://openobserve.ai/pricing](https://openobserve.ai/pricing) — HTTP 503, thin.
- [https://openobserve.ai/downloads/](https://openobserve.ai/downloads/) — HTTP 503, thin.
- [https://github.com/openobserve/openobserve](https://github.com/openobserve/openobserve) — HTTP 503, thin.
- [https://openobserve.ai/docs/](https://openobserve.ai/docs/) — HTTP 503, thin.
- [https://openobserve.ai/docs/getting-started/](https://openobserve.ai/docs/getting-started/) — HTTP 503, thin.
- [https://openobserve.ai/docs/ingestion/logs/curl/](https://openobserve.ai/docs/ingestion/logs/curl/) — HTTP 503, thin.
- [https://openobserve.ai/](https://openobserve.ai/) — HTTP 503, thin.

### `tools/outsystems` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.outsystems.com/pricing-and-editions/](https://www.outsystems.com/pricing-and-editions/) — HTTP 503, thin.
- [https://success.outsystems.com/documentation/](https://success.outsystems.com/documentation/) — HTTP 503, thin.
- [https://www.outsystems.com/](https://www.outsystems.com/) — HTTP 503, thin.

### `tools/penpot` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://penpot.app/pricing](https://penpot.app/pricing) — HTTP 503, thin.
- [https://help.penpot.app/user-guide/teams/](https://help.penpot.app/user-guide/teams/) — HTTP 503, thin.
- [https://help.penpot.app](https://help.penpot.app) — HTTP 503, thin.
- [https://penpot.app](https://penpot.app) — HTTP 503, thin.

### `tools/percy-io` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.browserstack.com/docs/percy/overview/plans-and-billing](https://www.browserstack.com/docs/percy/overview/plans-and-billing) — HTTP 503, thin.
- [https://www.browserstack.com/pricing?product=percy](https://www.browserstack.com/pricing?product=percy) — HTTP 503, thin.
- [https://www.browserstack.com/docs/percy/overview/visual-testing-basics](https://www.browserstack.com/docs/percy/overview/visual-testing-basics) — HTTP 503, thin.
- [https://www.browserstack.com/docs/percy/get-started-without-code-or-automation-script/first-percy-build](https://www.browserstack.com/docs/percy/get-started-without-code-or-automation-script/first-percy-build) — HTTP 503, thin.
- [https://docs.percy.io/](https://docs.percy.io/) — HTTP 503, thin.
- [https://percy.io](https://percy.io) — HTTP 503, thin.

### `tools/pinggy` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://pinggy.io](https://pinggy.io) — HTTP 503, thin.
- [https://pinggy.io/docs/](https://pinggy.io/docs/) — HTTP 503, thin.

### `tools/plane` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://plane.so/pricing](https://plane.so/pricing) — HTTP 503, thin.
- [https://docs.plane.so](https://docs.plane.so) — HTTP 503, thin.
- [https://plane.so](https://plane.so) — HTTP 503, thin.

### `tools/posthog` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://posthog.com/pricing](https://posthog.com/pricing) — HTTP 503, thin.
- [https://posthog.com/](https://posthog.com/) — HTTP 503, thin.
- [https://posthog.com/docs/getting-started/install](https://posthog.com/docs/getting-started/install) — HTTP 503, thin.
- [https://posthog.com/docs](https://posthog.com/docs) — HTTP 503, thin.

### `tools/postman` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.postman.com/pricing/](https://www.postman.com/pricing/) — HTTP 503, thin.
- [https://www.postman.com/ai/api-documentation/](https://www.postman.com/ai/api-documentation/) — HTTP 503, thin.
- [https://learning.postman.com/docs/getting-started/introduction/](https://learning.postman.com/docs/getting-started/introduction/) — HTTP 503, thin.
- [https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/](https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/) — HTTP 503, thin.
- [https://learning.postman.com/docs/billing/about-plans/](https://learning.postman.com/docs/billing/about-plans/) — HTTP 503, thin.
- [https://learning.postman.com/docs/billing/resource-usage/](https://learning.postman.com/docs/billing/resource-usage/) — HTTP 503, thin.
- [https://postman.com](https://postman.com) — HTTP 503, thin.

### `tools/qase-io` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.qase.io/pricing/](https://www.qase.io/pricing/) — HTTP 503, thin.
- [https://docs.qase.io/en/articles/5563688-getting-started](https://docs.qase.io/en/articles/5563688-getting-started) — HTTP 503, thin.
- [https://qase.io](https://qase.io) — HTTP 503, thin.
- [https://docs.qase.io/](https://docs.qase.io/) — HTTP 503, thin.

### `tools/qualys-community-edition` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.qualys.com/community-edition](https://www.qualys.com/community-edition) — HTTP 503, thin.
- [https://www.qualys.com/free-trial-new?leadsource=2398187](https://www.qualys.com/free-trial-new?leadsource=2398187) — HTTP 503, thin.
- [https://www.qualys.com/free-services](https://www.qualys.com/free-services) — HTTP 503, thin.
- [https://docs.qualys.com/](https://docs.qualys.com/) — HTTP 503, thin.

### `tools/quay-io` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://quay.io/plans/](https://quay.io/plans/) — HTTP 503, thin.
- [https://docs.projectquay.io/](https://docs.projectquay.io/) — HTTP 503, thin.
- [https://quay.io](https://quay.io) — HTTP 503, thin.

### `tools/rapidapi` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://rapidapi.com/hub](https://rapidapi.com/hub) — HTTP 503, thin.
- [https://docs.rapidapi.com/v2.0.0/docs/api-pricing](https://docs.rapidapi.com/v2.0.0/docs/api-pricing) — HTTP 503, thin.
- [https://docs.rapidapi.com/v2.0.0/docs/faqs](https://docs.rapidapi.com/v2.0.0/docs/faqs) — HTTP 503, thin.
- [https://docs.rapidapi.com/](https://docs.rapidapi.com/) — HTTP 503, thin.
- [https://rapidapi.com](https://rapidapi.com) — HTTP 503, thin.

### `tools/read-the-docs` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://about.readthedocs.com/pricing/](https://about.readthedocs.com/pricing/) — HTTP 503, thin.
- [https://about.readthedocs.com](https://about.readthedocs.com) — HTTP 503, thin.
- [https://docs.readthedocs.com](https://docs.readthedocs.com) — HTTP 503, thin.
- [https://docs.readthedocs.com/platform/stable/tutorial/index.html](https://docs.readthedocs.com/platform/stable/tutorial/index.html) — HTTP 503, thin.

### `tools/replit` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://replit.com/pricing](https://replit.com/pricing) — HTTP 503, thin.
- [https://replit.com](https://replit.com) — HTTP 503, thin.
- [https://docs.replit.com/billing/plans/starter-plan](https://docs.replit.com/billing/plans/starter-plan) — HTTP 503, thin.
- [https://docs.replit.com](https://docs.replit.com) — HTTP 503, thin.

### `tools/repoforge` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://repoforge.io](https://repoforge.io) — HTTP 503, thin.
- [https://repoforge.io/pricing](https://repoforge.io/pricing) — HTTP 503, thin.

### `tools/reportgpt` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://ReportGPT.app](https://ReportGPT.app) — HTTP 503, thin.

### `tools/retool` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://retool.com/pricing](https://retool.com/pricing) — HTTP 503, thin.
- [https://docs.retool.com/data-sources/concepts/intro/retool-database](https://docs.retool.com/data-sources/concepts/intro/retool-database) — HTTP 503, thin.
- [https://docs.retool.com/](https://docs.retool.com/) — HTTP 503, thin.
- [https://retool.com/](https://retool.com/) — HTTP 503, thin.

### `tools/sauce-labs` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://saucelabs.com/pricing](https://saucelabs.com/pricing) — HTTP 503, thin.
- [https://saucelabs.com/sign-up](https://saucelabs.com/sign-up) — HTTP 503, thin.
- [https://saucelabs.com/doc/support-policy](https://saucelabs.com/doc/support-policy) — HTTP 503, thin.
- [https://docs.saucelabs.com](https://docs.saucelabs.com) — HTTP 503, thin.
- [https://saucelabs.com](https://saucelabs.com) — HTTP 503, thin.

### `tools/scan-coverity-com` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://scan.coverity.com/](https://scan.coverity.com/) — HTTP 503, thin.
- [https://scan.coverity.com/faq](https://scan.coverity.com/faq) — HTTP 503, thin.

### `tools/semgrep` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://semgrep.dev/pricing/](https://semgrep.dev/pricing/) — HTTP 503, thin.
- [https://docs.semgrep.dev/usage-and-billing/overview](https://docs.semgrep.dev/usage-and-billing/overview) — HTTP 503, thin.
- [https://semgrep.dev/docs/](https://semgrep.dev/docs/) — HTTP 503, thin.
- [https://semgrep.dev/docs/getting-started/quickstart](https://semgrep.dev/docs/getting-started/quickstart) — HTTP 503, thin.
- [https://semgrep.dev](https://semgrep.dev) — HTTP 503, thin.

### `tools/serpapi` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://serpapi.com/pricing](https://serpapi.com/pricing) — HTTP 503, thin.
- [https://serpapi.com/api-status-and-error-codes](https://serpapi.com/api-status-and-error-codes) — HTTP 503, thin.
- [https://serpapi.com/search-api](https://serpapi.com/search-api) — HTTP 503, thin.
- [https://serpapi.com/](https://serpapi.com/) — HTTP 503, thin.

### `tools/shortcut` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.shortcut.com/pricing](https://www.shortcut.com/pricing) — HTTP 503, thin.
- [https://help.shortcut.com](https://help.shortcut.com) — HTTP 503, thin.
- [https://www.shortcut.com](https://www.shortcut.com) — HTTP 503, thin.

### `tools/simplepdf-eu` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://simplepdf.com/pricing](https://simplepdf.com/pricing) — HTTP 503, thin.
- [https://simplepdf.com/embed](https://simplepdf.com/embed) — HTTP 503, thin.

### `tools/smartforms-dev` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://smartforms.dev/pricing](https://smartforms.dev/pricing) — HTTP 503, thin.
- [https://smartforms.dev/documentation/getting-started/basic-usage](https://smartforms.dev/documentation/getting-started/basic-usage) — HTTP 503, thin.
- [https://smartforms.dev/features](https://smartforms.dev/features) — HTTP 503, thin.
- [https://smartforms.dev/documentation](https://smartforms.dev/documentation) — HTTP 503, thin.
- [https://smartforms.dev/](https://smartforms.dev/) — HTTP 503, thin.

### `tools/softr` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.softr.io/pricing](https://www.softr.io/pricing) — HTTP 503, thin.
- [https://docs.softr.io/workspace-and-billing/pricing-and-plans](https://docs.softr.io/workspace-and-billing/pricing-and-plans) — HTTP 503, thin.
- [https://docs.softr.io/](https://docs.softr.io/) — HTTP 503, thin.
- [https://www.softr.io/](https://www.softr.io/) — HTTP 503, thin.

### `tools/tally` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://tally.so/pricing](https://tally.so/pricing) — HTTP 503, thin.
- [https://tally.so/help/tally-a-free-typeform-alternative](https://tally.so/help/tally-a-free-typeform-alternative) — HTTP 503, thin.
- [https://tally.so/help/fair-use-policy](https://tally.so/help/fair-use-policy) — HTTP 503, thin.
- [https://tally.so/help/create-a-form](https://tally.so/help/create-a-form) — HTTP 503, thin.
- [https://tally.so/help](https://tally.so/help) — HTTP 503, thin.
- [https://tally.so](https://tally.so) — HTTP 503, thin.

### `tools/teamwork` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.teamwork.com/pricing/](https://www.teamwork.com/pricing/) — HTTP 503, thin.
- [https://support.teamwork.com](https://support.teamwork.com) — HTTP 503, thin.
- [https://www.teamwork.com](https://www.teamwork.com) — HTTP 503, thin.

### `tools/teleporthq` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://teleporthq.io/pricing](https://teleporthq.io/pricing) — HTTP 503, thin.
- [https://docs.teleporthq.io/](https://docs.teleporthq.io/) — HTTP 503, thin.
- [https://teleporthq.io/](https://teleporthq.io/) — HTTP 503, thin.

### `tools/testingbot-com` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://testingbot.com/pricing](https://testingbot.com/pricing) — HTTP 503, thin.
- [https://testingbot.com/users/sign_up](https://testingbot.com/users/sign_up) — HTTP 503, thin.
- [https://testingbot.com/support/getting-started](https://testingbot.com/support/getting-started) — HTTP 503, thin.
- [https://testingbot.com/open-source](https://testingbot.com/open-source) — HTTP 503, thin.
- [https://testingbot.com/](https://testingbot.com/) — HTTP 503, thin.

### `tools/testmu-ai` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.testmuai.com/pricing/](https://www.testmuai.com/pricing/) — HTTP 503, thin.
- [https://www.testmuai.com/pricing.md](https://www.testmuai.com/pricing.md) — HTTP 503, thin.
- [https://www.testmuai.com/support/docs/](https://www.testmuai.com/support/docs/) — HTTP 503, thin.
- [https://www.testmuai.com](https://www.testmuai.com) — HTTP 503, thin.

### `tools/testtls-com` — unresolved

Comparison complete: **no**. Scan signal: `blocked`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://testtls.com](https://testtls.com) — HTTP 503, thin.

### `tools/tickgit-com` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.tickgit.com/](https://www.tickgit.com/) — HTTP 503, thin.
- [https://github.com/augmentable-dev/tickgit](https://github.com/augmentable-dev/tickgit) — HTTP 503, thin.
- [https://raw.githubusercontent.com/augmentable-dev/tickgit/master/README.md](https://raw.githubusercontent.com/augmentable-dev/tickgit/master/README.md) — HTTP 503, thin.

### `tools/toggl` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://toggl.com/pricing](https://toggl.com/pricing) — HTTP 503, thin.
- [https://support.toggl.com](https://support.toggl.com) — HTTP 503, thin.
- [https://toggl.com](https://toggl.com) — HTTP 503, thin.

### `tools/tomorrow-io-weather-api` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.tomorrow.io/weather-api/pricing/](https://www.tomorrow.io/weather-api/pricing/) — HTTP 503, thin.
- [https://support.tomorrow.io/hc/en-us/articles/20273728362644-Free-API-Plan-Rate-Limits](https://support.tomorrow.io/hc/en-us/articles/20273728362644-Free-API-Plan-Rate-Limits) — HTTP 503, thin.
- [https://docs.tomorrow.io/reference/welcome](https://docs.tomorrow.io/reference/welcome) — HTTP 503, thin.
- [https://docs.tomorrow.io/reference/rate-limiting](https://docs.tomorrow.io/reference/rate-limiting) — HTTP 503, thin.
- [https://docs.tomorrow.io/reference/api-authentication](https://docs.tomorrow.io/reference/api-authentication) — HTTP 503, thin.
- [https://www.tomorrow.io/weather-api/](https://www.tomorrow.io/weather-api/) — HTTP 503, thin.

### `tools/tooljet` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.tooljet.ai/pricing](https://www.tooljet.ai/pricing) — HTTP 503, thin.
- [https://tooljet.com/pricing](https://tooljet.com/pricing) — HTTP 503, thin.
- [https://docs.tooljet.ai/docs/](https://docs.tooljet.ai/docs/) — HTTP 503, thin.
- [https://www.tooljet.ai/](https://www.tooljet.ai/) — HTTP 503, thin.

### `tools/trello` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://trello.com/pricing](https://trello.com/pricing) — HTTP 503, thin.
- [https://support.atlassian.com/trello/docs/workspace-user-limit/](https://support.atlassian.com/trello/docs/workspace-user-limit/) — HTTP 503, thin.
- [https://support.atlassian.com/trello/docs/butler-quotas-and-limits/](https://support.atlassian.com/trello/docs/butler-quotas-and-limits/) — HTTP 503, thin.
- [https://support.atlassian.com/trello/](https://support.atlassian.com/trello/) — HTTP 503, thin.
- [https://trello.com](https://trello.com) — HTTP 503, thin.

### `tools/unirateapi` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://unirateapi.com/pricing](https://unirateapi.com/pricing) — HTTP 503, thin.
- [https://unirateapi.com](https://unirateapi.com) — HTTP 503, thin.
- [https://unirateapi.com/docs/python](https://unirateapi.com/docs/python) — HTTP 503, thin.
- [https://unirateapi.com/apidocs/](https://unirateapi.com/apidocs/) — HTTP 503, thin.

### `tools/uxtweak` — unresolved

Comparison complete: **no**. Scan signal: `blocked`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://www.uxtweak.com/pricing](https://www.uxtweak.com/pricing) — HTTP 503, thin.
- [https://www.uxtweak.com/user-testing-germany](https://www.uxtweak.com/user-testing-germany) — HTTP 503, thin.
- [https://help.uxtweak.com/](https://help.uxtweak.com/) — HTTP 503, thin.
- [https://www.uxtweak.com/](https://www.uxtweak.com/) — HTTP 503, thin.

### `tools/vatcheckapi-com` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://vatcheckapi.com/pricing/](https://vatcheckapi.com/pricing/) — HTTP 503, thin.
- [https://vatcheckapi.com](https://vatcheckapi.com) — HTTP 503, thin.
- [https://vatcheckapi.com/docs](https://vatcheckapi.com/docs) — HTTP 503, thin.
- [https://vatcheckapi.com/docs/check](https://vatcheckapi.com/docs/check) — HTTP 503, thin.

### `tools/wakatime` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://wakatime.com/pricing](https://wakatime.com/pricing) — HTTP 503, thin.
- [https://wakatime.com/help](https://wakatime.com/help) — HTTP 503, thin.
- [https://wakatime.com](https://wakatime.com) — HTTP 503, thin.

### `tools/zapier` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://zapier.com/pricing](https://zapier.com/pricing) — HTTP 503, thin.
- [https://help.zapier.com/hc/en-us](https://help.zapier.com/hc/en-us) — HTTP 503, thin.
- [https://help.zapier.com/hc/en-us/articles/22234847450893](https://help.zapier.com/hc/en-us/articles/22234847450893) — HTTP 503, thin.
- [https://help.zapier.com/hc/en-us/articles/8496181725453-Create-a-Zap](https://help.zapier.com/hc/en-us/articles/8496181725453-Create-a-Zap) — HTTP 503, thin.
- [https://help.zapier.com/hc/en-us/articles/8496288690317](https://help.zapier.com/hc/en-us/articles/8496288690317) — HTTP 503, thin.
- [https://help.zapier.com/hc/en-us/articles/8496083355661-Trigger-Zaps-from-webhooks](https://help.zapier.com/hc/en-us/articles/8496083355661-Trigger-Zaps-from-webhooks) — HTTP 503, thin.
- [https://zapier.com/](https://zapier.com/) — HTTP 503, thin.

### `tools/zipcodebase` — unresolved

Comparison complete: **no**. Scan signal: `noisy`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://zipcodebase.com/pricing-plans/](https://zipcodebase.com/pricing-plans/) — HTTP 503, thin.
- [https://zipcodebase.com](https://zipcodebase.com) — HTTP 503, thin.
- [https://app.zipcodebase.com/documentation](https://app.zipcodebase.com/documentation) — HTTP 503, thin.

### `tools/zipcodestack` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://zipcodestack.com/pricing](https://zipcodestack.com/pricing) — HTTP 503, thin.
- [https://zipcodestack.com/docs/rate-limit/](https://zipcodestack.com/docs/rate-limit/) — HTTP 503, thin.
- [https://zipcodestack.com](https://zipcodestack.com) — HTTP 503, thin.
- [https://zipcodestack.com/docs/authentication/](https://zipcodestack.com/docs/authentication/) — HTTP 503, thin.
- [https://zipcodestack.com/docs](https://zipcodestack.com/docs) — HTTP 503, thin.

### `tools/zoom` — unresolved

Comparison complete: **no**. Scan signal: `changed`.

Official-source retrieval was attempted, but the cloud environment returned a shared HTTP 503 transport failure before usable source evidence was available. No semantic freshness conclusion or verification-date update is justified.


Outstanding: Re-fetch the cited official pages after the environment proxy recovers, then compare all material entry claims.

Source attempts:
- [https://zoom.us/pricing](https://zoom.us/pricing) — HTTP 503, thin.
- [https://zoom.us/signup?signUpFrom=zoom-guided-tours](https://zoom.us/signup?signUpFrom=zoom-guided-tours) — HTTP 503, thin.
- [https://support.zoom.com/hc/de/article?id=zm_kb&sysparm_article=KB0067980](https://support.zoom.com/hc/de/article?id=zm_kb&sysparm_article=KB0067980) — HTTP 503, thin.
- [https://support.zoom.com](https://support.zoom.com) — HTTP 503, thin.
- [https://zoom.us](https://zoom.us) — HTTP 503, thin.
