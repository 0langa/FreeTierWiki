import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const DEFAULT_LIST_PATH = path.join(process.cwd(), "all_free_services_batched.md");
const ALLOWED_EXTENSIONS = new Set([".md", ".mdx"]);

const DOMAIN_VALUES = [
  "hosting",
  "compute",
  "database",
  "storage",
  "auth",
  "messaging",
  "observability",
  "ai",
  "devops",
  "security",
  "networking",
  "productivity",
  "learning",
  "design",
  "analytics",
  "integration",
  "operations",
  "other",
];

const FREE_TIER_TYPE_VALUES = ["always-free", "time-limited", "credit", "trial"];
const OVERAGE_RISK_VALUES = ["none", "low", "medium", "high"];
const PRODUCTION_READINESS_VALUES = ["prototype", "side-project", "production-light", "production-ready"];
const AUDIENCE_VALUES = ["student", "indie", "startup", "team", "enterprise", "oss", "agency"];

function asString(value, field, errors, filePath) {
  if (value == null || value === "") {
    errors.push(`${filePath}: missing required field '${field}'.`);
    return "";
  }
  return String(value);
}

function asStringArray(value, field, errors, filePath) {
  if (!Array.isArray(value)) {
    errors.push(`${filePath}: invalid required list '${field}'.`);
    return [];
  }
  return value.map((item) => String(item));
}

function asNumber(value, field, errors, filePath) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() && Number.isFinite(Number(value))) {
    return Number(value);
  }
  errors.push(`${filePath}: invalid required number '${field}'.`);
  return 0;
}

function optionalStringArray(value, field, errors, filePath) {
  if (value == null) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    errors.push(`${filePath}: invalid optional list '${field}'.`);
    return undefined;
  }
  return value.map((item) => String(item));
}

function optionalLiteral(value, allowed, field, errors, filePath) {
  if (value == null || value === "") {
    return undefined;
  }
  const normalized = String(value);
  if (!allowed.includes(normalized)) {
    errors.push(`${filePath}: invalid '${field}' value '${normalized}'.`);
    return undefined;
  }
  return normalized;
}

function optionalLiteralArray(value, allowed, field, errors, filePath) {
  if (value == null) {
    return undefined;
  }
  if (!Array.isArray(value)) {
    errors.push(`${filePath}: invalid optional list '${field}'.`);
    return undefined;
  }
  const result = [];
  for (const item of value) {
    const normalized = String(item);
    if (!allowed.includes(normalized)) {
      errors.push(`${filePath}: invalid optional list item '${field}' -> '${normalized}'.`);
      continue;
    }
    result.push(normalized);
  }
  return result;
}

function ensureFreeTierDetails(value, errors, filePath) {
  if (!value || typeof value !== "object") {
    errors.push(`${filePath}: missing required field 'freeTierDetails'.`);
    return {};
  }
  const freeTier = value;
  asString(freeTier.summary, "freeTierDetails.summary", errors, filePath);
  asStringArray(freeTier.limits, "freeTierDetails.limits", errors, filePath);
  optionalLiteral(freeTier.freeTierType, FREE_TIER_TYPE_VALUES, "freeTierDetails.freeTierType", errors, filePath);
  optionalLiteral(freeTier.overageRisk, OVERAGE_RISK_VALUES, "freeTierDetails.overageRisk", errors, filePath);
  return freeTier;
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

function parseListTitles(source) {
  const titles = new Set();
  const lines = source.split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^-\s+\[(.+?)\]\((.+?)\)\s*$/);
    if (!match) {
      continue;
    }
    titles.add(match[1].trim());
  }
  return titles;
}

function getContentKind(filePath) {
  const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
  const [kindRaw] = relativePath.split("/");
  return kindRaw;
}

async function validateFile(filePath, errors) {
  const raw = await fs.readFile(filePath, "utf8");
  const { data } = matter(raw);

  asString(data.title, "title", errors, filePath);
  asString(data.description, "description", errors, filePath);
  asString(data.provider, "provider", errors, filePath);
  asString(data.category, "category", errors, filePath);
  optionalStringArray(data.subtypes, "subtypes", errors, filePath);
  asStringArray(data.tags, "tags", errors, filePath);
  asString(data.pricingModel, "pricingModel", errors, filePath);
  asStringArray(data.useCases, "useCases", errors, filePath);
  asString(data.difficulty, "difficulty", errors, filePath);
  asString(data.lastUpdated, "lastUpdated", errors, filePath);
  asNumber(data.popularityScore, "popularityScore", errors, filePath);
  asNumber(data.usefulnessScore, "usefulnessScore", errors, filePath);

  optionalLiteral(data.domain, DOMAIN_VALUES, "domain", errors, filePath);
  optionalLiteralArray(data.audiences, AUDIENCE_VALUES, "audiences", errors, filePath);
  optionalLiteral(data.productionReadiness, PRODUCTION_READINESS_VALUES, "productionReadiness", errors, filePath);

  ensureFreeTierDetails(data.freeTierDetails, errors, filePath);
}

async function main() {
  const root = process.argv[2] || CONTENT_DIR;
  const errors = [];

  const listPathFlagIndex = process.argv.indexOf("--list");
  const listPath = listPathFlagIndex >= 0 ? process.argv[listPathFlagIndex + 1] : DEFAULT_LIST_PATH;
  let listTitles = null;
  try {
    const listSource = await fs.readFile(listPath, "utf8");
    listTitles = parseListTitles(listSource);
  } catch (error) {
    errors.push(`${listPath}: unable to read list file.`);
  }

  const allowedKinds = new Set(["services", "tools", "resources"]);
  const contentTitles = new Map();

  for await (const filePath of walkFiles(root)) {
    await validateFile(filePath, errors);
    const kind = getContentKind(filePath);
    if (!allowedKinds.has(kind)) {
      continue;
    }
    if (!listTitles) {
      continue;
    }
    const raw = await fs.readFile(filePath, "utf8");
    const { data } = matter(raw);
    const title = String(data.title ?? "").trim();
    if (!title) {
      continue;
    }
    contentTitles.set(title, filePath);
    if (!listTitles.has(title)) {
      errors.push(`${filePath}: title '${title}' missing from all_free_services_batched.md.`);
    }
  }

  if (listTitles) {
    for (const title of listTitles) {
      if (!contentTitles.has(title)) {
        errors.push(`all_free_services_batched.md: entry '${title}' missing content file.`);
      }
    }
  }

  if (errors.length) {
    console.error("Content validation failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("OK: content validation passed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
