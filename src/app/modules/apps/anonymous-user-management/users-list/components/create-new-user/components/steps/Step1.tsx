/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useState} from 'react'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {ErrorMessage, Field} from 'formik'
import {
  createNewAnonymousUser,
  getCitiesBYSearch,
} from '../../../../../../../../../API/api-endpoint'
import clsx from 'clsx'
import ToastUtils, {ErrorToastUtils} from '../../../../../../../../../utils/ToastUtils'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1)
  const [step1Details, setStep1Details] = useState<any>({
    fullName: '',
    userName: '',
    genderId: '1',
    birthDate: getDate(),
    country: '',
    state: '',
    city: '',
    bio: '',
    lat: '',
    lng: '',
  })

  const handleStep1Change = (e) => {
    let name = e.target.name
    let value = e.target.value

    setStep1Details({...step1Details, [name]: value})
  }

  const handleSearchChange = async (event) => {
    console.log(event.target.value)
    const inputValue = event.target.value

    let spiltData = inputValue.split(',')
    setStep1Details({
      ...step1Details,
      city: spiltData[0],
      state: spiltData[1],
      country: spiltData[2],
    })

    setSearchTerm(inputValue)

    if (inputValue.length > 3) {
      const filteredSuggestions = await getCitiesBYSearch(inputValue)

      setSuggestions(filteredSuggestions.data)
      setActiveSuggestionIndex(-1)
    } else if (inputValue.length === 0) {
      setSuggestions([])
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
      let result = await createNewAnonymousUser(step1Details)
      if (result.status === 200) {
        submitStep(result.data.userId)
        ToastUtils({type: 'success', message: 'Saved SuccessFully'})
      } else {
        ErrorToastUtils()
      }
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
            <option value='1'>Male</option>
            <option value='2'>Female</option>
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

        <input
          id='search-input'
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
                    setSearchTerm(`${suggestion.name}, ${suggestion.state}, ${suggestion.country}`)
                    setStep1Details({
                      ...step1Details,
                      city: suggestion.name,
                      state: suggestion.state,
                      country: suggestion.country,
                      lat: suggestion.latitude,
                      lng: suggestion.longitude,
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
