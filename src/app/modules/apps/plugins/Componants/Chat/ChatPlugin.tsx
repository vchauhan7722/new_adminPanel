import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'

const ChatPlugin = () => {
  const [configID, setConfigId] = useState(0)
  const [chatConfig, setChatConfig] = useState<any>({
    allowFreeUser: false, //Premium users chat only if close
    isCreditDeduct: true, // Enable credits per message
    creditPerMessage: 0, // Charge credits per message
    isTransferCredit: true, //Transfer credits of message to reciever
    deductCreditGender: null, // Charge credits to specific gender
    transferCreditGender: null,
    isShowCredit: false,
  })

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'deductCreditGender' && name !== 'creditPerMessage') {
      setChatConfig({...chatConfig, [name]: value})
      updateConfiguration({...chatConfig, [name]: value})
    } else {
      setChatConfig({...chatConfig, [name]: event.target.value})
      if (name === 'deductCreditGender') {
        updateConfiguration({...chatConfig, [name]: value})
      }
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(chatConfig)
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('chat')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setChatConfig({
        allowFreeUser: parsedData?.allowFreeUser,
        isCreditDeduct: parsedData?.isCreditDeduct,
        creditPerMessage: parsedData?.creditPerMessage,
        isTransferCredit: parsedData?.isTransferCredit,
        deductCreditGender:
          parsedData?.deductCreditGender === null ? '' : parsedData?.deductCreditGender,
        transferCreditGender: parsedData?.transferCreditGender,
        isShowCredit: parsedData?.isShowCredit,
      })
      //console.log('Configuration Data', JSON.parse(result.data.values))
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
        <h2>Chat settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Spam protection</strong>
            </p>
            <p className='text-muted'>
              Allows users to only send a max of 2 messages and freeze the chat till the other
              participant answer back
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Spam Prevention (not working)
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='spamProtection'
                // checked={chatConfig.spamProtection}
                // onChange={(event) => handleChange(event)}
              />
            </div>
          </div>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Premium users chat only</strong>
            </p>
            <p className='text-muted'>Premium users only can start conversations and chat</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Premium Users Chat Only
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='allowFreeUser'
                checked={chatConfig.allowFreeUser}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Charge credits per message</strong>
            </p>
            <p className='text-muted'>Charge credits every new message is sent</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label htmlFor='creditsPerMessage'>Charge credits price</label>
              <br />

              <input
                type='number'
                className='form-control'
                name='creditPerMessage'
                value={chatConfig.creditPerMessage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Charge credits to specific gender</strong>
            </p>
            <p className='text-muted'>Charge credits per message only to the selected gender</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <label htmlFor='creditsPerMessageGender'>Charge credits gender</label>
              <br />
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='gender'
                data-hide-search='true'
                defaultValue={chatConfig.deductCreditGender}
                //value={profileDetailsFormValue?.gender}
                //onChange={(e) => handleProfileChange(e)}
                name='deductCreditGender'
                value={chatConfig.deductCreditGender}
                onChange={(event) => handleChange(event)}
              >
                <option value={''}>All Gender</option>
                <option value={1}>Male</option>
                <option value={2}>Female</option>
              </select>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>View current users credits</strong>
            </p>
            <p className='text-muted'>
              Enable htmlFor show the credits of the people that is chatting with you
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Enable view user credits
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isShowCredit'
                checked={chatConfig.isShowCredit}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Transfer credits of message to receiver</strong>
            </p>
            <p className='text-muted'>
              If <code>Charge credits htmlFor message</code> is enabled, enable this htmlFor
              transfer the cost of the credit htmlFor send the message to the receiver of the
              message
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Transfer Message Credits to Receiver
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isTransferCredit'
                checked={chatConfig.isTransferCredit}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Transfer credits of gifts to receiver</strong>
            </p>
            <p className='text-muted'>
              Enable this htmlFor transfer the credit cost of the gift to the receiver of the
              message
            </p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
                Transfer Gifts Credits to Receiver (not working)
              </label>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPlugin
