/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {Dropdown1} from '../../../../../_metronic/partials'
import {getChatMemberByUserID, getMessagesByUserID} from '../../../../../API/api-endpoint'
import {DateTimeFormatter, calculateTimeDifference} from '../../../../../utils/Utils'
import InfinitScroll from 'react-infinite-scroll-component'
import {ChatInner} from '../../../../../_metronic/partials/chat/ChatInner'

const Chat: FC = () => {
  const [chatMemberList, setChatMemberList] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)
  const [receiverUserDetails, setReceiverUserDetails] = useState<any>(undefined)

  let userID = localStorage.getItem('userId')

  useEffect(() => {
    getChatMemberByUID(page, pageSize)
  }, [])

  const getChatMemberByUID = async (page: number, pageSize: number) => {
    let result = await getChatMemberByUserID(userID, page, pageSize)
    setChatMemberList(result)
  }

  const nextgetMember = () => {
    //console.log('offset', offset)
    let page_number = page + 1
    let page_size_number = pageSize + 10
    // getChatMemberByUID(page_number, page_size_number)
    setPage(page_number)
    setPageSize(page_size_number)
  }

  const getRoom = (memberDetails: any) => {
    setReceiverUserDetails(undefined)
    setTimeout(() => {
      setReceiverUserDetails(memberDetails)
    }, 500)
  }

  return (
    <div className='d-flex flex-column flex-lg-row mt-5'>
      <div className='flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0'>
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
              className='scroll-y me-n5 pe-5 h-500px'
              data-kt-scroll='true'
              data-kt-scroll-activate='{default: false, lg: true}'
              data-kt-scroll-max-height='auto'
              data-kt-scroll-dependencies='#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header'
              data-kt-scroll-wrappers='#kt_content, #kt_chat_contacts_body'
              data-kt-scroll-offset='0px'
            >
              <div className='separator separator-dashed d-none'></div>
              <InfinitScroll
                dataLength={chatMemberList.length}
                next={nextgetMember}
                hasMore={false}
                loader={<h4>Loading ... </h4>}
              >
                {chatMemberList !== undefined &&
                  chatMemberList.map((member: any, index: any) => {
                    return (
                      <>
                        <div
                          key={index}
                          className='d-flex flex-stack py-4'
                          onClick={() => getRoom(member)}
                        >
                          <div className='d-flex align-items-center'>
                            <div className='symbol symbol-45px symbol-circle'>
                              <img
                                alt='Pic'
                                src={
                                  toAbsoluteUrl('/media/avatars/300-5.jpg') ||
                                  `${process.env.REACT_SERVER_URL}/${member.usersDetail.profileImage}`
                                }
                              />
                            </div>

                            <div className='ms-5'>
                              <a
                                href='#'
                                className='fs-5 fw-bolder text-gray-900 text-hover-primary mb-2'
                              >
                                {member.usersDetail.fullName}
                              </a>
                              <div className='fw-bold text-gray-400'>Hello</div>
                            </div>
                          </div>

                          <div className='d-flex flex-column align-items-end ms-2'>
                            <span className='text-muted fs-7 mb-1'>
                              {calculateTimeDifference(member.updatedAt)}
                            </span>
                          </div>
                        </div>

                        <div className='separator separator-dashed d-none'></div>
                      </>
                    )
                  })}
              </InfinitScroll>
            </div>
          </div>
        </div>
      </div>

      <div className='flex-lg-row-fluid ms-lg-7 ms-xl-10'>
        <div className='card' id='kt_chat_messenger'>
          {receiverUserDetails !== undefined ? (
            <ChatInner receiverUserDetails={receiverUserDetails} />
          ) : (
            <div className='card-header h-600px' id='kt_chat_messenger_header '></div>
          )}
        </div>
      </div>
    </div>
  )
}

export {Chat}
