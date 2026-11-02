# Resumed follow-up to freshness issue #77: batch 1 (2026-11-02)

> Latest status: the [access recheck and local-browser handoff](2026-11-02-local-browser-handoff.md) resolved Crowdin and Zoom. **588 of 596 follow-up comparisons are complete; 8 remain incomplete.** The report below preserves its historical checkpoint; use the [current ledger](2026-11-02-followup-77.json) for current status.

All 18 pending IDs are accounted for. Ten entry comparisons completed: six confirmed and four corrected. Eight remain unfinished. Only the ten completed entries advance `lastVerified`; incomplete entries keep their earlier dates. Previous reports remain historical.

The collector recovered readable official pages for the early entries, then stopped after three consecutive proxy failures. Targeted Chromium navigation to Appho.st and Aiven also returned HTTP503 with `Invalid argument`. These are environment transport failures, not evidence that provider offers ended. Later entries were not retried by the resumed collector. No blind retries were made.

The comparisons below use complete material offer, billing, cap, card and limit context; quotes are audit anchors, not a numeric or HTTP-status review. Shared readable Comet sources supplied a useful official fallback for Opik. Explicitly unpublished policies remain qualified, and the review did not exercise account creation or billing.

## services/aiven — corrected; completed

Original batch: 1. Original signal: noisy.

Compared Free product eligibility, resource amounts, no-card billing, one-per-type quota, inactivity and upgrade behavior. PostgreSQL-specific backup, region and integration restrictions are now scoped to that product; an unsupported MySQL capacity figure was removed. MySQL Free remains listed in the official service-pricing documentation even though the marketing comparison omits it.

Source: <https://aiven.io/pricing>

> 1 dedicated VM 1 CPU per VM 1 GB RAM per VM 1 GB total storage Cannot select a specific cloud or region No integrations or connection pooling

Source: <https://aiven.io/pricing>

> Single backup only for disaster recovery

Source: <https://aiven.io/docs/platform/concepts/free-plan>

> The Free tier is available for the following service types: Aiven for Apache Kafka® Aiven for MySQL® Aiven for OpenSearch® Aiven for PostgreSQL® Aiven for Valkey™ You don't need a credit card to create a free service and you can use them indefi

Source: <https://aiven.io/free-tier>

> Each Aiven account can run one free service per service type (for example, one free PostgreSQL, one free OpenSearch, one free Kafka). Can teams share

Source: <https://aiven.io/free-tier>

> Yes, it’s free forever. No credit card or payment details are required, and you will never be charged automatically.

## services/appho-st — unresolved; attempted-only

Original batch: 1. Original signal: thin.

The retained homepage text is only an application shell. A targeted Chromium navigation returned the shared proxy HTTP503 Invalid argument failure before it could render pricing. No plan comparison was completed.

Remaining: Render the public homepage after transport recovery and compare five apps, fifty monthly downloads, 100-MB files, one-version retention, Basic pricing and ninety-day inactivity deletion.

Cited/attempted sources:

- <https://appho.st> — retained HTTP 200; thin.

## services/azure-open-datasets — confirmed; completed

Original batch: 1. Original signal: noisy.

The overview explicitly establishes account-free Python access, resolving the prior no-card evidence gap. Hosting, possible egress charges, dataset scope and Python/ML workspace setup match; a subscription is needed for the optional managed Azure workflow.

Source: <https://learn.microsoft.com/en-us/azure/open-datasets/overview-what-are-open-datasets>

> However, you don't need an Azure account to access Open Datasets; you can access them from any Python environment with or without Spark.

Source: <https://azure.microsoft.com/en-us/products/open-datasets/>

> While storage will always remain free, egress costs associated with reading large datasets can be charged to the Azure subscription accessing the data. Most datasets will be free to access. Egress charges, if applicable, will be mentioned on the Open Datasets overview page. Resources Open

## services/codacy — confirmed; completed

Original batch: 1. Original signal: noisy.

Developer IDE-only scope, thirty-eight languages, free open-source cloud scanning, unlimited public repositories, no-card trial and the private Team prices/seat rules match. The broader platform language count is not substituted for the Developer card.

Source: <https://www.codacy.com/pricing>

> Developer IDE plugin for individual devs, with real-time feedback and AI guardrails in the editor Free forever $0 Per dev/mth, billed Get IDE plugin Dropdown Auto-fix AI code before it reaches the editor Dropdown Scan-as-you-type Dropdown Security Scans (SAST, SCA, Secrets) Dropdown Code Quality Scans Dropdown Agent Handoff for Auto-Fixing Issues Dropdown VSCode, Jetbrains and Cursor integration Dropdown Supports 38 programming languages Team For teams up to 30 devs

Source: <https://www.codacy.com/pricing>

> For teams up to 30 devs protecting their apps from inception to product Yearly Monthly Starting at $18 Per dev/mth Starting at $21 Per dev/mth Start free trial Start free trial Start free trial Free forever for open-source projects Everything in Developer, plus: Dropdown GitHub, Bitbucket & GitLab Integration Dropdown Cloud-hosted Code Quality & Secur

Source: <https://www.codacy.com/pricing>

> What is a 14-day trial? Simply sign up with your Git provider (no credit card required), and enjoy full access to the Codacy platform for 14 days, free of charge. After the trial period, you can upgrade to a paid plan to continue using Codacy with private repositories, or keep scanning your public repositories for free on the Open Source plan. Which payment methods do you accept? Codacy accepts credit cards by Visa, Mastercard, American Express, and Discover.

## services/codebuild — confirmed; completed

Original batch: 1. Original signal: changed.

Fresh pricing confirms the separate small-EC2 and 1-GB Lambda allowances, excluded Reserved/Sandbox/image-server products, indefinite service allowance, metered excess and separate resource charges. Account suspension and optional spend limits remain correctly qualified.

Source: <https://aws.amazon.com/codebuild/pricing/>

> The CodeBuild AWS Free Tier includes 100 total build minutes per month with the general1.small or arm1.small instance types using on-demand Amazon EC2. Using on-demand Lambda, the CodeBuild AWS Free Tier includes 6,000 total build seconds per month with the lambda.arm.1GB or lambda.x86-64.1GB compute types. Reserved Capacity EC2, Sandbox and Docker image server don't offer an AWS free tier. The CodeBuild AWS Free Tier does not automatically expire at the end of your 12-month AWS Free Tier term. It is available to new and existing AWS customers. Additional charges You may incur additional charges if your builds transfer data or use other AWS services. For example, you may incur charges from Amazon CloudWatch Logs for build log streams, Amazon Simple Storage Service (Amazon S3) for build artifact storage, and AWS Key Management Service (AWS KMS) for encryption

Source: <https://aws.amazon.com/free/free-tier-faqs/>

> When your Free plan expires, AWS suspends your account and any associated projects, and you will lose access to your resources and data. AWS will retain your data for 90 days after your Free plan expires. During this period, you have the option to upgrade to Paid plan to reopen your account and restore access to your resources. If you don’t upgrade your account within 90 days, AWS will permanently erase your AW

## services/codecommit — unresolved; partial

Original batch: 1. Original signal: new-baseline.

The resumed official blog and documentation confirm November 2025 reopening, resolving the stale banner conflict. Pricing defines active users, rollover and overage rates, but its dynamic free-quota table is absent from retained static text; repository quota wording on the homepage also needs the detailed quota page.

Source: <https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/>

> CodeCommit is open to new customers again – New customer sign-ups are open as of today. If you’ve been waiting to onboard new accounts or create repositories, you can do so right now through the AWS Console, CLI, or APIs.

Source: <https://aws.amazon.com/codecommit/pricing/>

> Unused storage and Git requests do not accumulate. If you need more storage or Git requests for your users, additional storage will be charged at: $0.06 per GB/month $0.001 per Git request Get started with CodeCommit Getting started Get started with CodeCommit Explore usage examples Features page Check ou

Remaining: Read the rendered pricing table or an official FAQ to establish five free users, 50 GB-month and 10,000 Git requests; check repository quotas in the detailed service limits page.

Cited/attempted sources:

- <https://aws.amazon.com/codecommit/pricing/> — retained HTTP 200.
- <https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/> — retained HTTP 200.
- <https://docs.aws.amazon.com/codecommit/latest/userguide/history.html> — retained HTTP 200.
- <https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/free-tier-plans.html> — retained HTTP 200.
- <https://aws.amazon.com/free/free-tier-faqs/> — retained HTTP 200.
- <https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html> — retained HTTP 200.
- <https://aws.amazon.com/codecommit/> — retained HTTP 200.

## services/codehooks — confirmed; completed

Original batch: 1. Original signal: noisy.

The Development resource, rate, worker and storage limits match. No-card access, EU hosting, paid-only daily backups and deletion two weeks after cancellation are explicit; free quota enforcement remains unpublished and qualified.

Source: <https://codehooks.io/>

> Development Explore and prototype Free 1 Developer API/Functions: 1/sec, 500/day 1 Worker per queue Worker timeout 30s 150 MB Database Storage 1 GB File Storage 1 Space Chat and Email Support No Credit Card Required Start free → Most popular Pro For agent-powered projects $19/month 3 Developers* A

Source: <https://codehooks.io/>

> Where is my data stored? All data and backups are stored in the EU . Paid plans include daily automated backups . We are GDPR compliant . How does authentication and security work? You can

Source: <https://codehooks.io/>

> What happens to my data if I cancel? Your data will be automatically deleted after 2 weeks following plan cancellation. Make sure to export any data you need before canceling. Read the Docs Try It Free Ship your first webhook handler to

## services/codepipeline — corrected; completed

Original batch: 1. Original signal: changed.

V1/V2 grants, metered rates, monthly accounting, excluded action types, console selection and account-plan rules match. Scoped the first-thirty-days waiver to V1: the pricing page places it in the V1 paragraph and does not extend it to V2 action minutes.

Source: <https://aws.amazon.com/codepipeline/pricing/>

> For V1-type pipelines : You pay $1.00 per active pipeline (a pipeline that has existed for more than 30 days and has at least one code change that runs through it during the month) per month. There is no charge for pipelines that have no new code changes running through them during the month. An active pipeline is not prorated for partial months. Pipelines are free for the first 30 days after creation. For V2-type pipelines : You pay $0.002 per action execution minute. Action execution duration is calculated in minutes, from the time an action in your pipeline starts executing until that action reaches a completion stat

Source: <https://aws.amazon.com/codepipeline/pricing/>

> For V2-type pipelines : You pay $0.002 per action execution minute. Action execution duration is calculated in minutes, from the time an action in your pipeline starts executing until that action reaches a completion state, rounded up to the nearest minute. You are charged for all action types except for manual approval and custom action types. AWS Free Tier As part of the AWS Free Tier , CodePipeline off

Source: <https://aws.amazon.com/codepipeline/pricing/>

> For V2-type pipelines : 100 free action execution minutes per month. The free action execution minutes are shared between all V2 pipelines in the account, regardless of the number of V2 pipelines in the account. They are automatically reset at the beginning of each calendar month. Unused minutes do not carry over to the next month. Additional charges You may incur additional charges f

Source: <https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-s3.html>

> The V2 type is the only type you can choose in the console.

## services/codspeed — confirmed; completed

Original batch: 1. Original signal: changed.

Free five-user private scope, public unlimited-user scope, three-month history and 600 macro minutes match. Pro-only seat disabling and the $0.032 add-on remain separate from unpublished Free exhaustion and card rules. Read the actual rendered-document text preceding hydration data.

Source: <https://codspeed.io/pricing>

> Unlimited runs and repositories Up to 5 users Unlimited for open-source projects 3-month history CI integration Pull request reports and checks CPU and Memory instruments Wall-time instrument 600 macro runner minutes/month Get started Pro MOST POPULAR :host{di

Source: <https://codspeed.io/docs/features/seats-and-billing>

> CodSpeed is free and unlimited on public repositories: there are no restrictions on the number of users. On private repositories, the Free plan includes up to 5 users . Beyond that, you need a Pro plan, where each active user consumes one seat . ​ Users A user is anyone who triggers a CodSpeed run on a private repository of an organ

Source: <https://codspeed.io/docs/features/seats-and-billing>

> On the Pro plan, seats control how many users in your organization can use CodSpeed at the same time. A user without a seat is disabled : they lose access to CodSpeed for your organization, and their runs are blocked on private repositories. ​ Managing seats ​ Automatic seat allocation Automatic seat all

## services/cohere-api — confirmed; completed

Original batch: 1. Original signal: noisy.

Trial calls remain free and non-commercial/non-production, with one thousand monthly calls and the endpoint-specific rates in the entry. Production-key workflow, billing threshold and newer-model restrictions match; registration card requirements remain explicitly unknown.

Source: <https://cohere.com/pricing>

> API calls made from a Trial API key are free. However, trial keys are rate limited and are not permitted to be used for production or commercial purposes. API calls made from a Production API key will be charged on a pay-as-you-go basis. Production API keys are designed for production use at scale. Are there any account limitations upon signup? Every account begins as a personal account and only has access to Trial API ke

Source: <https://docs.cohere.com/docs/rate-limits>

> Trial keys (and prod keys on newer Chat model variants) are limited to 1,000 API calls a month.

Source: <https://docs.cohere.com/docs/rate-limits>

> Audio Transcriptions 5 req / min Contact sales@cohere.com Embed 2,000 inputs / min 2,000 inputs / min Embed (Images) 5 inputs / min 400 inputs / min EmbedJob 5 req / min 50 req / min Rerank 10 req / min 1,000 req / min Tokenize 100 req / min 2,000 req / min Parse 500 req / min 500 req / min Default (anything no

## services/comet-ml — corrected; completed

Original batch: 1. Original signal: changed.

The MLOps plan, one-user/100-GB grant, fair-usage qualification, no-card signup, paid overages, SDK setup and ninety-day UI-inactivity deletion match. Academic wording now relies on the current pricing title/body and explicitly leaves separate academic terms unconfirmed; the unavailable old landing page is no longer described as current evidence.

Source: <https://www.comet.com/site/pricing/>

> Monthly limits Fair usage policy 1500 training hours included $1/training hours Unlimited Data usage 100GB 500GB included $3/100GB/month Unlimited Data retention Open tooltip On the Free plan, a workspace that no one opens in the Comet UI for 90 days is deleted with all its data. Email notice is sent 30 days before deletion. Logging in resets the period. SDK and API logging do not count as activity. 90 days No inactivity deletion No inactivity deletion Team members 1 Up to 10 users Unlimited LLM Evaluation Tracing Open tooltip

Source: <https://www.comet.com/site/>

> You don’t need a credit card to sign up, and your Comet account comes with a generous free tier you can actually use—for as long as you like.

Source: <https://www.comet.com/site/pricing/>

> A training hour represents 60 minutes of active model training time recorded in Comet. If your model takes 8 hours to train, you’ve used 8 training hours. This time is based on the time between starting and stopping an Experiment. Custom Observability for Your AI Stack Whether you’

## services/comet-opik — corrected; completed

Original batch: 1. Original signal: changed.

Pricing establishes the Free Cloud quantities, self-hosted span/retention scope and Pro add-ons. The readable Comet homepage establishes no-card signup; the shared official SDK quickstart supports the refreshed configuration steps. Removed the unsupported blanket claim about self-hosted user-management capabilities and scoped paid controls to advertised Enterprise options. Free span enforcement remains qualified.

Source: <https://www.comet.com/site/pricing/>

> Free Cloud Perfect for individuals $0 Free plan Get Started Up to 10 team members 25k spans per month 60-day data retention Includes: Agent tracing & analysis Test Suites & assertions Agent Playground Ollie coding harness trial Pro Cloud Popular Expanded usage for teams $19 Per month Start Free Trial Up

Source: <https://www.comet.com/site/pricing/>

> Additional Spans Unlimited — $5/100k spans Unlimited Span Data Retention Unlimited 60 days 60 days Custom Additional Span Retention Open tooltip Increase span data retention from 60 days to 400 days Unlimited — $29/100k spans Custom Questions & Answers What is the relationship bet

Source: <https://www.comet.com/site/>

> You don’t need a credit card to sign up, and your Comet account comes with a generous free tier you can actually use—for as long as you like.

Source: <https://www.comet.com/docs/v2/guides/quickstart/>

> Next we will configure the Opik SDK to connect to your Comet account: export OPIK_API_KEY = "your_opik_api_key" export OPIK_WORKSPACE = "your_opik_workspace" Note Your Opik workspace name is often the same as your user name. 2. Trace your L

## services/commandbar — unresolved; attempted-only

Original batch: 1. Original signal: changed.

The resumed collector stopped after recurring shared-proxy503 errors before retrying this entry. Earlier failed retrievals remain the only attempted evidence; no current-source comparison was completed.

Remaining: Retrieve the official pricing, billing and setup sources and compare the entire entry after transport recovery.

Cited/attempted sources:

- <https://amplitude.com/pricing> — retained HTTP 503; thin.
- <https://amplitude.com/guides-and-surveys> — retained HTTP 503; thin.
- <https://amplitude.com/docs/guides-and-surveys/get-started> — retained HTTP 503; thin.
- <https://amplitude.com/docs/sdks/guides-and-surveys/sdk> — retained HTTP 503; thin.
- <https://amplitude.com/docs> — retained HTTP 503; thin.

## services/commerce-layer — unresolved; attempted-only

Original batch: 1. Original signal: changed.

The resumed collector stopped after recurring shared-proxy503 errors before retrying this entry. Earlier failed retrievals remain the only attempted evidence; no current-source comparison was completed.

Remaining: Retrieve the official pricing, billing and setup sources and compare the entire entry after transport recovery.

Cited/attempted sources:

- <https://commercelayer.io/pricing> — retained HTTP 503; thin.
- <https://docs.commercelayer.io> — retained HTTP 503; thin.
- <https://docs.commercelayer.io/core/getting-started> — retained HTTP 503; thin.
- <https://commercelayer.io> — retained HTTP 503; thin.

## services/composio — unresolved; attempted-only

Original batch: 1. Original signal: noisy.

The resumed collector stopped after recurring shared-proxy503 errors before retrying this entry. Earlier failed retrievals remain the only attempted evidence; no current-source comparison was completed.

Remaining: Retrieve the official pricing, billing and setup sources and compare the entire entry after transport recovery.

Cited/attempted sources:

- <https://composio.dev/pricing> — retained HTTP 503; thin.
- <https://docs.composio.dev/> — retained HTTP 503; thin.
- <https://docs.composio.dev/docs/quickstart> — retained HTTP 503; thin.
- <https://composio.dev/> — retained HTTP 503; thin.

## services/compute-engine-e2-micro — unresolved; partial

Original batch: 1. Original signal: noisy.

The previously retained Free Tier guide supports the VM grant and pooled-hour correction. This resumed collector stopped before the missing VPC/VM pages could be retried, so the separate IPv4 billing and full setup comparison remain unfinished.

Source: <https://cloud.google.com/free/docs/free-cloud-features>

> Your Free Tier e2-micro instance limit is by time, not by instance. Each month, eligible use of all of your e2-micro instances is free until you have used a number of hours equal to the total hours in the current month. Usage calculations are combined across the supported regions . GPUs and TPUs are n

Remaining: Re-fetch VPC network pricing and VM creation documentation after transport recovery.

Cited/attempted sources:

- <https://cloud.google.com/free/docs/free-cloud-features> — retained HTTP 200.
- <https://cloud.google.com/vpc/network-pricing> — retained HTTP 503; thin.
- <https://cloud.google.com/compute/docs?hl=en> — retained HTTP 503; thin.
- <https://cloud.google.com/compute/docs/instances/create-start-instance?hl=en> — retained HTTP 503; thin.
- <https://cloud.google.com/compute/docs> — retained HTTP 503; thin.
- <https://cloud.google.com/compute> — retained HTTP 503; thin.

## services/contentful — unresolved; attempted-only

Original batch: 1. Original signal: blocked.

The resumed collector stopped after recurring shared-proxy503 errors before retrying this entry. Earlier failed retrievals remain the only attempted evidence; no current-source comparison was completed.

Remaining: Retrieve the official pricing, billing and setup sources and compare the entire entry after transport recovery.

Cited/attempted sources:

- <https://www.contentful.com/pricing/> — retained HTTP 503; thin.
- <https://www.contentful.com/get-started/> — retained HTTP 503; thin.
- <https://www.contentful.com/help/admin/usage/usage-limit/> — retained HTTP 503; thin.
- <https://www.contentful.com/developers/docs/references/content-management-api/> — retained HTTP 503; thin.
- <https://www.contentful.com/developers/docs/> — retained HTTP 503; thin.
- <https://www.contentful.com/> — retained HTTP 503; thin.

## services/conversion-tools — unresolved; attempted-only

Original batch: 1. Original signal: changed.

The resumed collector stopped after recurring shared-proxy503 errors before retrying this entry. Earlier failed retrievals remain the only attempted evidence; no current-source comparison was completed.

Remaining: Retrieve the official pricing, billing and setup sources and compare the entire entry after transport recovery.

Cited/attempted sources:

- <https://conversiontools.io/pricing> — retained HTTP 503; thin.
- <https://conversiontools.io/api-pricing> — retained HTTP 503; thin.
- <https://conversiontools.io/convert/json-to-excel> — retained HTTP 503; thin.
- <https://conversiontools.io/> — retained HTTP 503; thin.

## Validation

`check:depth --evidence` passed for all ten completed entries. `check:answers` passed all nine tests. `git diff --check` passed for owned files. No prior report, unassigned entry, source collector or application code was modified.
