import { App } from 'antd'
import { useEffect } from 'react'

import { SUCCESS } from '@/constants/code'
import {
  useCommitCardService,
  useDeleteCardService,
  useGetCardsService,
} from '@/service/card'
import { ICard } from '@/types'

import { ICourseCardProps } from '.'

export const useCourseCard = (props: ICourseCardProps) => {
  const { setShowCard, showCard, id: courseId } = props
  const { message } = App.useApp()
  const { getCards, loading, data, refetch } = useGetCardsService()
  const { onCommitCard, loading: commitCardLoading } = useCommitCardService()
  const { onDeleteCard, loading: deleteLoading } = useDeleteCardService()

  useEffect(() => {
    // 消费卡抽屉打开状态，获取消费卡接口数据
    if (showCard) {
      getCards({ variables: { courseId } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCard])

  const onSave = async (c: ICard) => {
    try {
      const { code, message: msg } = await onCommitCard(
        c.id === 'new' ? '' : c.id,
        {
          name: c.name,
          type: c.type,
          time: c.time,
          validateDay: c.validateDay,
        },
        courseId
      )
      if (code === SUCCESS) {
        refetch()
        message.success(msg)
        return
      }
      message.error(msg)
    } catch (error) {
      message.error('操作失败，服务器忙，请稍后再试')
      console.error('【onCommitCard】Error：', error)
    }
  }

  const onDelete = async (id: string) => {
    try {
      const { code, message: msg } = await onDeleteCard(id)
      if (code === SUCCESS) {
        refetch()
        message.success(msg)
        return
      }
      message.error(msg)
    } catch (error) {
      message.error('操作失败，服务器忙，请稍后再试')
      console.error('【onDeleteCard】Error：', error)
    }
  }

  return {
    setShowCard,
    showCard,
    loading,
    commitCardLoading,
    deleteLoading,
    data,
    onSave,
    onDelete,
  }
}
