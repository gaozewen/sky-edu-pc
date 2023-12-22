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
      title="关联消费卡"
      open={showCard}
      onClose={() => setShowCard(false)}
    >
      {/* show 的时候重新渲染 table 以避免因别的课程绑定消费卡时可编辑态未关闭，
          而导致当前课程的绑定消费卡表格也无法编辑，因为 “同时只能编辑一行” */}
      {showCard && (
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
            onSave: async (_rowKey, d) => {
              onSave(d)
            },
            onDelete: async rowKey => {
              onDelete(rowKey as string)
            },
          }}
        />
      )}
    </Drawer>
  )
}

export default CourseCard
