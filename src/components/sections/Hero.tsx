"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SceneMount } from "@/components/three/SceneMount";

const TICKER = [
  "CAN 500 kbps",
  "BMS · SOC 87%",
  "VCU LINK OK",
  "EC200 · RSSI -71 dBm",
  "MQTT UPLINK 1 Hz",
  "FOTA SLOT B READY",
  "AIS-140 PROFILE",
  "TI MCU · CORTEX-M",
  "PACK TEMP 31 °C",
  "GNSS FIX 3D",
];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % site.roles.length), 3600);
    return () => clearInterval(id);
  }, []);

  // Keyed remount rather than AnimatePresence: each role gets its own
  // enter animation and there is no exit state to stall on.
  return (
    <span className="block min-h-[2.55em] sm:min-h-[1.25em]">
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

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden"
    >
      {/* 3D module */}
      <div className="absolute inset-0 z-0">
        <SceneMount />
      </div>

      {/* Readability wash — directional on desktop so the module stays clear
          on the right, a softer all-over veil on narrow screens. */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,6,10,0.72)_0%,rgba(4,6,10,0.55)_45%,rgba(4,6,10,0.8)_100%)] lg:bg-[linear-gradient(100deg,rgba(4,6,10,0.97)_0%,rgba(4,6,10,0.93)_32%,rgba(4,6,10,0.6)_50%,rgba(4,6,10,0.1)_68%,transparent_82%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-void via-void/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-10 grid-lines opacity-[0.25]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-volt/60 to-transparent animate-scan" />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-6xl px-5 pt-24 pb-28 sm:px-8 sm:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          {/* Availability chip */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-lime/25 bg-lime/8 px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime-soft">
              {site.availability}
            </span>
          </div>

          <h1 className="mt-7 font-display font-bold tracking-tight">
            <span className="block text-[2.35rem] leading-[1.02] text-gradient-ink sm:text-6xl lg:text-7xl">
              {site.name}
            </span>
            <span className="mt-3 block text-[1.45rem] leading-[1.2] sm:text-3xl lg:text-4xl">
              <RoleRotator />
            </span>
          </h1>

          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint sm:text-xs">
            {site.subtitle}
          </p>

          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-dim sm:text-base">
            {site.heroLead}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-hairline px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-dim transition-all duration-300 hover:border-volt/50 hover:text-volt"
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Metrics */}
          <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
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

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-14 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint">
          Scroll
        </span>
        <span className="relative h-9 w-px overflow-hidden bg-hairline">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-volt"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
