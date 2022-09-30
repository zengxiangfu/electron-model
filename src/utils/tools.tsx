/**
 * 获取静态资源 使用方式 getAssetsFile('images/xxx.png')
 * @param url
 * @returns
 */
 export const getAssetsFile = (url:string) => {
  return new URL(`../assets/${url}`,import.meta.url).href
}
