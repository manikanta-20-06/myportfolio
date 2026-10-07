"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import { scrollState, clamp } from "@/lib/scroll";

const GAP = 1.16;
const CELL = 0.72;

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

function terrain(x: number, z: number) {
  const n =
    vnoise(x * 0.16 + 12.3, z * 0.16 + 4.7) * 0.62 +
    vnoise(x * 0.34 + 3.1, z * 0.34 + 9.2) * 0.26 +
    vnoise(x * 0.72 + 21.4, z * 0.72 + 1.5) * 0.12;
  const spine = Math.exp(-Math.pow(x * 0.11, 2)) * 0.5;
  const edge = 1 - Math.min(1, Math.hypot(x * 0.045, z * 0.075));
  return Math.max(0.12, (0.25 + n * 2.5 + spine) * (0.45 + edge * 0.75));
}

type Key = { p: number; pos: [number, number, number]; tgt: [number, number, number] };

const KEYS: Key[] = [
  { p: 0.0, pos: [0, 6.4, 17.5], tgt: [0, 1.8, 0] },
  { p: 0.15, pos: [-7.5, 4.4, 13.5], tgt: [1.2, 1.4, -3] },
  { p: 0.32, pos: [6.5, 9.2, 10.5], tgt: [-1.2, 0.6, -5] },
  { p: 0.5, pos: [0, 3.1, 7.2], tgt: [0, 2.4, -9] },
  { p: 0.68, pos: [-6.5, 7.8, 13], tgt: [0.4, 1.0, -5] },
  { p: 0.85, pos: [5, 10, 15.5], tgt: [0, 0.8, -6] },
  { p: 1.0, pos: [0, 5.2, 19.5], tgt: [0, 2.2, -8] },
];

function sample(p: number, outPos: THREE.Vector3, outTgt: THREE.Vector3) {
  let i = 0;
  while (i < KEYS.length - 2 && p > KEYS[i + 1].p) i++;
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const raw = clamp((p - a.p) / (b.p - a.p || 1), 0, 1);
  const t = raw * raw * (3 - 2 * raw);
  outPos.set(
    a.pos[0] + (b.pos[0] - a.pos[0]) * t,
    a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    a.pos[2] + (b.pos[2] - a.pos[2]) * t,
  );
  outTgt.set(
    a.tgt[0] + (b.tgt[0] - a.tgt[0]) * t,
    a.tgt[1] + (b.tgt[1] - a.tgt[1]) * t,
    a.tgt[2] + (b.tgt[2] - a.tgt[2]) * t,
  );
}

function Lattice({ cols, rows, shadows }: { cols: number; rows: number; shadows: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const capRef = useRef<THREE.InstancedMesh>(null);

  const count = cols * rows;

  const cells = useMemo(() => {
    const out: {
      x: number;
      z: number;
      h: number;
      phase: number;
      cap: boolean;
      tint: number;
    }[] = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * GAP;
        const z = (r - (rows - 1) / 2) * GAP;
        const seed = hash(c * 1.7 + 0.3, r * 2.3 + 5.1);
        out.push({
          x,
          z,
          h: terrain(x, z),
          phase: seed * Math.PI * 2,
          cap: hash(c * 3.1 + 7.7, r * 1.9 + 2.2) > 0.82,
          tint: seed,
        });
        i++;
      }
    }
    void i;
    return out;
  }, [cols, rows]);

  useEffect(() => {
    const mesh = meshRef.current;
    const caps = capRef.current;
    if (!mesh || !caps) return;
    const color = new THREE.Color();
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      const base = new THREE.Color("#17171d").lerp(
        new THREE.Color("#22222a"),
        c.tint * 0.9,
      );
      color.copy(base);
      mesh.setColorAt(i, color);
      caps.setColorAt(i, new THREE.Color("#d9a441"));
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    if (caps.instanceColor) caps.instanceColor.needsUpdate = true;
  }, [cells]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const tgt = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const caps = capRef.current;
    if (!mesh || !caps) return;

    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    scrollState.progress += (scrollState.target - scrollState.progress) * Math.min(1, dt * 5);
    const p = scrollState.progress;

    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      const r = Math.hypot(c.x, c.z);
      const breathe = 0.86 + 0.14 * Math.sin(t * 0.45 + c.phase);
      const wave = 0.5 + 0.5 * Math.sin(r * 0.42 - p * 9.5);
      const ring =
        Math.exp(-Math.pow(r - (1.5 + p * 13), 2) / 14) *
        (1 + scrollState.focus * 0.75);
      const h = c.h * breathe * (0.72 + 0.5 * wave) + ring * 1.5;

      dummy.position.set(c.x, h / 2, c.z);
      dummy.scale.set(1, h, 1);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      if (c.cap) {
        dummy.position.set(c.x, h + 0.03, c.z);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();
        caps.setMatrixAt(i, dummy.matrix);
      } else {
        dummy.position.set(c.x, -5, c.z);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        caps.setMatrixAt(i, dummy.matrix);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    caps.instanceMatrix.needsUpdate = true;

    sample(p, pos, tgt);
    scrollState.sx += (scrollState.pointerX - scrollState.sx) * Math.min(1, dt * 2.4);
    scrollState.sy += (scrollState.pointerY - scrollState.sy) * Math.min(1, dt * 2.4);

    const camera = state.camera;
    camera.position.x += (pos.x + scrollState.sx * 1.4 - camera.position.x) * Math.min(1, dt * 3);
    camera.position.y += (pos.y - scrollState.sy * 0.8 - camera.position.y) * Math.min(1, dt * 3);
    camera.position.z += (pos.z - camera.position.z) * Math.min(1, dt * 3);
    camera.lookAt(tgt);
  });

  return (
    <group>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow={shadows}
        receiveShadow={shadows}
        frustumCulled={false}
      >
        <boxGeometry args={[CELL, 1, CELL]} />
        <meshStandardMaterial roughness={0.62} metalness={0.22} toneMapped={false} />
      </instancedMesh>

      <instancedMesh
        ref={capRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <boxGeometry args={[CELL * 1.06, 0.055, CELL * 1.06]} />
        <meshStandardMaterial
          emissive={"#d9a441"}
          emissiveIntensity={2.1}
          color={"#d9a441"}
          roughness={0.4}
          toneMapped={false}
        />
      </instancedMesh>
    </group>
  );
}

function Rig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 6.4, 17.5);
    camera.lookAt(0, 1.8, 0);
  }, [camera]);
  return null;
}

export default function Scene() {
  const mobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      (window.innerWidth < 900 || (navigator.maxTouchPoints ?? 0) > 0),
    [],
  );

  const cols = mobile ? 22 : 34;
  const rows = mobile ? 14 : 20;
  const shadows = !mobile;

  return (
    <Canvas
      shadows={shadows}
      dpr={mobile ? [1, 1.5] : [1, 1.8]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.1, far: 120, position: [0, 6.4, 17.5] }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#08080a"]} />
      <fog attach="fog" args={["#08080a", 22, 68]} />

      <ambientLight intensity={0.5} color="#5f646e" />
      <hemisphereLight args={["#8d97a8", "#0a0a0c", 0.35]} />
      <directionalLight
        position={[10, 16, 7]}
        intensity={2}
        color="#ffe4bd"
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-26}
        shadow-camera-right={26}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-camera-near={0.5}
        shadow-camera-far={70}
        shadow-bias={-0.0006}
      />
      <directionalLight position={[-12, 7, -10]} intensity={0.75} color="#7fa6ff" />
      <pointLight position={[0, 4.5, 6]} intensity={22} distance={26} color="#d9a441" />

      <Rig />
      <Lattice cols={cols} rows={rows} shadows={shadows} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow={shadows}>
        <planeGeometry args={[160, 160]} />
        <meshStandardMaterial color="#0a0a0d" roughness={0.95} metalness={0} />
      </mesh>

      <Grid
        position={[0, 0.01, 0]}
        args={[20, 20]}
        cellSize={1.16}
        cellThickness={0.5}
        cellColor="#1a1a20"
        sectionSize={4.64}
        sectionThickness={1}
        sectionColor="#2c2c34"
        fadeDistance={52}
        fadeStrength={1.4}
        infiniteGrid
      />
    </Canvas>
  );
}
