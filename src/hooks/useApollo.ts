import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'
import { App } from 'antd'

import { getLocalStore } from '../utils/currentStore'
import { getToken } from '../utils/userToken'

export const useApollo = () => {
  const { message } = App.useApp()
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL })

  const authLink = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = getToken()
    const storeId = getLocalStore().id || ''
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
    // 未获得 token 前，都不弹报错
    if (!getToken()) return
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

  const apolloClient = new ApolloClient({
    // 只有在开发模式下才会打开 Apollo 调试工具
    connectToDevTools: import.meta.env.DEV,
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
  return { apolloClient }
}
