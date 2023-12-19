import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const VideocallPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [spotlightConfig, setSpotlightConfig] = useState<any>({
    credit: 0,
    duration: 0,
    autoWorldwide: false,
    spotLightArea: 'city',
  })

  //   useEffect(() => {
  //     getConfiguration()
  //   }, [])

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
    let result = await getConfigurationByName('videocall')
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
        <h2>Video Call settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable videocalling</strong>
            </p>
            <p className='text-muted'>Enable or disable videocalling for the software</p>
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
              <strong className='headings-color'>Allow free users to videocall</strong>
            </p>
            <p className='text-muted'>
              By default videocall is for premium users only, enable this for allow free users start
              a videocall
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
              <strong className='headings-color'>Enable credits per minute</strong>
            </p>
            <p className='text-muted'>
              Charge specific amount of credits per minute on the videocalling
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
              <strong className='headings-color'>Charge credits per minutes</strong>
            </p>
            <p className='text-muted'>
              Videocalling requires credits per minutes for work, the credits will be charged only
              to the caller user
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                AMOUNT OF CREDITS
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
              <strong className='headings-color'>Transfer videocall credits</strong>
            </p>
            <p className='text-muted'>
              Transfer to the called user the spent credits by the caller user
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
              <strong className='headings-color'>Enable record videocall</strong>
            </p>
            <p className='text-muted'>Enable or disable the videocall recording</p>
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
              <strong className='headings-color'>Only record webcam from a specific gender</strong>
            </p>
            <p className='text-muted'>
              You can specific if you want to record all the webcams or just from a specific gender
            </p>
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
                <option value='all genders'>All Genders</option>
                <option value='1'>Male</option>
                <option value='2'>Female</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Upload the recorded video to Amazon S3 AWS</strong>
            </p>
            <p className='text-muted'>
              Enable to upload to Amazon S3 AWS , if disabled the videos will be saved in your
              hosting in the folder assets/sources/uploads
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
        </div>
      </div>
    </div>
  )
}

export default VideocallPlugin
