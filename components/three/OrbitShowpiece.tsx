"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { siteConfig } from "@/config/site.config";

/**
 * The built-in procedural hero centerpiece: a chrome torus knot wrapped
 * by two glowing orbit rings with emissive satellites. Colors, metalness
 * and glow all come from `hero.model.material` in the config — the
 * emissive values drive the rings and satellites so they read as crisp
 * bloom accents instead of washing out the whole model.
 */
export function OrbitShowpiece() {
  const material = siteConfig.hero.model.material;
  const satellites = useRef<Group>(null);

  useFrame((state) => {
    if (satellites.current) {
      satellites.current.rotation.z = state.clock.elapsedTime * 0.35;
    }
  });

  return (
    <group>
      {/* Center knot — reflects the environment rig */}
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <meshStandardMaterial
          color={material.color}
          metalness={material.metalness}
          roughness={material.roughness}
        />
      </mesh>

      {/* Primary orbit ring with satellites */}
      <group rotation={[Math.PI / 2.4, 0, 0.4]}>
        <mesh>
          <torusGeometry args={[2.2, 0.012, 16, 200]} />
          <meshStandardMaterial
            color={material.emissive}
            emissive={material.emissive}
            emissiveIntensity={material.emissiveIntensity}
          />
        </mesh>
        <group ref={satellites}>
          {[0, 1, 2].map((i) => {
            const angle = (i / 3) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                  color="#000000"
                  emissive={material.emissive}
                  emissiveIntensity={material.emissiveIntensity * 1.6}
                />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Secondary, fainter ring for depth */}
      <group rotation={[Math.PI / 1.9, 0.5, -0.6]}>
        <mesh>
          <torusGeometry args={[2.55, 0.008, 16, 220]} />
          <meshStandardMaterial
            color={material.emissive}
            emissive={material.emissive}
            emissiveIntensity={material.emissiveIntensity * 0.5}
          />
        </mesh>
      </group>
    </group>
  );
}
