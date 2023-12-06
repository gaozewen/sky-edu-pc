import { gql } from '@apollo/client'

export const GET_CARDS = gql`
  query getCards($courseId: String!, $name: String) {
    getCards(courseId: $courseId, name: $name) {
      code
      message
      data {
        id
        name
        type
        time
        validateDay
      }
    }
  }
`

export const GET_CARD = gql`
  query getCard($id: String!) {
    getCard(id: $id) {
      code
      message
      data {
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
`

export const COMMIT_CARD = gql`
  mutation commitCard($params: CardDTO!, $courseId: String!, $id: String) {
    commitCard(params: $params, courseId: $courseId, id: $id) {
      code
      message
    }
  }
`

export const DELETE_CARD = gql`
  mutation deleteCard($id: String!) {
    deleteCard(id: $id) {
      code
      message
    }
  }
`
