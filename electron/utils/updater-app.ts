import { app, dialog } from "electron";
import { autoUpdater } from "electron-updater";
import log from "electron-log";

log.transports.file.level = "info";
log.info(`App v${app.getVersion()} starting...`);
autoUpdater.logger = log;


let timer = null
/**
 * 检查更新函数
 */
export default function checkForUpdates(fn?: any) {
  log.info("更新检测程序启动");

  autoUpdater.on("checking-for-update", () => {
    log.info("检测更新中...");
  });

  autoUpdater.on("update-available", (info) => {
    log.info("发现新版本.", info);
  });

  autoUpdater.on("update-not-available", (info) => {
    log.info("暂无新版本信息");
  });

  autoUpdater.on("error", (err) => {
    log.error("更新程序异常" + err);
  });

  // 更新下载进度
  autoUpdater.on("download-progress", (progressObj) => {
    let msg = "Download speed: " + progressObj.bytesPerSecond;
    msg = msg + " - Downloaded " + progressObj.percent + "%";
    msg = msg + " (" + progressObj.transferred + "/" + progressObj.total + ")";
    log.info(msg);
    fn && fn(progressObj)
  });

  // 更新程序下载完成
  autoUpdater.on("update-downloaded", (info) => {
    log.info("下载完成");

    // 系统提示弹窗
    const dialogOpts = {
      type: "info",
      buttons: ["稍后重启", "立即更新"],
      title: "app更新服务",
      message:
        process.platform === "win32" ? info.releaseNotes : info.releaseName,
      detail: `新版本(${info.version})已下载完成， 请重启更新！`,
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 1) autoUpdater.quitAndInstall();
    });
  });

  // More properties on autoUpdater, see https://www.electron.build/auto-update#AppUpdater
  log.info("checkForUpdates() -- begin");
  try {
    //autoUpdater.setFeedURL('')
    autoUpdater.checkForUpdates();
    clearInterval(timer)
    timer = setInterval(() => {
      // 更新无系统通知
      autoUpdater.checkForUpdates();
      // 更新附加系统通知
      // autoUpdater.checkForUpdatesAndNotify()
    },10 * 60 * 1000)
  } catch (error) {
    log.error(error);
  }
  log.info("checkForUpdates() -- end");
}
