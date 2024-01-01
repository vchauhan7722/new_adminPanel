import moment from 'moment'

export const DateTimeFormatter = (date) => {
  return moment(date).format('DD/MM/YYYY')
}

export const DateWithTimeFormatter = (date) => {
  return moment(date).format('DD/MM/YYYY hh:mm a')
}

export const TimeFormatter = (date) => {
  return moment(date).format('hh:mm a')
}
// moment("1999-03-22").isBefore(moment().subtract(18, "years"))

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

export const calculateTimeDifferenceForChatMessage = (givenTime: any) => {
  const currentTime = new Date()
  const pastTime = new Date(givenTime)
  const timeDifferenceInMilliseconds = currentTime.getTime() - pastTime.getTime()
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60
  const timeDifferenceInHours = timeDifferenceInMinutes / 60

  if (timeDifferenceInHours >= 48) {
    return moment(pastTime).format('DD/MM/YYYY')
  } else if (timeDifferenceInHours <= 48 && timeDifferenceInHours >= 24) {
    return `Yesterday`
  } else {
    return moment(pastTime).format('hh:mm a')
  }
}

export const calculateTimeDifferenceForActivity = (givenTime: any) => {
  const currentTime = new Date()
  const pastTime = new Date(givenTime)
  const timeDifferenceInMilliseconds = currentTime.getTime() - pastTime.getTime()
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60
  const timeDifferenceInHours = timeDifferenceInMinutes / 60

  if (timeDifferenceInHours >= 24) {
    return moment(pastTime).format('hh:mm a DD-MMM-YYYY')
  } else {
    return moment(pastTime).format('hh:mm a')
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
