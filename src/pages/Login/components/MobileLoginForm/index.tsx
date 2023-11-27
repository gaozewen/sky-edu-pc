import { MobileOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { theme } from 'antd'

import GetSMSCodeForm from '@/components/GetSMSCodeForm'
import { SizeType } from '@/components/GetSMSCodeForm/type'

/**
 * 手机验证码登录表单
 */
const MobileLoginForm = () => {
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
        name="tel"
        placeholder={'请输入手机号'}
        rules={[
          {
            required: true,
            message: '请输入手机号！',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
      />

      <GetSMSCodeForm size={SizeType.LARGE} showPrefix={true} />
    </>
  )
}

export default MobileLoginForm
