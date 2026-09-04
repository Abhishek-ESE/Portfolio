"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const VOLT = "#00e5ff";
const LIME = "#a3e635";
const AMBER = "#ffb020";

/* ────────────────────────────────────────────────────────────
   Trace routing — L-shaped polylines fanning out of the MCU.
   Each path is a list of board-plane points the packets ride.
   ──────────────────────────────────────────────────────────── */
type Pt = [number, number];

const TRACE_PATHS: { pts: Pt[]; color: string }[] = [
  { pts: [[0, 0.35], [0, 1.05], [1.15, 1.05], [1.15, 1.62]], color: VOLT },
  { pts: [[0.35, 0.35], [0.35, 0.78], [1.72, 0.78], [1.72, 0.2]], color: VOLT },
  { pts: [[-0.35, 0.35], [-0.35, 1.3], [-1.55, 1.3]], color: LIME },
  { pts: [[-0.42, 0], [-1.15, 0], [-1.15, -0.72], [-1.9, -0.72]], color: VOLT },
  { pts: [[0.42, -0.12], [1.28, -0.12], [1.28, -0.95], [1.95, -0.95]], color: AMBER },
  { pts: [[0, -0.35], [0, -1.18], [-0.85, -1.18], [-0.85, -1.7]], color: VOLT },
  { pts: [[0.2, -0.35], [0.2, -1.55], [0.95, -1.55]], color: LIME },
  { pts: [[-0.2, 0.35], [-0.2, 1.62], [0.6, 1.62]], color: VOLT },
];

/** Total length + cumulative segment lengths, for constant-speed travel. */
function measure(pts: Pt[]) {
  const segs: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const dx = pts[i + 1][0] - pts[i][0];
    const dy = pts[i + 1][1] - pts[i][1];
    const len = Math.hypot(dx, dy);
    segs.push(len);
    total += len;
  }
  return { segs, total };
}

function pointAt(pts: Pt[], segs: number[], total: number, t: number): Pt {
  let d = ((t % 1) + 1) % 1;
  d *= total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) {
      const f = segs[i] === 0 ? 0 : d / segs[i];
      return [
        pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f,
        pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f,
      ];
    }
    d -= segs[i];
  }
  return pts[pts.length - 1];
}

/* ── Copper traces etched on the board ───────────────────── */
function Traces() {
  const segments = useMemo(() => {
    const out: {
      pos: [number, number, number];
      rot: number;
      len: number;
      color: string;
    }[] = [];
    for (const { pts, color } of TRACE_PATHS) {
      for (let i = 0; i < pts.length - 1; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[i + 1];
        const len = Math.hypot(x2 - x1, y2 - y1);
        out.push({
          pos: [(x1 + x2) / 2, 0.049, (y1 + y2) / 2],
          rot: Math.atan2(y2 - y1, x2 - x1),
          len,
          color,
        });
      }
    }
    return out;
  }, []);

  return (
    <group>
      {segments.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={[0, -s.rot, 0]}>
          <boxGeometry args={[s.len + 0.02, 0.005, 0.042]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={2.8}
            toneMapped={false}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── CAN packets riding the traces ───────────────────────── */
function Packets() {
  const group = useRef<THREE.Group>(null);
  const meta = useMemo(
    () =>
      TRACE_PATHS.flatMap((p, pathIdx) => {
        const m = measure(p.pts);
        // Two packets per trace, offset so the bus looks busy.
        return [0, 0.55].map((offset, k) => ({
          pts: p.pts,
          segs: m.segs,
          total: m.total,
          color: p.color,
          offset: offset + pathIdx * 0.13,
          speed: 0.16 + ((pathIdx * 7 + k * 3) % 5) * 0.035,
        }));
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const m = meta[i];
      const [x, z] = pointAt(m.pts, m.segs, m.total, m.offset + t * m.speed);
      child.position.set(x, 0.072, z);
    });
  });

  return (
    <group ref={group}>
      {meta.map((m, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.075, 0.028, 0.05]} />
          <meshStandardMaterial
            color={m.color}
            emissive={m.color}
            emissiveIntensity={4.2}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Pin rows around the MCU package ─────────────────────── */
function ChipPins() {
  const pins = useMemo(() => {
    const out: { pos: [number, number, number]; rot: number }[] = [];
    const n = 9;
    const span = 0.62;
    for (let i = 0; i < n; i++) {
      const o = -span / 2 + (span / (n - 1)) * i;
      out.push({ pos: [o, 0.075, 0.4], rot: 0 });
      out.push({ pos: [o, 0.075, -0.4], rot: 0 });
      out.push({ pos: [0.4, 0.075, o], rot: Math.PI / 2 });
      out.push({ pos: [-0.4, 0.075, o], rot: Math.PI / 2 });
    }
    return out;
  }, []);

  return (
    <group>
      {pins.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={[0, p.rot, 0]}>
          <boxGeometry args={[0.03, 0.016, 0.11]} />
          <meshStandardMaterial
            color="#d9c27a"
            metalness={0.95}
            roughness={0.25}
            emissive="#3a2f10"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Passive components scattered on the board ───────────── */
function Passives() {
  const parts = useMemo(() => {
    const spots: {
      pos: [number, number, number];
      size: [number, number, number];
      color: string;
      metal: boolean;
    }[] = [
      { pos: [1.45, 0.075, 1.35], size: [0.22, 0.07, 0.14], color: "#0f1a26", metal: false },
      { pos: [-1.42, 0.075, 0.95], size: [0.18, 0.07, 0.12], color: "#0f1a26", metal: false },
      { pos: [1.6, 0.075, -0.5], size: [0.14, 0.06, 0.1], color: "#1a1410", metal: false },
      { pos: [-1.5, 0.075, -1.15], size: [0.26, 0.06, 0.16], color: "#0f1a26", metal: false },
      { pos: [0.75, 0.075, 1.5], size: [0.12, 0.05, 0.09], color: "#1a1410", metal: false },
      { pos: [-0.6, 0.075, -1.5], size: [0.2, 0.06, 0.13], color: "#0f1a26", metal: false },
    ];
    return spots;
  }, []);

  return (
    <group>
      {/* Electrolytic caps — the tall cylinders */}
      {([
        [1.05, -1.3],
        [-1.75, 0.35],
      ] as [number, number][]).map(([x, z], i) => (
        <mesh key={`cap-${i}`} position={[x, 0.15, z]}>
          <cylinderGeometry args={[0.115, 0.115, 0.22, 20]} />
          <meshStandardMaterial color="#1b2433" metalness={0.6} roughness={0.35} />
        </mesh>
      ))}
      {parts.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <boxGeometry args={p.size} />
          <meshStandardMaterial
            color={p.color}
            metalness={p.metal ? 0.9 : 0.3}
            roughness={0.55}
          />
        </mesh>
      ))}
      {/* Connector header — the vehicle harness side */}
      <mesh position={[0, 0.11, 2.05]}>
        <boxGeometry args={[1.1, 0.16, 0.3]} />
        <meshStandardMaterial color="#141b26" metalness={0.5} roughness={0.5} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`hp-${i}`} position={[-0.42 + i * 0.12, 0.2, 2.05]}>
          <boxGeometry args={[0.035, 0.09, 0.035]} />
          <meshStandardMaterial
            color="#d9c27a"
            metalness={0.95}
            roughness={0.2}
            emissive={AMBER}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Status LEDs that blink like a real board ────────────── */
function StatusLeds() {
  const refs = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const leds: { pos: [number, number, number]; color: string; rate: number }[] = [
    { pos: [-1.85, 0.08, 1.6], color: LIME, rate: 1.0 },
    { pos: [-1.65, 0.08, 1.6], color: VOLT, rate: 2.6 },
    { pos: [-1.45, 0.08, 1.6], color: AMBER, rate: 0.55 },
  ];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.current.forEach((m, i) => {
      if (!m) return;
      const wave = Math.sin(t * Math.PI * leds[i].rate);
      m.emissiveIntensity = wave > 0 ? 5 : 0.35;
    });
  });

  return (
    <group>
      {leds.map((l, i) => (
        <mesh key={i} position={l.pos}>
          <boxGeometry args={[0.1, 0.035, 0.07]} />
          <meshStandardMaterial
            ref={(m) => {
              refs.current[i] = m;
            }}
            color={l.color}
            emissive={l.color}
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── The MCU itself ──────────────────────────────────────── */
function Mcu() {
  const glow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    if (!glow.current) return;
    const t = clock.getElapsedTime();
    // Slow "core is working" breathe.
    glow.current.emissiveIntensity = 1.1 + Math.sin(t * 1.7) * 0.55;
  });

  return (
    <group>
      <RoundedBox args={[0.86, 0.13, 0.86]} radius={0.02} smoothness={4} position={[0, 0.105, 0]}>
        <meshStandardMaterial color="#080c13" metalness={0.45} roughness={0.62} />
      </RoundedBox>
      {/* Die window */}
      <mesh position={[0, 0.173, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshStandardMaterial
          ref={glow}
          color={VOLT}
          emissive={VOLT}
          emissiveIntensity={1.4}
          toneMapped={false}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Pin-1 dot */}
      <mesh position={[-0.31, 0.174, -0.31]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.035, 16]} />
        <meshStandardMaterial
          color={LIME}
          emissive={LIME}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      <ChipPins />
      <pointLight position={[0, 0.5, 0]} color={VOLT} intensity={5} distance={4} decay={2} />
    </group>
  );
}

/* ── Orbiting energy rings — the "EV" read ───────────────── */
function EnergyRings() {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const c = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) a.current.rotation.z = t * 0.28;
    if (b.current) b.current.rotation.z = -t * 0.2;
    if (c.current) c.current.rotation.z = t * 0.14;
  });

  return (
    <group position={[0, 0.1, 0]}>
      <mesh ref={a} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.62, 0.012, 8, 128]} />
        <meshStandardMaterial
          color={VOLT}
          emissive={VOLT}
          emissiveIntensity={2.4}
          toneMapped={false}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 2.35, 0.35, 0]}>
        <torusGeometry args={[3.0, 0.009, 8, 128]} />
        <meshStandardMaterial
          color={LIME}
          emissive={LIME}
          emissiveIntensity={2}
          toneMapped={false}
          transparent
          opacity={0.42}
        />
      </mesh>
      <mesh ref={c} rotation={[Math.PI / 1.75, -0.3, 0]}>
        <torusGeometry args={[3.35, 0.007, 8, 128]} />
        <meshStandardMaterial
          color={VOLT}
          emissive={VOLT}
          emissiveIntensity={1.6}
          toneMapped={false}
          transparent
          opacity={0.28}
        />
      </mesh>
    </group>
  );
}

/* ── Whole module: board + everything on it ──────────────── */
export function EcuModule() {
  const root = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }, delta) => {
    const t = clock.getElapsedTime();
    if (root.current) {
      root.current.position.y = Math.sin(t * 0.6) * 0.12;
      root.current.rotation.y += delta * 0.11;
    }
    if (tilt.current) {
      // Mouse parallax, damped so it never snaps.
      const targetX = -pointer.y * 0.28 + 0.32;
      const targetZ = pointer.x * 0.16;
      tilt.current.rotation.x += (targetX - tilt.current.rotation.x) * 0.045;
      tilt.current.rotation.z += (targetZ - tilt.current.rotation.z) * 0.045;
    }
  });

  return (
    <group ref={tilt} rotation={[0.32, 0, 0]}>
      <group ref={root}>
        {/* PCB substrate */}
        <RoundedBox args={[4.4, 0.08, 4.4]} radius={0.06} smoothness={4}>
          <meshStandardMaterial
            color="#061214"
            metalness={0.2}
            roughness={0.8}
          />
        </RoundedBox>
        {/* Solder-mask sheen on top */}
        <mesh position={[0, 0.042, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.3, 4.3]} />
          <meshStandardMaterial
            color="#071a1a"
            metalness={0.1}
            roughness={0.85}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Mounting holes */}
        {([
          [1.95, 1.95],
          [-1.95, 1.95],
          [1.95, -1.95],
          [-1.95, -1.95],
        ] as [number, number][]).map(([x, z], i) => (
          <mesh key={i} position={[x, 0.045, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.06, 0.11, 20]} />
            <meshStandardMaterial
              color={VOLT}
              emissive={VOLT}
              emissiveIntensity={1.2}
              toneMapped={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        <Traces />
        <Packets />
        <Mcu />
        <Passives />
        <StatusLeds />
      </group>
      <EnergyRings />
    </group>
  );
}
