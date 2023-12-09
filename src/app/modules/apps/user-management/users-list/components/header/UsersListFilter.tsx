import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {initialQueryState, KTIcon} from '../../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {getCityList, getCountriesList, getStateList} from '../../../../../../../API/api-endpoint'
import {useIntl} from 'react-intl'
import {UsersListSearchComponent} from './UsersListSearchComponent'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

const UsersListFilter = () => {
  const intl = useIntl()

  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const [formValue, setFormValue] = useState<any>({
    search: '',
    startAge: 18,
    endAge: 45,
    startDate: '', //new Date().toLocaleDateString('en-CA')
    endDate: '', //new Date().toLocaleDateString('en-CA')
    gender: '',
    orderBy: '',
    country: '',
    state: '',
    city: '',
    isOnline: '',
    isPremium: '',
    isVerify: '',
    isWithStory: '',
    isfromReffral: '',
    completeProfile: '',
  })
  const [allCountryList, setallCountryList] = useState<Array<any> | undefined>([])
  const [allStateList, setallStateList] = useState<Array<any> | undefined>([])
  const [allCityList, setallCityList] = useState<Array<any> | undefined>([])
  const [selectedCountryID, setSelectedCountryID] = useState<any>(101)
  const [selectedStateID, setSelectedStateID] = useState<any>(4030)

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const resetData = () => {
    updateState({filter: undefined, ...initialQueryState})
    setFormValue({
      search: '',
      startAge: 18,
      endAge: 45,
      startDate: '', //new Date().toLocaleDateString('en-CA')
      endDate: '', //new Date().toLocaleDateString('en-CA')
      gender: '',
      orderBy: '',
      country: '',
      state: '',
      city: '',
      isOnline: '',
      isPremium: '',
      isVerify: '',
      isWithStory: '',
      isfromReffral: '',
      completeProfile: '',
    })
  }

  useEffect(() => {
    getCountry()
  }, [])

  useEffect(() => {
    getStates()
  }, [selectedCountryID])

  useEffect(() => {
    getCities()
  }, [selectedStateID])

  const filterData = () => {
    updateState({
      filter: formValue,
      ...initialQueryState,
      page: 1,
    })
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name === 'country') {
      const id = allCountryList?.filter((country) => country.name === value) || []
      setSelectedCountryID(id[0].countryId)
      setFormValue({...formValue, [name]: value})
    } else if (name === 'state') {
      const id = allStateList?.filter((state) => state.name === value) || []
      console.log(id[0].stateId)
      setSelectedStateID(id[0].stateId)
      setFormValue({...formValue, [name]: value})
    } else {
      setFormValue({...formValue, [name]: value})
    }

    if (
      name === 'isOnline' ||
      name === 'isPremium' ||
      name === 'isVerify' ||
      name === 'isWithStory' ||
      name === 'isfromReffral' ||
      name === 'completeProfile'
    ) {
      setFormValue({...formValue, [name]: e.target.checked})
    }
    // setFormValue({...formValue, [name]: value})
  }

  const getCountry = async () => {
    let response = await getCountriesList()
    setallCountryList(response.data)
  }

  const getStates = async () => {
    let response = await getStateList(selectedCountryID)
    setallStateList(response.data)
  }

  const getCities = async () => {
    let response = await getCityList(selectedStateID)
    setallCityList(response.data)
  }

  return (
    <>
      <div className='accordion' id='kt_accordion_1'>
        <div className='accordion-item'>
          <h2 className='accordion-header' id='kt_accordion_1_header_1'>
            <button
              className='accordion-button fs-4 fw-bold collapsed'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#kt_accordion_1_body_1'
              aria-expanded='false'
              aria-controls='kt_accordion_1_body_1'
            >
              <div className='fs-5 text-dark fw-bolder'>
                {intl.formatMessage({id: 'USERMANAGEMENT.FILTEROPTIONS'})}
              </div>
            </button>
          </h2>
          <div
            id='kt_accordion_1_body_1'
            className='accordion-collapse collapse'
            aria-labelledby='kt_accordion_1_header_1'
            data-bs-parent='#kt_accordion_1'
          >
            <div className='accordion-body'>
              <div className=''>
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
                      name='search'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Search Users by Name, email'
                      value={formValue.search}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className='col-lg-4'>
                    <label className='form-label fs-6 fw-bold'>
                      {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.ENDAGE'})} {formValue.endAge}
                    </label>

                    <input
                      type='range'
                      className='form-range'
                      name='endAge'
                      value={formValue.endAge}
                      onChange={(e) => handleChange(e)}
                      min='18'
                      max='100'
                    />
                  </div>

                  {/* <div className='col-lg-4'>
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
                  </div> */}
                  <div className='col-lg-4'>
                    <label className='form-label fs-6 fw-bold'>
                      {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.STARTREGISTERDATE'})}
                    </label>
                    <input
                      type='date'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Start Register Date'
                      name='startDate'
                      value={formValue.startDate}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='row p-4'>
                  <div className='col-lg-4'>
                    <label className='form-label fs-6 fw-bold'>
                      {intl.formatMessage({id: 'USERMANAGEMENT.FILTER.ENDREGISTERDATE'})}
                    </label>
                    <input
                      type='date'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='Register Date'
                      name='endDate'
                      value={formValue.endDate}
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
                      //defaultValue=''
                      name='gender'
                      value={formValue.gender}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value=''>All gender</option>
                      <option value='1'>Male</option>
                      <option value='2'>Female</option>
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
                      name='orderBy'
                      defaultValue={'last_connection'}
                      value={formValue.orderBy}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value='updatedAt'>Last Activity</option>
                      <option value='userId'>ID</option>
                      <option value='totalCredit'>Credits</option>
                      <option value='isPopular'>Popular</option>
                      <option value='isSpotlightUser'>Spotlight</option>
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
                        name='country'
                        value={formValue.country}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''></option>
                        {allCountryList !== undefined &&
                          allCountryList.map((country, index) => {
                            return (
                              <option key={index} value={country.name}>
                                {country.name}
                              </option>
                            )
                          })}
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
                        name='state'
                        value={formValue.state}
                        onChange={(e) => handleChange(e)}
                      >
                        <option value=''></option>
                        {allStateList !== undefined &&
                          allStateList.map((state) => {
                            return <option value={state.name}>{state.name}</option>
                          })}
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
                      name='city'
                      value={formValue.city}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value=''></option>
                      {allCityList !== undefined &&
                        allCityList.map((city) => {
                          return <option value={city.name}>{city.name}</option>
                        })}
                    </select>
                  </div>
                </div>
                <div className='row p-4'>
                  <div className='col-lg-2'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='onlinenow'
                      name='isOnline'
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
                      name='isPremium'
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
                      name='isVerify'
                      onChange={(e) => handleChange(e)}
                      checked={formValue.isVerify}
                    />
                    <span className='px-2'>Verified</span>
                  </div>
                  <div className='col-lg-2'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id='withstory'
                      name='isWithStory'
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
                      name='isfromReffral'
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
                      name='completeProfile'
                      onChange={(e) => handleChange(e)}
                      checked={formValue.completeProfile}
                    />
                    <span className='px-2'>Profile Completed</span>
                  </div>
                </div>
                {/* begin::Content */}
                <div className='' data-kt-user-table-filter='form'>
                  {' '}
                  {/* begin::Actions */}
                  <div className='d-flex justify-content-end mt-5 mb-5'>
                    <div>
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
                  </div>
                  {/* end::Actions */}
                </div>
                {/* end::Content */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* end::SubMenu */}
    </>
  )
}

export {UsersListFilter}
