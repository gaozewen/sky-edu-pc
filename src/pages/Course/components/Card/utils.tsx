import { ProColumns } from '@ant-design/pro-components'
import { Popconfirm, Space, Tag } from 'antd'

export enum CardType {
  TIME = 'time', // 次数卡
  DURATION = 'duration', // 时长卡
}

export const getCardTypeTag = (type?: string) => {
  switch (type) {
    case CardType.TIME:
      return <Tag color="blue">次数卡</Tag>
    case CardType.DURATION:
      return <Tag color="green">时长卡</Tag>
    default:
      return '-'
  }
}

export const getColumns = (onDelete: (id: string) => void): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    // ellipsis: true,
    render: (text, record, index) => index + 1,
  },
  {
    title: '消费卡名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '有效期（天）',
    dataIndex: 'validateDay',
    valueType: 'digit',
    width: 108,
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'select',
    width: 108,
    align: 'center',
    request: async () => [
      {
        value: CardType.TIME,
        label: '次数卡',
      },
      {
        value: CardType.DURATION,
        label: '时长卡',
      },
    ],
  },
  {
    title: '次数',
    dataIndex: 'time',
    valueType: 'digit',
    width: 108,
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
