import { App } from 'antd'
import { useNavigate } from 'react-router-dom'

import { ALL_ROUTE, PN } from '@/router'
import { getLocalStore } from '@/utils/currentStore'
import { getToken } from '@/utils/userToken'

import { useUserContext } from './useUserHooks'

// 用户是否已经选择了当前门店
const useBeforeGoTo = () => {
  const { store } = useUserContext()
  const nav = useNavigate()
  const { modal } = App.useApp()

  // 是否已登录
  const isLoggedIn = () => {
    return store.id || getToken()
  }

  // 是否还没有选择当前门店
  const isNotSelectCurrentStore = () => {
    return !store.currentStoreId && !getLocalStore().id
  }

  // 要跳的页面是否是 不需要基于 当前门店
  const isNotBasedOnCurrentStoreRouter = (goToPathname: string) => {
    return [PN.SELECT_STORE_GUIDE, PN.STORE, PN.PROFILE, PN.PASSWORD].includes(
      goToPathname
    )
  }

  const showWarning = (goToPathname: string) => {
    modal.confirm({
      title: `${ALL_ROUTE[goToPathname].name || '该页面'}基于当前门店`,
      content: '请先选择您要管理的门店',
      cancelText: '知道了',
      okText: '去选择',
      onOk: () => {
        nav(PN.STORE)
      },
    })
  }

  // 是否允许跳转
  const isAllowedGoTo = (goToPathname: string) => {
    // 1. 已登录用户 && 未选择门店
    if (isLoggedIn() && isNotSelectCurrentStore()) {
      // 1.1 要跳转的页面 不需要 基于 当前门店
      if (isNotBasedOnCurrentStoreRouter(goToPathname)) {
        // 允许跳转
        return true
      }

      // 1.2 其他页面 基于 当前门店
      showWarning(goToPathname)
      // 不许跳转
      return false
    }

    // 其他情况允许跳转
    return true
  }

  return {
    isAllowedGoTo,
    isNotSelectCurrentStore,
    isNotBasedOnCurrentStoreRouter,
  }
}

export default useBeforeGoTo
