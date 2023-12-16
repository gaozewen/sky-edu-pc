import {
  PoweroffOutlined,
  ShopOutlined,
  UnlockOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MenuDataItem, ProConfigProvider, ProLayout } from '@ant-design/pro-components'
import { Dropdown, Space, Tooltip } from 'antd'
import { Outlet } from 'react-router-dom'

import { IMG } from '@/constants/image'
import { useGoTo } from '@/hooks/useGoTo'
import { useLogout } from '@/hooks/useLogout'
import { useUserContext } from '@/hooks/useUserHooks'
import { Menus, PN } from '@/router'
import { ImgUtils } from '@/utils'
import { getLocalStore } from '@/utils/currentStore'

import styles from './index.module.scss'
/**
 * 天空教育页面统一 Layout
 */
const SkyLayout = () => {
  const { store: userStore } = useUserContext()
  const { goTo } = useGoTo()
  const { onLogout } = useLogout()
  const { name: storeName } = getLocalStore()

  return (
    <ProConfigProvider>
      <ProLayout
        className={styles.container}
        layout="mix"
        logo={
          <img
            onClick={() => goTo({ pathname: PN.HOME })}
            src={ImgUtils.getThumb({
              url: IMG.LOGO_TEXT,
              w: 108,
              h: 40,
            })}
            style={{ height: 40, marginLeft: 24 }}
          />
        }
        // logo 右侧的文字
        title={false}
        // 门店选择器
        actionsRender={() => [
          <Tooltip key="storeManage" title="选择门店">
            {/* <Space onClick={() => goTo({ pathname: PN.STORE })}> */}
            <ShopOutlined />
            <span>{storeName}</span>
            {/* </Space> */}
          </Tooltip>,
        ]}
        // 用户信息
        avatarProps={{
          src: ImgUtils.getThumb({
            url: userStore.avatar,
            w: 100,
            h: 100,
            isAvatar: true,
          }),
          // 优先展示昵称，昵称没有展示手机号
          title: userStore.nickname || userStore.tel,
          size: 'small',
          render(_props, defaultDom) {
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
          <div
            onClick={() => {
              goTo({ pathname: item.path || PN.HOME })
            }}
          >
            {dom}
          </div>
        )}
      >
        {/* key 的改变会促使对应组件重新渲染，所以切换门店后无需做额外处理 */}
        <Outlet key={userStore.currentStoreId} />
      </ProLayout>
    </ProConfigProvider>
  )
}

export default SkyLayout
