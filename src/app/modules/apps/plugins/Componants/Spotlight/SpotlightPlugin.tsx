import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const SpotlightPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [spotlightConfig, setSpotlightConfig] = useState<any>({
    credit: 0,
    duration: 0,
    autoWorldwide: false,
    spotLightArea: 'city',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'autoWorldwide') {
      setSpotlightConfig({...spotlightConfig, [name]: event.target.value})
      if (event.target.value.length !== 0) {
        updateConfiguration({...spotlightConfig, [name]: event.target.value})
      }
    } else {
      setSpotlightConfig({...spotlightConfig, [name]: value})
      updateConfiguration({...spotlightConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('spotlight-users')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setSpotlightConfig({
        credit: parsedData?.credit,
        duration: parsedData?.duration,
        autoWorldwide: parsedData?.autoWorldwide,
        spotLightArea: parsedData?.spotLightArea,
      })
    }
  }

  const updateConfiguration = async (config: any) => {
    //console.log('config', config)
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
        <h2>Spotlight settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Duration for photo in spotlight</strong>
            </p>
            <p className='text-muted'>
              How much time the photo will stay in the spotlight? add the amount in days
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Days In Spotlight
              </label>
              <input
                type='number'
                className='form-control'
                name='duration'
                value={spotlightConfig.duration}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Spotlight Credit</strong>
            </p>
            <p className='text-muted'>How much Credit are set for spotlight</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Spotlight Credit
              </label>
              <input
                type='number'
                className='form-control'
                name='credit'
                value={spotlightConfig.credit}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Worlwide spotlight</strong>
            </p>
            <p className='text-muted'>
              If there is no result in the spotlight because you selected City or Country automatic
              change to Worldwide
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='autoWorldwide'
                checked={spotlightConfig.autoWorldwide}
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
                data-hide-search='true'
                //defaultValue={spotlightConfig.search}
                name='spotLightArea'
                value={spotlightConfig.spotLightArea}
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

export default SpotlightPlugin
