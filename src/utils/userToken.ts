/**
 * @description 存储/获取 user token
 * @author 高泽文
 */

const KEY = 'USER_TOKEN'
let TOKEN_CACHE = ''
export const setToken = (token: string, isAutoLogin: boolean) => {
  TOKEN_CACHE = token
  // 无论是否自动登录都保存 sessionStorage
  sessionStorage.setItem(KEY, token)
  if (isAutoLogin) {
    // 自动登录额外存储 localStorage
    localStorage.setItem(KEY, token)
  } else {
    // 取消自动登录，需要清空 localStorage
    localStorage.removeItem(KEY)
  }
}

export const getToken = () => {
  if (TOKEN_CACHE) return TOKEN_CACHE
  TOKEN_CACHE = sessionStorage.getItem(KEY) || localStorage.getItem(KEY) || ''
  return TOKEN_CACHE
}

export const removeToken = () => {
  // 清空缓存
  TOKEN_CACHE = ''
  sessionStorage.removeItem(KEY)
  localStorage.removeItem(KEY)
  return
}
