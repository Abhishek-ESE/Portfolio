"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Section, SectionHeading, Reveal } from "@/components/ui/Primitives";
import { site } from "@/data/site";

/* ── Holographic portrait ────────────────────────────────── */
function Portrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [11, -11]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 160,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-sm" style={{ perspective: 1100 }}>
      {/* Orbiting ring behind the frame */}
      <div className="pointer-events-none absolute -inset-8 opacity-70">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.9" />
              <stop offset="55%" stopColor="#a3e635" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.ellipse
            cx="200"
            cy="200"
            rx="184"
            ry="184"
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="1"
            animate={{ rotate: 360 }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />
          <motion.ellipse
            cx="200"
            cy="200"
            rx="196"
            ry="150"
            fill="none"
            stroke="#00e5ff"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="3 9"
            animate={{ rotate: -360 }}
            transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 200px" }}
          />
        </svg>
      </div>

      <motion.div
        ref={wrap}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="group relative aspect-[4/5] w-full"
      >
        {/* Glow bed */}
        <div className="absolute -inset-3 rounded-2xl bg-[conic-gradient(from_140deg,rgba(0,229,255,0.35),rgba(163,230,53,0.22),rgba(0,229,255,0.35))] opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-70" />

        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-volt/25 bg-carbon">
          {broken ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,#0e2a33,#04060a)]">
              <span className="font-display text-6xl font-bold text-gradient-volt">
                {site.initials}
              </span>
              <span className="px-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                add /public/profile.jpg
              </span>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={site.photo}
              alt={`${site.name}, Embedded Software Engineer`}
              onError={() => setBroken(true)}
              className="portrait-holo h-full w-full object-cover object-center transition-transform duration-[1.2s] group-hover:scale-[1.05]"
            />
          )}

          {/* Holographic passes */}
          <div className="portrait-tint pointer-events-none absolute inset-0" />
          <div className="portrait-scanlines pointer-events-none absolute inset-0 opacity-45" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />

          {/* Sweeping scan bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-volt/22 to-transparent animate-scan" />

          {/* Corner brackets */}
          {[
            "left-3 top-3 border-l border-t",
            "right-3 top-3 border-r border-t",
            "left-3 bottom-3 border-l border-b",
            "right-3 bottom-3 border-r border-b",
          ].map((c) => (
            <span
              key={c}
              className={`pointer-events-none absolute h-5 w-5 border-volt/70 ${c}`}
            />
          ))}

          {/* HUD readout */}
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
            <div>
              <p className="font-display text-sm font-semibold text-ink">
                {site.name}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-volt">
                {site.location}
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded border border-lime/30 bg-lime/10 px-2 py-1">
              <span className="h-1 w-1 rounded-full bg-lime" />
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-lime-soft">
                Live
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const SIGNALS = [
  { k: "Current", v: "Vecmocon Technologies" },
  { k: "Domain", v: "EV · Vehicle Intelligence" },
  { k: "Silicon", v: "TI MCU · STM32 · ESP32" },
  { k: "Bus", v: "CAN · BMS · VCU" },
  { k: "Uplink", v: "Quectel EC200 · MQTT" },
  { k: "Standard", v: "AIS-140" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <div>
          <SectionHeading
            index="01"
            kicker="About"
            title={
              <>
                Firmware that has to work
                <br />
                <span className="text-gradient-volt">when nobody is watching</span>
              </>
            }
          />

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-dim">
              <p>
                I&apos;m an embedded software engineer building the systems that
                power electric vehicles — with reliability as a design priority,
                not an afterthought. At{" "}
                <strong className="font-semibold text-ink">Vecmocon</strong> I
                develop firmware on TI MCUs and STM32/ESP32 for Vehicle
                Intelligence Modules: automotive-grade IoT devices that interface
                with a vehicle&apos;s BMS, motor controller and VCU over CAN, and
                stay connected through Quectel EC200-series cellular modules.
              </p>
              <p>
                Rigorous testing and debugging are part of how I write code, not a
                phase at the end. A device that is genuinely field-reliable is what
                lets a company win and keep large OEM and fleet clients — that&apos;s
                the standard I hold my own work to. I&apos;m also building hands-on
                expertise in{" "}
                <strong className="font-semibold text-ink">AIS-140</strong>,
                India&apos;s compliance standard for vehicle tracking and telematics
                devices.
              </p>
              <p>
                Before Vecmocon, at{" "}
                <strong className="font-semibold text-ink">MLworkX</strong> I led
                end-to-end embedded product development for global clients — from
                schematic design through firmware architecture to commercial
                deployment — across STM32, ESP32 and 8051 platforms. One project
                ties straight into my EV focus: a vehicle telematics device on
                STM32 that pulls real vehicle data over CAN, connects via Neoway
                N58 GSM, routes telemetry to the cloud through MQTT and supports
                FOTA for remote upgrades.
              </p>
              <p>
                Alongside the firmware work I&apos;ve published IEEE research on THz
                MIMO antenna design and hold a granted Indian patent. I&apos;m
                deliberately building deep expertise in EV embedded systems, with
                the goal of growing into broader technical ownership in the space.
              </p>
            </div>
          </Reveal>

          {/* Signal table */}
          <Reveal delay={0.14}>
            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
              {SIGNALS.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {s.k}
                  </dt>
                  <dd className="text-right font-mono text-[11px] text-volt-soft">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-24">
          <Portrait />
        </Reveal>
      </div>
    </Section>
  );
}
