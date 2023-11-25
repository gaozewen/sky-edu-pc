import { createBrowserRouter } from 'react-router-dom'

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router

// PN: pathname
export const PN_HOME = '/'
export const PN_LOGIN = '/login'
