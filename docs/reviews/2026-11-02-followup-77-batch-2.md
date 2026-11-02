# Follow-up review of issue #77 — batch 2

Review date: 2026-11-02. Scope: 100 assigned service entries, from Convex through Honeycomb. Current official snapshots were compared with entry claims where readable evidence was available. HTTP status or numeric matches alone were not treated as verification.

51 reviews completed (47 unchanged confirmations and 4 corrections); 10 partially reviewed (including a fifth correction); 39 source-retrieval attempts could not reach a semantic comparison. Partial and attempted-only entries retain their prior `lastVerified`. Five content corrections update `lastUpdated`; unchanged confirmations only update `lastVerified`.

The environment proxy began returning HTTP 503 across unrelated official sites. A central sequential retry did not restore reliable access. A normal sequential browser attempt for Crowdin, Doppler and drawDB also returned that transport failure. These are environment failures, not evidence that vendors removed free plans or blocked access.

Corrections: Datadog explicitly offers a post-trial choice of paid or Free; deed.page has a 10 GB monthly transfer cap per owner; Emailvalidation.io Free has one API key; CurlShot’s conflicting paid-overage sources are now qualified; DeployHQ quotes the explicitly published annual-billing prices. These are review corrections, not assertions about vendor change dates. No removal is recommended from inaccessible evidence.

Dead Man’s Snitch was labeled “login” by the automatic collector because the shared navigation contains sign-in fields. Manual inspection found the complete public pricing table and setup instructions; the exact public text was re-added with manual-inspection provenance.

Validation: `npm run check:answers` passed (9 tests). Targeted content-depth check covers the 51 completed entries plus corrected-but-partial CurlShot. The evidence variant has two expected limitations: retained CurlShot verification date while the paid-overage conflict remains unresolved, and EverythingFonts decimal prices split by source typography as `$24 .99` / `$49 .99`. Exact source text is retained.

## services/convex — confirmed (completed)

Free/Starter separation, monthly compute/call quotas, standing storage caps, developer/deployment limits and paid region multiplier remain consistent.

Source: https://docs.convex.dev/production/state/limits

> share the same S16 provisioned performance tier. Free has hard
> resource caps, while Starter can exceed its included resource amounts with
> usage-based pricing.
> Unless otherwise noted, pricing quoted on this page is for US regions. Pricing
> in other regions is 1.3x.
> Team ​
> Free/Starter Professional Business Enterprise Developers 1-6 1-20 1-50 Unlimited Deployment

Source: https://www.convex.dev/pricing

> 20 GB-hours included ($0.33 per additional GB-hour) 20 GB-hours included $0.33 per additional GB-hour
> 250 GB-hours included ($0.30 per additional GB-hour) 250 GB-hours included $0.30 per additional GB-hour
> Storage
> Storage
> Database storage (per GB) Database storage
> per GB
> 0.5 GB included ($0.22 per additional G

## services/cookiefirst — confirmed (completed)

Free banner remains one script, one language and one-time scan, with the shared 250,000-view soft cap. Trial card promise is correctly distinguished from ongoing Free signup.

Source: https://cookiefirst.com/

> Our plans have a ‘soft limit’ of 250.000 page views per domain per month (including an additional overuse of 25% on two consecutive months) – If you have lots of domains and / or traffic, please contact us about a custom offer.
> 1 Third party script
> Only cookie banner
> One time cookie scan
> One language
> Support response <96 hrs*
> External collaborators

Source: https://cookiefirst.com/

> € 0.00
> Per Month
> Upgrade any time
> Our plans have a ‘soft limit’ of 250.000 page views per domain per month (including an additional overuse of 25% on two consecutive months) – If you have lots of domains and / or traffic, please contact us about a custom offer.
> 1 Third party script
> Only cookie banner
> One

## services/cosmic — confirmed (completed)

Current Free bucket, object, request, media and AI allowances match. Object hard stop is distinguished from unclear Free metered-usage billing.

Source: https://www.cosmicjs.com/pricing

> r plan, no card required Yearly billing saves 10% Objects stop at the limit. API and media are metered
> Free
> $0 /month
> Free forever
> Start building and ship a real project.
> Start free
> Includes
> 2 team members
> 1 Bucket
> 1,000 Objects
> 300k in / 300k out AI tokens
> 1 agent, 1 workflow
> Builder
> $99 /month
> $1,069/year, saving 10%
> For small teams and growing projects.
> Choose Builder
> E

Source: https://www.cosmicjs.com/pricing

> 10k / mo
> 15k / mo then $0.23 per 10k
> 25k / mo then $0.23 per 10k
> 150k / mo then $0.23 per 10k
> Custom
> API requests, cached
> 100k / mo
> 150k / mo then $0.023 per 10k
> 250k / mo then $0.023 per 10k
> 1M / mo then $0.023 per 10k
> Custom
> API bandwidth
> 1GB / mo
> 10GB / mo then $0.36 per GB
> 100GB / mo then $0.36 per

## services/couchbase-capella — confirmed (completed)

Current one-cluster prototype offer, 72-hour inactivity shutdown, 30-day deletion, and destructive paid-upgrade migration warning match.

Source: https://docs.couchbase.com/cloud/get-started/create-account.html

> organization and it automatically turns off after 72 hours of inactivity.
> For more information, see Turn Operational Cluster On and Off .
> Create and deploy your first operational cluster:
> Click Create Cluster .
> Select My First Project as the project for your cluster.
> Under Cluster Option , select Free .
> In the Name field, enter a name for your cluster or a

Source: https://docs.couchbase.com/cloud/get-started/create-account.html

> your free tier operational cluster for more than 30 days, Couchbase deletes the operational cluster and any linked App Services.
> Couchbase sends periodic emails after 72 hours of inactivity warning you that your free tier cluster is turned off and will delete after 30 days.
> To recreate your free tier operational cluster, see create and deploy your free t

Source: https://www.couchbase.com/pricing/

> Try Free
> Pricing
> Flexible payment options include credit card, cloud
> marketplace, and prepaid plans.
> Plans & Pricing
> CAPELLA CAPELLA
> SERVER
> MOBILE
> CAPELLA SERVER MOBILE
> A faster, better DBaaS for transactions, search, and edge applications
> Buy now: Couchbase or AWS , GCP , Azure .
> Free
> Use Capella for free

## services/coupler — unresolved (partial)

Free 100-row manual runs, one account/source/destination and seven-day trial match, but an existing Claude connector known-issue claim lacks current supporting documentation.

Source: https://www.coupler.io/pricing

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

## services/courier — confirmed (completed)

Developer 10,000 sends and seven-day logs match. Billing docs confirm adding a card moves the workspace to Business and charges every send; provider costs stay separate.

Source: https://www.courier.com/docs/workspaces/billing.md

> Adding a credit card to a Developer workspace moves it to Business. [Courier pricing](https://www.courier.com/pricing) has the current plans.
> ### How sends are counted
> One send is one template sent to one recipient. **A multi-channel template counts as one send**, even when it delivers separate messages over email, SMS

Source: https://www.courier.com/docs/workspaces/billing.md

> | Developer | Free, and includes 10,000 sends a month |
> | Business | \$0.005 for every send, with a credit card on file |
> | Enterprise | Custom volume pricing below \$0.005 per send |
> Adding a credit card to a Developer workspace moves it to Business. [Courier pricing](https://www.courier.com/pricing) has the current plans.
> ### How sends are c

## services/crowdin — unresolved (partial)

Word accounting and ten-day suspension grace verified; dynamic Free plan comparison was absent from the initial pricing snapshot.

Source: https://support.crowdin.com/changing-subscription-plan

> an email from us asking to upgrade. You then have 10 more days to upgrade the subscription. Otherwise, your project will be suspended for translators. You can still access your account and project settings, and all data will remain as is until the subscription is updated.
> We recommend upgrading the subscription plan beforehand if you expect to have more hosted

Remaining: Verify rendered Free table: 60,000 words, one private project, integration, collaborator restrictions and translation-memory donation. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/cube — confirmed (completed)

Five workbooks, 1,000 daily requests, no dedicated Free compute and $40/$80 paid tiers match; undocumented signup/enforcement stays qualified.

Source: https://cube.dev/pricing

> Workbooks
> Up to 5
> Unlimited
> Unlimited
> Unlimited
> Premium LLMs
> —
> dbt integration
> —
> —
> Embedded Analytics Chat
> —
> —
> Embedded Dashboards
> —
> —
> Compute
> Request limit daily
> 1,000
> 10K - Shared, 50K Dedicated
> Unlimited
> Unlimited
> Dedicated deployment
> —
> $0.60 / hour
> $1.20 / hour
> Custom
> Multi-cluster deployment
> —
> —
> $1.20 / hour /

Source: https://cube.dev/pricing

> 1,000
> 10K - Shared, 50K Dedicated
> Unlimited
> Unlimited
> Dedicated deployment
> —
> $0.60 / hour
> $1.20 / hour
> Custom
> Multi-cluster deployment
> —
> —
> $1.20 / hour / cluster
> Custom
> Additional API instances
> —
> $0.15 / hour / instance
> $0.30 / hour / instance
> Custom
> Cube Store caching (small)
> —
> $0.15 / hour / worker
> $0.

## services/curlshot — corrected (partial)

Corrected categorical paid-overage wording: pricing says no overage, usage guide describes optional paid overage. Free 100 screenshots and hard stop remain supported.

Source: https://curlshot.com/pricing

> No overage charges At the limit, requests stop with a clear error. The bill is the plan price, never more.
> Up now, down at renewal An upgrade applies at once and you pay the difference for the time left. A downgrade waits for the next renewal.
> Cancel in two clicks The plan runs to the end of the period you paid for.

Source: https://curlshot.com/docs/usage-and-limits

> # Optional overage
> Paid plans can keep rendering after the quota and the bonus screenshots run out. Overage is off until you turn it on, on the billing page of your dashboard:
> You set a monthly cap in dollars. Overage stops when it reaches the cap, so the most you can spend in a period is the cap.
> Overage is paid fro

Remaining: Vendor pricing and usage documentation disagree on paid-plan overage. Confirm paid dashboard terms; lastVerified retained.

Validation note: Evidence checker flags retained lastVerified (2026-10-26) as older than current fetch; retained deliberately because paid-overage source conflict is unresolved.

## services/currencyscoop — confirmed (completed)

CurrencyBeacon sandbox remains 5,000 calls/month, hourly updates and no card; REST/MCP share quotas. Exact Free quota handling remains appropriately qualified.

Source: https://currencybeacon.com

> 5,000
> Hourly updates
> REST and MCP calls share this quota.
> Start free
> Latest, historical, and conversion rates
> Community support
> Production starter
> Basic
> Small apps
> Low-volume production apps, internal tools, and early products.
> $10
> / month
> Save $20 with yearly billing
> API requests / month
> 50,000
> 15 min u

Source: https://currencybeacon.com/api-documentation

> 429
> Too Many Requests
> You have exceeded your request volume limit. Please upgrade your plan or slow down your request rate.
> 500
> Internal Server Error
> Something went wrong on our end. Please contact support if this issue persists.
> Real-time and historical exchange rates for developers, finance teams, an

## services/customjs — confirmed (completed)

Current daily request cap, forms/submissions, five hosted pages, 30-second execution and branding/fair-use restrictions match.

Source: https://www.customjs.space/pricing

> Start free with 600 requests per month, without depositing a credit card. If your needs grow, simply switch to a higher plan.
> Monthly Annual Save 25%
> Free
> 20 Requests/day
> Each JS Execution or PDF Rendering counts as 1 request
> ⚡ Execution Pool
> 20 Requests / day
> JS Executions
> PDF Generation incl. a small watermark
> Reque

Source: https://www.customjs.space/pricing

> 5 Hosted Pages
> Unlimited Bandwidth*
> With CustomJS Logo
> 🌐 Custom Domains
> — 1 Custom Domain
> 💬 Support
> Email Support
> — JavaScript Coding Support
> — Zoom Meeting Support
> No credit card required
> $9 / month
> Pro
> 100 Requests/day
> Each JS Execution or PDF Rendering counts as 1 request
> ⚡ Execution Pool
> 100 Requests /

## services/daily — confirmed (completed)

10,000 participant minutes, video/audio unit rates, separate recording costs and absence of a hard call cap match the current pricing/FAQ.

Source: https://www.daily.co/pricing/video-sdk/

> 10,000 free minutes every month. Flexible, usage-based pricing.
> Estimate your cost
> Looking for Pipecat Cloud Pricing?
> Pricing Video and Audio Calls Recording and Streaming Telephony Transcription and AI
> Pipecat Cloud Support packages Add-ons Discounts FAQs
> [Pricing]
> Scaled to meet your needs
> From startups

Source: https://www.daily.co/pricing/video-sdk/

> free participant minutes for the month, there is no hard cap that stops your calls. You keep the same per-minute rate and can track your usage in the dashboard . If you build AI voice or video agents on Pipecat Cloud , you can set a spend limit under Settings → Billing → Spend limit. Want help keeping costs in check? Talk to us .
> Is recording billed per part

## services/datadog — corrected (completed)

Corrected post-trial notes: FAQ explicitly offers choosing paid or Free after trial; default transition and sixth-host enforcement remain unpublished.

Source: https://www.datadoghq.com/pricing/

> tructure monitoring is included in the Free tier? When your free trial ends, you can choose to upgrade to a paid plan or move to the Free tier. On the Free tier, you get up to five Basic hosts with 1-day metric retention, at no cost. To monitor more hosts or retain data longer, upgrade to a paid plan at any time. Can I mix and match infrastructure coverage? You can choose

Source: https://www.datadoghq.com/free-datadog-trial/

> No credit card required. By signing up, you agree to the Subscription Agreement and Privacy Policy .
> Get Started Free
> Explore your stack with a free Datadog trial
> Try Datadog for 14 days and learn how seamlessly uniting metrics, traces, and logs in one platform improves agility, increases efficiency, and provides

## services/datalore — confirmed (completed)

Cloud Free 120 CPU-S hours, 10 GB storage, notebook/share limits and paid-trial distinctions match the accessible official plan documentation.

Source: https://www.jetbrains.com/help/datalore/datalore-plans.html

> 120 CPU S machine hours
> 10 GB of cloud storage
> 750 CPU L machine hours per team member
> 6 Datalore credits per team member for computations on advanced CPUs and GPUs
> 20 GB of cloud storage plus other cloud storage support
> Access to all powerful CPUs and GPUs
> Background computations
> Audience
> Individual u

Source: https://www.jetbrains.com/help/datalore/datalore-plans.html

> 10 GB of cloud storage
> 750 CPU L machine hours per team member
> 6 Datalore credits per team member for computations on advanced CPUs and GPUs
> 20 GB of cloud storage plus other cloud storage support
> Access to all powerful CPUs and GPUs
> Background computations
> Audience
> Individual users, beginner data specia

## services/datocms — confirmed (completed)

Free editors, records, API/media/storage/locales/model limits and hard no-overage policy match the complete pricing table.

Source: https://www.datocms.com/pricing

> Free plan comes with 2 editors and 300 records, with 10GB of traffic and 100k API calls each month. No overages allowed. See all limits in detail
> Sign up for free
> Easy setup, no credit card required
> Free vs Professional
> ⚠️ In the Free plan, you can't go over the allowed monthly limits.
> If you reach these limits, the se

Source: https://www.datocms.com/pricing

> 25k/mo
> 100k/mo €9/mo every 100k extra CMA API calls
> Video streaming
> Indicates the total amount of HLS Adaptive Bitrate (ABR) video streaming time that can be transmitted to your audience each month.
> 120 mins/mo
> 50k mins/mo €9/mo every 12k mins of extra video streaming time
> Support
> The level of priority yo

## services/db-designer — confirmed (completed)

Free two-model/ten-table allowance, paid tiers and approved educational/open-source unlimited grants remain consistent.

Source: https://www.dbdesigner.net/pricing

> 2 Database Models
> 10 Tables Per Model
> Start Free Trial
> Start Designing
> Basic
> $ 9 / Month
> 5 Database Models
> 25 Tables Per Model
> Start Free Trial
> Start Designing
> Unlimited
> $ 17 / Month
> Unlimited Models
> Unlimited tables
> Start Free Trial
> Start Designing
> Academic
> Free
> Unlimited Models
> Unlimited Tables
> Current Students &

## services/deadmanssnitch — confirmed (completed)

Public plan page confirms one Lone Snitch and paid three/100/300-monitor tiers. Collector login flag is a false positive from the shared sign-in navigation; actual plan content is readable.

Source: https://deadmanssnitch.com/plans

> No Frills Free Plan
> tiny
> The Lone Snitch
> 1 single solitary Snitch
> Get Started
> Blog
> FAQ
> Docs
> API
> Status
> Downloads
> Support
> Terms
> Privacy
> Cron Job Monitoring
> Monitor Heroku Scheduler
> @DeadMansSnitch
> @DeadMansSnitch
> ©2012–2026
> Dead Man's Snitch .
> All Rights Reserved.

## services/deed-page — corrected (completed)

Added the current 10 GB monthly transfer cap per owner, CDN-cache exclusion, 80% warning and limit-page behavior; existing site/publish/body limits match.

Source: https://deed.page/pricing

> Every plan has a monthly fair-use transfer cap (Free 10 GB, Hobby 100 GB, Pro 500 GB), counted per owner on bytes our servers send; files served from the CDN cache do not count. Over the cap, that owner’s sites show a limit page until the next month or an upgrade. At 80% the agent gets a warning with an upgrade link.
> How to upgrade
> Plans attach

## services/deepnote — confirmed (completed)

Current three-editor/five-project Free limits, machine/storage/AI quotas, inactivity policy and Team trial terms match.

Source: https://deepnote.com/pricing

> Up to 5 projects
> Limited Deepnote AI
> Unlimited Basic machines with 5 GB RAM, 2 vCPU
> 7 day revision history
> Team
> For data teams needing a powerful platform for seamless collaboration.
> $39 -20%
> per editor/month billed yearly
> Try 14 days for free Everything in Free plus…
> Unlimited viewers & notebooks
> GPT-5.6 Sol and S

Source: https://deepnote.com/pricing

> 15 minutes
> Team
> 24 hours
> Enterprise
> 24 hours
> Free compute ($112/month worth)
> Free
> Basic
> Team
> Plus
> Enterprise
> Plus
> Pay-as-you-go machines
> Free
> Team
> Enterprise
> Performance (64 GB RAM, 16 vCPU)
> Free
> Team
> Enterprise
> High memory (128 GB RAM, 16 vCPU)
> Free
> Team
> Enterprise
> GPU (60 GB RAM, 12 GB K80 GPU)
> Free
> Team
> En

## services/deployhq — corrected (completed)

Free allowances and no-card trial match. Paid pricing now quotes only the explicitly displayed €9 Solo/€19 Pro monthly amounts billed annually; removed inferred month-to-month figures based on annual savings.

Source: https://www.deployhq.com/pricing

> 3 deployments per day
> 1 project
> A project in DeployHQ includes several elements, but primarily, a connected repository to retrieve code from, and one or more servers to deploy your code to.
> 5 servers
> 1 concurrent deployment
> 30 build minutes
> 1 user
> Auto-deploy on push
> Support
> Build cache
> Environment variables
> Undeployed-

Source: https://www.deployhq.com/pricing

> 30 build minutes
> 1 user
> Auto-deploy on push
> Support
> Build cache
> Environment variables
> Undeployed-changes alerts
> Zero downtime deployments
> Scheduled deployments
> Deployment availability rules
> Audit Log
> A tamper-evident record of security-relevant account actions — API keys, IP allowlist, team and SSO changes — for co

## services/deployment-io — confirmed (completed)

Self-managed Free offer and in-app limits remain distinct from custom managed pricing; own cloud/model infrastructure costs are correctly qualified.

Source: https://deployment.io/pricing

> t want to operate the delivery system themselves. A free tier is available; current paid plans and limits are in the app. Managed delivery is priced by engagement, not by job.
> hello@deployment.io
> What we build
> Overview
> Build
> Modernize
> Remediate
> Case studies
> Delivery
> How we work
> Getting started
> Pricing
> Contact
> Platform
> Platform overview
> Security architecture
> Role based acc

## services/descope — confirmed (completed)

7,500 MAU, tenant/SSO/M2M quotas match; current FAQ still describes upgrade grace followed by possible loss of access, with no Free overages.

Source: https://www.descope.com/pricing

> No overages. Upgrade required to exceed limits.
> What’s included:
> 7,500 Monthly active users (MAUs)
> 10 Monthly active tenants
> 3 SSO connections
> 1 Federated app (OIDC)
> 5 Test users
> 10,000 M2M exchanges
> 2,000 Monthly active consents (MACs)
> 2,000 Monthly active tokens (MATKs)
> Core features:
> All auth methods
> Role-b

Source: https://www.descope.com/pricing

> a warning email informing you of the same with a grace period to upgrade to the Pro tier. Once the grace period has passed, your app may then lose access to Descope.
> Here are a couple of examples:
> If your app has 5 tenants and 8000 MAUs, you will need to move to the Pro tier because your app has over 7500 MAUs.
> If your app has 60 tenants and 500 MAUs, you wil

## services/digitalocean-app-platform — confirmed (completed)

Three free static apps, 1 GiB transfer each, additional-app fee and excess transfer pricing match.

Source: https://www.digitalocean.com/pricing/app-platform

> 3 apps with static sites
> 1GiB data transfer allowance per app with static sites
> Deployment from GitHub and Gitlab
> Automatic HTTPS
> Bring your custom domain
> Global CDN
> DDoS mitigation
> Unlimited team members
> Get started
> Paid Tier
> Starting at
> $5 /month
> Includes all Free Tier features plus:
> Deployment fro

Source: https://www.digitalocean.com/pricing/app-platform

> $0.02
> Development Database
> 1 (512 MiB)
> $7.00
> See your price in real time
> Go to pricing calculator
> App Platform specific questions
> What is the recommendation for using shared vs. dedicated instances? Shared container instances are typically recommended for applications such as low traffic websites, blogs,

## services/digitalocean-container-registry — confirmed (completed)

Starter 500 MiB/single-repository quota matches. Existing entry appropriately preserves the docs discrepancy about deletion-related prorated storage.

Source: https://www.digitalocean.com/pricing/container-registry

> Storage 500 MiB
> Storage overage N/A
> Get started
> Basic
> $5 /month
> Repositories 5
> Storage 5 GiB
> Storage overage $0.02/GiB
> Get started
> Professional
> $20 /month
> Repositories Unlimited
> Storage 100 GiB
> Storage overage $0.02/GiB
> Get started
> Frequently asked questions
> What forms of payment do you accept? We accept Visa,

Source: https://docs.digitalocean.com/products/container-registry/details/pricing/

> rtain amount of storage per month. This amount is prorated based on how many days the registry is active during the month. If your registry has been active for fewer than the standard 28 days in a month, it receives a proportional fraction of its plan&rsquo;s storage allowance.
> For example, a Starter registry receives 500 MiB of allowance per full month.

## services/digitalocean-functions — confirmed (completed)

90,000 GiB-seconds monthly pool, 100 ms minimum, no invocation fee and $0.0000185 excess compute price remain consistent.

Source: https://www.digitalocean.com/pricing/functions

> 90,000
> GiB-seconds of compute free per month per account
> $0.0000185
> per GiB-seconds for additional memory and runtime
> 100 ms
> minimum runtime per function invocation
> Sign up now
> Pricing examples for billing using GiB-seconds
> Use this formula to calculate GiB-seconds of your Functions usage: GiB-seconds = N

Source: https://www.digitalocean.com/pricing/functions

> $0.0000185
> per GiB-seconds for additional memory and runtime
> 100 ms
> minimum runtime per function invocation
> Sign up now
> Pricing examples for billing using GiB-seconds
> Use this formula to calculate GiB-seconds of your Functions usage: GiB-seconds = Number of Function invocations * RAM Memory in GiB * Function

## services/directus-cloud — unresolved (partial)

Hosted 14-day trial, Cloud prices and Core seat/collection limits match. The static pricing snapshot exposes the Cloud tab but does not explicitly establish the existing $0 Core self-hosted license claim.

Source: https://directus.io/pricing

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

Source: https://directus.io/pricing

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

## services/docssearch — confirmed (completed)

Official plan terms confirm application/index, record/search/crawl/byte quotas and seven-day onboarding/30-day inactivity conditions; no-card signup remains supported.

Source: https://www.algolia.com/policies/docsearch-plan-specific-terms

> access to the Algolia DocSearch Plan to use up to 5,000,000 Records, 50,000,000 Search Requests per month and 5,000,000 resources crawled per month (&ldquo;Usage Limit&rdquo;) free of charge in accordance with the Documentation and the DocSearch Documentation, available at https://docsearch.algolia.com/docs/what-is-docsearch/ (the &ldquo;DocSearch Documenta

Source: https://www.algolia.com/policies/docsearch-plan-specific-terms

> If your account remains inactive for more than 30 days, Algolia may remove your Subscriber Data.
> Additional Features
> An Algolia DocSearch Plan includes automatic enrollment in Algolia DocSearchMCP, an AI-native retrieval infrastructure that enables AI coding assistants and developer tools within integrated development environments to access fresh,

## services/doppler — unresolved (partial)

Core Free developer/project limits match, but the static pricing FAQ exposes the no-card question without its answer.

Source: https://www.doppler.com/pricing

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

Source: https://drawdb.app/pricing

> Is drawDB free? Yes. drawDB is free and open source — the full editor runs in your browser with no account required. Pro adds cloud storage, teams, and real-time collaboration on top.
> Where are my diagrams saved? In the free editor, diagrams are stored locally in your browser (IndexedDB), so back them up before clearing your browser. With drawDB Pro

Remaining: Recheck the unlimited local diagram allowance and complete plan feature matrix from rendered pricing. Follow-up source retrieval was blocked by the environment-wide proxy HTTP 503 failure.

## services/duo — confirmed (completed)

Free ten-user MFA offer, paid unit pricing, license blocks and 30-day trial transition match official pricing/FAQ.

Source: https://duo.com/editions-and-pricing

> Add up to 10 users
> Strong MFA
> Seamless integrations
> Free authenticator app
> Explore Duo Free
> Duo Essentials
> Best for simple security management and seamless authentication.
> $3 per user/month
> Everything in Free, plus:
> Duo Directory
> Phishing-resistant MFA
> Complete passwordless authentication
> Single sign-on
> Trusted Endpo

Source: https://duo.com/editions-and-pricing

> 30-day free trial
> Activate in minutes
> Modify your plan at any time
> Pay with credit card
> Start your free trial
> Ready to buy now?
> Duo Free
> Best for small businesses with 10 or fewer users.
> $0 per user/month
> Add up to 10 users
> Strong MFA
> Seamless integrations
> Free authenticator app
> Explore Duo Free
> Duo E

## services/dynamodb — confirmed (completed)

Provisioned storage/read/write grants and streams/transfer allowances match; new AWS free-account lifecycle and signup exceptions remain accurately qualified.

Source: https://aws.amazon.com/dynamodb/pricing/

> 25 GB of data storage
> 2.5 million stream read requests from DynamoDB Streams
> 1 GB of data transfer out (15 GB for your first 12 months), aggregated across AWS services
> In addition to the DynamoDB free tier, you can get up to $200 USD in credits with the AWS Free Tier to experience the full set of DynamoD

Source: https://aws.amazon.com/free/

> can earn up to $100 more. That's up to $200 over 6 months to build, break things, and experiment with no charges and no surprise bills on the Free plan. The account closes on its own 6 months after you open it or when your credits run out, whichever comes first. You won’t be charged unless you convert to a Paid plan.
> Play
> Compare the plans
> Choose the plan

## services/dynv6 — confirmed (completed)

Free DNS/DDNS positioning, own-domain support and API limitations match; no-SLA and critical-use/DDoS warnings remain explicit.

Source: https://dynv6.com/

> Free dynamic DNS for IPv6
> APIs
> Changelog
> My Zones
> My Domains
> Sign up
> Sign in
> Free Dynamic DNS
> Get public hostnames for your dynamic IPv4 and IPv6 addresses within seconds.
> Reach your private hosts
> No need to set up NAT and port forwarding any more.
> With dynv6 you can easily assign public hostnames to yo

Source: https://dynv6.com/

> Don't use it for critical services.
> dynv6 is a free service by
> Digineo GmbH
> &bull;
> Data Privacy
> &bull;
> Data Privacy settings
> &bull;
> Abuse Contact
> &bull;
> Terms of Service

## services/e2b — confirmed (completed)

Current $100 one-time Hobby credit, one-hour sandbox, concurrency/resource limits and paid-use distinctions match official pricing/billing.

Source: https://e2b.dev/pricing

> /$100 in credits (+usage costs)
> See our cost calculator
> $100 one-time usage credit
> Sessions up to 1 hour
> 20 concurrent sandboxes 20 concurrent sandboxes The maximum number of sandboxes that can run at the same time.
> Default sandbox CPU and RAM
> Start for Free (✓) No credit card required
> pro $150
> /month (+

Source: https://e2b.dev/docs/billing

> for what you use. New users receive $100 in free credits to get started.
> Manage billing in console
> ​
> Plans
> Feature
> Hobby
> Pro
> Enterprise
> Base price
> $0/month
> $150/month
> Custom
> Free credits
> $100 (one-time)
> No additional credits
> Custom
> Max vCPUs
> 8
> 8+
> Custom
> Max memory
> 8 GiB
> 8+ GiB
> Custom
> Disk size
> 10 GiB
> 20+ GiB
> Custom
> Max continuous runtime
> 1 hour
> 24 hours

## services/emailjs — confirmed (completed)

Free 200 monthly requests, two templates and ancillary limits match; documentation supports dropped requests at exhaustion and notification thresholds.

Source: https://www.emailjs.com/pricing/

> 200 monthly requests
> 2 email templates
> Requests up to 50Kb
> Limited contacts history
> Sign Up Free
> Personal
> For Personal Use
> $
> 9
> /mo
> 2,000 monthly requests
> 6 email templates
> Whitelist
> Unlimited contacts
> Attachments up to 500kb
> Completely white label
> Sign Up Free
> Professional
> Entrepreneurs & Freelancers
> $

Source: https://www.emailjs.com/pricing/

> requests will be safely dropped by our servers.
> We will send you multiple email notifications when your account reaches 80%, 95% and 100% of
> your quota so you have plenty of time to upgrade. If you anticipate a sudden spike in volume,
> we recommend upgrading to a higher tier in advance.
> Can I manage my EmailJS account with multipl

## services/emaillabs — confirmed (completed)

Startup 9,000/month and 300/day, log/shared-IP restrictions, quota notices and no-overage behavior match current official pricing.

Source: https://emaillabs.io/en/pricing

> Up to 9 000 emails per month
> 300 emails per day
> 0
> EUR /month
> Email RESTful API, SMTP Relay
> Email templates
> Detailed documentation
> Basic email analytics
> 1 day of log retention
> Email address validation - internal list of non-existent ones
> Sendings adjusted to local provider requirements
> Shared IP adress
> register

Source: https://emaillabs.io/en/pricing

> 300 emails per day
> 0
> EUR /month
> Email RESTful API, SMTP Relay
> Email templates
> Detailed documentation
> Basic email analytics
> 1 day of log retention
> Email address validation - internal list of non-existent ones
> Sendings adjusted to local provider requirements
> Shared IP adress
> register
> contact us
> Essential

## services/emailoctopus — confirmed (completed)

Starter 2,500 contacts/10,000 emails and form/user/report limits match. Free-specific help supports paused campaigns above the subscriber limit without automatic Free billing.

Source: https://emailoctopus.com/pricing

> 2,500 subscribers
> 10,000 emails per month
> EmailOctopus branding on emails
> Reports available for 30 days
> Create 1 landing page and 1 form
> Access for 1 user
> GET STARTED FOR FREE
> PRO
> $ USD
> $9
> PER MONTH, BILLED YEARLY
> Save $12
> Subscribers
> Emails per month 10,000
> Full control over your email design
> Reports av

Source: https://help.emailoctopus.com/article/319-can-i-take-a-break-from-the-pro-plan

> access to them. The free plan allows you to store 2,500 contacts, and you won't be able to send any campaigns if the number of your contacts exceeds this limit, but the contacts themselves will remain on your lists.
> We delete free accounts after one year of complete inactivity. To make sure you don't lose any data, log in to your account at least once a

## services/emailvalidation-io — corrected (completed)

Corrected Free allowance from unlimited API keys to one key throughout current summary/body. Monthly credits, minute/concurrency caps and 429 exhaustion match.

Source: https://emailvalidation.io/pricing

> Free: $0/month, 100 credits, 10 requests per minute, 1 API key, no credit card.
> Small: $9.99/month, 5,000 credits, no per-minute limit, 1 API key, catch-all detection, audit trail.
> Medium: $34.99/month, 25,000 credits, no per-minute limit, 2 API keys, team management, sandbox API keys.
> Large: $94.99/month, 100,00

Source: https://emailvalidation.io/docs/status-codes/

> t the same time is answered with 429 and the code concurrency_limit_exceeded ; send it again after the seconds in Retry-After .
> Name 500 Type Description A 500 status code indicates an internal server error - let us know: support@emailvalidation.io
> Error response body
> Error responses are JSON. Every error contains a human-readable message ; the other fields depend on the st

## services/emqx-serverless — confirmed (completed)

Free session/traffic/rule grants, paid unit rates and inactivity policy match; creation docs explicitly set the default spend limit to zero.

Source: https://docs.emqx.com/en/cloud/latest/create/serverless.html

> The default spend limit is set to 0 , meaning only the free quota will be used.
> If set greater than 0 , usage beyond the free quota may incur charges. In this case: The View Payment Method button appears in the Summary section.
> Two options are available to define the behavior when the spend limit is reached: Suspend the deployment

Source: https://docs.emqx.com/en/cloud/latest/price/pricing.html

> 1 million session minutes / month
> $2.00 per million session minutes
> Traffic fee
> 1 GB / month
> $0.15 per GB
> Data integration
> 1 million rule action executions / month
> $0.25 per million rule action executions
> Billing Method ​
> The billing method is calculated according to the following formulas:
> Session fee :
> Ses

## services/encore — confirmed (completed)

Starter developer/trace/runtime fair-use limits remain consistent; official pricing confirms no-card 14-day Pro trial and Free Starter.

Source: https://encore.dev/pricing

> Yes. You can try the Pro plan free for 14 days, no credit card required. The Starter plan is also free forever for local development and small projects.
> Start your free trial
> Are there limits on the free Starter plan?
> Starter is free forever, with no time limit. Compared with Pro:
> Dev environments on Encore Cloud: 2 (Pro: unlimited)
> Tracing: 1M events / month (Pro: 20M

Source: https://encore.dev/docs/platform/management/usage

> 100,000 / day
> Database Storage
> 1 GB
> PubSub Messages
> 100,000 / day
> Cron Jobs
> Once every hour
> Object Storage
> 1 GB
> What happens if I reach a usage limit?
> If your application reaches a usage limit, we will not automatically stop it. Our team will reach out to you, and work with you to find a solution that does

## services/entra-id-azure-ad — confirmed (completed)

Free directory and signup/resource limits match; 50k/default versus verified-domain and pricing maximum limits are correctly distinguished.

Source: https://learn.microsoft.com/en-us/entra/identity/users/directory-service-limits-restrictions

> s automatically restored to the standard default: 50,000 objects for tenants without a verified domain, or 300,000 objects for tenants with a verified domain. Adding a verified domain during the initial two-day period doesn't immediately increase the quota; it determines the quota level that applies after the period ends. Existing tenants aren't affected

Source: https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing

> $7.00
> user/month, paid yearly
> (Annual subscription—auto renews)
> Try for free Buy now
> See terms 2
> Secure access for any identity with a market-leading cloud identity and access management solution.
> (Annual subscription—auto renews)
> Try for free Buy now
> See terms 2
> This product is not available in your

## services/event-grid — confirmed (completed)

Basic and Standard free operation/message grants remain separate; billing units and paid throughput-unit caveat match current official sources.

Source: https://azure.microsoft.com/en-us/pricing/details/event-grid/

> 100,000 operations
> Azure pricing and purchasing options
> Connect with us directly
> Get a walkthrough of Azure pricing. Understand pricing for your cloud solution, learn about cost optimization and request a custom proposal.
> Talk to a sales specialist
> See ways to purchase
> Purchase Azure services through the A

Source: https://azure.microsoft.com/en-us/pricing/details/event-grid/

> Free usage per month - MQTT operations
> 1,000,000 operations
> Price per million event operations
> $-
> Free usage per month – event operations
> 1,000,000 operations
> * Each operation is charged per 64 KB unit of data.
> Event Grid Basic Tier
> Event Grid Basic tier is priced as pay-per-use based on operations performed. Operations include publishe

## services/eventbrite — confirmed (completed)

Unlimited free-event publishing and paid-ticket 3.7%+$1.79 plus 2.9%/order fees match; supported pricing markets are explicitly listed.

Source: https://www.eventbrite.com/organizer/pricing/

> 2.9% payment processing fee per order
> Secure payment handling for every purchase.
> Hosting a large event?
> Grow your events with our expert team by your side
> Contact Sales
> With Eventbrite, you can:
> Unlock winning strategies with a Strategic Advisor
> Expand your reach with exclusive Eventbrite-sponsored mar

Source: https://www.eventbrite.com/organizer/pricing/

> Our pricing plans are available in the United States, Canada, Australia, New Zealand, the United Kingdom and Ireland.
> Pro plan
> Our Pro plan is built to help you reach more people, faster.
> Sales partnership
> Custom solutions for complex or high-volume events.
> Hear what our organizers are saying
> “ The conversion rate on Eventbrite was 20% better than other tick

## services/evernote — confirmed (completed)

Free note/notebook/space/tag/attachment/storage/device limits, retained-data downgrade behavior and paid trial terms match.

Source: https://evernote.com/compare-plans

> 50
> 1000
> Unlimited
> From 500, up to unlimited
> Unlimited
> Notebooks
> 1
> 20
> Unlimited *
> From 50, up to unlimited
> Unlimited
> Spaces
> 5
> 10
> Unlimited
> From 500, up to unlimited
> Unlimited
> Tags
> 20
> 100
> Unlimited
> Unlimited
> Unlimited
> Attachments
> 200
> 1000
> Unlimited
> 1 GB
> Unlimited
> Sync across devices
> 1 device
> 3 devices
> U

Source: https://evernote.com/compare-plans

> 1 GB
> Unlimited
> Sync across devices
> 1 device
> 3 devices
> Unlimited *
> From 4 per seat, up to unlimited
> Unlimited
> Storage
> 1GB
> 5GB
> Unlimited
> From 250 MB, up to unlimited
> Unlimited
> Apps for iOS, Android, Web, Windows, and Mac
> Core Features
> Tasks Add dates, set reminders, assign tasks to others
> Evernote Calenda

## services/eversql — confirmed (completed)

Aiven SQL Optimizer Early Availability remains free with no published end date; manual SQL/metadata use and separate historical trial are distinguished.

Source: https://aiven.io/tools/sql-query-optimizer

> Aiven SQL Query Optimizer is Free during the Early Availability period.
> A fully integrated solution to monitor and optimize your SQL queries
> Speed up your database workloads with Aiven AI Database Optimizer
> Feature
> Aiven SQL Query Optimizer
> Aiven AI Database Optimizer
> Index recommendation
> ✅
> ✅
> SQL query rewrite recommendation
> ✅
> ✅
> Seamless database integration
> ✅

Source: https://www.eversql.com/pricing/

> Start Optimizing for Free
> Now available for free on Aiven
> Trusted by more than 100,000 professionals
> What do EverSQL customers think?
> Meet EverSQL, your personal AI-powered DBA
> EverSQL is the fastest way to optimize your PostgreSQL & MySQL databases automatically.
> It's used by over 100,000 engineers as a PostgreSQL & MySQL

## services/everything-fonts — confirmed (completed)

Guest/account conversion size limits, premium API plans, output retention and 429 rate/quota behavior match.

Source: https://everythingfonts.com/ttf-to-woff2

> Up to 400 KB · 1 MB with a free account · from 10 MB on paid plans
> While we had your font
> Checking your font…
> Problems we found
> Fixable by Font Doctor
> Fix these with Font Doctor
> Do more with this tool
> Advertisement
> About TrueType Font (TTF)
> TrueType is an outline font format built around quadratic Bézier curves

Source: https://everythingfonts.com/api/convert

> Font Conversion Premium
> $24 .99
> /mo
> $249 .90
> /yr
> 2 months free
> 1,000 jobs a month
> 50MB uploads
> Batch conversion
> Fonts marked Restricted License
> Website + API
> Subscribe
> Subscribe yearly
> Font Conversion Enterprise
> $49 .99
> /mo
> $499 .90
> /yr
> 2 months free
> 3,000 jobs a month
> 200MB uploads
> Batch conversion
> Fonts marked Restricte

Validation note: Evidence checker cannot recognize decimal prices rendered as "$24 .99" and "$49 .99"; the official plan table explicitly supports both prices. Source text was not normalized.

## services/exa — confirmed (completed)

Recurring first-team $10 monthly credits, separate one-time grant, API rates and 402 exhaustion remain consistent.

Source: https://exa.ai/pricing

> $10 credits every month plus a $10 onboarding bonus. No payment method required
> Start building for free Includes:
> Free $10 credits per month
> MCP server access
> Claude Connector
> ChatGPT plugin
> 50+ integrations
> Access to all endpoints
> 10 Search Queries Per Second (QPS)
> 50 Agent concurrency
> Data
> Web index

Source: https://docs.exa.ai/reference/rate-limits

> f your team exhausts its credits, requests return 402 Payment Required . An API key that reaches its assigned budget also returns 402 . Add credits or ask a team administrator to adjust the key’s budget. See Error codes .
> ​
> Free tier credits
> Every new team starts on the Free tier with $10 in credits, available in full the day you sign up regardless of the date. Your f

## services/feathery — confirmed (completed)

Free 500 submissions/five live forms/10 MB uploads and no-card signup match; unspecified exhaustion behavior stays qualified.

Source: https://www.feathery.io/pricing

> 500
> 5
> 10MB
> Unlimited
> Unlimited
> Unlimited
> Unlimited
> Unlimited
> Custom
> Custom
> Custom
> Unlimited
> Unlimited
> Unlimited
> Unlimited
> Unlimited
> Custom
> Custom
> Custom
> Unlimited
> Features
> Partial Submissions
> Remember User Progress
> Remove Feathery Branding
> Custom SEO Metadata
> Custom HTML & CSS
> Custom Subdomain
> CAPTCHA

Source: https://www.feathery.io/pricing

> Do I need a credit card to sign up?
> No. A credit card is only required once you’ve chosen to upgrade to a paid plan.
> When will I be billed for a paid plan?
> You will be billed immediately when you upgrade to a paid plan.
> Explore all features
> Free
> $0
> Growth
> Custom Pricing
> Business
> Custom Pricing
> Usage
> Questions
> Seats
> Pages

## services/feedback-fish — confirmed (completed)

Free 25 lifetime submissions, no expiry/card and $19 unlimited paid plan match.

Source: https://feedback.fish/pricing

> 25 total feedback submissions
> Get started
> $19
> /month
> Suitable for production applications and websites of all sizes
> Unlimited feedback submissions
> Get started
> Enterprise
> Talk to us about your custom needs
> Whitelabeling
> Service-level agreements
> Live chat support
> Contact us
> Ready for your
> users to get h

Source: https://feedback.fish/pricing

> $19
> /month
> Suitable for production applications and websites of all sizes
> Unlimited feedback submissions
> Get started
> Enterprise
> Talk to us about your custom needs
> Whitelabeling
> Service-level agreements
> Live chat support
> Contact us
> Ready for your
> users to get heard?
> Get started for free
> Feedback Fish
> ©

## services/fibery — confirmed (completed)

Free ten users/guests/databases and storage/automation/integration/history allowances match; official features page confirms no-card trial.

Source: https://fibery.com/pricing

> up to 10 users
> Get started
> Includes 10 databases Unlimited entities Collaborative docs Formulas, automations, integrations
> We resisted the temptation to turn this into a typical camouflaged trial.
> AI included Standard
> for knowledgable orgs looking to connect all things work
> €12
> per user/month
> billed annually
> Obse

Source: https://fibery.com/features

> A 14-day trial is on us. No credit card required.
> Start your free trial
> Get a demo
> Rated 4.8 on G2 and Capterra
> Dig into workspaces & workflows of some companies:
> How Lemonade's tech team connects strategy to execution in Fibery
> Lemonade
> How Lemonade's tech team connects strategy to execution in Fibery
> Lemonade
> TEMPLATES MENTIONED
> OKR Tracking
> Sl

## services/firebase-auth — confirmed (completed)

Spark daily Identity Platform caps and Blaze monthly grant are correctly distinguished; phone billing and email/anonymous-account quotas match.

Source: https://firebase.google.com/docs/auth?hl=en

> Projects on the no-cost (Spark) plan have a new limit of 3,000 daily active
> users (DAUs) for most sign-in providers. Daily active usage is calculated based
> on how many unique users sign in during a 24 hour period.
> Providers
> New limit
> Old limit
> Email, Social, Anonymous, Custom
> 3,000 DAUs
> Unlimited
> SAML, OpenID Connect
> 2 DAUs
> N/A
> Pay as you go (Blaze)
> Pricing fo

Source: https://firebase.google.com/pricing

> 50K MAUs
> No-cost up to 50K MAUs
> Then
> Google Cloud pricing
> Monthly active users - SAML/OIDC
> 50 MAUs
> No-cost up to 50 MAUs
> Then
> Google Cloud pricing
> Cloud Firestore
> Standard edition
> Stored data
> 1 GiB total
> No-cost up to 1 GiB total
> Then
> Google Cloud pricing
> Network egress
> 10 GiB/month
> No-cost up to 10 Gi

## services/firebase-cloud-functions — confirmed (completed)

Blaze deployment requirement and generation-specific invocation/compute/network grants match. Existing Cloud Build allowance discrepancy is explicitly qualified.

Source: https://firebase.google.com/docs/functions/get-started?hl=en

> must be on the Blaze pricing plan . See
> Cloud Functions pricing .
> The following sections of this tutorial detail the steps required to build,
> test, and deploy the sample.
> Create a Firebase Project
> New to Firebase or Cloud
> Follow these steps if you're new to Firebase or Google Cloud .
> You can also follow these ste

Source: https://cloud.google.com/build/pricing

> Each billing account comes with 2,500 free build-minutes per month. 1
> Build-minutes are not incurred for the time that a build is queued. Charges are accrued to the billing account associated with the Google Cloud console project that initiated the build.
> Machine type
> Virtual CPUs
> Memory (GB)
> Quick Start
> Price (USD) per minute
> e2-stand

Source: https://cloud.google.com/run/pricing

> CPU - First 180,000 vCPU-seconds free per month
> RAM - First 360,000 GiB-seconds free per month
> Requests - 2 million requests free per month
> Iowa (us-central1)
> Johannesburg (africa-south1)
> Taiwan (asia-east1)
> Hong Kong (asia-east2)
> Tokyo (asia-northeast1)
> Osaka (asia-northeast2)
> Seoul (asia-northeast3)
> Mumbai (asia-sou

## services/firebase-cloud-messaging — confirmed (completed)

FCM remains no-cost on both plans; official throttling docs confirm 600k per-project/minute quota, 429 refill and client-error accounting.

Source: https://firebase.google.com/docs/cloud-messaging/throttling-and-quotas?hl=en

> messaging. The default quota of 600k messages per minute covers over 99% of
> FCM developers while protecting the stability of the system and
> minimizing the impact of spiky projects.
> Spiky traffic patterns can
> result in quota exceeded errors. In an over quota scenario, the system serves
> HTTP status code 429 RESOURCE_EXHAUSTED ("QUOTA_EX

Source: https://firebase.google.com/docs/cloud-messaging/throttling-and-quotas?hl=en

> Client errors (HTTP status code 400-499) are counted (excluding 429s).
> Quotas are per-minute, but these minutes are not aligned to the clock.
> Monitoring quota
> You can view quota, usage, and errors in the Google Cloud console:
> Go to the Google Cloud console .
> Select APIs & Services .
> From the table list, select Firebase Cloud Messaging AP

## services/firebase-crashlytics — confirmed (completed)

Crashlytics remains no-cost on Spark/Blaze, with no pricing usage grant; app SDK scope and separately billed integrations remain qualified.

Source: https://firebase.google.com/pricing

> A/B Testing, Analytics, App Check, App Distribution, Cloud Messaging (FCM), Crashlytics, In-App Messaging, and Performance Monitoring.
> check
> Generous no-cost usage limits
> check
> No payment method needed
> No-cost
> (Spark plan)
> App Hosting
> keyboard_arrow_down
> keyboard_arrow_up
> Outgoing bandwidth
> Uncached
> Cached
> Not applicable
> Storage
> Not applicable
> Google Cloud Products
> Cloud Run
> Not appli

Source: https://firebase.google.com/docs/crashlytics?hl=en

> Firebase Crashlytics is a lightweight, realtime crash reporter that helps
> you track, prioritize, and fix stability issues that erode your app quality.
> Crashlytics saves you troubleshooting time by intelligently grouping crashes
> and highlighting the circumstances that lead up to them.
> Find out if a particular crash is impacting a lot of users. Get alerts when a

## services/firebase-firestore — confirmed (completed)

Daily read/write/delete, standing storage, monthly egress and one-free-database quotas match; billing-only backup/TTL/PITR operations remain excluded.

Source: https://firebase.google.com/docs/firestore/quotas?hl=en

> Free quota
> Cloud Firestore offers free quota that lets you get started at no cost.
> If you need more quota, you must
> enable billing for your Google Cloud project .
> Quotas are applied daily and reset around midnight Pacific time.
> Important: Cloud Firestore allows exactly one free database per
> project.
> The follo

Source: https://firebase.google.com/docs/firestore/quotas?hl=en

> 20,000 per day
> Document deletes
> 20,000 per day
> Outbound data transfer
> 10 GiB per month
> The following operations and features don't include free usage. You must enable
> billing to use these features:
> TTL deletes
> PITR data
> Backup data
> Restore operations
> Clone operations
> For more information about how these features

## services/firebase-hosting — confirmed (completed)

Storage/project-level quota and paid rates match. Daily pricing versus monthly enforcement wording remains correctly qualified, including disabling sites after grace.

Source: https://firebase.google.com/docs/hosting/usage-quotas-pricing?hl=en

> 10 GB.
> If you are not on the Blaze plan, and you reach the
> 10 GB limit of no-cost Hosting storage, you won't be
> able to deploy new content to your sites. You'll need to
> delete older releases
> or
> upgrade to the Blaze plan .
> If you are on the Blaze plan, and you reach the 10 GB
> limit of no-cost Hosting stor

Source: https://firebase.google.com/docs/hosting/usage-quotas-pricing?hl=en

> offer a short grace period but then your sites will be disabled. Your sites
> will remain disabled until the start of the next month because data transfer
> billing is based on monthly usage levels. You can reenable your sites
> immediately by upgrading to the
> Blaze plan .
> If you are on the Blaze plan, and you reach the
> 10 GB/mont

## services/firebase-realtime-database — confirmed (completed)

1 GB/10 GB monthly/100-connection Spark allowance, protocol overhead and paid storage/budget-alert behavior match current successfully fetched docs.

Source: https://firebase.google.com/docs/database/usage/billing?hl=en

> 1 GB of data storage and 10 GB/month of data downloads.
> If you upgrade to the pay-as-you-go Blaze pricing plan , then you maintain the no-cost
> usage (1 GB of data storage and 10 GB/month of data downloads), and
> you're now billed for any usage beyond that amount. When your project is on the
> Blaze pricing plan, we recomm

Source: https://firebase.google.com/docs/database/usage/limits?hl=en

> *The Spark plan limit on simultaneous connections is 100.
> Simultaneous responses sent from a single database.
> ~100,000/second
> Responses include simultaneous broadcast and read operations sent by the
> server from a single database at a given time. The limit refers to the data
> packets that represent each individual read or

## services/firebase-remote-config — confirmed (completed)

Daily 100k fetch grant, two paid rates and September 2026 transition rules—including December/February deadlines and November 15 upgrade bonus—match current pricing docs.

Source: https://firebase.google.com/docs/remote-config/pricing

> Bonus: If you upgrade before November 15, 2026 , your grace period is extended to 5 months (Billing starts February 1, 2027 ).
> Blaze Plan (Pay as you go)
> 5 Months
> February 1, 2027
> No action required. Projects will automatically transition to the standard pricing on February 1, 2027 .
> Standard grace periods
> This grace period is relevant for proj

Source: https://firebase.google.com/docs/remote-config/pricing

> Countdown continuity: The 30-day grace period starts the very first time
> your project exceeds 100,000 daily fetch requests. This 30-day countdown
> doesn't pause or reset even if your daily usage temporarily drops below
> the 100,000 request limit during that timeframe.
> Quota notifications: As your daily fetch v

## services/firebase-storage — unresolved (partial)

Current pricing supports Blaze-only bucket quotas, but transfer destination exclusions and exact Spark 402/403 behavior need unavailable free-tier/FAQ pages.

Source: https://firebase.google.com/pricing

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

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.firecrawl.dev/pricing, https://docs.firecrawl.dev, https://www.firecrawl.dev

## services/fivenines — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://fivenines.io/pricing, https://fivenines.io/api-docs, https://fivenines.io/

## services/fivetran — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.fivetran.com/pricing, https://www.fivetran.com/pricing/free-plan, https://fivetran.com/docs, https://www.fivetran.com/

## services/flarewarden — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://flarewarden.com/pricing, https://flarewarden.com/docs, https://flarewarden.com/docs/getting-started, https://flarewarden.com

## services/fly-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://fly.io/docs/about/pricing/, https://fly.io/docs/about/free-trial/, https://fly.io/docs/getting-started/, https://fly.io/docs/flyctl/install/, https://fly.io/docs/launch/create/, https://fly.io/docs/, https://fly.io/

## services/forward-email — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://forwardemail.net/en/pricing, https://forwardemail.net/en/faq, https://forwardemail.net/en

## services/freedns-afraid — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://freedns.afraid.org/pricing/, https://freedns.afraid.org/signup/moreinfo/, https://freedns.afraid.org/signup/features/, https://freedns.afraid.org/, https://freedns.afraid.org/premium/, https://freedns.afraid.org/faq/

## services/frontegg — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://frontegg.com/pricing, https://developers.frontegg.com/, https://developers.frontegg.com/ciam/guides/getting-started/quick-start, https://frontegg.com

## services/gemfury — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://gemfury.com/pricing, https://gemfury.com, https://gemfury.com/help/getting-started, https://gemfury.com/help/upload-packages, https://gemfury.com/help/limits/, https://gemfury.com/help

## services/geoapify — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.geoapify.com/pricing/, https://apidocs.geoapify.com/docs/geocoding/forward-geocoding/, https://apidocs.geoapify.com, https://www.geoapify.com

## services/geocodio — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.geocod.io/pricing/, https://www.geocod.io/docs/, https://www.geocod.io

## services/getupdraft — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.getupdraft.com/pricing, https://docs.getupdraft.com, https://docs.getupdraft.com/quickstart/your-first-app-project/upload-first-build, https://docs.getupdraft.com/faq, https://www.getupdraft.com

## services/gigalixir — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.gigalixir.com/pricing, https://www.gigalixir.com/docs/, https://www.gigalixir.com/

## services/gitbook — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.gitbook.com/pricing, https://docs.gitbook.com/, https://docs.gitbook.com/getting-started/quickstart, https://www.gitbook.com/

## services/github-actions — unresolved (partial)

Official product page still confirms free public-repository CI/CD, but private minutes/storage, runner eligibility and spending behavior could not be verified.

Source: https://github.com/features/actions

> GitHub Actions is free for public repositories
> We take pride in our Open Source legacy, and are happy to provide free CI/CD for public repositories. Check out the doc to see which runners are incl

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/github-pages — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits, https://pages.github.com/, https://docs.github.com/en/pages, https://docs.github.com/en/pages/quickstart

## services/gitlab — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://about.gitlab.com/pricing/, https://docs.gitlab.com/ci/pipelines/compute_minutes/, https://docs.gitlab.com/user/project/, https://docs.gitlab.com/ci/quick_start/, https://docs.gitlab.com/ci/pipelines/instance_runner_compute_minutes/, https://docs.gitlab.com/subscriptions/gitlab_com/compute_minutes/, https://docs.gitlab.com/, https://about.gitlab.com/

## services/gitlab-ci-cd — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://about.gitlab.com/pricing/, https://docs.gitlab.com/ci/, https://docs.gitlab.com/ci/quick_start/, https://docs.gitlab.com/ci/pipelines/compute_minutes/, https://docs.gitlab.com/ci/runners/, https://docs.gitlab.com/ci/pipelines/instance_runner_compute_minutes/, https://docs.gitlab.com/subscriptions/gitlab_com/compute_minutes/, https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/

## services/gokanban-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://gokanban.io

## services/google-fonts — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://developers.google.com/fonts, https://developers.google.com/fonts/docs/css2, https://fonts.google.com/faq, https://developers.google.com/fonts/docs/getting_started, https://developers.google.com/fonts/docs/technical_considerations, https://github.com/google/fonts, https://fonts.google.com/

## services/google-maps-platform — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://mapsplatform.google.com/pricing/, https://developers.google.com/maps/billing-and-pricing/overview?hl=en, https://developers.google.com/maps/billing-and-pricing/pricing?hl=en, https://developers.google.com/maps/get-started?hl=en, https://developers.google.com/maps/documentation/javascript/demo-key?hl=en, https://developers.google.com/maps/documentation, https://mapsplatform.google.com

## services/google-natural-language — unresolved (partial)

Product page confirms service availability and general new-customer credit only; per-feature Natural Language free grants and billing units could not be verified.

Source: https://cloud.google.com/natural-language

> New customers get up to $300 in free credits to try Google Cloud products
> Get insightful text analysis with machine learning that extracts, analyzes, and stores text
> Apply natura

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-secret-manager — unresolved (partial)

Official free-products catalog confirms six secret versions/month, but operation/rotation grants, payment requirements and paid rates could not be verified.

Source: https://cloud.google.com/free

> 6 secret versions per month
> Cloud Shell
> Online development and operations environment accessible anywhere with your browser.
> Includes 5 GB of persistent disk storage
> Workload Ma

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

## services/google-speech-to-text — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://cloud.google.com/speech-to-text/pricing, https://cloud.google.com/free/docs/free-cloud-features, https://cloud.google.com/speech-to-text/docs/overview, https://cloud.google.com/speech-to-text

## services/grafana-cloud — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://grafana.com/pricing/, https://grafana.com/docs/grafana-cloud/, https://grafana.com/docs/grafana-cloud/get-started/, https://grafana.com/docs/grafana-cloud/send-data/, https://grafana.com/products/cloud/

## services/graphhopper — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.graphhopper.com/pricing/, https://docs.graphhopper.com, https://www.graphhopper.com

## services/gridlastic-com — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.gridlastic.com/pricing.html, https://www.gridlastic.com/how-it-works.html, https://www.gridlastic.com/test-environments.html, https://www.gridlastic.com/documentation.html, https://www.gridlastic.com/

## services/growthbook — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.growthbook.io/pricing, https://docs.growthbook.io/, https://docs.growthbook.io/quick-start, https://growthbook.io

## services/gtmetrix-com — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://gtmetrix.com/pricing/, https://gtmetrix.com/, https://gtmetrix.com/blog/important-changes-to-gtmetrix/, https://gtmetrix.com/api/docs/2.0/, https://gtmetrix.com/faq.html

## services/gumlet — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.gumlet.com/pricing/, https://docs.gumlet.com/image/getting-started/image-getting-started/index.md, https://docs.gumlet.com, https://www.gumlet.com

## services/hacker-news-api — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://github.com/HackerNews/API

## services/hatchet — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://hatchet.run/pricing, https://docs.hatchet.run, https://docs.hatchet.run/v1/quickstart, https://hatchet.run

## services/he-free-dns — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://dns.he.net/

## services/heap — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.heap.io/pricing, https://developers.heap.io/, https://www.heap.io/

## services/helicone — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.helicone.ai/pricing, https://docs.helicone.ai, https://www.helicone.ai

## services/here — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.here.com/get-started/pricing, https://legal.here.com/us-en/terms/here-platform-terms, https://www.here.com/get-started/pricing/rps-limits-excluded-use-cases, https://www.here.com/get-started/pricing/base-plan-restrictions, https://platform.here.com/sign-up, https://www.here.com/docs, https://www.here.com

## services/hetzner-dns — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.hetzner.com/dns-console, https://docs.hetzner.com/dns-console/dns/general/dns-overview/

## services/hex — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://hex.tech/pricing, https://learn.hex.tech/docs, https://learn.hex.tech/docs/getting-started/connect-your-data, https://learn.hex.tech/docs/getting-started/create-your-first-project, https://learn.hex.tech/docs/getting-started/share-your-work, https://hex.tech/

## services/hightouch — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://hightouch.com/pricing, https://hightouch.com/docs/syncs/create-your-first-sync, https://hightouch.com/docs, https://hightouch.com/

## services/hivemq-cloud — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.hivemq.com/pricing/, https://docs.hivemq.com/hivemq-cloud/quick-start-guide.html, https://docs.hivemq.com/, https://www.hivemq.com/

## services/honeybadger-io — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.honeybadger.io/plans/, https://docs.honeybadger.io/, https://www.honeybadger.io, https://docs.honeybadger.io/lib/ruby/

## services/honeycomb — unresolved (attempted-only)

Source collection attempted; material current pricing and limits could not be compared because the environment transport returned HTTP 503.

Remaining: Complete comparison of current official pricing, quotas, card requirements and limit behavior.

Attempted official sources: https://www.honeycomb.io/pricing/, https://docs.honeycomb.io/get-started/manage-costs/how-honeycomb-calculates-usage/, https://docs.honeycomb.io/get-started/start-building/application/traces/, https://docs.honeycomb.io/send-data/opentelemetry/, https://docs.honeycomb.io, https://www.honeycomb.io
