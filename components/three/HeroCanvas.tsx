"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { siteConfig } from "@/config/site.config";
import { HeroScene } from "./HeroScene";
import type { SceneQuality, ScrollProgress } from "./types";

/**
 * The WebGL canvas behind the hero copy. Transparent so the theme
 * background (a CSS variable) shows through — recoloring the site also
 * recolors the void around the model.
 *
 * Quality handling: "low" starts with capped DPR and no MSAA; on any
 * tier, sustained frame drops reduce DPR once more (never up again —
 * no oscillation).
 */
export function HeroCanvas({
  progress,
  quality,
}: {
  progress: ScrollProgress;
  quality: SceneQuality;
}) {
  const { camera } = siteConfig.hero;
  const [dpr, setDpr] = useState<[number, number]>(quality === "low" ? [1, 1.5] : [1, 2]);

  return (
    <Canvas
      camera={{ position: camera.position, fov: camera.fov }}
      dpr={dpr}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
    >
      <PerformanceMonitor onDecline={() => setDpr([0.75, 1])}>
        <Suspense fallback={null}>
          <HeroScene progress={progress} quality={quality} />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
