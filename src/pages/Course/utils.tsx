import { ProColumns } from '@ant-design/pro-components'

import { ICourse } from '@/types'

interface IProps {
  onEdit: (id: string) => void
  onOrderTime: (id: string) => void
  onCard: (id: string) => void
}

export const genColumns: ({
  onEdit,
  onOrderTime,
  onCard,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({ onEdit, onOrderTime, onCard }) => [
  {
    title: '课程标题',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '限制人数',
    dataIndex: 'limitNumber',
    width: 75,
    search: false,
  },
  {
    title: '持续时长',
    dataIndex: 'duration',
    width: 75,
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 218,
    render: (_text, entity) => [
      <a key="edit" onClick={() => onEdit(entity.id)}>
        编辑课程
      </a>,
      <a key="orderTime" onClick={() => onOrderTime(entity.id)}>
        可约时间
      </a>,
      <a key="card" onClick={() => onCard(entity.id)}>
        关联消费卡
      </a>,
    ],
  },
]
