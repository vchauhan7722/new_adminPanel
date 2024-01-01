import moment from 'moment'
import ToastUtils from './ToastUtils'

export const sortData = (startDate: any, endDate: any) => {
  let start_date = new Date(startDate)
  let end_date = new Date(endDate)
  return start_date.getTime() - end_date.getTime()
}

export const handleAPIResponse = (status: any) => {
  if (status === 200) {
    return true
  } else if (status === 401) {
    ToastUtils({type: 'error', message: 'unAuthorized User'})
  } else if (status === 500) {
    ToastUtils({type: 'error', message: 'Internal Server Error'})
  } else if (status === 404) {
    ToastUtils({type: 'error', message: 'Not Found'})
  }
}

export const GetIDFromURL = (location: any) => {
  let str = location.pathname
  let UserId = str.substring(str.lastIndexOf('/') + 1, str.length)
  localStorage.setItem('userId', UserId)
  return UserId
}

export const getAge = (DOB: any) => {
  return moment().diff(DOB, 'years')
}

export const isImage = ['.gif', '.jpg', '.jpeg', '.png'] //you can add more
export const isVideo = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] // you can add more extention
