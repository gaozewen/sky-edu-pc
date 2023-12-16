import { ApolloProvider } from '@apollo/client'
import { RouterProvider } from 'react-router-dom'

import { useApollo } from './hooks/useApollo'
import router from './router'

function App() {
  const { apolloClient } = useApollo()
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router}></RouterProvider>
    </ApolloProvider>
  )
}

export default App
