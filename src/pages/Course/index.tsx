import { PlusOutlined } from '@ant-design/icons'
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components'
import { App, Button } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useGoTo } from '@/hooks/useGoTo'
import { PN } from '@/router'
import { useGetCoursesService } from '@/service/course'
import { useGetTeachersService } from '@/service/teacher'
import { ICourse } from '@/types'

import CourseCard from './components/Card'
import CourseEdit from './components/Edit'
import CourseOrder from './components/Order'
import { genColumns } from './utils'

/**
 *  课程管理页
 */
const Course = () => {
  const { proTableRequest } = useGetCoursesService()
  const { proTableRequest: getTeachers } = useGetTeachersService()
  const [showEdit, setShowEdit] = useState(false)
  const [curCourseId, setCurCourseId] = useState('')
  const actionRef = useRef<ActionType>()
  const [showOrder, setShowOrder] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [isExistTeachers, setIsExistTeachers] = useState(false)
  const { modal } = App.useApp()
  const { goTo } = useGoTo()

  const initIsExistTeachers = async () => {
    const { total } = await getTeachers({})
    if (total && total > 0) {
      setIsExistTeachers(true)
    }
  }

  useEffect(() => {
    initIsExistTeachers()
  }, [])

  const onEdit = (id?: string) => {
    if (isExistTeachers) {
      setCurCourseId(id || '')
      setShowEdit(true)
      return
    }
    // 不存在老师，引导去创建
    modal.confirm({
      title: `课程${id ? '编辑' : '新建'}基于教师`,
      content: '请先去创建门店教师',
      cancelText: '知道了',
      okText: '去创建',
      onOk: () => {
        goTo({ pathname: PN.TEACHER })
      },
    })
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

  const onCard = (id?: string) => {
    setCurCourseId(id || '')
    setShowCard(true)
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
        columns={genColumns({ onEdit, onOrderTime, onCard })}
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

      <CourseOrder id={curCourseId} showOrder={showOrder} setShowOrder={setShowOrder} />

      <CourseCard id={curCourseId} showCard={showCard} setShowCard={setShowCard} />
    </PageContainer>
  )
}

export default Course
