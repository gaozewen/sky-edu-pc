import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { GET_USER_BY_JWT } from '@/graphql/user'
import { PN_LOGIN } from '@/router'
import { IUser } from '@/types'
import { connectFactory, useContextFactory } from '@/utils/contextFactory'

const KEY = 'user'
const DEFAULT_VALUE = {}

// 通过 Context.Provider 工厂获取 User 专属的 Context.Provider
export const connectUser = connectFactory(KEY, DEFAULT_VALUE)
// 通过 useContext 工厂获取 User 专属的 useContext
export const useUserContext = () => useContextFactory<IUser>(KEY)

// 通过 api 接口获取用户数据
export const useLoadUserData = () => {
  const { setStore } = useUserContext()
  const nav = useNavigate()
  const { loading } = useQuery<{ getUserByJWT: IUser }>(GET_USER_BY_JWT, {
    onCompleted: data => {
      const user = data.getUserByJWT
      // 已登录
      if (user) {
        const { id, nickname, tel } = user
        // 将用户信息存入 userContext 的 store 中
        setStore({ id, nickname, tel })
        return
      }

      // 未登录，跳转登录页
      nav(PN_LOGIN)
    },
    onError: () => {
      // 获取用户信息失败( JWT 失效)，直接跳转登录页
      nav(PN_LOGIN)
    },
  })

  return { loading }
}
