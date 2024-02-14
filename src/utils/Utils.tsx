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

export const validateEmail = (email: any) => {
  return email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) // /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@ ((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

export const getEighteenYearsOldDate = () => {
  const currentDate = new Date()
  const maxDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  let maxDateString = maxDate.toISOString().split('T')[0]
  return maxDateString
}

//this both for check type of media in chat
export const isImage = ['.gif', '.jpg', '.jpeg', '.png'] //you can add more
export const isVideo = ['.mpg', '.mp2', '.mpeg', '.mpe', '.mpv', '.mp4'] // you can add more extention

export const isNumber = (string: any) => {
  return /\d/.test(string)
}
