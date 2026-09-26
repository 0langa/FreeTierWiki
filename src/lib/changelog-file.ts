import fs from "node:fs/promises";
import path from "node:path";

import { DOMAINS, type Domain, type RemovalRecord } from "@/types/content";

export const CHANGELOG_FILE = path.join(process.cwd(), "content", "changelog.json");

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function isRealDate(value: string): boolean {
  if (!DATE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

/** Validates the removal records. Throws with the record index so a bad edit fails the build loudly. */
export function parseRemovals(data: unknown): RemovalRecord[] {
  if (!Array.isArray(data)) throw new Error("changelog.json: expected a list");
  return data.map((raw, index) => {
    const record = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
    const where = `changelog.json[${index}]`;
    if (typeof record.date !== "string" || !isRealDate(record.date)) throw new Error(`${where}: 'date' must be a real YYYY-MM-DD date`);
    if (record.kind !== "removed") throw new Error(`${where}: 'kind' must be "removed"`);
    if (typeof record.title !== "string" || !record.title.trim()) throw new Error(`${where}: 'title' is required`);
    if (typeof record.category !== "string" || !(DOMAINS as readonly string[]).includes(record.category)) {
      throw new Error(`${where}: 'category' must be one of: ${DOMAINS.join(", ")}`);
    }
    if (typeof record.note !== "string" || !record.note.trim()) throw new Error(`${where}: 'note' is required`);
    return { date: record.date, kind: "removed", title: record.title.trim(), category: record.category as Domain, note: record.note.trim() };
  });
}

export async function readRemovals(file: string = CHANGELOG_FILE): Promise<RemovalRecord[]> {
  let text: string;
  try {
    text = await fs.readFile(file, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
  return parseRemovals(JSON.parse(text));
}
