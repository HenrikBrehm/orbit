/**
 * Model swap helper — copies a GLB into public/models/ and prints the
 * exact config snippet to paste into config/site.config.ts.
 *
 * Usage:
 *   npm run swap:model -- path/to/model.glb
 *   npm run swap:model -- path/to/model.glb --draco   (also writes a compressed copy)
 */
import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const modelsDir = resolve(here, "../public/models");

const args = process.argv.slice(2).filter((a) => a !== "--");
const sourceArg = args.find((a) => !a.startsWith("--"));
const wantDraco = args.includes("--draco");

if (!sourceArg) {
  console.error("Usage: npm run swap:model -- path/to/model.glb [--draco]");
  process.exit(1);
}

const source = resolve(process.cwd(), sourceArg);
if (!existsSync(source) || extname(source).toLowerCase() !== ".glb") {
  console.error(`Not a .glb file: ${source}`);
  process.exit(1);
}

mkdirSync(modelsDir, { recursive: true });
const name = basename(source);
const target = join(modelsDir, name);
copyFileSync(source, target);
const sizeKb = statSync(target).size / 1024;
console.log(`Copied → public/models/${name} (${sizeKb.toFixed(0)} KiB)`);

let finalName = name;
if (wantDraco || sizeKb > 1024) {
  const dracoName = name.replace(/\.glb$/i, "-draco.glb");
  try {
    execSync(
      `npx --yes @gltf-transform/cli draco "${target}" "${join(modelsDir, dracoName)}"`,
      { stdio: "inherit" },
    );
    finalName = dracoName;
    console.log(`Compressed → public/models/${dracoName}`);
  } catch {
    console.warn("Draco compression failed (network?); using the uncompressed copy.");
  }
}

console.log(`
Now set this in config/site.config.ts → hero.model:

    model: {
      path: "/models/${finalName}",
      scale: 1.4,            // adjust until it fills ~60% of the viewport height
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      spinSpeed: 0.12,
      float: { enabled: true, amplitude: 0.18, speed: 0.6 },
      material: {
        override: false,     // true = restyle every mesh with the values below
        color: "#16161f",
        metalness: 0.9,
        roughness: 0.2,
        emissive: "#6C50F7",
        emissiveIntensity: 0.3,   // keep ≤ 0.4 for full models
      },
    },

Then: npm run typecheck && npm run lint, and check the dev server.
`);
