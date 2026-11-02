# Freshness follow-up — issue #77 — batch 5 — 2026-11-02

> Latest status: the [access recheck and local-browser handoff](2026-11-02-local-browser-handoff.md) resolved Crowdin and Zoom. **588 of 596 follow-up comparisons are complete; 8 remain incomplete.** The report below preserves its historical checkpoint; use the [current ledger](2026-11-02-followup-77.json) for current status.

Scope: the 100 assigned entries from `services/statuspile` through `tools/cal-com`, from the complete queue attached to [scan run 41359504131](https://github.com/0langa/FreeTierWiki/actions/runs/41359504131).

## Outcome

- **28 completed comparisons:** 26 unchanged, 2 corrected (TinaCMS and Stream Chat).
- **4 partial comparisons:** StatusPile, Survicate, tldraw and Tolgee; verification dates retained.
- **68 attempted only:** current official sources could not be read after an environment-wide transport failure; verification dates retained.
- No entries were removed. These results do not acknowledge scanner revisions or close the outstanding queue.

## Evidence and limits

Sources were fetched on 2026-11-02. Local evidence is stored under `development/verify/deepen/evidence/`. Complete comparisons covered the material offer, limits, billing/card qualifications and relevant setup statements against the cited official pricing and documentation. Existing expressly unknown policies were retained where sources do not publish the rule. Verification-only entries retain their original `lastUpdated`. The two content corrections update `lastUpdated` and `lastVerified`; their change notes describe catalog corrections, not an invented provider change date.

During collection (confirmed by a 14:18 UTC diagnostic request), requests to unrelated destinations began returning HTTP 503 from the cloud proxy, including previously working Supabase and the later batch targets. A diagnostic response read `upstream connect error ... Invalid argument|remote address:envoy://cloudflare_https_tunnel/`. One later control request succeeded, but a centralized single-worker retry and subsequent control probes again returned HTTP 503; recovery was not sustained. These failures are infrastructure failures, not evidence that individual vendors are down, have ended their offers, or block reviewers. Missing sources remain outstanding; no successful status or numeric match alone was used to clear them.

## Completed comparisons

### `services/stickies` — confirmed

The 14-day no-card trial, Plus/Pro prices and file/wall allowances match. Live terms confirm access stops after the trial and unconverted accounts are disabled and later deleted; paid renewals remain separate.

- [Official source](https://stickies.app/pricing): “14-Day Free Trial - No credit card required Enter a valid e-mail address! Try Now for Free From the Blog Introducing Wall Templates for Stickies We've made it even easier for you to get started with Stickies! Wall Templa…”
- [Official source](https://stickies.app/api/legal/): “When the free trial ends, you will not be able to access our Services until you either pay for the Subscription or downgrade to a free version of one of our Services, if available or offered by us. If no action has been…”

### `services/storyblok` — confirmed

Starter still has one space/seat, 100 GB traffic, 100k requests, two locales and 25k AI credits; the table confirms story/asset limits and the $15 extra seat. The FAQ confirms no card and the 45-day Growth Plus trial. Unpublished Starter exhaustion remains qualified.

- [Official source](https://www.storyblok.com/pricing): “Limited plan for testing and personal projects. Start Free Trial Start with: 1 space 1 seat (up to 2) 100GB traffic 100k API requests 2 locales 25k AI credits Growth Monthly price if billed monthly: $99.00 /mo Monthly pr…”
- [Official source](https://www.storyblok.com/pricing): “No! Every space comes with a 45-day free trial on our Growth Plus plan. At any time you can provide payment for a plan with the features you want, or continue building on the Starter plan, which is always free and requir…”

### `services/stream-chat` — corrected

Build allowances, no-card signup, Maker credit and unspecified over-limit behavior match. Qualified the claim that every Chat feature is included: the plan table excludes advanced capabilities including multi-tenancy and automatic translation.

- [Official source](https://getstream.io/chat/pricing/): “No Credit Card Required Community Support See All Features Start Robust Chat features $399.00 USD /mo Billed annually, or $499.00 monthly 10,000 MAU 500 Concurrent Connections View Plan Start Chat features include: Advan…”
- [Official source](https://getstream.io/chat/pricing/): “Multi-tenancy / Teams Stream Chat can be configured in multi-tenant mode so that users are organized in separated teams that cannot interact with each other. Learn more Unavailable Unavailable Included Included Unlimited…”

### `services/stytch` — confirmed

B2B pay-as-you-go free allowances, $99 branding add-on, 10k fingerprints and $0.005/fingerprint match. FAQ explicitly confirms no hard cap and billing above allowance. Card requirement remains unknown.

- [Official source](https://stytch.com/pricing): “10,000 monthly active users and AI agents Unlimited Organizations 5 SSO or SCIM Connections 1,000 M2M Tokens Full suite of authn and authz features -- OAuth, SSO, Sessions, and RBAC Organization-level primary + secondary…”
- [Official source](https://stytch.com/pricing): “Our pricing does not include any hard caps or pricing cliffs. If you surpass the 10,000 MAUs, 5 SSO or SCIM connections, 1000 M2M tokens, or 10,000 fingerprints included in our free tier, you'll pay for only what you use…”

### `services/supabase` — confirmed

Free database/storage/auth/function/realtime allowances and two-project inactivity limits match. Cost-control docs say Free is never charged and repeated over-use can restrict services. Organization-level paid upgrades and compute credits match.

- [Official source](https://supabase.com/pricing): “50,000 monthly active users 500 MB database size Shared CPU • 500 MB RAM 5 GB egress 5 GB cached egress 1 GB file storage Community support Free projects are paused after 1 week of inactivity. Limit of 2 active projects.…”
- [Official source](https://supabase.com/docs/guides/platform/cost-control): “you will not be charged while using the Free Plan. What happens when the Spend Cap is on? # After exceeding the quota for a usage item, further usage of that item is disallowed until the next billing cycle. You don't get…”

### `services/supabase-auth` — confirmed

50k MAU, unlimited total users, OAuth, basic MFA and custom SMTP remain included; SAML and phone MFA are paid. Auth documentation confirms token-bucket limits and HTTP 429. Exact MAU-quota enforcement remains qualified.

- [Official source](https://supabase.com/pricing): “OAuth 2.1 Server Included in free Custom SMTP server Included in free Remove Supabase branding from emails Not included in free Auth Audit Logs 1 hour Basic Multi-Factor Auth Included in free Advanced Multi-Factor Auth -…”
- [Official source](https://supabase.com/docs/guides/auth/rate-limits): “Most buckets have a maximum capacity of 30 requests. When a bucket is full, brief bursts of up to 30 requests can be allowed in a short period. Anonymous sign-ins are an exception: the bucket capacity matches the configu…”

### `services/supabase-database` — confirmed

500 MB database/shared memory, two projects and inactivity pause match. Billing FAQ describes notifications, grace periods, read-only/402 restrictions, and relief after the next quota reset. The backup limitation is retained.

- [Official source](https://supabase.com/pricing): “500 MB database size Shared CPU • 500 MB RAM 5 GB egress 5 GB cached egress 1 GB file storage Community support Free projects are paused after 1 week of inactivity. Limit of 2 active projects. Pro Most Popular For produc…”
- [Official source](https://supabase.com/docs/guides/platform/billing-faq): “What will happen when I exceed the Free Plan quota? # You will be notified when you exceed the Free Plan quota. It is important to take action at this point. If you continue to exceed the limits, service restrictions wil…”

### `services/supabase-edge-functions` — confirmed

500k invocations, 256 MB memory, 150-second Free duration and 20 MB local/5 MB server-side bundles match. Free non-billing and organization-wide fair-use restrictions remain distinct from function runtime timeouts.

- [Official source](https://supabase.com/docs/guides/functions/limits): “Maximum Memory: 256MB Maximum Duration (Wall clock limit) : This is the duration an Edge Function worker will stay active. During this period, a worker can serve multiple requests or process background tasks . Free plan:…”
- [Official source](https://supabase.com/docs/guides/functions/limits): “Maximum Function Size : 20MB (bundled locally via the CLI) or 5MB (bundled server-side, e.g. via the Management API or Dashboard) Maximum no. of Functions per project: Free: 100 Pro: 1000 Team: 2000 Enterprise: Unlimited…”

### `services/supabase-storage` — confirmed

1 GB storage, 5 GB egress plus 5 GB cached egress, 50 MB files and two active projects match. File-limit docs confirm Free 50 MB versus paid 500 GB, with image transformations excluded from Free and no Free usage billing.

- [Official source](https://supabase.com/docs/guides/storage/uploads/file-limits): “For Free projects, the limit can't exceed 50 MB. On the Pro Plan and up, you can set this value to up to 500 GB. If you need more than 500 GB, contact us . Plan Max File Size Limit Free 50 MB Pro 500 GB Team 500 GB Enter…”
- [Official source](https://supabase.com/docs/guides/platform/cost-control): “you will not be charged while using the Free Plan. What happens when the Spend Cap is on? # After exceeding the quota for a usage item, further usage of that item is disallowed until the next billing cycle. You don't get…”

### `services/supertokens` — confirmed

Free self-hosted core and managed service below 5k MAU remain distinct. Managed $0.02/MAU and paid MFA/account-linking minimums remain published; the existing unknown card and threshold-transition caveats are retained.

- [Official source](https://supertokens.com/pricing): “Self hosting the open source features is free without any limits! } No 10X surprise increases in price. Cloud Self-hosted $0.02 per MAU Number of unique logged in users that are on your product every month (including new…”
- [Official source](https://supertokens.com/pricing): “Free under 5K monthly active users) Free and open source (No free MAUs count limit) Core Features Authentication Email Password Social Login / SSO providers (Google , Github , Facebook , and all custom providers) Passwor…”

### `services/suprsend` — confirmed

10k notifications, no card, unlimited channels/team members and 30-day all-feature trial match. FAQ explicitly says it continues processing above the free limit and contacts the customer; Essentials prices match.

- [Official source](https://www.suprsend.com/pricing): “10k Notifications/mo Switch to Essentials for additional notifications Includes: Unlimited Channels In-app notification feed (with SuprSend branding) Branching & Conditions Lists & Broadcasts Unlimited Team Members Premi…”
- [Official source](https://www.suprsend.com/pricing): “We do not stop processing and sending your notification requests. We will alert and contact you if your account goes over the free plan limit, and you can either upgrade your account or we can discuss custom pricing requ…”

### `services/surge` — confirmed

Unlimited free projects/domains and certificates, $30 Pro, publish-rate limits and 450 MB/10,100-file cap match. Current FAQ explicitly states no bandwidth billing or overage, and only publishing pauses at limits. Signup-card policy remains unknown.

- [Official source](https://surge.sh/pricing): “Project size 450 MB, 10,100 files New accounts publish at half the rate until the email is verified. Details in Publishing limits . Questions Before you ask. Is Free really free, with a custom domain? Yes. Custom domains…”
- [Official source](https://surge.sh/pricing): “There's no bandwidth billing and no overage charge. The bill is the plan price. How do I upgrade or cancel? surge plan in the terminal, or surge plan --web for checkout in the browser. Cancel any time from surge plan --m…”

### `services/svix` — confirmed

50k monthly messages, 50 messages/sec, seven-day payload retention, one connector, no card, paid SLA/branding and additional-message rates match. No explicit Free exhaustion policy was found, so unknown enforcement remains appropriate.

- [Official source](https://www.svix.com/pricing/): “No credit card required Embeddable webhooks UI 50 messages / second 7-day payload retention Up to 50k messages per month Dispatch, Stream and Ingest Basic For teams ready to start scaling their webhooks in production. fr…”
- [Official source](https://www.svix.com/pricing/): “50 messages / second 7-day payload retention Up to 50k messages per month Dispatch, Stream and Ingest Basic For teams ready to start scaling their webhooks in production. from $20 per month Get started Everything from Fr…”

### `services/sweego` — confirmed

100 emails/day, five templates, seven-day logs, unlimited domains and annual/monthly Individual prices match. SMS remains prepaid from €20 with twelve-month validity. Free overage and card policies remain explicitly unconfirmed.

- [Official source](https://www.sweego.io/pricing): “100 emails by API & SMTP Unlimited domains 5 Templates Webhook Test Mode 7 days log retention Choose Free Individual 8€ excl. tax 20 K 50 K Emails sent/received per month All features in Free, plus: Inbound email routing…”
- [Official source](https://www.sweego.io/pricing): “Valid for 12 months No setup fee *List of supported countries 20 € approximately 500 SMS or 0.040 per SMS* 50 € approximately 1,250 SMS or 0.040 per SMS* 100 € approximately 2,500 SMS or 0.040 per SMS* 200 € approximatel…”

### `services/synadia-nats` — confirmed

Personal limits, no-card signup and $49/$199 paid plans match. Pricing docs explicitly drop active/new connections after a Personal network-data overage until reset or upgrade. Free-account GDPR/support caveats remain supported.

- [Official source](https://www.synadia.com/cloud): “No credit card required Try Free Plan Details → What's included: 2 Accounts 10 Connections 2 Leaf Nodes 1 MiB Message Size 10 GiB Network Data 5 GiB Storage Upgrade anytime within your account when you're ready to scale…”
- [Official source](https://docs.synadia.com/cloud/pricing): “For the Personal plan, if an overage occurs, active and new client connections will be dropped until the next billing cycle, or the plan is upgraded. Support ​ Support is available with annual Enterprise contracts and in…”

### `services/tailscale` — confirmed

Current Personal pricing confirms six users, unlimited user devices, 50 tagged resources, three ACL groups and 1,000 ephemeral minutes. FAQ still says resource enforcement is not active and describes forthcoming notice; commercial use, custom-domain trials and paid-seat billing remain distinguished.

- [Official source](https://tailscale.com/pricing): “Up to 6 users Up to 3 ACL groups Up to 50 tagged resources to start 1,000 mins per month for ephemeral resources Ephemeral resources enable short-lived workloads like CI/CD runners and Kubernetes pods. Premium plan is id…”
- [Official source](https://tailscale.com/pricing): “we are currently not enforcing the hard limits or overages of ACL groups, multiple tailnets, tagged resources, and ephemeral resources. Over the next few months, we’ll begin introducing these limits, along with added vis…”

### `services/tavily-ai` — confirmed

1,000 no-card credits and a stop at exhaustion remain explicit. Rate-limit documentation confirms 100 development versus 1,000 production requests/minute, 100 crawl requests/minute, and paid/PAYGO eligibility for production keys.

- [Official source](https://www.tavily.com/pricing): “If you exhaust your monthly credits, requests will stop until your credits reset or you upgrade to a paid plan. Paid plans provide higher monthly limits and uninterrupted usage. Power your AI with real-time web search Tr…”
- [Official source](https://docs.tavily.com/documentation/rate-limits): “Development 100 Production 1,000 ​ Crawl Endpoint Rate Limits The crawl endpoint has a separate rate limit that applies to both development and production keys: Environment Requests per minute (RPM) Development 100 Produ…”

### `services/teamplify` — confirmed

Five-user Free plan, 30-day history, integrations, paid API access, and 14/30-day hosted/self-hosted trials match. Sixth-user enforcement and the permanent Free card rule remain qualified rather than inferred from trial signup.

- [Official source](https://teamplify.com/pricing): “Up to 5 users Included in this plan: 30-day historical data analysis All integrations Single Sign-On All core features with basic functionality. Learn more Get started Team $ 2.5 user/mo billed yearly No user limit Every…”
- [Official source](https://teamplify.com): “Unlimited 14-day trial for larger teams. No credit card required. Get Started On-premises Self-hosted version that runs behind your firewall. Unlimited 30-day trial . No credit card required. Get Started Interactive tour…”

### `services/telemetry-tracker` — confirmed

250k monthly ingest units, 14-day retention, one project/two keys and no-card Free plan match. Published billing details explicitly reject ingest with HTTP 429 at quota with no overage charge; paid plan figures match.

- [Official source](https://telemetry-tracker.com/pricing): “new ingest is rejected with HTTP 429 ( monthly_ingest_quota ) until the next month or a higher plan. Stored data stays for the plan retention window. There is no overage charge. Free €0 forever For solo developers and si…”
- [Official source](https://telemetry-tracker.com/pricing): “250K ingest units / month 14-day retention 1 project · 2 API keys Community support Most popular Pro 15 € per org / month For shipping teams that need reliable signal. Start with Pro 5M ingest units / month 90-day retent…”

### `services/templatefox` — confirmed

60 monthly PDFs/images, three templates, 50-page/2 MB caps and ten requests/minute match. FAQ confirms no-card signup, quota stop, no automatic overage, refund of failed generation and one-credit-per-output accounting.

- [Official source](https://templatefox.com/pricing): “PDF generation simply stops until credits reset or you upgrade — no automatic overage charge, no surprise bill. Upgrading is instant and prorated, so new credits land the moment you hit pay and your workflow picks back u…”
- [Official source](https://templatefox.com/pricing): “the credit is refunded automatically. You only pay for PDFs that come back successfully. Does a 50-page PDF cost the same as a 1-page PDF? Yes. 1 PDF = 1 credit , regardless of page count — the same goes for images via t…”

### `services/tempmaildetector-com` — confirmed

200 monthly lookups without a card, $0.005 paid lookups and non-expiring purchased credits match. API docs explicitly return 402/no_lookups_remaining at exhaustion and provide the quota endpoint.

- [Official source](https://tempmaildetector.com/): “200 lookups/month Resets monthly WordPress & Ghost plugins No card required to start Get started Pro $0.005 per lookup (excl. vat) Lookups never expire Pay as you go Automated Attack Protection WordPress & Ghost plugins…”
- [Official source](https://tempmaildetector.com/documentation): “402 Payment Required : Your account has run out of lookups. 500 Internal Server Error : An error occurred on the server. Good to know: invalid_domain_or_mx is returned when we cannot resolve the domain to a mail server.…”

### `services/terrateam` — confirmed

Stategraph Free retains three users, 50 monthly runs, one worker and 30-day audit retention. Trial auto-downgrade and card-free entry are explicit; self-hosted active-user enforcement is correctly separated from unspecified Cloud run exhaustion.

- [Official source](https://stategraph.com/pricing): “3 users, 50 runs a month, 1 concurrent worker 30-day audit retention Community support Start free No credit card needed No limits Orchestration Pro $12,000 / year $1,000 a month, billed annually. Everything in Free, no l…”
- [Official source](https://stategraph.com/docs/get-started/editions): “first 3 users who run a plan or apply in a calendar month keep working all month. For other users, the plan or apply does not run. Orchestration posts an Open Source Tier Limit Reached comment on the pull request that li…”

### `services/tidb-cloud` — confirmed

The organization total of 25+25 GiB and 250M RUs is correctly split across up to five eligible instances. Official spend-limit docs confirm connection restriction at quota and card-plus-spend-limit requirements for paid capacity; regional price caveats remain.

- [Official source](https://www.pingcap.com/pricing/): “25 GiB row storage 25 GiB columnar storage 250M Request Units Per organization, across up to five eligible instances. Rates Beyond the Free Allowance Request Units From $0.10 /million RUs Row storage From $0.20 /GiB-mont…”
- [Official source](https://docs.pingcap.com/tidbcloud/manage-serverless-spend-limit): “immediately denies any new connection attempts until you increase the quota or the usage is reset upon the start of a new month. Existing connections established before reaching the quota will remain active but will expe…”

### `services/timecamp` — confirmed

Free unlimited users/projects and the annual Starter price match. Current pricing still lists token-billed AI with the $6 estimate and $10 trial credits; conflicting integration eligibility and Free AI activation remain qualified.

- [Official source](https://www.timecamp.com/pricing/): “Free forever plan Including: Timesheets Web, desktop & mobile apps Unlimited projects Unlimited users 2-factor authentication AI Time Tracker i Estimated token usage is about $6 per user/month for time entry suggestions.…”
- [Official source](https://www.timecamp.com/pricing/): “Estimated token usage is about $6 per user/month for time entry suggestions. Free trial includes $10 in credits. billed by token usage Attendance Calendar Invoicing Excel reports export Attendance Time-off Unlimited task…”

### `services/tinacms` — corrected

Corrected Free roles from two to three, added 100 GB monthly bandwidth, moved Editorial Workflow eligibility from obsolete Team Plus to Team, and clarified AI is coming soon. Two users, unlimited documents, 100 MB assets and published paid prices remain; card/enforcement remain unknown.

- [Official source](https://tina.io/pricing): “2 users 3 roles CLI Community support 100 GB bandwidth per month Team For growing teams $24 / project / month $290 billed annually (save $58) Start Team Plan Everything in Free, plus: Everything in Free, plus: 3 users Up…”
- [Official source](https://tina.io/pricing): “Editorial Workflow AI features (coming soon) 500 GB bandwidth per month Business For premium support $249 / project / month $2,990 billed annually (save $598) Start Business Plan Everything in Team, plus: Everything in T…”

### `services/tinybird` — confirmed

Free compute/storage/request limits and $25 LLM credits match. Docs explicitly impose HTTP 429 beyond burst capacity and an LLM stop until the next cycle; daily-query exhaustion remains qualified and paid overages remain scoped to paid plans.

- [Official source](https://www.tinybird.co/docs/forward/pricing/free): “This is a hard limit. Requests that exceed the burst capacity return HTTP 429. Max threads : Queries through API Endpoints and the Query API use at most 1 thread. See Max threads . LLM usage : Soft stop when you exhaust…”
- [Official source](https://www.tinybird.co/pricing): “1k requests per day 10 GB included storage Community support Compare plans Learn more about pricing Trusted in production by engineers at... Developer Starting at $25 /month Start building SaaS Custom Estimate your price…”

### `services/tinypng-api` — confirmed

500 no-payment-detail monthly compressions, quota-stop message, paid rates and additional counts for resizing/converting/S3 match. Official reference confirms S3 saves each add another compression.

- [Official source](https://tinypng.com/pricing/api): “Your monthly limit has been exceeded. You can either wait for the next calendar month when your free 500 compressions reset, or upgrade your account. We offer two upgrade options: 1. Pay-per-compression : billed monthly…”
- [Official source](https://tinypng.com/developers/reference): “Each upload will be counted as an additional compression. Example S3 request You can store a compressed image to S3 by using the URL that was returned in the Location header. A JSON body with the bucket information and a…”

### `services/toggled-dev` — confirmed

Pricing confirms one free project, ten toggles, unlimited clients/MAU, two environments/two seats, realtime updates and no card. PRO quotas and $49 price match; exact quota-exhaustion behavior remains unpublished and qualified.

- [Official source](https://www.toggled.dev/pricing): “No credit card required. Subscribe to PRO plans to increase service quotas. Contact us for ENTERPRISE plan if you would like to host our serverless platform in your private AWS environment. FREE Single project Unlimited…”
- [Official source](https://www.toggled.dev/pricing): “Up to 10 feature toggles per project Up to 2 environments per project 2 seats included Data residency Users segmentation Session stickiness Realtime notifications Unlimited MAU USE FOR FREE Role Based Access Control Embe…”

## Partial comparisons — retained dates

### `services/statuspile`

Repository confirms the MIT-licensed provider dashboard, more than 30 providers, and Auth0 configuration saving. The hosted page returns only its title, so current hosted no-card/free availability could not be independently established.

- [Official source](https://github.com/dogsbodytech/statuspile): “With over 30 providers currently available, we’ll be adding more over the coming months. We also encourage you to add your go-to services too. Create a dashboard in seconds. login using your favourite platform to save yo…”

Outstanding: Render the hosted app or read current official hosted-service terms; do not equate the repository license with hosted availability.

### `services/survicate`

Help pages confirm 25 monthly responses, three users, stopped collection at quota, no Free export and conflicting storage figures. The fetched pricing page exposes FAQ questions but not the answers previously cited for one active survey and 30-day retention; those claims cannot be reconfirmed.

- [Official source](https://help.survicate.com/en/articles/8299893-survicate-free-account): “The free account allows you to collect 25 survey responses every month. You can store and analyze up to 1000 responses on all active surveys (enabled and disabled; responses in archived surveys are not counted) with a li…”

Outstanding: Render the pricing FAQ or obtain another official source for 30-day retention and the one-active-survey claim; reconcile the differing storage limits.

### `services/tldraw-com`

Official SDK pricing confirms a 100-day trial, production licensing and free hobby-license option. The hosted whiteboard page is thin and was not rendered before the transport failure; app-specific no-account/sharing/no-paid-tier claims remain unconfirmed.

- [Official source](https://tldraw.dev/pricing): “100-day free trial. Need to go to production? Start with a free trial or apply for an annual license. The SDK License Get full access to the tldraw SDK for your product. Multiplayer sync included. Commercial license for…”

Outstanding: Render the separate tldraw.com application to check account-free access and sign-in-to-share behavior; do not conflate SDK terms with the hosted whiteboard.

### `services/tolgee`

Pricing supports the free 30,000-word/three-seat plan with no card, but billing, self-hosting and organization-limit pages failed when the environment transport broke. The 10k MT allowance, exact Free stops and ten-seat self-hosting rule cannot be fully compared.

- [Official source](https://tolgee.io/pricing): “30 000 words 3 seats €0 Get started for free No credit card required On-Premises On-Premises Self-hosted Tolgee for your organization For teams that need to keep all data on their own infrastructure due to security polic…”

Outstanding: Fetch current organization billing and self-hosting docs after environment recovery to verify MT credits, limit enforcement and self-hosted seat count.

## Attempted only — no current source comparison

Each request below returned the shared environment HTTP 503 response. Re-fetch pricing and all cited billing/limit sources after transport recovery; these IDs must not be counted as reviewed.

| Entry | Official queue source | Attempted source URLs |
| --- | --- | ---: |
| `services/tomtom-maps` | [https://docs.tomtom.com/pricing](https://docs.tomtom.com/pricing) | 3 |
| `services/transfernow` | [https://www.transfernow.net/en](https://www.transfernow.net/en) | 2 |
| `services/trashmail-com` | [https://mail.aionda.com/](https://mail.aionda.com/) | 3 |
| `services/trigger-dev` | [https://trigger.dev/pricing](https://trigger.dev/pricing) | 5 |
| `services/trtc-tencent-rtc` | [https://trtc.io/pricing](https://trtc.io/pricing) | 6 |
| `services/tugboat` | [https://www.tugboatqa.com/pricing](https://www.tugboatqa.com/pricing) | 7 |
| `services/turso` | [https://turso.tech/pricing](https://turso.tech/pricing) | 5 |
| `services/twilio` | [https://www.twilio.com/en-us/pricing](https://www.twilio.com/en-us/pricing) | 4 |
| `services/twist-com` | [https://twist.com/pricing](https://twist.com/pricing) | 4 |
| `services/tyk` | [https://tyk.io/pricing/](https://tyk.io/pricing/) | 3 |
| `services/typeform` | [https://www.typeform.com/pricing](https://www.typeform.com/pricing) | 5 |
| `services/typesense-cloud` | [https://cloud.typesense.org/pricing/calculator](https://cloud.typesense.org/pricing/calculator) | 6 |
| `services/umami-cloud` | [https://umami.is/pricing](https://umami.is/pricing) | 5 |
| `services/unkey` | [https://www.unkey.com/pricing](https://www.unkey.com/pricing) | 6 |
| `services/unpkg` | [https://unpkg.com/](https://unpkg.com/) | 1 |
| `services/uptimerobot` | [https://uptimerobot.com/pricing/](https://uptimerobot.com/pricing/) | 4 |
| `services/uptimetoolbox-com` | [https://www.uptimetoolbox.com/](https://www.uptimetoolbox.com/) | 3 |
| `services/userforge-com` | [https://userforge.com/](https://userforge.com/) | 3 |
| `services/v0-dev` | [https://v0.app/pricing](https://v0.app/pricing) | 7 |
| `services/vaadin` | [https://vaadin.com/pricing](https://vaadin.com/pricing) | 4 |
| `services/val-town` | [https://www.val.town/pricing](https://www.val.town/pricing) | 7 |
| `services/vercel` | [https://vercel.com/pricing](https://vercel.com/pricing) | 6 |
| `services/vercel-blob` | [https://vercel.com/docs/vercel-blob/usage-and-pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing) | 5 |
| `services/vercel-edge-functions` | [https://vercel.com/pricing](https://vercel.com/pricing) | 5 |
| `services/vercel-serverless-functions` | [https://vercel.com/pricing](https://vercel.com/pricing) | 5 |
| `services/verimail-io` | [https://verimail.io/pricing](https://verimail.io/pricing) | 3 |
| `services/virtual-machines` | [https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account?icid=azurefreeaccount) | 6 |
| `services/visual-crossing-weather` | [https://www.visualcrossing.com/weather-data-pricing/](https://www.visualcrossing.com/weather-data-pricing/) | 5 |
| `services/vonage-video-api` | [https://developer.vonage.com/en/video/overview](https://developer.vonage.com/en/video/overview) | 4 |
| `services/watchgoose` | [https://watchgoose.com/pricing/](https://watchgoose.com/pricing/) | 3 |
| `services/weatherapi-com` | [https://www.weatherapi.com/pricing](https://www.weatherapi.com/pricing) | 3 |
| `services/weaviate-cloud` | [https://weaviate.io/pricing](https://weaviate.io/pricing) | 5 |
| `services/web3forms` | [https://docs.web3forms.com/](https://docs.web3forms.com/) | 3 |
| `services/webflow` | [https://developers.webflow.com/](https://developers.webflow.com/) | 4 |
| `services/webhook-relay` | [https://webhookrelay.com/pricing/](https://webhookrelay.com/pricing/) | 3 |
| `services/webhook-site` | [https://webhook.site/](https://webhook.site/) | 3 |
| `services/webscraping-ai` | [https://webscraping.ai/](https://webscraping.ai/) | 3 |
| `services/webvizio` | [https://webvizio.com/pricing/](https://webvizio.com/pricing/) | 6 |
| `services/weights-biases` | [https://coreweave.com/forge-pricing](https://coreweave.com/forge-pricing) | 7 |
| `services/what-the-diff` | [https://whatthediff.ai/pricing](https://whatthediff.ai/pricing) | 4 |
| `services/windmill-dev` | [https://www.windmill.dev/pricing](https://www.windmill.dev/pricing) | 5 |
| `services/wistia-com` | [https://wistia.com/pricing](https://wistia.com/pricing) | 6 |
| `services/wolfram-language` | [https://support.wolfram.com/53990](https://support.wolfram.com/53990) | 4 |
| `services/workos` | [https://workos.com/pricing](https://workos.com/pricing) | 4 |
| `services/wundergraph` | [https://wundergraph.com/pricing](https://wundergraph.com/pricing) | 3 |
| `services/xurrent-imr` | [https://www.xurrent.com/pricing/incident-management-response](https://www.xurrent.com/pricing/incident-management-response) | 4 |
| `services/zenable` | [https://www.zenable.io/pricing](https://www.zenable.io/pricing) | 5 |
| `services/zenscrape` | [https://zenscrape.com/](https://zenscrape.com/) | 2 |
| `services/zerotier` | [https://www.zerotier.com/pricing/](https://www.zerotier.com/pricing/) | 4 |
| `services/zilliz-cloud` | [https://zilliz.com/pricing](https://zilliz.com/pricing) | 8 |
| `services/zoho-meeting` | [https://www.zoho.com/meeting/pricing.html](https://www.zoho.com/meeting/pricing.html) | 5 |
| `services/zoom-video-sdk` | [https://zoom.us/pricing/developer](https://zoom.us/pricing/developer) | 3 |
| `services/zulip` | [https://zulip.com/plans/](https://zulip.com/plans/) | 6 |
| `services/zuplo` | [https://zuplo.com/pricing](https://zuplo.com/pricing) | 5 |
| `tools/1password` | [https://1password.com/pricing/business](https://1password.com/pricing/business) | 7 |
| `tools/abstract-api` | [https://www.abstractapi.com/pricing](https://www.abstractapi.com/pricing) | 4 |
| `tools/apify` | [https://apify.com/pricing](https://apify.com/pricing) | 6 |
| `tools/appcircle` | [https://appcircle.io/pricing](https://appcircle.io/pricing) | 6 |
| `tools/appetize` | [https://appetize.io/pricing](https://appetize.io/pricing) | 5 |
| `tools/appsmith` | [https://www.appsmith.com/pricing](https://www.appsmith.com/pricing) | 3 |
| `tools/asana` | [https://asana.com/pricing](https://asana.com/pricing) | 5 |
| `tools/avo` | [https://www.avo.app/pricing](https://www.avo.app/pricing) | 5 |
| `tools/azure-api-management` | [https://azure.microsoft.com/en-us/pricing/details/api-management/](https://azure.microsoft.com/en-us/pricing/details/api-management/) | 6 |
| `tools/azure-automation` | [https://azure.microsoft.com/en-us/pricing/details/automation/](https://azure.microsoft.com/en-us/pricing/details/automation/) | 7 |
| `tools/azure-security-center` | [https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/](https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/) | 4 |
| `tools/browserstack` | [https://www.browserstack.com/pricing](https://www.browserstack.com/pricing) | 6 |
| `tools/bytebase` | [https://www.bytebase.com/pricing/](https://www.bytebase.com/pricing/) | 4 |
| `tools/cal-com` | [https://cal.com/pricing](https://cal.com/pricing) | 6 |

## Validation

The root review runs the complete repository checks after combining batches. Targeted checks completed here: content depth for both corrected entries (2/2), answer/category-copy tests (9/9), and content depth with fetched numeric evidence for all 28 completed comparisons (28/28). The evidence check supplements the source comparison; matching figures alone do not establish their meaning.
