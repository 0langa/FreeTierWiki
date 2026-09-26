import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  outputFileTracingRoot: repoRoot,
  experimental: {
    // Local builds on low-memory machines: NEXT_BUILD_CPUS=2 npm run build
    cpus: Number(process.env.NEXT_BUILD_CPUS) || undefined,
  },
};

export default nextConfig;
