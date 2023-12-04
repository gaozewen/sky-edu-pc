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

export const GET_STORE_SELECT_STORES = gql`
  query getStores($pageInfo: PageInfoDTO!, $name: String) {
    getStores(pageInfo: $pageInfo, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`

export const GET_STORE = gql`
  query getStore($id: String!) {
    getStore(id: $id) {
      code
      message
      data {
        id
        logo
        name
        tags
        tel
        longitude
        latitude
        address
        description
        businessLicense
        identityCardFrontImg
        identityCardBackImg
        frontImgs {
          url
        }
        roomImgs {
          url
        }
        otherImgs {
          url
        }
      }
    }
  }
`

export const COMMIT_STORE = gql`
  mutation commitStore($params: StoreDTO!, $id: String) {
    commitStore(params: $params, id: $id) {
      code
      message
    }
  }
`

export const DELETE_STORE = gql`
  mutation deleteStore($id: String!) {
    deleteStore(id: $id) {
      code
      message
    }
  }
`
