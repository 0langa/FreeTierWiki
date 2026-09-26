import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "development/**",
    "test-results/**",
    "playwright-report/**",
    // Stray nested git worktree (see .git/info/exclude); not part of this checkout's source.
    ".claude/**",
  ]),
]);
