import {
  PoweroffOutlined,
  ShopOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MenuDataItem, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { Dropdown, Space, Tooltip } from 'antd'
import { Link, Outlet } from 'react-router-dom'

import StoreSelect from '@/components/StoreSelect'
import { IMG } from '@/constants/image'
import { useGoTo } from '@/hooks/useGoTo'
import { useLogout } from '@/hooks/useLogout'
import { useUserContext } from '@/hooks/useUserHooks'
import { Menus, PN } from '@/router'

/**
 * 天空教育页面统一 Layout
 */
const SkyLayout = () => {
  const { store: userStore } = useUserContext()

  const { goTo } = useGoTo()

  const { onLogout } = useLogout()

  return (
    <ProConfigProvider>
      <ProLayout
        layout="mix"
        logo={<img src={IMG.LOGO_TEXT} style={{ height: 40, marginLeft: 24 }} />}
        // logo 右侧的文字
        title={false}
        // 门店选择器
        actionsRender={() => [
          <StoreSelect key="selector" />,
          <Tooltip key="storeManage" title="门店管理">
            <ShopOutlined onClick={() => goTo({ pathname: PN.STORE })} />
          </Tooltip>,
        ]}
        // 用户信息
        avatarProps={{
          src: userStore.avatar,
          // 优先展示昵称，昵称没有展示手机号
          title: userStore.nickname || userStore.tel,
          size: 'small',
          render(props, defaultDom) {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: '1',
                      label: (
                        <Space size={20} onClick={() => goTo({ pathname: PN.PROFILE })}>
                          <UserOutlined />
                          个人信息
                        </Space>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <Space
                          size={20}
                          onClick={() => goTo({ pathname: PN.PASSWORD })}
                        >
                          <UnlockOutlined />
                          修改密码
                        </Space>
                      ),
                    },
                    {
                      key: '3',
                      label: (
                        <Space size={20} onClick={onLogout}>
                          <PoweroffOutlined />
                          退出登录
                        </Space>
                      ),
                    },
                  ],
                }}
                placement="bottom"
              >
                {defaultDom}
              </Dropdown>
            )
          },
        }}
        hasSiderMenu={true}
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
        <Outlet />
      </ProLayout>
    </ProConfigProvider>
  )
}

export default SkyLayout
