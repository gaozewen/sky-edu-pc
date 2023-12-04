import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query getCourses($pageInfo: PageInfoDTO!, $name: String) {
    getCourses(pageInfo: $pageInfo, name: $name) {
      code
      message
      data {
        id
        name
        limitNumber
        duration
        baseAbility
      }
      pageInfo {
        pageNum
        pageSize
        total
      }
    }
  }
`
