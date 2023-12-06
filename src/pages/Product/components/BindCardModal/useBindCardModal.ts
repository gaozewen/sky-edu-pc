import { message } from 'antd'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'

import { SUCCESS } from '@/constants/code'
import { useGetCardsService } from '@/service/card'
import { useCommitProductService, useGetProductService } from '@/service/product'

import { IBindCardModalProps } from '.'

export const useBindCardModal = (props: IBindCardModalProps) => {
  const { setShowModal, id: productId } = props
  const [messageApi, contextHolder] = message.useMessage()
  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const {
    getProduct,
    loading: getProductLoading,
    data: product,
  } = useGetProductService()
  const { getCards, loading: getCardsLoading, data: cards } = useGetCardsService()
  const { onCommitProduct } = useCommitProductService()

  useEffect(() => {
    // 弹出绑定消费卡 Modal 时，获取商品接口数据
    getProduct({ variables: { id: productId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const newCards = useMemo(
    () => _.unionBy(product?.cards || [], cards || [], 'id'),
    [product?.cards, cards]
  )

  useEffect(() => {
    setSelectedCards(product?.cards?.map(c => c.id) || [])
  }, [product?.cards])

  const onSelected = (courseId: string) => {
    getCards({ variables: { courseId } })
  }

  const onSave = async () => {
    try {
      const { code, message } = await onCommitProduct(productId, {
        cardIds: selectedCards,
      })
      if (code === SUCCESS) {
        setShowModal(false)
        messageApi.success(message)
        return
      }
      messageApi.error(message)
    } catch (error) {
      messageApi.error('操作失败，服务器忙，请稍后再试')
      console.error('【onCommitProduct】Error：', error)
    }
  }

  return {
    setShowModal,
    contextHolder,
    selectedCards,
    setSelectedCards,
    getProductLoading,
    onSelected,
    getCardsLoading,
    newCards,
    onSave,
  }
}
