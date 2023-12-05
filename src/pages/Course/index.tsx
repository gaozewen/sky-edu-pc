import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button } from 'antd'
import { useRef, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useGetCoursesService } from '@/service/course'
import { ICourse } from '@/types'

import CourseEdit from './components/Edit'
import CourseOrder from './components/Order'
import { genColumns } from './utils'

/**
 *  课程管理页
 */
const Course = () => {
  const { proTableRequest } = useGetCoursesService()
  const [showEdit, setShowEdit] = useState(false)
  const [curCourseId, setCurCourseId] = useState('')
  const actionRef = useRef<ActionType>()
  const [showOrder, setShowOrder] = useState(false)

  const onEdit = (id?: string) => {
    setCurCourseId(id || '')
    setShowEdit(true)
  }

  const editSuccessHandler = () => {
    // 关闭课程新建/编辑抽屉
    setShowEdit(false)
    // 新建, 将页面重置到第一页，展示最新生成的课程记录
    if (!curCourseId) {
      actionRef.current?.reload(true)
      return
    }

    // 编辑，刷新当前门店列表页
    actionRef.current?.reload()
  }

  const onOrderTime = (id?: string) => {
    setCurCourseId(id || '')
    setShowOrder(true)
  }

  return (
    <PageContainer
      header={{
        title: '当前门店下开设的课程',
      }}
    >
      <ProTable<ICourse>
        rowKey="id"
        actionRef={actionRef}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        columns={genColumns({ onEdit, onOrderTime })}
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

      <CourseEdit
        id={curCourseId}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        editSuccessHandler={editSuccessHandler}
      />

      <CourseOrder
        id={curCourseId}
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        editSuccessHandler={editSuccessHandler}
      />
    </PageContainer>
  )
}

export default Course
