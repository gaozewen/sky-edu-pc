import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { message } from 'antd'
import { useEffect, useRef } from 'react'

import { SUCCESS } from '@/constants/code'
import { useCommitCourseService, useGetCourseService } from '@/service/course'
import { ICourse } from '@/types'

interface IProps {
  showEdit: boolean
  setShowEdit: (isShow: boolean) => void
  id: string
  editSuccessHandler: () => void
}

const CourseEdit = (props: IProps) => {
  const { showEdit, setShowEdit, id, editSuccessHandler } = props
  const [messageApi, contextHolder] = message.useMessage()
  const formRef = useRef<ProFormInstance>()
  const { getCourse, loading, data } = useGetCourseService()
  const { onCommitCourse, loading: commitCourseLoading } = useCommitCourseService()

  useEffect(() => {
    // 课程编辑抽屉打开状态，且 id 存在时才获取课程接口数据
    if (showEdit) {
      // 编辑课程
      if (id) {
        getCourse({ variables: { id } })
        return
      }
      // 创建课程，清空表单值
      formRef.current?.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit])

  useEffect(() => {
    // 设置表单初始值
    if (data) {
      formRef.current?.setFieldsValue(data)
    }
  }, [data])

  return (
    <DrawerForm
      onOpenChange={setShowEdit}
      title={id ? '编辑课程' : '新建课程'}
      open={showEdit}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          loading: commitCourseLoading,
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
            ...values,
          } as ICourse
          const { code, message } = await onCommitCourse(id, formData)
          if (code === SUCCESS) {
            editSuccessHandler()
            messageApi.success(message)
            return
          }
          messageApi.error(message)
        } catch (error) {
          messageApi.error('操作失败，服务器忙，请稍后再试')
          console.error('【onCommitCourse】Error：', error)
        }
      }}
    >
      {contextHolder}

      {/* 1 */}
      <ProFormText
        name="name"
        label="课程名称"
        placeholder="请输入课程名称"
        rules={[{ required: true }]}
      />

      {/* 2 */}
      <ProFormTextArea
        name="desc"
        label="课程描述"
        placeholder="请输入课程描述"
        rules={[{ required: true }]}
      />

      {/* 3 */}
      <ProForm.Group>
        <ProFormDigit
          width={318}
          name="limitNumber"
          label="限制人数"
          addonAfter="人"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true }]}
        />

        <ProFormDigit
          width={318}
          name="duration"
          label="持续时长"
          addonAfter="分钟"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      {/* 4 */}
      <ProFormText
        name="group"
        label="适龄人群"
        placeholder="请输入适龄人群"
        rules={[{ required: true }]}
      />

      {/* 5 */}
      <ProFormText
        name="baseAbility"
        label="基础能力"
        placeholder="请输入基础能力"
        rules={[{ required: true }]}
      />

      {/* 6 */}
      <ProFormTextArea
        name="reserveInfo"
        label="预约信息"
        placeholder="请输入预约信息"
        rules={[{ required: true }]}
      />

      {/* 7 */}
      <ProFormTextArea
        name="refundInfo"
        label="退款信息"
        placeholder="请输入退款信息"
        rules={[{ required: true }]}
      />

      {/* 8 */}
      <ProFormTextArea name="otherInfo" label="其他信息" placeholder="请输入其他信息" />
    </DrawerForm>
  )
}

export default CourseEdit
