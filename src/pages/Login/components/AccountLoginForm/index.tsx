import { LockOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { theme } from 'antd'

import MobileForm from '@/components/MobileForm'
import { SizeType } from '@/constants/enum'

/**
 * 用户名密码登录表单
 */
const AccountLoginForm = () => {
  const { token } = theme.useToken()

  return (
    <>
      <MobileForm
        placeholder="请输入登录手机号"
        size={SizeType.LARGE}
        showPrefix
        name="account"
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
