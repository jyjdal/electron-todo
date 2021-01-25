module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // 根据文档，这里的设置会合并到electron-builder的配置项中
      builderOptions: {
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
};
