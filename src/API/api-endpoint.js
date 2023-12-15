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

export const createInterest = async (name) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      name: name
    }

    const apiUrl = `${APIURL}/api/v1/masters/interests`

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

export const updateInterest = async (interestId,name) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      name: name
    }

    const apiUrl = `${APIURL}/api/v1/masters/interests/${interestId}`

    let response = await axios.put(apiUrl, formdata, {
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

export const removeInterest = async (interestId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/masters/interests/${interestId}`

    let response = await axios.delete(apiUrl,  {
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

export const addQuestions = async (question,order,inputType,genderId,questionIcon) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    console.log(typeof genderId)
    let formdata = new FormData()
    if(genderId === 0){
      formdata = {
        question: question,
        order:order,
        inputType:inputType, 
        questionIcon: questionIcon
      }
    }else{
      formdata = {
        question: question,
        order:order,
        inputType:inputType,
        genderId: parseInt(genderId),
        questionIcon: questionIcon
      }
    }
    

    const apiUrl = `${APIURL}/api/v1/masters/questions`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const updateQuestions = async (updatedData,file) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      question: updatedData.question,
      order:updatedData.order,
      inputType:updatedData.inputType,
      genderId:updatedData.genderId,
      questionIcon:file
    }

    const apiUrl = `${APIURL}/api/v1/masters/questions/${updatedData.questionId}`

    let response = await axios.put(apiUrl, formdata, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const addAnswer = async (answer,questionId) => {
  //
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formdata = new FormData()
    formdata = {
      answer :answer,
      questionId:questionId
    }

    const apiUrl = `${APIURL}/api/v1/masters/answers`

    let response = await axios.post(apiUrl, formdata, {
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': accessToken
      }
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
      answers :answers,
    }

    const apiUrl = `${APIURL}/api/v1/masters/answers`

    let response = await axios.put(apiUrl, formdata, {
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

export const getUserQuestionAnswerForProfile = async userID => {
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

export const createUserQuestionAnswerForProfile = async (userID, questionID,answerID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId : questionID,
      answerId : answerID
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions`

    let response = await axios.post(apiUrl, formdata,{
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

export const updateUserQuestionAnswerForProfile = async (userID, questionID,answerID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId : questionID,
      answerId : answerID
    }

    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions`

    let response = await axios.put(apiUrl, formdata,{
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

export const deleteUserQuestionAnswerForProfile = async (userID, questionID,answerID,userQuestionId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formdata = new FormData()
    formdata = {
      questionId : questionID,
      answerId : answerID
    }
      
    const apiUrl = `${APIURL}/api/v1/users/${userID}/questions/${userQuestionId}`

    let response = await axios.delete(apiUrl, {
      headers: {
        'Content-Type': `multipart/form-data;`,
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

export const updateMediaActionForUserMedia = async (userID, mediaID, type,typeValue) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let body = {
      [`${type}`]: typeValue,
     
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

export const createMediaActionForUserMedia = async (fileData,userID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    let formData = new FormData()
    formData = {
      profileMedia : fileData,
      mediaTypes : [{mediaType:"photo"}]  
    }
    
    const apiUrl = `${APIURL}/api/v1/users/${userID}/upload/profiles`

    let response = await axios.post(apiUrl,formData, {
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const setMediaAsAStoryForUserMedia = async (userID,mediaId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/${userID}/media/${mediaId}/upload/story`

    let response = await axios.post(apiUrl,{},{
      headers: {
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const getUserCreditsHistoryWithPagination = async (userID, page, pageSize, creditType, filterValue) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/users/${userID}/credits?page=${page}&pageSize=${pageSize}&creditType=${creditType}&creditHistoryTitle=${filterValue}`

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
    bio:newUserData.bio
  }

  const apiUrl = `${APIURL}/api/v1/users/update/${UID}`

  let response = await axios.put(apiUrl, formdata, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
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
      'x-access-token': accessToken
    }
  })

    return response.data
  } catch (error) { 
    return error.response.data
  }
  
}

export const UpdateSpotlightStatusByUID = async (UID,duration) => {
  try {
  let accessToken = localStorage.getItem('accessToken')
  let formData = new FormData()
  formData = {
    duration : duration
  }
                        
  const apiUrl = `${APIURL}/api/v1/users/${UID}/update/spotlight?fromWeb=true`

  let response = await axios.put(apiUrl, formData, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
  })

    return response.data
  } catch (error) { 
    return error.response.data
  }
  
}

export const UpdatePopularStatusByUID = async (UID,days,isPopular) => {
  try {
  let accessToken = localStorage.getItem('accessToken')
  let formData = new FormData()
  if(isPopular){
    formData = {
      days : days,
      isPopular : isPopular
    }
  }else{
    formData = {
      isPopular : isPopular
    }
  }
                   
  const apiUrl = `${APIURL}/api/v1/users/${UID}/update/popular`

  let response = await axios.put(apiUrl, formData, {
    headers: {
      'Content-Type': `application/json`,
      'x-access-token': accessToken
    }
  })

    return response.data
  } catch (error) { 
    return error.response.data
  }
  
}

/*For Chats */
export const getMessagesByUserID = async (userID,chatroomID,page,pageSize) => {
  try {
    let accessToken = localStorage.getItem('accessToken')

    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}/chatroom/${chatroomID}/messages?page=${page}&pageSize=${pageSize}`

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
        'x-access-token': accessToken
      }
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
        'x-access-token': accessToken
      }
    })

    return response.data.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const sendCreditInChat = async (senderID,receiverId,credit) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      receiverId : receiverId,
      credit : credit
    }

    const apiUrl = `${APIURL}/api/v1/users/${senderID}/send/credit`

    let response = await axios.post(apiUrl,formData, {
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

export const pinOrLikeChatMember = async (userID,roomID,chatID,action,currentActionValue) => {
  try {
    
    let accessToken = localStorage.getItem('accessToken')
    let formdata;
    if(action === 'pin'){
      formdata = {
        pin : currentActionValue 
      }
    }else if(action === 'like'){
      formdata = {
        like : currentActionValue
      }
    }
    
    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${userID}/chatroom/${roomID}/chatMember/${chatID}`
  
    let response = await axios.put(apiUrl, formdata, {
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

/*for story */

export const getAllUserStory = async (userId) => {
 
  try {
    
    let accessToken = localStorage.getItem('accessToken')  

    const apiUrl = `${APIURL}/api/v1/users/1/stories/view/${userId}`

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

export const CreateUserStory = async (fileData,userId) => {
  try {

    let formData = new FormData()
    formData = {
      media : fileData,
      mediaType : fileData.type.split('/')[0]
    }
    
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories`

    let response = await axios.post(apiUrl,formData,{
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const deleteUserStory = async (userId,mediaId) => {
  try { 
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${mediaId}`

    let response = await axios.delete(apiUrl,{
      headers: {
        'Content-Type': `multipart/form-data;`,
        'x-access-token': accessToken
      }
    })

    return response.data
  } catch (error) {
    console.log(error.message)

    return error.message
  }
}

export const UpdateUserStory = async (storyCredit,userId,storyId) => {
  try {
    storyCredit = parseInt(storyCredit)
    let formData = new FormData()
    if(storyCredit !== 0){
      formData = {
        isPrivate: true,
        storyCredit: storyCredit
      }
    }else{
      formData = {
        storyCredit: storyCredit
      }
    }
    
    
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${storyId}`

    let response = await axios.put(apiUrl,formData,{
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

export const ReUploadUserStory = async (userId,storyId) => {
  try {
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/${userId}/stories/${storyId}/re-upload`

    let response = await axios.post(apiUrl,{},{
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


// for send message

export const sendMessageUsingApi = async (message,userId,receiverId,chatRoomID,chatID) => {
  try {
    let accessToken = localStorage.getItem('accessToken')
    let formData = new FormData()
    formData = {
      message : message,
      senderId : userId,
      receiverId : receiverId,
      type : "text",
      chatRoomId : chatRoomID,
      chatId : chatID
    }
    const apiUrl = `${APIURL}/api/v1/communications/chat/users/${receiverId}/chatroom/${chatRoomID}/messages`

    let response = await axios.post(apiUrl,formData,{
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

export const getAllMedia = async (page,pageSize,isPrivate,userID) => {
 
  try {
    
    let accessToken = localStorage.getItem('accessToken')  
    //  /api/v1/users/profile/media?page=1&pageSize=10&isPrivate=false&userId=35
    const apiUrl = `${APIURL}/api/v1/users/profile/media?page=${page}&pageSize=${pageSize}&isPrivate=${isPrivate}&userId=${userID}`

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

export const deleteSelectedMedia = async (MediaId) => {
  try {
   
    let formData  =  {
      mediaIds: MediaId,
      action: 'delete'
    }
    
    let accessToken = localStorage.getItem('accessToken')  
    
    const apiUrl = `${APIURL}/api/v1/users/media/admin`

    let response = await axios.put(apiUrl,formData,{
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
