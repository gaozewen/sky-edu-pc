import { useEffect } from 'react'

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title || '天空教育'
  }, [])
}
