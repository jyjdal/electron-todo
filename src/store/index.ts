import { createStore } from "vuex";
import db from "@/datastore/datastore";

export default createStore({
  state: {
    db: db
  },
  mutations: {},
  actions: {},
  modules: {}
});
