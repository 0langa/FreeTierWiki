"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";

import { DOMAIN_LABELS } from "@/lib/content";
import type { SearchRecord } from "@/types/content";

type Hit = Pick<SearchRecord, "id" | "url" | "title" | "provider" | "domain">;
type Searcher = (text: string) => Hit[];

export const OPEN_SEARCH_EVENT = "freetier:open-search";

let searcherPromise: Promise<Searcher> | null = null;

/** Loads FlexSearch and the index on first use only. */
function loadSearcher(): Promise<Searcher> {
  searcherPromise ??= (async () => {
    const [{ default: FlexSearch }, records] = await Promise.all([
      import("flexsearch"),
      fetch("/data/search.json").then((response) => {
        if (!response.ok) throw new Error(`search index: HTTP ${response.status}`);
        return response.json() as Promise<SearchRecord[]>;
      }),
    ]);
    const index = new FlexSearch.Document<SearchRecord>({
      tokenize: "forward",
      document: {
        id: "id",
        index: ["title", "provider", "tags", "description"],
        store: ["id", "url", "title", "provider", "domain"],
      },
    });
    for (const record of records) index.add(record);
    return (text: string) => {
      const seen = new Set<string>();
      const hits: Hit[] = [];
      for (const bucket of index.search(text, { enrich: true, limit: 8 })) {
        for (const row of bucket.result as unknown as Array<{ doc: Hit | null }>) {
          if (row.doc && !seen.has(row.doc.id)) {
            seen.add(row.doc.id);
            hits.push(row.doc);
          }
        }
      }
      return hits.slice(0, 8);
    };
  })().catch((error: unknown) => {
    searcherPromise = null;
    throw error;
  });
  return searcherPromise;
}

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [searcher, setSearcher] = React.useState<Searcher | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea, select, [contenteditable='true']");
      if ((event.key === "k" || event.key === "K") && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setOpen((value) => !value);
        return;
      }
      if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault();
        const local = document.querySelector<HTMLInputElement>("[data-slash-focus]");
        if (local) local.focus();
        else setOpen(true);
      }
    }
    function onOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onOpenEvent);
    };
  }, []);

  React.useEffect(() => {
    if (!open || searcher) return;
    let cancelled = false;
    loadSearcher().then(
      (loaded) => {
        if (!cancelled) setSearcher(() => loaded);
      },
      () => {
        if (!cancelled) setFailed(true);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [open, searcher]);

  const text = query.trim();
  const hits = React.useMemo(() => (searcher && text.length > 1 ? searcher(text) : []), [searcher, text]);
  const activeIndex = Math.min(active, Math.max(hits.length - 1, 0));
  const explorerHref = `/explorer/?q=${encodeURIComponent(text)}`;

  function close() {
    setOpen(false);
    setQuery("");
    setActive(0);
  }

  function onInputKey(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(Math.min(activeIndex + 1, hits.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    } else if (event.key === "Enter" && text) {
      event.preventDefault();
      const hit = hits[activeIndex];
      close();
      router.push(hit ? hit.url : explorerHref);
    }
  }

  let message: string | null = null;
  if (failed) message = "Search could not load. Check your connection and try again.";
  else if (text.length < 2) message = "Type at least 2 letters.";
  else if (!searcher) message = "Loading search…";
  else if (hits.length === 0) message = `No match for “${text}”. Press Enter to search the Explorer.`;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setFailed(false);
        else setQuery("");
      }}
    >
      <Dialog.Trigger
        aria-label="Search free tiers"
        className="flex h-9 items-center gap-2.5 rounded-lg border border-line bg-surface px-2.5 text-sm text-ink-3 hover:border-ink-3 md:w-60"
      >
        <Search className="h-4 w-4" aria-hidden />
        <span className="hidden md:inline">Search free tiers…</span>
        <kbd className="ml-auto hidden rounded border border-line bg-surface-2 px-1.5 py-0.5 text-[11px] text-ink-3 md:inline">
          Ctrl K
        </kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/50" />
        <Dialog.Popup className="fixed left-1/2 top-[12vh] z-50 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-surface shadow-soft">
          <Dialog.Title className="sr-only">Search free tiers</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="h-4 w-4 shrink-0 text-ink-3" aria-hidden />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Search by name, provider, or need…"
              aria-label="Search free tiers"
              role="combobox"
              aria-autocomplete="list"
              aria-haspopup="listbox"
              aria-expanded={hits.length > 0}
              aria-controls="search-results"
              aria-activedescendant={hits.length > 0 ? `search-hit-${activeIndex}` : undefined}
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-ink-3"
            />
          </div>
          {message ? (
            <p role="status" className="px-4 pt-3 text-sm text-ink-3">
              {message}
            </p>
          ) : null}
          <div id="search-results" role="listbox" aria-label="Results" className="max-h-[60vh] overflow-y-auto p-1.5">
            {hits.map((hit, index) => (
              <Link
                key={hit.id}
                id={`search-hit-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={index === activeIndex}
                href={hit.url}
                onClick={close}
                onMouseEnter={() => setActive(index)}
                className={`flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 ${index === activeIndex ? "bg-surface-2" : ""}`}
              >
                <span className="font-medium">{hit.title}</span>
                <span className="shrink-0 text-xs text-ink-3">
                  {hit.provider} · {DOMAIN_LABELS[hit.domain]}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2 text-xs text-ink-3">
            <span>Enter to open · Esc to close</span>
            {text ? (
              <Link href={explorerHref} onClick={close} className="hover:text-ink">
                Search all in the Explorer →
              </Link>
            ) : null}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
