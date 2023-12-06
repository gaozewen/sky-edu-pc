import { EditableProTable } from '@ant-design/pro-components'
import { Drawer } from 'antd'

import { ICard } from '@/types'

import { useCourseCard } from './useCourseCard'
import { getColumns } from './utils'

export interface ICourseCardProps {
  showCard: boolean
  setShowCard: (isShow: boolean) => void
  id: string
}

const CourseCard = (props: ICourseCardProps) => {
  const {
    setShowCard,
    showCard,
    contextHolder,
    loading,
    commitCardLoading,
    deleteLoading,
    data,
    onSave,
    onDelete,
  } = useCourseCard(props)

  return (
    <Drawer
      width="78vw"
      onClose={() => setShowCard(false)}
      title="关联消费卡"
      open={showCard}
    >
      {contextHolder}

      <EditableProTable<ICard>
        headerTitle="请管理该课程的消费卡"
        loading={loading || commitCardLoading || deleteLoading}
        rowKey="id"
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validateDay: 0,
          }),
        }}
        value={data}
        columns={getColumns(onDelete)}
        editable={{
          onSave: async (rowKey, d) => {
            onSave(d)
          },
          onDelete: async rowKey => {
            onDelete(rowKey as string)
          },
        }}
      />
    </Drawer>
  )
}

export default CourseCard
