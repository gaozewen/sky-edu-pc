import {
  DrawerForm,
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components'
import { App, Form } from 'antd'
import { useEffect, useRef } from 'react'

import ImageUpload from '@/components/ImageUpload'
import { SUCCESS } from '@/constants/code'
import {
  useCommitProductService,
  useGetProductCategoriesService,
  useGetProductService,
} from '@/service/product'
import { IProduct } from '@/types'

interface IProps {
  showEdit: boolean
  setShowEdit: (isShow: boolean) => void
  id: string
  editSuccessHandler: () => void
}

const ProductEdit = (props: IProps) => {
  const { showEdit, setShowEdit, id, editSuccessHandler } = props
  const { message } = App.useApp()
  const formRef = useRef<ProFormInstance>()
  const { getProduct, loading, data } = useGetProductService()
  const { onCommitProduct, loading: commitProductLoading } = useCommitProductService()
  const { data: categories } = useGetProductCategoriesService()

  useEffect(() => {
    // 商品编辑抽屉打开状态，且 id 存在时才获取商品接口数据
    if (showEdit) {
      // 编辑商品
      if (id) {
        getProduct({ variables: { id } })
        return
      }
      // 创建商品，清空表单值
      formRef.current?.resetFields()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showEdit])

  useEffect(() => {
    // 设置表单初始值
    const { coverUrl, bannerUrl } = data || {}
    formRef.current?.setFieldsValue(
      data
        ? {
            ...data,
            coverUrl: [{ url: coverUrl }],
            bannerUrl: [{ url: bannerUrl }],
          }
        : {}
    )
  }, [data])

  return (
    <DrawerForm
      onOpenChange={setShowEdit}
      title={id ? '编辑商品' : '新建商品'}
      open={showEdit}
      submitter={{
        resetButtonProps: {
          style: {
            display: 'none',
          },
        },
        submitButtonProps: {
          loading: commitProductLoading,
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
            coverUrl: values.coverUrl[0].url,
            bannerUrl: values.bannerUrl[0].url,
          } as IProduct
          const { code, message: msg } = await onCommitProduct(id, formData)
          if (code === SUCCESS) {
            editSuccessHandler()
            message.success(msg)
            return
          }
          message.error(msg)
        } catch (error) {
          message.error('操作失败，服务器忙，请稍后再试')
          console.error('【onCommitProduct】Error：', error)
        }
      }}
    >
      {/* 1 */}
      <ProFormText
        name="name"
        label="商品名称"
        placeholder="请输入商品名称"
        rules={[{ required: true }]}
      />

      {/* 2 */}
      <ProFormTextArea
        name="desc"
        label="商品描述"
        placeholder="请输入商品描述"
        rules={[{ required: true }]}
      />

      {/* 3 */}
      <ProFormSelect
        name="category"
        label="商品品类"
        placeholder="请选择商品品类"
        options={categories?.map(c => ({ label: c.title, value: c.key }))}
        rules={[{ required: true }]}
      />

      {/* 4 */}
      <ProForm.Group>
        <ProFormDigit
          width={358}
          name="stock"
          label="库存总数"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true }]}
        />

        <ProFormDigit
          width={358}
          name="limitBuyNumber"
          label="每人限购数量"
          min={0}
          fieldProps={{ precision: 0 }}
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      {/* 5 */}
      <ProForm.Group>
        <ProFormDigit
          width={358}
          name="originalPrice"
          label="原价"
          min={0}
          rules={[{ required: true }]}
        />

        <ProFormDigit
          width={358}
          name="preferentialPrice"
          label="优惠价"
          min={0}
          rules={[{ required: true }]}
        />
      </ProForm.Group>

      {/* 6 */}
      <ProForm.Group>
        <Form.Item
          style={{ width: 358 }}
          name="coverUrl"
          label="商品封面图（图片比例需为 16:9）"
          rules={[{ required: true, message: '请上传商品封面图（图片比例需为 16:9）' }]}
        >
          <ImageUpload imgCropAspect={16 / 9} />
        </Form.Item>

        <Form.Item
          style={{ width: 358 }}
          name="bannerUrl"
          label="商品 Banner 横图（图片比例需为 16:9）"
          rules={[
            { required: true, message: '请上传商品 Banner 横图（图片比例需为 16:9）' },
          ]}
        >
          <ImageUpload imgCropAspect={16 / 9} />
        </Form.Item>
      </ProForm.Group>
    </DrawerForm>
  )
}

export default ProductEdit
