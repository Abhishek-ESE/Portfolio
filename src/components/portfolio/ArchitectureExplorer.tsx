"use client";

import { useEffect, useState } from "react";
import { VehicleSchematic, type VehicleView } from "./VehicleSchematic";

const views: { id: VehicleView; number: string; label: string; title: string; description: string }[] = [
  {
    id: "vehicle",
    number: "01",
    label: "Vehicle",
    title: "Understanding the whole vehicle.",
    description: "Battery supervision and vehicle control exchange messages over CAN, connecting individual ECUs into one EV system.",
  },
  {
    id: "firmware",
    number: "02",
    label: "Firmware",
    title: "Turning hardware into reliable behavior.",
    description: "MCU drivers, communication interfaces, and state machines translate electrical inputs into predictable embedded behavior.",
  },
  {
    id: "cloud",
    number: "03",
    label: "Connectivity",
    title: "Connecting the vehicle to its application.",
    description: "Cellular telemetry carries vehicle data to connected services, while BLE enables nearby interaction with a mobile application.",
  },
];

export function ArchitectureExplorer() {
  const [active, setActive] = useState<VehicleView>("vehicle");
  const [paused, setPaused] = useState(false);
  const selected = views.find((view) => view.id === active)!;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => views[(views.findIndex((view) => view.id === current) + 1) % views.length].id);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="architecture" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}>
      <div className={`architecture-cycle ${paused ? "is-paused" : ""}`} aria-hidden="true"><span key={active}/></div>
      <div className="architecture-top">
        <span><span className="status-light" aria-hidden="true" />INSIDE THE SYSTEM</span>
        <span>FIG. 01 / EV</span>
      </div>
      <div className="vehicle-illustration">
        <VehicleSchematic active={active} />
      </div>
      <div className="architecture-caption" aria-live="polite" aria-atomic="true">
        <strong>{selected.title}</strong>
        <p>{selected.description}</p>
      </div>
      <div className="architecture-tabs" role="group" aria-label="Explore the EV system">
        {views.map((view) => (
          <button key={view.id} type="button" aria-pressed={active === view.id} onClick={() => setActive(view.id)}>
            <span>{view.number}</span> {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ArchitectureExplorer;
