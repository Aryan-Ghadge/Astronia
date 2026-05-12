/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
    minimize: () => void
    maximize: () => void
    close: () => void
    readDir: (dirPath: string) => Promise<any>
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
    openFolderDialog: () => Promise<string | null>
    saveFileDialog: (defaultPath?: string) => Promise<string | null>
    terminalInput: (data: string) => void
    onTerminalOutput: (callback: (data: string) => void) => void
  }
}
