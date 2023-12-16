import { LockOutlined } from '@ant-design/icons'
import { ProFormCaptcha } from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { App, theme } from 'antd'

import { AUTH_SMS_NOT_EXPIRED, GET_AUTH_SMS_FAILED, SUCCESS } from '@/constants/code'
import { SizeType } from '@/constants/enum'
import { SEND_AUTH_SMS } from '@/graphql/auth'

interface IProps {
  showLabel?: boolean
  size?: SizeType
  showPrefix?: boolean
  phoneName?: string
  name?: string
}

/**
 * 获取短信验证码表单
 */
const GetSMSCodeForm = (props: IProps) => {
  const {
    showLabel = false,
    size = SizeType.MIDDLE,
    showPrefix = false,
    phoneName = 'tel',
    name = 'code',
  } = props || {}
  const { token } = theme.useToken()
  const { message } = App.useApp()
  const [sendAuthSMS] = useMutation(SEND_AUTH_SMS)
  return (
    <>
      <ProFormCaptcha
        label={showLabel ? '验证码' : ''}
        fieldProps={{
          size,
          prefix: showPrefix ? (
            <LockOutlined
              style={{
                color: token.colorText,
              }}
              className={'prefixIcon'}
            />
          ) : null,
        }}
        captchaProps={{
          size,
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
        name={name}
        phoneName={phoneName}
        onGetCaptcha={async (tel: string) => {
          try {
            const res = await sendAuthSMS({
              variables: {
                tel,
              },
            })
            const { code, message: msg } = res.data.sendAuthSMS
            if (code === SUCCESS) {
              message.success('获取验证码成功！')
            } else if (code === AUTH_SMS_NOT_EXPIRED) {
              message.warning('验证码尚未过期！')
            } else if (code === GET_AUTH_SMS_FAILED) {
              message.error('获取验证码失败！')
            } else {
              message.error(msg)
            }
          } catch (error) {
            console.error('【sendAuthSMS】Error:')
            message.error('获取验证码失败！服务器忙，请稍后再试！')
          }
        }}
      />
    </>
  )
}

export default GetSMSCodeForm
