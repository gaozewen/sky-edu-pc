import { useLazyQuery, useMutation } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import {
  COMMIT_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
} from '@/graphql/product'
import { IProduct, IResult, TProductMutation, TProductQuery } from '@/types'

export const useGetProductsService = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const [getProducts] = useLazyQuery<TProductQuery>(GET_PRODUCTS, {
    variables: {
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  })

  const proTableRequest = async (params: {
    name?: string
    pageSize?: number
    current?: number
  }) => {
    const { data: res, error } = await getProducts({
      variables: {
        name: params.name,
        pageInfo: {
          pageNum: params.current || 1,
          pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
        },
      },
    })

    if (error) {
      return {
        success: false,
      }
    }

    return {
      total: res?.getProducts.pageInfo.total,
      data: res?.getProducts.data,
      success: true,
    }
  }

  return {
    proTableRequest,
  }
}

/**
 * 获取商品信息
 * @returns {TProductQuery}
 */
export const useGetProductService = () => {
  const [getProduct, { loading, data, refetch }] =
    useLazyQuery<TProductQuery>(GET_PRODUCT)

  return {
    getProduct,
    loading,
    data: data?.getProduct.data as IProduct,
    refetch,
  }
}

/**
 * 提交商品信息（新建和编辑商品）
 */
export const useCommitProductService = (): {
  onCommitProduct: (id: string, params: Partial<IProduct>) => Promise<IResult>
  loading: boolean
} => {
  const [commitProduct, { loading }] = useMutation<TProductMutation>(COMMIT_PRODUCT)

  const onCommitProduct = async (id: string, params: Partial<IProduct>) => {
    const res = await commitProduct({
      variables: {
        id,
        params,
      },
    })
    const { code, message } = res.data?.commitProduct || {}
    return { code, message }
  }

  return {
    onCommitProduct,
    loading,
  }
}

/**
 * 删除商品
 */
export const useDeleteProductService = (): {
  onDeleteProduct: (id: string) => Promise<IResult>
  loading: boolean
} => {
  const [deleteProduct, { loading }] = useMutation<TProductMutation>(DELETE_PRODUCT)

  const onDeleteProduct = async (id: string) => {
    const res = await deleteProduct({
      variables: {
        id,
      },
    })
    const { code, message } = res.data?.deleteProduct || {}
    return { code, message }
  }

  return {
    onDeleteProduct,
    loading,
  }
}
