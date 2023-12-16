import './index.css'

import { App as AntdApp } from 'antd'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdApp>
    <App />
  </AntdApp>
)
