import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const StripePaymentPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [stripePaymentConfig, setStripePaymentConfig] = useState<any>({
    isEnabled: true,
    stripe_secret_key: '',
    stripe_publishble_key: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isEnabled') {
      setStripePaymentConfig({...stripePaymentConfig, [name]: event.target.value})
      // if (event.target.value.length !== 0) {
      //   updateConfiguration({...stripePaymentConfig, [name]: event.target.value})
      // }
    } else {
      setStripePaymentConfig({...stripePaymentConfig, [name]: value})
      updateConfiguration({...stripePaymentConfig, [name]: value})
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(stripePaymentConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('stripe')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setStripePaymentConfig({
        isEnabled: parsedData?.isEnabled,
        stripe_secret_key: parsedData?.stripe_secret_key,
        stripe_publishble_key: parsedData?.stripe_publishble_key,
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
        <h2>Stripe Payment settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Stripe plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Stripe plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnabled'
                checked={stripePaymentConfig.isEnabled}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live Stripe Secret Key</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='stripe_secret_key'
                value={stripePaymentConfig.stripe_secret_key}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live Stripe Publishable Key</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='stripe_publishble_key'
                value={stripePaymentConfig.stripe_publishble_key}
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

export default StripePaymentPlugin
