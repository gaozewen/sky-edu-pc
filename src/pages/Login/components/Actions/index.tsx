import { AlipayOutlined, TaobaoOutlined, WeiboOutlined } from '@ant-design/icons'
import { Divider, Space, theme } from 'antd'
import type { CSSProperties } from 'react'

import styles from './index.module.scss'

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
}
/**
 * LoginFormPage 的属性 actions
 */
const Actions = () => {
  const { token } = theme.useToken()

  return (
    <div className={styles.actionsContainer}>
      <Divider plain>
        <span
          style={{
            color: token.colorTextPlaceholder,
            fontWeight: 'normal',
            fontSize: 14,
          }}
        >
          其他登录方式
        </span>
      </Divider>
      <Space align="center" size={24}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid ' + token.colorPrimaryBorder,
            borderRadius: '50%',
          }}
        >
          <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid ' + token.colorPrimaryBorder,
            borderRadius: '50%',
          }}
        >
          <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
            border: '1px solid ' + token.colorPrimaryBorder,
            borderRadius: '50%',
          }}
        >
          <WeiboOutlined style={{ ...iconStyles, color: '#1890ff' }} />
        </div>
      </Space>
    </div>
  )
}

export default Actions
