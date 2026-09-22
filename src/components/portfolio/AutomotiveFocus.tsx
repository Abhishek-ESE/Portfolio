import type { CSSProperties } from "react";
import { TechnicalIcon } from "./Icons";

const focusAreas = [
  { title: "Automotive MCU firmware", body: "C/C++ firmware, peripheral integration, real-time task design and hardware bring-up across TI MCU, STM32 and ESP32 platforms.", skills: ["Embedded C / C++", "FreeRTOS", "Bootloaders", "JTAG / SWD"] },
  { title: "Vehicle networks & control", body: "CAN-based integration with battery, vehicle and motor-control systems, backed by bench debugging and field telemetry analysis.", skills: ["CAN", "BMS", "VCU", "Motor controller"] },
  { title: "Connected automotive edge", body: "Vehicle-side cellular, GPS and BLE systems that move telemetry from embedded hardware to fleet platforms and mobile apps.", skills: ["Quectel EC200", "MQTT / HTTP", "GPS", "BLE GATT"] },
] as const;

export function AutomotiveFocus() {
  return <section className="automotive-focus" id="automotive" aria-labelledby="automotive-title"><div className="shell section">
    <div className="automotive-heading" data-reveal><div><span className="eyebrow section-label"><span>03 /</span> AUTOMOTIVE ENGINEERING FIT</span><h2 id="automotive-title">Built for the point where<br/><span>silicon meets the vehicle.</span></h2></div><div className="target-note"><span className="target-cross">+</span><p>Targeting embedded and automotive product teams at companies such as Texas Instruments, NXP, KPIT and Qualcomm.</p></div></div>
    <div className="automotive-grid">{focusAreas.map((area,index)=><article className="automotive-card" key={area.title} data-reveal style={{"--delay":`${index*90}ms`} as CSSProperties}><div className="automotive-card-top"><span>0{index+1}</span><TechnicalIcon kind={index}/></div><h3>{area.title}</h3><p>{area.body}</p><div className="automotive-skills">{area.skills.map(skill=><span key={skill}>{skill}</span>)}</div><div className="signal-line"><i/><i/><i/><i/></div></article>)}</div>
    <div className="role-strip" data-reveal><span>ROLE DIRECTION</span><strong>Embedded Software Engineer</strong><i/><strong>Automotive Firmware Engineer</strong><i/><strong>Vehicle Connectivity Engineer</strong></div>
  </div></section>;
}
