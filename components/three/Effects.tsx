"use client";

import type { ReactElement } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { siteConfig } from "@/config/site.config";
import type { SceneQuality } from "./types";

/** Config-driven post pipeline: bloom for the emissive accents + vignette. */
export function Effects({ quality }: { quality: SceneQuality }) {
  const { bloom, vignette } = siteConfig.hero.postprocessing;
  if (!bloom.enabled && !vignette.enabled) return null;

  const effects: ReactElement[] = [];
  if (bloom.enabled) {
    effects.push(
      <Bloom
        key="bloom"
        intensity={bloom.intensity}
        luminanceThreshold={bloom.luminanceThreshold}
        mipmapBlur
      />,
    );
  }
  if (vignette.enabled) {
    effects.push(<Vignette key="vignette" darkness={vignette.darkness} eskil={false} />);
  }

  return (
    <EffectComposer multisampling={quality === "low" ? 0 : 4}>{effects}</EffectComposer>
  );
}
