/**
 * Mutable scroll-progress carrier shared between the DOM scroll world
 * (GSAP ScrollTrigger) and the R3F render loop. Mutating `value` avoids
 * React re-renders at 60 fps.
 */
export type ScrollProgress = { value: number };

/** Scene quality tier — "low" trims DPR, particles and MSAA. */
export type SceneQuality = "high" | "low";
