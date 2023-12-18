import imageCompression from 'browser-image-compression'

import { IMG } from '@/constants/image'

interface IGetThumb {
  url: string
  w: number
  h: number
  isAvatar?: boolean
}
export const ImgUtils = {
  getThumb: ({ url, w, h, isAvatar }: IGetThumb) => {
    let willUrl = url
    if (!willUrl) {
      willUrl = isAvatar ? IMG.AVATAR_DEFAULT : IMG.LOGO_TEXT
    }
    return `${willUrl}?imageView2/1/w/${w}/h/${h}`
  },
  compressImage: async (file: File) => {
    // console.log(`原始文件大小：${file.size / 1024} KB`)
    try {
      const options = {
        maxSizeMB: 1, // 设置最大文件大小为1MB（根据您的需求进行调整）
        maxWidthOrHeight: 800, // 设置最大宽度或高度为800像素（根据您的需求进行调整）
        useWebWorker: true, // 使用Web Worker进行压缩（可选）
      }

      const compressedFile = await imageCompression(file, options)
      // console.log(`压缩后文件大小：${compressedFile.size / 1024} KB`)
      return compressedFile
    } catch (error) {
      console.error('【imageCompression】Error:', error)
      return file
    }
  },
}
