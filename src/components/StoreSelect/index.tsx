import { Select, Space } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'

import { useGoTo } from '@/hooks/useGoTo'
import { useUserContext } from '@/hooks/useUserHooks'
import { PN } from '@/router'
import { useGetStoreSelectStoresService } from '@/service/store'
import { IStore } from '@/types'
import { getCurrentStore, setCurrentStore } from '@/utils/currentStore'

/**
 * 门店选择器
 */
const StoreSelect = () => {
  const { data: stores, refetch } = useGetStoreSelectStoresService()
  const { setStore } = useUserContext()
  const currentStore = getCurrentStore()

  const { goTo } = useGoTo()

  useEffect(() => {
    if (currentStore) {
      setStore({
        currentStoreId: currentStore.value,
      })
      return
    }
    // 跳转门店选择页
    goTo({ pathname: PN.NOSTORE })
  }, [])

  const onSearch = _.debounce((name: string) => {
    refetch({ name })
  }, 500)

  const onChange = (val: { value: string; label: string }) => {
    setStore({
      currentStoreId: val.value,
    })
    setCurrentStore(JSON.stringify(val))
  }

  return (
    <Space>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        defaultValue={getCurrentStore()}
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

export default StoreSelect
