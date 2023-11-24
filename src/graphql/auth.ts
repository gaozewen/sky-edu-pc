import { gql } from '@apollo/client'

export const SEND_AUTH_SMS = gql`
  mutation sendAuthSMS($tel: String!) {
    sendAuthSMS(tel: $tel) {
      code
      message
      data
    }
  }
`

export const UPDATE = gql`
  mutation update($id: String!, $params: UserInput!) {
    update(id: $id, params: $params)
  }
`
