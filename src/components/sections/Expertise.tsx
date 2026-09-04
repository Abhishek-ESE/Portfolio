"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading, Reveal, Panel, Tag } from "@/components/ui/Primitives";
import { services, stackLayers, bench } from "@/data/site";

/* ── Line icons, drawn not imported ──────────────────────── */
function Icon({ name }: { name: "battery" | "signal" | "upload" | "scope" }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...common}>
      {name === "battery" && (
        <>
          <rect x="2" y="7" width="16" height="10" rx="2" />
          <path d="M18 10h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2" />
          <path d="M11 9l-2.5 3.5H11L9.5 15" />
        </>
      )}
      {name === "signal" && (
        <>
          <path d="M12 20v-8" />
          <circle cx="12" cy="10" r="1.6" />
          <path d="M8.5 13.5a5 5 0 0 1 0-7" />
          <path d="M15.5 6.5a5 5 0 0 1 0 7" />
          <path d="M5.8 16.2a9 9 0 0 1 0-12.4" />
          <path d="M18.2 3.8a9 9 0 0 1 0 12.4" />
        </>
      )}
      {name === "upload" && (
        <>
          <path d="M12 16V4" />
          <path d="m8 8 4-4 4 4" />
          <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </>
      )}
      {name === "scope" && (
        <>
          <rect x="2.5" y="4.5" width="19" height="14" rx="2" />
          <path d="M5.5 12h2.5l1.5-4 2 8 2-6 1.5 2h3.5" />
        </>
      )}
    </svg>
  );
}

const ACCENT = {
  cyan: { text: "text-volt", bar: "bg-volt", ring: "border-volt/45", glow: "shadow-[0_0_40px_-12px_rgba(0,229,255,0.55)]", tag: "volt" as const },
  lime: { text: "text-lime", bar: "bg-lime", ring: "border-lime/45", glow: "shadow-[0_0_40px_-12px_rgba(163,230,53,0.5)]", tag: "lime" as const },
  amber: { text: "text-amber-sig", bar: "bg-amber-sig", ring: "border-amber-sig/45", glow: "shadow-[0_0_40px_-12px_rgba(255,176,32,0.5)]", tag: "amber" as const },
};

/* ── Firmware stack diagram ──────────────────────────────── */
function StackDiagram() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Data-flow spine: telemetry climbs from silicon to cloud */}
      <div className="pointer-events-none absolute bottom-6 left-[3.25rem] top-6 hidden w-px bg-gradient-to-t from-lime/60 via-volt/60 to-lime/60 sm:block">
        <motion.span
          className="absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-t from-transparent via-white to-transparent"
          animate={{ top: ["100%", "-10%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <ol className="space-y-2.5">
        {stackLayers.map((layer, i) => {
          const a = ACCENT[layer.accent];
          const on = active === layer.id;
          const dim = active !== null && !on;
          return (
            <motion.li
              key={layer.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActive(layer.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(layer.id)}
              onBlur={() => setActive(null)}
              tabIndex={0}
              className={`group relative grid cursor-default grid-cols-[3.25rem_minmax(0,1fr)] gap-3 rounded-lg border bg-carbon/50 py-3.5 pr-4 transition-all duration-400 sm:grid-cols-[3.25rem_11rem_minmax(0,1fr)] ${
                on ? `${a.ring} ${a.glow} bg-carbon/85` : "border-hairline"
              } ${dim ? "opacity-55" : ""}`}
            >
              {/* Level badge */}
              <div className="flex items-start justify-center pt-0.5">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-md border font-mono text-[11px] font-bold transition-colors ${
                    on ? `${a.ring} ${a.text} bg-void` : "border-hairline text-ink-faint bg-void/60"
                  }`}
                >
                  L{layer.level}
                </span>
              </div>

              {/* Title */}
              <div className="min-w-0">
                <h4 className={`font-display text-base font-semibold uppercase tracking-wide transition-colors ${on ? a.text : "text-ink"}`}>
                  {layer.title}
                </h4>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                  {layer.caption}
                </p>
              </div>

              {/* Items */}
              <div className="col-span-2 flex flex-wrap gap-1.5 pl-0 sm:col-span-1 sm:pl-0">
                {layer.items.map((item) => (
                  <Tag key={item} tone={on ? a.tag : "default"}>
                    {item}
                  </Tag>
                ))}
              </div>

              {/* Accent bar */}
              <span
                className={`absolute -left-px top-3 bottom-3 w-0.5 rounded-full transition-all duration-400 ${
                  on ? a.bar : "bg-hairline"
                }`}
              />
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

export function Expertise() {
  return (
    <Section id="expertise">
      <SectionHeading
        index="02"
        kicker="Expertise"
        title={
          <>
            What I&apos;m brought in to{" "}
            <span className="text-gradient-volt">build and fix</span>
          </>
        }
        lead="Four kinds of work I take full ownership of — from the CAN frame on the wire to the row in the fleet database."
      />

      {/* Services */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <Panel className="h-full">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-volt/30 bg-volt/8 text-volt">
                  <Icon name={s.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.body}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </Reveal>
        ))}
      </div>

      {/* Stack diagram + bench */}
      <div className="mt-20 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs tracking-[0.28em] text-volt">02.1</span>
              <span className="h-px w-8 bg-gradient-to-r from-volt to-transparent" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-faint">
                The stack, bottom to top
              </span>
            </div>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-ink-dim">
              Every layer here is somewhere I have shipped production code, from
              register-level bring-up to the analytics that read the fleet back.
              Hover a layer.
            </p>
          </Reveal>
          <StackDiagram />
        </div>

        <Reveal delay={0.12}>
          <div className="space-y-5 lg:sticky lg:top-28">
            <Panel hover={false}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
                {bench.title}
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {bench.items.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <h4 className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
                Languages
              </h4>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {bench.languages.map((t) => (
                  <Tag key={t} tone="volt">
                    {t}
                  </Tag>
                ))}
              </div>
            </Panel>

            <Panel hover={false} className="border-lime/20">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-lime">
                Building now
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm text-ink-dim">
                {[
                  ["MATLAB / Simulink", "application-layer code for the IoT card"],
                  ["BMS internals", "cell balancing, SOC/SOH estimation"],
                  ["AIS-140", "compliance behaviour for tracking devices"],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-2.5">
                    <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-lime" />
                    <span>
                      <span className="font-semibold text-ink">{k}</span>
                      <span className="text-ink-faint"> — {v}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
