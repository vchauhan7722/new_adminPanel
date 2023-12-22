import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const GeneralPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [generalConfig, setGeneralConfig] = useState<any>({
    reviewMedia: true,
    maxUploadCount: 5,
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'reviewMedia') {
      setGeneralConfig({...generalConfig, [name]: event.target.value})
      if (event.target.value.length !== 0) {
        updateConfiguration({...generalConfig, [name]: event.target.value})
      }
    } else {
      setGeneralConfig({...generalConfig, [name]: value})
      updateConfiguration({...generalConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('upload-media')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setGeneralConfig({
        reviewMedia: parsedData?.reviewMedia,
        maxUploadCount: parsedData?.maxUploadCount,
      })
    }
  }

  const updateConfiguration = async (config: any) => {
    let result = await updateConfigurationByConfigID(configID, config, null)
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
        <h2>General settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Max Media Upload count</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='maxUploadCount'
                value={generalConfig.maxUploadCount}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Review Media</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='reviewMedia'
                checked={generalConfig.reviewMedia}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralPlugin
