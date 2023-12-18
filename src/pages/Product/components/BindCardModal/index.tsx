import { CreditCardOutlined } from '@ant-design/icons'
import { CheckCard } from '@ant-design/pro-components'
import { Button, Empty, Modal, Result, Row, Space, Typography } from 'antd'

import { getCardTypeTag } from '@/pages/Course/components/Card/utils'
import { PN } from '@/router'

import CourseSearch from './components/CourseSearch'
import { useBindCardModal } from './useBindCardModal'

export interface IBindCardModalProps {
  setShowModal: (isShow: boolean) => void
  id: string
}

const BindCardModal = (props: IBindCardModalProps) => {
  const {
    setShowModal,
    selectedCards,
    setSelectedCards,
    getProductLoading,
    onSelected,
    getCardsLoading,
    newCards,
    onSave,
    selectedCourseId,
    goTo,
  } = useBindCardModal(props)

  return (
    <Modal
      width="88vw"
      title="绑定消费卡"
      open
      onCancel={() => setShowModal(false)}
      onOk={onSave}
    >
      <Row justify="end">
        <CourseSearch onSelected={onSelected} />
      </Row>
      <Row justify="center" style={{ padding: 15 }}>
        {newCards.length === 0 && !selectedCourseId && (
          <Result status="warning" title="请搜索课程并选择对应的消费卡" />
        )}

        {newCards.length === 0 && !!selectedCourseId && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="该门店未关联消费卡，请搜索其他门店或去该门店进行关联"
          >
            <Button type="dashed" onClick={() => goTo({ pathname: PN.COURSE })}>
              去关联
            </Button>
          </Empty>
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
