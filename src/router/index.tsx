import { HomeOutlined, ShopOutlined } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter } from 'react-router-dom'

import SkyLayout from '@/layouts/SkyLayout'
import UserInfoLayout from '@/layouts/UserInfoLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Password from '@/pages/Password'
import Profile from '@/pages/Profile'
import Store from '@/pages/Store'
// PN: pathname
export const PN = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  PASSWORD: '/password',
  STORE: '/store',
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserInfoLayout />,
    children: [
      {
        path: PN.LOGIN,
        element: <Login />,
      },
      {
        path: '/',
        element: <SkyLayout />,
        children: [
          {
            path: PN.HOME,
            element: <Home />,
          },
          {
            path: PN.PROFILE,
            element: <Profile />,
          },
          {
            path: PN.PASSWORD,
            element: <Password />,
          },
          {
            path: PN.STORE,
            element: <Store />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
])

export const isLoginRouter = (pathname: string) => {
  return [PN.LOGIN].includes(pathname)
}

export const Menus: MenuDataItem[] = [
  {
    path: PN.HOME,
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    path: PN.PROFILE,
    name: '个人信息',
    hideInMenu: true,
  },
  {
    path: PN.PASSWORD,
    name: '修改密码',
    hideInMenu: true,
  },
  {
    path: PN.STORE,
    name: '门店管理',
    icon: <ShopOutlined />,
  },
]

export default router
