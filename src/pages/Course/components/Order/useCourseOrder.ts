import { message } from 'antd'
import { useEffect, useMemo, useState } from 'react'

import { SUCCESS } from '@/constants/code'
import { useCommitCourseService, useGetCourseService } from '@/service/course'
import { IOrderTime, IWeekOrderTime } from '@/types'

import { ICourseOrderProps } from '.'
import { DAYS, IDay, isWorkDay } from './utils'

export const useCourseOrder = (props: ICourseOrderProps) => {
  const { showOrder, setShowOrder, id } = props
  const [messageApi, contextHolder] = message.useMessage()
  const { getCourse, loading, data, refetch } = useGetCourseService()
  const { onCommitCourse, loading: commitCourseLoading } = useCommitCourseService()
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0])

  useEffect(() => {
    // 预约时间设置抽屉打开状态，获取课程接口数据
    if (showOrder) {
      getCourse({ variables: { id } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOrder])

  const orderTimes = useMemo(
    () =>
      (data?.weeklyOrderTimes || []).find(item => item.week === currentDay.key)
        ?.orderTimes || [],
    [data, currentDay.key]
  )

  const onChangeTab = (activeKey: string) => {
    const current = DAYS.find(item => item.key === activeKey) as IDay
    setCurrentDay(current)
  }

  const onSaveWeeklyOrderTime = async (newWeeklyOrderTimes: IWeekOrderTime[]) => {
    try {
      const { code, message } = await onCommitCourse(id, {
        weeklyOrderTimes: newWeeklyOrderTimes,
      })
      if (code === SUCCESS) {
        refetch()
        messageApi.success(message)
        return
      }
      messageApi.error(message)
    } catch (error) {
      messageApi.error('操作失败，服务器忙，请稍后再试')
      console.error('【onCommitCourse】Error：', error)
    }
  }

  const onSaveCurrentDay = (ots: IOrderTime[]) => {
    const newWeeklyOrderTimes = [...(data?.weeklyOrderTimes || [])]
    const index = newWeeklyOrderTimes.findIndex(item => item.week === currentDay.key)
    if (index > -1) {
      newWeeklyOrderTimes[index] = {
        week: currentDay.key,
        orderTimes: ots,
      }
    } else {
      newWeeklyOrderTimes.push({
        week: currentDay.key,
        orderTimes: ots,
      })
    }

    onSaveWeeklyOrderTime(newWeeklyOrderTimes)
  }

  const onDelete = (id: string) => {
    const newData = orderTimes.filter(item => item.id !== id)
    onSaveCurrentDay(newData)
  }

  const onSyncAllWorkDay = () => {
    const newWeeklyOrderTimes: IWeekOrderTime[] = []
    DAYS.forEach(item => {
      if (isWorkDay(item.key)) {
        newWeeklyOrderTimes.push({
          week: item.key,
          orderTimes,
        })
      }
    })
    onSaveWeeklyOrderTime(newWeeklyOrderTimes)
  }

  const onSyncAllWeek = () => {
    const newWeeklyOrderTimes: IWeekOrderTime[] = []
    DAYS.forEach(item => {
      newWeeklyOrderTimes.push({
        week: item.key,
        orderTimes,
      })
    })
    onSaveWeeklyOrderTime(newWeeklyOrderTimes)
  }

  return {
    setShowOrder,
    showOrder,
    contextHolder,
    onChangeTab,
    currentDay,
    loading,
    commitCourseLoading,
    orderTimes,
    onDelete,
    onSaveCurrentDay,
    onSyncAllWorkDay,
    onSyncAllWeek,
  }
}
