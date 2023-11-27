import { removeToken } from '@/utils/userToken'

import { useUserContext } from './useUserHooks'

export const useLogout = () => {
  const { store: userStore } = useUserContext()

  const onLogout = () => {
    removeToken()
    userStore.refetchHandler()
  }

  return { onLogout }
}
