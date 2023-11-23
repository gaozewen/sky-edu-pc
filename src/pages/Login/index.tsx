import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
} from '@ant-design/pro-components'
import { Tabs } from 'antd'
import { useState } from 'react'

import AccountLoginForm from './components/AccountLoginForm'
import Actions from './components/Actions'
import MobileLoginForm from './components/MobileLoginForm'
import styles from './index.module.scss'

type LoginType = 'mobile' | 'account'

const Page = () => {
  const [loginType, setLoginType] = useState<LoginType>('mobile')

  return (
    <div className={styles.container}>
      <LoginFormPage
        logo="https://cdn.gaozewen.com/images/logo_sky_edu.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        actions={<Actions />}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}
          items={[
            {
              key: 'account',
              label: '账号密码登录',
              children: <AccountLoginForm />,
            },
            {
              key: 'mobile',
              label: '手机号登录',
              children: <MobileLoginForm />,
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
          <a className={styles.forgetPwd}>忘记密码</a>
        </div>
      </LoginFormPage>
    </div>
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
