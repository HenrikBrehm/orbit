"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Section reveal: fades + lifts content in the first time it scrolls
 * into view. Reduced-motion users get a pure opacity fade via the
 * global MotionConfig (see MotionProvider) — same DOM tree on server
 * and client.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
