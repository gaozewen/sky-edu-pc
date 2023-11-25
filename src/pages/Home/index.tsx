import { useUserContext } from '@/hooks/useUserHooks'

import styles from './index.module.scss'

/**
 *  首页
 */
const Home = () => {
  const { store } = useUserContext()
  console.log('gzw====>store', store)
  return <div className={styles.container}>{store.tel}</div>
}

export default Home
