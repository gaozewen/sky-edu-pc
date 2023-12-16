/**
 * @description 存储/获取 currentStore
 * @author 高泽文
 */

const KEY = 'CURRENT_STORE'
// 存储当前选的的门店对象到 localStorage
export const setLocalStore = (currentStoreStr: string) => {
  localStorage.setItem(KEY, currentStoreStr)
}

// 获取本地存储的门店对象 {value: "storeId", label: "xxx 门店"}
export const getLocalStore = (): { value: string; label: string } | undefined => {
  try {
    const res = localStorage.getItem(KEY)
    return res ? JSON.parse(res) : undefined
  } catch (error) {
    return undefined
  }
}
