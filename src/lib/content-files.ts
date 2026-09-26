import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

import { parseEntry } from "@/lib/content-schema";
import { CONTENT_KINDS, type AtlasEntry, type ContentKind } from "@/types/content";

export const CONTENT_DIR = path.join(process.cwd(), "content");
const EXTENSIONS = new Set([".md", ".mdx"]);

export async function listContentFiles(rootDir: string = CONTENT_DIR): Promise<string[]> {
  const found: string[] = [];
  for (const dirent of await fs.readdir(rootDir, { withFileTypes: true })) {
    const fullPath = path.join(rootDir, dirent.name);
    if (dirent.isDirectory()) found.push(...(await listContentFiles(fullPath)));
    else if (EXTENSIONS.has(path.extname(dirent.name))) found.push(fullPath);
  }
  return found.sort();
}

export function kindAndSlug(filePath: string, rootDir: string = CONTENT_DIR): { kind: ContentKind; slug: string } {
  const [kind, ...rest] = path.relative(rootDir, filePath).replace(/\\/g, "/").split("/");
  if (!(CONTENT_KINDS as readonly string[]).includes(kind)) {
    throw new Error(`Unknown content kind '${kind}' in ${filePath}`);
  }
  return { kind: kind as ContentKind, slug: rest.join("/").replace(/\.(md|mdx)$/i, "") };
}

export async function readEntryFile(
  filePath: string,
  rootDir: string = CONTENT_DIR,
): Promise<{ entry: AtlasEntry; body: string }> {
  const { kind, slug } = kindAndSlug(filePath, rootDir);
  const { data, content } = matter(await fs.readFile(filePath, "utf8"));
  return { entry: parseEntry({ kind, slug, data }), body: content.trim() };
}
