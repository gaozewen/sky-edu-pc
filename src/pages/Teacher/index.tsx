import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useRef, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useGetTeachersService } from '@/service/teacher'
import { ITeacher } from '@/types'

import TeacherEdit from './components/Edit'
import { genColumns } from './utils'

/**
 * 教师管理页
 */
const Teacher = () => {
  const { proTableRequest } = useGetTeachersService()
  const [showEdit, setShowEdit] = useState(false)
  const [curTeacherId, setCurTeacherId] = useState('')
  const actionRef = useRef<ActionType>()

  const onEdit = (id?: string) => {
    setCurTeacherId(id || '')
    setShowEdit(true)
  }

  const editSuccessHandler = () => {
    // 关闭教师新建/编辑抽屉
    setShowEdit(false)
    // 新建, 将页面重置到第一页，展示最新生成的教师记录
    if (!curTeacherId) {
      actionRef.current?.reload(true)
      return
    }

    // 编辑，刷新当前门店列表页
    actionRef.current?.reload()
  }

  return (
    <PageContainer
      header={{
        title: '当前门店下的老师',
      }}
    >
      <ProTable<ITeacher>
        rowKey="id"
        actionRef={actionRef}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        columns={genColumns({ onEdit })}
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
      />

      <TeacherEdit
        id={curTeacherId}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        editSuccessHandler={editSuccessHandler}
      />
    </PageContainer>
  )
}

export default Teacher
