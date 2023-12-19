import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const PopularPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [popularConfig, setpopularConfig] = useState<any>({
    search: 'city',
    onlyPremiumUserVisitProfile: true,
    totalUserCount: 0,
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'onlyPremiumUserVisitProfile') {
      setpopularConfig({...popularConfig, [name]: event.target.value})
      if (event.target.value.length !== 0) {
        updateConfiguration({...popularConfig, [name]: event.target.value})
      }
    } else {
      setpopularConfig({...popularConfig, [name]: value})
      updateConfiguration({...popularConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('popular-users')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setpopularConfig({
        search: parsedData.search,
        onlyPremiumUserVisitProfile: parsedData.onlyPremiumUserVisitProfile,
        totalUserCount: parsedData.totalUserCount,
      })
    }
  }

  const updateConfiguration = async (config: any) => {
    let result = await updateConfigurationByConfigID(configID, config)
    if (result.status === 200) {
      getConfiguration()
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Popular settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Profiles show result count</strong>
            </p>
            <p className='text-muted'>
              For populars users there is not pagination so you must select how much of them you
              will show
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='totalUserCount'
                value={popularConfig.totalUserCount}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Only premium users can go to profiles</strong>
            </p>
            <p className='text-muted'>
              Enable to allow only to premium users to interact with the popular user showed in the
              popular section
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='onlyPremiumUserVisitProfile'
                checked={popularConfig.onlyPremiumUserVisitProfile}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Filter proximity range</strong>
            </p>
            <p className='text-muted'>Select which proximity range use to search populars users</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='gender'
                data-hide-search='true'
                //defaultValue={popularConfig.search}
                name='search'
                value={popularConfig.search}
                onChange={(event) => handleChange(event)}
              >
                <option value='worldwide'>WorldWide</option>
                <option value='country'>Country</option>
                <option value='state'>State</option>
                <option value='city'>City</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularPlugin
