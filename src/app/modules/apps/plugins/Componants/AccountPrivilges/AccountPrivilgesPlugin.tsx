import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const AccountPrivilgesPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [popularConfig, setpopularConfig] = useState<any>({
    search: 'city',
    onlyPremiumUserVisitProfile: true,
    totalUserCount: 0,
  })

  //   useEffect(() => {
  //     getConfiguration()
  //   }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'onlyPremiumUserVisitProfile') {
      setpopularConfig({...popularConfig, [name]: event.target.value})
      if (event.target.value.length !== 0) {
        updateConfiguration({...popularConfig, [name]: event.target.value})
      }
    } else {
      setpopularConfig({...popularConfig, [name]: value})
      updateConfiguration({...popularConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('popular-users')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setpopularConfig({
        search: parsedData.search,
        onlyPremiumUserVisitProfile: parsedData.onlyPremiumUserVisitProfile,
        totalUserCount: parsedData.totalUserCount,
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
    <div className='row '>
      <div className='col-lg-6'>
        <div className='card'>
          <div className='card-title p-8'>
            <h2>Free account settings</h2>
          </div>
          <div className='card-body'>
            <div className='row no-gutters'>
              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Daily new conversation</strong>
                </p>
                <p className='text-muted'>
                  Limit how many new conversations this type of user can start
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='flex'>
                  <input
                    type='number'
                    className='form-control'
                    name='totalUserCount'
                    value={popularConfig.totalUserCount}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Start a videocall</strong>
                </p>
                <p className='text-muted'>Allow this type of user to start a videocall</p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>See private content</strong>
                </p>
                <p className='text-muted'>
                  Allow to this type of user to see private profile media
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Profile visits</strong>
                </p>
                <p className='text-muted'>
                  Allow to this type of user to see who visited his profile
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='col-lg-6'>
        <div className='card'>
          <div className='card-title p-8'>
            <h2>Premium account settings</h2>
          </div>
          <div className='card-body'>
            <div className='row no-gutters'>
              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Daily new conversation</strong>
                </p>
                <p className='text-muted'>
                  Limit how many new conversations this type of user can start
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='flex'>
                  <input
                    type='number'
                    className='form-control'
                    name='totalUserCount'
                    value={popularConfig.totalUserCount}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Start a videocall</strong>
                </p>
                <p className='text-muted'>Allow this type of user to start a videocall</p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>See private content</strong>
                </p>
                <p className='text-muted'>
                  Allow to this type of user to see private profile media
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>

              <div className='col-lg-6 card-body bg-light'>
                <p>
                  <strong className='headings-color'>Profile visits</strong>
                </p>
                <p className='text-muted'>
                  Allow to this type of user to see who visited his profile
                </p>
              </div>
              <div className='col-lg-6 card-form__body card-body d-flex align-items-center bg-white'>
                <div className='form-check form-switch'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    role='switch'
                    id='flexSwitchCheckDefault'
                    name='onlyPremiumUserVisitProfile'
                    checked={popularConfig.onlyPremiumUserVisitProfile}
                    onChange={(event) => handleChange(event)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPrivilgesPlugin
