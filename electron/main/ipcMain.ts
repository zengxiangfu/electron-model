import { app, ipcMain, BrowserWindow, IpcMainEvent, Notification, IpcMainInvokeEvent, NotificationConstructorOptions } from "electron";
import { autoUpdater } from 'electron-updater';

// 打开调试配置
export const openDevTools = (win) => {
  ipcMain.on('openDevTools', () => {
    win.webContents.openDevTools();
  })
}


// 关闭
export const appQuit = () => {
  ipcMain.on("appQuit", () => {
    app.quit();
  });
};

// 关闭浏览器窗口
export const winClose = (win: BrowserWindow) =>
  ipcMain.on("winClose", (evnet: IpcMainEvent) => {
    win.close();
  });

  // 全屏
export const winFullScreen = (win: BrowserWindow) =>
  ipcMain.on("winFullScreen", (evnet: IpcMainEvent ,type:boolean) => {
    console.log('winFullScreen:',type)
    win.fullScreen = type;
  });

  // 最小化
  export const winMinimize = (win: BrowserWindow) =>
  ipcMain.on("winMinimize", () => {
    win.minimize()
  });

  // 立即更新
  export const updateAndInstall = () => {
    ipcMain.on('updateAndInstall', () => {
      console.log('================updateAndInstall===========');
      autoUpdater.quitAndInstall()
    })
  }
