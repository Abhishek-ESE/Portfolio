export const site = {
  name: "Abhishek Agrahari",
  shortName: "Abhishek",
  initials: "AA",
  roles: ["Embedded Software Engineer", "EV Systems & Firmware Consultant"],
  titleLine: "EV Firmware Developer",
  subtitle: "TI MCU • Quectel EC200 • CAN / BMS / VCU • Fleet Telematics",
  location: "Noida, Uttar Pradesh, India",
  email: "abhishekagrahari0031@gmail.com",
  phone: "+91 89573 99440",
  linkedin: "https://www.linkedin.com/in/abhishekagrahari-embedded/",
  github: "https://github.com/Abhishek-ESE",
  resumeHref: "/Abhishek_Agrahari_Resume.pdf",
  photo: "/profile.jpg",
  photoCutout: "/profile-cutout.webp",
  availability: "Open to EV / automotive embedded roles & consulting",

  heroLead:
    "On the IoT team at Vecmocon I build the connected cards that ship inside electric two- and three-wheelers — BMS and fleet-GPS devices on TI MCUs and Quectel EC200 — and I work with the telemetry coming back from 20,000+ devices already on the road.",

  metrics: [
    { value: "20K+", label: "Fleet devices analysed" },
    { value: "2K+", label: "Production units validated" },
    { value: "90%", label: "Field issue reduction" },
    { value: "1.5+", label: "Years shipping firmware" },
  ],
} as const;

export type Domain = "EV" | "IoT" | "Medical" | "Industrial" | "RF";

export const experience = [
  {
    company: "Vecmocon Technologies",
    role: "Embedded Software Engineer — IoT Team",
    period: "May 2026 — Present",
    location: "Noida, India",
    current: true,
    focus: "EV IoT Cards · Fleet Telematics",
    blurb:
      "Building the connected hardware inside electric two- and three-wheelers — multiple IoT cards, each for a different vehicle application, feeding a fleet-scale data platform.",
    points: [
      "Develop TI MCU firmware for multiple EV IoT cards — a BMS-integrated card and fleet-management GPS devices — each interfacing the vehicle's BMS, motor controller and VCU over CAN.",
      "Integrate Quectel EC200-series cellular modules for real-time uplink; stream device telemetry into Battery Buddy and VEC-TR, Vecmocon's in-house server for fleet data storage and analytics.",
      "Built a BLE mobile app for EV scooter control and a fleet-management user interface that talk directly to the IoT card.",
      "Analyse fleet telemetry from 20,000+ devices deployed in the market to surface field failure patterns and feed fixes back into firmware.",
      "Developing application-layer code for the card in MATLAB/Simulink; deepening BMS domain expertise and AIS-140 telematics compliance knowledge.",
    ],
    stack: [
      "TI MCU",
      "Quectel EC200",
      "CAN",
      "BMS",
      "VCU",
      "BLE",
      "GPS",
      "VEC-TR",
      "Battery Buddy",
      "MATLAB / Simulink",
      "AIS-140",
    ],
  },
  {
    company: "MLworkX Pvt. Ltd.",
    role: "Embedded Software Engineer",
    period: "Jun 2025 — May 2026",
    location: "Noida, India",
    current: false,
    focus: "End-to-end Product R&D",
    blurb:
      "Owned embedded products for global clients from schematic through firmware architecture to commercial deployment.",
    points: [
      "Developed and validated firmware across ESP32, STM32 and 8051 platforms for multiple R&D programmes; integrated UART-based cellular connectivity (Neoway N58) for real-time IoT communication.",
      "Led real-time debugging and validation with oscilloscope, logic analyser and JTAG/SWD — reduced field issues by 90% and validated 2,000+ production units.",
      "Optimised firmware for low-power operation and owned board bring-up for hardware-software integration on production systems.",
      "Partnered with hardware, QA and product teams to deliver firmware aligned to industry standards.",
    ],
    stack: [
      "STM32",
      "ESP32",
      "8051",
      "FreeRTOS",
      "Neoway N58",
      "MQTT",
      "ThingsBoard",
      "FOTA",
      "Low Power",
    ],
  },
  {
    company: "Surfytech Electronics",
    role: "Embedded Software Engineer Intern",
    period: "Dec 2024 — May 2025",
    location: "Ghaziabad, India",
    current: false,
    focus: "Bare-metal & RTOS Foundations",
    blurb:
      "Cut my teeth on resource-constrained MCUs, where every byte and every interrupt latency actually mattered.",
    points: [
      "Developed embedded firmware for ATmega328P and STM32 in C/C++ with a focus on performance and memory efficiency.",
      "Integrated FreeRTOS into real-time applications to enable multitasking and improve responsiveness.",
      "Designed and built a complete RFID-based access control system — tag scanning, verification and status response.",
      "Built a UART-based FOTA bootloader for over-the-air firmware updates, cutting field maintenance overhead.",
    ],
    stack: ["ATmega328P", "STM32", "FreeRTOS", "Bootloader", "RFID", "JTAG"],
  },
] as const;

export const projects = [
  {
    id: "ev-iot-cards",
    title: "EV IoT Cards — BMS & Fleet GPS",
    tagline: "Vecmocon · TI MCU + Quectel EC200",
    domain: "EV" as Domain,
    period: "May 2026 — Present",
    featured: true,
    summary:
      "A family of automotive IoT cards for electric two- and three-wheelers: a BMS-integrated card that reads pack state over CAN, and fleet-management GPS devices — TI MCU firmware, Quectel EC200 cellular, telemetry landing in Vecmocon's VEC-TR and Battery Buddy platforms.",
    problem:
      "OEMs and fleet operators need one dependable box per vehicle that talks to the BMS, motor controller and VCU, stays online over cellular, and survives years in the field — with a different feature set for each vehicle programme.",
    build: [
      "TI MCU firmware for multiple card variants on a shared driver and CAN layer",
      "BMS / VCU / motor-controller data acquisition over CAN with fault and state reporting",
      "Quectel EC200-series cellular integration — network registration, reconnect logic, data uplink",
      "Telemetry pipeline into VEC-TR (in-house storage and analytics server) and Battery Buddy",
      "GPS tracking with AIS-140-aligned behaviour for the fleet-management variant",
    ],
    impact:
      "Production hardware shipping inside OEM vehicles, backed by a data pipeline that already spans 20,000+ deployed devices.",
    stack: ["TI MCU", "Quectel EC200", "CAN", "BMS", "VCU", "GPS", "VEC-TR", "Battery Buddy", "AIS-140"],
  },
  {
    id: "ble-fleet-app",
    title: "BLE App — EV Scooter Control & Fleet UI",
    tagline: "Vecmocon · Phone ↔ IoT card over BLE",
    domain: "EV" as Domain,
    period: "2026",
    featured: true,
    summary:
      "A BLE mobile application that talks directly to the IoT card for EV scooter control, plus a fleet-management user interface — the operator-facing side of the telematics stack.",
    problem:
      "Riders and fleet operators needed direct, low-latency control and visibility of the vehicle without a round-trip through the cloud.",
    build: [
      "BLE link between the mobile app and the IoT card with a defined command / response protocol",
      "Scooter control and status commands with diagnostics readback over BLE",
      "Fleet-management UI surfacing vehicle state for operators",
    ],
    impact:
      "Direct vehicle control and fleet visibility from a phone, riding on the same card firmware.",
    stack: ["BLE", "TI MCU", "Mobile App", "Fleet Management", "UI"],
  },
  {
    id: "fleet-data",
    title: "Fleet Telemetry Analysis — 20K Devices",
    tagline: "Vecmocon · Field data at scale",
    domain: "EV" as Domain,
    period: "2026",
    featured: false,
    summary:
      "Analysis of fleet telemetry from 20,000+ deployed devices stored in VEC-TR and Battery Buddy — turning field data into firmware fixes and reliability insight.",
    problem:
      "At 20,000 devices, individual bug reports stop being useful. You need to see patterns across the whole fleet to know what to fix first.",
    build: [
      "Queried and analysed device telemetry across the deployed fleet",
      "Identified recurring field failure patterns and connectivity behaviours",
      "Fed findings back into firmware priorities and validation test cases",
    ],
    impact: "Data-driven reliability — fixes prioritised by what the fleet actually does in the field.",
    stack: ["Fleet Telemetry", "Data Analysis", "VEC-TR", "Battery Buddy", "MATLAB"],
  },
  {
    id: "telematics",
    title: "Vehicle Telematics Device",
    tagline: "STM32 + GSM + CAN to Cloud",
    domain: "EV" as Domain,
    period: "Jul 2025 — Sep 2025",
    featured: true,
    summary:
      "A full telematics stack on STM32: pulls live vehicle data off the CAN bus, uplinks over Neoway N58 GSM, streams telemetry to ThingsBoard via MQTT, and takes firmware updates over the air.",
    problem:
      "Fleet operators had no visibility into vehicle health between service intervals, and every firmware fix meant physically recalling units.",
    build: [
      "CAN bus acquisition layer decoding live vehicle parameters from the ECU",
      "Neoway N58 GSM driver over UART with an AT-command state machine and reconnect logic",
      "MQTT client publishing structured telemetry to a ThingsBoard dashboard",
      "FOTA over HTTP with image validation before handoff to the application",
    ],
    impact:
      "Remote diagnostics and remote firmware upgrade on one device — the same BMS/VCU/CAN plus cellular pattern I now ship at Vecmocon.",
    stack: ["STM32", "CAN", "Neoway N58", "MQTT", "ThingsBoard", "FOTA", "HTTP"],
  },
  {
    id: "pill-dispenser",
    title: "Automatic Pill Dispenser",
    tagline: "Commercial product, US client",
    domain: "Medical" as Domain,
    period: "Nov 2025 — Mar 2026",
    featured: false,
    summary:
      "STM32F103 firmware driving 4 motors and a multi-sensor feedback loop for a fully automated medication dispenser, with an Android S720 board handling the UI.",
    problem:
      "Missed and double-dosed medication is a safety problem — the device had to be right on every cycle, unattended.",
    build: [
      "Coordinated 4-motor control with position feedback and jam detection",
      "Multi-sensor confirmation before the state machine advances a dispense",
      "Serial protocol bridging STM32 firmware to the Android S720 UI board",
      "Fail-safe design — the device refuses to advance on an unconfirmed dispense",
    ],
    impact:
      "Delivered end to end and shipped into commercial production for a US client.",
    stack: ["STM32F103", "Motor Control", "Sensor Fusion", "Android S720", "UART"],
  },
  {
    id: "hip-trainer",
    title: "Smart Hip Trainer",
    tagline: "Wearable motion tracking",
    domain: "IoT" as Domain,
    period: "Jan 2026 — Mar 2026",
    featured: false,
    summary:
      "Owned R&D, schematic design and ESP32-S3 firmware for a wearable that tracks hip and full-body motion in real time and streams it to a companion mobile app over BLE.",
    problem:
      "Rehab and training feedback has to be live and wireless — a batch upload after the session is useless to someone mid-exercise.",
    build: [
      "BNO055 (Bosch) 9-DOF IMU integration over I2C with on-chip sensor fusion",
      "Real-time orientation pipeline on ESP32-S3 at a fixed sampling cadence",
      "Custom BLE GATT service streaming motion data to the companion app",
      "Schematic design and full board bring-up owned end to end",
    ],
    impact:
      "Concept to working wearable — hardware design, firmware and app link, single-handed.",
    stack: ["ESP32-S3", "BNO055 IMU", "BLE GATT", "I2C", "Schematic Design"],
  },
  {
    id: "hydrogen",
    title: "Hydrogen Gas Generation System",
    tagline: "Autonomous industrial control",
    domain: "Industrial" as Domain,
    period: "Jun 2025 — Aug 2025",
    featured: false,
    summary:
      "STM32 firmware architecting relay-based motor control with RTC scheduling for autonomous generation cycles, motor-valve synchronisation and emergency safety handling.",
    problem:
      "Hydrogen generation is unforgiving — an unsynchronised valve or a missed shutdown is a safety event, not a bug report.",
    build: [
      "RTC-driven scheduler running unattended generation cycles",
      "Motor-valve synchronisation with interlocks preventing invalid states",
      "Emergency stop and fault handling with a deterministic safe shutdown path",
    ],
    impact: "Fully autonomous operation with a safety layer that fails closed.",
    stack: ["STM32", "RTC", "Relay Control", "Safety Interlocks", "State Machine"],
  },
  {
    id: "fota-bootloader",
    title: "UART FOTA Bootloader",
    tagline: "Update firmware without touching the board",
    domain: "IoT" as Domain,
    period: "2025",
    featured: false,
    summary:
      "A from-scratch UART bootloader supporting over-the-air firmware updates, built to cut field maintenance on deployed units.",
    problem:
      "Every firmware fix meant a physical visit to the device — expensive and slow at any real deployment size.",
    build: [
      "Custom bootloader with application-region flash programming",
      "Packetised UART transfer protocol with CRC integrity checking",
      "Jump-to-application logic gated on an image validity check",
    ],
    impact: "Field updates without a service visit.",
    stack: ["Bootloader", "UART", "CRC", "Flash Programming", "C"],
  },
  {
    id: "rfid-access",
    title: "RFID Access Control System",
    tagline: "Complete scan, verify, respond loop",
    domain: "Industrial" as Domain,
    period: "2025",
    featured: false,
    summary:
      "End-to-end RFID access control — tag scanning, credential verification and status response — built on ATmega328P/STM32 with FreeRTOS.",
    problem:
      "Needed a self-contained access system with deterministic response time and no cloud dependency.",
    build: [
      "RFID reader integration with tag decode and credential lookup",
      "FreeRTOS task split across scanning, verification and indication",
      "Status feedback path for grant and deny outcomes",
    ],
    impact: "Standalone access control with real-time response.",
    stack: ["ATmega328P", "STM32", "FreeRTOS", "RFID", "SPI"],
  },
] as const;

/**
 * The firmware stack, bottom to top. Rendered as a layered architecture
 * diagram — each layer is somewhere I have shipped code, not a keyword list.
 */
export const stackLayers = [
  {
    id: "cloud",
    level: 6,
    title: "Cloud & Fleet Data",
    caption: "Where the telemetry lands",
    accent: "lime" as const,
    items: ["VEC-TR", "Battery Buddy", "ThingsBoard", "MQTT", "Fleet analytics", "MATLAB"],
  },
  {
    id: "app",
    level: 5,
    title: "Application",
    caption: "Vehicle logic and the user-facing side",
    accent: "cyan" as const,
    items: ["State machines", "FOTA / OTA", "BLE mobile app", "Fleet UI", "AIS-140", "Simulink"],
  },
  {
    id: "connectivity",
    level: 4,
    title: "Connectivity",
    caption: "Getting off the vehicle",
    accent: "cyan" as const,
    items: ["Quectel EC200", "Neoway N58", "BLE", "GPS / GNSS", "HTTP", "NB-IoT"],
  },
  {
    id: "bus",
    level: 3,
    title: "Vehicle Bus",
    caption: "Talking to the rest of the EV",
    accent: "amber" as const,
    items: ["CAN / CAN-FD", "BMS", "VCU", "Motor controller", "CAN analyser"],
  },
  {
    id: "rtos",
    level: 2,
    title: "RTOS & Drivers",
    caption: "Deterministic, interrupt-driven, low-power",
    accent: "cyan" as const,
    items: ["FreeRTOS", "CMSIS-RTOS", "embOS", "UART / SPI / I2C", "DMA", "Bootloaders", "Low-power"],
  },
  {
    id: "silicon",
    level: 1,
    title: "Silicon",
    caption: "MCUs I have shipped production code on",
    accent: "lime" as const,
    items: ["TI MCU", "STM32 F1 / F4", "ESP32 / S3", "ARM Cortex-M", "ATmega328P", "8051"],
  },
] as const;

export const bench = {
  title: "On the bench",
  items: ["JTAG / SWD", "Logic analyser", "Oscilloscope", "CAN analyser", "STM32CubeIDE", "Keil µVision", "Git", "Jira"],
  languages: ["C", "C++", "Python", "MATLAB", "Assembly"],
} as const;

export const services = [
  {
    title: "EV IoT & ECU Firmware",
    icon: "battery" as const,
    body: "Production firmware for vehicle-side cards and ECUs — BMS interfacing, VCU and motor-controller communication over CAN, and the state machines that keep a vehicle safe when something goes wrong.",
    tags: ["TI MCU", "STM32", "CAN", "BMS", "VCU"],
  },
  {
    title: "Telematics & Fleet Connectivity",
    icon: "signal" as const,
    body: "Cellular-connected vehicle intelligence end to end: Quectel / Neoway modem integration, GPS tracking, telemetry pipelines into fleet platforms, BLE apps for direct vehicle control, and AIS-140-aligned behaviour.",
    tags: ["Quectel EC200", "GPS", "BLE", "MQTT", "AIS-140"],
  },
  {
    title: "OTA, Bootloaders & Field Updates",
    icon: "upload" as const,
    body: "Field-updatable devices done properly — flash layout, image validation, safe rollback, and update transport over UART, HTTP or cellular. Fixes reach 20,000 vehicles without a single service visit.",
    tags: ["FOTA", "Flash Layout", "CRC", "Rollback"],
  },
  {
    title: "Bring-up, Debug & Fleet Data",
    icon: "scope" as const,
    body: "New board, nothing boots. Schematic review, bring-up, JTAG/SWD down to the register — and once it ships, reading the fleet's telemetry to find what the field is really doing to your firmware.",
    tags: ["Bring-up", "JTAG / SWD", "Fleet Analytics"],
  },
] as const;

export const credentials = {
  education: {
    degree: "B.Tech, Electronics & Communication Engineering",
    school: "United College of Engineering and Research — AKTU, Lucknow",
    period: "Oct 2021 — May 2025",
    detail: "CGPA 8.6 / 10.0 — Department Topper",
  },
  patents: [
    {
      title: "MIMO Antenna",
      detail: "Granted Indian Patent — advanced RF antenna design",
    },
  ],
  publications: [
    {
      title:
        "Performance Analysis of Hybrid Metal-Graphene THz MIMO Antenna with Equivalent ECM",
      detail: "Best Paper Award — ETMCIS 2024, IEEE Conference",
      award: true,
    },
    {
      title:
        "Wideband Reconfigurable THz MIMO Antenna with Enhanced Isolation for 5G/6G Applications",
      detail: "International journal / conference publication",
      award: false,
    },
  ],
  highlights: [
    {
      title: "Live demo aboard INS Airavat",
      body: "Boarded INS Airavat during an active ship refit and presented a live demo of the RedRaven fire detection system directly to the Admiral and Head of Naval Dockyard, Visakhapatnam.",
    },
    {
      title: "Department Topper — ECE",
      body: "Graduated top of the Electronics & Communication department with a Letter of Appreciation for academic and project excellence.",
    },
  ],
  certifications: [
    "Best Paper Award — IEEE Conference",
    "Springer Conference Presentation",
    "Design and Fabrication of Electronic Circuits",
    "Innovation in Circuit Engineering using IoT",
    "Letter of Appreciation",
  ],
  languages: [
    { name: "Hindi", level: "Native / Bilingual" },
    { name: "English", level: "Full Professional" },
  ],
} as const;

export const navLinks = [
  { href: "#about", label: "About", index: "01" },
  { href: "#expertise", label: "Expertise", index: "02" },
  { href: "#experience", label: "Experience", index: "03" },
  { href: "#projects", label: "Projects", index: "04" },
  { href: "#credentials", label: "Credentials", index: "05" },
  { href: "#contact", label: "Contact", index: "06" },
] as const;
