import {
  ConfigProvider,
  // theme
} from 'antd'

import Login from './pages/Login'

function App() {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        // algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00C6A8',
        },
      }}
    >
      <Login />
    </ConfigProvider>
  )
}

export default App
