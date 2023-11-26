import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import ImgCrop from 'antd-img-crop'
import React, { useEffect, useState } from 'react'

import { useUploadOSS } from '@/hooks/useUploadOSS'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('只能上传 JPG/PNG 格式的图片！')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片必须小于2MB!')
  }
  return isJpgOrPng && isLt2M
}

interface IProps {
  value?: string
  onChange?: (newValue: string) => void
}

const AvatarUpload: React.FC<IProps> = props => {
  const { value, onChange } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { customRequest } = useUploadOSS()

  useEffect(() => {
    if (value && !imageUrl) {
      setImageUrl(value)
    }
  }, [value, imageUrl])

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // 将上传的头像地址传给外面表单
      if (onChange) onChange(info.file.response.url)

      // 直接获取图片 Base64 用于展示，而不是存放 cdn 地址还要去额外请求
      getBase64(info.file.originFileObj as RcFile, url => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传头像</div>
    </div>
  )

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {imageUrl && !loading ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%', borderRadius: '50%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </ImgCrop>
  )
}

AvatarUpload.defaultProps = {
  value: '',
  onChange: () => {},
}

export default AvatarUpload
