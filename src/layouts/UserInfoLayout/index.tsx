import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { connectUser, useLoadUserData } from '@/hooks/useUserHooks'

const { Content } = Layout
/**
 * 包裹所有页面，统一加载用户信息
 */
const UserInfo = () => {
  console.log('gzw====> UserInfo =====> in', new Date().getTime())
  useLoadUserData()
  return (
    <Layout>
      <Content style={{ height: '100vh' }}>
        <Outlet />
      </Content>
    </Layout>
  )
}
const UserInfoLayout = connectUser(UserInfo)
export default UserInfoLayout
