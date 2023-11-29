import moment from 'moment'
import ToastUtils from './ToastUtils'

export const DateTimeFormatter = (date) => {
  return moment(date).format('DD/MM/YYYY')
}

export const DateWithTimeFormatter = (date) => {
  return moment(date).format('DD/MM/YYYY hh:mm a')
}

export const TimeFormatter = (date) => {
  return moment(date).format('hh:mm a')
}

export const GetIDFromURL = (location: any) => {
  let str = location.pathname
  let UserId = str.substring(str.lastIndexOf('/') + 1, str.length)
  localStorage.setItem('userId', UserId)
  return UserId
}

export const calculateTimeDifference = (givenTime: any) => {
  const currentTime = new Date()
  const pastTime = new Date(givenTime)
  const timeDifferenceInMilliseconds = currentTime.getTime() - pastTime.getTime()
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60
  const timeDifferenceInHours = timeDifferenceInMinutes / 60
  const timeDifferenceInDays = timeDifferenceInHours / 24
  const timeDifferenceInYears = timeDifferenceInDays / 365

  if (timeDifferenceInYears >= 1) {
    return `${Math.floor(timeDifferenceInYears)} years ago`
  } else if (timeDifferenceInDays >= 30) {
    return `${Math.floor(timeDifferenceInDays / 30)} months ago`
  } else if (timeDifferenceInDays >= 1) {
    return `${Math.floor(timeDifferenceInDays)} days ago`
  } else if (timeDifferenceInHours >= 1) {
    return `${Math.floor(timeDifferenceInHours)} hours ago`
  } else if (timeDifferenceInMinutes >= 1) {
    return `${Math.floor(timeDifferenceInMinutes)} minutes ago`
  } else {
    return `${Math.floor(timeDifferenceInSeconds)} seconds ago`
  }
}

export const oldCalculateDateTimeDifference = (pastDateString: any) => {
  const currentDate = new Date()
  const pastDate = new Date(pastDateString)
  const timeDifference = Math.abs(currentDate.getTime() - pastDate.getTime())
  const minutes = Math.floor(timeDifference / (60 * 1000))
  const hours = Math.floor(timeDifference / (60 * 60 * 1000))
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  let finalTime: string

  if (years > 0) {
    finalTime = years + ' Y'
  } else if (days > 0) {
    finalTime = days + ' D'
  } else if (hours > 0) {
    finalTime = hours + ' H'
  } else {
    finalTime = minutes + ' M'
  }

  return finalTime
}

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
