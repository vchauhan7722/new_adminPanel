/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react'
import {KTCardBody} from '../../../../../../../_metronic/helpers'
import {
  CreateUserStory,
  ReUploadUserStory,
  UpdateUserStory,
  deleteUserStory,
  getAllUserStory,
} from '../../../../../../../API/api-endpoint'
import {DateWithTimeFormatter} from '../../../../../../../utils/DateUtils'
import ToastUtils from '../../../../../../../utils/ToastUtils'
import {DropdownButton, Dropdown, Form} from 'react-bootstrap'
import clsx from 'clsx'
import {CustomToggle} from '../../../../../../../_metronic/partials/componants/CustomToggle'

const MediaTable = (props) => {
  const {getUpdatedStory, setGetUpdatedStory} = props
  const hiddenStoryInput = useRef<HTMLInputElement>(document.createElement('input'))
  const userId = localStorage.getItem('userId')
  const [userStoryList, setUserStoryList] = useState<any>([])
  const [isStoryUploaded, setisStoryUploaded] = useState<any>(false)
  const [userStoryCredit, setuserStoryCredit] = useState<any>(0)
  const [storyId, setStoryId] = useState<any>(0)

  useEffect(() => {
    getAllUserStoryList()
  }, [getUpdatedStory])

  const getAllUserStoryList = async () => {
    let result = await getAllUserStory(userId)
    setUserStoryList(result)
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`storyInput`)
    fileInput?.click()
  }

  const handleStoryChange = async (event: any) => {
    setisStoryUploaded(true)
    if (event.target.files[0]) {
      let result = await CreateUserStory(event.target.files[0], userId)
      if (result.status === 200) {
        let oldmedia = [...userStoryList]
        console.log('result', result)
        oldmedia.push(result.data)
        setUserStoryList(oldmedia)
        ToastUtils({type: 'success', message: 'Your story has Uploaded'})
        setisStoryUploaded(false)
      } else {
        ToastUtils({type: 'error', message: 'Error in Media story'})
        setisStoryUploaded(false)
      }
    }
  }

  const deletestory = async (mediaId: any) => {
    let result = await deleteUserStory(userId, mediaId)
    if (result.status === 200) {
      getAllUserStoryList()
      ToastUtils({type: 'success', message: 'Your story has Removed'})
    } else {
      ToastUtils({type: 'error', message: 'Error in Deleting story'})
    }
  }

  const reuploadStory = async (mediaId: any) => {
    let result = await ReUploadUserStory(userId, mediaId)
    if (result.status === 200) {
      getAllUserStoryList()
      ToastUtils({type: 'success', message: 'Your Story is Uploaded'})
    } else {
      ToastUtils({type: 'error', message: 'Error in Uploading Story'})
    }
  }

  const updateCreditofStory = async () => {
    let result = await UpdateUserStory(userStoryCredit, userId, storyId)
    if (result.status === 200) {
      getAllUserStoryList()
      ToastUtils({type: 'success', message: 'Your Story is Updated'})
      setuserStoryCredit(0)
      setStoryId(0)
    } else {
      ToastUtils({type: 'error', message: 'Error in Updating Story'})
    }
  }

  return (
    <>
      <div className='card-title pt-8 px-9 d-flex justify-content-between'>
        <div>
          <h4>Story</h4>
        </div>
        <div>
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => handleClick()}
            disabled={isStoryUploaded}
          >
            {!isStoryUploaded ? 'Upload Story' : 'Uploading...'}
          </button>
          <input
            type='file'
            name='icon'
            id={`storyInput`}
            onChange={(e) => handleStoryChange(e)}
            ref={hiddenStoryInput}
            style={{display: 'none'}} // Make the file input element invisible
            accept='image/*,video/*'
          />
        </div>
      </div>
      <KTCardBody className='py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>Story</td>
                <td>Date</td>
                <td>Type</td>
                <td>View</td>
                <td>Gift Credit</td>
                <td>Credit</td>
                <td>Status</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              {userStoryList !== undefined &&
                userStoryList.map((story: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center '>
                          <div className='symbol symbol-50px overflow-visible me-3'>
                            <img
                              src={
                                `${process.env.REACT_APP_SERVER_URL}/${story.url}` ||
                                `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                              }
                              alt='icon'
                              width='50px'
                              height='50px'
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='text-muted fw-semibold fs-6'>
                          {DateWithTimeFormatter(story?.startTime)}
                        </div>
                      </td>
                      <td>
                        <span>{story?.isPrivate ? 'private' : 'public'}</span>
                      </td>
                      <td>
                        <span>{story?.totalViews}</span>
                      </td>
                      <td>
                        <span>
                          {story?.totalGift}/{story?.totalGiftCredit}
                        </span>
                      </td>
                      <td>
                        <span>{story?.storyCredit || 0}</span>
                      </td>
                      <td>
                        <span>{story?.status ? 'visible' : 'Not Visible'}</span>
                      </td>
                      <td>
                        <div className='d-flex my-4'>
                          <Dropdown>
                            <Dropdown.Toggle
                              id='dropdown-basic'
                              as={CustomToggle}
                            ></Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item
                                data-bs-toggle='modal'
                                data-bs-target='#edit_credit_of_story'
                                onClick={() => {
                                  setStoryId(story?.storyId)
                                  setuserStoryCredit(parseInt(story?.storyCredit))
                                }}
                              >
                                Set Story Price
                              </Dropdown.Item>
                              <Dropdown.Item onClick={() => deletestory(story?.storyId)}>
                                Delete
                              </Dropdown.Item>

                              {!story?.status && (
                                <Dropdown.Item onClick={() => reuploadStory(story?.storyId)}>
                                  Reupload story
                                </Dropdown.Item>
                              )}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <div className='modal fade' tabIndex={-1} id='edit_credit_of_story'>
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Credits Of Story</h5>
                <div
                  className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                >
                  <i className='fa-solid fa-xmark'></i>
                </div>
              </div>
              <div className='modal-body'>
                <select
                  className='form-select form-select-solid fw-bolder'
                  data-kt-select2='true'
                  data-placeholder='Select option'
                  data-allow-clear='true'
                  data-kt-user-table-filter='gender'
                  data-hide-search='true'
                  name='credit'
                  //defaultValue={0}
                  value={userStoryCredit}
                  onChange={(e) => setuserStoryCredit(e.target.value)}
                >
                  <option value={0}>Free</option>
                  <option value={1}>1 Credits</option>
                  <option value={3}>3 Credits</option>
                  <option value={5}>5 Credits</option>
                  <option value={10}>10 Credits</option>
                  <option value={15}>15 Credits</option>
                  <option value={25}>25 Credits</option>
                  <option value={50}>50 Credits</option>
                  <option value={100}>100 Credits</option>
                  <option value={500}>500 Credits</option>
                </select>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn' data-bs-dismiss='modal'>
                  Cancel
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  data-bs-dismiss='modal'
                  onClick={updateCreditofStory}
                >
                  Update Credit
                </button>
              </div>
            </div>
          </div>
        </div>
      </KTCardBody>
    </>
  )
}

export default MediaTable

// <div className='d-flex my-4'>
// <div className='me-0'>
//   <div className='dropdown'>
//     <button className='dropbtn'>
//       <i className='bi bi-three-dots fs-3'></i>
//     </button>
//     <div className='dropdown-content'>
//       <span>Story Price</span>
//       <span onClick={() => deletestory(story?.storyId)}>
//         Delete Story
//       </span>
//       {!story?.status && (
//         <span onClick={() => reuploadStory(story?.storyId)}>
//           Reupload story
//         </span>
//       )}
//     </div>
//   </div>
// </div>
// </div>
