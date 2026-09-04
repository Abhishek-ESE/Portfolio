"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section, SectionHeading, Reveal, Tag } from "@/components/ui/Primitives";
import { projects, type Domain } from "@/data/site";

type Project = (typeof projects)[number];

const DOMAIN_TONE: Record<Domain, "volt" | "lime" | "amber" | "default"> = {
  EV: "volt",
  IoT: "lime",
  Medical: "amber",
  Industrial: "default",
  RF: "default",
};

const FILTERS = ["All", "EV", "IoT", "Medical", "Industrial"] as const;

/* ── Card ────────────────────────────────────────────────── */
function ProjectCard({
  p,
  onOpen,
  index,
}: {
  p: Project;
  onOpen: () => void;
  index: number;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className={`hud-corners noise group relative flex h-full flex-col rounded-xl border border-hairline glass p-6 text-left transition-all duration-500 hover:-translate-y-1 hover:border-volt/35 hover:shadow-[0_18px_50px_-20px_rgba(0,229,255,0.45)] ${
        p.featured ? "sm:col-span-1" : ""
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <Tag tone={DOMAIN_TONE[p.domain]}>{p.domain}</Tag>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          {p.period}
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-volt">
        {p.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-volt/70">
        {p.tagline}
      </p>

      <div className="mt-4 flex-1">
        <p className="line-clamp-4 text-sm leading-relaxed text-ink-dim">
          {p.summary}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 4).map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
        {p.stack.length > 4 && (
          <span className="inline-flex items-center px-1 font-mono text-[11px] text-ink-faint">
            +{p.stack.length - 4}
          </span>
        )}
      </div>

      <span className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-volt">
        Read case study
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>

      {p.featured && (
        <span className="absolute -top-px right-6 h-px w-16 bg-gradient-to-r from-transparent via-volt to-transparent" />
      )}
    </motion.button>
  );
}

/* ── Case study modal ────────────────────────────────────── */
function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-void/85 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="noise relative my-auto w-full max-w-3xl rounded-2xl border border-volt/20 bg-abyss p-6 shadow-[0_40px_120px_-30px_rgba(0,229,255,0.35)] sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-md border border-hairline text-ink-dim transition-colors hover:border-volt/50 hover:text-volt"
        >
          ✕
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <Tag tone={DOMAIN_TONE[p.domain]}>{p.domain}</Tag>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
            {p.period}
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-bold leading-tight text-gradient-ink sm:text-4xl">
          {p.title}
        </h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-volt">
          {p.tagline}
        </p>

        <p className="mt-6 text-[15px] leading-relaxed text-ink-dim">
          {p.summary}
        </p>

        <div className="mt-9 space-y-8">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-sig">
              The problem
            </h4>
            <p className="mt-3 border-l-2 border-amber-sig/40 pl-4 text-sm leading-relaxed text-ink-dim">
              {p.problem}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
              What I built
            </h4>
            <ul className="mt-3 space-y-2.5">
              {p.build.map((b, i) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                  <span className="mt-0.5 font-mono text-[10px] text-volt/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-lime">
              Outcome
            </h4>
            <p className="mt-3 border-l-2 border-lime/40 pl-4 text-sm leading-relaxed text-ink-dim">
              {p.impact}
            </p>
          </div>
        </div>

        <div className="mt-9 border-t border-hairline pt-6">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-faint">
            Stack
          </h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <Tag key={s} tone="volt">
                {s}
              </Tag>
            ))}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.domain === filter)),
    [filter],
  );

  const open = projects.find((p) => p.id === openId) ?? null;

  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        kicker="Projects"
        title={
          <>
            Systems I&apos;ve taken from{" "}
            <span className="text-gradient-volt">schematic to shipped</span>
          </>
        }
        lead="Each one is a real product or subsystem, written up the way I'd walk you through it in an interview — problem, build, outcome."
      />

      {/* Filters */}
      <Reveal delay={0.06}>
        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const on = f === filter;
            const count =
              f === "All"
                ? projects.length
                : projects.filter((p) => p.domain === f).length;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-md border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  on
                    ? "border-volt/50 bg-volt/10 text-volt"
                    : "border-hairline text-ink-dim hover:border-volt/25 hover:text-ink"
                }`}
              >
                {f}
                <span className="ml-1.5 text-[9px] text-ink-faint">{count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Grid */}
      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <ProjectCard
              key={p.id}
              p={p}
              index={i}
              onOpen={() => setOpenId(p.id)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open && <CaseStudy p={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </Section>
  );
}
