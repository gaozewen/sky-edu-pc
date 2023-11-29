import { gql } from '@apollo/client'

export const SEND_AUTH_SMS = gql`
  mutation sendAuthSMS($tel: String!) {
    sendAuthSMS(tel: $tel) {
      code
      message
    }
  }
`

export const ADMIN_LOGIN = gql`
  mutation adminLogin($params: AdminLoginDTO!) {
    adminLogin(params: $params) {
      code
      message
      data
    }
  }
`
