"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site.config";

/**
 * Tracks the live theme mode from <html data-theme>, updating when the
 * visitor toggles. Lets WebGL pick up theme-dependent colors (CSS
 * variables don't reach into the canvas).
 */
export function useThemeMode(): "dark" | "light" {
  const [mode, setMode] = useState<"dark" | "light">(siteConfig.theme.defaultMode);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => {
      const value = root.dataset.theme;
      if (value === "dark" || value === "light") setMode(value);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return mode;
}
