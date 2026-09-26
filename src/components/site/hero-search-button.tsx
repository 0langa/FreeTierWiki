"use client";

import { Search } from "lucide-react";

import { OPEN_SEARCH_EVENT } from "@/components/site/search-dialog";

export function HeroSearchButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}
      className="flex h-[52px] w-full max-w-[640px] items-center gap-3 rounded-xl border border-line bg-surface px-4 text-left text-[15px] text-ink-3 shadow-soft hover:border-ink-3 sm:h-14 sm:text-base"
    >
      <Search className="h-5 w-5 shrink-0" aria-hidden />
      <span className="truncate">Try “postgres”, “email API”, “auth”…</span>
      <kbd className="ml-auto hidden rounded border border-line bg-surface-2 px-1.5 py-0.5 text-[11px] sm:inline">Ctrl K</kbd>
    </button>
  );
}
