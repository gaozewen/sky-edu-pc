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
}
