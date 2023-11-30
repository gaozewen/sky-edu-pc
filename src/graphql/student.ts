import { gql } from '@apollo/client'

export const GET_STUDENTS = gql`
  query getStudents($pageInfo: PageInfoDTO!) {
    getStudents(pageInfo: $pageInfo) {
      code
      message
      data {
        id
        avatar
        nickname
        account
        tel
        createdAt
      }
      pageInfo {
        pageNum
        pageSize
        total
      }
    }
  }
`
