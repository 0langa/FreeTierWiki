"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// `match` marks the link as current. Entry, category, and provider pages all belong to "Explore".
const LINKS = [
  { href: "/explorer/", label: "Explore", match: /^\/(explorer|category|provider|services|tools)(\/|$)/, wide: false },
  { href: "/compare/", label: "Compare", match: /^\/compare(\/|$)/, wide: false },
  { href: "/changelog/", label: "Changelog", match: /^\/changelog(\/|$)/, wide: true },
  { href: "/about/", label: "How we rate", match: /^\/about(\/|$)/, wide: true },
];

export function NavLinks() {
  const pathname = usePathname() ?? "";
  return (
    <nav aria-label="Main" className="flex items-center gap-0.5 text-[13.5px] sm:gap-1 sm:text-sm">
      {LINKS.map((link) => {
        const active = link.match.test(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`${link.wide ? "hidden md:inline-flex" : "inline-flex"} h-8 items-center rounded-md px-2 transition-colors ${
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
