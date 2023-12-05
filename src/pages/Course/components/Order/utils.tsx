import { ProColumns } from '@ant-design/pro-components'
import { Popconfirm, Space } from 'antd'

export enum Week {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

export interface IDay {
  key: Week
  label: string
}

export const DAYS: IDay[] = [
  {
    key: Week.Monday,
    label: '周一',
  },
  {
    key: Week.Tuesday,
    label: '周二',
  },
  {
    key: Week.Wednesday,
    label: '周三',
  },
  {
    key: Week.Thursday,
    label: '周四',
  },
  {
    key: Week.Friday,
    label: '周五',
  },
  {
    key: Week.Saturday,
    label: '周六',
  },
  {
    key: Week.Sunday,
    label: '周日',
  },
]

export const getColumns = (onDelete: (id: string) => void): ProColumns[] => [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
    editable: false,
    align: 'center',
    ellipsis: true,
  },
  {
    title: '开始时间',
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '结束时间',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.id || '')
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="提醒"
          description="确认要删除吗？"
          onConfirm={() => onDelete(record.id)}
        >
          <a key="delete">删除</a>
        </Popconfirm>
      </Space>
    ),
  },
]

export const isWorkDay = (day: Week) => ![Week.Saturday, Week.Sunday].includes(day)
