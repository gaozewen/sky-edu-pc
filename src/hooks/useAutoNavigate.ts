import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { isLoginRouter, PN } from '@/router'
import { getLocalStore } from '@/utils/currentStore'
import { getToken } from '@/utils/userToken'

import { useGoTo } from './useGoTo'
import { useUserContext } from './useUserHooks'

// 根据不同情况处理当前页面路由的自动跳转
const useAutoNavigate = (loadingUserData: boolean) => {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const { store } = useUserContext()
  const { goTo } = useGoTo()

  // 是否还没有选择当前门店
  const isNotSelectCurrentStore = () => {
    return !store.currentStoreId && !getLocalStore()
  }

  const isNoNavToNOSTORE = () => {
    return [PN.PROFILE, PN.PASSWORD].includes(pathname)
  }

  useEffect(() => {
    // 1. 还在加载用户数据则不处理
    if (loadingUserData) return

    // 2. 用户数据加载完成，开始处理
    // 2.1 已登陆 or token 存在
    if (store.tel || getToken()) {
      // 2.1.1 当前是 Login 页，跳转 orgUrl 页，否则跳转主页
      if (isLoginRouter(pathname)) {
        const orgUrlPathname = params.get('orgUrl')
        // 2.1.1.1 原来的页面是密码修改页
        if (orgUrlPathname === PN.PASSWORD) {
          // 则，直接去首页
          goTo({ pathname: PN.HOME })
          return
        }
        // 2.1.1.2 原来的页面不是是密码修改页
        // 则，直接跳转 orgUrlPathname
        goTo({ pathname: orgUrlPathname || PN.HOME })
        return
      }

      // 2.1.2 如果是非登录页，且还未选择门店
      if (isNotSelectCurrentStore()) {
        // 当前页面不需要使用当前门店数据，则不做任何处理
        if (isNoNavToNOSTORE()) return
        // 如果需要当前门店数据，则跳转门店选择页
        goTo({ pathname: PN.NOSTORE })
      }

      // 2.1.3 其他页面不做任何跳转，直接 return
      return
    }

    // 2.2 未登录
    // 2.2.1 如果当前路由是登录页，则不处理
    if (isLoginRouter(pathname)) return
    // 2.2.2 如果当前路由需要登录，则自动跳转登录页
    goTo({
      pathname: PN.LOGIN,
      search: `orgUrl=${pathname}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserData, store.tel, pathname, store.currentStoreId])
}

export default useAutoNavigate
