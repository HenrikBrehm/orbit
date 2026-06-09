/**
 * Generates public/models/demo-orb.glb — a small, license-free GLB used to
 * demonstrate (and test) the hero model swap path. Pure Node + three
 * geometry math; no network, no DCC tool required.
 *
 * Usage: npm run generate:model
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { TorusKnotGeometry } from "three";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, "../public/models/demo-orb.glb");

const geometry = new TorusKnotGeometry(1, 0.3, 220, 28);
const position = geometry.getAttribute("position");
const normal = geometry.getAttribute("normal");
const index = geometry.getIndex();

const positions = new Float32Array(position.array);
const normals = new Float32Array(normal.array);
const indices = index.array;
const indexIsUint32 = indices instanceof Uint32Array;

const min = [Infinity, Infinity, Infinity];
const max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < positions.length; i += 3) {
  for (let c = 0; c < 3; c++) {
    const v = positions[i + c];
    if (v < min[c]) min[c] = v;
    if (v > max[c]) max[c] = v;
  }
}

const pad4 = (n) => Math.ceil(n / 4) * 4;

const posBuf = Buffer.from(positions.buffer, positions.byteOffset, positions.byteLength);
const normBuf = Buffer.from(normals.buffer, normals.byteOffset, normals.byteLength);
const idxBuf = Buffer.from(indices.buffer, indices.byteOffset, indices.byteLength);

const posOffset = 0;
const normOffset = pad4(posOffset + posBuf.length);
const idxOffset = pad4(normOffset + normBuf.length);
const binLength = pad4(idxOffset + idxBuf.length);

const bin = Buffer.alloc(binLength);
posBuf.copy(bin, posOffset);
normBuf.copy(bin, normOffset);
idxBuf.copy(bin, idxOffset);

const gltf = {
  asset: { version: "2.0", generator: "ORBIT demo model generator" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "DemoOrb" }],
  meshes: [
    {
      name: "DemoOrb",
      primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }],
    },
  ],
  materials: [
    {
      name: "DemoOrbChrome",
      pbrMetallicRoughness: {
        baseColorFactor: [0.07, 0.07, 0.1, 1],
        metallicFactor: 0.9,
        roughnessFactor: 0.22,
      },
    },
  ],
  buffers: [{ byteLength: binLength }],
  bufferViews: [
    { buffer: 0, byteOffset: posOffset, byteLength: posBuf.length, target: 34962 },
    { buffer: 0, byteOffset: normOffset, byteLength: normBuf.length, target: 34962 },
    { buffer: 0, byteOffset: idxOffset, byteLength: idxBuf.length, target: 34963 },
  ],
  accessors: [
    {
      bufferView: 0,
      componentType: 5126,
      count: position.count,
      type: "VEC3",
      min,
      max,
    },
    { bufferView: 1, componentType: 5126, count: normal.count, type: "VEC3" },
    {
      bufferView: 2,
      componentType: indexIsUint32 ? 5125 : 5123,
      count: index.count,
      type: "SCALAR",
    },
  ],
};

let jsonBuf = Buffer.from(JSON.stringify(gltf), "utf8");
const jsonPadded = Buffer.alloc(pad4(jsonBuf.length), 0x20);
jsonBuf.copy(jsonPadded);

const totalLength = 12 + 8 + jsonPadded.length + 8 + bin.length;
const glb = Buffer.alloc(totalLength);
let offset = 0;
glb.writeUInt32LE(0x46546c67, offset); // magic "glTF"
glb.writeUInt32LE(2, offset + 4); // version
glb.writeUInt32LE(totalLength, offset + 8);
offset += 12;
glb.writeUInt32LE(jsonPadded.length, offset);
glb.writeUInt32LE(0x4e4f534a, offset + 4); // "JSON"
offset += 8;
jsonPadded.copy(glb, offset);
offset += jsonPadded.length;
glb.writeUInt32LE(bin.length, offset);
glb.writeUInt32LE(0x004e4942, offset + 4); // "BIN\0"
offset += 8;
bin.copy(glb, offset);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, glb);
console.log(
  `Wrote ${outPath} (${(glb.length / 1024).toFixed(1)} KiB, ${position.count} verts, ${index.count / 3} tris)`,
);
