/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo, useState } from 'react'

interface IPropChild {
  children: React.ReactNode
}

interface IStore<T> {
  // key 类似命名空间，比如 user 相关，course 相关
  key: string
  // 对应 key 所存储的数据
  // T 表示存储数据的类型
  store: T
  setStore: (payload: Partial<T>) => void
  resetStore: (payload: Partial<T>) => void
}

const cxtCache: Record<string, Cxt> = {}

function getCxtProvider<T>(
  key: string,
  defaultValue: T,
  AppContext: React.Context<IStore<T>>
) {
  return ({ children }: IPropChild) => {
    const [store, setStore] = useState(defaultValue)
    const value = useMemo(
      () => ({
        key,
        store,
        setStore: (payload = {}) =>
          setStore(state => ({
            ...state,
            ...payload,
          })),
        resetStore: (payload = {}) =>
          setStore(() => ({
            ...defaultValue,
            ...payload,
          })),
      }),
      [store]
    )

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }
}

class Cxt<T = any> {
  defaultStore: IStore<T>

  AppContext: React.Context<IStore<T>>

  Provider: ({ children }: IPropChild) => JSX.Element

  constructor(key: string, defaultValue: T) {
    this.defaultStore = {
      key,
      store: defaultValue,
      setStore: () => {},
      resetStore: () => {},
    }
    this.AppContext = createContext(this.defaultStore)
    this.Provider = getCxtProvider(key, defaultValue, this.AppContext)
    cxtCache[key] = this
  }
}

export function useContextFactory<T>(key: string) {
  const cxt = cxtCache[key] as Cxt<T>
  const app = useContext(cxt.AppContext)
  return {
    store: app.store,
    setStore: app.setStore,
    resetStore: app.resetStore,
  }
}

export function connectFactory<T>(key: string, defaultValue: T) {
  const cxt = cxtCache[key]
  let CurCxt: Cxt<T>
  if (cxt) {
    CurCxt = cxt
  } else {
    CurCxt = new Cxt<T>(key, defaultValue)
  }

  return (Child: React.FC<any>) => (props: any) => (
    <CurCxt.Provider>
      <Child {...props} />
    </CurCxt.Provider>
  )
}
