export interface IUser {
  id: string
  avatar: string
  tel: string
  nickname: string
  desc: string
  refetchHandler: () => void
  currentStoreId?: string
}

export interface IPageInfo {
  pageNum: number
  pageSize: number
  total: number
}
export interface IMedia {
  id: string
  url: string
  remark: string
}

export interface IStore {
  id: string
  frontImgs?: IMedia[]
  roomImgs?: IMedia[]
  otherImgs?: IMedia[]
  name: string
  logo: string
  tags?: string
  description?: string
  address?: string
  tel?: string
  longitude?: string
  latitude?: string
  identityCardBackImg: string
  identityCardFrontImg: string
  businessLicense: string
}

export type TStoreQuery = {
  getStores: {
    __typename?: 'StoreResultsVO'
    data: IStore[]
    pageInfo: IPageInfo
    code: number
    message: string
  }
  getStore: {
    __typename?: 'StoreResultVO'
    data: IStore
    code: number
    message: string
  }
}

export type TStoreMutation = {
  commitStore?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
  deleteStore?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export type IResult = {
  code: number | undefined
  message: string | undefined
}

export interface IStudent {
  id: string
  account: string
  avatar: string
  nickname: string
  tel: string
}

export type TStudentQuery = {
  getStudents?: {
    __typename?: 'StudentResultsVO'
    data: IStudent[]
    pageInfo: IPageInfo
  }
}

export interface IOrderTime {
  id: string
  startTime: string
  endTime: string
}

export interface IWeekOrderTime {
  week: Week
  orderTimes: IOrderTime[]
}

export interface ICourse {
  id: string
  name: string // 标题
  desc?: string
  group?: string // 适龄人群
  baseAbility?: string
  limitNumber: number // 限制人数
  duration: number // 持续时长
  reserveInfo?: string
  refundInfo?: string
  otherInfo?: string
  // 持续一周的可预约时间
  weeklyOrderTimes: IWeekOrderTime[]
}

export type TCourseQuery = {
  getCourses: {
    __typename?: 'CourseResultsVO'
    data: ICourse[]
    pageInfo: IPageInfo
  }
  getCourse: {
    __typename?: 'CourseResultsVO'
    data: ICourse
  }
}

export type TCourseMutation = {
  commitCourse?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export interface ICard {
  id: string
  name: string
  type: string
  time: number
  validateDay: number
}

export type TCardQuery = {
  getCards: {
    __typename?: 'CardResultsVO'
    data: ICard[]
  }
  getCard: {
    __typename?: 'CardResultsVO'
    data: ICard
  }
}

export type TCardMutation = {
  commitCard?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
  deleteCard?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}
