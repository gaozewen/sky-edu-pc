import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts($pageInfo: PageInfoDTO!, $name: String) {
    getProducts(pageInfo: $pageInfo, name: $name) {
      code
      message
      data {
        id
        name
        desc
        category
        status
        stock
        limitBuyNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
      }
      pageInfo {
        pageNum
        pageSize
        total
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    getProduct(id: $id) {
      code
      message
      data {
        id
        name
        desc
        category
        status
        stock
        limitBuyNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
        cards {
          id
          name
          type
          time
          validateDay
          course {
            id
            name
          }
        }
      }
    }
  }
`

export const COMMIT_PRODUCT = gql`
  mutation commitProduct($params: PartialProductDTO!, $id: String) {
    commitProduct(params: $params, id: $id) {
      code
      message
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      code
      message
    }
  }
`

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    getProductCategories {
      code
      message
      data {
        key
        title
      }
    }
  }
`
