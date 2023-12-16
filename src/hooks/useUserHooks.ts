import { useQuery } from '@apollo/client'

import { GET_USER_BY_JWT } from '@/graphql/user'
import { IUser } from '@/types'
import { connectFactory, useContextFactory } from '@/utils/contextFactory'
import { getLocalStore } from '@/utils/currentStore'

import useAutoNavigate from './useAutoNavigate'

const KEY = 'user'
const DEFAULT_VALUE = { id: '', avatar: '', tel: '', nickname: '', desc: '' }

// 通过 Context.Provider 工厂获取 User 专属的 Context.Provider
export const connectUser = connectFactory(KEY, DEFAULT_VALUE)
// 通过 useContext 工厂获取 User 专属的 useContext
export const useUserContext = () => useContextFactory<IUser>(KEY)

// 通过 api 接口获取用户数据
export const useLoadUserData = () => {
  const { setStore, resetStore } = useUserContext()
  // ******【 路由跳转交由 useAutoNavigate 统一控制 】******
  const { loading, refetch } = useQuery<{ getUserByJWT: IUser }>(GET_USER_BY_JWT, {
    // 需要加上这个参数，onCompleted 和 onError 才会在每次 refetch 时确保触发
    notifyOnNetworkStatusChange: true,
    //  1. 接口调用成功
    onCompleted: data => {
      const user = data.getUserByJWT
      // 1.1 已登录
      if (user) {
        const { id, avatar, tel, nickname, desc } = user
        // 1.1.1 将用户信息存入 userContext 的 store 中
        setStore({ id, avatar, tel, nickname, desc, refetchHandler: refetch })
        // 1.1.2 设置用户已选择的当前门店（因为用户所有操作基本都基于门店）
        const currentStore = getLocalStore()
        if (currentStore) {
          setStore({ currentStoreId: currentStore.value })
          return
        }

        return
      }
      // 1.2 未登录
      // 只需将重新获取用户数据的 refetch 塞入 store 中
      resetStore({ refetchHandler: refetch })
    },
    // 2. 接口调用报错
    onError: () => {
      // 2.1 和未登录做同样处理
      resetStore({ refetchHandler: refetch })
    },
  })

  useAutoNavigate(loading)
}
