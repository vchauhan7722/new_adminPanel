import {ID, Response} from '../../../../../../_metronic/helpers'
// export type User = {
//   id?: ID
//   name?: string
//   avatar?: string
//   email?: string
//   position?: string
//   role?: string
//   last_login?: string
//   two_steps?: boolean
//   joined_day?: string
//   online?: boolean
//   initials?: {
//     label: string
//     state: string
//   }
// }


export type User = {
  userId?: number
  fullName?: string
  userName?: string
  countryCode?: string
  mobileNo?: string
  otp?: number
  otpExpiration?: string
  profileImage?: string
  email?: string
  birthDate?: string
  age?: number
  lat?:string
  lng?:string
  country?:string
  state?:string
  city?:string
  bio?:string
  registerFrom?:string
  isAdmin?: boolean
  isOnline?: boolean
  isVerify?: boolean
  genderId?: number
  isPremium?: boolean
  totalCredit?: number
  loginWith?: number
  isDelete?: boolean
  completeProfile?:boolean
  isSpotlightUser?:boolean
  spotLightDays?: number
  setSpotLightDate?: string
  isPopular?: boolean
  popularDays?:number
  setPopularDate?:string
  status?:boolean
  createdAt?:string
  updatedAt?:string
  gender?: {
    name: string
  }
  id?: ID
  name?: string
  avatar?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  initials?: {
    label: string
    state: string
  }
  page:number
  pageSize:number
  totalPage:number
}

export type UsersQueryResponse = Response<Array<User>>

export const initialUser: User = {
  profileImage: 'avatars/300-6.jpg',
  fullName: '',
  email: '',
  page:1,
  pageSize:100,
  totalPage:1
}
