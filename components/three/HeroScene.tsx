"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { siteConfig } from "@/config/site.config";
import { EnvironmentRig } from "./EnvironmentRig";
import { HeroModel } from "./HeroModel";
import { Particles } from "./Particles";
import { Effects } from "./Effects";
import type { SceneQuality, ScrollProgress } from "./types";

/** Dollies the camera toward the model as the hero scroll progresses. */
function CameraRig({ progress }: { progress: ScrollProgress }) {
  const camera = useThree((state) => state.camera);
  const base = siteConfig.hero.camera.position;
  const dolly = siteConfig.hero.scroll.cameraDolly;

  useFrame(() => {
    camera.position.set(base[0], base[1], base[2] - progress.value * dolly);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene({
  progress,
  quality,
}: {
  progress: ScrollProgress;
  quality: SceneQuality;
}) {
  const { lights } = siteConfig.hero;
  return (
    <>
      <CameraRig progress={progress} />
      <ambientLight intensity={lights.ambient} />
      <directionalLight
        color={lights.key.color}
        intensity={lights.key.intensity}
        position={lights.key.position}
      />
      <directionalLight
        color={lights.rim.color}
        intensity={lights.rim.intensity}
        position={lights.rim.position}
      />
      <EnvironmentRig />
      <HeroModel progress={progress} />
      <Particles progress={progress} quality={quality} />
      <Effects quality={quality} />
    </>
  );
}
