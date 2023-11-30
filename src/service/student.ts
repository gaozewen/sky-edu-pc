import { useQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { GET_STUDENTS } from '@/graphql/student'
import { TStudentQuery } from '@/types'

export const useGetStudentsService = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const res = useQuery<TStudentQuery>(GET_STUDENTS, {
    variables: {
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  })

  const { loading, error, refetch } = res
  const { pageInfo, data } = res.data?.getStudents || {}
  return {
    loading,
    error,
    refetch,
    pageInfo,
    data,
  }
}
