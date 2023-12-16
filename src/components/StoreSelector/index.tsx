import { Select, Space } from 'antd'
import _ from 'lodash'

import { useUserContext } from '@/hooks/useUserHooks'
import { useGetStoreSelectStoresService } from '@/service/store'
import { IStore } from '@/types'
import { getLocalStore, setLocalStore } from '@/utils/currentStore'

/**
 * 门店选择器
 */
const StoreSelector = () => {
  const { data: stores, refetch } = useGetStoreSelectStoresService()
  const { setStore } = useUserContext()
  const currentStore = getLocalStore()

  const onSearch = _.debounce((name: string) => {
    refetch({ name })
  }, 500)

  const onChange = (val: { value: string; label: string }) => {
    setStore({
      currentStoreId: val.value,
    })
    setLocalStore(JSON.stringify(val))
  }

  return (
    <Space>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        defaultValue={currentStore}
        onSearch={onSearch}
        filterOption={false}
        onChange={onChange}
        labelInValue
      >
        {stores?.map((s: IStore) => <Select.Option key={s.id}>{s.name}</Select.Option>)}
      </Select>
    </Space>
  )
}

export default StoreSelector
