import axios from 'axios'
import ToastUtils from '../utils/ToastUtils'
import { handleAPIResponse } from '../utils/Utils'

let APIURL = process.env.REACT_APP_SERVER_URL //NEXT_PUBLIC_PRODUCTION_SERVER_URL

//manage users section
export const getAllUser = async paginationModel => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let pageModel = paginationModel.split('&')
    let page = pageModel[0].split('=')[1]
    let pageSize = pageModel[1].split('=')[1]

    console.log(page,pageSize)

    const apiUrl = `${APIURL}/api/v1/users?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUser = async userID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })
     
   return response.data.data

  } catch (error) {
    
    return error.message
  }
}

export const registerNewUser = async (profilePic, newUserData) => {
  let accessToken = localStorage.getItem('accessToken')
  let formdata = new FormData()
  formdata = {
    profile: '',
    mobileNo: "",
    countryCode: 91,
    fullName: '',
    userName: '',
    email: '',
    genderId: '',
    birthDate: '',
    registerFrom: 'app'
  }

  const apiUrl = `${APIURL}/api/v1/users/register`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
  })

  return response.data
}

export const createGender = async genderName => {
  let accessToken = localStorage.getItem('accessToken')
  let formdata = new FormData()
  formdata = {
    name: genderName
  }

  const apiUrl = `${APIURL}/api/v1/masters/genders`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
  })

  return response.data
}

export const getAllGender = async genderName => {
  let accessToken = localStorage.getItem('accessToken')

  const apiUrl = `${APIURL}/api/v1/masters/genders`

  let response = await axios.get(apiUrl, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
  })

  return response.data
}

export const loginWithEmailandPassword = async (email, password) => {
  let formdata = new FormData()
  formdata = {
    email: email,
    password: password
  }

  const apiUrl = `${APIURL}/api/v1/auth/adminlogin`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`
    }
  })

  if (response.data.status == 200) {
    localStorage.setItem('accessToken', response.data.data.token)
    sessionStorage.setItem('accessToken', response.data.data.token)
  }

  return response.data
}

export const getCitiesBYSearch = async (searchText) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/cities?search=${searchText}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getCountriesList = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/countries`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getStateList = async countryID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/countries/${countryID}/states`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getCityList = async stateID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/countries/states/${stateID}/cities`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserpProfileDetailsUsingUserID = async userID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/profile`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserActivityWithPagination = async (page, pageSize, type, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/activities/?page=${page}&pageSize=${pageSize}&userId=${userID}&type=${type}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllInterest = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/interests`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserInterest = async userID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const addUserInterest = async (userID, interestId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      interestId: interestId
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const removeUserInterest = async (userID, interestId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    console.log(accessToken)

    let formdata = new FormData()
    formdata = {
      interestId: interestId
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      },
      data: formdata
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserQuetionAnswerForProfile = async userID => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions?fromWeb=true`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateUserQuetionAnswerForProfile = async (userID, questionID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions/${questionID}`

    let response = await axios.put(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserMedia = async (userID, page, pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/profile/media?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updatemultiMediaActionForMedia = async (userID, mediaIDArray, action) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let body = {
      mediaIds: mediaIDArray,
      action: action
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/media/admin`

    let response = await axios.put(apiUrl, body, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateAprroveMediaActionForUserMedia = async (userID, mediaID, isVerify) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let body = {
      isVerify: isVerify
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/update/media/${mediaID}`

    let response = await axios.put(apiUrl, body, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const removeMediaActionForUserMedia = async (userID, mediaID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/delete/media/${mediaID}/admin`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserCreditsHistoryWithPagination = async (userID, page, pageSize, creditType) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/credits?page=${page}&pageSize=${pageSize}&creditType=${creditType}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getChatMemberByUserID = async (userID,page,pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getMessagesByUserID = async (userID,page,pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}/messages?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

///api/v1/communications/chat/users/2/messages