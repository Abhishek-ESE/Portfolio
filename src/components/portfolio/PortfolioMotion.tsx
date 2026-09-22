"use client";

import { useEffect } from "react";

export function PortfolioMotion() {
  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("motion-ready");
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);
  return null;
}
