import { useNavigate } from 'react-router-dom'

import { PN } from '@/router'

import useBeforeGoTo from './useBeforeGoTo'

interface IGoToParams {
  pathname: string
  search?: string
  replace?: boolean
}

// 统一处理页面跳转，方便打点
export const useGoTo = () => {
  const nav = useNavigate()
  const { isAllowedGoTo } = useBeforeGoTo()

  const goTo = (params: IGoToParams) => {
    const { pathname = PN.HOME, search = '', replace = false } = params || {}

    if (!isAllowedGoTo(pathname)) return

    nav(
      {
        pathname,
        search,
      },
      {
        replace,
      }
    )
  }

  const goBack = () => nav(-1)

  return {
    goTo,
    goBack,
  }
}
