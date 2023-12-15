import {
  GiftOutlined,
  HomeOutlined,
  PicRightOutlined,
  RobotOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { MenuDataItem, PageLoading } from '@ant-design/pro-components'
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import UserInfoLayout from '@/layouts/UserInfoLayout'

const SkyLayout = lazy(() => import('@/layouts/SkyLayout'))
const Course = lazy(() => import('@/pages/Course'))
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const NoStore = lazy(() => import('@/pages/NoStore'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Password = lazy(() => import('@/pages/Password'))
const Product = lazy(() => import('@/pages/Product'))
const Profile = lazy(() => import('@/pages/Profile'))
const Store = lazy(() => import('@/pages/Store'))
const Student = lazy(() => import('@/pages/Student'))
const Teacher = lazy(() => import('@/pages/Teacher'))

// PN: pathname
export const PN = {
  HOME: '/',
  LOGIN: '/login',
  PROFILE: '/profile',
  PASSWORD: '/password',
  STORE: '/store',
  STUDENT: '/student',
  NOSTORE: '/nostore',
  COURSE: '/course',
  PRODUCT: '/product',
  TEACHER: '/teacher',
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <UserInfoLayout />,
    children: [
      {
        path: PN.LOGIN,
        element: (
          <Suspense fallback={<PageLoading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/',
        element: (
          <Suspense fallback={<PageLoading />}>
            <SkyLayout />
          </Suspense>
        ),
        children: [
          {
            path: PN.HOME,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: PN.PROFILE,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: PN.PASSWORD,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Password />
              </Suspense>
            ),
          },
          {
            path: PN.STORE,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Store />
              </Suspense>
            ),
          },
          {
            path: PN.STUDENT,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Student />
              </Suspense>
            ),
          },
          {
            path: PN.NOSTORE,
            element: (
              <Suspense fallback={<PageLoading />}>
                <NoStore />
              </Suspense>
            ),
          },
          {
            path: PN.COURSE,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Course />
              </Suspense>
            ),
          },
          {
            path: PN.PRODUCT,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Product />
              </Suspense>
            ),
          },
          {
            path: PN.TEACHER,
            element: (
              <Suspense fallback={<PageLoading />}>
                <Teacher />
              </Suspense>
            ),
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
  return pathname === PN.LOGIN
}

export const isStoreRouter = (pathname: string) => {
  return pathname === PN.STORE
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
    path: PN.COURSE,
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  {
    path: PN.STUDENT,
    name: '学员管理',
    icon: <TeamOutlined />,
  },
  {
    path: PN.PRODUCT,
    name: '商品管理',
    icon: <GiftOutlined />,
  },
  {
    path: PN.TEACHER,
    name: '教师管理',
    icon: <RobotOutlined />,
  },
]

export default router
