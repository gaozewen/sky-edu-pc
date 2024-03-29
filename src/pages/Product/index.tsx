import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { App, Button } from 'antd'
import { useRef, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { SUCCESS, VALID_SCHEDULE_NOT_EXIST } from '@/constants/code'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import {
  useCommitProductService,
  useDeleteProductService,
  useGetProductsService,
} from '@/service/product'
import { IProduct } from '@/types'

import BindCardModal from './components/BindCardModal'
import ProductEdit from './components/Edit'
import { genColumns, ProductStatus } from './utils'

/**
 *  商品管理页
 */
const Product = () => {
  const { proTableRequest } = useGetProductsService()
  const { onDeleteProduct } = useDeleteProductService()
  const { message, modal } = App.useApp()
  const [showEdit, setShowEdit] = useState(false)
  const [curProductId, setCurProductId] = useState('')
  const actionRef = useRef<ActionType>()
  const [showModal, setShowModal] = useState(false)
  const { onCommitProduct } = useCommitProductService()
  const { goTo } = useGoTo()

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
      const { code, message: msg } = await onDeleteProduct(id)
      if (code === SUCCESS) {
        // 刷新当前商品列表页
        actionRef.current?.reload()
        message.success(msg)
        return
      }
      message.error(msg)
    } catch (error) {
      message.error('操作失败，服务器忙，请稍后再试')
      console.error('【onDeleteCard】Error：', error)
    }
  }

  const onStatusChange = async (id: string, status: ProductStatus) => {
    try {
      const { code, message: msg } = await onCommitProduct(id, { status })
      if (code === SUCCESS) {
        // 刷新当前商品列表页
        actionRef.current?.reload()
        message.success(msg)
        return
      }
      if (code === VALID_SCHEDULE_NOT_EXIST) {
        // 想要上架商品，未来 7 天却没有有效的排课，引导去排课
        modal.error({
          title: '无有效排课',
          content: msg,
          okText: '去排课',
          onOk: () => {
            goTo({ pathname: PN.HOME })
          },
        })
        return
      }
      message.error(msg)
    } catch (error) {
      message.error('操作失败，服务器忙，请稍后再试')
      console.error('【onCommitProduct】Error：', error)
    }
  }

  return (
    <PageContainer
      header={{
        title: '当前门店售卖的商品',
      }}
    >
      <ProTable<IProduct>
        rowKey="id"
        form={{
          ignoreRules: false,
        }}
        actionRef={actionRef}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        columns={genColumns({ onStatusChange, onEdit, onModal, onDelete })}
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
