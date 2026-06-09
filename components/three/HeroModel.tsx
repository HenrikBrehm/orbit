"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group } from "three";
import { siteConfig } from "@/config/site.config";
import { GLBModel } from "./GLBModel";
import { OrbitShowpiece } from "./OrbitShowpiece";
import type { ScrollProgress } from "./types";

/**
 * Positions and animates the hero model. Renders the buyer's GLB when
 * `hero.model.path` is set, otherwise the built-in procedural showpiece.
 * Idle spin, float and the scroll-driven rotation all come from config.
 */
export function HeroModel({ progress }: { progress: ScrollProgress }) {
  const group = useRef<Group>(null);
  const model = siteConfig.hero.model;
  const scrollRotate = siteConfig.hero.scroll.rotate;
  const width = useThree((state) => state.size.width);
  // Keep the model framed on narrow viewports
  const responsiveScale = model.scale * (width < 640 ? 0.62 : width < 1024 ? 0.8 : 1);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    g.rotation.y = model.rotation[1] + t * model.spinSpeed + progress.value * scrollRotate;
    g.position.y =
      model.position[1] +
      (model.float.enabled ? Math.sin(t * model.float.speed) * model.float.amplitude : 0);
  });

  return (
    <group
      ref={group}
      position={model.position}
      rotation={model.rotation}
      scale={responsiveScale}
    >
      {model.path ? <GLBModel path={model.path} /> : <OrbitShowpiece />}
    </group>
  );
}
