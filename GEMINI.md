# Astronia Project Instructions

## Project Overview
Astronia is a cross-platform desktop IDE for Astronics hardware, built with Electron, React, and TypeScript. It features a dual-mode editor (Monaco for code, Blockly for visual blocks) and deep hardware integration.

## Tech Stack
- **Shell:** Electron
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Shadcn UI
- **Editors:** Monaco Editor, Google Blockly
- **Build Tool:** electron-vite

## Development Workflows
- **Scaffolding:** We use `electron-vite` with a React + TypeScript template.
- **UI Implementation:** UI layouts are derived from Stitch designs (`data/design/design.html`).
- **Surgical Updates:** When modifying the UI, prioritize modular React components and maintain the "Astronia Night" design system tokens.

## Conventions
- Use functional components and hooks for React.
- Adhere to the tonal layering and structural border design principles (no heavy shadows).
- Maintain strict TypeScript safety across the main, preload, and renderer processes.
