import { gql } from '@apollo/client'

export const AUTO_CREATE_SCHEDULE = gql`
  mutation autoCreateSchedule($startDay: String!, $endDay: String!) {
    autoCreateSchedule(startDay: $startDay, endDay: $endDay) {
      code
      message
    }
  }
`

export const GET_TODAY_SCHEDULES = gql`
  query getTodaySchedules($today: String!) {
    getTodaySchedules(today: $today) {
      code
      message
      data {
        id
        startTime
        endTime
        limitNumber
        scheduleRecords {
          id
          status
          student {
            id
            nickname
            avatar
          }
        }
        course {
          id
          name
          coverUrl
          teachers {
            id
            nickname
            avatar
          }
        }
      }
    }
  }
`
