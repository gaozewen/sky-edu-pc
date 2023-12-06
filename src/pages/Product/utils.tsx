import { ProColumns } from '@ant-design/pro-components'
import { Image, Popconfirm } from 'antd'

import { IProduct } from '@/types'

interface IProps {
  onEdit: (id: string) => void
  onModal: (id: string) => void
  onDelete: (id: string) => void
}

export const genColumns: ({
  onEdit,
  onModal,
  onDelete,
}: IProps) => ProColumns<IProduct, 'text'>[] = ({ onEdit, onModal, onDelete }) => [
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
    title: '商品封面',
    dataIndex: 'coverUrl',
    align: 'center',
    width: 100,
    search: false,
    render: (_, record) => <Image src={record.coverUrl} />,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [{ required: true, message: '商品名称必填' }],
    },
  },
  {
    title: '原价',
    dataIndex: 'originalPrice',
    width: 88,
    align: 'center',
    search: false,
  },
  {
    title: '优惠价',
    dataIndex: 'preferentialPrice',
    width: 88,
    align: 'center',
    search: false,
  },
  {
    title: '库存总数',
    dataIndex: 'stock',
    width: 44,
    align: 'center',
    search: false,
  },
  {
    title: '当前库存',
    dataIndex: 'curStock',
    width: 44,
    align: 'center',
    search: false,
  },
  {
    title: '已售数量',
    dataIndex: 'sellNumber',
    width: 44,
    align: 'center',
    search: false,
  },
  {
    title: '每人限购数量',
    dataIndex: 'limitBuyNumber',
    width: 44,
    align: 'center',
    search: false,
  },
  {
    fixed: 'right',
    title: '操作',
    valueType: 'option',
    align: 'center',
    width: 188,
    render: (text, record) => [
      <a key="edit" onClick={() => onEdit(record.id)}>
        编辑商品
      </a>,
      <a key="card" onClick={() => onModal(record.id)}>
        绑定消费卡
      </a>,
      <Popconfirm
        key="delete"
        title="提醒"
        description="确认要删除吗？"
        onConfirm={() => onDelete(record.id)}
      >
        <a style={{ color: 'red' }}>删除</a>
      </Popconfirm>,
    ],
  },
]
