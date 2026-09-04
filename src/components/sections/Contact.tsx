"use client";

import { useState } from "react";
import { Section, Reveal } from "@/components/ui/Primitives";
import { site } from "@/data/site";

function CopyField({ label, value, href }: { label: string; value: string; href: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — the link still works */
    }
  };

  return (
    <div className="group flex items-center justify-between gap-4 border-b border-hairline py-4">
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          {label}
        </p>
        <a
          href={href}
          className="mt-1 block truncate font-display text-base text-ink transition-colors hover:text-volt sm:text-lg"
        >
          {value}
        </a>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="shrink-0 rounded-md border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-all hover:border-volt/45 hover:text-volt"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Contact() {
  return (
    <Section id="contact" className="pb-20">
      <div className="hud-corners noise relative overflow-hidden rounded-2xl border border-volt/20 glass px-6 py-14 sm:px-12 sm:py-20">
        {/* Background wash */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-volt/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-lime/8 blur-3xl" />

        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.28em] text-volt">
                  06
                </span>
                <span className="h-px w-8 bg-gradient-to-r from-volt to-transparent" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-ink-faint">
                  Contact
                </span>
              </div>

              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight text-gradient-ink sm:text-5xl">
                Building something that
                <br />
                <span className="text-gradient-volt">has to survive the field?</span>
              </h2>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                I&apos;m open to embedded software engineering roles at automotive
                and EV companies, and to consulting engagements on vehicle
                firmware, CAN/BMS integration, telematics and OTA. If you have a
                board that won&apos;t boot or a fleet that won&apos;t stay
                connected, that&apos;s my kind of problem.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}?subject=Embedded%20role%20%2F%20consulting%20enquiry`}
                  className="group relative overflow-hidden rounded-md bg-volt px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-void transition-all duration-300 hover:shadow-[0_0_36px_-6px_rgba(0,229,255,0.75)]"
                >
                  <span className="relative z-10">Start a conversation</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-lime to-volt transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a
                  href={site.resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-hairline px-6 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink transition-all duration-300 hover:border-volt/50 hover:text-volt"
                >
                  Download résumé
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-hairline bg-void/50 p-6">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime-soft">
                  Accepting enquiries
                </span>
              </div>

              <CopyField
                label="Email"
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <CopyField
                label="Phone"
                value={site.phone}
                href={`tel:${site.phone.replace(/\s/g, "")}`}
              />
              <CopyField
                label="LinkedIn"
                value="in/abhishekagrahari-embedded"
                href={site.linkedin}
              />
              <CopyField
                label="GitHub"
                value="github.com/Abhishek-ESE"
                href={site.github}
              />

              <div className="mt-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  Based in
                </span>
                <span className="font-mono text-[11px] text-volt-soft">
                  {site.location}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          © {new Date().getFullYear()} {site.name} · Built with Next.js + Three.js
        </p>
        <div className="flex items-center gap-5">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-volt"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-volt"
          >
            GitHub
          </a>
          <a
            href="#top"
            className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-volt"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
