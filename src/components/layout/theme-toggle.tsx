"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

// Mirrors React's recommended hydration-flag pattern (useSyncExternalStore
// with mismatched server/client snapshots) instead of setState-in-effect.
function useHydrated() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useHydrated();

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-9"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {!mounted ? null : resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}