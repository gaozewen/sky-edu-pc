import { WechatOutlined } from '@ant-design/icons'
import { Divider, Space, theme } from 'antd'
import type { CSSProperties } from 'react'

import styles from './index.module.scss'

const iconStyles: CSSProperties = {
  fontSize: '28px',
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
        <WechatOutlined style={{ ...iconStyles, color: token.colorPrimary }} />
      </Space>
    </div>
  )
}

export default Actions
