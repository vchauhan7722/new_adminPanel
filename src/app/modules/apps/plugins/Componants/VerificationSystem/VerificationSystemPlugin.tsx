import React, {useEffect, useRef, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const VerificationSystemPlugin = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [configID, setConfigId] = useState(0)
  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [file, setFile] = useState('')
  const [verificationSystemConfig, setVerificationSystemConfig] = useState<any>({
    isEnable: true,
    gestureImage: '',
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    setVerificationSystemConfig({gestureImage: file, [name]: value})
    updateConfiguration({gestureImage: file, [name]: value}, null)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('verification')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setVerificationSystemConfig({
        isEnable: parsedData.isEnable,
      })
      setFile(parsedData.gestureImage)
    }
  }

  const updateConfiguration = async (config: any, fileUploaded: any) => {
    let result = await updateConfigurationByConfigID(configID, config, fileUploaded)

    if (result.status === 200) {
      getConfiguration()
      setisImageUploaded(false)
      ToastUtils({type: 'success', message: 'Configuration Saved SuccessFully'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const handleIconChange = (event: any) => {
    setisImageUploaded(true)
    const fileUploaded = event.target.files[0]
    //setFile(fileUploaded)
    updateConfiguration({...verificationSystemConfig}, fileUploaded)
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Verification System settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Profile verification</strong>
            </p>
            <p className='text-muted'>
              If enabled allow users to upload a photo coping a gesture to get manually verified by
              admin or moderator
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isEnable'
                checked={verificationSystemConfig.isEnable}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Gesture image as example</strong>
            </p>
            <p className='text-muted'>Upload gesture example image for photo verification</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <div className='symbol symbol-70px overflow-visible me-3'>
                <img
                  src={
                    `${process.env.REACT_APP_SERVER_URL}/${file}` ||
                    `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                  }
                  alt='icon'
                />
                <button
                  className='ms-4 btn btn-primary'
                  onClick={() => {
                    handleClick()
                    setisImageUploaded(false)
                  }}
                >
                  Choose Gesture
                </button>

                <input
                  type='file'
                  name='icon'
                  id={`fileInput`}
                  onChange={(e) => handleIconChange(e)}
                  ref={hiddenFileInput}
                  style={{display: 'none'}} // Make the file input element invisible
                  accept='image/*'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationSystemPlugin
