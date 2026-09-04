"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading, Reveal, Panel, Tag } from "@/components/ui/Primitives";
import { services, skillGroups } from "@/data/site";

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

/* ── Skill matrix with filter rail ───────────────────────── */
function SkillMatrix() {
  const [activeKey, setActiveKey] = useState<string>(skillGroups[0].key);
  const active = skillGroups.find((g) => g.key === activeKey) ?? skillGroups[0];

  const accentText = {
    cyan: "text-volt",
    lime: "text-lime",
    amber: "text-amber-sig",
  } as const;

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      {/* Rail */}
      <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {skillGroups.map((g) => {
          const on = g.key === activeKey;
          return (
            <button
              key={g.key}
              onClick={() => setActiveKey(g.key)}
              className={`group relative shrink-0 rounded-md border px-4 py-3 text-left transition-all duration-300 lg:w-full ${
                on
                  ? "border-volt/45 bg-volt/8"
                  : "border-hairline bg-carbon/40 hover:border-volt/25"
              }`}
            >
              <span
                className={`block font-display text-sm font-semibold whitespace-nowrap transition-colors ${
                  on ? "text-ink" : "text-ink-dim group-hover:text-ink"
                }`}
              >
                {g.title}
              </span>
              <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint lg:block">
                {g.items.length} entries
              </span>
              {on && (
                <motion.span
                  layoutId="skill-rail"
                  className="absolute inset-y-2 -left-px w-0.5 rounded-full bg-volt"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <Panel hover={false} className="min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3
                className={`font-display text-xl font-bold ${accentText[active.accent]}`}
              >
                {active.title}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                {active.caption}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {active.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.035, duration: 0.28 }}
                >
                  <Tag
                    tone={
                      active.accent === "cyan"
                        ? "volt"
                        : active.accent === "lime"
                          ? "lime"
                          : "amber"
                    }
                  >
                    {item}
                  </Tag>
                </motion.span>
              ))}
            </div>

            {/* Decorative bus line */}
            <svg
              viewBox="0 0 600 40"
              className="mt-8 h-8 w-full opacity-60"
              aria-hidden="true"
            >
              <path
                d="M0 20 H160 L180 6 H340 L360 34 H600"
                fill="none"
                stroke="#1d2634"
                strokeWidth="1.5"
              />
              <path
                d="M0 20 H160 L180 6 H340 L360 34 H600"
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.5"
                className="trace-line"
              />
            </svg>
          </motion.div>
        </AnimatePresence>
      </Panel>
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
        lead="Four areas where I take full ownership — from the CAN frame on the wire to the telemetry landing in the cloud."
      />

      {/* Services / consulting offer */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.07}>
            <Panel className="h-full">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-volt/30 bg-volt/8 text-volt">
                  <Icon name={s.icon} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {s.body}
                  </p>
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

      {/* Skill matrix */}
      <Reveal delay={0.1}>
        <div className="mt-20">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.28em] text-volt">
              02.1
            </span>
            <span className="h-px w-8 bg-gradient-to-r from-volt to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-faint">
              Technical Matrix
            </span>
          </div>
          <SkillMatrix />
        </div>
      </Reveal>
    </Section>
  );
}
