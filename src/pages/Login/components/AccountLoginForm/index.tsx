import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { theme } from 'antd'

/**
 * 用户名密码登录表单
 */
const AccountLoginForm = () => {
  const { token } = theme.useToken()

  return (
    <>
      <ProFormText
        name="username"
        fieldProps={{
          size: 'large',
          prefix: (
            <UserOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ),
        }}
        placeholder={'用户名: admin or user'}
        rules={[
          {
            required: true,
            message: '请输入用户名!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: (
            <LockOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ),
        }}
        placeholder={'密码: ant.design'}
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      />
    </>
  )
}

export default AccountLoginForm
