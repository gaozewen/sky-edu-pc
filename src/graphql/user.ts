import { gql } from '@apollo/client'

export const GET_USER_BY_JWT = gql`
  query getUserByJWT {
    getUserByJWT {
      id
      account
      tel
    }
  }
`
