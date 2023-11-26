import { HomeOutlined } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import { createBrowserRouter } from 'react-router-dom'

import SkyLayout from '@/layouts/SkyLayout'
import UserInfoLayout from '@/layouts/UserInfoLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
// PN: pathname
export const PN = {
  HOME: '/',
  LOGIN: '/login',
}

const router = createBrowserRouter([
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
    key: 'home',
    path: PN.HOME,
    name: '首页',
    icon: <HomeOutlined />,
  },
]

export default router
