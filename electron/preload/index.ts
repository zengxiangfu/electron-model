import { contextBridge ,ipcRenderer} from 'electron';
import { removeLoadingApi } from './loading';
import fs from 'fs'
const isMac = process.platform === 'darwin'
const isWin = process.platform.startsWith('win')

import methods from './methods'
contextBridge.exposeInMainWorld('EAPI',{
  ...methods,
  platform: isMac ? 'mac': isWin ? 'win':'other',
  removeLoading:removeLoadingApi,
  fs
})
