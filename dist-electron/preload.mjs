"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on: (channel, listener) => {
    electron.ipcRenderer.on(channel, (event, ...args) => listener(event, ...args));
  },
  send: (channel, ...args) => electron.ipcRenderer.send(channel, ...args),
  invoke: (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args),
  // Window Controls
  minimize: () => electron.ipcRenderer.send("window-minimize"),
  maximize: () => electron.ipcRenderer.send("window-maximize"),
  close: () => electron.ipcRenderer.send("window-close"),
  // File System
  readDir: (dirPath) => electron.ipcRenderer.invoke("read-dir", dirPath),
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath, content) => electron.ipcRenderer.invoke("write-file", { filePath, content }),
  // Dialogs
  openFolderDialog: () => electron.ipcRenderer.invoke("open-folder-dialog"),
  saveFileDialog: (defaultPath) => electron.ipcRenderer.invoke("save-file-dialog", defaultPath),
  // Terminal
  terminalInput: (data) => electron.ipcRenderer.send("terminal-input", data),
  onTerminalOutput: (callback) => {
    electron.ipcRenderer.on("terminal-output", (_, data) => callback(data));
  }
});
