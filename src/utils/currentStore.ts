/**
 * @description 存储/获取 currentStore
 * @author 高泽文
 */

interface ILocalStore {
  id: string
  name: string
  token: string
}

const KEY = 'CURRENT_STORE'
// 存储当前选的的门店对象到 localStorage
export const setLocalStore = (currentStoreStr: string) => {
  localStorage.setItem(KEY, currentStoreStr)
}

// 获取本地存储的门店对象 {id: "storeId", name: "xxx 门店", token: "xxx"}
export const getLocalStore = (): ILocalStore => {
  const DEFAULT_RESULT = { id: '', name: '', token: '' }
  try {
    const res = localStorage.getItem(KEY)
    return res ? JSON.parse(res) : DEFAULT_RESULT
  } catch (error) {
    return DEFAULT_RESULT
  }
}
