// 头部选择菜单
export enum ETabActive {
  PERINSTALL = 1,
  test
}

export type TState = {
  tabActive: number
}

export type TAction = {
  type: string,
  data?: any
}

// 平台的类型
export enum EPlatformType{
  win = 'win',
  mac = 'mac',
  linux = 'linux',
  other = 'other'
}
