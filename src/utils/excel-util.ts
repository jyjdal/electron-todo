import TodoItem from "@/datastore/todoItem";
import { Workbook, Worksheet } from "exceljs";
import { Notification, shell } from "electron";

import db from "@/datastore/datastore";
import { getDateFormat, getSavePath } from "@/utils/common";

const pkg = require("../../package.json");
const ExcelJS = require("exceljs");

function exportData(): void {
  const workbook: Workbook = new ExcelJS.Workbook();

  // 设置基本信息
  workbook.creator = pkg.name;

  // 添加工作簿和标题
  const sheet: Worksheet = workbook.addWorksheet("todo list");
  sheet.addRow(["Id", "内容", "已完成", "提醒时间"]);

  // 添加数据
  const todoList: TodoItem[] = db.get("todo").value();
  let item: TodoItem;
  for (item of todoList) {
    sheet.addRow([
      item.id,
      item.content,
      item.finished ? "是" : "否",
      item.remindTime === undefined ? "无" : item.remindTime.format("YYYY-MM-DD HH:mm:ss")
    ]);
  }

  const saveDir = getSavePath();
  const dateStr = getDateFormat();
  const exportFilePath = `${saveDir}/export-${dateStr}.xlsx`;
  workbook.xlsx.writeFile(exportFilePath).then();

  if (Notification.isSupported()) {
    const notification = new Notification({
      title: "导出完成",
      body: `数据已导出到：安装目录/export/export-${dateStr}.xlsx`
    });
    // 因为对回调函数格式有要求，所以event参数必须存在
    notification.on("click", event => {
      shell.openExternal(exportFilePath).then();
    });
    notification.show();
  }
}

export { exportData };
