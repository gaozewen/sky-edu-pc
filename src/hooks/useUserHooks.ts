import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'

import { GET_USER_BY_JWT } from '@/graphql/user'
import { isLoginRouter, PN } from '@/router'
import { IUser } from '@/types'
import { connectFactory, useContextFactory } from '@/utils/contextFactory'

import { useGoTo } from './useGoTo'

const KEY = 'user'
const DEFAULT_VALUE = {}

// 通过 Context.Provider 工厂获取 User 专属的 Context.Provider
export const connectUser = connectFactory(KEY, DEFAULT_VALUE)
// 通过 useContext 工厂获取 User 专属的 useContext
export const useUserContext = () => useContextFactory<IUser>(KEY)

// 通过 api 接口获取用户数据
export const useLoadUserData = () => {
  const { setStore } = useUserContext()
  const { pathname } = useLocation()
  const { goTo } = useGoTo()

  // 页面跳转处理器
  const navHandler = () => {
    // 未登录且不是登录页
    if (!isLoginRouter(pathname)) {
      // 跳转登录页
      goTo({
        pathname: PN.LOGIN,
        search: `orgUrl=${pathname}`,
        replace: true,
      })
    }
  }

  const { loading, refetch } = useQuery<{ getUserByJWT: IUser }>(GET_USER_BY_JWT, {
    onCompleted: data => {
      const user = data.getUserByJWT
      // 已登录
      if (user) {
        const { id, nickname, tel } = user
        // 将用户信息存入 userContext 的 store 中
        setStore({ id, nickname, tel, refetchHandler: refetch })
        // 当前在登录页面，直接跳到首页
        if (isLoginRouter(pathname)) {
          goTo({
            pathname: PN.HOME,
            replace: true,
          })
        }
        return
      }
      setStore({ refetchHandler: refetch })
      // 页面跳转处理器
      navHandler()
    },
    onError: () => {
      // 获取用户信息失败( JWT 失效)
      // 页面跳转处理器
      setStore({ refetchHandler: refetch })
      navHandler()
    },
  })

  return { loading }
}
