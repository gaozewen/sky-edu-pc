import { useLazyQuery, useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { GET_STORE, GET_STORES } from '@/graphql/store'
import { TStoreQuery, TStoresQuery } from '@/types'

/**
 * 获取门店列表
 * @returns {TStoresQuery}
 */
export const useGetStoresService = () => {
  const { loading, data, refetch } = useQuery<TStoresQuery>(GET_STORES, {
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
 * 获取门店信息
 * @returns {TStoreQuery}
 */
export const useGetStoreService = () => {
  const [getStore, { loading, data }] = useLazyQuery<TStoreQuery>(GET_STORE)

  return {
    getStore,
    loading,
    data: data?.getStore.data,
  }
}
