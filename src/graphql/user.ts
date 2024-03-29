import { gql } from '@apollo/client'

export const GET_USER_BY_JWT = gql`
  query getUserByJWT {
    getUserByJWT {
      id
      tel
      nickname
      desc
      avatar
    }
  }
`
export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfile($id: String!, $params: ProfileDTO!) {
    updateUserProfile(id: $id, params: $params) {
      code
      message
    }
  }
`

export const RESET_PWD = gql`
  mutation resetPwd($params: ResetPwdDTO!) {
    resetPwd(params: $params) {
      code
      message
    }
  }
`
