import { Result } from 'antd'
import { useEffect } from 'react'

import { useGoTo } from '@/hooks/useGoTo'
import { useUserContext } from '@/hooks/useUserHooks'
import { PN } from '@/router'

/**
 * 未选择门店而自动跳转的提示选择门店页
 */
const NoStore = () => {
  const { store } = useUserContext()
  const { goTo } = useGoTo()
  useEffect(() => {
    if (store.currentStoreId) {
      goTo({ pathname: PN.HOME })
    }
  }, [store.currentStoreId])

  return (
    <Result
      status="404"
      title="请先选择门店"
      subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
    />
  )
}

export default NoStore
