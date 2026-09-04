"use client";

import { Section, SectionHeading, Reveal, Panel, Tag } from "@/components/ui/Primitives";
import { credentials } from "@/data/site";

function Rule({ label }: { label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-volt">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-hairline to-transparent" />
    </div>
  );
}

export function Credentials() {
  const { education, patents, publications, highlights, certifications, languages } =
    credentials;

  return (
    <Section id="credentials">
      <SectionHeading
        index="05"
        kicker="Credentials"
        title={
          <>
            Research, patents and the{" "}
            <span className="text-gradient-volt">room I got to present in</span>
          </>
        }
        lead="The academic and recognition side — IEEE publications, a granted patent, and a demo I gave to the Indian Navy."
      />

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {/* Education */}
        <Reveal>
          <Panel className="h-full">
            <Rule label="Education" />
            <h3 className="font-display text-lg font-semibold leading-snug text-ink">
              {education.degree}
            </h3>
            <p className="mt-2 text-sm text-ink-dim">{education.school}</p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              {education.period}
            </p>
            <div className="mt-5 rounded-md border border-lime/25 bg-lime/8 px-3 py-2">
              <p className="font-mono text-[11px] tracking-wide text-lime-soft">
                {education.detail}
              </p>
            </div>

            <div className="mt-7">
              <Rule label="Languages" />
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-baseline justify-between border-b border-hairline pb-2"
                  >
                    <span className="text-sm text-ink">{l.name}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      {l.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </Reveal>

        {/* Research */}
        <Reveal delay={0.07}>
          <Panel className="h-full">
            <Rule label="Patent" />
            {patents.map((p) => (
              <div
                key={p.title}
                className="rounded-md border border-amber-sig/25 bg-amber-sig/8 p-4"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-amber-sig">◆</span>
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {p.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-dim">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-7">
              <Rule label="Publications" />
              <ul className="space-y-5">
                {publications.map((pub) => (
                  <li key={pub.title}>
                    <p className="text-sm font-medium leading-snug text-ink">
                      {pub.title}
                    </p>
                    <p
                      className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                        pub.award ? "text-lime" : "text-ink-faint"
                      }`}
                    >
                      {pub.award && "★ "}
                      {pub.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </Reveal>

        {/* Highlights */}
        <Reveal delay={0.14}>
          <Panel className="h-full">
            <Rule label="Recognition" />
            <div className="space-y-6">
              {highlights.map((h) => (
                <div key={h.title}>
                  <p className="font-display text-base font-semibold text-volt">
                    {h.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                    {h.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <Rule label="Certifications" />
              <div className="flex flex-wrap gap-1.5">
                {certifications.map((c) => (
                  <Tag key={c}>{c}</Tag>
                ))}
              </div>
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
