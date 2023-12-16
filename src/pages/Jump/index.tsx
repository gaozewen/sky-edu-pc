import { PageLoading } from '@ant-design/pro-components'
import { useEffect } from 'react'

import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import { getToken } from '@/utils/userToken'

/**
 * 第一次进入网站跳转
 */
const Jump = () => {
  const { goTo } = useGoTo()
  useEffect(() => {
    const isLogin = getToken()
    goTo({ pathname: isLogin ? PN.HOME : PN.LOGIN })
  }, [])
  return <PageLoading />
}

export default Jump
