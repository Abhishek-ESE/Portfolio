export const site = {
  name: "Abhishek Agrahari",
  shortName: "Abhishek",
  initials: "AA",
  roles: ["Embedded Software Engineer", "EV Systems & Firmware Consultant"],
  titleLine: "EV Firmware Developer",
  subtitle:
    "TI MCU • STM32 / ESP32 • BMS / VCU / CAN • Vehicle Intelligence & Telematics",
  location: "Noida, Uttar Pradesh, India",
  email: "abhishekagrahari0031@gmail.com",
  phone: "+91 89573 99440",
  linkedin: "https://www.linkedin.com/in/abhishekagrahari-embedded/",
  github: "https://github.com/Abhishek-ESE",
  resumeHref: "/Abhishek_Agrahari_Resume.pdf",
  photo: "/profile.jpg",
  availability: "Open to EV / automotive embedded roles & consulting",

  heroLead:
    "I build the firmware that keeps electric vehicles alive on the road — vehicle intelligence modules that talk to the BMS, motor controller and VCU over CAN, stay connected over cellular, and hold up in the field at fleet scale.",

  metrics: [
    { value: "1.5+", label: "Years shipping production firmware" },
    { value: "2K+", label: "Production units validated" },
    { value: "90%", label: "Field issue reduction" },
    { value: "4", label: "MCU families shipped on" },
  ],
} as const;

export type Domain = "EV" | "IoT" | "Medical" | "Industrial" | "RF";

export const experience = [
  {
    company: "Vecmocon Technologies",
    role: "Embedded Software Engineer",
    period: "May 2026 — Present",
    location: "Noida, India",
    current: true,
    focus: "EV Vehicle Intelligence",
    blurb:
      "Building automotive-grade Vehicle Intelligence Modules — the box that sits between the vehicle and the cloud.",
    points: [
      "Develop firmware on TI MCUs for Vehicle Intelligence Modules interfacing a vehicle's BMS, motor controller and VCU over CAN.",
      "Integrate Quectel EC200-series cellular modules for real-time vehicle connectivity and telemetry uplink.",
      "Treat reliability as a first-class requirement — rigorous testing and debugging built into the development cycle for OEM and fleet-scale field dependability.",
      "Building working expertise in AIS-140, India's compliance standard for vehicle tracking and telematics devices.",
    ],
    stack: [
      "TI MCU",
      "STM32",
      "ESP32",
      "CAN",
      "BMS",
      "VCU",
      "Quectel EC200",
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
      "Remote diagnostics and remote firmware upgrade on one device — the same BMS/VCU/CAN plus cellular pattern used in production EV telematics.",
    stack: ["STM32", "CAN", "Neoway N58", "MQTT", "ThingsBoard", "FOTA", "HTTP"],
  },
  {
    id: "pill-dispenser",
    title: "Automatic Pill Dispenser",
    tagline: "Commercial product, US client",
    domain: "Medical" as Domain,
    period: "Nov 2025 — Mar 2026",
    featured: true,
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
    featured: true,
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

export const skillGroups = [
  {
    key: "ev",
    title: "EV & Automotive",
    accent: "cyan" as const,
    caption: "The stack I build on today",
    items: [
      "CAN / CAN-FD",
      "BMS Integration",
      "VCU Interfacing",
      "Motor Controller Comms",
      "Vehicle Intelligence Module",
      "AIS-140 Compliance",
      "Telematics & GPS",
      "FOTA / OTA Update",
    ],
  },
  {
    key: "mcu",
    title: "Microcontrollers",
    accent: "lime" as const,
    caption: "Silicon I have shipped on",
    items: [
      "TI MCU",
      "STM32 (F1 / F4)",
      "ESP32 / ESP32-S3",
      "ARM Cortex-M",
      "ATmega328P",
      "8051",
    ],
  },
  {
    key: "rtos",
    title: "Languages & RTOS",
    accent: "cyan" as const,
    caption: "How the firmware is written",
    items: [
      "C",
      "C++",
      "Python",
      "Assembly",
      "FreeRTOS",
      "CMSIS-RTOS",
      "embOS",
      "Bare-metal",
    ],
  },
  {
    key: "protocol",
    title: "Protocols & Connectivity",
    accent: "amber" as const,
    caption: "How devices talk",
    items: [
      "UART",
      "SPI",
      "I2C",
      "CAN",
      "BLE",
      "MQTT",
      "HTTP",
      "NB-IoT",
      "Quectel EC200",
      "Neoway N58",
    ],
  },
  {
    key: "arch",
    title: "Firmware Architecture",
    accent: "lime" as const,
    caption: "What separates working from reliable",
    items: [
      "Bootloaders",
      "Interrupt-driven Design",
      "Multi-threading",
      "Memory Optimisation",
      "Low-power Design",
      "DMA",
      "Peripheral Drivers",
      "State Machines",
    ],
  },
  {
    key: "tools",
    title: "Debug & Validation",
    accent: "amber" as const,
    caption: "Proving it works before the field does",
    items: [
      "JTAG / SWD",
      "Logic Analyser",
      "Oscilloscope",
      "CAN Analyser",
      "STM32CubeIDE",
      "Keil uVision",
      "Git",
      "Jira",
    ],
  },
] as const;

export const services = [
  {
    title: "EV Firmware Development",
    icon: "battery" as const,
    body: "Production firmware for vehicle-side ECUs — BMS interfacing, VCU and motor-controller communication over CAN, and the state machines that keep a vehicle safe when something goes wrong.",
    tags: ["CAN", "BMS", "VCU", "TI MCU", "STM32"],
  },
  {
    title: "Telematics & Connectivity",
    icon: "signal" as const,
    body: "Cellular-connected vehicle intelligence: Quectel and Neoway modem integration, MQTT telemetry pipelines, GPS tracking, and AIS-140-aligned device behaviour.",
    tags: ["Quectel EC200", "MQTT", "GPS", "AIS-140"],
  },
  {
    title: "OTA & Bootloader Design",
    icon: "upload" as const,
    body: "Field-updatable devices done properly — flash layout, image validation, safe rollback, and update transport over UART, HTTP or cellular.",
    tags: ["FOTA", "Flash Layout", "CRC", "Rollback"],
  },
  {
    title: "Hardware Bring-up & Debug",
    icon: "scope" as const,
    body: "New board, nothing boots, no idea why. Schematic review, bring-up, signal validation on scope and logic analyser, and JTAG/SWD debugging down to the register.",
    tags: ["Bring-up", "JTAG / SWD", "Signal Validation"],
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
