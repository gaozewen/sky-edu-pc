import {
  MenuDataItem,
  PageContainer,
  ProConfigProvider,
  ProLayout,
} from '@ant-design/pro-components'
import { Link, Outlet, useNavigate } from 'react-router-dom'

import { IMG } from '@/constants/image'
import { useUserContext } from '@/hooks/useUserHooks'
import { Menus, PN } from '@/router'
import { removeToken } from '@/utils/userToken'

/**
 * 天空教育页面统一 Layout
 */
const SkyLayout = () => {
  const { store: userStore } = useUserContext()
  const { tel } = userStore
  const nav = useNavigate()

  const onLogout = () => {
    removeToken()
    nav(
      {
        pathname: PN.LOGIN,
      },
      {
        replace: true,
      }
    )
  }

  return (
    <ProConfigProvider>
      <ProLayout
        layout="mix"
        logo={<img src={IMG.LOGO_TEXT} style={{ height: 40, marginLeft: 24 }} />}
        // logo 右侧的文字
        title={false}
        //用户信息
        avatarProps={{
          src: IMG.LOGO,
          title: tel,
          size: 'small',
          // TODO: 后期改成修改跳转个人信息页
          onClick: onLogout,
        }}
        siderWidth={188}
        // 左侧菜单路由
        route={{
          path: '/',
          routes: Menus,
        }}
        // 左侧菜单路由跳转
        menuItemRender={(item: MenuDataItem, dom) => (
          <Link to={item.path || PN.HOME}>{dom}</Link>
        )}
      >
        <PageContainer>
          <Outlet />
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  )
}

export default SkyLayout
