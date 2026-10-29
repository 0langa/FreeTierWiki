// Next.js build adapter (next.config.mjs `adapterPath`). Next calls onBuildComplete after the static
// export is in out/, so the Markdown step runs whichever command the host uses. Cloudflare Pages'
// Next.js static preset runs `npx next build`, which skips anything chained in `npm run build`.
import path from "node:path";

import { writeMarkdown } from "./build-markdown.mjs";

const markdownAdapter = {
  name: "freetierwiki-markdown",
  onBuildComplete({ projectDir }) {
    writeMarkdown(path.join(projectDir, "out"));
  },
};

export default markdownAdapter;
