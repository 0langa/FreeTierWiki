// Renders scripts/og/og.html to public/og.png (1200×630). Run once: node scripts/og/render-og.mjs
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.resolve("scripts/og/og.html")).href);
await page.waitForLoadState("networkidle");
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("wrote public/og.png");
