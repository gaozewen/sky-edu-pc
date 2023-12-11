import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { message } from 'antd'
import { useEffect, useRef } from 'react'

import GetSMSCodeForm from '@/components/GetSMSCodeForm'
import { SUCCESS } from '@/constants/code'
import { RESET_PWD } from '@/graphql/user'
import { useLogout } from '@/hooks/useLogout'
import { useUserContext } from '@/hooks/useUserHooks'

import styles from './index.module.scss'

/**
 *  密码修改页
 */
const Password = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const { store } = useUserContext()
  const formRef = useRef<ProFormInstance>()
  const [resetPwd] = useMutation(RESET_PWD)

  const { onLogout } = useLogout()

  useEffect(() => {
    if (store.tel) {
      formRef.current?.setFieldsValue({
        tel: store.tel,
      })
    }
  }, [store])

  return (
    <PageContainer>
      <div className={styles.container}>
        {contextHolder}
        <ProForm
          formRef={formRef}
          submitter={{
            resetButtonProps: {
              style: {
                display: 'none',
              },
            },
          }}
          onFinish={async values => {
            try {
              const res = await resetPwd({
                variables: {
                  params: {
                    id: store.id,
                    tel: values.tel,
                    code: values.code,
                    password: values.password,
                  },
                },
              })
              const { code, message } = res.data.resetPwd
              if (code === SUCCESS) {
                messageApi.success('修改成功，请重新登录！')
                setTimeout(() => {
                  onLogout()
                }, 1000)
                return
              }
              messageApi.error(message)
            } catch (error) {
              console.log('resetPwd:', error)
              messageApi.error('更新失败')
            }
          }}
        >
          <ProFormText
            width="md"
            name="tel"
            label="手机号"
            tooltip="手机号即为登录账号"
            disabled
          />

          <GetSMSCodeForm showLabel />

          <ProFormText.Password
            name="password"
            label="重置密码"
            placeholder={'请输入重置密码'}
            rules={[
              {
                required: true,
                message: '请输入重置密码！',
              },
            ]}
          />

          <ProFormText.Password
            name="confirm"
            label="确认重置密码"
            placeholder={'请再次输入重置密码'}
            // password 变化会触发 confirm 的校验
            dependencies={['password']}
            rules={[
              { required: true, message: '请再次输入重置密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value)
                    return Promise.resolve()
                  else return Promise.reject(new Error('两次密码不一致'))
                },
              }),
            ]}
          />
        </ProForm>
      </div>
    </PageContainer>
  )
}

export default Password
