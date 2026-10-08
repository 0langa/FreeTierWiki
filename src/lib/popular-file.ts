import fs from "node:fs/promises";
import path from "node:path";

export const POPULAR_FILE = path.join(process.cwd(), "content", "popular.json");

/** The weekly "most visited" list: entry paths in order, no counts. Written by scripts/popular/fetch-views.mjs. */
export type Popular = {
  updated: string;
  days: number;
  paths: string[];
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const ENTRY_PATH = /^\/(services|tools)\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/;

/** Validates the file. Throws so a bad write fails the build loudly instead of showing a broken box. */
export function parsePopular(data: unknown): Popular {
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  if (typeof record.updated !== "string" || !DATE.test(record.updated)) throw new Error("popular.json: 'updated' must be YYYY-MM-DD");
  if (typeof record.days !== "number" || !Number.isInteger(record.days) || record.days < 1) throw new Error("popular.json: 'days' must be a whole number");
  if (!Array.isArray(record.paths)) throw new Error("popular.json: 'paths' must be a list");
  const paths = record.paths.map((value, index) => {
    if (typeof value !== "string" || !ENTRY_PATH.test(value)) throw new Error(`popular.json: paths[${index}] must look like /services/slug/`);
    return value;
  });
  if (new Set(paths).size !== paths.length) throw new Error("popular.json: 'paths' has a duplicate");
  return { updated: record.updated, days: record.days, paths };
}

/** The list, or `undefined` while the weekly job has never run. */
export async function readPopular(file: string = POPULAR_FILE): Promise<Popular | undefined> {
  let text: string;
  try {
    text = await fs.readFile(file, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
  return parsePopular(JSON.parse(text));
}
