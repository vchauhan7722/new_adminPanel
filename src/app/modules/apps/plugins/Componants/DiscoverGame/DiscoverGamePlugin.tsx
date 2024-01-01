import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const DiscoverGame = () => {
  const [configID, setConfigId] = useState(0)
  const [LikeProfileconfigID, setLikeProfileConfigId] = useState(0)
  const [undoProfileConfig, setUndoProfileConfig] = useState<any>({
    isEnabled: true,
    allowFreeUser: true,
    isUndoProfile: true,
    isCreditDeduct: true,
    creditPerUndoProfile: 10,
    undoProfileCountFreeUser: 4,
  })
  const [likedProfileConfig, setLikedProfileConfig] = useState<any>({
    isEnabled: true,
    allowFreeUser: true,
    isCreditDeduct: true,
    creditPerLikeProfile: 2,
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name === 'creditPerUndoProfile' || name === 'undoProfileCountFreeUser') {
      setUndoProfileConfig({...undoProfileConfig, [name]: event.target.value})
      // if (name === 'creditPerUndoProfile' || name === 'undoProfileCountFreeUser') {
      //   updateConfiguration({...undoProfileConfig, [name]: event.target.value}, configID)
      // }
    } else {
      setUndoProfileConfig({...undoProfileConfig, [name]: value})
      updateConfiguration({...undoProfileConfig, [name]: value}, configID)
    }
  }

  const onBlurUndoProfileConfigUpdate = () => {
    updateConfiguration(undoProfileConfig, configID)
  }

  const handleLikedProfileChange = (event: any) => {
    let name = event.target.name

    setLikedProfileConfig({...likedProfileConfig, [name]: event.target.value})
    // if (event.target.value.length !== 0) {
    //   updateConfiguration({...likedProfileConfig, [name]: event.target.value}, LikeProfileconfigID)
    // }
  }

  const onBlurLikedProfileConfigUpdate = () => {
    updateConfiguration(likedProfileConfig, LikeProfileconfigID)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('undo-profile')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setUndoProfileConfig({
        isEnabled: parsedData?.isEnabled,
        allowFreeUser: parsedData?.allowFreeUser,
        isUndoProfile: parsedData?.isUndoProfile,
        isCreditDeduct: parsedData?.isCreditDeduct,
        creditPerUndoProfile: parsedData?.creditPerUndoProfile,
        undoProfileCountFreeUser: parsedData?.undoProfileCountFreeUser,
      })
    }

    let result1 = await getConfigurationByName('like-profile')
    if (result1.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setLikeProfileConfigId(result.data.id)
      setLikedProfileConfig({
        isEnabled: parsedData?.isEnabled,
        allowFreeUser: parsedData?.allowFreeUser,
        isCreditDeduct: parsedData?.isCreditDeduct,
        creditPerLikeProfile: parsedData?.creditPerLikeProfile,
      })
    }
  }

  const updateConfiguration = async (config: any, configID: any) => {
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
        <h2>Discover Game settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Credit for Like Profile</strong>
            </p>
            <p className='text-muted'>
              Enter Those Credit which is deduct when User Do Like Profile
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='creditPerLikeProfile'
                value={likedProfileConfig.creditPerLikeProfile}
                onChange={(event) => handleLikedProfileChange(event)}
                onBlur={onBlurLikedProfileConfigUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Undo Profile plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Undo Profile</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isUndoProfile'
                checked={undoProfileConfig.isUndoProfile}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Undo Profile Is Allow to Free User</strong>
            </p>
            <p className='text-muted'>Free User Can Undo Profile?</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='allowFreeUser'
                checked={undoProfileConfig.allowFreeUser}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Credit Deduct For Undo Profile</strong>
            </p>
            <p className='text-muted'>Is Credit Deduct When User do Undo Profile</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isCreditDeduct'
                checked={undoProfileConfig.isCreditDeduct}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Credit for Undo Profile</strong>
            </p>
            <p className='text-muted'>
              Enter Those Credit which is deduct when User Do Undo Profile
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='creditPerUndoProfile'
                value={undoProfileConfig.creditPerUndoProfile}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUndoProfileConfigUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Free User Count for Undo Profile</strong>
            </p>
            <p className='text-muted'>Enter Count which Free User can Undo Profile</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='undoProfileCountFreeUser'
                value={undoProfileConfig.undoProfileCountFreeUser}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUndoProfileConfigUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscoverGame
