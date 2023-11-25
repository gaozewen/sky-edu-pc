/**
 * @description 存储/获取 user token
 * @author 高泽文
 */

const KEY = 'USER_TOKEN'
let TOKEN_CACHE = ''
export const setToken = (token: string, isAutoLogin: boolean) => {
  TOKEN_CACHE = token
  if (isAutoLogin) {
    localStorage.setItem(KEY, token)
  } else {
    // 不自动登录需要清空 token
    // 不能使用 removeToken，removeToken 会清空 TOKEN_CACHE
    localStorage.removeItem(KEY)
  }
}

export const getToken = () => {
  if (TOKEN_CACHE) return TOKEN_CACHE
  TOKEN_CACHE = localStorage.getItem(KEY) || ''
  return TOKEN_CACHE
}

export const removeToken = () => {
  // 清空缓存
  TOKEN_CACHE = ''
  return localStorage.removeItem(KEY)
}
