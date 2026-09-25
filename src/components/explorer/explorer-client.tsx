"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { EntryList } from "@/components/entry/entry-list";
import { FilterPanel, type FacetCountMaps } from "@/components/explorer/filter-panel";
import type { ListItem } from "@/lib/entry-view";
import {
  activeFilterCount,
  applyQuery,
  DEFAULT_QUERY,
  facetCounts,
  filterChips,
  isDefaultQuery,
  parseQuery,
  serializeQuery,
  type ExplorerQuery,
  type SortMode,
} from "@/lib/explorer-query";

const PAGE_SIZE = 50;

export function ExplorerClient({ initialItems, initialTotal }: { initialItems: ListItem[]; initialTotal: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.toString();
  const query = React.useMemo(() => parseQuery(new URLSearchParams(search)), [search]);

  const [items, setItems] = React.useState<ListItem[] | null>(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const [limit, setLimit] = React.useState(PAGE_SIZE);
  const [text, setText] = React.useState(query.q);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  // Follow the URL (back/forward) without an effect: reset paging and the search box when the query changes.
  const [seenSearch, setSeenSearch] = React.useState(search);
  if (search !== seenSearch) {
    setSeenSearch(search);
    setLimit(PAGE_SIZE);
    if (query.q !== text.trim()) setText(query.q);
  }

  React.useEffect(() => {
    let cancelled = false;
    fetch("/data/explorer.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<ListItem[]>;
      })
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const navigate = React.useCallback(
    (next: ExplorerQuery, mode: "push" | "replace" = "push") => {
      const qs = serializeQuery(next);
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (mode === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [pathname],
  );

  const update = React.useCallback((patch: Partial<ExplorerQuery>) => navigate({ ...query, ...patch }), [navigate, query]);

  React.useEffect(() => {
    if (text.trim() === query.q) return;
    const timer = window.setTimeout(() => navigate({ ...query, q: text.trim() }, "replace"), 200);
    return () => window.clearTimeout(timer);
  }, [text, query, navigate]);

  const results = React.useMemo(() => (items ? applyQuery(items, query) : null), [items, query]);
  const counts = React.useMemo<FacetCountMaps | null>(
    () =>
      items
        ? {
            cats: facetCounts(items, query, "cats"),
            type: facetCounts(items, query, "type"),
            risks: facetCounts(items, query, "risks"),
            plans: facetCounts(items, query, "plans"),
            ready: facetCounts(items, query, "ready"),
          }
        : null,
    [items, query],
  );
  const waiting = !results && !isDefaultQuery(query) && !loadFailed;
  const shown = results ? results.slice(0, limit) : initialItems;
  const total = results ? results.length : initialTotal;
  const chips = filterChips(query);
  const activeCount = activeFilterCount(query);

  return (
    <div className="grid gap-10 pt-6 lg:grid-cols-[244px_minmax(0,1fr)] lg:pt-8">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-20">
          <FilterPanel query={query} counts={counts} onChange={update} />
        </div>
      </aside>

      <section className="min-w-0">
        <h1 className="text-[28px] font-bold tracking-tight">Explore free tiers</h1>
        <label className="mt-3.5 flex h-11 items-center gap-2.5 rounded-[10px] border border-line bg-surface px-3.5 focus-within:border-ink-3">
          <Search className="h-4 w-4 shrink-0 text-ink-3" aria-hidden />
          <input
            data-slash-focus
            type="search"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Search name, provider, or need…"
            aria-label="Search the explorer"
            className="h-full w-full bg-transparent outline-none placeholder:text-ink-3"
          />
          <kbd className="hidden rounded border border-line bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-3 sm:inline">/</kbd>
        </label>

        <div className="mt-3.5 flex flex-wrap items-center gap-2 text-sm text-ink-2">
          <button type="button" onClick={() => setSheetOpen(true)} className="btn lg:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters{activeCount > 0 ? ` · ${activeCount}` : ""}
          </button>
          <span>
            <strong data-testid="result-count" className="text-ink">
              {waiting ? "…" : total}
            </strong>{" "}
            results
          </span>
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => update(chip.patch)}
              aria-label={`Remove filter: ${chip.label}`}
              className="inline-flex h-[26px] items-center gap-1 rounded-md bg-surface-2 pl-2.5 pr-1.5 text-[13px] text-ink"
            >
              {chip.label}
              <X className="h-3.5 w-3.5 text-ink-3" aria-hidden />
            </button>
          ))}
          {chips.length > 1 ? (
            <button
              type="button"
              onClick={() => navigate({ ...DEFAULT_QUERY, sort: query.sort })}
              className="text-[13px] text-ink-3 hover:text-ink"
            >
              Clear all
            </button>
          ) : null}
          <label className="ml-auto flex items-center gap-1.5 text-[13px]">
            Sort
            <select
              value={query.sort}
              onChange={(event) => update({ sort: event.target.value as SortMode })}
              className="h-8 rounded-lg border border-line bg-surface px-2 text-[13px] text-ink"
            >
              <option value="safest">Safest first</option>
              <option value="recent">Recently checked</option>
              <option value="az">A–Z</option>
            </select>
          </label>
        </div>

        {loadFailed ? (
          <p role="status" className="mt-3 text-sm text-ink-3">
            Could not load the full list. Showing the default view without filters.
          </p>
        ) : null}

        <div className="mt-4">
          {waiting ? (
            <p className="rounded-xl border border-line bg-surface p-6 text-sm text-ink-3">Loading…</p>
          ) : shown.length > 0 ? (
            <EntryList items={shown} />
          ) : (
            <div className="rounded-xl border border-dashed border-line p-8 text-center text-sm text-ink-3">
              <p>No free tiers match these filters.</p>
              <button type="button" onClick={() => navigate(DEFAULT_QUERY)} className="btn mt-3">
                Clear filters
              </button>
            </div>
          )}
        </div>

        {results && results.length > limit ? (
          <div className="mt-3 flex items-center justify-between text-[13px] text-ink-3">
            <span>
              Showing {limit} of {results.length}
            </span>
            <button type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)} className="btn">
              Show 50 more
            </button>
          </div>
        ) : null}

      </section>

      <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50 lg:hidden" />
          <Dialog.Popup className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface px-4 pb-4 pt-2 lg:hidden">
            <div className="mx-auto mb-3 mt-1 h-1 w-10 rounded-full bg-line" aria-hidden />
            <Dialog.Title className="mb-4 text-lg font-semibold">Filters</Dialog.Title>
            <FilterPanel query={query} counts={counts} onChange={update} />
            <div className="sticky bottom-0 mt-4 bg-surface pt-3">
              <Dialog.Close className="btn btn-primary h-11 w-full justify-center">Show {total} results</Dialog.Close>
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
