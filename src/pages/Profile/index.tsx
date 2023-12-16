import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { useMutation } from '@apollo/client'
import { App, Form } from 'antd'
import { useEffect, useRef } from 'react'

import AvatarUpload from '@/components/AvatarUpload'
import { SUCCESS } from '@/constants/code'
import { UPDATE_USER_PROFILE } from '@/graphql/user'
import { useUserContext } from '@/hooks/useUserHooks'

import styles from './index.module.scss'

/**
 *  个人信息页
 */
const Profile = () => {
  const { message } = App.useApp()
  const { store } = useUserContext()
  const formRef = useRef<ProFormInstance>()
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE)

  useEffect(() => {
    if (store.tel) {
      formRef.current?.setFieldsValue({
        tel: store.tel,
        nickname: store.nickname,
        desc: store.desc,
        avatar: store.avatar,
      })
    }
  }, [store])

  return (
    <PageContainer>
      <div className={styles.container}>
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
              const res = await updateUserProfile({
                variables: {
                  id: store.id,
                  params: {
                    nickname: values.nickname,
                    desc: values.desc,
                    avatar: values.avatar,
                  },
                },
              })
              const { code, message: msg } = res.data.updateUserProfile
              if (code === SUCCESS) {
                // 刷新用户信息
                store.refetchHandler()
                message.success(msg)
                return
              }
              message.error(msg)
            } catch (error) {
              console.error('【updateUserProfile】Error:', error)
              message.error('更新失败')
            }
          }}
        >
          <Form.Item name="avatar">
            <AvatarUpload />
          </Form.Item>
          <ProFormText
            width="md"
            name="tel"
            label="手机号"
            tooltip="手机号即为登录账号"
            disabled
          />
          <ProFormText
            width="md"
            name="nickname"
            label="昵称"
            placeholder="请输入您的昵称"
          />
          <ProFormTextArea
            width="md"
            name="desc"
            label="个人简介"
            placeholder="请输入您的个人简介"
          />
        </ProForm>
      </div>
    </PageContainer>
  )
}

export default Profile
