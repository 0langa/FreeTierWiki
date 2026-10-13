"use client";

import * as React from "react";

export type JumpItem = { id: string; title: string };

type Props = { items: JumpItem[]; variant?: "list" | "strip"; className?: string };

/**
 * Links to the sections of an entry page. The section on screen is marked; without JavaScript the
 * links still work as plain anchors. `list` is the sidebar version, `strip` the one-line phone version.
 */
export function OnThisPage({ items, variant = "list", className = "" }: Props) {
  const [active, setActive] = React.useState<string | null>(null);

  React.useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter((target): target is HTMLElement => target !== null);
    if (targets.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current: string | null = null;
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 120) current = target.id;
      }
      setActive(atEnd ? targets[targets.length - 1].id : current);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (variant === "strip") {
    return (
      <nav aria-label="On this page" className={`no-scrollbar -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6 ${className}`}>
        <ol className="flex w-max gap-1.5">
          {items.map((item) => {
            const current = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  className={`inline-flex h-8 items-center rounded-full px-3 text-[13.5px] transition-colors ${
                    current ? "bg-ink text-bg" : "bg-surface-2 text-ink-2 hover:text-ink"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav aria-label="On this page" className={className}>
      <p className="eyebrow mb-2.5">On this page</p>
      <ol className="border-l border-line">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[13.5px] leading-snug transition-colors ${
                  current ? "border-ink font-medium text-ink" : "border-transparent text-ink-2 hover:border-line-strong hover:text-ink"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
