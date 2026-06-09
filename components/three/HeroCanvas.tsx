"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { siteConfig } from "@/config/site.config";
import { HeroScene } from "./HeroScene";
import type { ScrollProgress } from "./types";

/**
 * The WebGL canvas behind the hero copy. Transparent so the theme
 * background (a CSS variable) shows through — recoloring the site also
 * recolors the void around the model.
 */
export function HeroCanvas({ progress }: { progress: ScrollProgress }) {
  const { camera } = siteConfig.hero;
  return (
    <Canvas
      camera={{ position: camera.position, fov: camera.fov }}
      dpr={[1, 2]}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
    >
      <Suspense fallback={null}>
        <HeroScene progress={progress} />
      </Suspense>
    </Canvas>
  );
}
