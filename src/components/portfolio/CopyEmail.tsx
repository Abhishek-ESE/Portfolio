"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

export function CopyEmail() {
  const [label, setLabel] = useState("Copy email");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    let result = "Email copied";
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      result = "Please use the email link";
    }

    if (!mounted.current) return;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setLabel(result);
    resetTimer.current = setTimeout(() => setLabel("Copy email"), 3500);
  };

  return (
    <button className="copy-email" type="button" onClick={copyEmail}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </svg>
      <span aria-live="polite" aria-atomic="true">{label}</span>
    </button>
  );
}
