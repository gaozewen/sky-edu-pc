import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { Form, message } from 'antd'
import { omit } from 'lodash-es'
import { useEffect, useRef } from 'react'

import ImageUpload from '@/components/ImageUpload'
import TeacherSelector from '@/components/TeacherSelector'
import { SUCCESS } from '@/constants/code'
import { useCommitCourseService, useGetCourseService } from '@/service/course'
import { IAntDOption, ICourse } from '@/types'

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
      formRef.current?.setFieldsValue({
        ...data,
        teachers: data.teachers?.map(t => ({ label: t.nickname, value: t.id })),
        coverUrl: data.coverUrl ? [{ url: data.coverUrl }] : [],
      })
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
          let formData = {
            ...values,
            teacherIds: values.teachers?.map((t: IAntDOption) => t.value),
            coverUrl: values.coverUrl[0].url || '',
          } as ICourse
          formData = omit(formData, 'teachers')
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

      <Form.Item
        style={{ width: 358 }}
        name="coverUrl"
        label="课程封面图（图片比例需为 2:1）"
        rules={[{ required: true, message: '课程封面图（图片比例需为 2:1）' }]}
      >
        <ImageUpload imgCropAspect={2 / 1} />
      </Form.Item>

      <ProFormText
        name="name"
        label="课程名称"
        placeholder="请输入课程名称"
        rules={[{ required: true }]}
      />

      <Form.Item name="teachers" label="任课老师" rules={[{ required: true }]}>
        <TeacherSelector />
      </Form.Item>

      <ProFormTextArea
        name="desc"
        label="课程描述"
        placeholder="请输入课程描述"
        rules={[{ required: true }]}
      />

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

      <ProFormText
        name="group"
        label="适龄人群"
        placeholder="请输入适龄人群"
        rules={[{ required: true }]}
      />

      <ProFormText
        name="baseAbility"
        label="基础能力"
        placeholder="请输入基础能力"
        rules={[{ required: true }]}
      />

      <ProFormTextArea
        name="reserveInfo"
        label="预约信息"
        placeholder="请输入预约信息"
        rules={[{ required: true }]}
      />

      <ProFormTextArea
        name="refundInfo"
        label="退款信息"
        placeholder="请输入退款信息"
        rules={[{ required: true }]}
      />

      <ProFormTextArea name="otherInfo" label="其他信息" placeholder="请输入其他信息" />
    </DrawerForm>
  )
}

export default CourseEdit
