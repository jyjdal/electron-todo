import { BrowserWindow, screen } from "electron";

export function setPosition(win: BrowserWindow) {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const winSize = win.getSize();
  win.setPosition(size.width - winSize[0] - 70, 70);
}
