"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

/* ── Scroll reveal ───────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section heading with the HUD index ──────────────────── */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "left",
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`relative ${align === "center" ? "text-center" : ""}`}>
      <span className="watermark" aria-hidden="true">
        {index}
      </span>
      <div
        className={`flex items-center gap-3 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="font-mono text-xs tracking-[0.28em] text-volt">
          {index}
        </span>
        <span className="h-px w-8 bg-gradient-to-r from-volt to-transparent" />
        <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-faint">
          {kicker}
        </span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-gradient-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-dim ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

/* ── Tag pill ────────────────────────────────────────────── */
export function Tag({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "volt" | "lime" | "amber";
}) {
  const tones = {
    default:
      "border-hairline bg-carbon/60 text-ink-dim hover:border-volt/40 hover:text-ink",
    volt: "border-volt/30 bg-volt/8 text-volt-soft hover:border-volt/60",
    lime: "border-lime/30 bg-lime/8 text-lime-soft hover:border-lime/60",
    amber: "border-amber-sig/30 bg-amber-sig/8 text-amber-sig hover:border-amber-sig/60",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[11px] tracking-wide transition-colors duration-300 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ── HUD card shell ──────────────────────────────────────── */
export function Panel({
  children,
  className = "",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`hud-corners noise relative rounded-xl border border-hairline glass p-6 transition-all duration-500 ${
        hover
          ? "hover:border-volt/30 hover:shadow-[0_0_45px_-12px_rgba(0,229,255,0.35)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Section wrapper ─────────────────────────────────────── */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}
