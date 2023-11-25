import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { ConfigProvider, message, Tabs } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SUCCESS } from '@/constants/code'
import { ADMIN_LOGIN } from '@/graphql/auth'
import { PN_HOME } from '@/router'
import { setToken } from '@/utils/userToken'

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
  const [loginType, setLoginType] = useState<LoginType>(LoginType.MOBILE)
  const [adminLogin, { loading, client }] = useMutation(ADMIN_LOGIN)
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useNavigate()

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
        // TODO: 登出之后也要做同样的处理
        // https://www.apollographql.com/docs/react/networking/authentication
        // 登录成功后清空阿波罗之前的缓存
        client.clearStore()
        setToken(res.data.adminLogin.data, autoLogin)
        messageApi.success(res.data.adminLogin.message)
        nav(PN_HOME)
        return
      }
      messageApi.error(res.data.adminLogin.message)
    } catch (error) {
      messageApi.error('服务器忙，请稍后再试')
      console.error('【adminLogin】Error：', error)
    }
  }

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        <LoginFormPage
          logo="https://cdn.gaozewen.com/images/logo_sky_edu.png"
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          containerStyle={{
            backgroundColor: 'rgba(0, 0, 0,0.65)',
            backdropFilter: 'blur(4px)',
          }}
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
                children: <MobileLoginForm />,
              },
              {
                key: LoginType.ACCOUNT,
                label: '密码登录',
                children: <AccountLoginForm />,
              },
            ]}
          ></Tabs>

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            {loginType === 'account' && <a className={styles.forgetPwd}>忘记密码</a>}
          </div>
        </LoginFormPage>
      </div>
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
