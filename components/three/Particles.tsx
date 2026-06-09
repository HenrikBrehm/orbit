"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Points } from "three";
import { siteConfig } from "@/config/site.config";
import { useThemeMode } from "@/lib/use-theme-mode";
import type { SceneQuality, ScrollProgress } from "./types";

/**
 * A slowly drifting particle shell around the hero model. Deterministic
 * positions (seeded PRNG) keep renders stable across reloads. The
 * fallback color follows the live theme accent; "low" quality halves
 * the particle count.
 */
export function Particles({
  progress,
  quality,
}: {
  progress: ScrollProgress;
  quality: SceneQuality;
}) {
  const config = siteConfig.hero.particles;
  const mode = useThemeMode();
  const color = config.color ?? siteConfig.theme.colors[mode].accent;
  const count = quality === "low" ? Math.floor(config.count / 2) : config.count;
  const points = useRef<Points>(null);

  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + rand() * 5.5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    g.setAttribute("position", new Float32BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02 + progress.value * 0.6;
    }
  });

  if (!config.enabled || count === 0) return null;

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={config.size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
