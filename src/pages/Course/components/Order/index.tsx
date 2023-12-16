import { ChromeOutlined, RedoOutlined } from '@ant-design/icons'
import { EditableProTable } from '@ant-design/pro-components'
import { Button, Col, Drawer, Row, Space, Tabs } from 'antd'
import { omit } from 'lodash-es'
import { nanoid } from 'nanoid'

import { IOrderTime } from '@/types'

import styles from './index.module.scss'
import { useCourseOrder } from './useCourseOrder'
import { DAYS, getColumns, isWorkDay } from './utils'

export interface ICourseOrderProps {
  showOrder: boolean
  setShowOrder: (isShow: boolean) => void
  id: string
}

const CourseOrder = (props: ICourseOrderProps) => {
  const {
    setShowOrder,
    showOrder,
    contextHolder,
    onChangeTab,
    currentDay,
    loading,
    commitCourseLoading,
    orderTimes,
    onDelete,
    onSaveCurrentDay,
    onSyncAllWorkDay,
    onSyncAllWeek,
  } = useCourseOrder(props)

  return (
    <Drawer
      width={720}
      onClose={() => setShowOrder(false)}
      title="预约时间设置"
      open={showOrder}
    >
      {contextHolder}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Tabs type="card" items={DAYS} onChange={onChangeTab} />
      </div>

      <EditableProTable<IOrderTime>
        headerTitle={
          <Space>
            选择
            <span className={styles.name}>{currentDay.label}</span>
            的课开放预约的时间
          </Space>
        }
        loading={loading || commitCourseLoading}
        rowKey="id"
        recordCreatorProps={{
          record: () => ({
            id: nanoid(),
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        value={orderTimes}
        columns={getColumns(onDelete)}
        editable={{
          onSave: async (id, d) => {
            let newData = []
            // 修改
            if (orderTimes.findIndex(item => item.id === id) > -1) {
              newData = orderTimes?.map(item =>
                item.id === id ? omit(d, 'index') : { ...item }
              )
            } else {
              // 新增
              newData = [...orderTimes, omit(d, 'index')]
            }
            onSaveCurrentDay(newData)
          },
          onDelete: async rowKey => {
            onDelete(rowKey as string)
          },
        }}
      />

      <Row gutter={20} className={styles.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key) || orderTimes.length === 0}
            onClick={onSyncAllWorkDay}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            disabled={orderTimes.length === 0}
            onClick={onSyncAllWeek}
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  )
}

export default CourseOrder
