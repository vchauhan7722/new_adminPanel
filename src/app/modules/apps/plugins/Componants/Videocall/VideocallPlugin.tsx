import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const VideocallPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [videoCallConfig, setVideocallConfig] = useState<any>({
    isEnabled: true, //Enable videocalling
    creditPerMin: 2, //Charge credits per minutes
    allowFreeUser: true, //Allow free users to videocall
    isCreditDeduct: true, //Enable credits per minute
    isTransferCredit: true, //Transfer videocall credits
    transferCreditPercentage: 100,
    allowForOnlyMatchedProfile: true,
    isVideoCallRecordEnabled: false,
    recordVideocallSpecificGender: 1,
    IsRecordedVideocallUploadToAmazonS3: false,
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (
      name === 'creditPerMin' ||
      name === 'transferCreditPercentage' ||
      name === 'recordVideocallSpecificGender'
    ) {
      setVideocallConfig({...videoCallConfig, [name]: event.target.value})
      if (name === 'recordVideocallSpecificGender') {
        updateConfiguration({...videoCallConfig, [name]: event.target.value})
      }
    } else {
      setVideocallConfig({...videoCallConfig, [name]: value})
      updateConfiguration({...videoCallConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('videocall')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setVideocallConfig({
        isEnabled: parsedData?.isEnabled,
        creditPerMin: parsedData?.creditPerMin,
        allowFreeUser: parsedData?.allowFreeUser,
        isCreditDeduct: parsedData?.isCreditDeduct,
        isTransferCredit: parsedData?.isTransferCredit,
        transferCreditPercentage: parsedData?.transferCreditPercentage,
        allowForOnlyMatchedProfile: parsedData?.allowForOnlyMatchedProfile,
        isVideoCallRecordEnabled: parsedData?.isVideoCallRecordEnabled,
        recordVideocallSpecificGender: parsedData?.recordVideocallSpecificGender,
        IsRecordedVideocallUploadToAmazonS3: parsedData?.IsRecordedVideocallUploadToAmazonS3,
      })
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(videoCallConfig)
  }

  const updateConfiguration = async (config: any) => {
    let result = await updateConfigurationByConfigID(configID, config, null)
    if (result.status === 200) {
      getConfiguration()
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ErrorToastUtils()
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
                name='isEnabled'
                checked={videoCallConfig.isEnabled}
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
                name='allowFreeUser'
                checked={videoCallConfig.allowFreeUser}
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
                name='isCreditDeduct'
                checked={videoCallConfig.isCreditDeduct}
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
                Amount Of Credit
              </label>
              <input
                type='number'
                className='form-control'
                name='creditPerMin'
                value={videoCallConfig.creditPerMin}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Transfer Credit Percentage</strong>
            </p>
            <p className='text-muted'>
              Its Transfer Only That Percentage which You Have Entered Here
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Credit Percentage
              </label>
              <input
                type='number'
                className='form-control'
                name='transferCreditPercentage'
                value={videoCallConfig.transferCreditPercentage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Allow For Only Matched Profile</strong>
            </p>
            <p className='text-muted'>If true then its allow video call when profile are matched</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='allowForOnlyMatchedProfile'
                checked={videoCallConfig.allowForOnlyMatchedProfile}
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
                name='isTransferCredit'
                checked={videoCallConfig.isTransferCredit}
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
                name='isVideoCallRecordEnabled'
                checked={videoCallConfig.isVideoCallRecordEnabled}
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
                //defaultValue={videoCallConfig.search}
                name='recordVideocallSpecificGender'
                value={videoCallConfig.recordVideocallSpecificGender}
                onChange={(event) => handleChange(event)}
              >
                <option value={0}>All Genders</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
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
                name='IsRecordedVideocallUploadToAmazonS3'
                checked={videoCallConfig.IsRecordedVideocallUploadToAmazonS3}
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
