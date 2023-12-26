import React, {useEffect, useState} from 'react'
import {KTCardBody} from '../../../../../../../_metronic/helpers'
import ToastUtils from '../../../../../../../utils/ToastUtils'
import {Link} from 'react-router-dom'
import {Dropdown} from 'react-bootstrap'
import clsx from 'clsx'
import CustomPagination from '../../../../../../../_metronic/partials/componants/Pagination'
import {
  deleteSelectedMedia,
  getAllUserAnonymousMedia,
  removeMediaActionForUserMedia,
  setMediaAsAStoryForUserMedia,
  updateMediaActionForUserMedia,
} from '../../../../../../../API/api-endpoint'
import {DateTimeFormatter, TimeFormatter} from '../../../../../../../utils/DateUtils'

const Photos = () => {
  const UserId = localStorage.getItem('userId')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(15)
  const [mediaList, setMediaList] = useState([])
  const [filter, setFilter] = useState({userId: '', isPrivate: ''})
  const [selectedUser, setSelectedUser] = useState<any>([])
  //id

  useEffect(() => {
    getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
  }, [])

  const getAllMediaList = async (page: any, pageSize: any, isPrivate: any, userId: any) => {
    let result = await getAllUserAnonymousMedia(page, pageSize, isPrivate, userId)
    if (result.status === 200) {
      setMediaList(result.data)
      setTotalPage(result.totalPage)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
    //getActivitiesList(page, pageSize, type)
  }

  const filterMedia = () => {
    getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
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
      mediaList.map((media: any) => oldArray.push(media?.id))
      setSelectedUser(oldArray)
    } else {
      setSelectedUser([])
    }

    let oldMediaArray = [...mediaList]
    setMediaList(oldMediaArray)
  }

  const deleteMultiPleMedia = async () => {
    let result = await deleteSelectedMedia(selectedUser)
    if (result.status === 200) {
      setSelectedUser([])
      ToastUtils({type: 'success', message: 'Media Is Deleted'})
      getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const UploadToStory = async (userID: any, mediaId: any) => {
    let result = await setMediaAsAStoryForUserMedia(userID, mediaId)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'Media Is Uploaded As a Story'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const DeleteSingleMedia = async (userID: any, mediaId: any) => {
    let result = await removeMediaActionForUserMedia(userID, mediaId)
    if (result.status === 200) {
      getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
      ToastUtils({type: 'success', message: 'Media Is Deleted'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
  }

  const setMediaAsPrivate = async (userID: any, mediaId: any, typeValue: any) => {
    let result = await updateMediaActionForUserMedia(userID, mediaId, 'isPrivate', typeValue)
    if (result.status === 200) {
      getAllMediaList(page, pageSize, filter.isPrivate, filter.userId)
      ToastUtils({type: 'success', message: !typeValue ? 'Media Is Public' : 'Media Is Private'})
    } else {
      ToastUtils({type: 'error', message: 'Something Went Wrong'})
    }
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
                  <Dropdown.Item onClick={deleteMultiPleMedia}>
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
                <td>User</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              {mediaList.map((media: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        data-kt-check-target='#kt_table_users .form-check-input'
                        defaultChecked={selectedUser.includes(media?.id)}
                        onChange={(e) => handleSelectChange(e.target.checked, media?.id)}
                      />
                    </td>
                    <td>
                      <div className='symbol symbol-50px overflow-visible me-3'>
                        <img
                          src={
                            `${process.env.REACT_APP_SERVER_URL}/${media.media}` ||
                            `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                          }
                          alt='icon'
                          width='50px'
                          height='50px'
                        />
                      </div>
                    </td>
                    <td>
                      <div className='text-muted fw-semibold fs-6'>
                        <div className='text-muted fw-semibold fs-6 '>
                          {DateTimeFormatter(media.updatedAt)}
                          <br></br>
                          {TimeFormatter(media.updatedAt)}
                        </div>
                      </div>
                    </td>
                    <td>
                      {media.isPrivate ? (
                        <span className='badge rounded-pill text-bg-danger text-white'>
                          Private
                        </span>
                      ) : (
                        <span className='badge rounded-pill text-bg-success text-white'>
                          Public
                        </span>
                      )}
                    </td>
                    <td>
                      <div className='d-flex align-items-center '>
                        <div className='symbol symbol-40px symbol-circle overflow-visible me-3'>
                          <img
                            src={
                              `${process.env.REACT_APP_SERVER_URL}/${media?.userDetail?.profileImage}` ||
                              `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                            }
                            alt='icon'
                          />
                        </div>

                        <div className='flex-grow-1'>
                          <a href='#' className='text-gray-800 text-hover-primary fw-bold fs-4'>
                            {media?.userDetail?.fullName}
                          </a>
                          <span className='text-muted fw-semibold d-block fs-6'>
                            ID : {media?.userDetail?.userId}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          id='dropdown-basic'
                          className='bg-body-secondary bg-body-secondary:hover'
                          size='sm'
                        >
                          <i className='bi bi-three-dots fs-3'></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <Link
                              to={`/apps/users-profile/media/${media?.userDetail?.userId}`}
                              style={{color: 'black'}}
                            >
                              Edit Profile
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() =>
                              setMediaAsPrivate(
                                media?.userDetail?.userId,
                                media?.id,
                                !media.isPrivate
                              )
                            }
                          >
                            {media.isPrivate ? 'Set Public' : 'Set Private'}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => UploadToStory(media?.userDetail?.userId, media?.id)}
                          >
                            Upload to Story
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => DeleteSingleMedia(media?.userDetail?.userId, media?.id)}
                          >
                            Delete Media
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className='card-footer'>
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              cb={getPagination}
            />
          </div>
        </div>
      </KTCardBody>
    </>
  )
}

export default Photos
