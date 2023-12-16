import { Select } from 'antd'
import { debounce } from 'lodash-es'

import { useGetCoursesByNameService } from '@/service/course'

interface IProps {
  onSelected: (courseId: string) => void
}

/**
 *  课程选择搜索器
 */
const CourseSearch = ({ onSelected }: IProps) => {
  const { getCoursesByName, loading, data } = useGetCoursesByNameService()

  const onSearch = debounce((name: string) => {
    getCoursesByName(name)
  }, 500)

  const onChange = (courseId: string) => {
    onSelected(courseId)
  }

  return (
    <Select
      style={{ width: 288 }}
      showSearch
      placeholder="请搜索课程"
      onSearch={onSearch}
      onChange={onChange}
      filterOption={false}
      loading={loading}
      options={data?.map(i => ({ label: i.name, value: i.id }))}
    />
  )
}

export default CourseSearch
