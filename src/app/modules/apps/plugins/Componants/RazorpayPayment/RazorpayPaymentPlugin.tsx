import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const RazorpayPaymentPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [razorPayPaymentConfig, setRazorPayPaymentConfig] = useState<any>({
    isEnabled: true,
    secret_key: '',
    api_key: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isEnabled') {
      setRazorPayPaymentConfig({...razorPayPaymentConfig, [name]: event.target.value})
      // if (event.target.value.length !== 0) {
      //   updateConfiguration({...razorPayPaymentConfig, [name]: event.target.value})
      // }
    } else {
      setRazorPayPaymentConfig({...razorPayPaymentConfig, [name]: value})
      updateConfiguration({...razorPayPaymentConfig, [name]: value})
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(razorPayPaymentConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('razorpay')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setRazorPayPaymentConfig({
        isEnabled: parsedData?.isEnabled,
        api_key: parsedData?.api_key,
        secret_key: parsedData?.secret_key,
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
        <h2>RazorPay Payment settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Razor Pay plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Razor Pay plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnabled'
                checked={razorPayPaymentConfig.isEnabled}
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
                value={razorPayPaymentConfig.api_key}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live Secret Key</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='secret_key'
                value={razorPayPaymentConfig.secret_key}
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

export default RazorpayPaymentPlugin
