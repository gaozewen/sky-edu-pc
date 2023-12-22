import { PlusOutlined } from '@ant-design/icons'
import { Avatar, Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import ImgCrop from 'antd-img-crop'
import React, { useState } from 'react'

import { IMG } from '@/constants/image'
import { useUploadOSS } from '@/hooks/useUploadOSS'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })

interface IProps {
  value?: UploadFile[]
  onChange?: (newValue: UploadFile[]) => void
  max?: number
  multiple?: boolean
  imgCropAspect?: number
  isAvatar?: boolean
}

const ImageUpload: React.FC<IProps> = props => {
  const {
    value = [],
    onChange = () => {},
    max = 1,
    multiple = false,
    imgCropAspect = 1 / 1,
    isAvatar = false,
  } = props
  const { customRequest } = useUploadOSS()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = ({ file, fileList }) => {
    // console.log('gzw====>file', file)
    // console.log('gzw====>fileList', fileList)
    let willFileList = fileList

    // 1.如果当前文件已上传完成，同步更新 fileList 对应文件状态为 done
    // 2.更新完状态后同步更新外面表单的 value
    if (file.status === 'done') {
      // 1.将 fileList 中对应 file 状态改成 done
      willFileList = willFileList
        ?.filter((item: UploadFile) => item.status)
        ?.map((item: UploadFile) => {
          const isCurrentDoneFile = file.uid === item.uid
          return {
            ...item,
            status: isCurrentDoneFile ? 'done' : item.status,
            url: isCurrentDoneFile
              ? item.response.url || ''
              : item?.url || item?.response?.url || '',
          }
        })
    }

    // console.log('gzw==>willFileList', willFileList)
    onChange(willFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传图片</div>
    </div>
  )

  return (
    <>
      <ImgCrop rotationSlider aspect={imgCropAspect}>
        <Upload
          listType={isAvatar ? 'picture-circle' : 'picture-card'}
          showUploadList={!isAvatar}
          fileList={value || []}
          onPreview={handlePreview}
          onChange={handleChange}
          multiple={multiple}
          customRequest={customRequest}
        >
          {value?.length >= max ? (
            isAvatar ? (
              <Avatar
                style={{ width: '100%', height: '100%' }}
                src={value[0].url || IMG.AVATAR_DEFAULT}
              />
            ) : null
          ) : (
            uploadButton
          )}
        </Upload>
      </ImgCrop>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default ImageUpload
