import { PageContainer } from '@ant-design/pro-components'
import { Button, Calendar, Card, Col, DatePicker, message, Row } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'

import { DAY_FORMAT } from '@/constants'
import { SUCCESS } from '@/constants/code'
import { useUserContext } from '@/hooks/useUserHooks'
import { useAutoCreateScheduleService } from '@/service/dashborad'
import { useGetStoreService } from '@/service/store'

import Schedule, { IRefProps } from './components/Schedule'
import styles from './index.module.scss'

const { RangePicker } = DatePicker

/**
 *  首页
 */
const Home = () => {
  console.log('gzw====> Home =====> in', new Date().getTime())
  const { store } = useUserContext()
  const { data, getStore } = useGetStoreService()
  const [range, setRange] = useState<[string, string]>(['', ''])
  const [messageApi, contextHolder] = message.useMessage()
  const { onAutoCreateSchedule, loading } = useAutoCreateScheduleService()
  const [today, setToday] = useState<string>(dayjs().format(DAY_FORMAT))
  const scheduleRef = useRef<IRefProps>(null)

  useEffect(() => {
    console.log('gzw====> Home ===> useEffect =====> in', new Date().getTime())
    if (store.currentStoreId) {
      getStore({
        variables: { id: store.currentStoreId },
      })
    }
  }, [])

  if (!data) return null

  const onRangeChange = (_days: null | (Dayjs | null)[], dayStrs: string[]) => {
    if (dayStrs && dayStrs.length === 2) {
      setRange([dayStrs[0], dayStrs[1]])
    }
  }

  const onStartCurseScheduling = async () => {
    if (!range[0]) {
      messageApi.error('请先选择时间区间')
      return
    }

    try {
      const { code, message } = await onAutoCreateSchedule(...range)
      if (code === SUCCESS) {
        messageApi.success(message)
        scheduleRef.current?.refetch()
        return
      }
      messageApi.success(message)
    } catch (error) {
      messageApi.success('排课失败，服务器忙，请稍后再试')
      console.error('【onAutoCreateSchedule】Error:', error)
    }
  }

  const onCalendarChange = (d: Dayjs) => {
    setToday(d.format(DAY_FORMAT))
  }

  return (
    <PageContainer
      header={{
        title: data.name,
      }}
      content={data.address}
    >
      {contextHolder}

      <Row gutter={18}>
        <Col flex="auto">
          <Card
            title={`${today} 的课程`}
            className={styles.container}
            extra={
              <span>
                <RangePicker onChange={onRangeChange} />
                <Button loading={loading} type="link" onClick={onStartCurseScheduling}>
                  开始排课
                </Button>
              </span>
            }
          >
            <Schedule ref={scheduleRef} today={today} />
          </Card>
        </Col>
        <Col flex="300px">
          <Calendar fullscreen={false} onChange={onCalendarChange} />
        </Col>
      </Row>
    </PageContainer>
  )
}

export default Home
