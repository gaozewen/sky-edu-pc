import { gql } from '@apollo/client'

export const GET_TEACHERS = gql`
  query getTeachers($pageInfo: PageInfoDTO!, $name: String) {
    getTeachers(pageInfo: $pageInfo, name: $name) {
      code
      message
      data {
        id
        account
        tel
        avatar
        nickname
      }
      pageInfo {
        pageNum
        pageSize
        total
      }
    }
  }
`

export const GET_TEACHER = gql`
  query getTeacher($id: String!) {
    getTeacher(id: $id) {
      code
      message
      data {
        id
        account
        tel
        avatar
        nickname
      }
    }
  }
`

export const COMMIT_TEACHER = gql`
  mutation commitTeacher($params: TeacherDTO!, $id: String) {
    commitTeacher(params: $params, id: $id) {
      code
      message
    }
  }
`
