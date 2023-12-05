import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'

// import { ErrorLink } from '@apollo/client/link/error'
import { getToken } from './userToken'

const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_URL })

const authLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = getToken()
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }))

  return forward(operation)
})

// token 失效跳转交由 useLoadUserData 这个 hooks 来处理
// const logoutLink = new ErrorLink(({ graphQLErrors = [] }) => {
//   // Unauthorized 未授权的访问(JWT Token 失效了或没有传)
//   if ((graphQLErrors[0] || {}).message === 'Unauthorized') {
//     // token 失效，自动跳转登录页
//     window.location.href = '/login'
//   }
// })

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
  link: from([
    // logoutLink,
    authLink,
    httpLink,
  ]),
})
