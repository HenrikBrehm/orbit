"use client";

import { Environment, Lightformer } from "@react-three/drei";
import { siteConfig } from "@/config/site.config";
import type { EnvironmentPreset } from "@/config/schema";

/**
 * Procedural environment lighting. Each preset maps to a Lightformer rig
 * rendered straight into the env map on the GPU — no HDR downloads, no
 * network dependency, instant theme-able reflections. Buyers who want a
 * real HDRI can set `hero.environment.hdri` to a file under /public.
 */
const PRESET_COLORS: Record<EnvironmentPreset, [string, string]> = {
  studio: ["#ffffff", "#dfe4ff"],
  city: ["#8fb0ff", "#b48fff"],
  night: ["#5d7bff", "#2a3a8f"],
  sunset: ["#ffb36b", "#ff5c87"],
  dawn: ["#ffd9a0", "#9bb8ff"],
  warehouse: ["#cfd6e6", "#8a93b0"],
  forest: ["#bfe8c0", "#7fd1a8"],
  apartment: ["#ffe9c4", "#cfd8ff"],
  park: ["#d6f0c0", "#a8d8ff"],
  lobby: ["#ffffff", "#ffd9a0"],
};

export function EnvironmentRig() {
  const env = siteConfig.hero.environment;

  if (env.hdri) {
    return <Environment files={env.hdri} />;
  }

  const [primary, secondary] = PRESET_COLORS[env.preset];
  const intensity = env.intensity;

  return (
    <Environment resolution={256} frames={1}>
      {/* Overhead softbox */}
      <Lightformer
        form="rect"
        intensity={4 * intensity}
        color={primary}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      {/* Long side streaks — the highlights that travel across chrome */}
      <Lightformer
        form="rect"
        intensity={2.5 * intensity}
        color={secondary}
        position={[-5, 1, 1]}
        rotation-y={Math.PI / 2}
        scale={[12, 0.6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.5 * intensity}
        color={primary}
        position={[5, -1, 1]}
        rotation-y={-Math.PI / 2}
        scale={[12, 0.6, 1]}
      />
      {/* Camera-facing ring for a focused specular core */}
      <Lightformer
        form="ring"
        intensity={3 * intensity}
        color={secondary}
        position={[0, 1, 7]}
        scale={4}
      />
    </Environment>
  );
}
