import { useQuery } from '@apollo/client'
import { nanoid } from 'nanoid'
import * as qiniu from 'qiniu-js'

import { GET_UPLOAD_TOKEN } from '@/graphql/oss'

export const useUploadOSS = () => {
  // 获取 uploadToken
  const { data } = useQuery(GET_UPLOAD_TOKEN)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customRequest = (option: any) => {
    const { file, onProgress, onError, onSuccess } = option
    const { getUploadToken = {} } = data || {}
    const { uploadToken: token = '' } = getUploadToken || {}
    const key = `images/${nanoid()}`

    const putExtra = {
      fname: file.name, // 文件原文件名
      params: {}, // 用来放置自定义变量
      mimeType: undefined, // 用来限制上传文件类型，为 undefined 时表示不对文件类型限制；限制类型放到数组里： ["image/png", "image/jpeg", "image/gif"]
    }

    const config = {
      useCdnDomain: true, // 表示是否使用 cdn 加速域名，为布尔值，true 表示使用，默认为 false。
      region: qiniu.region.cnEast2,
    }
    const observable = qiniu.upload(file, key, token, putExtra, config)

    observable.subscribe({
      next: res => {
        // 展示上传进度
        onProgress({ percent: res.total.percent })
      },
      error: err => {
        // 失败报错信息
        console.error('【七牛 Upload】Error：', err)
        onError(err)
      },
      complete: response => {
        // 七牛返回的请求结果
        const { key } = response
        const url = `${import.meta.env.VITE_CDN_HOST}/${key}`
        onSuccess({ url })
      },
    })
  }

  return { customRequest }
}
