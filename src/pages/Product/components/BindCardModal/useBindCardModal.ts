import { App } from 'antd'
import { unionBy } from 'lodash-es'
import { useEffect, useState } from 'react'

import { SUCCESS } from '@/constants/code'
import { useGoTo } from '@/hooks/useGoTo'
import { useGetCardsService } from '@/service/card'
import { useCommitProductService, useGetProductService } from '@/service/product'
import { ICard } from '@/types'

import { IBindCardModalProps } from '.'

export const useBindCardModal = (props: IBindCardModalProps) => {
  const { setShowModal, id: productId } = props

  const {
    getProduct,
    loading: getProductLoading,
    data: product,
  } = useGetProductService()
  const { getCards, loading: getCardsLoading, data: cards } = useGetCardsService()
  const { onCommitProduct } = useCommitProductService()

  const [selectedCards, setSelectedCards] = useState<string[]>([])
  const [selectedCourseId, setSelectedCourseId] = useState<string>('')
  const [allCards, setAllCards] = useState<ICard[]>([])

  const { message } = App.useApp()
  const { goTo } = useGoTo()

  useEffect(() => {
    // 弹出绑定消费卡 Modal 时，获取商品接口数据
    getProduct({ variables: { id: productId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAllCards(oldAllCards =>
      unionBy(product?.cards || [], [...oldAllCards, ...(cards || [])], 'id')
    )
  }, [product?.cards, cards])

  useEffect(() => {
    setSelectedCards(product?.cards?.map(c => c.id) || [])
  }, [product?.cards])

  const onSelected = (courseId: string) => {
    if (courseId) {
      setSelectedCourseId(courseId)
      getCards({ variables: { courseId } })
    }
  }

  const onSave = async () => {
    // 如果 cards 不存在 && selectedCards 也不存在（即原来和现在都未绑定消费卡），直接点击保存，则不做任何操作，直接关闭弹窗
    if (
      (!cards || cards.length === 0) &&
      (!selectedCards || selectedCards.length === 0)
    ) {
      setShowModal(false)
      return
    }
    try {
      const { code, message: msg } = await onCommitProduct(productId, {
        cardIds: selectedCards,
      })
      if (code === SUCCESS) {
        setShowModal(false)
        message.success(msg)
        return
      }
      message.error(msg)
    } catch (error) {
      message.error('操作失败，服务器忙，请稍后再试')
      console.error('【onCommitProduct】Error：', error)
    }
  }

  return {
    setShowModal,
    selectedCards,
    setSelectedCards,
    getProductLoading,
    onSelected,
    getCardsLoading,
    allCards,
    onSave,
    selectedCourseId,
    goTo,
  }
}
