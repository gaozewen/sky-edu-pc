import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { App, ConfigProvider, Tabs } from 'antd'
import { useState } from 'react'

import LOGO from '@/assets/images/logo_sky_edu_login_pc.png'
import { SUCCESS } from '@/constants/code'
// import { IMG } from '@/constants/image'
import { ADMIN_LOGIN } from '@/graphql/auth'
import { useTitle } from '@/hooks/useTitle'
import { useUserContext } from '@/hooks/useUserHooks'
// import { ImgUtils } from '@/utils'
import { setToken } from '@/utils/userToken'

import Stars from '../../components/Stars'
import AccountLoginForm from './components/AccountLoginForm'
import Actions from './components/Actions'
import MobileLoginForm from './components/MobileLoginForm'
import styles from './index.module.scss'

enum LoginType {
  MOBILE = 'mobile',
  ACCOUNT = 'account',
}

interface IValue {
  tel: string
  code: string
  account: string
  password: string
  autoLogin: boolean
}

const Page = () => {
  useTitle('登录')
  const [loginType, setLoginType] = useState<LoginType>(LoginType.MOBILE)
  const [adminLogin, { loading, client }] = useMutation(ADMIN_LOGIN)
  const { message } = App.useApp()
  const { store: userStore } = useUserContext()

  const onFinish = async (value: IValue) => {
    const { tel, code, account, password, autoLogin } = value
    try {
      const res = await adminLogin({
        variables: {
          params: {
            loginType,
            tel: loginType === LoginType.MOBILE ? tel : account,
            code,
            password,
          },
        },
      })
      if (res.data.adminLogin.code === SUCCESS) {
        // https://www.apollographql.com/docs/react/networking/authentication
        // 登录成功后清空阿波罗之前的缓存
        await client.clearStore()
        setToken(res.data.adminLogin.data, autoLogin)
        // 更新用户信息 (为了解决跳转页面后 GET_USER_BY_JWT 接口不触发的问题)
        // 原因是：由于 UserInfoLayout 是所有页面的 layout，所以当登录成功跳转其他页面后
        // UserInfoLayout 组件不会重新渲染，所以也不会加载获取用户信息的请求
        // 所以需要们手动触发
        userStore.refetchHandler()
        // 路由跳转交由 useAutoNavigate 统一控制
        message.success(res.data.adminLogin.message)
        return
      }
      message.error(res.data.adminLogin.message)
    } catch (error) {
      message.error('服务器忙，请稍后再试')
      console.error('【adminLogin】Error：', error)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <LoginFormPage
          // logo={ImgUtils.getThumb({
          //   url: IMG.LOGO,
          //   w: 229,
          //   h: 184,
          // })}
          logo={<img src={LOGO} alt="logo" />}
          actions={<Actions />}
          onFinish={async (values: IValue) => {
            await onFinish(values)
          }}
          loading={loading}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={activeKey => setLoginType(activeKey as LoginType)}
            items={[
              {
                key: LoginType.MOBILE,
                label: '登录/注册',
              },
              {
                key: LoginType.ACCOUNT,
                label: '密码登录',
              },
            ]}
          ></Tabs>

          {/* 必须把表单放在外面，如果放在 Tabs 中的 children 中，切换 tab 后 onFinish 会失效 */}
          {loginType === LoginType.MOBILE && <MobileLoginForm />}

          {loginType === LoginType.ACCOUNT && <AccountLoginForm />}

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin" initialValue={true}>
              自动登录2
            </ProFormCheckbox>
            {loginType === 'account' && <a className={styles.forgetPwd}>忘记密码</a>}
          </div>
        </LoginFormPage>
      </div>
      {/* 星空背景 */}
      <Stars />
    </>
  )
}

const Login = () => {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        // algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00C6A8',
        },
      }}
    >
      <ProConfigProvider dark>
        <Page />
      </ProConfigProvider>
    </ConfigProvider>
  )
}

export default Login
