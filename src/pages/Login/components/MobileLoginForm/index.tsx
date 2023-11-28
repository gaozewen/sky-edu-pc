import GetSMSCodeForm from '@/components/GetSMSCodeForm'
import MobileForm from '@/components/MobileForm'
import { SizeType } from '@/constants/enum'

/**
 * 手机验证码登录表单
 */
const MobileLoginForm = () => {
  return (
    <>
      <MobileForm size={SizeType.LARGE} showPrefix name="tel" />

      <GetSMSCodeForm size={SizeType.LARGE} showPrefix={true} />
    </>
  )
}

export default MobileLoginForm
