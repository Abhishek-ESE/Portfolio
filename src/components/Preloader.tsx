"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/data/site";

const LINES = [
  "vim-boot v2.4.1 · cortex-m init",
  "clock tree ................ 80 MHz  OK",
  "can1 @ 500 kbps ........... UP",
  "bms handshake ............. ACK",
  "ec200 lte ................. REGISTERED",
  "vec-tr uplink ............. CONNECTED",
];

/**
 * Firmware-style boot screen on first visit of the session. Short on purpose:
 * it sets the tone, then gets out of the way. Skipped on repeat loads.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("booted") === "1";
    } catch {
      /* storage blocked — just show it once */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const step = setInterval(() => setN((v) => Math.min(LINES.length, v + 1)), 130);
    const done = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
      try {
        sessionStorage.setItem("booted", "1");
      } catch {
        /* ignore */
      }
    }, 1350);
    return () => {
      clearInterval(step);
      clearTimeout(done);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-void"
          aria-hidden="true"
        >
          <div className="w-full max-w-sm px-6">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-volt/50 bg-volt/10 font-display text-sm font-bold text-volt">
                {site.initials}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
                Vehicle intelligence · boot
              </span>
            </div>
            <div className="mt-5 space-y-1 font-mono text-[11px] text-volt/80">
              {LINES.slice(0, n).map((l) => (
                <div key={l}>
                  <span className="text-ink-faint">$ </span>
                  {l}
                </div>
              ))}
              <span className="inline-block h-3 w-2 bg-volt align-middle animate-blink" />
            </div>
            <div className="mt-5 h-px w-full overflow-hidden bg-hairline">
              <motion.div
                className="h-full bg-gradient-to-r from-volt to-lime"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
