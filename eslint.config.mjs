import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "development/**",
    "test-results/**",
    "playwright-report/**",
    "src/generated/**",
    // Stray nested git worktree (see .git/info/exclude); not part of this checkout's source.
    ".claude/**",
  ]),
]);
