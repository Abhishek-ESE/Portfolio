"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/data/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-hairline glass py-3"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-volt/40 bg-volt/8 font-display text-sm font-bold text-volt">
              {site.initials}
              <span className="absolute inset-0 rounded-md border border-volt/50 animate-pulse-ring" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-sm font-semibold leading-tight text-ink">
                {site.name}
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Embedded · EV Firmware
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    isActive ? "text-volt" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  <span className="mr-1.5 text-[9px] text-ink-faint">
                    {l.index}
                  </span>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-px bg-volt"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={site.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-md border border-volt/40 bg-volt/8 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-volt transition-all duration-300 hover:border-volt hover:bg-volt/15 hover:shadow-[0_0_24px_-6px_rgba(0,229,255,0.6)] sm:block"
            >
              Résumé
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-hairline lg:hidden"
            >
              <span
                className={`h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-4 bg-ink transition-all duration-300 ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                  className="group flex items-baseline gap-4 border-b border-hairline py-5"
                >
                  <span className="font-mono text-xs text-volt">{l.index}</span>
                  <span className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-volt">
                    {l.label}
                  </span>
                </motion.a>
              ))}
              <a
                href={site.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 rounded-md border border-volt/40 bg-volt/10 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-volt"
              >
                Download Résumé
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
