import { CardRecordStatus, ScheduleRecordStatus } from './constants/enum'
import { Week } from './pages/Course/components/Order/utils'
import { ProductStatus } from './pages/Product/utils'

export interface IUser {
  id: string
  avatar: string
  tel: string
  nickname: string
  desc: string
  refetchHandler: () => void
  currentStoreId?: string
  currentStoreName?: string
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
  coverUrl: string // 课程封面图
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
  teachers?: ITeacher[]
  teacherIds?: string[] // DTO 参数
}

export type TCourseQuery = {
  getCourses: {
    __typename?: 'CourseResultsVO'
    data: ICourse[]
    pageInfo: IPageInfo
  }
  getCourse: {
    __typename?: 'CourseResultVO'
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
  name?: string
  type?: string
  time?: number
  validateDay?: number
  course?: ICourse
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

export interface IProduct {
  id: string
  name: string
  desc: string
  status: ProductStatus
  category: string
  stock: number
  curStock?: number
  sellNumber?: number
  limitBuyNumber: number
  coverUrl: string
  bannerUrl: string
  originalPrice: number
  preferentialPrice: number
  cards: ICard[]
  cardIds: string[]
}

export interface IProductCategory {
  key: string
  title: string
}

export type TProductQuery = {
  getProducts: {
    __typename?: 'ProductResultsVO'
    data: IProduct[]
    pageInfo: IPageInfo
  }
  getProduct: {
    __typename?: 'ProductResultVO'
    data: IProduct
  }
  getProductCategories: {
    __typename?: 'ProductResultsVO'
    data: IProductCategory[]
    code: number
    message: string
  }
}

export type TProductMutation = {
  commitProduct?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
  deleteProduct?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export interface ITeacher {
  id: string
  account: string
  password: string
  tel: string
  avatar: string
  nickname: string
  store: IStore
}

export type TTeacherQuery = {
  getTeachers: {
    __typename?: 'TeacherResultsVO'
    data: ITeacher[]
    pageInfo: IPageInfo
  }
  getTeacher: {
    __typename?: 'TeacherResultVO'
    data: ITeacher
  }
}

export type TTeacherMutation = {
  commitTeacher?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export interface IAntDOption {
  label: string
  value: string
}

export interface ICardRecord {
  id: string
  startTime: string
  endTime: string
  buyTime: string
  remainTime: number
  status: CardRecordStatus
  card: ICard
  store: IStore
}

export interface IScheduleRecord {
  id: string
  status: ScheduleRecordStatus
  student: IStudent
  cardRecord: ICardRecord
  schedule: ISchedule
  course: ICourse
  store: IStore
}

export interface ISchedule {
  id: string
  startTime: string
  endTime: string
  limitNumber: number
  course: ICourse
  store: IStore
  scheduleRecords: IScheduleRecord[]
}

export type TScheduleMutation = {
  autoCreateSchedule?: {
    __typename?: 'ResultVO'
    code: number
    message: string
  }
}

export type TScheduleQuery = {
  getTodaySchedules?: {
    code: number
    message: string
    data: ISchedule[]
  }
}
