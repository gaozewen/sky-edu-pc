import { useState, useEffect } from 'react'

import styles from './index.module.scss'

/**
 *  登录页
 */
const Login = () => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return <div className={styles.container}>sss</div>
}

export default Login;
