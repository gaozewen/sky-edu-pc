import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import {
  COMMIT_STORE,
  DELETE_STORE,
  GET_STORE,
  GET_STORE_SELECT_STORES,
  GET_STORES,
} from '@/graphql/store'
import { IResult, IStore, TStoreMutation, TStoreQuery } from '@/types'

/**
 * 获取门店列表
 * @returns {TStoreQuery}
 */
export const useGetStoresService = () => {
  const { loading, data, refetch } = useQuery<TStoreQuery>(GET_STORES, {
    variables: {
      pageInfo: {
        pageNum: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
  })

  return {
    loading,
    pageInfo: data?.getStores.pageInfo,
    data: data?.getStores.data,
    refetch,
  }
}

/**
 * 获取门店选择器门店列表
 * @returns {TStoreQuery}
 */
export const useGetStoreSelectStoresService = () => {
  const { loading, data, refetch } = useQuery<TStoreQuery>(GET_STORE_SELECT_STORES, {
    variables: {
      pageInfo: {
        pageNum: 1,
        pageSize: DEFAULT_PAGE_SIZE,
      },
    },
  })

  return {
    loading,
    data: data?.getStores.data,
    refetch,
  }
}

/**
 * 获取门店信息
 * @returns {TStoreQuery}
 */
export const useGetStoreService = () => {
  const [getStore, { loading, data }] = useLazyQuery<TStoreQuery>(GET_STORE)

  return {
    getStore,
    loading,
    data: data?.getStore.data as IStore,
  }
}

/**
 * 提交门店信息（新建和编辑门店）
 */
export const useCommitStoreService = (): {
  onCommitStore: (id: string, params: Partial<IStore>) => Promise<IResult>
  loading: boolean
} => {
  const [commitStore, { loading }] = useMutation<TStoreMutation>(COMMIT_STORE)

  const onCommitStore = async (id: string, params: Partial<IStore>) => {
    const res = await commitStore({
      variables: {
        id,
        params,
      },
    })
    const { code, message } = res.data?.commitStore || {}
    return { code, message }
  }

  return {
    onCommitStore,
    loading,
  }
}

/**
 * 删除门店
 */
export const useDeleteStoreService = (): {
  onDeleteStore: (id: string) => Promise<IResult>
  loading: boolean
} => {
  const [deleteStore, { loading }] = useMutation<TStoreMutation>(DELETE_STORE)

  const onDeleteStore = async (id: string) => {
    const res = await deleteStore({
      variables: {
        id,
      },
    })
    const { code, message } = res.data?.deleteStore || {}
    return { code, message }
  }

  return {
    onDeleteStore,
    loading,
  }
}
