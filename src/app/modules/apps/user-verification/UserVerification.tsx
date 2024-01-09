import React, {useEffect, useState} from 'react'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {KTCardBody} from '../../../../_metronic/helpers'
import CustomPagination from '../../../../_metronic/partials/componants/Pagination'
import {getUserVerificationList, updateUserVerification} from '../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../utils/ToastUtils'
import {Link} from 'react-router-dom'
import clsx from 'clsx'
import Swal from 'sweetalert2'

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Verification',
    path: '/user-verification',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UserVerification = () => {
  const [UserVerificationList, setUserVerificationList] = useState<any>([])
  const [pageSize, setPageSize] = useState(10)
  const [totalPage, setTotalPage] = useState(0)
  const [userVerification, setuserVerification] = useState<any>({verifyStatus: 'pending'})

  useEffect(() => {
    getUserList(1, pageSize)
  }, [])

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getUserList(page, pageSize)
  }

  const getUserList = async (page: any, pageSize: any) => {
    let result = await getUserVerificationList(page, pageSize)
    if (result.status === 200) {
      setUserVerificationList(result.data)
      setTotalPage(result.totalPage)
    } else {
      ErrorToastUtils()
    }
  }

  const verifyUser = async () => {
    Swal.fire({
      title: 'Are you sure To verify This User?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Verify',
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserVerificationStatus('verified', null)
      }
    })
  }

  const rejectUser = async () => {
    Swal.fire({
      title: 'Write A Reason For Rejection',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
        try {
          await updateUserVerificationStatus('rejected', reason)
        } catch (error) {
          Swal.showValidationMessage(`
              Request failed: ${error}
            `)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  }

  const updateUserVerificationStatus = async (verifyStatus: any, reason: any) => {
    let result = await updateUserVerification(
      userVerification?.userId,
      userVerification?.id,
      verifyStatus,
      reason
    )
    if (result.status === 200) {
      getUserList(1, pageSize)
      ToastUtils({
        type: 'success',
        message:
          verifyStatus === 'verified' ? 'User Verified SuccessFully' : 'User Rejected SuccessFully',
      })
    } else {
      ErrorToastUtils()
    }
  }

  return (
    <>
      <PageTitle breadcrumbs={profileBreadCrumbs}>User Pending Verification</PageTitle>
      <KTCardBody className='py-4 card'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                <td>User Info</td>
                <td>Selfie Photo</td>
                <td>Verify Status</td>
                <td>Reason</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className='text-gray-600 '>
              {UserVerificationList.length !== 0 &&
                UserVerificationList.map((userVerification: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-circle symbol-50px overflow-visible me-3'>
                            <img
                              src={
                                `${process.env.REACT_APP_SERVER_URL}/${userVerification?.userDetail?.profileImage}` ||
                                `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                              }
                              alt='logo'
                              width='50px'
                              height='50px'
                              loading='lazy'
                            />
                            {!userVerification?.userDetail?.isOnline && (
                              <div className='position-absolute  bottom-0 end-0 bg-success rounded-circle border border-3 border-white h-15px w-15px'></div>
                            )}
                          </div>

                          <div className='d-flex flex-column'>
                            <Link
                              to={`/apps/users-profile/activity/${userVerification?.userDetail?.userId}`}
                              className='fw-bolder text-gray-800 text-hover-primary mb-1'
                            >
                              {userVerification?.userDetail?.fullName}
                            </Link>

                            <span className='text-gray-500 fw-bold'>
                              (ID : {userVerification?.userDetail?.userId})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='symbol symbol-circle symbol-50px overflow-visible me-3'>
                          <img
                            src={
                              `${process.env.REACT_APP_SERVER_URL}/${userVerification?.media}` ||
                              `https://preview.keenthemes.com/metronic8/react/demo1//media/avatars/300-6.jpg`
                            }
                            alt='logo'
                            width='50px'
                            height='50px'
                            loading='lazy'
                          />
                        </div>
                      </td>
                      <td>
                        <span
                          className={clsx(
                            'badge fw-bolder',
                            userVerification?.verifyStatus === 'pending' && 'badge-warning',
                            userVerification?.verifyStatus === 'rejected' && 'badge-danger',
                            userVerification?.verifyStatus === 'verified' && 'badge-success'
                          )}
                        >
                          {userVerification?.verifyStatus}
                        </span>
                      </td>
                      <td>
                        <span>{userVerification?.reason || ' - '}</span>
                      </td>
                      <td>
                        <div className='d-flex my-4'>
                          <button
                            className='btn btn-primary'
                            onClick={() => setuserVerification(userVerification)}
                            data-bs-toggle='modal'
                            data-bs-target='#view_photo_modal'
                          >
                            <i className='fa-solid fa-ellipsis-vertical'></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <div className='card-footer'>
          {UserVerificationList.length !== 0 && (
            <CustomPagination
              pageSize={pageSize}
              setPageSize={setPageSize}
              totalPage={totalPage}
              cb={getPagination}
            />
          )}
        </div>

        <div
          className='modal fade modal-lg'
          id='view_photo_modal'
          tabIndex={-1}
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog'>
            <div className='modal-content'>
              <div className='modal-body bg-transparent'>
                <div className='overflow-visible me-3 d-flex justify-content-center align-items-center'>
                  <img
                    src={`${process.env.REACT_APP_SERVER_URL}/${userVerification?.media}`}
                    alt='logo'
                    className='bg-image '
                    style={{height: '75vh'}}
                    loading='lazy'
                  />
                </div>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                  Close
                </button>
                {userVerification?.verifyStatus === 'pending' && (
                  <>
                    <button
                      type='button'
                      className='btn btn-danger'
                      data-bs-dismiss='modal'
                      onClick={() => rejectUser()}
                    >
                      Reject
                    </button>
                    <button
                      type='button'
                      className='btn btn-success'
                      data-bs-dismiss='modal'
                      onClick={() => verifyUser()}
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </KTCardBody>
    </>
  )
}

export default UserVerification
