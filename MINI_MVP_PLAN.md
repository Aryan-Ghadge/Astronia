# Astronia: Functional MVP Miniature Plan

## Objective
Transform the visual shell into a functional application where you can explore real files and edit code.

## Phase 1: Real File Explorer
*Goal: Replace the static list with your actual project directory.*
1. **IPC File Bridge:** Set up Electron IPC handlers in `main.ts` to read the local directory structure.
2. **Recursive Tree Logic:** Implement a recursive component in React to render folders and files.
3. **Selection Logic:** Add click handlers to "Open" a file (set it as the active editor content).

## Phase 2: Monaco Editor Integration
*Goal: Replace the static code block with a professional editor.*
1. **Install Monaco:** `npm install @monaco-editor/react`.
2. **Editor Component:** Replace `CodeEditor.tsx` content with the Monaco instance.
3. **Theme Sync:** Apply the "Astronia Night" colors to the Monaco theme configuration.

## Phase 3: File Lifecycle
*Goal: Ensure the editor reacts to the explorer.*
1. **Active File State:** Manage the `activeFile` state in `App.tsx`.
2. **Read/Write Flow:** 
   - When a file is clicked in Explorer -> Read file from disk -> Show in Monaco.
   - When `Ctrl+S` is pressed -> Write Monaco content back to disk.

## Verification
- Can I see the `astronia` folder files in the IDE?
- Can I type and see syntax highlighting for `.ts` or `.asx`?
- Can I save a file and see the change reflected on my hard drive?
