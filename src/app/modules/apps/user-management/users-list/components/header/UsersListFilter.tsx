import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getCountriesList} from '../../../../../../../API/api-endpoint'
import {useIntl} from 'react-intl'

const UsersListFilter = () => {
  const intl = useIntl()

  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [role, setRole] = useState<string | undefined>()
  const [lastLogin, setLastLogin] = useState<string | undefined>()
  const [formValue, setFormValue] = useState<any>({
    searchText: '',
    startAge: 0,
    endAge: 0,
    registerDate: new Date(),
    gender: '',
    orderBy: '',
    country: '',
    state: '',
    city: '',
    isOnline: false,
    isPremium: false,
    isVerified: false,
    isWithStory: false,
    isfromReffral: false,
    isProfileCompleted: false,
  })
  const [allCountryList, setallCountryList] = useState<Array<any> | undefined>([])
  const [allStateList, setallStateList] = useState<Array<any> | undefined>([])
  const [allCityList, setallCityList] = useState<Array<any> | undefined>([])

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
  }

  const filterData = () => {
    updateState({
      filter: {role, last_login: lastLogin},
      ...initialQueryState,
    })
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    setFormValue({...formValue, [name]: value})
  }

  const getCountry = async () => {
    let response = await getCountriesList()
    setallCountryList(response.data)
  }

  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-light-primary me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTIcon iconName='filter' className='fs-2' />
        {intl.formatMessage({id: 'USERMANAGEMENT.FILTER'})}
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-75 w-md-75' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>
            {intl.formatMessage({id: 'USERMANAGEMENT.FILTEROPTIONS'})}
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-500'></div>
        {/* end::Separator */}

        <div className='row p-4'>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.SEARCHUSERSBYNAMEEMAIL'})}
            </label>
            <input
              type='tel'
              className='form-control form-control-lg form-control-solid'
              placeholder='Search Users by Name, email'
              value={formValue.search}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.STARTAGE'})}
            </label>
            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              placeholder='Start Age'
              value={formValue.startAge}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.ENDAGE'})}
            </label>
            <input
              type='number'
              className='form-control form-control-lg form-control-solid'
              placeholder='End Age'
              value={formValue.endAge}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className='row p-4'>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.REGISTERDATE'})}
            </label>
            <input
              type='date'
              className='form-control form-control-lg form-control-solid'
              placeholder='Register Date'
              value={formValue.registerDate}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.GENDER'})}
            </label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='gender'
              data-hide-search='true'
              value={formValue.gender}
              onChange={(e) => handleChange(e)}
            >
              <option value=''></option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='lesbian'>Lesbian</option>
              <option value='gay'>Gay</option>
            </select>
          </div>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.ORDERBY'})}
            </label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='orderby'
              data-hide-search='true'
              value={formValue.orderBy}
              onChange={(e) => handleChange(e)}
            >
              <option value=''></option>
              <option value='last_connection'>Last Connection</option>
              <option value='id'>ID</option>
              <option value='credits'>Credits</option>
              <option value='popular'>Popular</option>
              <option value='spotlight'>Spotlight</option>
            </select>
          </div>
        </div>

        <div className='row p-4'>
          <div className='col-lg-4'>
            <div>
              <label className='form-label fs-6 fw-bold'>
                {' '}
                {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.COUNTRY'})}
              </label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='country'
                data-hide-search='true'
                value={formValue.country}
                onChange={(e) => handleChange(e)}
              >
                <option value=''></option>
                <option value='india'>India</option>
                <option value='pakistan'>Pakistan</option>
              </select>
            </div>
          </div>
          <div className='col-lg-4'>
            <div>
              <label className='form-label fs-6 fw-bold'>
                {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.STATE'})}
              </label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='state'
                data-hide-search='true'
                value={formValue.state}
                onChange={(e) => handleChange(e)}
              >
                <option value=''></option>
                <option value='gujarat'>Gujarat</option>
              </select>
            </div>
          </div>
          <div className='col-lg-4'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.CITY'})}
            </label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-user-table-filter='city'
              data-hide-search='true'
              value={formValue.city}
              onChange={(e) => handleChange(e)}
            >
              <option value=''></option>
              <option value='rajkot'>Rajkot</option>
              <option value='surat'>Surat</option>
              <option value='ahmedabad'>Ahmedabad</option>
            </select>
          </div>
        </div>

        <div className='row p-4'>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='onlinenow'
              onChange={(e) => handleChange(e)}
              checked={formValue.isOnline}
            />
            <span className='px-2'>Online Now</span>
          </div>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='premium'
              onChange={(e) => handleChange(e)}
              checked={formValue.isPremium}
            />
            <span className='px-2'>Premium</span>
          </div>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='verified'
              onChange={(e) => handleChange(e)}
              checked={formValue.isVerified}
            />
            <span className='px-2'>Verified</span>
          </div>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='withstory'
              onChange={(e) => handleChange(e)}
              checked={formValue.isWithStory}
            />
            <span className='px-2'>With Story</span>
          </div>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='fromreffreal'
              onChange={(e) => handleChange(e)}
              checked={formValue.isfromReffral}
            />
            <span className='px-2'>From Reffreal</span>
          </div>
          <div className='col-lg-2'>
            <input
              className='form-check-input'
              type='checkbox'
              id='profilecompleted'
              onChange={(e) => handleChange(e)}
              checked={formValue.isProfileCompleted}
            />
            <span className='px-2'>Profile Completed</span>
          </div>
        </div>

        {/* begin::Content */}
        <div className='px-7 py-5' data-kt-user-table-filter='form'>
          {/* begin::Actions */}
          <div className='d-flex justify-content-end'>
            <button
              disabled={isLoading}
              type='button'
              onClick={resetData}
              className='btn btn-light fw-bold me-2 px-6'
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='filter'
            >
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.RESET'})}
            </button>
            <button
              type='button'
              disabled={isLoading}
              onClick={filterData}
              className='btn btn-primary btn-active-light-primary fw-bold '
              data-kt-menu-dismiss='true'
              data-kt-user-table-filter='reset'
            >
              {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.APPLY'})}
            </button>
          </div>
          {/* end::Actions */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {UsersListFilter}
