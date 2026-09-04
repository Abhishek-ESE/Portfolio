"use client";

import { Section, SectionHeading, Reveal, Tag } from "@/components/ui/Primitives";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        index="03"
        kicker="Experience"
        title={
          <>
            From bare-metal interrupts to{" "}
            <span className="text-gradient-volt">vehicles on the road</span>
          </>
        }
        lead="Three roles, one direction — steadily deeper into automotive-grade embedded systems."
      />

      <div className="relative mt-16">
        {/* Spine */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-volt via-hairline to-transparent md:left-[calc(11rem+7px)]" />

        <div className="space-y-14">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.06}>
              <div className="relative pl-8 md:grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8 md:pl-0">
                {/* Node */}
                <span className="absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center md:left-[11rem]">
                  {job.current && (
                    <span className="absolute h-full w-full rounded-full bg-volt/50 animate-pulse-ring" />
                  )}
                  <span
                    className={`relative h-[9px] w-[9px] rounded-full ring-4 ring-void ${
                      job.current ? "bg-volt" : "bg-ink-faint"
                    }`}
                  />
                </span>

                {/* Period rail */}
                <div className="md:pt-0.5 md:text-right">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-volt">
                    {job.period}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                    {job.location}
                  </p>
                  {job.current && (
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded border border-lime/30 bg-lime/8 px-2 py-0.5">
                      <span className="h-1 w-1 rounded-full bg-lime" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-lime-soft">
                        Current
                      </span>
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="mt-3 md:mt-0 md:pl-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-ink-faint">@</span>
                    <span className="font-display text-lg font-semibold text-volt">
                      {job.company}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {job.focus}
                  </p>

                  <p className="mt-4 text-[15px] leading-relaxed text-ink-dim">
                    {job.blurb}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-3 text-sm leading-relaxed text-ink-dim"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-volt/70" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <Tag key={s} tone={job.current ? "volt" : "default"}>
                        {s}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
