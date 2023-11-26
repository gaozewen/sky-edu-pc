export interface IUser {
  id: string
  avatar: string
  tel: string
  nickname: string
  desc: string
  refetchHandler: () => void
  currentOrg?: string
}
