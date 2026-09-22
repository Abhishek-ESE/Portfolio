/** Curated from the existing portfolio and résumé; no new performance claims. */
export const selectedWork = [
  {
    id: "ev-iot-cards",
    title: "Connected systems for electric vehicles",
    category: "EV & automotive",
    eyebrow: "01 / Vehicle connectivity",
    summary:
      "TI MCU firmware connecting vehicle CAN data, cellular telemetry and fleet platforms for electric two- and three-wheelers.",
    stack: ["TI MCU", "CAN", "Quectel EC200", "BMS / VCU", "GPS"],
    problem:
      "Different vehicle programmes need connected devices that collect vehicle state, report it over cellular and support field diagnostics.",
    contributions: [
      "Develop firmware for BMS-integrated IoT cards and fleet-management GPS devices.",
      "Integrate CAN communication with the BMS, VCU and motor controller.",
      "Integrate Quectel EC200 cellular modules for telemetry uplink to VEC-TR and Battery Buddy.",
      "Analyse deployed-device telemetry to identify recurring connectivity and firmware issues.",
    ],
    outcome:
      "Contributing to connected vehicle hardware in production, with field telemetry informing firmware improvements.",
    context: "Vecmocon Technologies · May 2026–present",
    architecture: ["BMS / VCU", "CAN + TI MCU", "EC200 cellular", "Fleet platforms"],
  },
  {
    id: "telematics",
    title: "Vehicle data, from CAN to cloud",
    category: "EV & automotive",
    eyebrow: "02 / Telematics firmware",
    summary:
      "An STM32 telematics device combining CAN acquisition, cellular communication, MQTT telemetry and remote firmware updates.",
    stack: ["STM32", "CAN", "Neoway N58", "MQTT", "FOTA"],
    problem:
      "Fleet operators needed remote access to vehicle data and a way to deliver firmware updates to deployed devices.",
    contributions: [
      "Developed CAN acquisition firmware to decode vehicle parameters.",
      "Integrated the Neoway N58 modem over UART with AT-command handling and reconnect logic.",
      "Published structured telemetry to ThingsBoard using MQTT.",
      "Implemented HTTP firmware update handling with image validation before application handoff.",
    ],
    outcome:
      "Combined vehicle telemetry and remote firmware updates in one embedded device.",
    context: "MLworkX Pvt. Ltd. · July–September 2025",
    architecture: ["Vehicle CAN", "STM32", "N58 + MQTT", "ThingsBoard"],
  },
  {
    id: "pill-dispenser",
    title: "Firmware for an automatic pill dispenser",
    category: "Product engineering",
    eyebrow: "03 / Electromechanical control",
    summary:
      "STM32F103 firmware coordinating four motors, sensor feedback and an Android interface for a commercial dispensing device.",
    stack: ["STM32F103", "Motor control", "Sensors", "UART", "State machines"],
    problem:
      "The dispensing sequence needed coordinated motion, feedback from multiple sensors and communication with the user interface.",
    contributions: [
      "Developed four-motor control with position feedback and jam detection.",
      "Used sensor confirmation to govern transitions in the dispensing state machine.",
      "Implemented serial communication between the STM32 and Android S720 interface board.",
      "Supported hardware integration and firmware delivery for the product.",
    ],
    outcome:
      "Delivered firmware for a device that entered commercial production for a US client.",
    context: "MLworkX Pvt. Ltd. · November 2025–March 2026",
    architecture: ["Android interface", "UART", "STM32 control", "Motors + sensors"],
  },
  {
    id: "hip-trainer",
    title: "A wireless motion-tracking wearable",
    category: "Connected devices",
    eyebrow: "04 / Sensor-to-app development",
    summary:
      "ESP32-S3 hardware and firmware that acquire BNO055 orientation data and stream it to a companion mobile app over BLE.",
    stack: ["ESP32-S3", "BNO055", "I2C", "BLE GATT", "Board bring-up"],
    problem:
      "A wearable trainer needed live motion data in a mobile app without a wired connection.",
    contributions: [
      "Worked from schematic design through board bring-up and firmware development.",
      "Integrated the BNO055 IMU over I2C and acquired its orientation output.",
      "Developed a periodic motion-data acquisition pipeline on ESP32-S3.",
      "Implemented a custom BLE GATT service to stream data to the companion app.",
    ],
    outcome:
      "Built a working wearable prototype connecting motion sensing, embedded processing and mobile visualisation.",
    context: "MLworkX Pvt. Ltd. · January–March 2026",
    architecture: ["BNO055 IMU", "I2C + ESP32-S3", "BLE GATT", "Mobile app"],
  },
] as const;

export const career = [
  {
    company: "Vecmocon Technologies",
    role: "Embedded Software Engineer · IoT Team",
    period: "May 2026–present",
    current: true,
    description:
      "Developing connected embedded systems for electric two- and three-wheelers.",
    points: [
      "Build TI MCU firmware for BMS-integrated IoT cards and fleet GPS devices, connecting vehicle systems over CAN.",
      "Integrate Quectel EC200 cellular telemetry and use fleet data to investigate field issues.",
      "Built a BLE application for scooter control and a fleet-management interface communicating with the IoT card.",
    ],
    stack: ["TI MCU", "CAN", "Quectel EC200", "BLE", "Fleet telemetry"],
  },
  {
    company: "MLworkX Pvt. Ltd.",
    role: "Embedded Software Engineer",
    period: "June 2025–May 2026",
    current: false,
    description:
      "Embedded product development across telematics, connected wearables and electromechanical systems.",
    points: [
      "Developed firmware across STM32, ESP32 and 8051 platforms, contributing from schematic design and bring-up through product validation.",
      "Integrated cellular connectivity, MQTT telemetry and firmware update mechanisms for connected devices.",
      "Debugged hardware and firmware using an oscilloscope, logic analyser and JTAG/SWD; supported production validation and low-power optimisation.",
    ],
    stack: ["STM32", "ESP32", "FreeRTOS", "FOTA", "Hardware validation"],
  },
  {
    company: "Surfytech Electronics",
    role: "Embedded Software Engineer Intern",
    period: "December 2024–May 2025",
    current: false,
    description:
      "Hands-on foundations in microcontroller firmware, real-time tasks and peripheral integration.",
    points: [
      "Developed C/C++ firmware for ATmega328P and STM32 and integrated FreeRTOS tasks.",
      "Built a UART bootloader with flash programming and image integrity checks.",
      "Implemented RFID tag scanning, credential verification and status feedback for an access-control system.",
    ],
    stack: ["C / C++", "STM32", "ATmega328P", "FreeRTOS", "Bootloaders"],
  },
] as const;

export const capabilities = [
  {
    number: "01",
    title: "Embedded firmware",
    description:
      "C/C++ firmware, peripheral drivers and real-time application logic, from board bring-up to field updates.",
    tools: ["C / C++", "FreeRTOS", "STM32 / TI MCU", "UART / SPI / I2C", "Bootloaders"],
  },
  {
    number: "02",
    title: "Vehicle integration",
    description:
      "Acquiring vehicle state and connecting embedded devices with battery, vehicle and motor-control systems.",
    tools: ["CAN", "BMS interfacing", "VCU communication", "GPS", "Vehicle telemetry"],
  },
  {
    number: "03",
    title: "Connected devices",
    description:
      "Modem integration, telemetry uplinks and BLE interfaces connecting device firmware to fleet platforms and mobile apps.",
    tools: ["Quectel EC200", "Neoway N58", "MQTT / HTTP", "BLE GATT", "ThingsBoard"],
  },
  {
    number: "04",
    title: "Debug & validation",
    description:
      "Investigating faults across hardware and software, validating device behaviour and tracing field issues through telemetry.",
    tools: ["JTAG / SWD", "Oscilloscope", "Logic analyser", "Board bring-up", "Fleet data analysis"],
  },
] as const;

export const developmentFocus = [
  "MATLAB / Simulink workflows",
  "BMS domain fundamentals",
  "AIS-140 telematics requirements",
] as const;
