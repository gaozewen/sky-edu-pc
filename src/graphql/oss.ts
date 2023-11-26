import { gql } from '@apollo/client'

export const GET_UPLOAD_TOKEN = gql`
  query getUploadToken {
    getUploadToken {
      uploadToken
    }
  }
`
