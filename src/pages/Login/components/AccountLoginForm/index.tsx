import { LockOutlined, MobileOutlined } from '@ant-design/icons'
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
        fieldProps={{
          size: 'large',
          prefix: (
            <MobileOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ),
        }}
        // TODO: 开发用，上线注释掉
        initialValue="13815013866"
        name="account"
        placeholder={'请输入登录手机号'}
        rules={[
          {
            required: true,
            message: '请输入登录手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
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
        placeholder={'请输入密码'}
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
