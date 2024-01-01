/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {
  getAllGifts,
  getAllGiftsCategory,
  getAllNormalUserChatMembers,
  getChatMemberByUserID,
} from '../../../../API/api-endpoint'
import {calculateTimeDifferenceForChatMessage} from '../../../../utils/DateUtils'
import CustomPagination from '../../../../_metronic/partials/componants/Pagination'
import ToastUtils, {ErrorToastUtils} from '../../../../utils/ToastUtils'
import {AnonymousChatInner} from './AnonymousChatInner'
import AnonymousUser from './AnonymousUser'
import {useLayout} from '../../../../_metronic/layout/core'
import clsx from 'clsx'

const AnonymousChat = (props) => {
  const {CurrentUser} = props
  const [chatMemberList, setChatMemberList] = useState<any>(undefined)
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)
  const [totalPage, setTotalPage] = useState(0)
  const [selectedNormalUser, setSelectedNormalUser] = useState<any>(undefined)
  const [selectedAnonymousUser, setSelectedAnonymousUser] = useState<any>(undefined)
  const [giftCategoriesList, setGiftCategoriesList] = useState<any>([])
  const [giftList, setGiftList] = useState<any>([])
  const [actionFlag, setActionFlag] = useState<any>(0)
  const [updateAnonymousUserFlag, setUpdateAnonymousUserFlag] = useState(0)

  let userID = '531' //localStorage.getItem('userId')

  const {config} = useLayout()
  console.log('config', config)

  useEffect(() => {
    getAllGiftCategoryList()
    getAllGiftLists()
  }, [])

  useEffect(() => {
    getChatMemberByUID(page, pageSize)
  }, [actionFlag])

  const getChatMemberByUID = async (page: number, pageSize: number) => {
    //let result = await getChatMemberByUserID(userID, page, pageSize, 'app')
    let result = await getAllNormalUserChatMembers(page, pageSize)
    if (result.status === 200) {
      setChatMemberList(result.data)
      setSelectedNormalUser(undefined)
      //setSelectedAnonymousUser(undefined)
      setTotalPage(result.totalPage)
    } else {
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
    if (memberDetails !== selectedNormalUser) {
      //when selected user and chatinner side is not same
      setSelectedNormalUser(undefined)
      setSelectedAnonymousUser(undefined)
      setTimeout(() => {
        setSelectedNormalUser(memberDetails)
        //setSelectedAnonymousUser(memberDetails)
      }, 500)
    }
  }

  const getPagination = (page: any, pageSize: any) => {
    if (page === 0 || page === 1) {
      page = 1
    }
    getChatMemberByUID(page, pageSize)
  }

  return (
    <div className='row mt-5'>
      {' '}
      {/*d-flex flex-column flex-lg-row */}
      <div className='col-3'>
        {/*flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px */}
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
                            {member?.unreadCount !== 0 && (
                              <span className='badge badge-circle badge-light-success me-2'>
                                {member?.unreadCount}
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
      <div className='col-6'>
        <div className='card' id='kt_chat_messenger'>
          {selectedAnonymousUser !== undefined ? (
            <AnonymousChatInner
              selectedNormalUser={selectedNormalUser}
              selectedAnonymousUser={selectedAnonymousUser}
              giftCategoriesList={giftCategoriesList}
              giftList={giftList}
              setActionFlag={setActionFlag}
              actionFlag={actionFlag}
              CurrentUser={CurrentUser}
              updateAnonymousUserFlag={updateAnonymousUserFlag}
              setUpdateAnonymousUserFlag={setUpdateAnonymousUserFlag}
            />
          ) : (
            <div className='card-header h-650px' id='kt_chat_messenger_header '></div>
          )}
        </div>
        {/*flex-lg-row-fluid */}
      </div>
      <div className='col-3'>
        <div className='card' id='kt_chat_messenger'>
          {selectedNormalUser !== undefined ? (
            <AnonymousUser
              selectedNormalUser={selectedNormalUser}
              setSelectedNormalUser={setSelectedNormalUser}
              selectedAnonymousUser={selectedAnonymousUser}
              setSelectedAnonymousUser={setSelectedAnonymousUser}
              giftCategoriesList={giftCategoriesList}
              giftList={giftList}
              setActionFlag={setActionFlag}
              actionFlag={actionFlag}
              CurrentUser={CurrentUser}
              updateAnonymousUserFlag={updateAnonymousUserFlag}
              setUpdateAnonymousUserFlag={setUpdateAnonymousUserFlag}
            />
          ) : (
            <div className='card-header h-650px' id='kt_chat_messenger_header '></div>
          )}
        </div>
        {/*flex-lg-row-fluid */}
      </div>
    </div>
  )
}

export {AnonymousChat}
