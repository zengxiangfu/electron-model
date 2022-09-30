import { ipcRenderer } from 'electron'
// 退出APP
const appQuit = () => ipcRenderer.send('appQuit')
// 关闭BrowserWindow
const winClose = () => ipcRenderer.send('winClose')
// 全屏
const winFullScreen = (type: boolean) => ipcRenderer.send('winFullScreen', type)
// 最小化
const winMinimize = () => ipcRenderer.send('winMinimize')

// 下载的进度
const downloadProcess = (cb) => ipcRenderer.on('downloadProcess',cb)

// 立即更新
const updateAndInstall = () => ipcRenderer.send('updateAndInstall')

// 打开调试
const openDevTools = () => ipcRenderer.send('openDevTools')

export default {
  appQuit,
  winClose,
  winFullScreen,
  winMinimize,
  downloadProcess,
  updateAndInstall,
  openDevTools
}
