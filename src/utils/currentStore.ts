/**
 * @description 存储/获取 currentStore
 * @author 高泽文
 */

const KEY = 'CURRENT_STORE'
export const setCurrentStore = (currentStoreStr: string) => {
  localStorage.setItem(KEY, currentStoreStr)
}

export const getCurrentStore = (): { value: string; label: string } | undefined => {
  try {
    const res = localStorage.getItem(KEY)
    return res ? JSON.parse(res) : undefined
  } catch (error) {
    return undefined
  }
}

export const removeToken = () => {
  localStorage.removeItem(KEY)
}
