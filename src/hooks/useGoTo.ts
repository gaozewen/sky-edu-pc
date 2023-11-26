import { useNavigate } from 'react-router-dom'

import { PN } from '@/router'

interface IGoToParams {
  pathname: string
  search?: string
  replace?: boolean
}

// 统一处理页面跳转，方便打点
export const useGoTo = () => {
  const nav = useNavigate()

  const goTo = (params: IGoToParams) => {
    const { pathname = PN.HOME, search = '', replace = false } = params || {}
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
