export interface IUser {
  id: string
  avatar: string
  tel: string
  nickname: string
  desc: string
  refetchHandler: () => void
  currentOrg?: string
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

export type TStoresQuery = {
  getStores: {
    __typename?: 'Query'
    data: IStore[]
    pageInfo: IPageInfo
  }
}

export type TStoreQuery = {
  getStore: {
    __typename?: 'Query'
    data: IStore
  }
}

export type TStoreMutation = {
  commitStore: {
    __typename?: 'Mutation'
    code: number
    message: string
  }
}

export type IResult = {
  code: number | undefined
  message: string | undefined
}
