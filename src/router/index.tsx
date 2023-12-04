import { HomeOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter } from 'react-router-dom'

import SkyLayout from '@/layouts/SkyLayout'
import UserInfoLayout from '@/layouts/UserInfoLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NoStore from '@/pages/NoStore'
import NotFound from '@/pages/NotFound'
import Password from '@/pages/Password'
import Profile from '@/pages/Profile'
import Store from '@/pages/Store'
import Student from '@/pages/Student'
// PN: pathname
export const PN = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  PASSWORD: '/password',
  STORE: '/store',
  STUDENT: '/student',
  NOSTORE: '/nostore',
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
            path: PN.STUDENT,
            element: <Student />,
          },
          {
            path: PN.NOSTORE,
            element: <NoStore />,
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
    hideInMenu: true,
  },
  {
    path: PN.STUDENT,
    name: '学员管理',
    icon: <TeamOutlined />,
  },
]

export default router
