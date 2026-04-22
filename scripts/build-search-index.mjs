import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_PATH = path.join(process.cwd(), "src", "generated", "search-index.json");

const ALLOWED_EXTENSIONS = new Set([".md", ".mdx"]);

function stripMarkdown(source) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/\!\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/\[[^\]]*\]\([^\)]*\)/g, " ")
    .replace(/^#+\s+/gm, "")
    .replace(/[>*_~]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

async function buildSearchRecords() {
  const records = [];

  for await (const filePath of walkFiles(CONTENT_DIR)) {
    const relativePath = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/");
    const [kind, ...slugParts] = relativePath.split("/");
    const slug = slugParts.join("/").replace(/\.(md|mdx)$/i, "");
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);

    records.push({
      id: `${kind}:${slug}`,
      url: `/${kind}/${slug}`,
      slug,
      kind,
      title: String(data.title ?? ""),
      description: String(data.description ?? ""),
      provider: String(data.provider ?? "Unknown"),
      tags: Array.isArray(data.tags) ? data.tags.map((tag) => String(tag)) : [],
      content: stripMarkdown(content),
    });
  }

  records.sort((a, b) => a.title.localeCompare(b.title));

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(records, null, 2)}\n`, "utf8");

  console.log(`Search index written to ${OUTPUT_PATH} (${records.length} records).`);
}

buildSearchRecords().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});