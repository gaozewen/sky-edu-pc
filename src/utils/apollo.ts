import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { message } from 'antd'

import { PN } from '@/router'

import { getCurrentStore } from './currentStore'
// import { ErrorLink } from '@apollo/client/link/error'
import { getToken } from './userToken'

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL })

const authLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  const storeId = getCurrentStore()?.value || ''
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      // 当前选中的门店 ID
      storeId,
    },
  }))

  return forward(operation)
})

// token 失效跳转交由 useLoadUserData 这个 hooks 来处理
const errorLink = new ErrorLink(({ graphQLErrors = [], networkError }) => {
  if (location.pathname === PN.LOGIN) return
  if (graphQLErrors[0]) {
    message.error('请求参数或返回的数据格式不正确')
    graphQLErrors?.forEach(gqlErr => {
      // Unauthorized 未授权的访问(JWT Token 失效了或没有传)
      if (gqlErr.message === 'Unauthorized') {
        message.error('登录失效，请重新登录')
      }
    })
  }
  if (networkError) {
    message.error(networkError.message)
  }
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: {
    watchQuery: {
      // https://www.apollographql.com/docs/react/data/queries#supported-fetch-policies
      fetchPolicy: 'no-cache',
    },
  },
  // httpLink 必须放在末尾，否则浏览器控制台报错
  link: from([errorLink, authLink, httpLink]),
})
