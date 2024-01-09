/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {calculateTimeDifferenceForChatMessage} from '../../../../utils/DateUtils'
import {getChatMemberByUserID} from '../../../../API/api-endpoint'
import CustomPagination from '../../../../_metronic/partials/componants/Pagination'

const AnonymousUser = (props: any) => {
  const {
    selectedNormalUser,
    selectedAnonymousUser,
    setSelectedAnonymousUser,
    setSelectedNormalUser,
    updateAnonymousUserFlag,
    setUpdateAnonymousUserFlag,
  } = props

  const [anonymousUserList, setAnonymousUserList] = useState<any>(undefined)
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    getAnonymousUserUsingNormalUserId(page, pageSize)
  }, [updateAnonymousUserFlag])

  const getAnonymousUserUsingNormalUserId = async (page: any, pageSize: any) => {
    let result = await getChatMemberByUserID(selectedNormalUser.userId, page, pageSize, 'anonyms')
    if (result.status === 200) {
      setAnonymousUserList(result.data)
      setSelectedAnonymousUser(undefined)
      setTotalPage(result.totalPage)
    }
  }

  const getRoom = (memberDetails: any) => {
    if (memberDetails !== selectedAnonymousUser) {
      //when selected user and chatinner side is not same
      //setSelectedNormalUser(undefined)
      setSelectedAnonymousUser(undefined)
      setTimeout(() => {
        // setSelectedNormalUser(memberDetails)
        setSelectedAnonymousUser(memberDetails)
      }, 500)
      //getchatList()
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getAnonymousUserUsingNormalUserId(page, pageSize)
  }

  return (
    <>
      {anonymousUserList !== undefined && (
        <div className='card card-flush'>
          <div className='card-header pt-7' id='kt_chat_contacts_header'>
            <form className='w-100 position-relative' autoComplete='off'>
              <KTIcon
                iconName='magnifier'
                className='fs-2 text-lg-1 text-gray-500 position-absolute top-50 ms-5 translate-middle-y'
              />

              <input
                type='text'
                className='form-control form-control-solid px-15'
                name='search'
                placeholder='Search by username or email...'
              />
            </form>
          </div>

          <div className='card-body pt-5' id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-5 h-450px'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
              <div className='separator separator-dashed d-none'></div>

              {anonymousUserList !== undefined &&
                anonymousUserList.map((member: any, index: any) => {
                  return (
                    <>
                      <div
                        key={index}
                        className='d-flex flex-stack py-4 hover-effect'
                        onClick={() => getRoom(member)}
                      >
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px symbol-circle'>
                            <img
                              alt='Pic'
                              src={
                                `${process.env.REACT_APP_SERVER_URL}/${member.profileImage}` ||
                                toAbsoluteUrl('/media/avatars/300-5.jpg')
                              }
                              loading='lazy'
                            />
                          </div>

                          <div className='ms-5'>
                            <p className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'>
                              {member.fullName}
                            </p>
                            <div className='fw-bold text-gray-400'>
                              {member?.messageDetail?.type === 'gift' &&
                                member?.messageDetail?.type}
                              {member?.messageDetail?.type === 'media' &&
                                member?.messageDetail?.type}
                              {(member?.messageDetail?.type === 'message' ||
                                member?.messageDetail?.type === 'credit') &&
                                member?.messageDetail?.message}
                            </div>
                          </div>
                        </div>

                        <div className='d-flex flex-column align-items-end ms-2'>
                          <span className='text-muted fs-7 mb-1'>
                            {calculateTimeDifferenceForChatMessage(
                              member?.messageDetail?.createdAt || member?.chatMemberCreatedAt
                            )}
                          </span>

                          <div>
                            <span>
                              {member?.pin === 1 && <i className='fa-solid fa-thumbtack me-3'></i>}
                            </span>
                            <span>
                              {member?.like === 1 && <i className='fa-solid fa-heart me-3'></i>}
                            </span>
                            {member?.unreadMessageCount !== 0 && (
                              <span className='badge badge-circle badge-light-success me-2'>
                                {member?.unreadMessageCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='separator separator-dashed'></div>
                    </>
                  )
                })}
            </div>
          </div>

          <div className='card-footer'>
            {anonymousUserList !== undefined && (
              <CustomPagination
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPage={totalPage}
                cb={getPagination}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AnonymousUser
