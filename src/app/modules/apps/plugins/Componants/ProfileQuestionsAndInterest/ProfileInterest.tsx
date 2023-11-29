import React, {useEffect, useState} from 'react'
import {KTCardBody} from '../../../../../../_metronic/helpers'
import clsx from 'clsx'
import {
  addUserInterest,
  createInterest,
  getAllInterest,
  removeInterest,
  updateInterest,
} from '../../../../../../API/api-endpoint'
import ToastUtils from '../../../../../../utils/ToastUtils'

const ProfileInterest = () => {
  let userID = localStorage.getItem('userId')
  const [interestList, setInterestList] = useState([])
  const [interest, setInterest] = useState('')
  const [interestFlag, setInterestFlag] = useState(1)
  const [interestID, setInterestID] = useState(0)

  useEffect(() => {
    getAllInterestList()
  }, [interestFlag])

  const getAllInterestList = async () => {
    let result = await getAllInterest()
    setInterestList(result)
  }

  const addInterestInList = async () => {
    let result = await createInterest(interest)
    if (result.status === 200) {
      setInterestFlag(interestFlag + 1)
      setInterest('')
      ToastUtils({type: 'success', message: 'Interest Was Added'})
    } else {
      ToastUtils({type: 'error', message: 'Interest Was Not Added'})
    }
  }

  const deleteInterestInList = async () => {
    let result = await removeInterest(interestID)
    if (result.status === 200) {
      setInterestFlag(interestFlag + 1)
      setInterest('')
      ToastUtils({type: 'success', message: 'Interest Was Deleted'})
    } else {
      ToastUtils({type: 'error', message: 'Interest Was Not Deleted'})
    }
  }

  const updateInterestInList = async () => {
    let result = await updateInterest(interestID, interest)
    if (result.status === 200) {
      setInterestFlag(interestFlag + 1)
      setInterest('')
      ToastUtils({type: 'success', message: 'Interest Was Updated'})
    } else {
      ToastUtils({type: 'success', message: 'Interest Was Not Deleted'})
    }
  }

  return (
    <KTCardBody className='py-4 '>
      <span className='fs-3 fw-bold'>Interest</span>

      <div className='mt-4 '>
        <div className='d-flex justify-content-end'>
          <button
            className='btn btn-sm btn-primary'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_1'
          >
            Add Interest
          </button>
        </div>
        <div className='mt-5'>
          {interestList !== undefined &&
            interestList.map((interest: any) => {
              return (
                <div
                  className='badge badge-light text-center me-3 mb-5 fs-6 fw-bold'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_2'
                  onClick={() => {
                    setInterest(interest?.name)
                    setInterestID(interest?.interestId)
                  }}
                >
                  {interest?.name}
                </div>
              )
            })}
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='kt_modal_1'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Add Interest</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='modal-body'>
              <input
                placeholder='Enter Your Interest'
                type='text'
                name='interest'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-light' data-bs-dismiss='modal'>
                Close
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={addInterestInList}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='kt_modal_2'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Edit Interest</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='modal-body'>
              <input
                placeholder='Enter Your Interest'
                type='text'
                name='interest'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              />
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={deleteInterestInList}
              >
                Delete Interest
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={updateInterestInList}
              >
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </KTCardBody>
  )
}

export default ProfileInterest
