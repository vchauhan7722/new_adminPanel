/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {
  addUserInterest,
  getAllInterest,
  getCitiesBYSearch,
  getUserQuetionAnswerForProfile,
  removeUserInterest,
} from '../../../../../API/api-endpoint'

const EditProfile = (props) => {
  const {user} = props
  const intl = useIntl()
  let userID = localStorage.getItem('userId')

  const [profileDetailsFormValue, setProfileDetailsFormValue] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [questionList, setQuestionList] = useState<any>([])
  const [allInterestList, setallInterestList] = useState<any>([])
  const [selectedInterestList, setselectedInterestList] = useState<any>(user.userInterests)
  const [selectedListQuestionList, setSelectedQuestionList] = useState<any>(
    user.userQuestionAnswers
  )

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    getAllQuestionAnswer()
    getAllInterestList()
  }, [])

  const getAllQuestionAnswer = async () => {
    let result = await getUserQuetionAnswerForProfile(userID)
    setQuestionList(result)
  }

  const getAllInterestList = async () => {
    let result = await getAllInterest()
    setallInterestList(result)
  }

  const addUserInterestInList = async (interestID: any, interestName: any) => {
    let result = await addUserInterest(userID, interestID)
    if (result.status == 200) {
      let newInterest = {
        interestId: interestID,
        interests: {
          name: interestName,
        },
      }
      let oldSelectedInterest = [...selectedInterestList]
      oldSelectedInterest.push(newInterest)
      setselectedInterestList(oldSelectedInterest)
    }
  }

  const removeUserInterestInList = async (interestID: any) => {
    let result = await removeUserInterest(userID, interestID)
    if (result.status === 200) {
      let index = selectedInterestList.findIndex((item: any) => item.interestId === interestID)
      let oldSelectedInterest = [...selectedInterestList]
      oldSelectedInterest.splice(index, 1)
      setselectedInterestList(oldSelectedInterest)
    }
  }

  const handleSearchChange = async (event) => {
    const inputValue = event.target.value
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
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>Full Name</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Full name'
                  type='text'
                  name='fullName'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>User Name</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='User Name'
                  type='text'
                  name='userName'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>Email</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Email'
                  type='email'
                  name='email'
                  className={clsx('form-control form-control-solid')}
                  autoComplete='off'
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>Mobile No</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Mobile No'
                  type='number'
                  name='mobileNo'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                />
                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>Location</label>
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
              <label className='col-lg-4 required fw-bold fs-6 mt-2'>Birth Date</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <input
                  placeholder='Birthdate'
                  type='date'
                  name='birthDate'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                />

                {/* end::Input */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 form-label fs-6 fw-bold mt-2'>Gender:</label>
              <div className='col-lg-8'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='gender'
                  data-hide-search='true'
                >
                  <option value=''></option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='lesibian'>Lesibian</option>
                  <option value='gay'>Gay</option>
                </select>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 required fw-bold fs-6 mb-2'>Bio</label>
              <div className='col-lg-8'>
                {/* begin::Input */}
                <textarea
                  name='bio'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                />

                {/* end::Input */}
              </div>
            </div>
          </div>

          <div className='col-lg-4'>
            <h3 className='mb-7'>Profile Questions</h3>
            {questionList.map((q: any, index: any) => {
              return (
                <div key={index} className='row mb-6'>
                  <label className='col-lg-6 form-label fs-6 fw-bold'>{q.question}</label>
                  <div className='col-lg-6'>
                    <select
                      className='form-select form-select-solid fw-bolder'
                      data-kt-select2='true'
                      data-placeholder='Select option'
                      data-allow-clear='true'
                      data-kt-user-table-filter='gender'
                      data-hide-search='true'
                      defaultValue='-'
                    >
                      <option value='-'>select Option</option>
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
                  className='badge bg-primary text-center text-white me-3 mb-5 fs-6  fw-bold'
                  onClick={() => removeUserInterestInList(interest.interestId)}
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
                      className='text-center me-3 mb-5 fs-6 fw-bold badge badge-light'
                      onClick={() => addUserInterestInList(interest.interestId, interest.name)}
                    >
                      {interest.name}
                    </div>{' '}
                  </>
                )
              })}
          </div>
        </div>

        <div className='card-footer d-flex justify-content-start p-4'>
          <button type='submit' className='btn btn-primary'>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
