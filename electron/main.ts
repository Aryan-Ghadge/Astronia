import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
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
          .filter(child => !child.startsWith('.') && child !== 'node_modules' && child !== 'dist' && child !== 'dist-electron' && child !== 'release')
          .map(async (child) => {
             try {
               return await getTree(path.join(currentPath, child));
             } catch (e) {
               return null;
             }
          })
      );
      
      item.children = childTrees.filter(c => c !== null);
      // Sort: Folders first, then alphabetically
      item.children.sort((a: any, b: any) => {
        if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });
    }
    return item;
  }

  return getTree(root);
});

ipcMain.handle('read-file', async (_, filePath: string) => {
  return fs.readFile(filePath, 'utf-8');
});

ipcMain.handle('write-file', async (_, { filePath, content }: { filePath: string, content: string }) => {
  await fs.writeFile(filePath, content, 'utf-8');
  return true;
});

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Window Controls
  ipcMain.on('window-minimize', () => {
    win?.minimize()
  })
  ipcMain.on('window-maximize', () => {
    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  })
  ipcMain.on('window-close', () => {
    win?.close()
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
