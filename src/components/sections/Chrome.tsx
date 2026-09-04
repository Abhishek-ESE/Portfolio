"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin progress rail pinned under the nav. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX: width }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-volt via-volt-soft to-lime"
    />
  );
}

const BAND = [
  "CAN BUS",
  "BMS",
  "VCU",
  "TI MCU",
  "STM32",
  "ESP32",
  "FreeRTOS",
  "MQTT",
  "FOTA",
  "AIS-140",
  "QUECTEL EC200",
  "BLE",
  "BOOTLOADERS",
  "LOW POWER",
  "JTAG / SWD",
];

/** Scrolling keyword band — a visual breath between sections. */
export function MarqueeBand() {
  return (
    <div className="relative border-y border-hairline bg-abyss/60 py-4">
      <div className="marquee-mask flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...BAND, ...BAND].map((w, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-lg font-semibold tracking-tight text-ink-faint/60 sm:text-2xl">
                {w}
              </span>
              <span className="h-1 w-1 shrink-0 rotate-45 bg-volt/50" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Ambient background: fixed grid + drifting glow, behind everything. */
export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-lines opacity-[0.18]" />
      <div className="absolute left-1/2 top-[15%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-volt/6 blur-[120px] animate-float-slow" />
      <div className="absolute bottom-[8%] right-[6%] h-[26rem] w-[26rem] rounded-full bg-lime/5 blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,rgba(4,6,10,0.85)_100%)]" />
    </div>
  );
}
