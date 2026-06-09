"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global framer-motion config: `reducedMotion="user"` disables
 * transform/layout animations for visitors with prefers-reduced-motion
 * while keeping opacity transitions — content always appears, the tree
 * stays identical between server and client (no hydration mismatch).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
