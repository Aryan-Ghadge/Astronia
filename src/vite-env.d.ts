/// <reference types="vite/client" />

interface Window {
  ipcRenderer: {
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
    off: (channel: string, listener: (event: any, ...args: any[]) => void) => void
    send: (channel: string, ...args: any[]) => void
    invoke: (channel: string, ...args: any[]) => Promise<any>
    minimize: () => void
    maximize: () => void
    close: () => void
    readDir: (dirPath: string) => Promise<any>
    readFile: (filePath: string) => Promise<string>
    writeFile: (filePath: string, content: string) => Promise<boolean>
  }
}
