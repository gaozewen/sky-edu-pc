import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import { useRef, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { useDeleteProductService, useGetProductsService } from '@/service/product'
import { IProduct } from '@/types'

import BindCardModal from './components/BindCardModal'
import ProductEdit from './components/Edit'
import { genColumns } from './utils'

/**
 *  商品管理页
 */
const Product = () => {
  const { proTableRequest } = useGetProductsService()
  const { onDeleteProduct } = useDeleteProductService()
  const [messageApi, contextHolder] = message.useMessage()
  const [showEdit, setShowEdit] = useState(false)
  const [curProductId, setCurProductId] = useState('')
  const actionRef = useRef<ActionType>()
  const [showModal, setShowModal] = useState(false)

  const onEdit = (id?: string) => {
    setCurProductId(id || '')
    setShowEdit(true)
  }

  const editSuccessHandler = () => {
    // 关闭商品新建/编辑抽屉
    setShowEdit(false)
    // 新建, 将页面重置到第一页，展示最新生成的商品记录
    if (!curProductId) {
      actionRef.current?.reload(true)
      return
    }

    // 编辑，刷新当前商品列表页
    actionRef.current?.reload()
  }

  const onModal = (id?: string) => {
    setCurProductId(id || '')
    setShowModal(true)
  }

  const onDelete = async (id: string) => {
    try {
      const { code, message } = await onDeleteProduct(id)
      if (code === SUCCESS) {
        // 刷新当前商品列表页
        actionRef.current?.reload()
        messageApi.success(message)
        return
      }
      messageApi.error(message)
    } catch (error) {
      messageApi.error('操作失败，服务器忙，请稍后再试')
      console.error('【onDeleteCard】Error：', error)
    }
  }

  return (
    <PageContainer
      header={{
        title: '当前门店售卖的商品',
      }}
    >
      {contextHolder}

      <ProTable<IProduct>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        actionRef={actionRef}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        columns={genColumns({ onEdit, onModal, onDelete })}
        request={proTableRequest}
        toolBarRender={() => [
          <Button
            key="add"
            onClick={() => onEdit()}
            type="primary"
            icon={<PlusOutlined />}
          >
            新建
          </Button>,
        ]}
        scroll={{ x: 1300 }}
      />

      <ProductEdit
        id={curProductId}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        editSuccessHandler={editSuccessHandler}
      />

      {showModal && <BindCardModal id={curProductId} setShowModal={setShowModal} />}
    </PageContainer>
  )
}

export default Product
