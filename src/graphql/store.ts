import { gql } from '@apollo/client'

export const GET_STORES = gql`
  query getStores($pageInfo: PageInfoDTO!) {
    getStores(pageInfo: $pageInfo) {
      code
      message
      pageInfo {
        total
        pageNum
        pageSize
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`

export const GET_STORE = gql`
  query getStore($id: String!) {
    getStore(id: $id) {
      code
      message
      data
    }
  }
`