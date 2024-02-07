import React, {useEffect, useState} from 'react'
import {
  getConfigurationByName,
  updateConfigurationByConfigID,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'
import Swal from 'sweetalert2'

const FakeUserInteraction = () => {
  const [configID, setConfigId] = useState(0)
  const [fakeInteractionConfig, setFakeInteractionConfig] = useState<any>({
    isAnonymousUserInteractionEnabled: true,
    timePeriod: '',
    visitBackCount: '',
    likeBackCount: '',
    likeBackPercentageWithVisit: '',
    likeBackPercentageWithoutVisit: '',
    MessageCount: '',
    isautoBackInteractionEnabled: '',
    visitBackPercentage: '',
    visitBackPercentageInterval1: '',
    visitBackPercentageInterval2: '',
    visitorsLikeBackPercentage: '',
    visitorsLikeBackPercentageInterval1: '',
    visitorsLikeBackPercentageInterval2: '',
    usersLikeVisitBackPercentage: '',
    usersLikeVisitBackPercentageInterval1: '',
    usersLikeVisitBackPercentageInterval2: '',
    adminMessageCount: '',
    adminMessageCountInterval1: '',
    adminMessageCountInterval2: '',
    MessageBackPercentage: '',
    MessageBackPercentageInterval1: '',
    MessageBackPercentageInterval2: '',
    MessageBackList: '',
  })

  const [messageBackList, setMessageBackList] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    getConfiguration()
  }, [])

  const handleChange = (event: any) => {
    let name = event.target.name
    let value = event.target.checked

    if (name !== 'isAnonymousUserInteractionEnabled' && name !== 'isautoBackInteractionEnabled') {
      setFakeInteractionConfig({...fakeInteractionConfig, [name]: event.target.value})
      //   updateConfiguration({...fakeInteractionConfig, [name]: event.target.value})
    } else {
      setFakeInteractionConfig({...fakeInteractionConfig, [name]: value})
      updateConfiguration({...fakeInteractionConfig, [name]: value})
    }
  }

  const getConfiguration = async () => {
    let result = await getConfigurationByName('auto_interaction')
    if (result.status === 200) {
      let parsedData = JSON.parse(result.data.values)
      setConfigId(result.data.id)
      setFakeInteractionConfig({
        isAnonymousUserInteractionEnabled: parsedData?.isAnonymousUserInteractionEnabled,
        visitBackCount: parsedData?.visitBackCount,
        timePeriod: parsedData?.timePeriod,
        likeBackCount: parsedData?.likeBackCount,
        likeBackPercentageWithVisit: parsedData?.likeBackPercentageWithVisit,
        likeBackPercentageWithoutVisit: parsedData?.likeBackPercentageWithoutVisit,
        MessageCount: parsedData?.MessageCount,
        isautoBackInteractionEnabled: parsedData?.isautoBackInteractionEnabled,
        visitBackPercentage: parsedData?.visitBackPercentage,
        visitBackPercentageInterval1: parsedData?.visitBackPercentageInterval1,
        visitBackPercentageInterval2: parsedData?.visitBackPercentageInterval2,
        visitorsLikeBackPercentage: parsedData?.visitorsLikeBackPercentage,
        visitorsLikeBackPercentageInterval1: parsedData?.visitorsLikeBackPercentageInterval1,
        visitorsLikeBackPercentageInterval2: parsedData?.visitorsLikeBackPercentageInterval2,
        usersLikeVisitBackPercentage: parsedData?.usersLikeVisitBackPercentage,
        usersLikeVisitBackPercentageInterval1: parsedData?.usersLikeVisitBackPercentageInterval1,
        usersLikeVisitBackPercentageInterval2: parsedData?.usersLikeVisitBackPercentageInterval2,
        adminMessageCount: parsedData?.adminMessageCount,
        adminMessageCountInterval1: parsedData?.adminMessageCountInterval1,
        adminMessageCountInterval2: parsedData?.adminMessageCountInterval2,
        MessageBackPercentage: parsedData?.MessageBackPercentage,
        MessageBackPercentageInterval1: parsedData?.MessageBackPercentageInterval1,
        MessageBackPercentageInterval2: parsedData?.MessageBackPercentageInterval2,
        MessageBackList: parsedData?.MessageBackList,
      })
      setMessageBackList(parsedData?.MessageBackList)
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

  const addMessageInConfig = () => {
    if (message.trim().length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter Message'})
    } else {
      let lastElement: any = messageBackList[messageBackList.length - 1]

      let newMessage = {
        id: lastElement.id + 1,
        message: message,
      }

      let oldMessageBackList: any = [...messageBackList]
      oldMessageBackList.push(newMessage)
      setMessageBackList(oldMessageBackList)

      let newConfig = {
        ...fakeInteractionConfig,
        MessageBackList: oldMessageBackList,
      }

      updateConfiguration(newConfig)

      setMessage('')
    }
  }

  const onBlurUpdate = () => {
    updateConfiguration(fakeInteractionConfig)
  }

  const deleteMessageInConfig = (messageId: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        let updatedMessageList: any = messageBackList.filter(
          (message: any) => message.id !== messageId
        )

        let newConfig = {
          ...fakeInteractionConfig,
          MessageBackList: updatedMessageList,
        }

        updateConfiguration(newConfig)
      }
    })
  }

  const handleIntervalChange = (event: any) => {
    let name = event.target.name
    let value = event.target.value

    if (!value.includes('-')) {
      ToastUtils({type: 'error', message: 'Please Enter Interval Correctly'})
    } else if (value.trim().length === 0) {
      ToastUtils({type: 'error', message: 'Please Enter Interval'})
    } else {
      let interval1 = value.split('-')[0]
      let interval2 = value.split('-')[1]

      // if (interval1.length === 0) {
      //   interval1 = 1
      // } else if (interval2.length === 0) {
      //   interval2 = 1
      // }

      // console.log('intervalChange', {
      //   ...fakeInteractionConfig,
      //   [name + '1']: interval1,
      //   [name + '2']: interval2,
      // })

      setFakeInteractionConfig({
        ...fakeInteractionConfig,
        [name + '1']: interval1,
        [name + '2']: interval2,
      })
    }

    // updateConfiguration({
    //   ...fakeInteractionConfig,
    //   [name + '1']: interval1,
    //   [name + '2']: interval2,
    // })

    // switch (name) {
    //   case 'usersLikeVisitBackPercentageInterval':
    //     setFakeInteractionConfig({
    //       ...fakeInteractionConfig,
    //       [name + '1']: interval1,
    //       [name + '2']: interval2,
    //     })
    //     break

    //   case 'visitorsLikeBackPercentageInterval':
    //     break

    //   case 'usersLikeVisitBackPercentageInterval':
    //     break

    //   case 'adminMessageCountInterval':
    //     break

    //   case 'MessageBackPercentageInterval':
    //     break

    //   default:
    //     break
    // }
  }

  return (
    <div className='card'>
      <div className='card-title p-8'>
        <h2>Fake User Interaction settings</h2>
      </div>
      <div className='card-body'>
        <div className='row no-gutters'>
          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Enable Anonymous User interaction plugin</strong>
            </p>
            <p className='text-muted'>Enable or disable Anonymous User interaction plugin</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isAnonymousUserInteractionEnabled'
                checked={fakeInteractionConfig.isAnonymousUserInteractionEnabled}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Time period</strong>
            </p>
            <p className='text-muted'>it will count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='timePeriod'
                value={fakeInteractionConfig.timePeriod}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Visit Back</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='visitBackCount'
                value={fakeInteractionConfig.visitBackCount}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Like</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control mb-5'
                name='likeBackCount'
                value={fakeInteractionConfig.likeBackCount}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted '>Like Count</p>
            </div>
            &nbsp;
            <div className='flex col-lg-2'>
              <input
                type='number'
                className='form-control'
                name='likeBackPercentageWithVisit'
                value={fakeInteractionConfig.likeBackPercentageWithVisit}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Like Percentage With Visit</p>
            </div>
            &nbsp;
            <div className='flex col-lg-2'>
              <input
                type='number'
                className='form-control'
                name='likeBackPercentageWithoutVisit'
                value={fakeInteractionConfig.likeBackPercentageWithoutVisit}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Like Percentage Without Visit</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Message</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex'>
              <input
                type='number'
                className='form-control'
                name='MessageCount'
                value={fakeInteractionConfig.MessageCount}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
            </div>
          </div>

          <div className='mt-5 mb-5'>
            <hr></hr>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Auto back Interaction</strong>
            </p>
            <p className='text-muted'>Enable or disable Auto back Interaction</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                role='switch'
                id='flexSwitchCheckDefault'
                name='isautoBackInteractionEnabled'
                checked={fakeInteractionConfig.isautoBackInteractionEnabled}
                onChange={(event) => handleChange(event)}
              />
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Visit back Percentage</strong>
            </p>
            <p className='text-muted'>
              It will count in percentage and it should be greater then 20
            </p>
            <p className='text-danger'>* interval count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control'
                name='visitBackPercentage'
                value={fakeInteractionConfig.visitBackPercentage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted mt-10'></p>
            </div>
            &nbsp;
            <div className='flex col-lg-3'>
              <input
                type='text'
                className='form-control'
                name='visitBackPercentageInterval'
                value={
                  fakeInteractionConfig.visitBackPercentageInterval1 +
                  '-' +
                  fakeInteractionConfig.visitBackPercentageInterval2
                }
                onChange={(event) => handleIntervalChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Visit Back Interval</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Visitors like</strong>
            </p>
            <p className='text-muted'>It will count in percentage</p>
            <p className='text-danger'>* interval count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control'
                name='visitorsLikeBackPercentage'
                value={fakeInteractionConfig.visitorsLikeBackPercentage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted mt-10'></p>
            </div>
            &nbsp;
            <div className='flex col-lg-3'>
              <input
                type='text'
                className='form-control'
                name='visitorsLikeBackPercentageInterval'
                value={
                  fakeInteractionConfig.visitorsLikeBackPercentageInterval1 +
                  '-' +
                  fakeInteractionConfig.visitorsLikeBackPercentageInterval2
                }
                onChange={(event) => handleIntervalChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Visitors Like Interval</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Users like visit back</strong>
            </p>
            <p className='text-muted'>It will count in percentage</p>
            <p className='text-danger'>* interval count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control'
                name='usersLikeVisitBackPercentage'
                value={fakeInteractionConfig.usersLikeVisitBackPercentage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted mt-10'></p>
            </div>
            &nbsp;
            <div className='flex col-lg-3'>
              <input
                type='text'
                className='form-control'
                name='usersLikeVisitBackPercentageInterval'
                value={
                  fakeInteractionConfig.usersLikeVisitBackPercentageInterval1 +
                  '-' +
                  fakeInteractionConfig.usersLikeVisitBackPercentageInterval2
                }
                onChange={(event) => handleIntervalChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Users Like Visit Back Interval</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Admin message</strong>
            </p>
            <p className='text-muted'>-</p>
            <p className='text-danger'>* interval count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control'
                name='adminMessageCount'
                value={fakeInteractionConfig.adminMessageCount}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted mt-10'></p>
            </div>
            &nbsp;
            <div className='flex col-lg-3'>
              <input
                type='text'
                className='form-control'
                name='adminMessageCountInterval'
                value={
                  fakeInteractionConfig.adminMessageCountInterval1 +
                  '-' +
                  fakeInteractionConfig.adminMessageCountInterval2
                }
                onChange={(event) => handleIntervalChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Admin Message Interval</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Message back</strong>
            </p>
            <p className='text-muted'>It will count in percentage</p>
            <p className='text-danger'>* interval count in minutes</p>
          </div>
          <div className='col-lg-8 card-form__body card-body d-flex align-items-center bg-white'>
            <div className='flex col-lg-3'>
              <input
                type='number'
                className='form-control'
                name='MessageBackPercentage'
                value={fakeInteractionConfig.MessageBackPercentage}
                onChange={(event) => handleChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted mt-10'></p>
            </div>
            &nbsp;
            <div className='flex col-lg-3'>
              <input
                type='text'
                className='form-control'
                name='MessageBackPercentageInterval'
                value={
                  fakeInteractionConfig.MessageBackPercentageInterval1 +
                  '-' +
                  fakeInteractionConfig.MessageBackPercentageInterval2
                }
                onChange={(event) => handleIntervalChange(event)}
                onBlur={onBlurUpdate}
              />
              <p className='headings-color text-muted'>Message Back Interval</p>
            </div>
          </div>

          <div className='col-lg-4 card-body bg-light'>
            <p>
              <strong className='headings-color'>Message List</strong>
            </p>
            <p className='text-muted'>-</p>
          </div>
          <div className='col-lg-8 card-form__body card-body  bg-white'>
            <div>
              {messageBackList.map((message: any, index: any) => {
                return (
                  <>
                    <div
                      key={index}
                      className='badge bg-primary text-center text-white me-3 mb-5 fs-6 fw-bold pointer'
                    >
                      {message.message}{' '}
                      <span onClick={() => deleteMessageInConfig(message.id)}>
                        <i className='fa-solid fa-trash ms-4' style={{color: 'red'}}></i>
                      </span>
                    </div>
                  </>
                )
              })}
            </div>
            <div className='flex'>
              <textarea
                className='form-control'
                name='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                //onBlur={onBlurUpdate}
                rows={2}
              />
            </div>
            <div className='d-flex justify-content-end mt-5'>
              <button className='btn btn-primary' onClick={addMessageInConfig}>
                Add Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FakeUserInteraction
