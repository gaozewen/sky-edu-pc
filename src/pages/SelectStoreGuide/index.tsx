import { Button, Result } from 'antd'

import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'

/**
 * 未选择门店而自动跳转的提示选择门店页
 */
const SelectStoreGuide = () => {
  const { goTo } = useGoTo()

  return (
    <Result
      style={{ marginTop: '8vh' }}
      status="warning"
      title="请先选择门店"
      subTitle="所有的管理行为都基于您选择的门店"
      extra={
        <Button type="primary" onClick={() => goTo({ pathname: PN.STORE })}>
          去选择
        </Button>
      }
    />
  )
}

export default SelectStoreGuide
