<template>
  <div id="title-bar">
    <b>{{ appName }}</b
    >&emsp;
    <i>By {{ author }}</i>
  </div>
</template>

<script>
import pkg from "../../package.json";

export default {
  name: "TitleBar",
  setup() {
    const appName = pkg.name;
    const appVer = pkg.version;
    const author = pkg.author;

    return {
      appName,
      appVer,
      author
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
