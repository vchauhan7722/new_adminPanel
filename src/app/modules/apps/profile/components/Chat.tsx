/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {
  getAllGifts,
  getAllGiftsCategory,
  getChatMemberByUserID,
} from '../../../../../API/api-endpoint'
import {calculateTimeDifferenceForChatMessage} from '../../../../../utils/DateUtils'
import CustomPagination from '../../../../../_metronic/partials/componants/Pagination'
import {ErrorToastUtils} from '../../../../../utils/ToastUtils'
import {ChatInner} from './ChatInner'
import { useLocation } from 'react-router-dom'
import { GetIDFromURL } from '../../../../../utils/Utils'

const Chat = (props) => {
  const {CurrentUser} = props
  const [chatMemberList, setChatMemberList] = useState<any>(undefined)
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)
  const [totalPage, setTotalPage] = useState(0)
  const [receiverUserDetails, setReceiverUserDetails] = useState<any>(undefined)
  const [giftCategoriesList, setGiftCategoriesList] = useState<any>([])
  const [giftList, setGiftList] = useState<any>([])
  const [actionFlag, setActionFlag] = useState<any>(1)
  const [userTypeTabValue, setUserTypeTabValue] = useState<any>('app')
  const [isLoading, setIsLoading] = useState(false)

  //let userID = localStorage.getItem('userId')

  let location = useLocation()
  let userID = GetIDFromURL(location)

  useEffect(() => {
    getAllGiftCategoryList()
    getAllGiftLists()
  }, [])

  // useEffect(() => {
  //   getChatMemberByUID(page, pageSize, 1)
  // }, [])

  useEffect(() => {
    getChatMemberByUID(page, pageSize, actionFlag)
  }, [userTypeTabValue, actionFlag])

  const getChatMemberByUID = async (page: number, pageSize: number, pageRefreshCount: any) => {
    if (pageRefreshCount === 1) {
      setIsLoading(true)
      setChatMemberList(undefined)
    }

    let result = await getChatMemberByUserID(userID, page, pageSize, userTypeTabValue)
    if (result.status === 200) {
      setChatMemberList(result.data)
      setReceiverUserDetails(receiverUserDetails)
      setTotalPage(result.totalPage)
      setIsLoading(false)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
      ErrorToastUtils()
    }
  }

  const getAllGiftCategoryList = async () => {
    let result = await getAllGiftsCategory()
    setGiftCategoriesList(result)
  }

  const getAllGiftLists = async () => {
    let result = await getAllGifts()
    setGiftList(result)
  }

  const getRoom = (memberDetails: any) => {
    if (memberDetails !== receiverUserDetails) {
      //when selected user and chatinner side is not same
      setReceiverUserDetails(undefined)
      setTimeout(() => {
        setReceiverUserDetails(memberDetails)
      }, 500)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getChatMemberByUID(page, pageSize, actionFlag)
  }

  return (
    <div className='d-flex flex-column flex-lg-row mt-5'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
        <div className='card'>
          <div className='card-title mt-1'>
            <div className='d-flex overflow-auto ms-5 justify-content-center'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <div
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (userTypeTabValue === 'app' && 'active')
                    }
                    onClick={() => setUserTypeTabValue('app')}
                  >
                    Normal User
                  </div>
                </li>
                <li className='nav-item'>
                  <div
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (userTypeTabValue === 'anonyms' && 'active')
                    }
                    onClick={() => setUserTypeTabValue('anonyms')}
                  >
                    Anonymous User
                  </div>
                </li>
              </ul>
            </div>
            <div className='p-3'>
              <form className='w-100 position-relative' autoComplete='off'>
                <KTIcon
                  iconName='magnifier'
                  className='fs-2 text-lg-1 text-gray-500 position-absolute mt-7 ms-5 translate-middle-y'
                />

                <input
                  type='text'
                  className='form-control form-control-solid px-15'
                  name='search'
                  placeholder='Search by username or email...'
                />
              </form>
            </div>
          </div>

          <div id='kt_chat_contacts_body'>
            <div
              className='scroll-y me-n5 pe-9 ps-4 h-500px'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
              <div className='separator separator-dashed d-none'></div>

              {isLoading && (
                <div className='d-flex justify-content-center'>
                  <div className='spinner-border' role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                </div>
              )}

              {chatMemberList !== undefined &&
                chatMemberList.map((member: any, index: any) => {
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
                            <a
                              href='#'
                              className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'
                            >
                              {member.fullName}
                            </a>
                            <div className='fw-bold text-gray-400'>
                              {member?.messageDetail?.type === 'gift' &&
                                member?.messageDetail?.type}
                              {member?.messageDetail?.type === 'media' &&
                                member?.messageDetail?.type}
                              {member?.messageDetail?.type === 'text' &&
                                member?.messageDetail?.message}
                              {member?.messageDetail?.type === 'credit' &&
                                member?.messageDetail?.message}
                              {/* {(member?.messageDetail?.type === 'message' ||
                                member?.messageDetails?.type === 'text' ||
                                member?.messageDetail?.type === 'credit') &&
                                member?.messageDetail?.message} */}
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
            {chatMemberList !== undefined && (
              <CustomPagination
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalPage={totalPage}
                cb={getPagination}
              />
            )}
          </div>
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card' id='kt_chat_messenger'>
          {receiverUserDetails !== undefined ? (
            <ChatInner
              receiverUserDetails={receiverUserDetails}
              giftCategoriesList={giftCategoriesList}
              giftList={giftList}
              setActionFlag={setActionFlag}
              actionFlag={actionFlag}
              CurrentUser={CurrentUser}
            />
          ) : (
            <div className='card-header h-700px' id='kt_chat_messenger_header '></div>
          )}
        </div>
      </div>
    </div>
  )
}

export {Chat}
