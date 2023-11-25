export interface IUser {
  id: string
  tel: string
  nickname: string
  desc: string
  avatar: string
  refetchHandler?: () => void
  currentOrg?: string
}
