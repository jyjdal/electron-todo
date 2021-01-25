<template>
  <div id="app">
    <title-bar></title-bar>
    <tool-bar></tool-bar>
    <el-divider style="border: 1px solid white"></el-divider>
    <div style="height: 280px;">
      <el-scrollbar style="height:100%">
        <home></home>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Home from "@/views/Home";
import TitleBar from "@/components/TitleBar";
import ToolBar from "@/components/ToolBar";

export default {
  name: "App",
  components: {
    ToolBar,
    TitleBar,
    Home
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  height: 400px;
}
</style>
