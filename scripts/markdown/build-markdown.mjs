// Writes index.md next to every exported index.html in out/. functions/_middleware.ts serves these
// files to requests that send `Accept: text/markdown`. next-adapter.mjs runs this at the end of
// `next build`; `node scripts/markdown/build-markdown.mjs` reruns it on an existing out/.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { htmlToMarkdown } from "./lib/html-to-markdown.mjs";

// Error pages have no Markdown twin; the middleware falls back to the HTML response for them.
const SKIP = new Set(["404", "_not-found"]);

export function writeMarkdown(outDir) {
  for (const file of fs.readdirSync(outDir, { recursive: true })) {
    if (path.basename(file) !== "index.html" || SKIP.has(file.split(path.sep)[0])) continue;
    const html = fs.readFileSync(path.join(outDir, file), "utf8");
    const markdown = htmlToMarkdown(html);
    if (!markdown) throw new Error(`No <main> in out/${file}`);
    fs.writeFileSync(path.join(outDir, path.dirname(file), "index.md"), markdown);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) writeMarkdown(path.resolve("out"));
