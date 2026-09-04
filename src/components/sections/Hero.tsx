"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { site } from "@/data/site";
import { SceneMount } from "@/components/three/SceneMount";

const TICKER = [
  "CAN 500 kbps",
  "BMS · SOC 87%",
  "VCU LINK OK",
  "EC200 · RSSI -71 dBm",
  "VEC-TR UPLINK 1 Hz",
  "FOTA SLOT B READY",
  "AIS-140 PROFILE",
  "TI MCU · CORTEX-M",
  "PACK TEMP 31 °C",
  "GNSS FIX 3D",
  "FLEET 20,000+ DEVICES",
];

/* Floating HUD readouts around the portrait. Anchored to the near edge
   (left or right, % of the stage) so none of them can run off-screen. */
const CHIPS = [
  { label: "TI MCU", value: "Cortex-M · CAN1 up", side: "left", inset: -6, y: 14, depth: 1.5, tone: "volt" },
  { label: "EC200", value: "LTE reg · -71 dBm", side: "right", inset: -4, y: 8, depth: 0.9, tone: "lime" },
  { label: "BMS", value: "SOC 87% · 31 °C", side: "left", inset: -12, y: 58, depth: 1.1, tone: "amber" },
  { label: "VEC-TR", value: "uplink 1 Hz · ack", side: "right", inset: -8, y: 46, depth: 1.7, tone: "volt" },
  { label: "FLEET", value: "20,000+ devices", side: "right", inset: 8, y: 82, depth: 0.7, tone: "lime" },
] as const;

const TONE = {
  volt: "border-volt/40 text-volt-soft",
  lime: "border-lime/40 text-lime-soft",
  amber: "border-amber-sig/40 text-amber-sig",
} as const;

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % site.roles.length), 3600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="block min-h-[2.5em] sm:min-h-[1.25em]">
      <motion.span
        key={site.roles[i]}
        className="block text-gradient-volt"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {site.roles[i]}
      </motion.span>
    </span>
  );
}

/* One floating readout. Its own component so the parallax hooks are not called in a loop. */
function Chip({
  chip,
  index,
  sx,
  sy,
}: {
  chip: (typeof CHIPS)[number];
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
}) {
  const x = useTransform(sx, (v) => v * 26 * chip.depth);
  const y = useTransform(sy, (v) => v * 20 * chip.depth);
  return (
    <motion.div
      style={{
        [chip.side]: `${chip.inset}%`,
        top: `${chip.y}%`,
        x,
        y,
        translateZ: 40 * chip.depth,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute z-10 rounded-md border bg-void/80 px-2.5 py-1.5 shadow-[0_8px_30px_-10px_rgba(0,229,255,0.5)] backdrop-blur-md ${TONE[chip.tone]}`}
    >
      <div className="flex items-center gap-1.5">
        <span className="h-1 w-1 rounded-full bg-current animate-pulse" />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em]">
          {chip.label}
        </span>
      </div>
      <div className="mt-0.5 whitespace-nowrap font-mono text-[10px] text-ink-dim">
        {chip.value}
      </div>
    </motion.div>
  );
}

/* ── The 3D portrait stage ───────────────────────────────── */
function PortraitStage() {
  const stage = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), spring);
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), spring);
  const sx = useSpring(mx, spring);
  const sy = useSpring(my, spring);

  // Track the pointer over the whole hero, not just the stage, so the
  // composition responds while the visitor is reading the copy.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = stage.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set(Math.max(-0.5, Math.min(0.5, (e.clientX - cx) / (window.innerWidth * 0.9))));
      my.set(Math.max(-0.5, Math.min(0.5, (e.clientY - cy) / (window.innerHeight * 0.9))));
    };
    const reset = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", reset);
    };
  }, [mx, my]);

  // Layer translations: farther layers move less, nearer chips move more.
  const glowX = useTransform(sx, (v) => v * -22);
  const glowY = useTransform(sy, (v) => v * -16);
  const ringX = useTransform(sx, (v) => v * -34);
  const ringY = useTransform(sy, (v) => v * -26);

  return (
    <div
      ref={stage}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]"
      style={{ perspective: 1400 }}
    >
      {/* Depth glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute inset-[-18%] -z-10"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[38%] h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/22 blur-[70px]" />
        <div className="absolute left-[62%] top-[70%] h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/16 blur-[60px]" />
      </motion.div>

      {/* Orbit rings */}
      <motion.svg
        style={{ x: ringX, y: ringY }}
        viewBox="0 0 400 480"
        className="pointer-events-none absolute inset-[-10%] -z-10 h-[120%] w-[120%]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="heroRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#a3e635" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.ellipse
          cx="200" cy="250" rx="188" ry="150"
          fill="none" stroke="url(#heroRing)" strokeWidth="1.2"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 250px" }}
        />
        <motion.ellipse
          cx="200" cy="250" rx="150" ry="196"
          fill="none" stroke="#00e5ff" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 58, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "200px 250px" }}
        />
      </motion.svg>

      {/* Subject */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 46, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[5/6] w-full"
      >
        {/* Ground plate the subject stands on */}
        <div className="absolute inset-x-[8%] bottom-[2%] h-[14%] rounded-[50%] bg-volt/25 blur-2xl" />

        {broken ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-[28px] border border-volt/25 bg-carbon/70">
            <span className="font-display text-7xl font-bold text-gradient-volt">
              {site.initials}
            </span>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={site.photoCutout}
            alt={site.name}
            onError={() => setBroken(true)}
            draggable={false}
            className="portrait-cutout absolute inset-0 h-full w-full select-none object-cover object-top"
            style={{ transform: "translateZ(30px)" }}
          />
        )}

        {/* Holographic scan pass */}
        <div className="portrait-scanlines pointer-events-none absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-x-[6%] top-0 h-28 bg-gradient-to-b from-volt/18 to-transparent animate-scan" />

        {/* Floating HUD chips */}
        {CHIPS.map((c, i) => (
          <Chip key={c.label} chip={c} index={i} sx={sx} sy={sy} />
        ))}
      </motion.div>

      {/* Nameplate */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="pointer-events-none absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-hairline bg-void/85 px-4 py-2 backdrop-blur-md"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-pulse-ring" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
          IoT Team · Vecmocon · Noida
        </span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden"
    >
      {/* 3D module in the background */}
      <div className="absolute inset-0 z-0">
        <SceneMount />
      </div>

      {/* Readability wash, keeps the right side clear for the portrait */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,6,10,0.78)_0%,rgba(4,6,10,0.55)_45%,rgba(4,6,10,0.85)_100%)] lg:bg-[linear-gradient(100deg,rgba(4,6,10,0.97)_0%,rgba(4,6,10,0.9)_30%,rgba(4,6,10,0.55)_50%,rgba(4,6,10,0.25)_70%,rgba(4,6,10,0.5)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-void via-void/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 grid-lines opacity-[0.22]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent animate-scan" />

      {/* Content */}
      <div className="relative z-20 mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-24 pt-28 sm:px-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Portrait first on mobile so the photo is the first thing seen */}
        <div className="order-1 lg:order-2 lg:pl-6">
          <PortraitStage />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 max-w-2xl lg:order-1"
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-lime/25 bg-lime/8 px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime-soft">
              {site.availability}
            </span>
          </div>

          <h1 className="mt-6 font-display font-bold tracking-tight">
            <span className="block text-[2.6rem] uppercase leading-[0.95] text-gradient-ink sm:text-6xl lg:text-[4.6rem]">
              {site.name}
            </span>
            <span className="mt-3 block text-[1.4rem] font-semibold leading-[1.2] sm:text-3xl lg:text-[2.1rem]">
              <RoleRotator />
            </span>
          </h1>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:text-xs">
            {site.subtitle}
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-dim sm:text-base">
            {site.heroLead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-md bg-volt px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-void transition-all duration-300 hover:shadow-[0_0_36px_-6px_rgba(0,229,255,0.75)]"
            >
              <span className="relative z-10">See the work</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-lime to-volt transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="rounded-md border border-hairline px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:border-volt/50 hover:text-volt"
            >
              Hire / Consult
            </a>
            <a
              href={site.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-hairline px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-all duration-300 hover:border-volt/50 hover:text-volt"
            >
              Résumé ↓
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {site.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.09, duration: 0.5 }}
                className="border-l border-hairline pl-3"
              >
                <dt className="font-display text-2xl font-bold text-volt sm:text-3xl">
                  {m.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] uppercase leading-snug tracking-[0.1em] text-ink-faint">
                  {m.label}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* Telemetry ticker */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-hairline bg-void/80 backdrop-blur-sm">
        <div className="marquee-mask flex overflow-hidden py-2.5">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
            {[...TICKER, ...TICKER].map((t, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint"
              >
                <span className="h-1 w-1 rounded-full bg-volt/70" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
