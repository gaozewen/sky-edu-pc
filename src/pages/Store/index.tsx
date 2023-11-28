import { PageContainer, ProList } from '@ant-design/pro-components'
import { Button, Popconfirm, Tag } from 'antd'
import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useGetStoresService } from '@/service/store'

import StoreEdit from './components/Edit'

/**
 * 门店管理页
 */
const Store = () => {
  const { loading, data: storeList, pageInfo, refetch } = useGetStoresService()

  const { loading: deleteLoading } = { loading: true }

  const [showEdit, setShowEdit] = useState(false)

  const [curStoreId, setCurStoreId] = useState('')

  const onEdit = (id?: string) => {
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

  const dataSource = storeList?.map(item => ({
    title: item,
    subTitle: (
      <div>
        {item.tags?.split(',').map(tag => (
          <Tag key={tag} color="#5BD8A6">
            {tag}
          </Tag>
        ))}
      </div>
    ),
    actions: [
      <Button key="edit" type="link" onClick={() => onEdit(item.id)}>
        编辑
      </Button>,
      <Popconfirm
        key="delete"
        title="提醒"
        description={`确定要删除 ${item.name} 吗？`}
        onConfirm={() => onDelete(item.id)}
      >
        <Button type="link" loading={deleteLoading}>
          删除
        </Button>
      </Popconfirm>,
    ],
    content: item.address,
  }))

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
        pagination={{
          defaultPageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: false,
          total: pageInfo?.total,
          onChange: onPageChange,
        }}
        showActions="hover"
        rowSelection={false}
        grid={{ gutter: 10, column: 2 }}
        onItem={record => {
          return {
            onMouseEnter: () => {
              console.log(record)
            },
            onClick: () => {
              console.log(record)
            },
          }
        }}
        metas={{
          title: {
            dataIndex: 'name',
          },
          subTitle: {},
          type: {},
          avatar: {
            dataIndex: 'logo',
          },
          content: {
            dataIndex: 'address',
          },
          actions: {
            cardActionProps: 'extra',
          },
        }}
        dataSource={dataSource}
      />

      <StoreEdit id={curStoreId} showEdit={showEdit} setShowEdit={setShowEdit} />
    </PageContainer>
  )
}

export default Store
