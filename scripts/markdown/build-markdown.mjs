// Writes index.md next to every exported index.html in out/. Runs after `next build`.
// functions/_middleware.ts serves these files to requests that send `Accept: text/markdown`.
import fs from "node:fs";
import path from "node:path";

import { htmlToMarkdown } from "./lib/html-to-markdown.mjs";

const OUT = path.resolve("out");
// Error pages have no Markdown twin; the middleware falls back to the HTML response for them.
const SKIP = new Set(["404", "_not-found"]);

for (const file of fs.readdirSync(OUT, { recursive: true })) {
  if (path.basename(file) !== "index.html" || SKIP.has(file.split(path.sep)[0])) continue;
  const html = fs.readFileSync(path.join(OUT, file), "utf8");
  const markdown = htmlToMarkdown(html);
  if (!markdown) throw new Error(`No <main> in out/${file}`);
  fs.writeFileSync(path.join(OUT, path.dirname(file), "index.md"), markdown);
}
