import { PageContainer, ProList } from '@ant-design/pro-components'
import { App, Button, Popconfirm, Result, Space, Tag } from 'antd'
import { useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { useGoTo } from '@/hooks/useGoTo'
import { useUserContext } from '@/hooks/useUserHooks'
import { PN } from '@/router'
import { useDeleteStoreService, useGetStoresService } from '@/service/store'
import { IStore } from '@/types'
import { setLocalStore } from '@/utils/currentStore'
import { getToken } from '@/utils/userToken'

import StoreEdit from './components/Edit'

/**
 * 门店管理页
 */
const Store = () => {
  const { loading, data: storeList, pageInfo, refetch } = useGetStoresService()

  const { loading: deleteLoading, onDeleteStore } = useDeleteStoreService()

  const { setStore } = useUserContext()

  const [showEdit, setShowEdit] = useState(false)

  const [curStoreId, setCurStoreId] = useState('')

  const { message } = App.useApp()

  const { goTo } = useGoTo()

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
        message.success(res.message)
        return
      }
      message.error(res.message)
    } catch (error) {
      message.error('删除失败，服务器忙，请稍后再试')
      console.error('【onDeleteStore】Error:', error)
    }
  }

  const onSelect = (row: IStore) => {
    // 设置 store 中的 currentStoreId
    setStore({ currentStoreId: row.id })
    // 将其存储到 localStorage
    setLocalStore(
      JSON.stringify({
        id: row.id,
        name: row.name,
        // 用户 token
        token: getToken(),
      })
    )
    // 跳转到首页
    goTo({ pathname: PN.HOME })
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
      {!loading && (!storeList || storeList.length === 0) && (
        <Result
          status="warning"
          title="请先创建门店"
          subTitle="您的账户下还没有任何门店，需创建并选择门店后才可使用其他功能"
          extra={
            <Button type="primary" onClick={() => onEdit()}>
              去创建
            </Button>
          }
        />
      )}

      {storeList && storeList.length > 0 && (
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
              render: (_text, row) => [
                <a
                  key="edit"
                  style={{ color: '#1677ff' }}
                  onClick={() => onEdit(row.id)}
                >
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
                  <a style={{ color: '#1677ff' }}>删除</a>
                </Popconfirm>,
                <a
                  key="select"
                  style={{ color: '#1677ff' }}
                  onClick={() => onSelect(row)}
                >
                  选择门店
                </a>,
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
      )}

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
