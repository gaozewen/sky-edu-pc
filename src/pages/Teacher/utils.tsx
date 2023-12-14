import { ProColumns } from '@ant-design/pro-components'

import { ITeacher } from '@/types'

interface IProps {
  onEdit: (id: string) => void
}

export const genColumns: ({ onEdit }: IProps) => ProColumns<ITeacher, 'text'>[] = ({
  onEdit,
}) => [
  {
    fixed: 'left',
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 88,
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '教师昵称',
    dataIndex: 'nickname',
    ellipsis: true,
  },
  {
    title: '教师账号',
    dataIndex: 'account',
    search: false,
  },
  {
    title: '教师手机号',
    dataIndex: 'tel',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 88,
    render: (_text, entity) => <a onClick={() => onEdit(entity.id)}>编辑</a>,
  },
]
