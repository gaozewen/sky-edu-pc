import { Select } from 'antd'
import { debounce } from 'lodash-es'
import { useEffect } from 'react'

import { useGetTeachersByNameService } from '@/service/teacher'
import { IAntDOption, ITeacher } from '@/types'

interface IProps {
  onChange?: (val: IAntDOption[]) => void
  value?: IAntDOption[]
}

/**
 * 任课老师选择器
 */
const TeacherSelector = ({ onChange = () => {}, value = [] }: IProps) => {
  const { getTeachersByName, data: teachers } = useGetTeachersByNameService()

  useEffect(() => {
    getTeachersByName('')
  }, [])

  const onSearch = debounce((name: string) => {
    getTeachersByName(name)
  }, 500)

  const _onChange = (val: IAntDOption[]) => {
    onChange?.(val)
  }

  return (
    <Select
      placeholder="请选择任课老师"
      mode="multiple"
      showSearch
      onSearch={onSearch}
      filterOption={false}
      onChange={_onChange}
      labelInValue
      value={value}
    >
      {teachers?.map((s: ITeacher) => (
        <Select.Option key={s.id}>{s.nickname}</Select.Option>
      ))}
    </Select>
  )
}

export default TeacherSelector
