import { useEffect, useState } from 'react'

import styles from './index.module.scss'

/**
 *  首页
 */
const Home = () => {
  const [state, setState] = useState()
  useEffect(() => {
    console.log(state, setState)
  }, [])
  return <div className={styles.container}>sss</div>
}

export default Home
