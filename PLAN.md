# Astronia IDE: Development Roadmap (PLAN.md)

## Current Status: Phase 0 - Foundation Complete
- [x] Electron + React + Vite + TypeScript scaffolded in `astronia/`
- [x] "Astronia Night" design system & tailwind-based UI layout implemented
- [x] Firebase Auth initialized (astroniax project)
- [x] Git version control established

---

## Phase 1: Core Editor Engines & Logic
*Objective: Transform the static UI into a functional code and visual editor.*

- [ ] **1.1 Monaco Editor Integration**
  - Replace the placeholder code container with a real Monaco instance.
  - Implement syntax highlighting for `.asx`, `.cpp`, and `.ino`.
  - Add theme support (import "Astronia Night" tokens into Monaco).
- [ ] **1.2 Google Blockly Integration**
  - Integrate Blockly into the "Blocks" mode.
  - Create custom blocks for Astronics Cera hardware (Digital Write, Analog Read, etc.).
  - Implement "Live Code Generation" (C++ synced to Monaco).
- [ ] **1.3 Dual-Mode Sync**
  - Implement the Split-Mode view.
  - Set up real-time synchronization between Blockly and Monaco.

## Phase 2: Hardware & Build Pipeline
*Objective: Connect the IDE to the physical world (Astronics Cera).*

- [ ] **2.1 Board Manager & Serial Port**
  - Implement automated port detection (COM/tty) using `serialport`.
  - Create UI for selecting boards (Astronics Cera, Arduino, ESP32).
- [ ] **2.2 Compiler Integration**
  - Bundle/link `GCC/AVR-GCC` binaries.
  - Implement the "Verify" (Compile) logic using a Node.js child process.
- [ ] **2.3 Uploader Integration**
  - Integrate `avrdude` for firmware flashing.
  - Implement the "Upload" button with real-time status bar progress.
- [ ] **2.4 Serial Tools**
  - Build the Serial Monitor (RX/TX text flow).
  - Build the Serial Plotter (Chart.js integration for data visualization).

## Phase 3: Astra AI & Community
*Objective: Implement the "Smart" and "Social" features.*

- [ ] **3.1 Astra AI Integration**
  - Connect the AI Sidebar to the Gemini API.
  - Implement "Context Awareness" (send current code/errors/board info to Astra).
  - Add "One-click Fix" button in the Problems panel.
- [ ] **3.2 Firebase Auth UI**
  - Implement Login/Signup screens using Firebase Auth.
  - Create the "Astronian Profile" dropdown in the Activity Bar.
- [ ] **3.3 XP & Gamification**
  - Implement logic to earn XP on successful Compile/Upload.
  - Sync XP to the Firebase backend.

## Phase 4: Final Polish & Packaging
*Objective: Quality assurance and distribution.*

- [ ] **4.1 Circuit Diagram Preview**
  - Add a dedicated view for visual circuit layouts (SVG/Canvas based).
- [ ] **4.2 Settings & Extensions**
  - Implement the settings engine (Theme selection, Font size, Keybindings).
  - Scaffold the extension marketplace UI.
- [ ] **4.4 Final Build & Distribution**
  - Configure `electron-builder` for multi-platform (Win/Mac/Linux) installers.
  - Conduct final UI/UX audit against `designSystem.md`.

---

## Technical Constraints & Standards
- **Standard:** Surgical React component updates.
- **Safety:** Firebase keys must remain in `.env` (not hardcoded in components).
- **Quality:** Every feature must be verified in the Electron development window.
