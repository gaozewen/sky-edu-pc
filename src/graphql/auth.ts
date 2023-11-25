import { gql } from '@apollo/client'

export const SEND_AUTH_SMS = gql`
  mutation sendAuthSMS($tel: String!) {
    sendAuthSMS(tel: $tel) {
      code
      message
    }
  }
`

export const UPDATE = gql`
  mutation update($id: String!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`

export const ADMIN_LOGIN = gql`
  mutation adminLogin($params: AdminLoginInput!) {
    adminLogin(params: $params) {
      code
      message
      data
    }
  }
`
