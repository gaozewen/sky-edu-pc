import { Button, Result } from 'antd'

import { useGoTo } from '@/hooks/useGoTo'

/**
 * 404 页
 */
const NotFound = () => {
  const { goBack } = useGoTo()
  return (
    <Result
      style={{ marginTop: '8vh' }}
      status={404}
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <Button type="primary" onClick={goBack}>
          返回
        </Button>
      }
    />
  )
}

export default NotFound
