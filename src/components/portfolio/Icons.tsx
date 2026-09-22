export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d={diagonal ? "M5 15 15 5M5 5h10v10" : "M3.5 10h13M11 4.5l5.5 5.5-5.5 5.5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CircuitMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <rect width="34" height="34" rx="9" fill="currentColor" />
      <g stroke="#f7f6ed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 24V15l5-5h9v9M17 10v7l-7 7M10 17h7l7-7M17 24h7v-5" />
      </g>
      <circle cx="10" cy="24" r="1.5" fill="#c2ef65" />
      <circle cx="17" cy="24" r="1.5" fill="#c2ef65" />
      <circle cx="24" cy="10" r="1.5" fill="#c2ef65" />
    </svg>
  );
}

export function TechnicalIcon({ kind }: { kind: number }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {kind === 0 && (
        <>
          <rect x="8" y="8" width="16" height="16" rx="2" />
          <rect x="12" y="12" width="8" height="8" rx=".75" />
          <path d="M12 4v4m8-4v4M12 24v4m8-4v4M4 12h4m-4 8h4m16-8h4m-4 8h4" />
        </>
      )}
      {kind === 1 && (
        <>
          <path d="M4 17h24M8 11v6m8 0v5m8-11v6" />
          <rect x="4" y="4" width="8" height="7" rx="1.5" />
          <rect x="20" y="4" width="8" height="7" rx="1.5" />
          <rect x="12" y="22" width="8" height="7" rx="1.5" />
          <circle cx="8" cy="17" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="16" cy="17" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="24" cy="17" r="1.4" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === 2 && (
        <>
          <path d="M8 12a11.3 11.3 0 0 1 16 0M4 8a17 17 0 0 1 24 0M12 16a5.7 5.7 0 0 1 8 0M16 21v7m-4 0h8" />
          <circle cx="16" cy="20" r="2" />
        </>
      )}
      {kind === 3 && (
        <>
          <rect x="3" y="5" width="26" height="21" rx="2.5" />
          <path d="M6 16h5l2-6 4 12 2-6h7M10 29h12m-6-3v3" />
        </>
      )}
    </svg>
  );
}
