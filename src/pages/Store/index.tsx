import { PageContainer, ProList } from '@ant-design/pro-components'
import { Button, Popconfirm, Space, Tag } from 'antd'
import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { SizeType } from '@/constants/enum'
import { useGetStoresService } from '@/service/store'
import { IStore } from '@/types'

import StoreEdit from './components/Edit'

/**
 * 门店管理页
 */
const Store = () => {
  const { loading, data: storeList, pageInfo, refetch } = useGetStoresService()

  const { loading: deleteLoading } = { loading: false }

  const [showEdit, setShowEdit] = useState(false)

  const [curStoreId, setCurStoreId] = useState('')

  const onEdit = (id?: string) => {
    setCurStoreId(id || '')
    setShowEdit(true)
  }

  const onDelete = (id?: string) => {}

  const onPageChange = (pageNum: number, pageSize: number) => {
    refetch({
      pageInfo: {
        pageNum,
        pageSize,
      },
    })
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
      <ProList
        rowKey="id"
        dataSource={storeList}
        grid={{ gutter: 16, column: 2 }}
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

      <StoreEdit id={curStoreId} showEdit={showEdit} setShowEdit={setShowEdit} />
    </PageContainer>
  )
}

export default Store
