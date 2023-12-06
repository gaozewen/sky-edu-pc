import { useLazyQuery, useMutation } from '@apollo/client'

import { COMMIT_CARD, DELETE_CARD, GET_CARDS } from '@/graphql/card'
import { ICard, IResult, TCardMutation, TCardQuery } from '@/types'

export const useGetCardsService = () => {
  const [getCards, { loading, data, refetch }] = useLazyQuery<TCardQuery>(GET_CARDS)

  return {
    getCards,
    loading,
    refetch,
    data: data?.getCards.data,
  }
}

/**
 * 提交消费卡信息（新建和编辑消费卡）
 */
export const useCommitCardService = (): {
  onCommitCard: (
    id: string,
    params: Partial<ICard>,
    courseId: string
  ) => Promise<IResult>
  loading: boolean
} => {
  const [commitCard, { loading }] = useMutation<TCardMutation>(COMMIT_CARD)

  const onCommitCard = async (id: string, params: Partial<ICard>, courseId: string) => {
    const res = await commitCard({
      variables: {
        id,
        params,
        courseId,
      },
    })
    const { code, message } = res.data?.commitCard || {}
    return { code, message }
  }

  return {
    onCommitCard,
    loading,
  }
}

/**
 * 删除消费卡
 */
export const useDeleteCardService = (): {
  onDeleteCard: (id: string) => Promise<IResult>
  loading: boolean
} => {
  const [deleteCard, { loading }] = useMutation<TCardMutation>(DELETE_CARD)

  const onDeleteCard = async (id: string) => {
    const res = await deleteCard({
      variables: {
        id,
      },
    })
    const { code, message } = res.data?.deleteCard || {}
    return { code, message }
  }

  return {
    onDeleteCard,
    loading,
  }
}
