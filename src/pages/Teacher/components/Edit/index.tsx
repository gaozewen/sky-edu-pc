import { DrawerForm, ProFormInstance, ProFormText } from '@ant-design/pro-components'
import { App, Form } from 'antd'
import { Rule } from 'antd/es/form'
import { useEffect, useRef } from 'react'

import ImageUpload from '@/components/ImageUpload'
import { SUCCESS } from '@/constants/code'
import { useCommitTeacherService, useGetTeacherService } from '@/service/teacher'
import { ITeacher } from '@/types'

interface IProps {
  showEdit: boolean
  setShowEdit: (isShow: boolean) => void
  id: string
  editSuccessHandler: () => void
}

const TeacherEdit = (props: IProps) => {
  const { showEdit, setShowEdit, id, editSuccessHandler } = props
  const { message } = App.useApp()
  const formRef = useRef<ProFormInstance>()
  const { getTeacher, loading, data } = useGetTeacherService()
  const { onCommitTeacher, loading: commitTeacherLoading } = useCommitTeacherService()

  useEffect(() => {
    // 教师编辑抽屉打开状态，且 id 存在时才获取教师接口数据
    if (showEdit) {
      // 编辑教师
      if (id) {
        getTeacher({ variables: { id } })
        return
      }
      // 创建教师，清空表单值
      formRef.current?.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit])

  useEffect(() => {
    // 设置表单初始值
    if (data) {
      formRef.current?.setFieldsValue({
        ...data,
        avatar: data.avatar ? [{ url: data.avatar }] : undefined,
      })
    }
  }, [data])

  const PWD_CONFIG = id
    ? {
        label: '重置密码',
        placeholder: '请输入重置密码',
        rules: [{ type: 'string', min: 6 }] as Rule[],
      }
    : {
        label: '密码',
        placeholder: '请输入密码',
        rules: [
          {
            required: true,
            message: '请输入密码！',
          },
          { type: 'string', min: 6 },
        ] as Rule[],
      }

  return (
    <DrawerForm
      onOpenChange={setShowEdit}
      title={id ? '编辑教师' : '新建教师'}
      open={showEdit}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          loading: commitTeacherLoading,
        },
        searchConfig: {
          submitText: '保存',
        },
      }}
      layout="vertical"
      formRef={formRef}
      loading={loading}
      onFinish={async values => {
        try {
          const formData = {
            account: values.account,
            tel: values.tel,
            avatar: (values.avatar || [])[0]?.url || '',
            nickname: values.nickname,
          } as ITeacher
          // 需要更新才更新
          if (values.password && values.confirm && values.password === values.confirm) {
            formData.password = values.password
          }
          const { code, message: msg } = await onCommitTeacher(id, formData)
          if (code === SUCCESS) {
            editSuccessHandler()
            message.success(msg)
            return
          }
          message.error(msg)
        } catch (error) {
          message.error('操作失败，服务器忙，请稍后再试')
          console.error('【onCommitTeacher】Error：', error)
        }
      }}
    >
      <ProFormText
        name="nickname"
        label="昵称"
        placeholder="请输入教师的昵称"
        rules={[{ required: true }]}
      />

      <ProFormText
        name="account"
        label="账户名"
        placeholder="请输入账户名"
        rules={[
          { required: true, message: '请输入账户名' },
          { type: 'string', min: 5, max: 18, message: '字符长度在 5-18 之间' },
          { pattern: /^\w+$/, message: '只能是字母数字下划线' },
        ]}
      />

      <ProFormText.Password
        name="password"
        label={PWD_CONFIG.label}
        placeholder={PWD_CONFIG.placeholder}
        rules={PWD_CONFIG.rules}
      />

      <ProFormText.Password
        name="confirm"
        label="确认密码"
        placeholder={'请再次输入密码'}
        // password 变化会触发 confirm 的校验
        dependencies={['password']}
        rules={[
          ...(id ? [] : [{ required: true, message: '请再次输入密码' }]),
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value)
                return Promise.resolve()
              else return Promise.reject(new Error('两次密码不一致'))
            },
          }),
        ]}
      />

      <ProFormText
        name="tel"
        label="教师手机号"
        placeholder="请输入教师手机号"
        rules={[
          {
            pattern: /^1\d{10}$/,
            message: '手机号格式错误！',
          },
        ]}
      />

      <Form.Item name="avatar">
        <ImageUpload isAvatar={true} />
      </Form.Item>
    </DrawerForm>
  )
}

export default TeacherEdit
