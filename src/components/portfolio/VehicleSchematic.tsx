"use client";

import { useId } from "react";

export type VehicleView = "vehicle" | "firmware" | "cloud";

type Point = [number, number, number?];

// A single projection keeps every board, cell, and cable on the same chassis.
const project = ([u, v, z = 0]: Point) => ({
  x: 115 + u * 0.92 + v * 0.84,
  y: 260 - u * 0.47 + v * 0.43 - z,
});
const points = (...vertices: Point[]) =>
  vertices.map((vertex) => {
    const { x, y } = project(vertex);
    return `${x},${y}`;
  }).join(" ");
const plane = (u: number, v: number, width: number, depth: number, z = 0) =>
  points([u, v, z], [u + width, v, z], [u + width, v + depth, z], [u, v + depth, z]);
const route = (...vertices: Point[]) =>
  vertices.map((vertex, index) => {
    const { x, y } = project(vertex);
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ");

function Wheel({ u, v, near, rimId }: { u: number; v: number; near?: boolean; rimId: string }) {
  const { x, y } = project([u, v, 6]);
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-16 -24 C-7 -39 10 -39 20 -29 L34 -22 C46 -13 43 17 30 31 C21 41 8 38 -2 31 L-16 24Z" fill="#0b1612" stroke="#45604d" strokeWidth="1" />
      <path d="M-13 -25 L4 -17 M-6 -31 L11 -23 M3 -33 L20 -25 M12 -31 L29 -23 M-19 -15 L-2 -7 M-20 -4 L-3 4 M-17 9 L0 17 M-12 20 L5 28" stroke="#263a2e" strokeWidth="2.5" />
      <ellipse cx="18" cy="5" rx="22" ry="33" transform="rotate(22 18 5)" fill="#101c16" stroke="#4b6251" strokeWidth="1.1" />
      <ellipse cx="18" cy="5" rx="15.5" ry="25" transform="rotate(22 18 5)" fill={`url(#${rimId})`} stroke="#6c806b" strokeWidth="1" />
      <ellipse cx="18" cy="5" rx="10.5" ry="18" transform="rotate(22 18 5)" fill="#17281e" stroke="#85927b" strokeOpacity=".65" />
      <g transform="translate(18 5) rotate(22)" stroke={near ? "#9aa68c" : "#71856d"} strokeWidth="2.4">
        <path d="M0 -17V-5 M9 -8L3 -2 M9 9L3 3 M0 17V5 M-9 8L-3 2 M-9 -9L-3 -3" />
        <ellipse rx="3.2" ry="5" fill="#afbaa1" stroke="none" />
      </g>
    </g>
  );
}

export function VehicleSchematic({ active = "vehicle" }: { active?: VehicleView }) {
  const uid = useId().replace(/:/g, "");
  const ids = { metal: `${uid}-metal`, rim: `${uid}-rim`, glow: `${uid}-glow`, bg: `${uid}-bg`, title: `${uid}-title`, desc: `${uid}-desc` };
  const power = active === "vehicle";
  const firmware = active === "firmware";
  const connected = active === "cloud";
  const bus = firmware ? "#d6fc9a" : "#75a992";
  const bms = project([48, 79, 25]);
  const vcu = project([288, 89, 27]);
  const antenna = project([287, 25, 62]);
  const can = project([195, 146, 13]);

  return (
    <svg viewBox="0 0 640 470" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby={`${ids.title} ${ids.desc}`} className="vehicle-schematic">
      <title id={ids.title}>Electric vehicle systems, from battery to cloud</title>
      <desc id={ids.desc}>An isometric electric vehicle platform showing a battery pack, battery management system, vehicle control unit, routed CAN bus, and a telemetry antenna. This is a conceptual architecture illustration.</desc>
      <defs>
        <linearGradient id={ids.bg} x1="30" y1="0" x2="600" y2="470" gradientUnits="userSpaceOnUse">
          <stop stopColor="#233c2f" /><stop offset="1" stopColor="#14251e" />
        </linearGradient>
        <linearGradient id={ids.metal} x1="160" y1="160" x2="430" y2="320" gradientUnits="userSpaceOnUse">
          <stop stopColor="#91a48a" /><stop offset=".46" stopColor="#5d765e" /><stop offset="1" stopColor="#3d5744" />
        </linearGradient>
        <linearGradient id={ids.rim} x1="3" y1="-20" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a4b294" /><stop offset=".4" stopColor="#566b51" /><stop offset="1" stopColor="#344932" />
        </linearGradient>
        <radialGradient id={ids.glow}>
          <stop stopColor="#9fd861" stopOpacity=".1" /><stop offset="1" stopColor="#9fd861" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="640" height="470" rx="4" fill={`url(#${ids.bg})`} />
      <ellipse cx="340" cy="252" rx="285" ry="187" fill={`url(#${ids.glow})`} />
      <g stroke="#90ab8c" strokeOpacity=".065" strokeWidth=".8">
        {Array.from({ length: 10 }, (_, index) => <path key={`long-${index}`} d={route([-80, index * 42 - 100, -34], [425, index * 42 - 100, -34])} />)}
        {Array.from({ length: 12 }, (_, index) => <path key={`cross-${index}`} d={route([index * 42 - 80, -100, -34], [index * 42 - 80, 278, -34])} />)}
      </g>

      <g fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace">
        <circle cx="29" cy="31" r="3" fill="#c2ef65" />
        <text x="41" y="35" fill="#dde7d5" fontSize="10" letterSpacing="1.4">EV SYSTEM ARCHITECTURE</text>
        <text x="28" y="54" fill="#91a38b" fontSize="8" letterSpacing="1.3">BATTERY · EMBEDDED · CONNECTED</text>
      </g>

      <path d={plane(-1, -5, 335, 175, -39)} fill="#06130d" opacity=".25" transform="translate(8 6)" />
      <Wheel u={34} v={-22} rimId={ids.rim} />
      <Wheel u={282} v={-22} rimId={ids.rim} />

      {/* Chassis: the two visible edges and the upper deck. */}
      <polygon points={points([0, 0, 0], [0, 160, 0], [0, 160, -13], [0, 0, -13])} fill="#314837" stroke="#70836a" strokeWidth="1" />
      <polygon points={points([0, 160, 0], [320, 160, 0], [320, 160, -13], [0, 160, -13])} fill="#283f2e" stroke="#70836a" strokeWidth="1" />
      <polygon points={plane(0, 0, 320, 160)} fill={`url(#${ids.metal})`} stroke="#a1b093" strokeWidth="1.25" />
      <polygon points={plane(9, 9, 302, 142, 1)} fill="#304b38" stroke="#819476" strokeWidth=".65" />
      <path d={route([9, 17, 3], [311, 17, 3], [311, 142, 3], [9, 142, 3], [9, 17, 3])} stroke="#8ea381" strokeOpacity=".45" strokeWidth="2" />
      <path d={route([16, 4, 3], [16, 154, 3])} stroke="#243b2b" strokeWidth="4" />
      <path d={route([303, 4, 3], [303, 154, 3])} stroke="#243b2b" strokeWidth="4" />

      {/* Mechanical fixings, kept in the same projected coordinate system. */}
      {[14, 60, 258, 306].flatMap((u) => [10, 150].map((v) => {
        const pos = project([u, v, 2]);
        return <ellipse key={`bolt-${u}-${v}`} cx={pos.x} cy={pos.y} rx="2.4" ry="1.3" fill="#bcc7ad" stroke="#243c2a" strokeWidth=".8" />;
      }))}

      <g className="can-bus-lines" opacity={firmware ? 1 : .75} style={{ transition: "opacity 400ms ease" }}>
        <path d={route([46, 108, 12], [46, 146, 12], [285, 146, 12], [285, 110, 17])} stroke="#16382a" strokeWidth="7" strokeLinejoin="round" />
        <path d={route([46, 108, 13], [46, 146, 13], [285, 146, 13], [285, 110, 18])} stroke={bus} strokeWidth="2.5" strokeLinejoin="round" />
        <path d={route([46, 108, 13], [46, 140, 13], [279, 140, 13], [279, 110, 18])} stroke={bus} strokeWidth=".85" strokeLinejoin="round" opacity=".65" />
      </g>

      {/* Battery tray and twenty-four individually modelled modules. */}
      <polygon points={points([66, 27, 15], [66, 134, 15], [66, 134, 4], [66, 27, 4])} fill="#344731" stroke="#7b9565" strokeWidth=".8" />
      <polygon points={points([66, 134, 15], [248, 134, 15], [248, 134, 4], [66, 134, 4])} fill="#273e2c" stroke="#7b9565" strokeWidth=".8" />
      <polygon points={plane(66, 27, 182, 107, 15)} fill="#1b3122" stroke="#90aa73" strokeWidth="1.25" />
      <g className="battery-modules" opacity={power ? 1 : .68} style={{ transition: "opacity 400ms ease" }}>
        {Array.from({ length: 24 }, (_, index) => {
          const u = 74 + (index % 6) * 28;
          const v = 35 + Math.floor(index / 6) * 23;
          const tint = (index % 6 + Math.floor(index / 6)) % 3;
          return (
            <g key={`cell-${index}`}>
              <polygon points={points([u, v, 29], [u, v + 17, 29], [u, v + 17, 17], [u, v, 17])} fill="#769448" stroke="#142d1c" strokeWidth=".65" />
              <polygon points={points([u, v + 17, 29], [u + 23, v + 17, 29], [u + 23, v + 17, 17], [u, v + 17, 17])} fill="#67843e" stroke="#142d1c" strokeWidth=".65" />
              <polygon points={plane(u, v, 23, 17, 29)} fill={["#c2ef65", "#b6df61", "#d0ed87"][tint]} stroke="#e0f6aa" strokeWidth=".55" />
              <path d={route([u + 3, v + 4, 29.3], [u + 20, v + 4, 29.3])} stroke="#617f39" strokeWidth="1.3" opacity=".55" />
              <polygon points={plane(u + 4, v + 11, 3, 3, 29.4)} fill="#ecf5c6" />
              <polygon points={plane(u + 16, v + 11, 3, 3, 29.4)} fill="#ecf5c6" />
            </g>
          );
        })}
      </g>
      <path d={route([67, 135, 11], [247, 135, 11])} stroke={power ? "#b9e968" : "#718e52"} strokeWidth="1.7" />

      {/* BMS board beside the cell pack. */}
      <polygon points={plane(29, 42, 30, 78, 15)} fill="#193e30" stroke={firmware ? "#c2ef65" : "#8baf8b"} strokeWidth="1.1" />
      {[51, 67, 83, 99].map((v) => (
        <g key={`bms-chip-${v}`}>
          <path d={route([32, v + 4, 16], [56, v + 4, 16])} stroke="#a2b780" strokeWidth="4" strokeDasharray="1.4 2" />
          <polygon points={plane(37, v, 12, 9, 18)} fill="#091e15" stroke="#729a75" strokeWidth=".6" />
        </g>
      ))}
      <path d={route([57, 54, 17], [64, 54, 17], [64, 45, 17], [74, 45, 27])} stroke="#d0d195" strokeWidth="1.5" />
      <path d={route([57, 104, 17], [64, 104, 17], [64, 114, 17], [74, 114, 27])} stroke="#d0d195" strokeWidth="1.5" />

      {/* Vehicle control unit: plated traces, package, and mounting holes. */}
      <polygon points={points([263, 41, 18], [263, 124, 18], [263, 124, 12], [263, 41, 12])} fill="#12362b" />
      <polygon points={plane(263, 41, 43, 83, 18)} fill={firmware ? "#327659" : "#285e4c"} stroke={firmware ? "#b9ed88" : "#82b99c"} strokeWidth="1.2" />
      <g stroke="#96c3a1" strokeWidth=".75" opacity=".75">
        <path d={route([269, 47, 19], [277, 47, 19], [277, 67, 19])} />
        <path d={route([300, 47, 19], [292, 47, 19], [292, 67, 19])} />
        <path d={route([269, 115, 19], [277, 115, 19], [277, 94, 19])} />
        <path d={route([300, 115, 19], [291, 115, 19], [291, 94, 19])} />
        <path d={route([267, 56, 19], [273, 56, 19], [273, 74, 19])} />
        <path d={route([303, 56, 19], [297, 56, 19], [297, 74, 19])} />
      </g>
      {Array.from({ length: 7 }, (_, index) => (
        <g key={`vcu-pin-${index}`} stroke="#c6cbb0" strokeWidth="1.5">
          <path d={route([271, 71 + index * 3, 21], [298, 71 + index * 3, 21])} />
          <path d={route([276 + index * 2.4, 66, 21], [276 + index * 2.4, 94, 21])} />
        </g>
      ))}
      <polygon points={plane(273, 68, 22, 24, 24)} fill="#102c20" stroke="#99b794" strokeWidth=".9" />
      <polygon points={plane(277, 73, 14, 14, 24.4)} fill="#1b3c2a" stroke="#5b8060" strokeWidth=".6" />
      {[267, 302].flatMap((u) => [46, 119].map((v) => {
        const pos = project([u, v, 18.5]);
        return <ellipse key={`board-bolt-${u}-${v}`} cx={pos.x} cy={pos.y} rx="1.8" ry="1" fill="#d7dfbb" />;
      }))}

      {/* Telemetry module and a small antenna, separate from the controller. */}
      <polygon points={plane(267, 8, 35, 22, 16)} fill="#7e9682" stroke="#b2c4a4" strokeWidth=".8" />
      <polygon points={plane(274, 12, 21, 12, 20)} fill="#b5c3a5" stroke="#d5dec3" strokeWidth=".7" />
      <path d={route([287, 25, 20], [287, 25, 59])} stroke={connected ? "#d1f48c" : "#93af96"} strokeWidth="2.4" />
      <circle cx={antenna.x} cy={antenna.y} r="2.8" fill={connected ? "#d1f48c" : "#c6d8b3"} />
      <g className="antenna-signal" stroke={connected ? "#c2ef65" : "#87a88d"} strokeWidth="1.15" strokeLinecap="round" opacity={connected ? .95 : .42} style={{ transition: "opacity 400ms ease" }}>
        <path d={`M${antenna.x - 8} ${antenna.y - 7} Q${antenna.x} ${antenna.y - 14} ${antenna.x + 8} ${antenna.y - 7}`} />
        <path d={`M${antenna.x - 14} ${antenna.y - 13} Q${antenna.x} ${antenna.y - 24} ${antenna.x + 14} ${antenna.y - 13}`} />
      </g>
      <path d={route([297, 28, 17], [311, 28, 13], [311, 57, 13], [302, 57, 19])} stroke={connected ? "#c2ef65" : "#789c87"} strokeWidth="1.5" />

      <Wheel u={34} v={148} near rimId={ids.rim} />
      <Wheel u={282} v={148} near rimId={ids.rim} />

      {/* Restrained technical callouts, not simulated measurements. */}
      <g fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace" fontSize="10" letterSpacing="1.3">
        <g opacity={active === "vehicle" || firmware ? 1 : .5}>
          <path d={`M${bms.x} ${bms.y} L146 187 H56`} stroke="#96b191" strokeWidth=".75" />
          <circle cx={bms.x} cy={bms.y} r="2.5" fill="#c2ef65" />
          <text x="56" y="177" fill="#d9e7cc">BMS</text>
          <text x="56" y="203" fill="#869d81" fontSize="8" letterSpacing=".15">CELL SUPERVISION</text>
        </g>
        <g opacity={firmware ? 1 : .68}>
          <path d={`M${vcu.x} ${vcu.y} L510 115 H581`} stroke="#96b191" strokeWidth=".75" />
          <circle cx={vcu.x} cy={vcu.y} r="2.5" fill="#c2ef65" />
          <text x="547" y="105" fill="#d9e7cc">VCU</text>
          <path d={`M${can.x} ${can.y} L464 295 H551`} stroke="#96b191" strokeWidth=".75" />
          <circle cx={can.x} cy={can.y} r="2.5" fill="#c2ef65" />
          <text x="491" y="312" fill="#d9e7cc">CAN BUS</text>
        </g>
        <g opacity={connected ? 1 : .6}>
          <path d={`M${antenna.x + 7} ${antenna.y + 5} L445 61 H553`} stroke="#96b191" strokeWidth=".75" />
          <text x="462" y="51" fill="#d9e7cc" fontSize="9">TELEMATICS</text>
        </g>
      </g>

      <g transform="translate(49 356)" strokeWidth="1" strokeLinecap="round">
        <path d="M0 26V0 M0 26L24 13 M0 26L24 39" stroke="#708568" />
        <circle cy="26" r="2" fill="#b5c7a1" />
      </g>
      <path d="M28 418H612" stroke="#aac396" strokeOpacity=".16" />
      <g fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace" fontSize="8" letterSpacing=".3">
        <text x="28" y="442" fill="#8da285">Conceptual architecture · not a hardware drawing</text>
        <text x="612" y="442" textAnchor="end" fill="#bbd1a9">SYSTEM / 01</text>
      </g>
    </svg>
  );
}

export default VehicleSchematic;
