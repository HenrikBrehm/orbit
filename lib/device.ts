"use client";

import { useEffect, useState } from "react";

/**
 * Coarse device capability tiers for the hero scene:
 * - "high":     full scene (desktop defaults)
 * - "low":      lighter scene — capped DPR, fewer particles, no MSAA
 * - "fallback": static poster — no WebGL at all
 */
export type PerformanceTier = "high" | "low" | "fallback";

function detectTier(): PerformanceTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "fallback";

  // No WebGL2 → no scene. (Covers very old GPUs and disabled WebGL.)
  const probe = document.createElement("canvas");
  const gl = probe.getContext("webgl2");
  if (!gl) return "fallback";

  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) return "fallback";

  const smallScreen = Math.min(window.screen.width, window.screen.height) < 768;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const lowCpu = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;

  if ((coarsePointer && smallScreen) || lowCpu || lowMemory) return "low";
  return "high";
}

/** null until mounted (SSR renders nothing instead of guessing wrong). */
export function usePerformanceTier(): PerformanceTier | null {
  const [tier, setTier] = useState<PerformanceTier | null>(null);
  useEffect(() => {
    setTier(detectTier());
  }, []);
  return tier;
}
