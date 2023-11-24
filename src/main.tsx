import './index.css'

import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { apolloClient } from './utils/apollo.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
)
