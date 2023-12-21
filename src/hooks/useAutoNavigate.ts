import { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

import { isLoginRouter, PN } from '@/router'
import { getToken } from '@/utils/userToken'

import useBeforeGoTo from './useBeforeGoTo'
import { useGoTo } from './useGoTo'
import { useUserContext } from './useUserHooks'

// 根据不同情况处理当前页面路由的自动跳转
const useAutoNavigate = (loadingUserData: boolean) => {
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const { store } = useUserContext()
  const { goTo } = useGoTo()
  const { isNotSelectCurrentStore, isNotBasedOnCurrentStoreRouter } = useBeforeGoTo()

  useEffect(() => {
    // 1. 还在加载用户数据则不处理
    if (loadingUserData) return

    // 2. 用户数据加载完成，开始处理
    // 2.1 已登陆
    if (store.tel || getToken()) {
      // 2.1.1 已登陆 - 当前是 Login 页
      if (isLoginRouter(pathname)) {
        const orgUrlPathname = params.get('orgUrl')
        // 2.1.1.1 已登陆 - 当前是 Login 页 - source 页是 密码修改 页
        if (orgUrlPathname === PN.PASSWORD) {
          // 则，直接去首页
          goTo({ pathname: PN.HOME })
          return
        }

        // 2.1.1.2 已登录 - 当前是 Login 页 - 未选择门店
        if (isNotSelectCurrentStore()) {
          // 则跳转门店选择页
          goTo({ pathname: PN.SELECT_STORE_GUIDE })
          return
        }

        // 2.1.1.3 已登录 - 当前是 Login 页 - 其他情况
        // 则，直接跳转 orgUrlPathname
        goTo({ pathname: orgUrlPathname || PN.HOME })
        return
      }

      // 2.1.2 已登陆 - 当前 非 Login 页
      // 2.1.2.1 已登陆 - 当前 非 Login 页 - 未选择门店
      if (isNotSelectCurrentStore()) {
        // 当前页面不基于当前门店数据，则不做任何处理
        if (isNotBasedOnCurrentStoreRouter(pathname)) return
        // 如果需要当前门店数据，则跳转门店选择页
        goTo({ pathname: PN.SELECT_STORE_GUIDE })
        return
      }

      // 2.1.2.2 已登陆 - 当前 非 Login 页 - 已选择门店
      // 直接 return 不做任何处理
      return
    }

    // 2.2 未登录
    // 2.2.1 未登录 - 当前是 Login 页
    // 直接 return 不做任何处理
    if (isLoginRouter(pathname)) return

    // 2.2.3 未登录 - 当前是 密码修改 页
    if (pathname === PN.PASSWORD) {
      // 则，直接跳转登录页
      goTo({ pathname: PN.LOGIN })
      return
    }

    // 2.2.3 未登录 - 其他情况
    // 则自动跳转登录页
    goTo({
      pathname: PN.LOGIN,
      search: `orgUrl=${pathname}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUserData, store.tel, pathname, store.currentStoreId])
}

export default useAutoNavigate
