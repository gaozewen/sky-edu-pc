import { PageContainer, ProList } from '@ant-design/pro-components'
import { Button, message, Popconfirm, Space, Tag } from 'antd'
import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { useDeleteStoreService, useGetStoresService } from '@/service/store'

import StoreEdit from './components/Edit'

/**
 * 门店管理页
 */
const Store = () => {
  const { loading, data: storeList, pageInfo, refetch } = useGetStoresService()

  const { loading: deleteLoading, onDeleteStore } = useDeleteStoreService()

  const [showEdit, setShowEdit] = useState(false)

  const [curStoreId, setCurStoreId] = useState('')

  const [messageApi, contextHolder] = message.useMessage()

  const onEdit = (id?: string) => {
    setCurStoreId(id || '')
    setShowEdit(true)
  }

  const onDelete = async (id?: string) => {
    try {
      const res = await onDeleteStore(id || '')
      if (res.code === SUCCESS) {
        // 刷新当前列表页
        refetch()
        messageApi.success(res.message)
        return
      }
      messageApi.error(res.message)
    } catch (error) {
      messageApi.error('删除失败，服务器忙，请稍后再试')
      console.error('【onDeleteStore】Error:', error)
    }
  }

  const onPageChange = (pageNum: number, pageSize: number) => {
    refetch({
      pageInfo: {
        pageNum,
        pageSize,
      },
    })
  }

  const editSuccessHandler = () => {
    // 关闭门店新建/编辑抽屉
    setShowEdit(false)
    // 新建, 将页面重置到第一页，展示最新生成的门店卡片
    if (!curStoreId) {
      refetch({
        pageInfo: {
          pageNum: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      })
      return
    }

    // 编辑，刷新当前门店列表页
    refetch()
  }

  return (
    <PageContainer
      loading={loading}
      extra={[
        <Button key="1" type="primary" onClick={() => onEdit()}>
          新增门店
        </Button>,
      ]}
    >
      {contextHolder}
      <ProList
        rowKey="id"
        dataSource={storeList}
        grid={{ gutter: 12, column: 2 }}
        metas={{
          avatar: {
            dataIndex: 'logo',
          },
          title: {
            dataIndex: 'name',
          },
          subTitle: {
            dataIndex: 'tags',
            render: tags => {
              return (
                <Space size={0}>
                  {String(tags || '')
                    ?.split(',')
                    .map(tag => (
                      <Tag key={tag} color="#5BD8A6">
                        {tag}
                      </Tag>
                    ))}
                </Space>
              )
            },
            search: false,
          },
          content: {
            dataIndex: 'address',
          },
          actions: {
            cardActionProps: 'actions',
            render: (text, row) => [
              <a key="edit" onClick={() => onEdit(row.id)}>
                编辑
              </a>,
              <Popconfirm
                key="delete"
                title="提醒"
                description={`确定要删除 ${row.name} 吗？`}
                onConfirm={() => onDelete(row.id)}
                okButtonProps={{
                  loading: deleteLoading,
                }}
              >
                <a>删除</a>
              </Popconfirm>,
            ],
            search: false,
          },
        }}
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: false,
          total: pageInfo?.total,
          onChange: onPageChange,
        }}
      />

      <StoreEdit
        id={curStoreId}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        editSuccessHandler={editSuccessHandler}
      />
    </PageContainer>
  )
}

export default Store
