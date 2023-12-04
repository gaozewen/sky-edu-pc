import { useLazyQuery } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { GET_COURSES } from '@/graphql/course'
import { TCourseQuery } from '@/types'

export const useGetCoursesService = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const [getCourses] = useLazyQuery<TCourseQuery>(GET_COURSES, {
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
    const { data: res, error } = await getCourses({
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
      total: res?.getCourses.pageInfo.total,
      data: res?.getCourses.data,
      success: true,
    }
  }

  return {
    proTableRequest,
  }
}
