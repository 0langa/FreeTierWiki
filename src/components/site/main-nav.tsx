"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

// `match` marks an item as current. Entry, category, provider and quick-list pages all belong to "Explore".
// Explore and Compare open menus (native <details>, so they work without JavaScript and their links are in the HTML).
// `wide` links wait for md. From md to lg the search button stays an icon (see SearchDialog): with the 240px
// search box beside all four items, "How we rate" did not fit at 768px.
const MENUS = [
  { key: "explore", label: "Explore", match: /^\/(explorer|category|provider|services|tools|no-card|hard-cap)(\/|$)/ },
  { key: "compare", label: "Compare", match: /^\/compare(\/|$)/ },
] as const;

const LINKS = [
  { href: "/changelog/", label: "Changelog", match: /^\/changelog(\/|$)/ },
  { href: "/about/", label: "How we rate", match: /^\/about(\/|$)/ },
];

type MenuKey = (typeof MENUS)[number]["key"];

export function MainNav({ explore, compare }: { explore: React.ReactNode; compare: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  const navRef = React.useRef<HTMLElement>(null);
  const panels: Record<MenuKey, React.ReactNode> = { explore, compare };

  const closeMenus = React.useCallback((keep?: Element) => {
    navRef.current?.querySelectorAll("details[open]").forEach((menu) => {
      if (menu !== keep) menu.removeAttribute("open");
    });
  }, []);

  // A new page closes any open menu.
  React.useEffect(() => closeMenus(), [pathname, closeMenus]);

  // A click outside the menus closes them; Escape closes the open one and returns focus to its label.
  React.useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) closeMenus();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const open = navRef.current?.querySelector("details[open]");
      if (!open) return;
      open.removeAttribute("open");
      open.querySelector("summary")?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenus]);

  // Below 360px the items scroll sideways instead of pushing the page wider.
  // The 4px padding (cancelled by the negative margin) keeps the focus ring inside the scroll box.
  return (
    <nav ref={navRef} aria-label="Main" className="no-scrollbar -m-1 flex min-w-0 items-center gap-0.5 overflow-x-auto p-1 text-[13.5px] sm:gap-1 sm:text-sm">
      {MENUS.map((menu) => {
        const active = menu.match.test(pathname);
        return (
          <details
            key={menu.key}
            className="group shrink-0"
            onToggle={(event) => {
              if (event.currentTarget.open) closeMenus(event.currentTarget);
            }}
          >
            <summary
              className={`flex h-8 cursor-pointer list-none items-center gap-1 whitespace-nowrap rounded-md px-1.5 transition-colors group-open:bg-surface-2 group-open:text-ink sm:px-2 [&::-webkit-details-marker]:hidden ${
                active ? "bg-surface-2 font-medium text-ink" : "text-ink-2 hover:text-ink"
              }`}
            >
              {menu.label}
              {/* Phones have no room for the arrow; 360px has to fit both labels, search and the theme toggle. */}
              <ChevronDown className="hidden h-3.5 w-3.5 text-ink-3 transition-transform group-open:rotate-180 sm:block" aria-hidden />
            </summary>
            {/* Positioned against the header, not the nav, so the nav's sideways scroll never clips the menu. */}
            <div
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-line bg-surface shadow-card"
              onClick={(event) => {
                if ((event.target as HTMLElement).closest("a")) closeMenus();
              }}
            >
              {panels[menu.key]}
            </div>
          </details>
        );
      })}
      {LINKS.map((link) => {
        const active = link.match.test(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`hidden h-8 shrink-0 items-center whitespace-nowrap rounded-md px-1.5 transition-colors sm:px-2 md:inline-flex ${
              active ? "bg-surface-2 font-medium text-ink" : "text-ink-2 hover:text-ink"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
