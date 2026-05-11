import { ipcMain, app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
const __dirname$1 = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname$1, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
ipcMain.handle("read-dir", async (_, dirPath) => {
  const root = dirPath || process.cwd();
  async function getTree(currentPath) {
    const stats = await fs.stat(currentPath);
    const item = {
      name: path.basename(currentPath),
      path: currentPath,
      isDirectory: stats.isDirectory()
    };
    if (stats.isDirectory()) {
      const children = await fs.readdir(currentPath);
      const childTrees = await Promise.all(
        children.filter((child) => !child.startsWith(".") && child !== "node_modules" && child !== "dist" && child !== "dist-electron" && child !== "release").map(async (child) => {
          try {
            return await getTree(path.join(currentPath, child));
          } catch (e) {
            return null;
          }
        })
      );
      item.children = childTrees.filter((c) => c !== null);
      item.children.sort((a, b) => {
        if (a.isDirectory === b.isDirectory) return a.name.localeCompare(b.name);
        return a.isDirectory ? -1 : 1;
      });
    }
    return item;
  }
  return getTree(root);
});
ipcMain.handle("read-file", async (_, filePath) => {
  return fs.readFile(filePath, "utf-8");
});
ipcMain.handle("write-file", async (_, { filePath, content }) => {
  await fs.writeFile(filePath, content, "utf-8");
  return true;
});
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "logo.png"),
    frame: false,
    webPreferences: {
      preload: path.join(__dirname$1, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  ipcMain.on("window-minimize", () => {
    win == null ? void 0 : win.minimize();
  });
  ipcMain.on("window-maximize", () => {
    if (win == null ? void 0 : win.isMaximized()) {
      win.unmaximize();
    } else {
      win == null ? void 0 : win.maximize();
    }
  });
  ipcMain.on("window-close", () => {
    win == null ? void 0 : win.close();
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
