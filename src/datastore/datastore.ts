import { app, remote } from "electron";
import path from "path";

const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const lodashId = require("lodash-id");

const APP = process.type === "renderer" ? remote.app : app;

const appDir = APP.getPath("exe");
const adapter = new FileSync(path.join(path.dirname(appDir), "/data.json"));
const db = lowdb(adapter);
db._.mixin(lodashId);

db.defaults({ todo: [] }).write();

// webstorm判断todo的方法是看前面有没有字符，所以取消标记的话随便在前面写一点东西就行了
// 但是不能是标点符号
// canceledTODO 生产环境需要删除这两行
// db.get("") // nmd非得给我把todo给表示成一个TODO呗
//   .insert({
//     content: "Hello, world!",
//     finished: true
//   })
//   .write();
// db.get("") // 这个也是一样的问题，只需要记住表名是todo就好了
//   .insert({
//     content: "Hello, world2!",
//     finished: false
//   })
//   .write();

export default db;
