# Resumed review of issue #77 — batch 2

Date: 2026-11-02. Scope: the 49 unfinished entries assigned to batch 2.

No additional reviews could be completed in this resumed attempt. The first normal browser request, to Crowdin pricing, returned HTTP 503 with an upstream connection/transport error. The browser stopped before requesting Doppler, drawDB or Directus. The central source collector independently stopped after repeated proxy failures before reaching this batch. No failed response replaced previously successful evidence.

The fresh raw-HTML cache contains no source URL belonging to these 49 entries. Tool discovery found no separate web-search/fetch connector to obtain the required vendor evidence. Further identical remote retries were stopped after the global transport failure was confirmed.

Outcome: 0 completed; 10 partial entries retain previously collected official evidence; 39 entries still lack a source comparison. Every entry remains unresolved in this resumed pass. The earlier CurlShot wording correction remains in place, but its vendor-source conflict is still unresolved. No service content or verification dates changed; no content tests were rerun because this attempt produced documentation and a manifest only.

## services/coupler — unresolved (partial)

Free 100-row manual runs, one account/source/destination and seven-day trial match, but an existing Claude connector known-issue claim lacks current supporting documentation.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://www.coupler.io/pricing

> 100 rows / run
> 5000 rows / run
> Unlimited
> Unlimited
> Unlimited
> API access
> -
> -
> AI
> Integrations
> Claude
> ChatGPT
> OpenClaw
> Cursor
> Perplexity
> Gemini
> Copilot
> Custom MCP
> AI Agent
> -
> 900
> 1500
> 3000
> 6000
> AI Insights
> -
> 5
> 25
> 100
> Custom
> Visualizations
> Dashboard templates
> 230+
> 230+
> 230+
> 230+
> 230+
> Transformations
> Custom formulas
> Ap

Remaining: Recheck the specific Claude connector known-issue statement; the cited help URL now serves general documentation. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/crowdin — unresolved (partial)

Word accounting and ten-day suspension grace verified; dynamic Free plan comparison was absent from the initial pricing snapshot.

Resume: Browser returned HTTP 503; stopped immediately.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://support.crowdin.com/changing-subscription-plan

> an email from us asking to upgrade. You then have 10 more days to upgrade the subscription. Otherwise, your project will be suspended for translators. You can still access your account and project settings, and all data will remain as is until the subscription is updated.
> We recommend upgrading the subscription plan beforehand if you expect to have more hosted

Remaining: Verify rendered Free table: 60,000 words, one private project, integration, collaborator restrictions and translation-memory donation. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/curlshot — unresolved (partial)

Corrected categorical paid-overage wording: pricing says no overage, usage guide describes optional paid overage. Free 100 screenshots and hard stop remain supported.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://curlshot.com/pricing

> No overage charges At the limit, requests stop with a clear error. The bill is the plan price, never more.
> Up now, down at renewal An upgrade applies at once and you pay the difference for the time left. A downgrade waits for the next renewal.
> Cancel in two clicks The plan runs to the end of the period you paid for.

https://curlshot.com/docs/usage-and-limits

> # Optional overage
> Paid plans can keep rendering after the quota and the bonus screenshots run out. Overage is off until you turn it on, on the billing page of your dashboard:
> You set a monthly cap in dollars. Overage stops when it reaches the cap, so the most you can spend in a period is the cap.
> Overage is paid fro

Remaining: Vendor pricing and usage documentation disagree on paid-plan overage. Confirm paid dashboard terms; lastVerified retained.

## services/directus-cloud — unresolved (partial)

Hosted 14-day trial, Cloud prices and Core seat/collection limits match. The static pricing snapshot exposes the Cloud tab but does not explicitly establish the existing $0 Core self-hosted license claim.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://directus.io/pricing

> 14-day free trial · No commitment
> 3 user seats
> 25 Collections
> 5 Flows
> AI Assistant
> Advanced RBAC
> Community Support
> Team
> Team
> For teams who need a supported, production-ready deployment with SSO.
> $588
> $588
> / mo
> / mo
> Billed yearly, or $698 monthly
> See Details
> Start Free Trial
> 14-day free trial · No comm

https://directus.io/pricing

> Billed yearly, or $99 monthly
> Get Started
> Start Free Trial
> 14-day free trial · No commitment
> 3 user seats
> 25 Collections
> 5 Flows
> AI Assistant
> Advanced RBAC
> Community Support
> Team
> Team
> For teams who need a supported, production-ready deployment with SSO.
> $588
> $588
> / mo
> / mo
> Billed yearly, or $698 monthly
> See Details
> Star

Remaining: Verify the rendered Self-Hosted Core price. The environment transport failure prevented the required follow-up; prior lastVerified retained.

## services/doppler — unresolved (partial)

Core Free developer/project limits match, but the static pricing FAQ exposes the no-card question without its answer.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://www.doppler.com/pricing

> Get Demo Start for Free
> Sign In
> One bill.
> No surprises.
> Per-seat pricing for your team. AI agents and non-human identities ride free.
> Developer
> Secure your solo projects & focus on what matters - building.
> Free for 3 users
> $8/mo per additional user
> Integrations
> Doppler CLI for local development
> Service tokens
> Email alerts

Remaining: Confirm the no-card signup claim using rendered FAQ or official signup documentation. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/drawdb — unresolved (partial)

Official FAQ confirms the free local browser editor without an account and distinguishes Pro cloud/collaboration features; plan cards failed to load.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://drawdb.app/pricing

> Is drawDB free? Yes. drawDB is free and open source — the full editor runs in your browser with no account required. Pro adds cloud storage, teams, and real-time collaboration on top.
> Where are my diagrams saved? In the free editor, diagrams are stored locally in your browser (IndexedDB), so back them up before clearing your browser. With drawDB Pro

Remaining: Recheck the unlimited local diagram allowance and complete plan feature matrix from rendered pricing. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/firebase-storage — unresolved (partial)

Current pricing supports Blaze-only bucket quotas, but transfer destination exclusions and exact Spark 402/403 behavior need unavailable free-tier/FAQ pages.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://firebase.google.com/pricing

> • For the default *.firebasestorage.app bucket and any additional buckets, fees are processed as Google Cloud Storage usage fees .
> *.appspot.com
> legacy buckets
> GB stored
> Not applicable
> No-cost up to 5 GB
> Then $0.026/GB
> GB downloaded
> Not applicable
> No-cost up to 1 GB/day
> Then $0.12/GB
> Upload operations
> Not applicable
> No-cost up to 20K/day

Remaining: Recheck geographic download exclusions and exact Spark error/access behavior from the storage-change FAQ and Cloud Free Tier guide.

## services/firecrawl — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.firecrawl.dev/pricing, https://docs.firecrawl.dev, https://www.firecrawl.dev

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/fivenines — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://fivenines.io/pricing, https://fivenines.io/api-docs, https://fivenines.io/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/fivetran — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.fivetran.com/pricing, https://www.fivetran.com/pricing/free-plan, https://fivetran.com/docs, https://www.fivetran.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/flarewarden — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://flarewarden.com/pricing, https://flarewarden.com/docs, https://flarewarden.com/docs/getting-started, https://flarewarden.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/fly-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://fly.io/docs/about/pricing/, https://fly.io/docs/about/free-trial/, https://fly.io/docs/getting-started/, https://fly.io/docs/flyctl/install/, https://fly.io/docs/launch/create/, https://fly.io/docs/, https://fly.io/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/forward-email — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://forwardemail.net/en/pricing, https://forwardemail.net/en/faq, https://forwardemail.net/en

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/freedns-afraid — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://freedns.afraid.org/pricing/, https://freedns.afraid.org/signup/moreinfo/, https://freedns.afraid.org/signup/features/, https://freedns.afraid.org/, https://freedns.afraid.org/premium/, https://freedns.afraid.org/faq/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/frontegg — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://frontegg.com/pricing, https://developers.frontegg.com/, https://developers.frontegg.com/ciam/guides/getting-started/quick-start, https://frontegg.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gemfury — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://gemfury.com/pricing, https://gemfury.com, https://gemfury.com/help/getting-started, https://gemfury.com/help/upload-packages, https://gemfury.com/help/limits/, https://gemfury.com/help

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/geoapify — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.geoapify.com/pricing/, https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/, https://apidocs.geoapify.com, https://www.geoapify.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/geocodio — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.geocod.io/pricing/, https://www.geocod.io/docs/, https://www.geocod.io

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/getupdraft — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.getupdraft.com/pricing, https://docs.getupdraft.com, https://docs.getupdraft.com/quickstart/your-first-app-project/upload-first-build, https://docs.getupdraft.com/faq, https://www.getupdraft.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gigalixir — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.gigalixir.com/pricing, https://www.gigalixir.com/docs/, https://www.gigalixir.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gitbook — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.gitbook.com/pricing, https://docs.gitbook.com/, https://docs.gitbook.com/getting-started/quickstart, https://www.gitbook.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/github-actions — unresolved (partial)

Official product page still confirms free public-repository CI/CD, but private minutes/storage, runner eligibility and spending behavior could not be verified.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://github.com/features/actions

> GitHub Actions is free for public repositories
> We take pride in our Open Source legacy, and are happy to provide free CI/CD for public repositories. Check out the doc to see which runners are incl

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/github-pages — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits, https://pages.github.com/, https://docs.github.com/en/pages, https://docs.github.com/en/pages/quickstart

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gitlab — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://about.gitlab.com/pricing/, https://docs.gitlab.com/ci/pipelines/compute_minutes/, https://docs.gitlab.com/user/project/, https://docs.gitlab.com/ci/quick_start/, https://docs.gitlab.com/ci/pipelines/instance_runner_compute_minutes/, https://docs.gitlab.com/subscriptions/gitlab_com/compute_minutes/, https://docs.gitlab.com/, https://about.gitlab.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gitlab-ci-cd — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://about.gitlab.com/pricing/, https://docs.gitlab.com/ci/, https://docs.gitlab.com/ci/quick_start/, https://docs.gitlab.com/ci/pipelines/compute_minutes/, https://docs.gitlab.com/ci/runners/, https://docs.gitlab.com/ci/pipelines/instance_runner_compute_minutes/, https://docs.gitlab.com/subscriptions/gitlab_com/compute_minutes/, https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gokanban-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://gokanban.io

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-fonts — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://developers.google.com/fonts, https://developers.google.com/fonts/docs/css2, https://fonts.google.com/faq, https://developers.google.com/fonts/docs/getting_started, https://developers.google.com/fonts/docs/technical_considerations, https://github.com/google/fonts, https://fonts.google.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-maps-platform — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://mapsplatform.google.com/pricing/, https://developers.google.com/maps/billing-and-pricing/overview?hl=en, https://developers.google.com/maps/billing-and-pricing/pricing?hl=en, https://developers.google.com/maps/get-started?hl=en, https://developers.google.com/maps/documentation/javascript/demo-key?hl=en, https://developers.google.com/maps/documentation, https://mapsplatform.google.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-natural-language — unresolved (partial)

Product page confirms service availability and general new-customer credit only; per-feature Natural Language free grants and billing units could not be verified.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://cloud.google.com/natural-language

> New customers get up to $300 in free credits to try Google Cloud products
> Get insightful text analysis with machine learning that extracts, analyzes, and stores text
> Apply natura

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-secret-manager — unresolved (partial)

Official free-products catalog confirms six secret versions/month, but operation/rotation grants, payment requirements and paid rates could not be verified.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

The following evidence is carried forward from the earlier pass; it is not a new successful fetch.

https://cloud.google.com/free

> 6 secret versions per month
> Cloud Shell
> Online development and operations environment accessible anywhere with your browser.
> Includes 5 GB of persistent disk storage
> Workload Ma

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-speech-to-text — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://cloud.google.com/speech-to-text/pricing, https://cloud.google.com/free/docs/free-cloud-features, https://cloud.google.com/speech-to-text/docs/overview, https://cloud.google.com/speech-to-text

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/grafana-cloud — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://grafana.com/pricing/, https://grafana.com/docs/grafana-cloud/, https://grafana.com/docs/grafana-cloud/get-started/, https://grafana.com/docs/grafana-cloud/send-data/, https://grafana.com/products/cloud/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/graphhopper — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.graphhopper.com/pricing/, https://docs.graphhopper.com, https://www.graphhopper.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gridlastic-com — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.gridlastic.com/pricing.html, https://www.gridlastic.com/how-it-works.html, https://www.gridlastic.com/test-environments.html, https://www.gridlastic.com/documentation.html, https://www.gridlastic.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/growthbook — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.growthbook.io/pricing, https://docs.growthbook.io/, https://docs.growthbook.io/quick-start, https://growthbook.io

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gtmetrix-com — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://gtmetrix.com/pricing/, https://gtmetrix.com/, https://gtmetrix.com/blog/important-changes-to-gtmetrix/, https://gtmetrix.com/api/docs/2.0/, https://gtmetrix.com/faq.html

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/gumlet — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.gumlet.com/pricing/, https://docs.gumlet.com/image/getting-started/image-getting-started/index.md, https://docs.gumlet.com, https://www.gumlet.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hacker-news-api — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://github.com/HackerNews/API

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hatchet — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://hatchet.run/pricing, https://docs.hatchet.run, https://docs.hatchet.run/v1/quickstart, https://hatchet.run

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/he-free-dns — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://dns.he.net/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/heap — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.heap.io/pricing, https://developers.heap.io/, https://www.heap.io/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/helicone — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.helicone.ai/pricing, https://docs.helicone.ai, https://www.helicone.ai

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/here — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.here.com/get-started/pricing, https://legal.here.com/us-en/terms/here-platform-terms, https://www.here.com/get-started/pricing/rps-limits-excluded-use-cases, https://www.here.com/get-started/pricing/base-plan-restrictions, https://platform.here.com/sign-up, https://www.here.com/docs, https://www.here.com

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hetzner-dns — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.hetzner.com/dns-console, https://docs.hetzner.com/dns-console/dns/general/dns-overview/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hex — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://hex.tech/pricing, https://learn.hex.tech/docs, https://learn.hex.tech/docs/getting-started/connect-your-data, https://learn.hex.tech/docs/getting-started/create-your-first-project, https://learn.hex.tech/docs/getting-started/share-your-work, https://hex.tech/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hightouch — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://hightouch.com/pricing, https://hightouch.com/docs/syncs/create-your-first-sync, https://hightouch.com/docs, https://hightouch.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/hivemq-cloud — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.hivemq.com/pricing/, https://docs.hivemq.com/hivemq-cloud/quick-start-guide.html, https://docs.hivemq.com/, https://www.hivemq.com/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/honeybadger-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.honeybadger.io/plans/, https://docs.honeybadger.io/, https://www.honeybadger.io, https://docs.honeybadger.io/lib/ruby/

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/honeycomb — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Resume: Central fetch stopped on repeated global proxy failures before reaching this entry; additional blind requests were not made.

Previously attempted official sources: https://www.honeycomb.io/pricing/, https://docs.honeycomb.io/get-started/manage-costs/how-honeycomb-calculates-usage/, https://docs.honeycomb.io/get-started/start-building/application/traces/, https://docs.honeycomb.io/send-data/opentelemetry/, https://docs.honeycomb.io, https://www.honeycomb.io

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.
