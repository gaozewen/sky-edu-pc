import { Button, Result } from 'antd'
import { useEffect } from 'react'

import { useGoTo } from '@/hooks/useGoTo'
import { useUserContext } from '@/hooks/useUserHooks'
import { PN } from '@/router'
import { useGetStoresService } from '@/service/store'

/**
 * 未选择门店而自动跳转的提示选择门店页
 */
const NoStore = () => {
  const { store } = useUserContext()
  const { goTo } = useGoTo()
  const { loading, data: stores } = useGetStoresService()
  useEffect(() => {
    if (store.currentStoreId) {
      goTo({ pathname: PN.HOME })
    }
  }, [store.currentStoreId])

  if (!loading && (!stores || stores?.length === 0)) {
    return (
      <Result
        status="404"
        title="请先创建门店"
        subTitle="您的账户下还没有任何门店，需创建并选择门店后才可使用其他功能"
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => goTo({ pathname: PN.STORE })}
          >
            去创建
          </Button>
        }
      />
    )
  }

  return (
    <Result
      status="404"
      title="请先选择门店"
      subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
    />
  )
}

export default NoStore
