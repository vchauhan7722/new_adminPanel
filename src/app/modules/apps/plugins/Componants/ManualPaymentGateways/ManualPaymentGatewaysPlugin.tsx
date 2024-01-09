import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const ManualPaymentGatewaysPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [manualPaymentGatewayConfig, setManualPaymentGatewayConfig] = useState<any>({
    isEnabled: true,
    upiuid: '',
    token: '',
    callback_url: '',
    secret_key: '',
    merchant_id: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isEnabled') {
      setManualPaymentGatewayConfig({...manualPaymentGatewayConfig, [name]: event.target.value})
      // if (event.target.value.length !== 0) {
      //   updateConfiguration({...manualPaymentGatewayConfig, [name]: event.target.value})
      // }
    } else {
      setManualPaymentGatewayConfig({...manualPaymentGatewayConfig, [name]: value})
      updateConfiguration({...manualPaymentGatewayConfig, [name]: value})
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(manualPaymentGatewayConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('manual-gateway')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setManualPaymentGatewayConfig({
        isEnabled: parsedData?.isEnabled,
        upiuid: parsedData?.upiuid,
        token: parsedData?.token,
        callback_url: parsedData?.callback_url,
        secret_key: parsedData?.secret_key,
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
        <h2>General settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Payment plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Payment plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnabled'
                checked={manualPaymentGatewayConfig.isEnabled}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live Qr Code Url</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='upiuid'
                value={manualPaymentGatewayConfig.upiuid}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live APi Token Key</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='token'
                value={manualPaymentGatewayConfig.token}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>GateWay Url</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='callback_url'
                value={manualPaymentGatewayConfig.callback_url}
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
                value={manualPaymentGatewayConfig.secret_key}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Live Merchant Id</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='merchant_id'
                value={manualPaymentGatewayConfig.merchant_id}
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

export default ManualPaymentGatewaysPlugin
