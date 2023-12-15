import { useQuery } from '@apollo/client'

import { GET_USER_BY_JWT } from '@/graphql/user'
import { IUser } from '@/types'
import { connectFactory, useContextFactory } from '@/utils/contextFactory'

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
  const { loading, refetch } = useQuery<{ getUserByJWT: IUser }>(GET_USER_BY_JWT, {
    // 需要加上这个参数，onCompleted 和 onError 才会在每次 refetch 时确保触发
    notifyOnNetworkStatusChange: true,
    onCompleted: data => {
      const user = data.getUserByJWT
      // 已登录
      if (user) {
        const { id, avatar, tel, nickname, desc } = user
        // 将用户信息存入 userContext 的 store 中
        setStore({ id, avatar, tel, nickname, desc, refetchHandler: refetch })
        // 当前在登录页面，直接跳到首页
        // 路由跳转交由 useAutoNavigate 统一控制
        return
      }
      resetStore({ refetchHandler: refetch })
      // 路由跳转交由 useAutoNavigate 统一控制
    },
    onError: () => {
      // 获取用户信息失败( JWT 失效)
      resetStore({ refetchHandler: refetch })
      // 路由跳转交由 useAutoNavigate 统一控制
    },
  })
  useAutoNavigate(loading)
}
