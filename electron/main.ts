import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import { spawn } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

// File System Handlers
ipcMain.handle('read-dir', async (_, dirPath: string) => {
  const root = dirPath || process.cwd();
  async function getTree(currentPath: string): Promise<any> {
    try {
      const stats = await fs.stat(currentPath);
      const item: any = {
        name: path.basename(currentPath),
        path: currentPath,
        isDirectory: stats.isDirectory()
      };
      if (stats.isDirectory()) {
        const children = await fs.readdir(currentPath);
        const childTrees = await Promise.all(
          children
            .filter(child => !child.startsWith('.') && !['node_modules', 'dist', 'dist-electron', 'release'].includes(child))
            .map(async (child) => {
              try { return await getTree(path.join(currentPath, child)); } catch (e) { return null; }
            })
        );
        item.children = childTrees.filter(c => c !== null);
        item.children.sort((a: any, b: any) => {
          if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
          return a.isDirectory ? -1 : 1;
        });
      }
      return item;
    } catch (e) { return null; }
  }
  return getTree(root);
});

ipcMain.handle('read-file', async (_, filePath: string) => fs.readFile(filePath, 'utf-8'));
ipcMain.handle('write-file', async (_, { filePath, content }: { filePath: string, content: string }) => {
  await fs.writeFile(filePath, content, 'utf-8');
  return true;
});

// Native Dialogs
ipcMain.handle('open-folder-dialog', async () => {
  const result = await dialog.showOpenDialog(win!, { properties: ['openDirectory'] });
  if (result.canceled) return null;
  return result.filePaths[0];
});

ipcMain.handle('save-file-dialog', async (_, defaultPath?: string) => {
  const result = await dialog.showSaveDialog(win!, { defaultPath });
  if (result.canceled) return null;
  return result.filePath;
});

// Terminal Bridge (MVP using spawn)
let terminalProcess: any = null;
ipcMain.on('terminal-input', (event, data) => {
  if (!terminalProcess) {
    const shell = process.platform === 'win32' ? 'powershell.exe' : 'bash';
    terminalProcess = spawn(shell, [], {
      cwd: process.cwd(),
      env: process.env,
    });

    terminalProcess.stdout.on('data', (data: any) => event.reply('terminal-output', data.toString()));
    terminalProcess.stderr.on('data', (data: any) => event.reply('terminal-output', data.toString()));
    terminalProcess.on('exit', () => { terminalProcess = null; });
  }
  terminalProcess.stdin.write(data);
});

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    frame: false,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  ipcMain.on('window-minimize', () => win?.minimize());
  ipcMain.on('window-maximize', () => win?.isMaximized() ? win.unmaximize() : win?.maximize());
  ipcMain.on('window-close', () => win?.close());

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools() // Open DevTools for debugging
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); win = null; }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(createWindow);
