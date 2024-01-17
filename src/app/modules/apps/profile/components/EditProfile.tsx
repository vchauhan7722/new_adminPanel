/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  UpdateUserDetailsByUID,
  addUserInterest,
  createUserQuestionAnswerForProfile,
  deleteUserQuestionAnswerForProfile,
  getAllInterest,
  getCitiesBYSearch,
  getUserQuestionAnswerForProfile,
  removeUserInterest,
  updateUserQuestionAnswerForProfile,
} from '../../../../../API/api-endpoint'
import '../../../../../_metronic/assets/css/react-phone-number-input.css'
import ToastUtils, {ErrorToastUtils} from '../../../../../utils/ToastUtils'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const EditProfile = (props) => {
  const {user, setUserUpdateFlag, userUpdateFlag} = props
  const intl = useIntl()
  let userID = localStorage.getItem('userId')

  const [isAnyProfileChanges, setisAnyProfileChanges] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [questionList, setQuestionList] = useState<any>([])
  const [allInterestList, setallInterestList] = useState<any>([])
  const [selectedInterestList, setselectedInterestList] = useState<any>(user.userInterests)
  const [preSelectedInterestList, setPreselectedInterestList] = useState<any>([])
  const [selectedListQuestionList, setSelectedQuestionList] = useState<any>(
    user.userQuestionAnswers
  )
  const [preSelectedListQuestionList, setPreSelectedQuestionList] = useState<any>([])
  const [profileDetailsFormValue, setProfileDetailsFormValue] = useState({
    fullName: '',
    userName: '',
    email: '',
    mobileNo: '',
    countryCode: '',
    city: '',
    state: '',
    country: '',
    birthDate: '',
    gender: '',
    bio: '',
  })

  const [oldUserName, setOldUserName] = useState(user?.userName)

  useEffect(() => {
    console.log('user.genderId', user.genderId)
    setProfileDetailsFormValue({
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      mobileNo: user.mobileNo,
      countryCode: user.countryCode,
      city: user.city,
      state: user.state,
      country: user.country,
      birthDate: user.birthDate,
      gender: user.genderId,
      bio: user.bio,
    })
    setSearchTerm(`${user.city}, ${user.state}, ${user.country}`)
  }, [])

  useEffect(() => {
    getAllQuestionAnswer()
    getAllInterestList()
  }, [])

  const getAllQuestionAnswer = async () => {
    let result = await getUserQuestionAnswerForProfile(userID)
    setQuestionList(result)
  }

  const getAllInterestList = async () => {
    let result = await getAllInterest()
    setallInterestList(result)
  }

  // const handleInterestChange = (interestID: any, interestName: any, id: any) => {
  //   let olderId = id === undefined ? null : id
  //   let index = selectedInterestList.findIndex((item: any) => item.interestId === interestID)
  //   let preIndex =
  //     preSelectedInterestList.length !== 0 &&
  //     preSelectedInterestList.findIndex((item: any) => item.interestId === interestID)

  //   // here we have check in selectedInterestList array if id and interestId match then that data add into preSelectedInterestList with id
  //   let found = selectedInterestList.findIndex(
  //     (item: any) => item.interestId === interestID && item.id === olderId // here maybe both are undefined   item.id === id
  //   )

  //   if (found !== -1) {
  //     // if interest already selected and we have to delete
  //     let new_Interest = {
  //       interestId: interestID,
  //       id: id,
  //     }
  //     let preSelectedInterest = [...preSelectedInterestList]
  //     preSelectedInterest.push(new_Interest)
  //     setPreselectedInterestList(preSelectedInterest)

  //     let oldSelectedInterest = [...selectedInterestList]
  //     oldSelectedInterest.splice(index, 1)
  //     setselectedInterestList(oldSelectedInterest)

  //     console.log('109 preSelectedInterest', preSelectedInterest)
  //     console.log('114', oldSelectedInterest)
  //   } else if (index === -1) {
  //     // here also we have to check in preSelectedInterest if interestId are present then remove from it

  //     let preSelectedInterestIndex = preSelectedInterestList.findIndex(
  //       (item: any) => item.interestId === interestID
  //     )

  //     // add interest
  //     let newInterest = {
  //       interestId: interestID,
  //       interests: {
  //         name: interestName,
  //       },
  //     }
  //     let oldSelectedInterest = [...selectedInterestList]
  //     oldSelectedInterest.push(newInterest)
  //     setselectedInterestList(oldSelectedInterest)

  //     if (preSelectedInterestIndex === -1) {
  //       let new_Interest = {
  //         interestId: interestID,
  //       }
  //       let preSelectedInterest = [...preSelectedInterestList]
  //       preSelectedInterest.push(new_Interest)
  //       setPreselectedInterestList(preSelectedInterest)
  //     } else {
  //       let preSelectedInterest = [...selectedInterestList]
  //       oldSelectedInterest.splice(preSelectedInterestIndex, 1)
  //       setPreselectedInterestList(preSelectedInterest)
  //     }
  //   } else {
  //     // remove interest
  //     let index = selectedInterestList.findIndex((item: any) => item.interestId === interestID)
  //     let oldSelectedInterest = [...selectedInterestList]
  //     oldSelectedInterest.splice(index, 1)
  //     setselectedInterestList(oldSelectedInterest)

  //     // this is for predefined array
  //     let preSelectedInterest = [...preSelectedInterestList]
  //     preSelectedInterest.splice(preIndex, 1)
  //     setPreselectedInterestList(preSelectedInterest)
  //   }
  // }

  const handleInterestChange = (interestId: any, interestName: any, id: any) => {
    setisAnyProfileChanges(true)
    const olderId = id === undefined ? null : id
    const index = selectedInterestList.findIndex((item) => item.interestId === interestId)
    const preIndex = preSelectedInterestList.findIndex((item) => item.interestId === interestId)
    const found = selectedInterestList.findIndex(
      (item) => item.interestId === interestId && item.id === olderId
    )

    const newInterest = {
      interestId: interestId,
      interests: {
        name: interestName,
      },
    }

    if (found !== -1) {
      // Remove interest
      const preSelectedInterest = [...preSelectedInterestList, {interestId, id}]
      //console.log('176 preSelectedInterest', preSelectedInterest)
      setPreselectedInterestList(preSelectedInterest)
      const oldSelectedInterest = selectedInterestList.filter(
        (item) => item.interestId !== interestId
      )
      //console.log('181 oldSelectedInterest', oldSelectedInterest)
      setselectedInterestList(oldSelectedInterest)
    } else if (index === -1) {
      // Add interest
      const oldSelectedInterest = [...selectedInterestList, newInterest]
      setselectedInterestList(oldSelectedInterest)

      if (preIndex === -1) {
        //here we have to check first in preSelectedInterest if exists then remove from this

        const oldpreSelectedInterestIndex = preSelectedInterestList.findIndex(
          (item: any) => item.interestId === interestId
        )

        //console.log('oldpreSelectedInterestIndex', oldpreSelectedInterestIndex)

        if (oldpreSelectedInterestIndex !== -1) {
          const preSelectedInterest = [...preSelectedInterestList]
          preSelectedInterest.splice(oldpreSelectedInterestIndex, 1)
          setPreselectedInterestList(preSelectedInterest)
          //console.log('199 preSelectedInterest', preSelectedInterest)
        } else {
          const preSelectedInterest = [...preSelectedInterestList, {interestId}]
          //console.log('202 preSelectedInterest', preSelectedInterest)
          setPreselectedInterestList(preSelectedInterest)
        }
      } else {
        const preSelectedInterest = preSelectedInterestList.filter(
          (item) => item.interestId !== interestId
        )
        //console.log('209 preSelectedInterest', preSelectedInterest)
        setPreselectedInterestList(preSelectedInterest)
      }
    } else {
      // Remove interest
      const oldSelectedInterest = selectedInterestList.filter(
        (item) => item.interestId !== interestId
      )
      //console.log('217 oldSelectedInterest', oldSelectedInterest)
      setselectedInterestList(oldSelectedInterest)

      // Remove from predefined array
      const preSelectedInterest = preSelectedInterestList.filter(
        (item) => item.interestId !== interestId // = !== interestID
      )
      //console.log('224 preSelectedInterest', preSelectedInterest)
      setPreselectedInterestList(preSelectedInterest)
    }
  }

  const handleSearchChange = async (event) => {
    console.log(event.target.value)
    const inputValue = event.target.value

    let spiltData = inputValue.split(',')
    setProfileDetailsFormValue({
      ...profileDetailsFormValue,
      city: spiltData[0],
      state: spiltData[1],
      country: spiltData[2],
    })

    setSearchTerm(inputValue)

    // Filter suggestions based on inputValue
    // const filteredSuggestions = searchData.filter((item) => {
    //   return item.toLowerCase().includes(inputValue.toLowerCase())
    // })
    if (inputValue.length > 3) {
      const filteredSuggestions = await getCitiesBYSearch(inputValue)

      setSuggestions(filteredSuggestions.data)
      setActiveSuggestionIndex(-1)
    } else if (inputValue.length === 0) {
      setSuggestions([])
    }
  }

  const handleProfileChange = (e) => {
    setisAnyProfileChanges(true)
    let name = e.target.name
    let value = e.target.value
    // let newValue = value.substring(1, value.length)
    setProfileDetailsFormValue({...profileDetailsFormValue, [name]: value})
    // if (name !== 'countryCode') {
    //   setProfileDetailsFormValue({...profileDetailsFormValue, [name]: value})
    // } else {
    //   let newValue = value.substring(1, value.length)
    //   setProfileDetailsFormValue({...profileDetailsFormValue, [name]: newValue})
    // }
  }

  // const handleChangeQuestions = async (e: any, questionID: any) => {
  //   setisAnyProfileChanges(true)
  //   const matchedAnswerIds = selectedListQuestionList.filter(
  //     (item) => item.questionId === questionID
  //   )

  //   let answerId = parseInt(e.target.value)
  //   if (e.target.value.length === 0) {
  //     // delete the questions
  //     let userQuestionID = matchedAnswerIds[0].userQuestionId

  //     // first check in preSelectedListQuestionList if exists then remove that object else add
  //     let preSelectedListQuestionIndex = preSelectedListQuestionList.findIndex(
  //       (item) => item.userQuestionId === userQuestionID
  //     )

  //     if (preSelectedListQuestionIndex !== -1) {
  //       // remove object
  //       let preSelectedListQuestionArray = [...preSelectedListQuestionList]
  //       console.log('preSelectedListQuestionArray length', preSelectedListQuestionArray.length)
  //       //if (preSelectedListQuestionArray.length !== 0) {
  //       preSelectedListQuestionArray.splice(preSelectedListQuestionIndex, 1)
  //       console.log('295 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //       setPreSelectedQuestionList(preSelectedListQuestionArray)
  //       //}

  //       let deletedQuestions = {
  //         userQuestionId: userQuestionID, // userQuestion Id this is primary key of userquestionanswers table
  //         type: 'delete', // if want to delete question then send type: "delete"
  //       }

  //       let updatedArray =
  //         preSelectedListQuestionArray.length === 0
  //           ? preSelectedListQuestionList
  //           : preSelectedListQuestionArray

  //       let preSelectedListQuestionArray1 = [...updatedArray, deletedQuestions]
  //       console.log('304 preSelectedListQuestionArray', preSelectedListQuestionArray1)
  //       setPreSelectedQuestionList(preSelectedListQuestionArray1)
  //     } else {
  //       // add object
  //       let deletedQuestions = {
  //         userQuestionId: userQuestionID, // userQuestion Id this is primary key of userquestionanswers table
  //         type: 'delete', // if want to delete question then send type: "delete"
  //       }

  //       let preSelectedListQuestionArray = [...preSelectedListQuestionList, deletedQuestions]
  //       console.log('314 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //       setPreSelectedQuestionList(preSelectedListQuestionArray)
  //     }
  //   } else {
  //     // update and create the questions
  //     if (matchedAnswerIds.length !== 0) {
  //       //create
  //       let userQuestionID = matchedAnswerIds[0].userQuestionId

  //       // first check in preSelectedListQuestionList if exists then remove that object else add
  //       let preSelectedListQuestionIndex = preSelectedListQuestionList.findIndex(
  //         (item) => item.userQuestionId === userQuestionID
  //       )

  //       console.log('preSelectedListQuestionIndex', preSelectedListQuestionIndex)

  //       if (preSelectedListQuestionIndex !== -1) {
  //         // remove object
  //         let preSelectedListQuestionArray = [...preSelectedListQuestionList]
  //         console.log('preSelectedListQuestionArray length', preSelectedListQuestionArray.length)
  //         //if (preSelectedListQuestionArray.length !== 0) {
  //         preSelectedListQuestionArray.splice(preSelectedListQuestionIndex, 1)
  //         console.log('333 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //         //setPreSelectedQuestionList(preSelectedListQuestionArray)
  //         //}

  //         let updatedQuestions = {
  //           userQuestionId: userQuestionID,
  //           answerId: answerId, // userQuestion Id this is primary key of userquestionanswers table
  //           type: 'edit', // if want to delete question then send type: "delete"
  //         }

  //         // let updatedArray =
  //         //   preSelectedListQuestionArray.length === 0
  //         //     ? preSelectedListQuestionList
  //         //     : preSelectedListQuestionArray
  //         // console.log('updatedArray', updatedArray)

  //         let preSelectedListQuestionArray1 = [...preSelectedListQuestionArray, updatedQuestions]
  //         console.log('343 preSelectedListQuestionArray', preSelectedListQuestionArray1)
  //         setPreSelectedQuestionList(preSelectedListQuestionArray1)
  //       } else {
  //         // add object
  //         let updatedQuestions = {
  //           userQuestionId: userQuestionID,
  //           answerId: answerId, // userQuestion Id this is primary key of userquestionanswers table
  //           type: 'edit', // if want to delete question then send type: "delete"
  //         }

  //         let preSelectedListQuestionArray = [...preSelectedListQuestionList, updatedQuestions]
  //         console.log('354 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //         setPreSelectedQuestionList(preSelectedListQuestionArray)
  //       }
  //     } else {
  //       // update
  //       let userQuestionID, preSelectedListQuestionIndex
  //       if (matchedAnswerIds[0] !== undefined) {
  //         userQuestionID = matchedAnswerIds[0].userQuestionId
  //         preSelectedListQuestionIndex = preSelectedListQuestionList.findIndex(
  //           (item) => item.userQuestionId === userQuestionID
  //         )
  //       }

  //       // first check in preSelectedListQuestionList if exists then remove that object else add

  //       if (preSelectedListQuestionIndex !== -1) {
  //         // remove object
  //         let preSelectedListQuestionArray = [...preSelectedListQuestionList]
  //         console.log('preSelectedListQuestionArray length', preSelectedListQuestionArray.length)
  //         if (preSelectedListQuestionArray.length !== 0) {
  //           preSelectedListQuestionArray.splice(preSelectedListQuestionIndex, 1)
  //           console.log('372 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //           setPreSelectedQuestionList(preSelectedListQuestionArray)
  //         }

  //         let updatedQuestions = {
  //           questionId: questionID,
  //           answerId: answerId, // userQuestion Id this is primary key of userquestionanswers table
  //         }

  //         let preSelectedListQuestionArray1 = [...preSelectedListQuestionList, updatedQuestions]
  //         console.log('381 preSelectedListQuestionArray', preSelectedListQuestionArray1)
  //         setPreSelectedQuestionList(preSelectedListQuestionArray1)
  //       } else {
  //         // add object
  //         let updatedQuestions = {
  //           questionId: questionID,
  //           answerId: answerId, // userQuestion Id this is primary key of userquestionanswers table
  //         }

  //         let preSelectedListQuestionArray = [...preSelectedListQuestionList, updatedQuestions]
  //         console.log('379 preSelectedListQuestionArray', preSelectedListQuestionArray)
  //         setPreSelectedQuestionList(preSelectedListQuestionArray)
  //       }
  //     }
  //   }
  // }

  const handleChangeQuestions = async (e: any, questionID: any) => {
    setisAnyProfileChanges(true)

    const matchedAnswer = selectedListQuestionList.find((item) => item.questionId === questionID)
    const answerId = parseInt(e.target.value)

    const processDeletedQuestions = (userQuestionID: any) => {
      const deletedQuestions = {
        userQuestionId: userQuestionID,
        type: 'delete',
      }

      setPreSelectedQuestionList((prevList) =>
        prevList.filter((item) => item.userQuestionId !== userQuestionID)
      )
      setPreSelectedQuestionList((prevList) => [...prevList, deletedQuestions])
    }

    const processUpdatedQuestions = (userQuestionID: any) => {
      const updatedQuestions = {
        userQuestionId: userQuestionID,
        answerId: answerId,
        type: 'edit',
      }

      setPreSelectedQuestionList((prevList) => [
        ...prevList.filter((item) => item.userQuestionId !== userQuestionID),
        updatedQuestions,
      ])
    }

    const processCreatedQuestions = () => {
      const newQuestionID = questionID // logic to get or generate a new unique question ID;
      const createdQuestions = {
        questionId: newQuestionID,
        answerId: answerId,
      }

      // Check if the questionId already exists, remove it, and then add the new question
      const existingQuestionIndex = preSelectedListQuestionList.findIndex(
        (item) => item.questionId === newQuestionID
      )

      if (existingQuestionIndex !== -1) {
        setPreSelectedQuestionList((prevList) => {
          const updatedList = [...prevList]
          updatedList.splice(existingQuestionIndex, 1)
          return updatedList
        })
      }

      setPreSelectedQuestionList((prevList) => [...prevList, createdQuestions])
    }

    if (e.target.value.length === 0) {
      if (matchedAnswer) {
        processDeletedQuestions(matchedAnswer.userQuestionId)
      }
    } else {
      if (matchedAnswer) {
        processUpdatedQuestions(matchedAnswer.userQuestionId)
      } else {
        processCreatedQuestions()
      }
    }
  }

  const updateProfile = async () => {
    var usernameInput = document.getElementById('userName') as HTMLInputElement
    if (!usernameInput.checkValidity()) {
      ToastUtils({
        type: 'error',
        message: 'Only small letters, numbers (0-9), and underscores are allowed in Username',
      })
    } else if (profileDetailsFormValue?.mobileNo.length !== 10) {
      ToastUtils({type: 'error', message: 'Enter 10 digits Number Only'})
    } else {
      let updatedData: any
      // this is used for checked username if it is updated or not
      if (profileDetailsFormValue.userName === oldUserName) {
        let oldData = {
          fullName: profileDetailsFormValue.fullName,
          email: profileDetailsFormValue.email,
          mobileNo: profileDetailsFormValue.mobileNo,
          countryCode: profileDetailsFormValue.countryCode,
          city: profileDetailsFormValue.city,
          state: profileDetailsFormValue.state,
          country: profileDetailsFormValue.country,
          birthDate: profileDetailsFormValue.birthDate,
          gender: profileDetailsFormValue.gender,
          bio: profileDetailsFormValue.bio,
        }
        updatedData = oldData
      } else {
        updatedData = profileDetailsFormValue
      }
      updatedData.interests = preSelectedInterestList
      updatedData.questions = preSelectedListQuestionList

      let result = await UpdateUserDetailsByUID(userID, updatedData)
      if (result.status === 200) {
        setUserUpdateFlag(userUpdateFlag + 1)
        ToastUtils({type: 'success', message: 'Profile Update SuccessFully'})
        setisAnyProfileChanges(false)
      } else {
        ToastUtils({type: 'error', message: result.message})
      }
    }
  }

  const getDefaultValueOfAnswer = (questionID) => {
    const matchedAnswerIds = selectedListQuestionList
      .filter((item) => item.questionId === questionID)
      .map((item) => item.answerId)
    return matchedAnswerIds[0]
  }

  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>
            {intl.formatMessage({id: 'USERMANAGEMENT.USERDETAILS.TAB.OVERVIEW.EDITPROFILEDETAILS'})}
          </h3>
        </div>
      </div>

      <div
        className='card-body p-9 d-flex flex-column scroll-y me-n7'
        id='kt_modal_add_user_scroll'
        data-kt-scroll='true'
        data-kt-scroll-activate='{default: false, lg: true}'
        data-kt-scroll-max-height='auto'
        data-kt-scroll-dependencies='#kt_modal_add_user_header'
        data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
        data-kt-scroll-offset='300px'
      >
        <div className='row '>
          <div className='col-lg-4'>
            <h3 className='mb-7'>Profile Details</h3>
            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Full Name</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Full name'
                  type='text'
                  name='fullName'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  value={profileDetailsFormValue?.fullName}
                  onChange={(e) => handleProfileChange(e)}
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>User Name</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='User Name'
                  type='text'
                  name='userName'
                  id='userName'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  pattern='[a-z0-9_]+'
                  value={profileDetailsFormValue?.userName}
                  onChange={(e) => handleProfileChange(e)}
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Email</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Email'
                  type='email'
                  name='email'
                  className={clsx('form-control form-control-solid')}
                  autoComplete='off'
                  value={profileDetailsFormValue?.email}
                  onChange={(e) => handleProfileChange(e)}
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Mobile No</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                {/* <input
                  placeholder='Country Code'
                  type='text'
                  name='countryCode'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  value={'+' + profileDetailsFormValue?.countryCode}
                  onChange={(e) => handleProfileChange(e)}
                /> */}
                <PhoneInput
                  country={'in'}
                  value={profileDetailsFormValue?.countryCode + profileDetailsFormValue?.mobileNo}
                  onChange={(phone: string, country: any) => {
                    if (phone.length !== 0) {
                      const reducedPhone = phone.replace(country.dialCode, '')
                      setProfileDetailsFormValue({
                        ...profileDetailsFormValue,
                        ['countryCode']: country.dialCode,
                        ['mobileNo']: reducedPhone,
                      })
                      setisAnyProfileChanges(true)
                    }
                  }}
                  inputClass='w-100'
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Location</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                {/* <input
                  placeholder='City'
                  type='text'
                  name='city'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                /> */}
                <input
                  id='search-input'
                  placeholder='Location'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={clsx('form-control form-control-solid ')}
                />
                <div className={suggestions.length > 3 ? clsx('h-200px scroll-y') : ''}>
                  <ul
                    className='list-group suggestions'
                    style={{
                      display: suggestions.length > 0 ? 'block' : 'none',
                    }}
                  >
                    {suggestions.map((suggestion: any, index: any) => {
                      const isActive = index === activeSuggestionIndex
                      return (
                        <li
                          key={index}
                          className={`list-group-item ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setSearchTerm(
                              `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
                            )
                            setProfileDetailsFormValue({
                              ...profileDetailsFormValue,
                              city: suggestion.name,
                              state: suggestion.state,
                              country: suggestion.country,
                            })
                            setActiveSuggestionIndex(-1)
                            setSuggestions([])
                          }}
                        >
                          {`${suggestion.name}, ${suggestion.state}, ${suggestion.country}`}
                        </li>
                      )
                    })}
                  </ul>
                </div>
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Birth Date</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Birthdate'
                  type='date'
                  name='birthDate'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  value={new Date(profileDetailsFormValue?.birthDate).toLocaleDateString('en-CA')}
                  onChange={(e) => handleProfileChange(e)}
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 form-label fs-6 fw-bold mt-3'>Gender:</label>
              <div className='col-lg-8'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='gender'
                  data-hide-search='true'
                  name='gender'
                  defaultValue={user?.genderId}
                  //value={profileDetailsFormValue?.gender}
                  onChange={(e) => handleProfileChange(e)}
                >
                  <option value={'1'}>Male</option>
                  <option value={'2'}>Female</option>
                </select>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-3'>Bio</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <textarea
                  name='bio'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  rows={5}
                  value={profileDetailsFormValue?.bio}
                  onChange={(e) => handleProfileChange(e)}
                />

                {/* end::Input */}
              </div>
            </div>

            {/* <div className='row mt-9'>
              <div className='col-3'></div>
              <div className='col-6'>
                <button
                  type='submit'
                  className={!isAnyProfileChanges ? 'btn btn-secondary' : 'btn btn-primary'}
                  onClick={updateProfile}
                  disabled={!isAnyProfileChanges}
                >
                  Save Changes
                </button>
              </div>
            </div> */}
          </div>

          <div className='col-lg-4'>
            <h3 className='mb-7'>Profile Questions</h3>
            {questionList.map((q: any, index: any) => {
              return (
                <div key={index} className='row mb-6'>
                  <label className='col-lg-6 form-label mt-3 fs-6 fw-bold'>{q.question}</label>
                  <div className='col-lg-6'>
                    <select
                      className='form-select form-select-solid fw-bolder'
                      data-kt-select2='true'
                      data-placeholder='Select option'
                      data-allow-clear='true'
                      name='question'
                      data-hide-search='true'
                      defaultValue={getDefaultValueOfAnswer(q.questionId)}
                      onChange={(e) => handleChangeQuestions(e, q.questionId)}
                    >
                      <option value=''>select Option</option>
                      {q.answers.map((a: any, index: any) => {
                        return (
                          <option key={index} value={a.answerId}>
                            {a.answer}
                          </option>
                        )
                      })}

                      {/* <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='lesibian'>Lesibian</option>
                      <option value='gay'>Gay</option> */}
                    </select>
                  </div>
                </div>
              )
            })}
          </div>

          <div className='col-lg-4'>
            <h3 className='mb-7'>Profile Interest</h3>
            {selectedInterestList.map((interest: any, index: any) => {
              return (
                <div
                  key={index}
                  className='badge bg-primary text-center text-white me-3 mb-5 fs-6 fw-bold pointer'
                  //onClick={() => removeUserInterestInList(interest.interestId)}
                  onClick={() => handleInterestChange(interest.interestId, '', interest.id)}
                >
                  {interest.interests.name}
                </div>
              )
            })}
            {allInterestList
              .filter((item) => {
                return !selectedInterestList.some(
                  (profileItem: any) => profileItem.interestId === item.interestId
                )
              })
              .map((interest: any, index: any) => {
                return (
                  <>
                    <div
                      key={index}
                      className='text-center me-3 mb-5 fs-6 fw-bold badge badge-light pointer'
                      //onClick={() => addUserInterestInList(interest.interestId, interest.name)}
                      onClick={() =>
                        handleInterestChange(interest.interestId, interest.name, interest.id)
                      }
                    >
                      {interest.name}
                    </div>{' '}
                  </>
                )
              })}
          </div>
        </div>
      </div>
      <div className='card-header d-flex justify-content-end'>
        <div>
          <button
            type='submit'
            className={!isAnyProfileChanges ? 'btn btn-secondary ' : 'btn btn-primary '}
            onClick={updateProfile}
            disabled={!isAnyProfileChanges}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
