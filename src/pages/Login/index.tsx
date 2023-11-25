import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { message, Tabs } from 'antd'
import { useState } from 'react'

import { SUCCESS } from '@/constants/code'
import { ADMIN_LOGIN } from '@/graphql/auth'

import AccountLoginForm from './components/AccountLoginForm'
import Actions from './components/Actions'
import MobileLoginForm from './components/MobileLoginForm'
import styles from './index.module.scss'

type LoginType = 'mobile' | 'account'

interface IValue {
  tel: string
  code: string
  password: string
  autoLogin: boolean
}

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('mobile')
  const [adminLogin, { loading }] = useMutation(ADMIN_LOGIN)
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = async (value: IValue) => {
    const { tel, code, password } = value
    try {
      const res = await adminLogin({
        variables: {
          params: {
            loginType,
            tel,
            code,
            password,
          },
        },
      })
      if (res.data.adminLogin.code === SUCCESS) {
        messageApi.success(res.data.adminLogin.message)
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
                key: 'mobile',
                label: '登录/注册',
                children: <MobileLoginForm />,
              },
              {
                key: 'account',
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
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  )
}

export default Login
