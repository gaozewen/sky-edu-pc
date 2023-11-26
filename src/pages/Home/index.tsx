import { useUserContext } from '@/hooks/useUserHooks'

import styles from './index.module.scss'

/**
 *  首页
 */
const Home = () => {
  const { store } = useUserContext()
  return <div className={styles.container}>{store.tel}</div>
}

export default Home
