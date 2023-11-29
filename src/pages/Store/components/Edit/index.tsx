import {
  DrawerForm,
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { Divider, Form, message, UploadFile } from 'antd'
import { useEffect, useRef } from 'react'

import ImageUpload from '@/components/ImageUpload'
import MobileForm from '@/components/MobileForm'
import { SUCCESS } from '@/constants/code'
import { useCommitStoreService, useGetStoreService } from '@/service/store'
import { IStore } from '@/types'

interface IProps {
  showEdit: boolean
  setShowEdit: (isShow: boolean) => void
  id: string
  editSuccessHandler: () => void
}

const StoreEdit = (props: IProps) => {
  const { showEdit, setShowEdit, id, editSuccessHandler } = props
  const [messageApi, contextHolder] = message.useMessage()
  const formRef = useRef<ProFormInstance>()
  const { getStore, loading, data } = useGetStoreService()
  const { onCommitStore, loading: commitStoreLoading } = useCommitStoreService()

  useEffect(() => {
    // 门店编辑抽屉打开状态，且 id 存在时才获取门店接口数据
    if (showEdit) {
      // 编辑门店
      if (id) {
        getStore({ variables: { id } })
        return
      }
      // 创建门店，清空表单值
      formRef.current?.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit])

  useEffect(() => {
    // 设置表单初始值
    const { logo, tags, businessLicense, identityCardFrontImg, identityCardBackImg } =
      data || {}

    formRef.current?.setFieldsValue(
      data
        ? {
            ...data,
            tags: tags?.split(','),
            logo: [{ url: logo }],
            businessLicense: [{ url: businessLicense }],
            identityCardFrontImg: [{ url: identityCardFrontImg }],
            identityCardBackImg: [{ url: identityCardBackImg }],
          }
        : {}
    )
  }, [data])

  return (
    <DrawerForm
      onOpenChange={setShowEdit}
      title={id ? '编辑门店' : '新建门店'}
      open={showEdit}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          loading: commitStoreLoading,
        },
        searchConfig: {
          submitText: '保存',
        },
      }}
      layout="vertical"
      formRef={formRef}
      loading={loading}
      onFinish={async values => {
        console.log('gzw====>values', values)
        try {
          const formData = {
            ...values,
            logo: values.logo[0].url,
            tags: values.tags.join(','),
            identityCardBackImg: values.identityCardBackImg[0].url,
            identityCardFrontImg: values.identityCardFrontImg[0].url,
            businessLicense: values.businessLicense[0].url,
            frontImgs: values?.frontImgs?.map((item: UploadFile) => ({
              url: item.url,
            })),
            roomImgs: values?.roomImgs?.map((item: UploadFile) => ({
              url: item.url,
            })),
            otherImgs: values?.otherImgs?.map((item: UploadFile) => ({
              url: item.url,
            })),
          } as IStore
          const { code, message } = await onCommitStore(id, formData)
          if (code === SUCCESS) {
            editSuccessHandler()
            messageApi.success(message)
            return
          }
          messageApi.error(message)
        } catch (error) {
          messageApi.error('操作失败，服务器忙，请稍后再试')
          console.error('【onCommitStore】Error：', error)
        }
      }}
    >
      {contextHolder}

      {/* 1 */}
      <ProForm.Group>
        <Form.Item
          style={{ width: 216 }}
          name="logo"
          label="Logo"
          rules={[{ required: true }]}
        >
          <ImageUpload />
        </Form.Item>

        <ProFormText
          width="sm"
          name="name"
          label="门店名称"
          placeholder="请输入门店名称"
          rules={[{ required: true }]}
        />

        <ProFormSelect
          mode="tags"
          width="sm"
          name="tags"
          label="标签"
          placeholder="请输入标签"
          rules={[{ required: true, message: '请输入标签!' }]}
        />
      </ProForm.Group>

      {/* 2 */}
      <ProForm.Group>
        <MobileForm label="手机号" name="tel" width="sm" />

        <ProFormText
          width="sm"
          name="longitude"
          label="经度"
          placeholder="请输入经度"
          rules={[{ required: true }]}
        />

        <ProFormText
          width="sm"
          name="latitude"
          label="纬度"
          placeholder="请输入经度"
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      {/* 3 */}
      <ProFormTextArea
        name="address"
        label="门店地址"
        placeholder="请输入门店地址"
        rules={[{ required: true }]}
      />

      {/* 4 */}
      <ProFormTextArea
        name="description"
        label="门店简介"
        placeholder="请输入门店简介"
        rules={[{ required: true }]}
      />

      {/* 5 */}
      <ProForm.Group>
        <Form.Item
          style={{ width: 216 }}
          name="businessLicense"
          label="营业执照"
          rules={[{ required: true }]}
        >
          <ImageUpload imgCropAspect={3 / 2} />
        </Form.Item>

        <Form.Item
          style={{ width: 216 }}
          name="identityCardFrontImg"
          label="身份证人像面"
          rules={[{ required: true }]}
        >
          <ImageUpload imgCropAspect={3 / 2} />
        </Form.Item>

        <Form.Item
          style={{ width: 216 }}
          name="identityCardBackImg"
          label="身份证国徽面"
          rules={[{ required: true }]}
        >
          <ImageUpload imgCropAspect={3 / 2} />
        </Form.Item>
      </ProForm.Group>

      {/* 6 */}
      <Divider>门店顶部图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
      <Form.Item name="frontImgs">
        <ImageUpload max={5} imgCropAspect={2 / 1} />
      </Form.Item>

      {/* 7 */}
      <Divider>门店室内图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
      <Form.Item name="roomImgs">
        <ImageUpload max={5} imgCropAspect={2 / 1} />
      </Form.Item>

      {/* 8 */}
      <Divider>门店其他图：图片长宽要求比例为 2:1，最多上传 5 张 </Divider>
      <Form.Item name="otherImgs">
        <ImageUpload max={5} imgCropAspect={2 / 1} />
      </Form.Item>
    </DrawerForm>
  )
}

export default StoreEdit
