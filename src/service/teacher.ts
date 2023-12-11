import { useLazyQuery, useMutation } from '@apollo/client'

import { DEFAULT_PAGE_SIZE } from '@/constants'
import { COMMIT_TEACHER, GET_TEACHER, GET_TEACHERS } from '@/graphql/teacher'
import { IResult, ITeacher, TTeacherMutation, TTeacherQuery } from '@/types'

export const useGetTeachersService = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const [getTeachers] = useLazyQuery<TTeacherQuery>(GET_TEACHERS, {
    variables: {
      pageInfo: {
        pageNum,
        pageSize,
      },
    },
  })

  const proTableRequest = async (params: {
    nickname?: string
    pageSize?: number
    current?: number
  }) => {
    const { data: res, error } = await getTeachers({
      variables: {
        name: params.nickname,
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
      total: res?.getTeachers.pageInfo.total,
      data: res?.getTeachers.data,
      success: true,
    }
  }

  return {
    proTableRequest,
  }
}

/**
 * 根据教师名称获取前十个教师列表
 * @returns {TTeacherQuery}
 */
export const useGetTeachersByNameService = () => {
  const [getTeachers, { loading, data }] = useLazyQuery<TTeacherQuery>(GET_TEACHERS)

  const getTeachersByName = (name: string) => {
    getTeachers({
      variables: {
        name,
        pageInfo: {
          pageNum: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    })
  }

  return {
    getTeachersByName,
    loading,
    data: data?.getTeachers.data,
  }
}

/**
 * 获取教师信息
 * @returns {TTeacherQuery}
 */
export const useGetTeacherService = () => {
  const [getTeacher, { loading, data, refetch }] =
    useLazyQuery<TTeacherQuery>(GET_TEACHER)

  return {
    getTeacher,
    loading,
    data: data?.getTeacher.data as ITeacher,
    refetch,
  }
}

/**
 * 提交教师信息（新建和编辑教师）
 */
export const useCommitTeacherService = (): {
  onCommitTeacher: (id: string, params: Partial<ITeacher>) => Promise<IResult>
  loading: boolean
} => {
  const [commitTeacher, { loading }] = useMutation<TTeacherMutation>(COMMIT_TEACHER)

  const onCommitTeacher = async (id: string, params: Partial<ITeacher>) => {
    const res = await commitTeacher({
      variables: {
        id,
        params,
      },
    })
    const { code, message } = res.data?.commitTeacher || {}
    return { code, message }
  }

  return {
    onCommitTeacher,
    loading,
  }
}
