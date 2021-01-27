<template>
  <div id="title-bar">
    <b>{{ appName }}</b
    >&emsp;
    <i>By {{ author }}</i>
  </div>
</template>

<script lang="ts">
import { name, version, author } from "../../package.json";

export default {
  name: "TitleBar",
  setup() {
    const appName = name;
    const appVer = version;
    const appAuthor = author;

    return {
      appName,
      appVer,
      author: appAuthor
    };
  }
};
</script>

<style scoped>
#title-bar {
  font-size: 13px;
  color: darkgrey;
  -webkit-app-region: drag;
  height: 20px;
  width: 100%;
  padding: 0 20px;
  /*justify-content: space-between;*/
  align-items: center;
  display: flex;
  border-radius: 2px;
}

#title-bar b,
i {
  color: rgba(255, 255, 255, 0.3);
}
</style>
