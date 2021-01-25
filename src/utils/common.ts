import { app } from "electron";
import dayjs from "dayjs";

const fs = require("fs");
const path = require("path");

const appDir = app.getPath("exe");

function getSavePath(): string {
  const result = path.join(path.dirname(appDir), "/export");
  if (!fs.existsSync(result)) {
    fs.mkdirSync(result);
  }

  return result;
}

function getDateFormat(): string {
  const currentDate: dayjs.Dayjs = dayjs();
  return currentDate.format("YYYY-MM-DD");
}

export { getSavePath, getDateFormat };
