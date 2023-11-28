import { MobileOutlined } from '@ant-design/icons'
import { ProFormText } from '@ant-design/pro-components'
import { theme } from 'antd'

import { SizeType } from '@/constants/enum'

interface IProps {
  label?: string
  placeholder?: string
  size?: SizeType
  showPrefix?: boolean
  phoneName?: string
  name?: string
  /**
   * @type auto 使用组件默认的宽度
   * @type xs=104px 适用于短数字、短文本或选项。
   * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * @type md=328px 标准宽度，适用于大部分字段长度。
   * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg'
}

/**
 * 输入手机号表单
 */
const MobileForm = (props: IProps) => {
  const {
    label = '',
    placeholder = '请输入手机号',
    size = SizeType.MIDDLE,
    showPrefix = false,
    name = 'tel',
    width,
  } = props || {}
  const { token } = theme.useToken()
  return (
    <ProFormText
      label={label}
      fieldProps={{
        size,
        prefix: showPrefix ? (
          <MobileOutlined
            style={{
              color: token.colorText,
            }}
            className={'prefixIcon'}
          />
        ) : null,
      }}
      // TODO: 开发用，上线注释掉
      initialValue="13815013866"
      // 默认不传 undefined 等了页用的长度
      width={width}
      name={name}
      placeholder={`请输入${placeholder}`}
      rules={[
        {
          required: true,
          message: `请输入${placeholder}！`,
        },
        {
          pattern: /^1\d{10}$/,
          message: '手机号格式错误！',
        },
      ]}
    />
  )
}

export default MobileForm
