import { WechatOutlined } from '@ant-design/icons'
import { Divider, Space, theme } from 'antd'

import styles from './index.module.scss'

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
          className={styles.iconWrapper}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: 40,
            width: 40,
          }}
        >
          <WechatOutlined
            style={{
              fontSize: '28px',
              verticalAlign: 'middle',
              cursor: 'pointer',
            }}
          />
        </div>
      </Space>
    </div>
  )
}

export default Actions
