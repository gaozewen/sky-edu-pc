import { useLazyQuery, useMutation } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from '@/graphql/course'
import { ICourse, IResult, TCourseMutation, TCourseQuery } from '@/types'

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

/**
 * 获取课程信息
 * @returns {TCourseQuery}
 */
export const useGetCourseService = () => {
  const [getCourse, { loading, data }] = useLazyQuery<TCourseQuery>(GET_COURSE)

  return {
    getCourse,
    loading,
    data: data?.getCourse.data as ICourse,
  }
}

/**
 * 提交课程信息（新建和编辑课程）
 */
export const useCommitCourseService = (): {
  onCommitCourse: (id: string, params: Partial<ICourse>) => Promise<IResult>
  loading: boolean
} => {
  const [commitCourse, { loading }] = useMutation<TCourseMutation>(COMMIT_COURSE)

  const onCommitCourse = async (id: string, params: Partial<ICourse>) => {
    const res = await commitCourse({
      variables: {
        id,
        params,
      },
    })
    const { code, message } = res.data?.commitCourse || {}
    return { code, message }
  }

  return {
    onCommitCourse,
    loading,
  }
}
