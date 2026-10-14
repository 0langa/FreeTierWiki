"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// `match` marks the link as current. Entry, category, and provider pages all belong to "Explore".
// `wide` links wait for lg: from md the search box takes 240px, and at 768px "How we rate" did not fit.
const LINKS = [
  { href: "/explorer/", label: "Explore", match: /^\/(explorer|category|provider|services|tools)(\/|$)/, wide: false },
  { href: "/compare/", label: "Compare", match: /^\/compare(\/|$)/, wide: false },
  { href: "/changelog/", label: "Changelog", match: /^\/changelog(\/|$)/, wide: true },
  { href: "/about/", label: "How we rate", match: /^\/about(\/|$)/, wide: true },
];

export function NavLinks() {
  const pathname = usePathname() ?? "";
  // Below 360px the links scroll sideways instead of pushing the page wider.
  // The 4px padding (cancelled by the negative margin) keeps the focus ring inside the scroll box.
  return (
    <nav aria-label="Main" className="no-scrollbar -m-1 flex min-w-0 items-center gap-0.5 overflow-x-auto p-1 text-[13.5px] sm:gap-1 sm:text-sm">
      {LINKS.map((link) => {
        const active = link.match.test(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`${link.wide ? "hidden lg:inline-flex" : "inline-flex"} h-8 shrink-0 items-center whitespace-nowrap rounded-md px-1.5 transition-colors sm:px-2 ${
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
