import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { isLoginRouter, PN } from '@/router'

import { useGoTo } from './useGoTo'
import { useUserContext } from './useUserHooks'

// 根据不同情况处理当前页面路由的自动跳转
const useAutoNavigate = (loadingUserData: boolean) => {
  const { pathname } = useLocation()
  const { store } = useUserContext()
  const { goTo } = useGoTo()

  useEffect(() => {
    // console.log('gzw===>loadingUserData', loadingUserData)
    // console.log('gzw===>store.tel', store.tel)
    // console.log('gzw===>pathname', pathname)
    // 还在加载用户数据则不处理
    if (loadingUserData) return

    // 已登陆
    if (store.tel) {
      // 如果当前路由是登录或注册页时，跳转我的问卷页
      if (isLoginRouter(pathname)) {
        goTo({ pathname: PN.HOME })
      }
      return
    }

    // 未登录
    // 如果当前路由是登录页，则不处理
    if (isLoginRouter(pathname)) return
    // 如果当前路由需要登录，则自动跳转登录页
    goTo({
      pathname: PN.LOGIN,
      search: `orgUrl=${pathname}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserData, store.tel, pathname])
}

export default useAutoNavigate
