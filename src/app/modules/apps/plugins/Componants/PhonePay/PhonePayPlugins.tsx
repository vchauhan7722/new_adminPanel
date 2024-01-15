import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const PhonePayPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [phonePayPaymentConfig, setPhonePayPaymentConfig] = useState<any>({
    isEnabled: true,
    merchant_id: '',
    api_key: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isEnabled') {
      setPhonePayPaymentConfig({...phonePayPaymentConfig, [name]: event.target.value})
      // if (event.target.value.length !== 0) {
      //   updateConfiguration({...phonePayPaymentConfig, [name]: event.target.value})
      // }
    } else {
      setPhonePayPaymentConfig({...phonePayPaymentConfig, [name]: value})
      updateConfiguration({...phonePayPaymentConfig, [name]: value})
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(phonePayPaymentConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('phonepay')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setPhonePayPaymentConfig({
        isEnabled: parsedData?.isEnabled,
        api_key: parsedData?.api_key,
        merchant_id: parsedData?.merchant_id,
      })
    }
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
        <h2>PhonePay Payment settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Phone Pay plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Phone Pay plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnabled'
                checked={phonePayPaymentConfig.isEnabled}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live APi Key</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='api_key'
                value={phonePayPaymentConfig.api_key}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Merchant Id</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='merchant_id'
                value={phonePayPaymentConfig.merchant_id}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhonePayPlugin
