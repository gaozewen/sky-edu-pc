import { ProColumns } from '@ant-design/pro-components'
import { Image, Popconfirm, Space } from 'antd'

import { IProduct } from '@/types'

interface IProps {
  onStatusChange: (id: string, status: ProductStatus) => void
  onEdit: (id: string) => void
  onModal: (id: string) => void
  onDelete: (id: string) => void
}

export enum ProductStatus {
  LIST = 'list', // 上架
  UN_LIST = 'un_list', // 下架
}

export const genColumns: (props: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onStatusChange,
  onEdit,
  onModal,
  onDelete,
}) => [
  {
    fixed: 'left',
    title: 'ID',
    dataIndex: 'id',
    align: 'center',
    width: 38,
    ellipsis: true,
    copyable: true,
    search: false,
  },
  {
    title: '商品封面',
    dataIndex: 'coverUrl',
    align: 'center',
    width: 58,
    search: false,
    render: (_, record) => <Image src={record.coverUrl} />,
  },
  {
    title: '商品名称',
    dataIndex: 'name',
    width: 128,
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
    width: 98,
    render: (_text, record) => (
      <div>
        <div>
          <Space>
            {record.status === ProductStatus.UN_LIST ? (
              <a
                key="list"
                style={{ color: 'green' }}
                onClick={() => onStatusChange(record.id, ProductStatus.LIST)}
              >
                上架
              </a>
            ) : (
              <Popconfirm
                key="unList"
                title="提醒"
                description="确认要下架吗？"
                onConfirm={() => onStatusChange(record.id, ProductStatus.UN_LIST)}
              >
                <a style={{ color: 'red' }}>下架</a>
              </Popconfirm>
            )}

            <Popconfirm
              key="delete"
              title="提醒"
              description="确认要删除吗？"
              onConfirm={() => onDelete(record.id)}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        </div>
        <div>
          <Space>
            <a key="edit" onClick={() => onEdit(record.id)}>
              编辑商品
            </a>
            <a key="card" onClick={() => onModal(record.id)}>
              绑定消费卡
            </a>
          </Space>
        </div>
      </div>
    ),
  },
]
