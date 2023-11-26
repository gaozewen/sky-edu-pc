import { LockOutlined, MobileOutlined } from '@ant-design/icons'
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { message, theme } from 'antd'

import { AUTH_SMS_NOT_EXPIRED, GET_AUTH_SMS_FAILED, SUCCESS } from '@/constants/code'
import { SEND_AUTH_SMS } from '@/graphql/auth'

/**
 * 手机验证码登录表单
 */
const MobileLoginForm = () => {
  const { token } = theme.useToken()
  const [messageApi, contextHolder] = message.useMessage()
  const [sendAuthSMS] = useMutation(SEND_AUTH_SMS)

  return (
    <>
      {contextHolder}
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
      <ProFormCaptcha
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
        captchaProps={{
          size: 'large',
        }}
        placeholder={'请输入验证码'}
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${'获取验证码'}`
          }
          return '获取验证码'
        }}
        rules={[
          {
            required: true,
            message: '请输入验证码！',
          },
        ]}
        name="code"
        phoneName="tel"
        onGetCaptcha={async (tel: string) => {
          try {
            const res = await sendAuthSMS({
              variables: {
                tel,
              },
            })
            const { code, message: msg } = res.data.sendAuthSMS
            if (code === SUCCESS) {
              messageApi.success('获取验证码成功！')
            } else if (code === AUTH_SMS_NOT_EXPIRED) {
              messageApi.warning('验证码尚未过期！')
            } else if (code === GET_AUTH_SMS_FAILED) {
              messageApi.error('获取验证码失败！')
            } else {
              messageApi.error(msg)
            }
          } catch (error) {
            console.error('【sendAuthSMS】Error:')
            messageApi.error('获取验证码失败！服务器忙，请稍后再试！')
          }
        }}
      />
    </>
  )
}

export default MobileLoginForm
