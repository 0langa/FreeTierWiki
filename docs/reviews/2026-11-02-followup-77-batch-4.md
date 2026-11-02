# Issue77 follow-up — batch4 (2026-11-02)

Assigned100 entries: 37 completed comparisons (28 confirmed, 9 corrected), 1 partial correction, and 62 other unresolved entries. Pollinations has the supported partial correction, with its verification date retained; 63 comparisons remain incomplete.

Each completed comparison checks the full entry against current official text; status200, matching numbers, or a source hash alone was not treated as review. Unknown policies and explicit source conflicts remain qualified. Only completed comparisons advance lastVerified; information corrections also advance lastUpdated. No provider change date was inferred.

The source collector initially obtained useful evidence for entries northflank through proton-pass. From pub-sub onward, unrelated destinations returned HTTP503 from the environment proxy with “transport failure reason: immediate connect error: Invalid argument”. A controlled recovery probe succeeded, but the central serial retry immediately failed again. These are environment transport failures, not provider outages. Paste.sh remains thin, and Pipedream documentation returns404; the transport failure prevented alternate-source/browser follow-up. Pollinations’ current news page is a thin shell.

## Per-entry findings

### services/northflank

**confirmed; complete.** Sandbox limits, nonproduction guidance, BYOC costs and existing card/project-count conflicts agree.

- [https://northflank.com/pricing](https://northflank.com/pricing): “box Free No card needed Start free 2 services, 2 jobs, and 1 database Up to $20/mo of resources on Northflank Cloud 1 BYOC cluster, up to 12 vCPU and 48 GB Always on, no sleeping Pay as you go Usage-based From $0.01667 per ”
- [https://northflank.com/docs/v1/application/billing/pricing-on-northflank](https://northflank.com/docs/v1/application/billing/pricing-on-northflank): “ts, or test new ideas. However, it should not be used for production applications. Please note, if you choose to bring your own cloud (BYOC), you will still incur charges from your cloud provider. For a complete breakdown o”


### services/notion

**confirmed; complete.** Free individual/team block distinction, 5MB uploads, 7-day history, guest allowance and three-day block grace period agree with pricing and help.

- [https://www.notion.com/pricing](https://www.notion.com/pricing): “ videos and file attachments up to 5 MB each. Upgrade to a paid plan to upload files up to 5 GB each. File uploads Up to 5 MB Up to 5 GB Up to 5 GB Up to 5 GB Restore your page to a previous version. Page hist”
- [https://www.notion.com/help/understanding-block-usage](https://www.notion.com/help/understanding-block-usage): “’t worry! We automatically offer a three-day grace period when your workspace hits 1,000 blocks to help you figure out the right next step. What are my options if I don't want to upgrade to a paid plan? If you pref”


### services/novu

**corrected; complete.** Confirmed workflow allowances and retention; corrected no-throttling attribution to the current billing guide, while retaining Free overage-policy qualifications.

- [https://novu.co/pricing](https://novu.co/pricing): “our first notifications. Includes: 10,000 workflow runs / month All channels: Email, In-app, SMS, Chat, Push US + EU data residency Up to 20 workflows 2 environments (Dev + Prod) Activity feed retention: 24 hour”
- [https://docs.novu.co/platform/developer/limits](https://docs.novu.co/platform/developer/limits): “re Headless hooks Build a Workflow Workflows Create a Workflow Configure Workflow Add And Configure Steps Add Notification Content Trigger Workflow Monitor and Debug Workflow Usage Advanced Features Integrate Chann”


- [https://docs.novu.co/platform/account/billing](https://docs.novu.co/platform/account/billing): “Novu does not stop or throttle your notifications. Additional usage rolls into on-demand pricing on paid plans, or is billed at your contract rate on Enterprise. See What happens when I exceed my limit? be”

### services/nuclino

**confirmed; complete.** Free 50 items, three canvases and 2GB; paid history, team billing and no-card 14-day trial remain accurate.

- [https://www.nuclino.com/pricing](https://www.nuclino.com/pricing): “sion of Nuclino. GET STARTED Up to 50 items Up to 3 canvases 2GB total storage Starter /user/month Everything you need to get started. START 14-DAY FREE TRIAL No credit card required Everything in Free, plus: Unli”
- [https://www.nuclino.com/pricing](https://www.nuclino.com/pricing): “ing you need to get started. START 14-DAY FREE TRIAL No credit card required Everything in Free, plus: Unlimited items Unlimited canvases Admin tools Publishing 30-day version history 10GB storage per user Busin”


### services/numverify

**confirmed; complete.** Current pricing confirms 100 monthly requests, noncommercial use and HTTPS; card and Free over-limit uncertainty remain accurately qualified.

- [https://numverify.com/product](https://numverify.com/product): “ Get Free API Key Get Free API Key 100 API Requests + 0.0000000000 Each Non-Commercial Use No Support Number Validation Real-time Carrier & Line Type Detection Country & Location Detection 256-bit HTTPS Encry”
- [https://numverify.com/product](https://numverify.com/product): “untry & Location Detection 256-bit HTTPS Encryption Get Free API Key Get Free API Key Basic Plan Standard Kit $ 14.99 / mo $ 161.99 / yearly 10 % Discount Sign Up Sign Up 5,000 API Requests + 0.0119920000 Each ”


### services/nx-cloud

**confirmed; complete.** Hobby 50,000 credits, five contributors and 10 agents remain accurate; hard stop and monthly reset supported by CI documentation.

- [https://nx.app/pricing](https://nx.app/pricing): “it card required. What's Included? 50,000 credits (resets monthly) 5 complimentary contributors 10 concurrent CI connections All workers resource types Basic analytics Community support Start for Free Recommende”
- [https://nx.dev/ci](https://nx.dev/ci): “” Yes. Nx Cloud starts on the free Hobby plan, which includes 50,000 credits per month, 5 contributors, and 10 concurrent CI connections, with no credit card. Nx itself is free and open source too. Task running”


### services/okta

**confirmed; complete.** Integrator nonproduction limits, paid minimum, name/logo permission and conflicting 90/180-day inactivity policies remain accurately qualified.

- [https://www.okta.com/pricing/](https://www.okta.com/pricing/): “n-production environment for up to 10 active users. The trial does not expire; however, orgs deactivate after 180 days of inactivity unless you submit an app to the OIN. How does Okta define a Monthly Active User? A Mont”
- [https://developer.okta.com/terms/](https://developer.okta.com/terms/): “gs will be deactivated if they are inactive for 90 days, unless Integrator submits an Integrator Application to the Okta Integration Network. 11.2 Termination. This Agreement may be terminated for any of the following reasons”


### services/onesignal

**confirmed; complete.** 1,000 mobile MAU, email/web-push allowances, tags/segments and 24-hour upgrade grace agree with current official sources.

- [https://onesignal.com/pricing](https://onesignal.com/pricing): “stom Custom Web Push Notifications Max 10,000 subscribers per send $0.004 per web push subscriber Custom Custom SMS / RCS Available Available Purchasable w/ volume based discounting Purchasable w/ volume based discounting Campa”
- [https://onesignal.com/blog/whats-changing-on-onesignals-free-plan/](https://onesignal.com/blog/whats-changing-on-onesignals-free-plan/): “board. If you go over, you'll have 24 hours to upgrade before sending pauses. Upgrading is instant, with no downtime, and pricing scales with your usage. You can check exact numbers with our pricing calculator , and accounts”


### services/onlineornot-com

**corrected; complete.** Corrected Pro starting price and included monitors from $15/10 to $25/35; Hobby allowances unchanged and policy uncertainty retained.

- [https://onlineornot.com/pricing/](https://onlineornot.com/pricing/): “eams with production applications. from $25/mo Unlimited users 30 second check interval 35 monitors included 3,000 browser check runs included SMS, webhooks, and on-call integrations Status page included Start tri”
- [https://onlineornot.com/pricing/](https://onlineornot.com/pricing/): “ted users 30 second check interval 35 monitors included 3,000 browser check runs included SMS, webhooks, and on-call integrations Status page included Start trial Enterprise Ideal for large-scale and high traffic app”


### services/open-meteo

**confirmed; complete.** Free noncommercial rate limits, fractional call accounting, attribution, no signup and potential IP blocking agree with sources; monthly enforcement caveat retained.

- [https://open-meteo.com/en/pricing](https://open-meteo.com/en/pricing): “mited ✅ Unlimited Monthly Limit ⚠️ 300.000 calls / month ⚠️ 1M calls / month ⚠️ 5M calls / month ✅ >50M calls / month Weather Forecast APIs Air Quality API Elevation API Flood API Geocoding API Marine API ✅ ✅ ✅ ✅”
- [https://open-meteo.com/en/terms](https://open-meteo.com/en/terms): “nditions . We reserve the right to block applications and IP addresses that misuse our service without prior notice. Rate limits are applied by IP addresses and application. If you are using providers like Verc”


### services/opencage

**confirmed; complete.** Testing-only trial limits, no card, UTC reset, hard quota response, inactive-account deletion and no Geosearch trial agree.

- [https://opencagedata.com/pricing](https://opencagedata.com/pricing): “e trial free while testing Sign Up 2,500 requests/day 1 request/sec files up to 100 rows no credit card required store data permanently testing only 1 only one API key no IP restriction no CORS restriction best effort suppo”
- [https://opencagedata.com/pricing](https://opencagedata.com/pricing): “: inactive free trial accounts are deleted after three months. Can I just use multiple free trial accounts? No, don’t do that . The free trial is a way to test our service - do not use it for anything mission critical. If you need ”


### services/openrouter

**corrected; complete.** Made limits, answer and FAQ consistently reflect the documented one-credit tolerance around the nominal 10-credit higher daily allowance.

- [https://openrouter.ai/docs/api-reference/limits.md](https://openrouter.ai/docs/api-reference/limits.md): “ daily ceiling is granted starting one credit below the table's threshold (currently {FREE_MODEL_CREDITS_THRESHOLD - 1} credits); an account that has purchased fewer credits than that reports `is_free_tier: false` togethe”
- [https://openrouter.ai/docs/api-reference/limits.md](https://openrouter.ai/docs/api-reference/limits.md): “interval": "weekly", "resets_at": "2026-10-12T00:00:00.000Z", "include_byok": false }, { "scope": "member", "guardrail_id": "6b1d2c3e-4f50-4a61-9b72-83c4d5e6f708", "budget_id": null, "limit_usd": 50, "spend_”


### services/openstatus

**corrected; complete.** Changed unsupported hard-cap flag to unknown: pricing promises notice and contact when approaching/exceeding limits, without defining exact enforcement.

- [https://www.openstatus.dev/pricing](https://www.openstatus.dev/pricing): “f I exceed my plan limits? We will never stop your monitors or status pages without notice. If you approach or exceed a limit, we will reach out to help you pick the right plan. Add-ons like extra status pages and m”
- [https://www.openstatus.dev/pricing](https://www.openstatus.dev/pricing): “ with GitHub or Google and start a 14-day Starter trial from Settings > Billing, no credit card required. If you have not added a card by then, the workspace returns to the free Hobby plan. Do you offer refunds?”


### services/ory

**confirmed; complete.** Developer environment/seat scope, social connections and annual paid pricing agree; unspecified card/enforcement remain qualified.

- [https://www.ory.com/pricing/](https://www.ory.com/pricing/): “ial Connections Social Connections Developer: Unlimited Social Connections Production: Unlimited Social Connections Growth: Unlimited Social Connections Enterprise: Unlimited Custom Social Connections Custom Social Connection”
- [https://www.ory.com/pricing/](https://www.ory.com/pricing/): “ Network Production monthly yearly $770 /year Buy Production Everything you need to thoroughly test and explore the landscape of identity security, at a highly competitive price. SaaS All top-tier security fea”


### services/ovh-ie-ssl-gateway

**confirmed; complete.** Free domain/certificate/metrics scope, paid options and ordering restrictions agree; payment-method uncertainty retained.

- [https://www.ovhcloud.com/en-ie/security/ssl-gateway/](https://www.ovhcloud.com/en-ie/security/ssl-gateway/): “ins and higher? Free solution: No. Only domains up to level 3 are authorised (www.example.org). Advanced solutions: Yes. Level 4 domains and higher (blog.france.example.org) are authorised starting from the “Advanced” solution only”
- [https://docs.ovhcloud.com/en/guides/web-cloud/ssl-gateway/order](https://docs.ovhcloud.com/en/guides/web-cloud/ssl-gateway/order): “the OVHcloud infrastructure within 3 days. Warning Without modifying your DNS zone within 3 days, your order will be cancelled. Info Case 1: Your DNS zone is managed by OVHcloud shared DNS servers. If your NIC h”


### services/pagecrawl-io

**confirmed; complete.** Six pages, 220 monthly checks, hourly checks, history, no-card offer, quota pause and document/visual monitoring details agree.

- [https://pagecrawl.io/pricing](https://pagecrawl.io/pricing): “et started for free Pages: Up to 6 Checks: Up to 220 Frequency: Up to 60 min Users: 1 Workspaces: 1 History: 90 days Sign up Free Standard $ 13.33 / month $160 billed annually Up to 200 pages 100 - 300 pages For simple mon”
- [https://pagecrawl.io/pricing](https://pagecrawl.io/pricing): “ If you exceed your plan's limits, checks will be paused. If you're approaching your limit for the month, you will see a notice, giving you the opportunity to take action before the limits are reached. I need to monitor thousa”


### services/parseur

**confirmed; complete.** 20 pages monthly, mailbox/field allowance, retention and stop-at-credit-limit behavior agree with current pricing; no-card trial supported.

- [https://parseur.com/pricing](https://parseur.com/pricing): “er. Documents to process per month 20 + pages / month 20 + pages / month Free plan 0€ High volume? Monthly price in EUR , when paid annually Start on our free tier, which includes 20 pages every month. 0€ / ”
- [https://parseur.com/pricing](https://parseur.com/pricing): “s when I reach my credit limit? At 90% usage, we email you so you can upgrade or pause parsing before running out. At 100%, new documents stop being processed and are marked as Quota exceeded. To start parsin”


### services/parsio-io

**confirmed; complete.** Sandbox monthly credits, engine-specific charges, expiry and stop behavior agree; team allowance discrepancy remains qualified.

- [https://parsio.io/pricing](https://parsio.io/pricing): “ Free No credit card required Free 30 credits / mo Start for free 15 pages · 30 OCR 4 powerful parser engines Export to Excel, CSV, Google Sheets & more Advanced post-processing AI code assistant for post-processing”
- [https://parsio.io/pricing](https://parsio.io/pricing): “ount can still receive emails, but they won't be parsed until the next billing period. Alternatively, you can upgrade your subscription or enable early plan renewal to immediately top up your credits. You can also re-process ”


### services/paste-sh

**unresolved; attempted-only.** Both editor and about page return thin shells; encryption, size, retention and account policies cannot currently be compared.

- Remaining: Obtain a readable official about page or browser rendering; confirm all published offer and security/retention claims.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://paste.sh/](https://paste.sh/) (HTTP200, thin); [https://paste.sh/about](https://paste.sh/about) (HTTP200, thin)

### services/permit-io

**corrected; complete.** Changed blanket hard-cap flag to unknown, consistent with unpublished MAU/object enforcement; documented Cloud PDP HTTP429 rate caps remain distinguished.

- [https://permit.io/pricing](https://permit.io/pricing): “ Community Start Now Authorization MAU 1000 Tenants 20 Authorization Queries No Limit Roles 25 Resource Types 50 Condition Sets 5 Role Assignments 2,000 Groups 20 Resource Instances 2,000 Relationship Tuples 2,000”
- [https://docs.permit.io/concepts/pdp/cloud-pdp-capabilities/](https://docs.permit.io/concepts/pdp/cloud-pdp-capabilities/): “eds a limit, the Cloud PDP returns HTTP 429 Too Many Requests . Endpoint Method Limit /allowed/bulk POST 200 req/min /access/v1/evaluations POST 200 req/min /access/v1/search/* POST 300 req/min /user-permissions P”


### services/phare-io

**confirmed; complete.** Hobby 100,000 events, 10 AI summaries, no card, no SMS, 10% buffer and monitoring pause all supported by pricing and quota docs.

- [https://phare.io/pricing](https://phare.io/pricing): “eam members, integrations, alerts. 100 000 monitoring events No additional usage 10 AI incident summaries No additional usage Public status pages Unlimited custom domains with SSL No SMS / voice alerts Build your”
- [https://phare.io/pricing](https://phare.io/pricing): “? Free and paid accounts include a 10% overage buffer above your authorized quota. You will be notified before your account utilizes overage quota, as well as before it is exhausted. After this, your monitoring will ”


### services/phase-two

**confirmed; complete.** 30-day Starter trial then $149/month, unlimited users with 5,000 sizing guidance, two custom domains and soft sizing limits remain accurate.

- [https://phasetwo.io/pricing/hosting/](https://phasetwo.io/pricing/hosting/): “eams getting auth into production. $149 /month Free for 30 days, then $149/mo. Cancel anytime. Start for free Unlimited users · sized for 5K active users Dedicated, independently provisioned cluster 95% uptime”
- [https://phasetwo.io/pricing/hosting/](https://phasetwo.io/pricing/hosting/): “w many users can be on a cluster . Nothing is blocked, throttled, or surcharged when you go past the sizing for your tier — but performance may degrade, usually as higher latency on the token endpoints. We monitor CPU and m”


### services/pijul-com

**corrected; complete.** Qualified the no-card guarantee: public registration form has no payment field but no explicit policy. Free Nest hosting and lack of published quotas remain supported.

- [https://pijul.org/](https://pijul.org/): “s own repository hosting platform. free hosting ↗ see it in action no silent corruption resolution as a patch selective push unrecord git pijul git $ printf 'A\nB\n' > f.txt git $ git add f.txt git $ git commit -m 'ba”
- [https://nest.pijul.com/](https://nest.pijul.com/): “word: [login] [forgot password?] # new account handle: email: password: confirm password: [register] © 2022 — 2026 The Pijul team · pijul.org · privacy · terms”


### services/pinata

**confirmed; complete.** Free storage/files/bandwidth/requests, API rates, warnings and stop at 25% overage remain accurate; card policy stays unknown.

- [https://pinata.cloud/pricing](https://pinata.cloud/pricing): “ FILE COUNT BANDWIDTH REQUESTS 1GB 500 files 10GB 10K 1TB Extra storage @ $0.07 per GB 5 Million 500GB Extra bandwidth @ $0.10 per GB 1M Extra requests @ $0.20 per 10k 5TB Extra storage @ $0.035 per GB 10 Million 2”
- [https://docs.pinata.cloud/account-management/billing](https://docs.pinata.cloud/account-management/billing): “ccount has gone above the limit by 25%. ​ Payment Info Clicking the ‘Manage Billing’ button will show you the current card in use and if it’s the default. If you want to remove a card, then you will need to a”


### services/pinecone

**confirmed; complete.** Starter numeric allowances, object and monthly API errors, region, backup exclusions, no-card and community support agree.

- [https://www.pinecone.io/pricing/](https://www.pinecone.io/pricing/): “ricing Dimensions Database Storage Up to 2 GB Up to 10 GB Unlimited $0.33/GB/mo Unlimited $0.33/GB/mo Write Units Up to 2M/mo Up to 5M/mo Unlimited $4-$4.50 per million (varies by cloud and region) Unlimited $6-$6.7”
- [https://docs.pinecone.io/reference/api/database-limits/object-limits](https://docs.pinecone.io/reference/api/database-limits/object-limits): “ect limit, API operations return a 403 - QUOTA_EXCEEDED . Upgrade your plan to increase the limit. If a higher plan still doesn’t cover what you need, contact Support with details about your use case, since most object limits”
- [https://www.pinecone.io/blog/turn-azure-data-into-an-ai-ready-knowledge-base/](https://www.pinecone.io/blog/turn-azure-data-into-an-ai-ready-knowledge-base/): “econe account at app.pinecone.io — no credit card required. The free Starter tier includes 2 GB of storage, 1 million monthly reads and writes, and 5 million embedding tokens per month. Need to upgrade to Standard? Subscribe thr”


### services/pipedream

**unresolved; partial.** Current Connect development free offer is readable, but the cited Workflows and pricing documentation return404; existing sunset dates and workflow-credit policies remain unconfirmed.

- [https://pipedream.com/pricing](https://pipedream.com/pricing): “grations go to production. Free $0 Free, no credit card required Everything you need to build and test Get started Includes: Every feature, in development 3,000+ connectors 10,000+ prebuilt tools and triggers Unlimited team members Co”

- Remaining: Verify Workflows/String shutdown dates, trial/credit limits and Connect production pricing against migrated official documentation.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://pipedream.com/pricing](https://pipedream.com/pricing) (HTTP200); [https://pipedream.com/docs/workflows](https://pipedream.com/docs/workflows) (HTTP404, thin); [https://pipedream.com/docs/pricing/](https://pipedream.com/docs/pricing/) (HTTP404, thin); [https://pipedream.com/docs/](https://pipedream.com/docs/) (HTTP404, thin); [https://pipedream.com/docs/connect/quickstart](https://pipedream.com/docs/connect/quickstart) (HTTP404, thin); [https://pipedream.com/](https://pipedream.com/) (HTTP200)

### services/pirsch

**confirmed; complete.** 30-day no-card trial, paid pricing and limit grace period agree.

- [https://pirsch.io/pricing](https://pirsch.io/pricing): “irsch Analytics free of charge for 30 days with no credit card required. Pick the best Google Analytics alternative , setting up your first website only takes a few minutes. Get Started For Free Pirsch Analytics Made and hosted with”
- [https://pirsch.io/pricing](https://pirsch.io/pricing): “ collect data for your sites for a further five days. To regain access to your statistics and avoid gaps, you must upgrade your plan within those five days or wait until your usage limit is reset. Which payment options are”


### services/plausible

**corrected; complete.** Corrected Starter and Business paid data retention to no retention limit and scoped post-trial deletion to analytics data; trial, expiration, pricing and traffic-overage policy otherwise confirmed.

- [https://plausible.io/](https://plausible.io/): “h Custom Start free trial One site No retention limit Intuitive, fast and privacy-friendly dashboard Email/Slack reports Google Analytics import Goals and custom events Saved Segments Annotations Growth /year /month $14 /mo”
- [https://plausible.io/docs/trial](https://plausible.io/docs/trial): “so we can't charge you. Your trial never converts into a paid subscription automatically. This also means there's nothing to cancel. If you don't want to continue after the trial, you don't need to do anything. What hap”
- [https://plausible.io/docs/subscription-plans](https://plausible.io/docs/subscription-plans): “ If pageviews exceed your tier for two consecutive months , we'll notify you and ask you to upgrade to a tier that fits your new traffic levels. The upgrade is pro-rated so you only pay the difference for the remaining time on ”


### services/ploi-io

**confirmed; complete.** Free server/site/deployment allowance, five-day no-card trial and external hosting requirements agree.

- [https://ploi.io/pricing](https://ploi.io/pricing): “es Unlimited sites Unlimited sites Site Deployments 5 per month Unlimited deployments Unlimited deployments Unlimited deployments Team Management Site Monitoring File Explorer Status Pages Suspend Sites Access to support Clone sites ”
- [https://ploi.io/pricing](https://ploi.io/pricing): “. Create an account and enjoy your 5-day free trial — no credit card required. Start free trial Explore features Services Server installation Site management Server monitoring Server insights Site monitoring Load balancin”


### services/plunk

**confirmed; complete.** Monthly free email allowance, attachment accounting, branding, hard stops, inbound drops and paid activation charge agree.

- [https://useplunk.com/pricing](https://useplunk.com/pricing): “le, transparent pricing Free plan: 1,000 emails per month. Paid plan: $0.001 per email. Unlimited contacts, no hidden fees. Free forever 1,000 emails / mo No credit card required Transactional emails Workflow automati”
- [https://docs.useplunk.com/concepts/billing](https://docs.useplunk.com/concepts/billing): “single card verification charge of 2.00 on your card, in your billing currency. It's credited back to your account balance in full , and that credit is applied against your usage before any invoice is charged.”
- [https://docs.useplunk.com/concepts/billing](https://docs.useplunk.com/concepts/billing): “2 Payment Required with error code BILLING_LIMIT_EXCEEDED . Your application should handle this gracefully — typically by queuing the work or surfacing an error to the user. Inbound emails are dropped silently for the affected ”


### services/pocket-alert

**confirmed; complete.** Free daily messages/device/webhook limits, retention, critical-alert restrictions and non-delivery above quota agree.

- [https://pocketalert.app/pricing](https://pocketalert.app/pricing): “arly Save 2 months Free $0 / month 50 daily messages 1 devices 1 applications 1 webhooks 1 forms 7-day webhook history Support up to 96h Get started Most popular Starter $6 / month 1000 daily messages 3 devices 5 applicati”
- [https://pocketalert.app/pricing](https://pocketalert.app/pricing): “her notifications for that day are not delivered. The counter resets the next day. If you keep hitting the limit, upgrade to a plan with a higher daily volume. How much do the paid plans cost? Paid plans start at $6/mo”


### services/poeditor

**confirmed; complete.** Free1,000 strings/five contributors, trial, paid prices and OSS offer agree; unknown string enforcement retained.

- [https://poeditor.com/pricing/](https://poeditor.com/pricing/): “ted localization projects, and add up to 5 contributors. Will I get a trial period to test paid features? Yes. It’s enabled automatically when you create the first project on your Free account. It does not require a credit ca”
- [https://poeditor.com/pricing/](https://poeditor.com/pricing/): “does not require a credit card and lasts for 10 days. When the Free Trial is over, you can continue with a paid plan, or stick to the Free plan. How do I know what plan to get? You'll need to know how many strings you need”


### services/pollinations-ai

**corrected; partial.** Corrected App Key wording from obsolete raw-key hourly allowance to current identifiers that cannot authenticate; free earned credits and paid-only eligibility supported, but current sources do not establish wallet-estimate/negative-balance rules.

- [https://github.com/pollinations/pollinations](https://github.com/pollinations/pollinations): “s your app in Pollinations Connect Can't authenticate requests Stable Secret sk_ Server-side only No rate limits Stable ⚠️ Never expose sk_ keys in client-side code, git repos, or public URLs 💡 Building an app? Use Pollinations Pay ”
- [https://github.com/pollinations/pollinations](https://github.com/pollinations/pollinations): “ble : Earn Pollen by contributing, without a credit card Transparent & Ethical : Inspect our code and discuss how the platform works Community-Driven : Build tools with other developers, creators, and AI enthusiasts Interconne”
- [https://raw.githubusercontent.com/pollinations/pollinations/main/APIDOCS.md](https://raw.githubusercontent.com/pollinations/pollinations/main/APIDOCS.md): “ when the model needs paid Pollen; Quest Pollen can't pay for it. Same field as on `/models`. | | `data[].pricing` | `object` | Pollen rates per billed unit. Paid tool calls an agent makes are billed on top. An agent without `base_mod”

- Remaining: Obtain readable billing documentation for estimated/final charges, negative balances, per-key spending behavior and current earning eligibility; news dashboard is a thin shell.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://enter.pollinations.ai/news](https://enter.pollinations.ai/news) (HTTP200, thin); [https://github.com/pollinations/pollinations](https://github.com/pollinations/pollinations) (HTTP200); [https://raw.githubusercontent.com/pollinations/pollinations/main/APIDOCS.md](https://raw.githubusercontent.com/pollinations/pollinations/main/APIDOCS.md) (HTTP200); [https://gen.pollinations.ai/docs](https://gen.pollinations.ai/docs) (HTTP200, thin); [https://pollinations.ai/](https://pollinations.ai/) (HTTP200, thin)

### services/positionstack

**confirmed; complete.** 100-request personal-use allowance, HTTPS, paid feature/pricing differences and uncertain Free overage/card policies agree.

- [https://positionstack.com/pricing](https://positionstack.com/pricing): “onth $0 per month Get Free API Key 100 Requests No Support Non-Commercial Use Forward Geocoding Reverse Geocoding HTTPS Encryption Basic Basic level - commercial use with advanced features and up to 100,000 requests. $9.99 per m”
- [https://positionstack.com/pricing](https://positionstack.com/pricing): “ount dashboard as soon as at least 75%, 90%, and 100% of the monthly allowed API volume is reached. After reaching 100% of the allowance, overages fees will apply so we make sure you won’t experience any disruptions and you”


### services/postmark

**confirmed; complete.** 100 monthly messages, no overages, six users/45-day retention, per-message limits and paid entry point agree.

- [https://postmarkapp.com/pricing](https://postmarkapp.com/pricing): “100 emails/month 100 emails/month. No overages allowed in this plan. Perfect for: Testing your integration Evaluating Postmark's deliverability Side projects with low volume Start Free Trial Basic $15.00 /mo For solo develop”
- [https://postmarkapp.com/developer](https://postmarkapp.com/developer): “headers, and attachments combined. 50 recipients per message, combined. That's your total across To, CC, and BCC Browse the docs Integration Get running fast with an official or community Postmark library. Official Postmark librar”


### services/prefectcloud

**corrected; complete.** Qualified unsupported precise deployment-stop behavior; current pricing supports allowances and no-card signup but not exact deployment or Serverless enforcement.

- [https://www.prefect.io/pricing/](https://www.prefect.io/pricing/): “ready. Workflow scheduling 2 users Up to 5 deployments 500 min of Prefect Serverless Workflow observability Logging & alerting 7 days run retention Start Deploying Starter $100 /mo Bring your own compute. Full infrastructure”
- [https://www.prefect.io/blog/introducing-two-new-self-serve-plans-for-prefect-cloud](https://www.prefect.io/blog/introducing-two-new-self-serve-plans-for-prefect-cloud): “run a workflow in minutes for free—no credit card required. Upgrade to Starter or Team : When you need more seats, additional workflows, or just want more headroom, upgrade in a few clicks. Scale with Confidence : As your worklo”


### services/prisma-postgres

**corrected; complete.** Removed unsupported paid-spend-limit enabled-by-default assertion; confirmed Free shared quotas, connection reservation and query stop/grace rules.

- [https://www.prisma.io/pricing](https://www.prisma.io/pricing): “database data transfer, and a hard spend limit you set. Typical stack (Neon + Vercel) $ 110 – 270 /month at ~50K MAU Billing Billed through Vercel via the Marketplace, or as separate Neon and Vercel bills Database data trans”
- [https://www.prisma.io/docs/postgres/faq](https://www.prisma.io/docs/postgres/faq): “lan, your Prisma Postgres database stops accepting read and write requests. You can upgrade to a paid plan to restore access, usually within a minute, or wait until your query allowance resets at the start of the next calendar month. I”


### services/prismic

**confirmed; complete.** Repository allowance, bandwidth lock, no-card policy and paid annual Starter pricing agree; framework details also supported by current vendor guide despite unavailable auxiliary docs.

- [https://prismic.io/pricing](https://prismic.io/pricing): “y paid annually Get started 1 user 4 million API calls a month No overages 100 GB of built-in CDN bandwidth a month No overages 2 locales Visual Page Builder Unlimited documents Unlimited types Unlimited assets Image optimiz”
- [https://prismic.io/blog/best-free-headless-cms](https://prismic.io/blog/best-free-headless-cms): “maintain permanent free tiers with no credit card required to start. The self-hosted options (Strapi, Directus, Payload, Ghost) are open source and permanently free as software. You pay only for infrastructure costs, never software licen”


### services/proton-mail

**confirmed; complete.** Free storage/onboarding, daily messages, folders/labels, desktop trial and storage/downgrade restrictions agree.

- [https://proton.me/support/get-started-mail](https://proton.me/support/get-started-mail): “ting our starter checklist in your first 18 days. The checklist is made up of three easy tasks which help you discover your new inbox and its privacy features. Once you complete the checklist, we’ll upgrade your storag”
- [https://proton.me/pricing](https://proton.me/pricing): “’s storage limit? View details You won't be able to send or receive emails, add events, upload files, or perform actions that require storage space. You can free up space by deleting unwanted files, attachments, and emails. Alternatively”


### services/proton-pass

**confirmed; complete.** No-card free scope, three 2FA items, two shared vaults/three people and paid-sharing distinction agree; existing marketing/support discrepancy retained.

- [https://proton.me/support/proton-pass-plans-explained](https://proton.me/support/proton-pass-plans-explained): “nd desktop apps Password generator Up to three 2FA items 10 hide-my-email aliases Alerts for weak and reused passwords Passkeys supported on all devices Easy password import Access to Proton Mail Free (new window) , Proton Cal”
- [https://proton.me/support/pass-android-share](https://proton.me/support/pass-android-share): “ Pass Free: Create and share up to two vaults, with up to three people per vault (including yourself) Any paid Proton Pass plan: Create and share up to 50 vaults, with up to 10 people per vault (including yourself) ”


### services/pub-sub

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://cloud.google.com/pubsub/pricing](https://cloud.google.com/pubsub/pricing) (HTTP503, thin); [https://cloud.google.com/pubsub/docs/overview](https://cloud.google.com/pubsub/docs/overview) (HTTP503, thin); [https://cloud.google.com/pubsub/docs/publish-receive-messages-console](https://cloud.google.com/pubsub/docs/publish-receive-messages-console) (HTTP503, thin); [https://cloud.google.com/pubsub/docs](https://cloud.google.com/pubsub/docs) (HTTP503, thin); [https://cloud.google.com/pubsub](https://cloud.google.com/pubsub) (HTTP503, thin)

### services/pubnub-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.pubnub.com/pricing/](https://www.pubnub.com/pricing/) (HTTP503, thin); [https://www.pubnub.com/docs](https://www.pubnub.com/docs) (HTTP503, thin); [https://www.pubnub.com/docs/pricing/overview](https://www.pubnub.com/docs/pricing/overview) (HTTP503, thin); [https://www.pubnub.com/docs/general/setup/account-setup](https://www.pubnub.com/docs/general/setup/account-setup) (HTTP503, thin); [https://www.pubnub.com/](https://www.pubnub.com/) (HTTP503, thin)

### services/pulsetic

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://pulsetic.com/pricing](https://pulsetic.com/pricing) (HTTP503, thin); [https://pulsetic.com/status-pages/](https://pulsetic.com/status-pages/) (HTTP503, thin); [https://pulsetic.com](https://pulsetic.com) (HTTP503, thin); [https://help.pulsetic.com/article/217-set-up-your-account](https://help.pulsetic.com/article/217-set-up-your-account) (HTTP503, thin); [https://docs.pulsetic.com](https://docs.pulsetic.com) (HTTP503, thin)

### services/pulumi

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.pulumi.com/pricing/](https://www.pulumi.com/pricing/) (HTTP503, thin); [https://www.pulumi.com/docs/iac/get-started/](https://www.pulumi.com/docs/iac/get-started/) (HTTP503, thin); [https://www.pulumi.com/docs/iac/download-install/](https://www.pulumi.com/docs/iac/download-install/) (HTTP503, thin); [https://www.pulumi.com/docs/iac/get-started/aws/create-project/](https://www.pulumi.com/docs/iac/get-started/aws/create-project/) (HTTP503, thin); [https://www.pulumi.com/docs/](https://www.pulumi.com/docs/) (HTTP503, thin); [https://www.pulumi.com/](https://www.pulumi.com/) (HTTP503, thin)

### services/pumble

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://pumble.com/pricing](https://pumble.com/pricing) (HTTP503, thin); [https://pumble.com](https://pumble.com) (HTTP503, thin); [https://pumble.com/help/getting-started/](https://pumble.com/help/getting-started/) (HTTP503, thin); [https://pumble.com/help/getting-started/introduction-to-pumble/register-at-pumble/](https://pumble.com/help/getting-started/introduction-to-pumble/register-at-pumble/) (HTTP503, thin); [https://pumble.com/help](https://pumble.com/help) (HTTP503, thin)

### services/qdrant

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://qdrant.tech/pricing/](https://qdrant.tech/pricing/) (HTTP503, thin); [https://qdrant.tech/documentation/cloud/create-cluster/](https://qdrant.tech/documentation/cloud/create-cluster/) (HTTP503, thin); [https://qdrant.tech/documentation/quickstart-cloud/](https://qdrant.tech/documentation/quickstart-cloud/) (HTTP503, thin); [https://qdrant.tech/documentation/](https://qdrant.tech/documentation/) (HTTP503, thin); [https://qdrant.tech/](https://qdrant.tech/) (HTTP503, thin)

### services/quickchart

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://quickchart.io/pricing/](https://quickchart.io/pricing/) (HTTP503, thin); [https://quickchart.io/documentation/faq/](https://quickchart.io/documentation/faq/) (HTTP503, thin); [https://quickchart.io/documentation/usage/handling-errors/](https://quickchart.io/documentation/usage/handling-errors/) (HTTP503, thin); [https://quickchart.io/documentation/](https://quickchart.io/documentation/) (HTTP503, thin); [https://quickchart.io](https://quickchart.io) (HTTP503, thin)

### services/railway

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://railway.com/pricing](https://railway.com/pricing) (HTTP503, thin); [https://docs.railway.com/pricing/free-trial](https://docs.railway.com/pricing/free-trial) (HTTP503, thin); [https://docs.railway.com/pricing/plans](https://docs.railway.com/pricing/plans) (HTTP503, thin); [https://docs.railway.com/quick-start](https://docs.railway.com/quick-start) (HTTP503, thin); [https://docs.railway.com/](https://docs.railway.com/) (HTTP503, thin); [https://railway.app/](https://railway.app/) (HTTP503, thin)

### services/readme

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://readme.com/pricing](https://readme.com/pricing) (HTTP503, thin); [https://docs.readme.com/main/docs/payment-and-billing-info](https://docs.readme.com/main/docs/payment-and-billing-info) (HTTP503, thin); [https://docs.readme.com/main/docs/plans-and-pricing](https://docs.readme.com/main/docs/plans-and-pricing) (HTTP503, thin); [https://docs.readme.com](https://docs.readme.com) (HTTP503, thin); [https://readme.com](https://readme.com) (HTTP503, thin)

### services/reddit-data-api

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data](https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data) (HTTP503, thin); [https://www.reddit.com/r/redditdev/comments/1wubcvf/moving_data_api_apps_to_the_developer_platform/](https://www.reddit.com/r/redditdev/comments/1wubcvf/moving_data_api_apps_to_the_developer_platform/) (HTTP503, thin); [https://www.reddit.com/r/modnews/comments/1wubgvt/continuing_our_infrastructure_updates_whats/](https://www.reddit.com/r/modnews/comments/1wubgvt/continuing_our_infrastructure_updates_whats/) (HTTP503, thin); [https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki](https://support.reddithelp.com/hc/en-us/articles/16160319875092-Reddit-Data-API-Wiki) (HTTP503, thin); [https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy) (HTTP503, thin); [https://developers.reddit.com/docs/guides/migrate/public-api](https://developers.reddit.com/docs/guides/migrate/public-api) (HTTP503, thin); [https://developers.reddit.com/](https://developers.reddit.com/) (HTTP503, thin)

### services/reddit-devvit

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://developers.reddit.com/](https://developers.reddit.com/) (HTTP503, thin); [https://developers.reddit.com/docs/](https://developers.reddit.com/docs/) (HTTP503, thin); [https://developers.reddit.com/docs/guides/faq](https://developers.reddit.com/docs/guides/faq) (HTTP503, thin); [https://developers.reddit.com/docs/capabilities/devvit-web/devvit_web_overview](https://developers.reddit.com/docs/capabilities/devvit-web/devvit_web_overview) (HTTP503, thin); [https://developers.reddit.com/docs/guides/migrate/public-api](https://developers.reddit.com/docs/guides/migrate/public-api) (HTTP503, thin)

### services/redis-cloud

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://redis.io/pricing/](https://redis.io/pricing/) (HTTP503, thin); [https://redis.io/docs/latest/operate/rc/subscriptions/](https://redis.io/docs/latest/operate/rc/subscriptions/) (HTTP503, thin); [https://redis.io/docs/latest/operate/rc/rc-quickstart/](https://redis.io/docs/latest/operate/rc/rc-quickstart/) (HTTP503, thin); [https://redis.io/docs/latest/operate/rc/databases/create-database/create-free-database/](https://redis.io/docs/latest/operate/rc/databases/create-database/create-free-database/) (HTTP503, thin); [https://redis.io/docs/latest/operate/rc/subscriptions/view-essentials-subscription/essentials-plan-details/](https://redis.io/docs/latest/operate/rc/subscriptions/view-essentials-subscription/essentials-plan-details/) (HTTP503, thin); [https://docs.redis.com/latest/rc/](https://docs.redis.com/latest/rc/) (HTTP503, thin); [https://redis.io/](https://redis.io/) (HTTP503, thin)

### services/reducto

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://reducto.ai/pricing](https://reducto.ai/pricing) (HTTP503, thin); [https://docs.reducto.ai/faq/credit-usage-overview](https://docs.reducto.ai/faq/credit-usage-overview) (HTTP503, thin); [https://docs.reducto.ai/quickstart](https://docs.reducto.ai/quickstart) (HTTP503, thin); [https://docs.reducto.ai](https://docs.reducto.ai) (HTTP503, thin); [https://reducto.ai](https://reducto.ai) (HTTP503, thin)

### services/render

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://render.com/pricing](https://render.com/pricing) (HTTP503, thin); [https://render.com/docs/free](https://render.com/docs/free) (HTTP503, thin); [https://render.com/docs/your-first-deploy](https://render.com/docs/your-first-deploy) (HTTP503, thin); [https://render.com/docs](https://render.com/docs) (HTTP503, thin); [https://render.com/](https://render.com/) (HTTP503, thin)

### services/repsy-io

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://repsy.io/pricing](https://repsy.io/pricing) (HTTP503, thin); [https://docs.repsy.io/](https://docs.repsy.io/) (HTTP503, thin); [https://docs.repsy.io/getting-started/what-is-repsy/](https://docs.repsy.io/getting-started/what-is-repsy/) (HTTP503, thin); [https://docs.repsy.io/getting-started/understanding-public-vs-private/](https://docs.repsy.io/getting-started/understanding-public-vs-private/) (HTTP503, thin); [https://docs.repsy.io/npm/publishing-an-npm-package/](https://docs.repsy.io/npm/publishing-an-npm-package/) (HTTP503, thin); [https://repsy.io](https://repsy.io) (HTTP503, thin)

### services/resend

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://resend.com/pricing](https://resend.com/pricing) (HTTP503, thin); [https://resend.com/products/transactional-emails](https://resend.com/products/transactional-emails) (HTTP503, thin); [https://resend.com/docs/introduction](https://resend.com/docs/introduction) (HTTP503, thin); [https://resend.com/docs/send-with-nodejs](https://resend.com/docs/send-with-nodejs) (HTTP503, thin); [https://resend.com/docs/knowledge-base/account-quotas-and-limits](https://resend.com/docs/knowledge-base/account-quotas-and-limits) (HTTP503, thin); [https://resend.com/docs](https://resend.com/docs) (HTTP503, thin); [https://resend.com](https://resend.com) (HTTP503, thin)

### services/reviewable-io

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://reviewable.io/pricing](https://reviewable.io/pricing) (HTTP503, thin); [https://docs.reviewable.io](https://docs.reviewable.io) (HTTP503, thin); [https://docs.reviewable.io/registration](https://docs.reviewable.io/registration) (HTTP503, thin); [https://reviewable.io/](https://reviewable.io/) (HTTP503, thin)

### services/rightfeature

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://rightfeature.com/](https://rightfeature.com/) (HTTP503, thin); [https://rightfeature.com/features](https://rightfeature.com/features) (HTTP503, thin)

### services/robohash

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://robohash.org/](https://robohash.org/) (HTTP503, thin); [https://github.com/e1ven/Robohash](https://github.com/e1ven/Robohash) (HTTP503, thin)

### services/rocket-chat

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://docs.rocket.chat/docs/our-plans](https://docs.rocket.chat/docs/our-plans) (HTTP503, thin); [https://rocket.chat/pricing](https://rocket.chat/pricing) (HTTP503, thin); [https://docs.rocket.chat/docs/deploy-rocketchat](https://docs.rocket.chat/docs/deploy-rocketchat) (HTTP503, thin); [https://docs.rocket.chat/docs/deploy-with-docker-docker-compose](https://docs.rocket.chat/docs/deploy-with-docker-docker-compose) (HTTP503, thin); [https://docs.rocket.chat/](https://docs.rocket.chat/) (HTTP503, thin); [https://rocket.chat/](https://rocket.chat/) (HTTP503, thin)

### services/rollbar-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://rollbar.com/pricing/](https://rollbar.com/pricing/) (HTTP503, thin); [https://rollbar.com/pricing-for-agents](https://rollbar.com/pricing-for-agents) (HTTP503, thin); [https://rollbar.com/](https://rollbar.com/) (HTTP503, thin); [https://docs.rollbar.com/docs](https://docs.rollbar.com/docs) (HTTP503, thin); [https://docs.rollbar.com/docs/nodejs](https://docs.rollbar.com/docs/nodejs) (HTTP503, thin)

### services/ruttl-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://ruttl.com/pricing](https://ruttl.com/pricing) (HTTP503, thin); [https://ruttl.com/support/](https://ruttl.com/support/) (HTTP503, thin); [https://ruttl.com/](https://ruttl.com/) (HTTP503, thin)

### services/sanity

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.sanity.io/pricing](https://www.sanity.io/pricing) (HTTP503, thin); [https://www.sanity.io/docs/platform-management/plans-and-payments](https://www.sanity.io/docs/platform-management/plans-and-payments) (HTTP503, thin); [https://www.sanity.io/docs/studio/installation](https://www.sanity.io/docs/studio/installation) (HTTP503, thin); [https://www.sanity.io/docs](https://www.sanity.io/docs) (HTTP503, thin); [https://www.sanity.io](https://www.sanity.io) (HTTP503, thin)

### services/scalekit

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.scalekit.com/pricing/auth-for-saas](https://www.scalekit.com/pricing/auth-for-saas) (HTTP503, thin); [https://scalekit.com/pricing](https://scalekit.com/pricing) (HTTP503, thin); [https://docs.scalekit.com](https://docs.scalekit.com) (HTTP503, thin); [https://docs.scalekit.com/authenticate/fsa/quickstart/](https://docs.scalekit.com/authenticate/fsa/quickstart/) (HTTP503, thin); [https://www.scalekit.com](https://www.scalekit.com) (HTTP503, thin)

### services/scalr

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://scalr.com/pricing/](https://scalr.com/pricing/) (HTTP503, thin); [https://docs.scalr.io/docs/pricing-faq](https://docs.scalr.io/docs/pricing-faq) (HTTP503, thin); [https://docs.scalr.io/docs/creating-environments](https://docs.scalr.io/docs/creating-environments) (HTTP503, thin); [https://docs.scalr.io/docs/creating-a-workspace](https://docs.scalr.io/docs/creating-a-workspace) (HTTP503, thin); [https://docs.scalr.io/docs/introduction](https://docs.scalr.io/docs/introduction) (HTTP503, thin); [https://scalr.com/](https://scalr.com/) (HTTP503, thin)

### services/scraper-s-proxy

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2/pricing](https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2/pricing) (HTTP503, thin); [https://docs.rapidapi.com/v2.0.0/docs/api-pricing](https://docs.rapidapi.com/v2.0.0/docs/api-pricing) (HTTP503, thin); [https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2](https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2) (HTTP503, thin); [https://docs.rapidapi.com/docs/consumer-quick-start-guide](https://docs.rapidapi.com/docs/consumer-quick-start-guide) (HTTP503, thin); [https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2/details](https://rapidapi.com/scapers-proxy-scapers-proxy-default/api/scrapers-proxy2/details) (HTTP503, thin)

### services/scrapingant

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://scrapingant.com/](https://scrapingant.com/) (HTTP503, thin); [https://docs.scrapingant.com/](https://docs.scrapingant.com/) (HTTP503, thin); [https://docs.scrapingant.com/request-response-format](https://docs.scrapingant.com/request-response-format) (HTTP503, thin); [https://docs.scrapingant.com/errors](https://docs.scrapingant.com/errors) (HTTP503, thin); [https://docs.scrapingant.com/credits-cost](https://docs.scrapingant.com/credits-cost) (HTTP503, thin)

### services/screenshotlayer

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://screenshotlayer.com/product](https://screenshotlayer.com/product) (HTTP503, thin); [https://screenshotlayer.com/documentation](https://screenshotlayer.com/documentation) (HTTP503, thin); [https://screenshotlayer.com/](https://screenshotlayer.com/) (HTTP503, thin)

### services/searchly

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.searchly.com/pricing](https://www.searchly.com/pricing) (HTTP503, thin); [https://www.searchly.com/](https://www.searchly.com/) (HTTP503, thin); [https://www.searchly.com/docs](https://www.searchly.com/docs) (HTTP503, thin)

### services/seatable

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://seatable.com/prices/](https://seatable.com/prices/) (HTTP503, thin); [https://seatable.com/help/how-team-members-affect-subscription-costs/](https://seatable.com/help/how-team-members-affect-subscription-costs/) (HTTP503, thin); [https://developer.seatable.com/](https://developer.seatable.com/) (HTTP503, thin); [https://seatable.com/](https://seatable.com/) (HTTP503, thin)

### services/seline

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://seline.com/pricing](https://seline.com/pricing) (HTTP503, thin); [https://seline.com/docs](https://seline.com/docs) (HTTP503, thin); [https://seline.com/](https://seline.com/) (HTTP503, thin)

### services/sematext

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://sematext.com/pricing/](https://sematext.com/pricing/) (HTTP503, thin); [https://sematext.com/docs/](https://sematext.com/docs/) (HTTP503, thin); [https://sematext.com/cost-calculator/](https://sematext.com/cost-calculator/) (HTTP503, thin); [https://sematext.com/](https://sematext.com/) (HTTP503, thin)

### services/sender

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.sender.net/pricing/](https://www.sender.net/pricing/) (HTTP503, thin); [https://help.sender.net/](https://help.sender.net/) (HTTP503, thin); [https://api.sender.net/](https://api.sender.net/) (HTTP503, thin); [https://www.sender.net](https://www.sender.net) (HTTP503, thin)

### services/sendpulse

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://sendpulse.com/pricing](https://sendpulse.com/pricing) (HTTP503, thin); [https://sendpulse.com/pricing/messengers](https://sendpulse.com/pricing/messengers) (HTTP503, thin); [https://sendpulse.com/pricing/webpush](https://sendpulse.com/pricing/webpush) (HTTP503, thin); [https://sendpulse.com/knowledge-base/account-settings/billing/pricing-plan-basics](https://sendpulse.com/knowledge-base/account-settings/billing/pricing-plan-basics) (HTTP503, thin); [https://sendpulse.com/features/chatbot](https://sendpulse.com/features/chatbot) (HTTP503, thin); [https://sendpulse.com/knowledge-base](https://sendpulse.com/knowledge-base) (HTTP503, thin); [https://sendpulse.com](https://sendpulse.com) (HTTP503, thin)

### services/sendstreak

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.sendstreak.com/pricing](https://www.sendstreak.com/pricing) (HTTP503, thin); [https://www.sendstreak.com/](https://www.sendstreak.com/) (HTTP503, thin); [https://www.sendstreak.com/documentation/getting-started/](https://www.sendstreak.com/documentation/getting-started/) (HTTP503, thin)

### services/sentry

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://sentry.io/pricing/](https://sentry.io/pricing/) (HTTP503, thin); [https://docs.sentry.io/](https://docs.sentry.io/) (HTTP503, thin); [https://docs.sentry.io/pricing/](https://docs.sentry.io/pricing/) (HTTP503, thin); [https://docs.sentry.io/platforms/javascript/](https://docs.sentry.io/platforms/javascript/) (HTTP503, thin); [https://sentry.io/](https://sentry.io/) (HTTP503, thin)

### services/serveravatar-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://serveravatar.com/pricing](https://serveravatar.com/pricing) (HTTP503, thin); [https://serveravatar.com/lite/](https://serveravatar.com/lite/) (HTTP503, thin); [https://docs.serveravatar.com](https://docs.serveravatar.com) (HTTP503, thin); [https://serveravatar.com](https://serveravatar.com) (HTTP503, thin)

### services/sevalla

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://sevalla.com/pricing/](https://sevalla.com/pricing/) (HTTP503, thin); [https://docs.sevalla.com/static-sites/overview](https://docs.sevalla.com/static-sites/overview) (HTTP503, thin); [https://docs.sevalla.com/billing/static-site-pricing](https://docs.sevalla.com/billing/static-site-pricing) (HTTP503, thin); [https://docs.sevalla.com/static-sites/get-started/add-a-static-site](https://docs.sevalla.com/static-sites/get-started/add-a-static-site) (HTTP503, thin); [https://docs.sevalla.com](https://docs.sevalla.com) (HTTP503, thin); [https://sevalla.com/static-site-hosting/](https://sevalla.com/static-site-hosting/) (HTTP503, thin)

### services/shields-io

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://shields.io](https://shields.io) (HTTP503, thin); [https://shields.io/docs](https://shields.io/docs) (HTTP503, thin); [https://shields.io/badges](https://shields.io/badges) (HTTP503, thin); [https://github.com/badges/shields](https://github.com/badges/shields) (HTTP503, thin); [https://raw.githubusercontent.com/badges/shields/master/doc/self-hosting.md](https://raw.githubusercontent.com/badges/shields/master/doc/self-hosting.md) (HTTP503, thin)

### services/simple-analytics

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.simpleanalytics.com/pricing](https://www.simpleanalytics.com/pricing) (HTTP503, thin); [https://docs.simpleanalytics.com/](https://docs.simpleanalytics.com/) (HTTP503, thin); [https://www.simpleanalytics.com/](https://www.simpleanalytics.com/) (HTTP503, thin)

### services/simplescraper

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://simplescraper.io/upgrade](https://simplescraper.io/upgrade) (HTTP503, thin); [https://simplescraper.io/docs](https://simplescraper.io/docs) (HTTP503, thin); [https://simplescraper.io/docs/credits](https://simplescraper.io/docs/credits) (HTTP503, thin); [https://simplescraper.io/docs/api-guide](https://simplescraper.io/docs/api-guide) (HTTP503, thin); [https://simplescraper.io](https://simplescraper.io) (HTTP503, thin)

### services/sirv

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://sirv.com/pricing/](https://sirv.com/pricing/) (HTTP503, thin); [https://sirv.com/terms/](https://sirv.com/terms/) (HTTP503, thin); [https://sirv.com/help/articles/how-billing-works/](https://sirv.com/help/articles/how-billing-works/) (HTTP503, thin); [https://sirv.com/help/articles/full-list-of-limits/](https://sirv.com/help/articles/full-list-of-limits/) (HTTP503, thin); [https://sirv.com/help/](https://sirv.com/help/) (HTTP503, thin); [https://sirv.com](https://sirv.com) (HTTP503, thin)

### services/skyvia

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://skyvia.com/pricing/](https://skyvia.com/pricing/) (HTTP503, thin); [https://docs.skyvia.com/account-management/subscription-limits-and-plans-in-more-details.html](https://docs.skyvia.com/account-management/subscription-limits-and-plans-in-more-details.html) (HTTP503, thin); [https://docs.skyvia.com/](https://docs.skyvia.com/) (HTTP503, thin); [https://skyvia.com/](https://skyvia.com/) (HTTP503, thin)

### services/slack

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://slack.com/pricing](https://slack.com/pricing) (HTTP503, thin); [https://slack.com/help/articles/7050776459923-Feature-limitations-on-the-free-version-of-Slack](https://slack.com/help/articles/7050776459923-Feature-limitations-on-the-free-version-of-Slack) (HTTP503, thin); [https://slack.com/help](https://slack.com/help) (HTTP503, thin); [https://slack.com](https://slack.com) (HTTP503, thin)

### services/smart-grow-vault

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://vault.smart-grow.app/pricing](https://vault.smart-grow.app/pricing) (HTTP503, thin); [https://vault.smart-grow.app/](https://vault.smart-grow.app/) (HTTP503, thin); [https://vault.smart-grow.app/docs](https://vault.smart-grow.app/docs) (HTTP503, thin); [https://vault.smart-grow.app/docs/cli](https://vault.smart-grow.app/docs/cli) (HTTP503, thin)

### services/smtpfast

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://smtpfa.st/](https://smtpfa.st/) (HTTP503, thin); [https://smtpfa.st/docs](https://smtpfa.st/docs) (HTTP503, thin)

### services/sns

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://aws.amazon.com/sns/pricing/](https://aws.amazon.com/sns/pricing/) (HTTP503, thin); [https://docs.aws.amazon.com/sns/latest/dg/welcome.html](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) (HTTP503, thin); [https://docs.aws.amazon.com/sns/latest/dg/sns-setting-up.html](https://docs.aws.amazon.com/sns/latest/dg/sns-setting-up.html) (HTTP503, thin); [https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html](https://docs.aws.amazon.com/sns/latest/dg/sns-create-topic.html) (HTTP503, thin); [https://aws.amazon.com/free/free-tier-faqs/](https://aws.amazon.com/free/free-tier-faqs/) (HTTP503, thin); [https://aws.amazon.com/sns/](https://aws.amazon.com/sns/) (HTTP503, thin)

### services/snyk

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://snyk.io/plans/](https://snyk.io/plans/) (HTTP503, thin); [https://snyk.io/lp/snyk-code-checker/](https://snyk.io/lp/snyk-code-checker/) (HTTP503, thin); [https://support.snyk.io/s/article/Snyk-Test-of-PR-failing-due-to-test-limit](https://support.snyk.io/s/article/Snyk-Test-of-PR-failing-due-to-test-limit) (HTTP503, thin); [https://docs.snyk.io/platform-administration/snyk-hierarchy/usage-settings](https://docs.snyk.io/platform-administration/snyk-hierarchy/usage-settings) (HTTP503, thin); [https://docs.snyk.io/snyk-data-and-governance/what-counts-as-a-test](https://docs.snyk.io/snyk-data-and-governance/what-counts-as-a-test) (HTTP503, thin); [https://docs.snyk.io/getting-started/quickstart](https://docs.snyk.io/getting-started/quickstart) (HTTP503, thin); [https://docs.snyk.io/developer-tools/snyk-cli/getting-started-with-the-snyk-cli](https://docs.snyk.io/developer-tools/snyk-cli/getting-started-with-the-snyk-cli) (HTTP503, thin); [https://docs.snyk.io/](https://docs.snyk.io/) (HTTP503, thin); [https://snyk.io/](https://snyk.io/) (HTTP503, thin)

### services/socket

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://socket.dev/pricing](https://socket.dev/pricing) (HTTP503, thin); [https://docs.socket.dev/docs/faq.md](https://docs.socket.dev/docs/faq.md) (HTTP503, thin); [https://docs.socket.dev/reference/quota.md](https://docs.socket.dev/reference/quota.md) (HTTP503, thin); [https://docs.socket.dev/docs/billing](https://docs.socket.dev/docs/billing) (HTTP503, thin); [https://docs.socket.dev/](https://docs.socket.dev/) (HTTP503, thin); [https://docs.socket.dev/docs/socket-for-github](https://docs.socket.dev/docs/socket-for-github) (HTTP503, thin); [https://docs.socket.dev/docs/socket-cli](https://docs.socket.dev/docs/socket-cli) (HTTP503, thin); [https://socket.dev](https://socket.dev) (HTTP503, thin)

### services/solarwinds-incident-response

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.solarwinds.com/it-incident-response-software/pricing](https://www.solarwinds.com/it-incident-response-software/pricing) (HTTP503, thin); [https://documentation.solarwinds.com/en/success_center/incident-response/content/managing-your-squadcast-account/billing-faqs.htm](https://documentation.solarwinds.com/en/success_center/incident-response/content/managing-your-squadcast-account/billing-faqs.htm) (HTTP503, thin); [https://www.solarwinds.com/incident-response](https://www.solarwinds.com/incident-response) (HTTP503, thin); [https://documentation.solarwinds.com/](https://documentation.solarwinds.com/) (HTTP503, thin)

### services/sonarcloud-io

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.sonarsource.com/plans-and-pricing/](https://www.sonarsource.com/plans-and-pricing/) (HTTP503, thin); [https://docs.sonarsource.com/sonarqube-cloud/getting-started](https://docs.sonarsource.com/sonarqube-cloud/getting-started) (HTTP503, thin); [https://docs.sonarsource.com/sonarqube-cloud/getting-started/sign-up](https://docs.sonarsource.com/sonarqube-cloud/getting-started/sign-up) (HTTP503, thin); [https://docs.sonarsource.com/sonarqube-cloud/getting-started/first-analysis](https://docs.sonarsource.com/sonarqube-cloud/getting-started/first-analysis) (HTTP503, thin); [https://sonarcloud.io](https://sonarcloud.io) (HTTP503, thin)

### services/spacelift

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://spacelift.io/pricing](https://spacelift.io/pricing) (HTTP503, thin); [https://docs.spacelift.io](https://docs.spacelift.io) (HTTP503, thin); [https://spacelift.io](https://spacelift.io) (HTTP503, thin)

### services/spike-sh

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://spike.sh/pricing](https://spike.sh/pricing) (HTTP503, thin); [https://spike.sh/](https://spike.sh/) (HTTP503, thin); [https://docs.spike.sh/](https://docs.spike.sh/) (HTTP503, thin)

### services/sqs

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://aws.amazon.com/sqs/pricing/](https://aws.amazon.com/sqs/pricing/) (HTTP503, thin); [https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) (HTTP503, thin); [https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-getting-started.html](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-getting-started.html) (HTTP503, thin); [https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html) (HTTP503, thin); [https://aws.amazon.com/free/free-tier-faqs/](https://aws.amazon.com/free/free-tier-faqs/) (HTTP503, thin); [https://aws.amazon.com/sqs/](https://aws.amazon.com/sqs/) (HTTP503, thin)

### services/sslabs-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/) (HTTP503, thin); [https://www.ssllabs.com/projects/documentation/](https://www.ssllabs.com/projects/documentation/) (HTTP503, thin); [https://www.ssllabs.com/projects/ssllabs-apis/index.html](https://www.ssllabs.com/projects/ssllabs-apis/index.html) (HTTP503, thin); [https://www.ssllabs.com/downloads/Qualys_SSL_Labs_Terms_of_Use.pdf](https://www.ssllabs.com/downloads/Qualys_SSL_Labs_Terms_of_Use.pdf) (HTTP503, thin)

### services/stack-auth

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.hexclave.com/pricing](https://www.hexclave.com/pricing) (HTTP503, thin); [https://docs.hexclave.com](https://docs.hexclave.com) (HTTP503, thin); [https://docs.hexclave.com/guides/getting-started/setup](https://docs.hexclave.com/guides/getting-started/setup) (HTTP503, thin); [https://www.hexclave.com/](https://www.hexclave.com/) (HTTP503, thin)

### services/stadia-maps

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://stadiamaps.com/pricing/](https://stadiamaps.com/pricing/) (HTTP503, thin); [https://docs.stadiamaps.com](https://docs.stadiamaps.com) (HTTP503, thin); [https://stadiamaps.com](https://stadiamaps.com) (HTTP503, thin)

### services/statcounter

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://statcounter.com/pricing/](https://statcounter.com/pricing/) (HTTP503, thin); [https://statcounter.com/support/](https://statcounter.com/support/) (HTTP503, thin); [https://statcounter.com/](https://statcounter.com/) (HTTP503, thin)

### services/statuscake-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://www.statuscake.com/pricing/](https://www.statuscake.com/pricing/) (HTTP503, thin); [https://www.statuscake.com/free-website-monitoring/](https://www.statuscake.com/free-website-monitoring/) (HTTP503, thin); [https://www.statuscake.com/kb/knowledge-base/create-a-basic-website-test/](https://www.statuscake.com/kb/knowledge-base/create-a-basic-website-test/) (HTTP503, thin); [https://developers.statuscake.com/guides/terraform/introduction/](https://developers.statuscake.com/guides/terraform/introduction/) (HTTP503, thin); [https://www.statuscake.com/](https://www.statuscake.com/) (HTTP503, thin)

### services/statusgator-com

**unresolved; attempted-only.** Attempted source retrieval only: every cited source failed during the environment-wide HTTP503 transport outage; no current provider content available for comparison.

- Remaining: Complete official-source comparison of offer, numeric limits, billing/card/cap policies and full entry body after network recovery.
- Verification date retained. Blocker: environment-transport.
- Attempted URLs: [https://statusgator.com/plans](https://statusgator.com/plans) (HTTP503, thin); [https://statusgator.com/](https://statusgator.com/) (HTTP503, thin); [https://statusgator.com/features/cloud-monitoring](https://statusgator.com/features/cloud-monitoring) (HTTP503, thin); [https://statusgator.com/docs](https://statusgator.com/docs) (HTTP503, thin); [https://docs.statusgator.com](https://docs.statusgator.com) (HTTP503, thin)


## Validation

Targeted depth check: 38 edited entries checked, 38 pass. Full answer check found only an unrelated services/deed-page one-sentence error in the shared worktree; no batch4 answer failures. Root agent runs the final shared checks.

Evidence-mode depth check: all 37 completed entries pass (37 checked, 37 pass, 0 fail; numbers checked against fetched pages). No evidence files were rewritten for validation. Source comparison remains the basis for completion; the numeric check is supplementary.
