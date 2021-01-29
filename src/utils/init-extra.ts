import {
  app,
  BrowserWindow,
  Menu,
  NativeImage,
  nativeImage,
  screen,
  Tray
} from "electron";

import { exportData } from "@/utils/excel-util";

export function setPosition(win: BrowserWindow) {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const winSize = win.getSize();
  win.setPosition(size.width - winSize[0] - 70, 70);
}

export function getIcon(): NativeImage {
  // 这里使用了硬编码，需要考虑改进
  return nativeImage.createFromPath(
    "E:\\electron-todo\\src\\assets\\favicon.ico"
  );
}

export function initTray(win: BrowserWindow) {
  const tray: Tray = new Tray(getIcon());
  const contextMenu: Menu = Menu.buildFromTemplate([
    {
      label: "导入",
      submenu: Menu.buildFromTemplate([
        { label: "合并至当前待办", type: "normal" },
        { label: "清除已有的待办", type: "normal" }
      ])
    },
    {
      label: "导出",
      type: "normal",
      click: () => {
        exportData();
      }
    },
    { label: "", type: "separator" },
    { label: "关于 Electron-todo", type: "normal", enabled: false },
    {
      label: "退出应用",
      type: "normal",
      click() {
        app.exit(0);
      }
    }
  ]);
  tray.on("double-click", () => {
    win.show();
  });
  tray.setToolTip("Electron-todo");
  tray.setContextMenu(contextMenu);
}
