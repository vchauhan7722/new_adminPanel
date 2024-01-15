import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'
import clsx from 'clsx'
import {KTCardBody} from '../../../../../../../_metronic/helpers'
import CustomPagination from '../../../../../../../_metronic/partials/componants/Pagination'
import ToastUtils, {ErrorToastUtils} from '../../../../../../../utils/ToastUtils'
import {DateTimeFormatter, TimeFormatter} from '../../../../../../../utils/DateUtils'
import {
  ReUploadSelectedStory,
  ReUploadUserStory,
  UpdateUserStory,
  deleteSelectedStory,
  deleteUserStory,
  getAllStories,
} from '../../../../../../../API/api-endpoint'
import LightBoxComponent from '../../../../../../../_metronic/partials/componants/LightBoxComponent'
import {CustomToggle} from '../../../../../../../_metronic/partials/componants/CustomToggle'

const Stories = () => {
  const UserId = localStorage.getItem('userId')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(15)
  const [storyList, setStoryList] = useState([])
  const [filter, setFilter] = useState({userId: '', isPrivate: ''})
  const [selectedUser, setSelectedUser] = useState<any>([])
  const [userStoryCredit, setuserStoryCredit] = useState<any>(0)
  const [storyUserId, setstoryUserId] = useState<any>(0)
  const [storyId, setStoryId] = useState<any>(0)
  const [storyCount, setStoryCount] = useState<any>(0)
  const [openLightBox, setOpenLightBox] = useState(false)
  const [lightBoxArrayList, setLightBoxArrayList] = useState<any>([])

  useEffect(() => {
    getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
  }, [])

  const getAllStoryList = async (page: any, pageSize: any, isPrivate: any, userId: any) => {
    let result = await getAllStories(page, pageSize, isPrivate, userId)
    if (result.status === 200) {
      setStoryList(result.data)
      setTotalPage(result.totalPage)
      setStoryCount(result.count)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
    //getActivitiesList(page, pageSize, type)
  }

  const filterMedia = () => {
    getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
  }

  const handleSelectChange = (type: any, mediaId: any) => {
    if (type === true) {
      let selectedMediaArray = [...selectedUser]
      selectedMediaArray.push(mediaId)
      //console.log('selectedMediaArray', selectedMediaArray)
      setSelectedUser(selectedMediaArray)
    } else {
      let oldArray = [...selectedUser]
      let index = oldArray.findIndex((userID) => userID === mediaId)
      oldArray.splice(index, 1)
      //console.log('oldArray', oldArray)
      setSelectedUser(oldArray)
    }
  }

  const handleSelectAllMedia = (type: any) => {
    if (type === true) {
      let oldArray = [...selectedUser]
      storyList.map((media: any) => oldArray.push(media?.id))
      setSelectedUser(oldArray)
    } else {
      setSelectedUser([])
    }

    let oldMediaArray = [...storyList]
    setStoryList(oldMediaArray)
  }

  const deleteMultiPleStory = async () => {
    let result = await deleteSelectedStory(selectedUser)
    if (result.status === 200) {
      setSelectedUser([])
      ToastUtils({type: 'success', message: 'Story Is Deleted'})
      getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
    } else {
      ErrorToastUtils()
    }
  }

  const DeleteSingleStory = async (userID: any, storyID: any) => {
    let result = await deleteUserStory(userID, storyID)
    if (result.status === 200) {
      getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
      ToastUtils({type: 'success', message: 'Your story has Removed'})
    } else {
      ToastUtils({type: 'error', message: 'Error in Deleting story'})
    }
  }

  const updateCreditofStory = async () => {
    let result = await UpdateUserStory(userStoryCredit, storyUserId, storyId)
    if (result.status === 200) {
      getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
      ToastUtils({type: 'success', message: 'Your Story is Updated'})
      setuserStoryCredit(0)
      setStoryId(0)
    } else {
      ToastUtils({type: 'error', message: 'Error in Updating Story'})
    }
  }

  const reuploadStory = async (userId: any, mediaId: any) => {
    let result = await ReUploadUserStory(userId, mediaId)
    if (result.status === 200) {
      getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
      ToastUtils({type: 'success', message: 'Your Story is Uploaded'})
    } else {
      ToastUtils({type: 'error', message: 'Error in Uploading Story'})
    }
  }

  const reUploadMultipleStory = async () => {
    let result = await ReUploadSelectedStory(selectedUser)
    if (result.status === 200) {
      setSelectedUser([])
      ToastUtils({type: 'success', message: 'Story Is Reuploaded'})
      getAllStoryList(page, pageSize, filter.isPrivate, filter.userId)
    } else {
      ErrorToastUtils()
    }
  }

  const filterUsingUid = (userID: any, mediaId: any) => {
    getAllStoryList(page, pageSize, filter.isPrivate, userID)
    setFilter({userId: userID, isPrivate: ''})
    // let oldStoryArray = [...selectedUser]
    // oldStoryArray.push(mediaId)
    // setSelectedUser(oldStoryArray)
  }

  const clearFilter = () => {
    setFilter({userId: '', isPrivate: ''})
    getAllStoryList(page, pageSize, '', '')
  }

  const handleaddMediaforLightbox = (url: string) => {
    let PhotoObject = {
      src: url,
    }
    setLightBoxArrayList([PhotoObject])
  }

  return (
    <>
      <div className='card py-4 px-4 mb-5'>
        <div className='d-flex justify-content-between'>
          <div className='row'>
            <div className='col-6'>
              <input
                placeholder='Search By User ID'
                type='text'
                name='search'
                className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                autoComplete='off'
                value={filter.userId}
                onChange={(e) => setFilter({...filter, userId: e.target.value})}
              />
            </div>
            <div className='col-6'>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='type'
                data-hide-search='true'
                name='type'
                defaultValue={filter.isPrivate}
                onChange={(e) => setFilter({...filter, isPrivate: e.target.value})}
              >
                <option value=''>All</option>
                <option value='false'>Public</option>
                <option value='true'>Private</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type='submit'
              className={'btn btn-primary'}
              onClick={filterMedia}
              // disabled={!isAnyProfileChanges}
            >
              <i className='fa-solid fa-rotate-right'></i>
            </button>
          </div>
        </div>
      </div>

      {selectedUser.length === 0 && (
        <div className='card py-4 px-4 mb-5'>
          <div className='d-flex justify-content-between'>
            <div className='row'>
              <h4>SEARCH RESULT {storyCount} STORIES </h4>
            </div>

            <div>
              <button
                type='submit'
                className={'btn btn-primary'}
                onClick={clearFilter}
                // disabled={!isAnyProfileChanges}
              >
                <i className='fa-solid fa-close'></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser.length !== 0 && (
        <div className='card py-4 px-4 mb-5'>
          <div className='d-flex justify-content-between'>
            <h4 className='mt-2'>Selected {selectedUser.length} Media</h4>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  id='dropdown-basic'
                  className='bg-body-secondary bg-body-secondary:hover'
                  size='sm'
                >
                  <i className='bi bi-three-dots fs-3'></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={reUploadMultipleStory}>
                    Reupload {selectedUser.length} Media
                  </Dropdown.Item>
                  <Dropdown.Item onClick={deleteMultiPleStory}>
                    Delete {selectedUser.length} Media
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      )}
      <KTCardBody className='py-4 card'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer h-500 overflow-scroll'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check-target='#kt_table_users .form-check-input'
                    onChange={(e) => handleSelectAllMedia(e.target.checked)}
                  />
                </td>
                <td>Media</td>
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
              {storyList.map((story: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        data-kt-check-target='#kt_table_users .form-check-input'
                        defaultChecked={selectedUser.includes(story?.storyId)}
                        onChange={(e) => handleSelectChange(e.target.checked, story?.storyId)}
                      />
                    </td>
                    <td>
                      <div
                        className='symbol symbol-50px overflow-visible me-3'
                        onClick={() => {
                          handleaddMediaforLightbox(
                            `${process.env.REACT_APP_SERVER_URL}/${story.media}`
                          )
                          setOpenLightBox(true)
                        }}
                      >
                        <img
                          src={
                            `${process.env.REACT_APP_SERVER_URL}/${story.media}` ||
                            `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                          }
                          alt='icon'
                          width='50px'
                          height='50px'
                          loading='lazy'
                        />
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6 '>
                        {DateTimeFormatter(story.updatedAt)}
                        <br></br>
                        {TimeFormatter(story.updatedAt)}
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
                      <div
                        className='d-flex align-items-center'
                        onClick={() => filterUsingUid(story?.userDetail?.userId, story.storyId)}
                      >
                        <div
                          className='symbol symbol-40px symbol-circle overflow-visible me-3'
                          onClick={() => {
                            handleaddMediaforLightbox(
                              `${process.env.REACT_APP_SERVER_URL}/${story?.userDetail?.profileImage}`
                            )
                            setOpenLightBox(true)
                          }}
                        >
                          <img
                            src={
                              `${process.env.REACT_APP_SERVER_URL}/${story?.userDetail?.profileImage}` ||
                              `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                            }
                            alt='icon'
                            width='50px'
                            height='50px'
                            loading='lazy'
                          />
                        </div>

                        <div className='flex-grow-1'>
                          <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                            {story?.userDetail?.fullName}
                          </a>
                          <span className='text-muted fw-semibold d-block fs-6'>
                            ID : {story?.userDetail?.userId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          as={CustomToggle}
                          id='dropdown-basic'
                          className='bg-body-secondary bg-body-secondary:hover'
                          size='sm'
                        ></Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link
                              to={`/apps/users-profile/media/${story?.userDetail?.userId}`}
                              style={{color: 'black'}}
                            >
                              Edit Profile
                            </Link>
                          </Dropdown.Item>
                          {!story?.status && (
                            <Dropdown.Item
                              onClick={() =>
                                reuploadStory(story?.userDetail?.userId, story?.storyId)
                              }
                            >
                              ReUpload Story
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item
                            data-bs-toggle='modal'
                            data-bs-target='#edit_credit_of_story'
                            onClick={() => {
                              setStoryId(story?.storyId)
                              setuserStoryCredit(parseInt(story?.storyCredit))
                              setstoryUserId(story?.userDetail?.userId)
                            }}
                          >
                            Set Story Price
                          </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() =>
                              DeleteSingleStory(story?.userDetail?.userId, story?.storyId)
                            }
                          >
                            Delete Story
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <LightBoxComponent
            openLightBox={openLightBox}
            setOpenLightBox={setOpenLightBox}
            lightBoxArray={lightBoxArrayList}
          />
          <div className='card-footer'>
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              cb={getPagination}
            />
          </div>
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

export default Stories
