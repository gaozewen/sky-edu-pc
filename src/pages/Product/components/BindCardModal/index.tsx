import { CreditCardOutlined } from '@ant-design/icons'
import { CheckCard } from '@ant-design/pro-components'
import { Button, Empty, Modal, Result, Row, Spin, Tag } from 'antd'

import { CardType } from '@/pages/Course/components/Card/utils'
import { PN } from '@/router'

import CourseSearch from './components/CourseSearch'
import styles from './index.module.scss'
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
    allCards,
    onSave,
    selectedCourseId,
    goTo,
  } = useBindCardModal(props)

  const isLoading = getProductLoading || getCardsLoading

  return (
    <Modal
      width="88vw"
      title="绑定消费卡"
      open
      onCancel={() => setShowModal(false)}
      onOk={onSave}
    >
      <Spin spinning={isLoading}>
        <div className={styles.modal}>
          <Row justify="end">
            <CourseSearch onSelected={onSelected} />
          </Row>
          <Row justify="center" style={{ padding: 15 }}>
            {!isLoading && allCards.length === 0 && !selectedCourseId && (
              <Result status="warning" title="请搜索课程并选择对应的消费卡" />
            )}

            {!isLoading && allCards.length === 0 && !!selectedCourseId && (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="该门店未关联消费卡，请搜索其他门店或去该门店进行关联"
              >
                <Button type="dashed" onClick={() => goTo({ pathname: PN.COURSE })}>
                  去关联
                </Button>
              </Empty>
            )}

            {!isLoading && allCards && allCards.length > 0 && (
              <CheckCard.Group
                multiple
                value={selectedCards}
                onChange={value => {
                  setSelectedCards(value as string[])
                }}
              >
                {allCards?.map(i => (
                  <CheckCard
                    key={i.id}
                    value={i.id}
                    size="small"
                    className={styles['check-card']}
                    title={
                      <div className={styles.title}>
                        <div className={styles.left}>
                          <CreditCardOutlined size={14} />
                          <div className={styles.name}>{i.name}</div>
                        </div>

                        {i.type === CardType.TIME ? (
                          <Tag color="blue">次数卡({i.time}次)</Tag>
                        ) : (
                          <Tag color="green">时长卡</Tag>
                        )}
                      </div>
                    }
                    description={
                      <div className={styles.description}>
                        <div className={styles['course-name']}>
                          <div className={styles.label}>课程名：</div>
                          <div className={styles.value}>{i?.course?.name}</div>
                        </div>
                        <div>有效期：{i.validateDay} 天</div>
                      </div>
                    }
                  />
                ))}
              </CheckCard.Group>
            )}
          </Row>
        </div>
      </Spin>
    </Modal>
  )
}

export default BindCardModal
