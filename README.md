# ⚡ VoltGuard AI: Digital Twin for Aravali College

**Intelligent Sensing | Autonomous Protection | Edge-First Resilience**

VoltGuard AI is a next-generation **Smart Grid Management System** designed specifically for the **Aravali College of Engineering and Management (ACEM)** campus. By leveraging **Digital Twin** technology and **Signature Analysis**, VoltGuard transforms "dumb" electrical grids into intelligent, self-healing ecosystems.

---

## 🚀 The Vision: Beyond the Breadboard
Traditional circuit breakers are reactive i.e. they cut power to entire wings during a surge, disrupting critical labs and admin operations. **VoltGuard AI** introduces **Surgical Load Shedding**. 

> **Note on Architecture:** This repository features a high-fidelity **Digital Twin Simulation Engine**. While physical hardware nodes (ESP32-S3 + Manual Load Simulator) are the end-point targets, we utilized **Synthetic Data Modeling** to validate grid logic across 100+ simulated campus sectors—a scale impossible to test with a single physical prototype.

---

## 🛠️ Core Features
* **NILM-Inspired Signature Recognition:** Differentiates between **Inductive loads** (AC Motors, Fans) and **Resistive loads** (Heaters, PCs) using mathematical phase-angle modeling.
* **Autonomous Priority Matrix:** Dynamically monitors total campus load ($P = V \times I \times cos\phi$) and sheds non-essential sectors (e.g., Fountain Pumps, Sports Ground) to protect critical blocks (Admin, Computer Labs).
* **Real-Time Digital Twin Dashboard:** A React-based interface providing live telemetry, grid health scores, and sector-wise load distribution.
* **Edge-First Logic:** The core "Guard" algorithms are designed for local execution, ensuring the grid remains protected even during Wi-Fi outages or server downtime.

---

## 🧠 The "Smart" Logic
Our system identifies appliances not just by wattage, but by **Waveform Behavior**:
1.  **Phase Shift Analysis:** Detecting the delay between Voltage and Current to identify heavy machinery.
2.  **Inrush Detection:** Recognizing the "startup spike" of AC units to prevent false-trip events.
3.  **Heuristic Classification:** A custom decision engine that maps real-time math to campus priorities.

---

## 🏛️ Local Impact at ACEM
Designed for the specific needs of **Aravali College**:
* **Tier 1 (Critical):** Admin Block, Computer Labs, Science Labs.
* **Tier 2 (Essential):** Hostels, Canteen.
* **Tier 3 (Buffer):** Campus Lighting, Decorative Fountains, Sports Complex.

---


