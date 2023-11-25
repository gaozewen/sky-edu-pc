import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

/**
 * 404 页
 */
const NotFound = () => {
  const nav = useNavigate()
  return (
    <Result
      style={{ marginTop: '14vh' }}
      status={404}
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <Button type="primary" onClick={() => nav(-1)}>
          返回
        </Button>
      }
    />
  )
}

export default NotFound
