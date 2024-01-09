import axios from 'axios'

let APIURL = process.env.REACT_APP_SERVER_URL //NEXT_PUBLIC_PRODUCTION_SERVER_URL

//manage users section
export const getAllUser = async (query) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    // let pageModel = paginationModel.split('&')
    // let page = pageModel[0].split('=')[1]
    // let pageSize = pageModel[1].split('=')[1]

    //const apiUrl = `${APIURL}/api/v1/users?page=${page}&pageSize=${pageSize}`
    const apiUrl = `${APIURL}/api/v1/users?${query}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUser = async (userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
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
    mobileNo: '',
    countryCode: 91,
    fullName: '',
    userName: '',
    email: '',
    genderId: '',
    birthDate: '',
    registerFrom: 'app',
  }

  const apiUrl = `${APIURL}/api/v1/users/register`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken,
    },
  })

  return response.data
}

export const createGender = async (genderName) => {
  let accessToken = localStorage.getItem('accessToken')
  let formdata = new FormData()
  formdata = {
    name: genderName,
  }

  const apiUrl = `${APIURL}/api/v1/masters/genders`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken,
    },
  })

  return response.data
}

export const getAllGender = async (genderName) => {
  let accessToken = localStorage.getItem('accessToken')

  const apiUrl = `${APIURL}/api/v1/masters/genders`

  let response = await axios.get(apiUrl, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken,
    },
  })

  return response.data
}

export const loginWithEmailandPassword = async (email, password) => {
  let formdata = new FormData()
  formdata = {
    email: email,
    password: password,
  }

  const apiUrl = `${APIURL}/api/v1/auth/adminlogin`

  let response = await axios.post(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
    },
  })

  if (response.data.status == 200) {
    localStorage.setItem('accessToken', response.data.data.token)
    sessionStorage.setItem('accessToken', response.data.data.token)
    localStorage.setItem('loginUserId', response.data.data.adminUserId)
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
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getStateBYSearch = async (searchText) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/states?search=${searchText}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
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
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getStateList = async (countryID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/countries/${countryID}/states`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getCityList = async (stateID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/countries/states/${stateID}/cities`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserpProfileDetailsUsingUserID = async (userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/profile`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
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
        'x-access-token': accessToken,
      },
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
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const createInterest = async (name) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      name: name,
    }

    const apiUrl = `${APIURL}/api/v1/masters/interests`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateInterest = async (interestId, name) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      name: name,
    }

    const apiUrl = `${APIURL}/api/v1/masters/interests/${interestId}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const removeInterest = async (interestId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/interests/${interestId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserInterest = async (userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
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
      interestId: interestId,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
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

    let formdata = new FormData()
    formdata = {
      interestId: interestId,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/interest`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
      data: formdata,
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const addQuestions = async (question, order, inputType, genderId, questionIcon) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    console.log(typeof genderId)
    let formdata = new FormData()
    if (genderId === 0) {
      formdata = {
        question: question,
        order: order,
        inputType: inputType,
        questionIcon: questionIcon,
      }
    } else {
      formdata = {
        question: question,
        order: order,
        inputType: inputType,
        genderId: parseInt(genderId),
        questionIcon: questionIcon,
      }
    }

    const apiUrl = `${APIURL}/api/v1/masters/questions`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateQuestions = async (updatedData, file) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      question: updatedData.question,
      order: updatedData.order,
      inputType: updatedData.inputType,
      genderId: updatedData.genderId,
      questionIcon: file,
    }

    const apiUrl = `${APIURL}/api/v1/masters/questions/${updatedData.questionId}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const addAnswer = async (answer, questionId) => {
  //
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      answer: answer,
      questionId: questionId,
    }

    const apiUrl = `${APIURL}/api/v1/masters/answers`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateAnswers = async (answers) => {
  //
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      answers: answers,
    }

    const apiUrl = `${APIURL}/api/v1/masters/answers`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserQuestionAnswerForProfile = async (userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions?fromWeb=true`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const createUserQuestionAnswerForProfile = async (userID, questionID, answerID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId: questionID,
      answerId: answerID,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateUserQuestionAnswerForProfile = async (userID, questionID, answerID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId: questionID,
      answerId: answerID,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteUserQuestionAnswerForProfile = async (
  userID,
  questionID,
  answerID,
  userQuestionId
) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId: questionID,
      answerId: answerID,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions/${userQuestionId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
      data: formdata,
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
        'x-access-token': accessToken,
      },
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
      action: action,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/media/admin`

    let response = await axios.put(apiUrl, body, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateMediaActionForUserMedia = async (userID, mediaID, type, typeValue) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let body = {
      [`${type}`]: typeValue,
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/update/media/${mediaID}`

    let response = await axios.put(apiUrl, body, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
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
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const createMediaActionForUserMedia = async (fileData, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formData = new FormData()
    // formData = {
    //   profileMedia : fileData,
    //   mediaTypes : [{mediaType:"photo"}],
    // }

    for (var i = 0; i < fileData.length; i++) {
      formData.append('profileMedia', fileData[i], fileData[i].name)
      formData.append(`mediaTypes[${i}][mediaType]`, 'photo')
    }
    console.log('formData', formData)
    const apiUrl = `${APIURL}/api/v1/users/${userID}/upload/profiles`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const createMediaActionForUserMediaForAnonymousUser = async (fileData, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formData = new FormData()
    for (var i = 0; i < fileData.length; i++) {
      formData.append('anonymousProfileMedia', fileData[i], fileData[i].name)
      formData.append(`mediaTypes[${i}][mediaType]`, 'photo')
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/upload/profiles/web`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

export const setMediaAsAStoryForUserMedia = async (userID, mediaId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/media/${mediaId}/upload/story`

    let response = await axios.post(
      apiUrl,
      {},
      {
        headers: {
          'x-access-token': accessToken,
        },
      }
    )

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserCreditsHistoryWithPagination = async (
  userID,
  page,
  pageSize,
  creditType,
  filterValue
) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/credits?page=${page}&pageSize=${pageSize}&creditType=${creditType}&creditHistoryTitle=${filterValue}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdateUserDetailsByUID = async (UID, newUserData) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      mobileNo: newUserData.mobileNo,
      countryCode: newUserData.countryCode,
      fullName: newUserData.fullName,
      userName: newUserData.userName,
      email: newUserData.email,
      genderId: parseInt(newUserData.gender),
      city: newUserData.city,
      state: newUserData.state,
      country: newUserData.country,
      birthDate: newUserData.birthDate,
      bio: newUserData.bio,
    }

    const apiUrl = `${APIURL}/api/v1/users/update/${UID}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const UpdateVerifyStatusByUID = async (UID, flag) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      isVerify: flag,
    }

    const apiUrl = `${APIURL}/api/v1/users/update/${UID}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const UpdateSpotlightStatusByUID = async (UID, duration) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      duration: duration,
    }

    const apiUrl = `${APIURL}/api/v1/users/${UID}/update/spotlight?fromWeb=true`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const UpdatePopularStatusByUID = async (UID, days, isPopular) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    if (isPopular) {
      formData = {
        days: days,
        isPopular: isPopular,
      }
    } else {
      formData = {
        isPopular: isPopular,
      }
    }

    const apiUrl = `${APIURL}/api/v1/users/${UID}/update/popular`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const AddOrUpdateCreditByUID = async (UID, type, credit) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      type: type,
      credit: credit,
    }

    const apiUrl = `${APIURL}/api/v1/web/users/${UID}/send/credit`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const AddOrUpdatePremiumByUID = async (UID, type, days, premiumPackageAmountId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      type: type,
      days: days,
      premiumPackageAmountId: premiumPackageAmountId,
    }

    const apiUrl = `${APIURL}/api/v1/web/users/${UID}/send/premium`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getSpotlightUsers = async (Page, pageSize, userType) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/web/users/spotlight?page=${Page}&pageSize=${pageSize}&registerFrom=${userType}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const removeSpotlightUser = async (userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/remove/spotlight`

    let response = await axios.put(
      apiUrl,
      {},
      {
        headers: {
          'Content-Type': `application/json`,
          'x-access-token': accessToken,
        },
      }
    )

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

/*For Chats */
export const getMessagesByUserID = async (userID, chatroomID, page, pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}/chatroom/${chatroomID}/messages?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getChatMemberByUserID = async (userID, page, pageSize, userType) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}?page=${page}&pageSize=${pageSize}&registerFrom=${userType}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllGifts = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllGiftsCategory = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const sendCreditInChat = async (senderID, receiverId, credit) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      receiverId: receiverId,
      credit: credit,
    }

    const apiUrl = `${APIURL}/api/v1/users/${senderID}/send/credit`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const pinOrLikeChatMember = async (userID, roomID, chatID, action, currentActionValue) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata
    if (action === 'pin') {
      formdata = {
        pin: currentActionValue,
      }
    } else if (action === 'like') {
      formdata = {
        like: currentActionValue,
      }
    }

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}/chatroom/${roomID}/chatMember/${chatID}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

/*for story */

export const getAllUserStory = async (userId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/1/stories/view/${userId}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const CreateUserStory = async (fileData, userId) => {
  try {
    let formData = new FormData()
    formData = {
      media: fileData,
      mediaType: fileData.type.split('/')[0],
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteUserStory = async (userId, mediaId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${mediaId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdateUserStory = async (storyCredit, userId, storyId) => {
  try {
    storyCredit = parseInt(storyCredit)
    let formData = new FormData()
    if (storyCredit !== 0) {
      formData = {
        isPrivate: true,
        storyCredit: storyCredit,
      }
    } else {
      formData = {
        storyCredit: storyCredit,
      }
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${storyId}`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const ReUploadUserStory = async (userId, storyId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${storyId}/re-upload`

    let response = await axios.post(
      apiUrl,
      {},
      {
        headers: {
          'Content-Type': `application/json`,
          'x-access-token': accessToken,
        },
      }
    )

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// for send message using pusher

export const sendMessageUsingApi = async (message, userId, receiverId, chatRoomID, chatID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      message: message,
      senderId: userId,
      receiverId: receiverId,
      type: 'text',
      chatRoomId: chatRoomID,
      chatId: chatID,
    }
    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${receiverId}/chatroom/${chatRoomID}/messages`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)
    return error.message
  }
}

export const getAllMedia = async (page, pageSize, isPrivate, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    //  /api/v1/users/profile/media?page=1&pageSize=10&isPrivate=false&userId=35
    const apiUrl = `${APIURL}/api/v1/users/profile/media?page=${page}&pageSize=${pageSize}&isPrivate=${isPrivate}&userId=${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteSelectedMedia = async (MediaId) => {
  try {
    let formData = {
      mediaIds: MediaId,
      action: 'delete',
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/media/admin`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllStories = async (page, pageSize, isPrivate, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/users/all/stories?page=${page}&pageSize=${pageSize}&isPrivate=${isPrivate}&userId=${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteSelectedStory = async (MediaId) => {
  try {
    let formData = {
      storyIds: MediaId,
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/delete/all/stories`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const ReUploadSelectedStory = async (MediaId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formData = {
      storyIds: MediaId,
    }

    const apiUrl = `${APIURL}/api/v1/users/re-upload/all/stories`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// gifts plugin

export const getAllGiftCategory = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    //  /api/v1/users/profile/media?page=1&pageSize=10&isPrivate=false&userId=35
    const apiUrl = `${APIURL}/api/v1/masters/gifts-category`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const CreateGiftsCategory = async (name) => {
  try {
    let formData = new FormData()
    formData = {
      name: name,
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateGiftsCategory = async (name, giftCategoryId) => {
  try {
    let formData = new FormData()
    formData = {
      name: name,
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/${giftCategoryId}`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteGiftsCategory = async (giftCategoryId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/${giftCategoryId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllGift = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    //  /api/v1/users/profile/media?page=1&pageSize=10&isPrivate=false&userId=35
    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/with/gifts`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const CreateGift = async (name, categoryId, credit, giftFile) => {
  try {
    let formData = new FormData()
    formData = {
      name: name,
      giftCategoryId: categoryId,
      credit: credit,
      gift: giftFile,
    }

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/1/gifts`

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateGifts = async (name, categoryId, credit, giftFile, giftId) => {
  try {
    let formData = new FormData()
    formData = {
      name: name,
      giftCategoryId: categoryId,
      credit: credit,
      gift: giftFile,
    }

    console.log('formData', formData)

    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/${categoryId}/gifts/${giftId}`

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteGifts = async (giftCategoryId, giftId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/gifts-category/${giftCategoryId}/gifts/${giftId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

//master plugins

export const getConfigurationByName = async (name) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/configurations/types/${name}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateConfigurationByConfigID = async (ConfigID, values, gestureFile) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/configurations/${ConfigID}`

    let formData = new FormData()
    if (gestureFile === null) {
      formData = {
        values: JSON.stringify(values),
      }
    } else {
      formData = {
        gesture: gestureFile,
        values: JSON.stringify(values),
      }
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// site-pricing plugin

export const getCreditPackageAmountPlans = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/credits/amounts`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const CreateCreditPackageAmountPlan = async (credit, amount) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/credits/amounts`

    let formData = new FormData()
    formData = {
      credit: credit,
      amount: amount,
    }

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateCreditPackageAmountPlan = async (pkgId, credit, amount) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/credits/amounts/${pkgId}`

    let formData = new FormData()
    formData = {
      credit: credit,
      amount: amount,
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getPremiumPackageAmountPlans = async () => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/premium/amounts`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const CreatePremiumPackageAmountPlan = async (days, amount, pkgName) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/premium/amounts`

    let formData = new FormData()
    formData = {
      days: days,
      amount: amount,
      premiumPackageName: pkgName,
    }

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updatePremiumPackageAmountPlan = async (pkgId, days, amount, pkgName) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/premium/amounts/${pkgId}`

    let formData = new FormData()
    formData = {
      days: days,
      amount: amount,
      premiumPackageName: pkgName,
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updatePremiumPackageAmountConfig = async (
  pkgId,
  days,
  amount,
  premiumPackageConfig
) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/masters/packages/premium/amounts/${pkgId}`

    let formData = {
      days: days,
      amount: amount,
      premiumPackageConfig: premiumPackageConfig,
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

//verification system

export const getUserVerificationList = async (page, pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/web/users/verification/list?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateUserVerification = async (userID, verificationId, verifyStatus, reason) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/web/users/${userID}/verification/${verificationId}`

    let formData = new FormData()
    if (verifyStatus === 'verified') {
      formData = {
        verifyStatus: verifyStatus,
      }
    } else {
      formData = {
        verifyStatus: verifyStatus,
        reason: reason,
      }
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// anonymous users

export const getAllAnonymousUser = async (query) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    // let pageModel = paginationModel.split('&')
    // let page = pageModel[0].split('=')[1]
    // let pageSize = pageModel[1].split('=')[1]

    //const apiUrl = `${APIURL}/api/v1/users?page=${page}&pageSize=${pageSize}`
    const apiUrl = `${APIURL}/api/v1/anonymous/users?${query}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllUserAnonymousStories = async (page, pageSize, isPrivate, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/anonymous/users/stories?page=${page}&pageSize=${pageSize}&isPrivate=${isPrivate}&userId=${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getAllUserAnonymousMedia = async (page, pageSize, isPrivate, userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/anonymous/users/media?page=${page}&pageSize=${pageSize}&isPrivate=${isPrivate}&userId=${userID}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const createNewAnonymousUser = async (values) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/anonymous/users`

    let formData = new FormData()
    formData = values

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })
    localStorage.setItem('anonymousUserId', response.data.data.userId)
    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}
// /api/v1/users/check/username
export const checkUserName = async (userName) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    const apiUrl = `${APIURL}/api/v1/users/check/username`

    let formData = new FormData()
    formData = {
      userName : userName
    }

    let response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })
    console.log("2094",response)
    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdateUserProfilePicture = async (UID, fileData) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      anonymousprofile: fileData,
      fromWeb: true,
    }

    const apiUrl = `${APIURL}/api/v1/users/update/${UID}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUserMediaImages = async (uid) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${uid}/all/profile/media?fromWeb=true`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdateUserInterestAndQuestions = async (UID, interests, questions) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/update/${UID}`

    let formData = new FormData()
    formData = {
      interests: JSON.stringify(interests),
      questions: JSON.stringify(questions),
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// legal information plugins (policy)

export const getAllPolicies = async (uid) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/policies`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdatePolicy = async (policyId, htmlText) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/policies/${policyId}`

    let formData = new FormData()
    formData = {
      html: htmlText, //JSON.stringify(htmlText),
    }

    let response = await axios.put(apiUrl, formData, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

// anonymous users chat

export const getAllNormalUserChatMembers = async (page, pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/web/communications/all/app/chatMembers?page=${page}&pageSize=${pageSize}`

    let response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': `application/json`,
        'x-access-token': accessToken,
      },
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}
