import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
// import db from "@/datastore/datastore";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(ElementPlus, { locale });

// 相当于2.x中的 Vue.prototype.$db = db;
// app.config.globalProperties.$db = () => {
//   return db;
// };

app.mount("#app");
