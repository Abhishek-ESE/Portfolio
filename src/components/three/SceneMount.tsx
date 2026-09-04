"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <BootSequence />,
});

const BOOT_LINES = [
  "vim-boot v2.4.1  ·  cortex-m init",
  "clock tree ......................... 180 MHz  OK",
  "flash / ram map .................... OK",
  "can1 @ 500 kbps .................... UP",
  "bms handshake ...................... ACK",
  "vcu link ........................... ACK",
  "cellular ec200 ..................... REGISTERED",
  "mqtt uplink ........................ CONNECTED",
];

function BootSequence() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setN((v) => (v >= BOOT_LINES.length ? v : v + 1)),
      190,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-md px-6 font-mono text-[11px] leading-relaxed text-volt/70 sm:text-xs">
        {BOOT_LINES.slice(0, n).map((l) => (
          <div key={l} className="truncate">
            <span className="text-ink-faint">$ </span>
            {l}
          </div>
        ))}
        <span className="inline-block h-3 w-2 bg-volt align-middle animate-blink" />
      </div>
    </div>
  );
}

/**
 * Only mounts the WebGL canvas once the hero is actually on screen, and
 * unmounts it again when it is far away — the rest of the page stays smooth.
 */
export function SceneMount() {
  const host = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={host} className="absolute inset-0">
      {active ? <HeroScene /> : <BootSequence />}
    </div>
  );
}
