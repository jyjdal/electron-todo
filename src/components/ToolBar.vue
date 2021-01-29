<template>
  <div class="tool-bar">
    <el-row
      type="flex"
      justify="end"
      style="padding: 10px 0;color: rgba(255, 255, 255, 0.6); font-weight: lighter"
    >
      <el-col :span="3">
        <el-icon class="el-icon-document-add" @click="importData"></el-icon>
      </el-col>
      <el-col :span="3">
        <el-icon class="el-icon-document" @click="exportData"></el-icon>
      </el-col>
      <el-col :span="3">
        <el-icon
          :class="[isLocked ? 'el-icon-lock' : 'el-icon-unlock']"
          @mouseenter="setIgnoreMouseEvents(false)"
          @mouseleave="setIgnoreMouseEvents(isLocked)"
          @click="isLocked = !isLocked"
        ></el-icon>
      </el-col>
      <el-col :span="3">
        <el-icon class="el-icon-circle-close" @click="close"></el-icon>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from "electron";

export default {
  name: "ToolBar",
  data() {
    return {
      isLocked: false
    };
  },
  methods: {
    setIgnoreMouseEvents(ignore: boolean) {
      ipcRenderer.invoke("setIgnoreMouseEvents", ignore);
    },
    exportData() {
      ipcRenderer.invoke("exportData");
    },
    close() {
      ipcRenderer.invoke("close");
    },
    importData() {
      // 这里功能还没有做，先把函数原型写上来
      alert("敬请期待");
    }
  }
};
</script>

<style scoped>
.tool-bar {
  height: 20px;
  padding-right: 10px;
  font-size: 23px;
}
</style>
