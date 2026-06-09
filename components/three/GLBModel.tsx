"use client";

import { useEffect, useMemo } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Color, Mesh, MeshStandardMaterial } from "three";
import { siteConfig } from "@/config/site.config";

/**
 * Renders any GLB from /public. If the GLB ships animations, the first
 * clip auto-plays. With `hero.model.material.override` enabled, every
 * mesh gets the config-defined PBR material — instant rebranding of any
 * model without touching a DCC tool.
 *
 * Draco-compressed GLBs decode via the local decoder in /public/draco
 * (no CDN dependency). Compress yours with:
 *   npx @gltf-transform/cli draco input.glb output.glb
 */
export function GLBModel({ path }: { path: string }) {
  const { scene, animations } = useGLTF(path, "/draco/");
  const { actions } = useAnimations(animations, scene);
  const materialConfig = siteConfig.hero.model.material;

  const prepared = useMemo(() => {
    if (materialConfig.override) {
      const material = new MeshStandardMaterial({
        color: new Color(materialConfig.color),
        metalness: materialConfig.metalness,
        roughness: materialConfig.roughness,
        emissive: new Color(materialConfig.emissive),
        emissiveIntensity: materialConfig.emissiveIntensity,
      });
      scene.traverse((object) => {
        if (object instanceof Mesh) {
          object.material = material;
        }
      });
    }
    return scene;
  }, [scene, materialConfig]);

  useEffect(() => {
    const firstAction = Object.values(actions)[0];
    firstAction?.play();
  }, [actions]);

  return <primitive object={prepared} />;
}
