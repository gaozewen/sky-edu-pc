import { PageContainer, ProTable } from '@ant-design/pro-components'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { useGetCoursesService } from '@/service/course'
import { ICourse } from '@/types'

import { genColumns } from './utils'

/**
 *  课程管理页
 */
const Course = () => {
  const { proTableRequest } = useGetCoursesService()
  const onEdit = () => {}

  const onOrderTime = () => {}

  return (
    <PageContainer
      header={{
        title: '当前门店下开设的课程',
      }}
    >
      <ProTable<ICourse>
        rowKey="id"
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        columns={genColumns({ onEdit, onOrderTime })}
        request={proTableRequest}
      />
    </PageContainer>
  )
}

export default Course
