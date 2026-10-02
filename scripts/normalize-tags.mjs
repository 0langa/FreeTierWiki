import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ALLOWED_EXTENSIONS = new Set([".md", ".mdx"]);

const CANONICAL_TAGS = [
  "api",
  "automation",
  "ai",
  "ml",
  "llm",
  "data",
  "analytics",
  "database",
  "storage",
  "compute",
  "serverless",
  "containers",
  "kubernetes",
  "devops",
  "ci-cd",
  "testing",
  "monitoring",
  "observability",
  "logging",
  "security",
  "auth",
  "identity",
  "privacy",
  "compliance",
  "networking",
  "dns",
  "cdn",
  "cloud",
  "web",
  "frontend",
  "backend",
  "mobile",
  "cli",
  "sdk",
  "docs",
  "open-source",
  "collaboration",
  "productivity",
  "design",
  "ux-ui",
  "video",
  "audio",
  "images",
  "email",
  "messaging",
  "queue",
  "realtime",
  "integration",
  "search",
];

const canonicalSet = new Set(CANONICAL_TAGS);

const exactMap = new Map([
  ["rest", "api"],
  ["graphql", "api"],
  ["grpc", "api"],
  ["openapi", "api"],
  ["webhooks", "integration"],
  ["webhook", "integration"],
  ["workflow", "automation"],
  ["workflows", "automation"],
  ["cicd", "ci-cd"],
  ["ci", "ci-cd"],
  ["cd", "ci-cd"],
  ["pipeline", "ci-cd"],
  ["pipelines", "ci-cd"],
  ["build", "ci-cd"],
  ["deploy", "ci-cd"],
  ["deployment", "ci-cd"],
  ["release", "ci-cd"],
  ["serverless", "serverless"],
  ["functions", "serverless"],
  ["faas", "serverless"],
  ["container", "containers"],
  ["docker", "containers"],
  ["registry", "containers"],
  ["k8s", "kubernetes"],
  ["observability", "observability"],
  ["apm", "observability"],
  ["tracing", "observability"],
  ["log-management", "logging"],
  ["logs", "logging"],
  ["log", "logging"],
  ["oauth", "auth"],
  ["oidc", "auth"],
  ["openid", "auth"],
  ["saml", "auth"],
  ["sso", "auth"],
  ["jwt", "auth"],
  ["mfa", "auth"],
  ["2fa", "auth"],
  ["otp", "auth"],
  ["passwordless", "auth"],
  ["login", "auth"],
  ["authentication", "auth"],
  ["authorization", "auth"],
  ["access-control", "auth"],
  ["rbac", "auth"],
  ["abac", "auth"],
  ["identity", "identity"],
  ["iam", "identity"],
  ["directory", "identity"],
  ["privacy", "privacy"],
  ["compliance", "compliance"],
  ["governance", "compliance"],
  ["policy", "compliance"],
  ["audit", "compliance"],
  ["dns", "dns"],
  ["cdn", "cdn"],
  ["edge", "cdn"],
  ["content-delivery", "cdn"],
  ["static-assets", "cdn"],
  ["cloud", "cloud"],
  ["azure", "cloud"],
  ["aws", "cloud"],
  ["gcp", "cloud"],
  ["google-cloud", "cloud"],
  ["cloudflare", "cloud"],
  ["ibm-cloud", "cloud"],
  ["oracle", "cloud"],
  ["frontend", "frontend"],
  ["backend", "backend"],
  ["mobile", "mobile"],
  ["ios", "mobile"],
  ["android", "mobile"],
  ["flutter", "mobile"],
  ["cli", "cli"],
  ["terminal", "cli"],
  ["sdk", "sdk"],
  ["npm", "sdk"],
  ["pypi", "sdk"],
  ["rubygems", "sdk"],
  ["maven", "sdk"],
  ["gradle", "sdk"],
  ["package-hosting", "sdk"],
  ["artifact-hosting", "sdk"],
  ["documentation", "docs"],
  ["docs", "docs"],
  ["wiki", "docs"],
  ["knowledge-base", "docs"],
  ["reference", "docs"],
  ["tutorial", "docs"],
  ["tutorials", "docs"],
  ["course", "docs"],
  ["courses", "docs"],
  ["education", "docs"],
  ["learning", "docs"],
  ["open-source", "open-source"],
  ["oss", "open-source"],
  ["collaboration", "collaboration"],
  ["communication", "collaboration"],
  ["chat", "collaboration"],
  ["meetings", "collaboration"],
  ["conferencing", "collaboration"],
  ["screen-sharing", "collaboration"],
  ["whiteboard", "collaboration"],
  ["brainstorming", "collaboration"],
  ["team", "collaboration"],
  ["remote", "collaboration"],
  ["remote-work", "collaboration"],
  ["slack", "collaboration"],
  ["discord-alternative", "collaboration"],
  ["productivity", "productivity"],
  ["personal-productivity", "productivity"],
  ["tasks", "productivity"],
  ["kanban", "productivity"],
  ["project-management", "productivity"],
  ["notes", "productivity"],
  ["calendar", "productivity"],
  ["scheduling", "productivity"],
  ["gantt", "productivity"],
  ["roadmap", "productivity"],
  ["time-tracking", "productivity"],
  ["design", "design"],
  ["figma", "design"],
  ["mockup", "design"],
  ["prototyping", "design"],
  ["branding", "design"],
  ["creative", "design"],
  ["art", "design"],
  ["ux", "ux-ui"],
  ["ui", "ux-ui"],
  ["ux-ui", "ux-ui"],
  ["user-experience", "ux-ui"],
  ["accessibility", "ux-ui"],
  ["visual-editor", "ux-ui"],
  ["video", "video"],
  ["streaming", "video"],
  ["webinar", "video"],
  ["audio", "audio"],
  ["voice", "audio"],
  ["speech", "audio"],
  ["transcription", "audio"],
  ["text-to-speech", "audio"],
  ["image", "images"],
  ["images", "images"],
  ["image-processing", "images"],
  ["image-recognition", "images"],
  ["image-generation", "images"],
  ["screenshot", "images"],
  ["screenshots", "images"],
  ["ocr", "images"],
  ["email", "email"],
  ["smtp", "email"],
  ["newsletter", "email"],
  ["deliverability", "email"],
  ["campaigns", "email"],
  ["transactional", "email"],
  ["mailbox", "email"],
  ["email-validation", "email"],
  ["messaging", "messaging"],
  ["sms", "messaging"],
  ["queue", "queue"],
  ["pubsub", "queue"],
  ["kafka", "queue"],
  ["rabbitmq", "queue"],
  ["mqtt", "queue"],
  ["events", "queue"],
  ["event", "queue"],
  ["realtime", "realtime"],
  ["real-time", "realtime"],
  ["websocket", "realtime"],
  ["websockets", "realtime"],
  ["integration", "integration"],
  ["sync", "integration"],
  ["connector", "integration"],
  ["search", "search"],
  ["docssearch", "search"],
  ["docsearch", "search"],
  ["indexing", "search"],
  ["lookup", "search"],
  ["api-testing", "testing"],
  ["visual-testing", "testing"],
  ["visual-regression", "testing"],
  ["regression", "testing"],
  ["load-testing", "testing"],
  ["mock", "testing"],
  ["mocking", "testing"],
  ["selenium", "testing"],
  ["qa", "testing"],
  ["monitoring", "monitoring"],
  ["uptime", "monitoring"],
  ["status", "monitoring"],
  ["status-page", "monitoring"],
  ["alerts", "monitoring"],
  ["alerting", "monitoring"],
  ["error-monitoring", "monitoring"],
  ["error-tracking", "monitoring"],
  ["crash-reporting", "monitoring"],
  ["change-alerts", "monitoring"],
  ["synthetic", "monitoring"],
  ["security", "security"],
  ["secure", "security"],
  ["cybersecurity", "security"],
  ["api-security", "security"],
  ["vulnerability", "security"],
  ["scanner", "security"],
  ["static-analysis", "security"],
  ["code-scanning", "security"],
  ["threat-intelligence", "security"],
  ["threat-detection", "security"],
  ["ddos", "security"],
  ["web-application-firewall", "security"],
  ["network-security", "security"],
  ["sca", "security"],
  ["fraud", "security"],
  ["risk", "security"],
  ["safety", "security"],
  ["web-security", "security"],
  ["networking", "networking"],
  ["network", "networking"],
  ["vpn", "networking"],
  ["proxy", "networking"],
  ["reverse-proxy", "networking"],
  ["gateway", "networking"],
  ["load-balancer", "networking"],
  ["vnet", "networking"],
  ["subnet", "networking"],
  ["private-networking", "networking"],
  ["geo-routing", "networking"],
  ["failover", "networking"],
  ["cdn", "cdn"],
  ["edge", "cdn"],
  ["static", "web"],
  ["static-site", "web"],
  ["static-sites", "web"],
  ["web-hosting", "web"],
  ["app-hosting", "web"],
  ["jamstack", "web"],
  ["ssr", "web"],
  ["ssg", "web"],
  ["website", "web"],
  ["web-app", "web"],
  ["web-apps", "web"],
  ["web-development", "web"],
  ["frontend", "frontend"],
  ["react", "frontend"],
  ["javascript", "frontend"],
  ["typescript", "frontend"],
  ["backend", "backend"],
  ["server", "backend"],
  ["developer-tools", "devops"],
  ["devtools", "devops"],
  ["code-review", "devops"],
  ["code-hosting", "devops"],
  ["repository", "devops"],
  ["source-control", "devops"],
  ["git", "devops"],
  ["github", "devops"],
  ["gitlab", "devops"],
  ["merge-queue", "devops"],
  ["infrastructure", "devops"],
  ["iac", "devops"],
  ["terraform", "devops"],
  ["devops", "devops"],
  ["compute", "compute"],
  ["vm", "compute"],
  ["virtual-machine", "compute"],
  ["virtual-machines", "compute"],
  ["hpc", "compute"],
  ["gpu", "compute"],
  ["batch", "compute"],
  ["database", "database"],
  ["sql", "database"],
  ["mysql", "database"],
  ["postgres", "database"],
  ["postgresql", "database"],
  ["nosql", "database"],
  ["mongodb", "database"],
  ["redis", "database"],
  ["sqlite", "database"],
  ["vector", "database"],
  ["storage", "storage"],
  ["cloud-storage", "storage"],
  ["object-storage", "storage"],
  ["file-storage", "storage"],
  ["block-storage", "storage"],
  ["backup", "storage"],
  ["archive", "storage"],
  ["archival", "storage"],
  ["cold-storage", "storage"],
  ["cold-data", "storage"],
  ["long-term", "storage"],
  ["s3", "storage"],
  ["s3-compatible", "storage"],
  ["blob", "storage"],
  ["nfs", "storage"],
  ["smb", "storage"],
  ["compute", "compute"],
  ["search", "search"],
  ["forms", "productivity"],
  ["survey", "productivity"],
  ["validation", "productivity"],
]);

function normalizeRawTag(raw) {
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapTag(raw) {
  const normalized = normalizeRawTag(raw);
  // Match whole hyphen-separated words only, so "ai" no longer matches "domain" or "email".
  const hit = (re) => new RegExp(`(?:^|-)(?:${re.source.replace(/^\^/, "")})(?:-|$)`).test(normalized);

  if (canonicalSet.has(normalized)) {
    return normalized;
  }

  const direct = exactMap.get(normalized);
  if (direct) {
    return direct;
  }

  if (hit(/^llm|gpt|prompt|text-generation|openai/)) return "llm";
  if (hit(/machine-learning|deep-learning|mlops|model-training|training|model-management|experiment-tracking/)) {
    return "ml";
  }
  if (hit(/ai|artificial|inference|embedding|semantic|computer-vision/)) return "ai";
  if (hit(/analytics|report|dashboard|metrics|bi|visualization|analysis|time-series/)) return "analytics";
  if (hit(/database|sql|mysql|postgres|nosql|mongo|redis|sqlite|vector/)) return "database";
  if (hit(/storage|blob|object|file|bucket|s3|archive|backup|nfs|smb|disk/)) return "storage";
  if (hit(/compute|vm|virtual-machine|server|hpc|gpu|batch/)) return "compute";
  if (hit(/serverless|function|faas/)) return "serverless";
  if (hit(/container|docker|registry/)) return "containers";
  if (hit(/kubernetes|gke/)) return "kubernetes";
  if (hit(/devops|infrastructure|iac|terraform/)) return "devops";
  if (hit(/ci|cd|cicd|pipeline|build|deploy/)) return "ci-cd";
  if (hit(/test|qa|selenium|mock/)) return "testing";
  if (hit(/monitor|uptime|status|alert|error-tracking|crash-reporting|synthetic|incident/)) return "monitoring";
  if (hit(/observability|tracing|apm/)) return "observability";
  if (hit(/log/)) return "logging";
  if (hit(/security|secure|vulnerability|scanner|code-scanning|threat|ddos|waf|fraud|risk|safety/)) return "security";
  if (hit(/auth|authentication|login|password|otp|mfa|2fa|sso|saml|oidc|openid|oauth|jwt|access-control|authorization|rbac|abac|user-management/)) return "auth";
  if (hit(/identity|iam|directory/)) return "identity";
  if (hit(/privacy/)) return "privacy";
  if (hit(/compliance|governance|policy|audit/)) return "compliance";
  if (hit(/network|vpn|proxy|gateway|load-balancer|vnet|subnet|routing|peering|geoip|asn|ip/)) return "networking";
  if (hit(/dns|domain/)) return "dns";
  if (hit(/cdn|edge|content-delivery|static-assets|global-distribution/)) return "cdn";
  if (hit(/cloud|aws|azure|gcp|google-cloud|cloudflare|ibm-cloud|oracle/)) return "cloud";
  if (hit(/web|website|web-app|webapps|web-development|web-hosting|app-hosting|static-site|ssr|ssg|jamstack/)) return "web";
  if (hit(/frontend|react|javascript|typescript/)) return "frontend";
  if (hit(/backend/)) return "backend";
  if (hit(/mobile|ios|android|flutter/)) return "mobile";
  if (hit(/cli|terminal/)) return "cli";
  if (hit(/sdk|library|package|npm|pip|rubygems|maven|gradle|artifact/)) return "sdk";
  if (hit(/docs|documentation|wiki|knowledge|reference|tutorial|course|education|learning/)) return "docs";
  if (hit(/open-source|oss/)) return "open-source";
  if (hit(/collaboration|communication|chat|meeting|conference|whiteboard|brainstorming|team|remote|slack|discord/)) return "collaboration";
  if (hit(/productivity|tasks|kanban|project|notes|calendar|schedule|gantt|roadmap|time-tracking/)) return "productivity";
  if (hit(/design|figma|mockup|prototyping|branding|creative|art|web-design/)) return "design";
  if (hit(/ux|ui|user-experience|accessibility|visual-editor/)) return "ux-ui";
  if (hit(/video|streaming|webinar/)) return "video";
  if (hit(/audio|voice|speech|transcription|text-to-speech/)) return "audio";
  if (hit(/image|images|ocr|screenshot|image-processing|image-generation|image-recognition/)) return "images";
  if (hit(/email|smtp|newsletter|deliverability|campaign|transactional|mailbox/)) return "email";
  if (hit(/messaging|sms/)) return "messaging";
  if (hit(/queue|pubsub|kafka|rabbitmq|mqtt|event/)) return "queue";
  if (hit(/realtime|real-time|websocket/)) return "realtime";
  if (hit(/integration|webhook|sync|connector/)) return "integration";
  if (hit(/search|docssearch|docsearch|indexing|lookup/)) return "search";

  return null;
}

async function* walkFiles(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(fullPath);
      continue;
    }
    if (ALLOWED_EXTENSIONS.has(path.extname(entry.name))) {
      yield fullPath;
    }
  }
}

function dedupePreserveOrder(items) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    if (seen.has(item)) continue;
    seen.add(item);
    result.push(item);
  }
  return result;
}

async function normalizeTags() {
  let updatedCount = 0;
  const tagCounts = new Map();

  for await (const filePath of walkFiles(CONTENT_DIR)) {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data ?? {};
    const tags = Array.isArray(data.tags) ? data.tags : [];

    const normalized = dedupePreserveOrder(
      tags.map((tag) => mapTag(tag)).filter(Boolean)
    );

    // An entry whose tags all fail to map keeps none; content tests then flag it for a hand fix.
    const finalTags = normalized;

    const original = tags.map((tag) => normalizeRawTag(tag)).join("|");
    const next = finalTags.join("|");

    if (original !== next) {
      data.tags = finalTags;
      const output = matter.stringify(parsed.content, data);
      await fs.writeFile(filePath, output, "utf8");
      updatedCount += 1;
    }

    for (const tag of finalTags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const sorted = [...tagCounts.entries()].sort((a, b) => b[1] - a[1]);

  console.log(`Updated files: ${updatedCount}`);
  console.log(`Unique tags: ${tagCounts.size}`);
  console.log(sorted.map(([tag, count]) => `${tag}\t${count}`).join("\n"));
}

normalizeTags().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});