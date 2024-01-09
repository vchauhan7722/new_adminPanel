/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState} from 'react'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {
  checkUserName,
  createNewAnonymousUser,
  getCitiesBYSearch,
} from '../../../../../../../../../API/api-endpoint'
import clsx from 'clsx'
import ToastUtils, {ErrorToastUtils} from '../../../../../../../../../utils/ToastUtils'
import AsyncTypeahead from 'react-bootstrap-typeahead/types/components/AsyncTypeahead'

const getDate = () => {
  const currentDate = new Date()
  const maxDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  )
  let maxDateString = maxDate.toISOString().split('T')[0]
  return maxDateString
}

const Step1 = (props: any) => {
  const {submitStep, prevStep} = props
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLocationVisible, setIsLocationVisible] = useState(false)
  const [currentUserName, setCurrentUserName] = useState('')
  const [step1Details, setStep1Details] = useState<any>({
    fullName: '',
    userName: '',
    genderId: 2,
    birthDate: getDate(),
    country: '',
    state: '',
    city: '',
    bio: '',
    lat: '',
    lng: '',
  })

  useEffect(() => {
    const step1 = JSON.parse(localStorage.getItem('step1Details') || '[]') || []
    if (step1.length !== 0) {
      console.log('step1', step1?.genderId)
      setIsLocationVisible(true)
      setStep1Details({
        fullName: step1?.fullName,
        userName: step1?.userName,
        genderId: parseInt(step1?.genderId),
        birthDate: step1?.birthDate,
        country: step1?.country,
        state: step1?.state,
        city: step1?.city,
        bio: step1?.bio,
        lat: step1?.lat,
        lng: step1?.lng,
      })
      setCurrentUserName(step1?.userName)
    }
  }, [])

  const handleStep1Change = (e) => {
    let name = e.target.name
    let value = e.target.value

    setStep1Details({...step1Details, [name]: value})
  }

  const handleSearchChange = async (query: string) => {
    setIsLoading(true)
    const inputValue = query

    if (inputValue.length > 3) {
      const filteredSuggestions = await getCitiesBYSearch(inputValue)
      setIsLoading(false)
      setSuggestions(filteredSuggestions.data)
    } else if (inputValue.length === 0) {
      setSuggestions([])
      setIsLoading(false)
    }
  }

  const onSubmitStep1 = async () => {
    if (step1Details.fullName.length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter Full Name'})
    } else if (step1Details.userName.length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter User Name'})
    } else if (
      step1Details.country.length === 0 &&
      step1Details.state.length === 0 &&
      step1Details.city.length === 0
    ) {
      ToastUtils({type: 'error', message: 'Please Select Location'})
    } else {
      // here we can check if userName is already exists or not
      if (currentUserName !== step1Details.userName) {
        let response = await checkUserName(step1Details.userName)
        if (response.status === 200) {
          setIsLocationVisible(false)
          localStorage.setItem('step1Details', JSON.stringify(step1Details))
          submitStep()
        } else {
          ToastUtils({type: 'error', message: response.message})
        }
      } else {
        localStorage.setItem('step1Details', JSON.stringify(step1Details))
        submitStep()
        setIsLocationVisible(false)
      }

      // store data in local and add useEffect for assign data
      // let result = await createNewAnonymousUser(step1Details)
      // if (result.status === 200) {
      //   submitStep(result.data.userId)
      //   ToastUtils({type: 'success', message: 'Saved SuccessFully'})
      // } else {
      //   ErrorToastUtils()
      // }
    }
  }

  return (
    <div className='w-100'>
      <div className='pb-3 pb-lg-3'>
        <h2 className='fw-bolder text-dark'>Basic Account Details</h2>
        <div className='text-gray-400 fw-bold fs-6'>Fill The Basic Details .</div>
      </div>

      <div className='row'>
        {' '}
        <div className='fv-row mb-2 col-6'>
          <label className='form-label required'>Full Name</label>

          <input
            type='text'
            name='fullName'
            className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
            autoComplete='off'
            value={step1Details?.fullName}
            onChange={(e) => handleStep1Change(e)}
          />
        </div>
        <div className='fv-row mb-2 col-6'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>User Name</span>
          </label>
          <input
            type='text'
            name='userName'
            className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
            autoComplete='off'
            value={step1Details?.userName}
            onChange={(e) => handleStep1Change(e)}
          />
        </div>
      </div>

      <div className='row'>
        <div className='fv-row mb-2 col-6'>
          <label className='form-label required'>Gender</label>

          <select
            className='form-select form-select-solid fw-bolder'
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='true'
            data-kt-user-table-filter='gender'
            data-hide-search='true'
            name='genderId'
            defaultValue={step1Details?.genderId}
            //value={profileDetailsFormValue?.gender}
            onChange={(e) => handleStep1Change(e)}
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
          </select>
        </div>
        <div className='fv-row mb-2 col-6'>
          <label className='form-label required'>BirthDate</label>

          <input
            placeholder='Birthdate'
            type='date'
            name='birthDate'
            className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
            autoComplete='off'
            value={new Date(step1Details?.birthDate).toLocaleDateString('en-CA')}
            onChange={(e) => handleStep1Change(e)}
            max={getDate()}
          />
        </div>
      </div>

      <div className='fv-row mb-2 '>
        <label className='form-label required'>Location</label>
        {isLocationVisible ? (
          <input
            type='text'
            className='form-control form-control-lg form-control-solid'
            placeholder='Register Date'
            name='state'
            value={`${step1Details?.city}, ${step1Details?.state}, ${step1Details?.country}`}
            onFocus={(e) => setIsLocationVisible(false)}
          />
        ) : (
          <AsyncTypeahead
            filterBy={['name', 'state', 'country']}
            id='async-example'
            isLoading={isLoading}
            minLength={3}
            onSearch={handleSearchChange}
            options={suggestions}
            labelKey={(option: any) => `${option?.name}, ${option?.state}, ${option?.country}`}
            onChange={(e: any) => {
              if (e.length !== 0) {
                let locationName = e[0]
                setStep1Details({
                  ...step1Details,
                  city: locationName.name,
                  state: locationName.state,
                  country: locationName.country,
                  lat: locationName.latitude,
                  lng: locationName.longitude,
                })
                setSuggestions([])
                //setIsLocationVisible(true)
              }
            }}
            renderMenuItemChildren={(option: any) => (
              <>
                <span>{`${option.name}, ${option.state}, ${option.country}`}</span>
              </>
            )}
          />
        )}
      </div>

      <div className='fv-row mb-2'>
        <label className='form-label'>Bio</label>

        <textarea
          name='bio'
          className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
          autoComplete='off'
          rows={5}
          value={step1Details?.bio}
          onChange={(e) => handleStep1Change(e)}
        />
      </div>

      <div className='d-flex flex-end pt-10'>
        {/* <div className='mr-2'>
          <button
            onClick={prevStep}
            type='button'
            className='btn btn-lg btn-light-primary me-3'
            data-kt-stepper-action='previous'
          >
            <KTIcon iconName='arrow-left' className='fs-4 me-1' />
            Back
          </button>
        </div> */}

        <div>
          <button type='button' className='btn btn-lg btn-primary me-3' onClick={onSubmitStep1}>
            <span className='indicator-label'>
              Continue
              <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export {Step1}
