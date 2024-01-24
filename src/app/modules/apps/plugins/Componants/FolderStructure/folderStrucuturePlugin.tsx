import React, {useEffect, useState} from 'react'
import {
  UpdateFolderStructurePlugin,
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const FolderStructurePlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [stripePaymentConfig, setStripePaymentConfig] = useState<any>({
    folderSize: '',
    rangeStart: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.value

    setStripePaymentConfig({...stripePaymentConfig, [name]: value})
    // if (name !== 'isEnabled') {
    //   setStripePaymentConfig({...stripePaymentConfig, [name]: event.target.value})
    //   // if (event.target.value.length !== 0) {
    //   //   updateConfiguration({...stripePaymentConfig, [name]: event.target.value})
    //   // }
    // } else {
    //   setStripePaymentConfig({...stripePaymentConfig, [name]: value})
    //   updateConfiguration({...stripePaymentConfig, [name]: value})
    // }
  }

  const onBlurUpdate = () => {
    updateConfiguration(stripePaymentConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('folder_structure')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setStripePaymentConfig({
        folderSize: parsedData?.folderSize,
        rangeStart: parsedData?.rangeStart,
      })
    }
  }

  const updateConfiguration = async (config: any) => {
    let result = await UpdateFolderStructurePlugin(config, configID)
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
        <h2>Folder Structure settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>New Folder Size</strong>
            </p>
            <p className='text-muted'>Change Folder Size</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='text'
                className='form-control'
                name='folderSize'
                value={stripePaymentConfig.folderSize}
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

export default FolderStructurePlugin
