import { CreditCardOutlined } from '@ant-design/icons'
import { CheckCard } from '@ant-design/pro-components'
import { Modal, Result, Row, Space, Typography } from 'antd'

import { getCardTypeTag } from '@/pages/Course/components/Card/utils'

import CourseSearch from './components/CourseSearch'
import { useBindCardModal } from './useBindCardModal'

export interface IBindCardModalProps {
  setShowModal: (isShow: boolean) => void
  id: string
}

const BindCardModal = (props: IBindCardModalProps) => {
  const {
    setShowModal,
    contextHolder,
    selectedCards,
    setSelectedCards,
    getProductLoading,
    onSelected,
    getCardsLoading,
    newCards,
    onSave,
  } = useBindCardModal(props)

  return (
    <Modal
      width="88vw"
      title="绑定消费卡"
      open
      onCancel={() => setShowModal(false)}
      onOk={onSave}
    >
      {contextHolder}
      <Row justify="end">
        <CourseSearch onSelected={onSelected} />
      </Row>
      <Row justify="center" style={{ padding: 15 }}>
        {newCards.length === 0 && (
          <Result status="warning" title="请搜索课程并选择对应的消费卡" />
        )}

        <CheckCard.Group
          multiple
          loading={getProductLoading || getCardsLoading}
          value={selectedCards}
          onChange={value => {
            setSelectedCards(value as string[])
          }}
        >
          {newCards?.map(i => (
            <CheckCard
              key={i.id}
              value={i.id}
              size="small"
              avatar={<CreditCardOutlined />}
              title={
                <div>
                  <Typography.Text ellipsis style={{ width: 178 }}>
                    {i?.course?.name}
                  </Typography.Text>
                  <div>
                    <Space>
                      {i.name}
                      {getCardTypeTag(i?.type)}
                    </Space>
                  </div>
                </div>
              }
              description={
                <Space>
                  <span>次数：{i.time}</span>
                  <span>有效期：{i.validateDay}</span>
                </Space>
              }
            />
          ))}
        </CheckCard.Group>
      </Row>
    </Modal>
  )
}

export default BindCardModal
