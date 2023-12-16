import { PageLoading } from '@ant-design/pro-components'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { PN } from '@/router'
import { getToken } from '@/utils/userToken'

/**
 * 第一次进入网站跳转
 */
const Jump = () => {
  const nav = useNavigate()
  useEffect(() => {
    const isLogin = getToken()
    nav({ pathname: isLogin ? PN.HOME : PN.LOGIN })
  }, [])
  return <PageLoading />
}

export default Jump
