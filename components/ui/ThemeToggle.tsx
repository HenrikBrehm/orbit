"use client";

import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";

const STORAGE_KEY = "orbit-theme";

/**
 * Dark/light toggle. The current mode lives on <html data-theme> (set
 * server-side from config, restored from localStorage by an inline
 * script in the layout before paint). All colors are CSS variables, so
 * flipping the attribute restyles everything including the 3D stage.
 */
export function ThemeToggle() {
  const [mode, setMode] = useState<"dark" | "light">(siteConfig.theme.defaultMode);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    if (current === "dark" || current === "light") setMode(current);
  }, []);

  const toggle = useCallback(() => {
    const next = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode etc. — non-fatal */
    }
    setMode(next);
  }, [mode]);

  if (!siteConfig.theme.allowModeToggle) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      className="border-line hover:border-accent flex size-9 items-center justify-center rounded-full border transition-colors"
    >
      {mode === "dark" ? (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}
