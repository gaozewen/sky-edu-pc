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

export const GET_COURSE = gql`
  query getCourse($id: String!) {
    getCourse(id: $id) {
      code
      message
      data {
        id
        name
        desc
        group
        baseAbility
        limitNumber
        duration
        reserveInfo
        refundInfo
        otherInfo
      }
    }
  }
`

export const COMMIT_COURSE = gql`
  mutation commitCourse($params: CourseDTO!, $id: String) {
    commitCourse(params: $params, id: $id) {
      code
      message
    }
  }
`
