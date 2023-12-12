import { useLazyQuery, useMutation } from '@apollo/client'

import { AUTO_CREATE_SCHEDULE, GET_TODAY_SCHEDULES } from '@/graphql/dashboard'
import { TScheduleMutation, TScheduleQuery } from '@/types'

export const useAutoCreateScheduleService = () => {
  const [autoCreate, { loading }] = useMutation<TScheduleMutation>(AUTO_CREATE_SCHEDULE)

  const onAutoCreateSchedule = async (startDay: string, endDay: string) => {
    const res = await autoCreate({
      variables: {
        startDay,
        endDay,
      },
    })
    const { code, message } = res.data?.autoCreateSchedule || {}
    return { code, message }
  }

  return {
    onAutoCreateSchedule,
    loading,
  }
}

export const useGetTodaySchedulesService = () => {
  const [get, { loading, data }] = useLazyQuery<TScheduleQuery>(GET_TODAY_SCHEDULES)

  const getTodaySchedules = (today: string) => {
    get({ variables: { today } })
  }

  return {
    loading,
    data: data?.getTodaySchedules?.data,
    getTodaySchedules,
  }
}
