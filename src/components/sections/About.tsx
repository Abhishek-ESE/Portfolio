"use client";

import { useEffect, useRef, useState } from "react";
import { Section, SectionHeading, Reveal } from "@/components/ui/Primitives";

/* ── Live VIM panel ──────────────────────────────────────────
   A simulated Vehicle Intelligence Module readout: 16 BMS cells,
   pack state and a CAN frame log. Not a screenshot — it runs.
   ─────────────────────────────────────────────────────────── */
const CELLS = 16;
const CAN_IDS = [
  { id: "0x1A0", name: "BMS_PACK" },
  { id: "0x1A1", name: "BMS_CELL" },
  { id: "0x2B4", name: "MCU_STAT" },
  { id: "0x3C2", name: "VCU_CMD" },
  { id: "0x18F", name: "GNSS_POS" },
  { id: "0x4E0", name: "VIM_HB" },
];

const hex = (n: number) => n.toString(16).toUpperCase().padStart(2, "0");

type Frame = { t: string; id: string; name: string; dlc: number; data: string };

function useTelemetry() {
  const [cells, setCells] = useState<number[]>(() =>
    Array.from({ length: CELLS }, (_, i) => 3.66 + Math.sin(i * 1.3) * 0.025),
  );
  const [soc, setSoc] = useState(87.2);
  const [amps, setAmps] = useState(-12.4);
  const [temp, setTemp] = useState(31.4);
  const [frames, setFrames] = useState<Frame[]>([]);
  const tick = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      tick.current += 1;
      const t = tick.current;
      setCells((prev) =>
        prev.map((v, i) => {
          const next = v + (Math.random() - 0.5) * 0.006 + Math.sin(t / 9 + i) * 0.0008;
          return Math.min(3.74, Math.max(3.58, next));
        }),
      );
      setSoc((s) => Math.max(20, s - 0.004));
      setAmps(-8 - Math.random() * 14 + Math.sin(t / 6) * 3);
      setTemp((x) => x + (Math.random() - 0.5) * 0.08);

      const src = CAN_IDS[t % CAN_IDS.length];
      const bytes = Array.from({ length: 8 }, () => hex(Math.floor(Math.random() * 256))).join(" ");
      const stamp = (t * 0.047).toFixed(3).padStart(8, " ");
      setFrames((f) => [{ t: stamp, id: src.id, name: src.name, dlc: 8, data: bytes }, ...f].slice(0, 7));
    }, 420);
    return () => clearInterval(id);
  }, []);

  return { cells, soc, amps, temp, frames };
}

function VimPanel() {
  const { cells, soc, amps, temp, frames } = useTelemetry();
  const min = Math.min(...cells);
  const max = Math.max(...cells);
  const delta = ((max - min) * 1000).toFixed(0);
  const pack = (cells.reduce((a, b) => a + b, 0)).toFixed(2);

  return (
    <div className="hud-corners noise relative rounded-xl border border-volt/25 bg-abyss/90 p-4 shadow-[0_30px_80px_-30px_rgba(0,229,255,0.35)] sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
          <span className="whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
            BMS card · live
          </span>
        </div>
        <div className="hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint sm:flex">
          <span>CAN1 500k</span>
          <span className="text-lime">EC200 REG</span>
          <span>GNSS 3D</span>
        </div>
      </div>

      {/* Pack readouts */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          { k: "SOC", v: `${soc.toFixed(1)}%`, tone: "text-volt" },
          { k: "Pack", v: `${pack} V`, tone: "text-ink" },
          { k: "Current", v: `${amps.toFixed(1)} A`, tone: "text-amber-sig" },
          { k: "Temp", v: `${temp.toFixed(1)} °C`, tone: "text-ink" },
        ].map((r) => (
          <div key={r.k} className="rounded-md border border-hairline bg-void/60 px-2.5 py-2">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">{r.k}</div>
            <div className={`mt-0.5 font-display text-base font-bold tabular-nums sm:text-lg ${r.tone}`}>{r.v}</div>
          </div>
        ))}
      </div>

      {/* Cell voltages */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
            Cell voltages · {CELLS}S
          </span>
          <span className="font-mono text-[9px] tabular-nums text-ink-faint">
            min {min.toFixed(3)} · max {max.toFixed(3)} · Δ{" "}
            <span className={Number(delta) > 60 ? "text-amber-sig" : "text-lime"}>{delta} mV</span>
          </span>
        </div>
        <div className="mt-2 flex h-20 items-end gap-[3px]">
          {cells.map((v, i) => {
            const pct = ((v - 3.5) / 0.3) * 100;
            const hot = v === max;
            const low = v === min;
            return (
              <div key={i} className="group relative flex h-full flex-1 items-end">
                <div
                  className={`w-full rounded-sm transition-[height] duration-500 ${
                    hot ? "bg-amber-sig" : low ? "bg-volt-deep" : "bg-volt/80"
                  }`}
                  style={{ height: `${Math.max(8, Math.min(100, pct))}%` }}
                />
                <span className="pointer-events-none absolute -top-4 left-1/2 hidden -translate-x-1/2 font-mono text-[8px] tabular-nums text-ink group-hover:block">
                  {v.toFixed(3)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-1 flex justify-between font-mono text-[8px] tabular-nums text-ink-faint">
          <span>C1</span><span>C8</span><span>C16</span>
        </div>
      </div>

      {/* CAN log */}
      <div className="mt-4 rounded-md border border-hairline bg-void/70 p-2.5">
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
          <span>CAN1 · RX</span>
          <span>{frames.length ? "streaming" : "waiting"}</span>
        </div>
        <ul className="mt-1.5 space-y-[3px] font-mono text-[9.5px] leading-tight sm:text-[10px]">
          {frames.map((f, i) => (
            <li
              key={`${f.t}-${i}`}
              className={`flex gap-2 whitespace-nowrap tabular-nums ${i === 0 ? "text-ink" : "text-ink-faint"}`}
            >
              <span className="w-14 shrink-0 text-right">{f.t}</span>
              <span className="w-11 shrink-0 text-volt">{f.id}</span>
              <span className="hidden w-16 shrink-0 text-ink-dim sm:inline">{f.name}</span>
              <span className="shrink-0">[{f.dlc}]</span>
              <span className="truncate">{f.data}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
        <span>Uplink → VEC-TR · 1 Hz</span>
        <span className="text-lime">last ack 0.3 s</span>
      </div>
    </div>
  );
}

const SIGNALS = [
  { k: "Team", v: "IoT · Vecmocon Technologies" },
  { k: "Builds", v: "BMS IoT card · Fleet GPS device" },
  { k: "Silicon", v: "TI MCU · STM32 · ESP32" },
  { k: "Bus", v: "CAN · BMS · VCU · Motor ctrl" },
  { k: "Uplink", v: "Quectel EC200 → VEC-TR / Battery Buddy" },
  { k: "Fleet", v: "20,000+ devices in the field" },
];

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
        <div>
          <SectionHeading
            index="01"
            kicker="About"
            title={
              <>
                Firmware that has to work
                <br />
                <span className="text-gradient-volt">when nobody is watching</span>
              </>
            }
          />

          <Reveal delay={0.08}>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink-dim">
              <p>
                I&apos;m an embedded software engineer on the IoT team at{" "}
                <strong className="font-semibold text-ink">Vecmocon Technologies</strong>,
                where we build the connected hardware that ships inside electric
                two- and three-wheelers. I work across several IoT cards — a
                BMS-integrated card and fleet-management GPS devices — writing TI
                MCU firmware that talks to the vehicle&apos;s BMS, motor controller and
                VCU over CAN and gets the data off the vehicle through Quectel
                EC200 cellular.
              </p>
              <p>
                The data lands in{" "}
                <strong className="font-semibold text-ink">VEC-TR</strong> and{" "}
                <strong className="font-semibold text-ink">Battery Buddy</strong>,
                our in-house platforms for fleet storage and analytics, and I spend
                real time on the other side of that pipe: analysing telemetry from
                20,000+ deployed devices to find what the field is doing to our
                firmware. I also built a BLE mobile app for EV scooter control and
                a fleet-management UI that talk directly to the card.
              </p>
              <p>
                Reliability is the whole job. A device that is genuinely
                field-dependable is what lets a company win and keep OEM and fleet
                clients, so testing and debugging are part of how I write code,
                not a phase at the end. Right now I&apos;m adding MATLAB/Simulink for
                application-layer code on the card, going deeper on BMS, and
                building working knowledge of{" "}
                <strong className="font-semibold text-ink">AIS-140</strong>.
              </p>
              <p>
                Before Vecmocon, at MLworkX I owned embedded products for global
                clients end to end — schematic design through firmware architecture
                to commercial deployment — including a vehicle telematics device on
                STM32 with CAN, Neoway N58 GSM, MQTT to ThingsBoard and FOTA. I also
                hold a granted Indian patent and an IEEE best-paper award from my
                antenna research.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
              {SIGNALS.map((s) => (
                <div
                  key={s.k}
                  className="flex items-baseline justify-between gap-4 border-b border-hairline py-3"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {s.k}
                  </dt>
                  <dd className="text-right font-mono text-[11px] text-volt-soft">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:pt-24">
          <VimPanel />
          <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
            Simulated readout · the real one is under NDA
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
