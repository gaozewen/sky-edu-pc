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

import Stars from '@/components/Stars'
import UserInfoLayout from '@/layouts/UserInfoLayout'
import Jump from '@/pages/Jump'

const Login = lazy(() => import('@/pages/Login'))
const SkyLayout = lazy(() => import('@/layouts/SkyLayout'))
const Course = lazy(() => import('@/pages/Course'))
const Home = lazy(() => import('@/pages/Home'))
const SelectStoreGuide = lazy(() => import('@/pages/SelectStoreGuide'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Password = lazy(() => import('@/pages/Password'))
const Product = lazy(() => import('@/pages/Product'))
const Profile = lazy(() => import('@/pages/Profile'))
const Store = lazy(() => import('@/pages/Store'))
const Student = lazy(() => import('@/pages/Student'))
const Teacher = lazy(() => import('@/pages/Teacher'))

// PN: pathname
export const PN = {
  JUMP: '/',
  HOME: '/home',
  LOGIN: '/login',
  PROFILE: '/profile',
  PASSWORD: '/password',
  STORE: '/store',
  STUDENT: '/student',
  SELECT_STORE_GUIDE: '/select-store-guide',
  COURSE: '/course',
  PRODUCT: '/product',
  TEACHER: '/teacher',
}

type AllRouteValueType = {
  path: string
  name: string
}

type AllRouteType = {
  [key: string]: AllRouteValueType
}

export const ALL_ROUTE: AllRouteType = {
  [PN.HOME]: {
    path: PN.HOME,
    name: '课程表',
  },
  [PN.LOGIN]: {
    path: PN.LOGIN,
    name: '登录',
  },
  [PN.PROFILE]: {
    path: PN.PROFILE,
    name: '个人信息',
  },
  [PN.PASSWORD]: {
    path: PN.PASSWORD,
    name: '修改密码',
  },
  [PN.STORE]: {
    path: PN.STORE,
    name: '门店管理',
  },
  [PN.STUDENT]: {
    path: PN.STUDENT,
    name: '学员管理',
  },
  [PN.SELECT_STORE_GUIDE]: {
    path: PN.SELECT_STORE_GUIDE,
    name: '未选择门店',
  },
  [PN.COURSE]: {
    path: PN.COURSE,
    name: '课程管理',
  },
  [PN.PRODUCT]: {
    path: PN.PRODUCT,
    name: '商品管理',
  },
  [PN.TEACHER]: {
    path: PN.TEACHER,
    name: '教师管理',
  },
}

export const router = createBrowserRouter([
  {
    path: PN.JUMP,
    element: <Jump />,
  },
  {
    path: '/',
    element: <UserInfoLayout />,
    children: [
      {
        path: PN.LOGIN,
        element: (
          <Suspense fallback={<Stars showLoading={true} />}>
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
            path: PN.SELECT_STORE_GUIDE,
            element: (
              <Suspense fallback={<PageLoading />}>
                <SelectStoreGuide />
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
    name: '课程表',
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
    path: PN.TEACHER,
    name: '教师管理',
    icon: <RobotOutlined />,
  },
  {
    path: PN.COURSE,
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  {
    path: PN.PRODUCT,
    name: '商品管理',
    icon: <GiftOutlined />,
  },
  {
    path: PN.STUDENT,
    name: '学员管理',
    icon: <TeamOutlined />,
    hideInMenu: true,
  },
]

export default router
