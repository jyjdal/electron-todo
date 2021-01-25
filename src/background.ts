"use strict";

import { app, protocol, BrowserWindow, screen, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";

import { exportData } from "@/utils/excel-util";

const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

let win: BrowserWindow;

// 设置单实例应用程序
if (app.requestSingleInstanceLock()) {
  // 防止IDE给出变量未使用的警告
  // noinspection JSUnusedLocalSymbols
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    if (win) {
      setPosition(win);
    }
  });
} else {
  app.quit();
}

// 防止闪烁问题
app.commandLine.appendSwitch("wm-window-animations-disabled");

async function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 420,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    vibrancy: "ultra-dark",
    webPreferences: {
      nodeIntegration: (process.env
        .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
      enableRemoteModule: true
    }
  });

  // Create the browser window.
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    await win.loadURL("app://./index.html");
  }

  setPosition(win);
  win.show();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow().then();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", async () => {
  await createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function setPosition(win: BrowserWindow) {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const winSize = win.getSize();
  win.setPosition(size.width - winSize[0] - 70, 70);
}

ipcMain.handle("setIgnoreMouseEvents", (event, ignore) => {
  // 使用ts开发时可能会出现Type Error: cannot read property 'xxx' of undefined
  // 因此需要在这里预先获取到主窗体BrowserWindow对象才能进行下一步的操作
  const win = BrowserWindow.getAllWindows()[0];

  if (ignore) {
    win.setIgnoreMouseEvents(true, { forward: true });
  } else {
    win.setIgnoreMouseEvents(false);
  }
});

ipcMain.handle("exportData", event => {
  exportData();
});

ipcMain.handle("close", event => {
  app.exit(0);
});
