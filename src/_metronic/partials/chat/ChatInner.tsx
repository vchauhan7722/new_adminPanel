/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState, useRef} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl, defaultMessages, defaultUserInfos, UserInfoModel} from '../../helpers'
import socket from '../../../config'
import {getMessagesByUserID} from '../../../API/api-endpoint'
import {Dropdown1} from '../content/dropdown/Dropdown1'
import {DateTimeFormatter, GetIDFromURL, TimeFormatter, sortData} from '../../../utils/Utils'
import {useLocation} from 'react-router-dom'

type Props = {
  isDrawer?: boolean
}

const ChatInner = (props: any) => {
  const {isDrawer = false, receiverUserDetails} = props

  let location = useLocation()
  const currentUserId = parseInt(localStorage.getItem('userId') || '1') //GetIDFromURL(location)

  const [message, setMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(100)
  const dates = new Set()

  const renderDate = (chat: any, dateNum: any) => {
    const timestampDate = DateTimeFormatter(chat.updatedAt)

    // Add to Set so it does not render again
    dates.add(dateNum)

    return (
      <div className='text-center'>
        <p className='badge badge-light'>{timestampDate}</p>
      </div>
    )
  }

  useEffect(() => {
    getchatList()
    socket.emit('join_room', receiverUserDetails?.chatRoomId, receiverUserDetails?.chatId)
  }, [])

  useEffect(() => {
    //console.log('new message REceived inside useEffect', socket)
    socket.on('chat_message', (newMessage) => {
      //console.log('new message Received', newMessage)
      // const new_message = {
      //   chatId: receiverUserDetails.chatId,
      //   chatRoomId: receiverUserDetails.chatRoomId,
      //   senderId: currentUserId,
      //   receiverId: receiverUserDetails.userId,
      //   giftId: null,
      //   videoCallId: null,
      //   message: newMessage,
      //   type: 'text',
      //   isRead: false,
      //   deletedBySender: false,
      //   deletedByReceiver: false,
      //   status: true,
      //   createdBy: currentUserId,
      //   updatedBy: currentUserId,
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      //   videoCallDetail: null,
      // }
      let messages = JSON.parse(sessionStorage.getItem('messageList') || '')
      const oldMessage = [...messages]
      oldMessage.push(newMessage)
      sessionStorage.setItem('messageList', JSON.stringify(oldMessage))
      setMessageList(oldMessage)
    })

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close()
    }
  }, [socket])

  const sendMessage = () => {
    socket.emit('chat_message', {
      message: message,
      senderId: currentUserId,
      receiverId: receiverUserDetails.userId,
      type: 'text',
      chatRoomId: receiverUserDetails.chatRoomId,
      chatId: receiverUserDetails.chatId,
    })

    setMessage('')

    // const newMessage = {
    //   chatId: receiverUserDetails.chatId,
    //   chatRoomId: receiverUserDetails.chatRoomId,
    //   senderId: currentUserId,
    //   receiverId: receiverUserDetails.userId,
    //   giftId: null,
    //   videoCallId: null,
    //   message: message,
    //   type: 'text',
    //   isRead: false,
    //   deletedBySender: false,
    //   deletedByReceiver: false,
    //   status: true,
    //   createdBy: currentUserId,
    //   updatedBy: currentUserId,
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   videoCallDetail: null,
    // }
    // let messages = JSON.parse(sessionStorage.getItem('messageList') || '')
    // const oldMessage = [...messages]
    // oldMessage.push(newMessage)
    // sessionStorage.setItem('messageList', JSON.stringify(oldMessage))
    // setMessageList(oldMessage)
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      //sendMessage()
    }
  }

  const getchatList = async () => {
    let result = await getMessagesByUserID(receiverUserDetails.userId, page, pageSize)
    sessionStorage.setItem('messageList', JSON.stringify(result.data))
    setMessageList(result.data)
  }

  return messageList === undefined ? (
    <div>Loading</div>
  ) : (
    <>
      {' '}
      <div className='card-header' id='kt_chat_messenger_header'>
        <div className='card-title'>
          <div className='symbol-group symbol-hover'></div>
          <div className='symbol  symbol-36px symbol-circle me-3'>
            <img
              alt='Pic'
              src={
                toAbsoluteUrl(`/media/avatars/300-5.jpg`) ||
                `${process.env.REACT_APP_SERVER_URL}/${receiverUserDetails?.usersDetail?.profileImage}`
              }
            />
          </div>
          <div className='d-flex justify-content-center flex-column me-1'>
            <a href='#' className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-1 lh-1'>
              {receiverUserDetails?.usersDetail?.fullName}
            </a>
            {receiverUserDetails?.usersDetail?.isOnline && (
              <div className='mb-0 lh-1'>
                <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                <span className='fs-7 fw-bold text-gray-400'>Active</span>
              </div>
            )}
          </div>
        </div>

        <div className='card-toolbar'>
          <div className='me-n3'>
            <button
              className='btn btn-sm btn-icon btn-active-light-primary'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <i className='bi bi-three-dots fs-2'></i>
            </button>
            <Dropdown1 />
          </div>
        </div>
      </div>
      <div
        className='card-body'
        id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
      >
        <div
          className='scroll-y me-n5 pe-5 h-400px' //{clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
          data-kt-element='messages'
          data-kt-scroll='true'
          data-kt-scroll-activate='{default: false, lg: true}'
          data-kt-scroll-max-height='auto'
          data-kt-scroll-dependencies={
            isDrawer
              ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
              : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
          }
          data-kt-scroll-wrappers={
            isDrawer
              ? '#kt_drawer_chat_messenger_body'
              : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
          }
          data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
        >
          {messageList
            .sort((a: any, b: any) => {
              return sortData(a.updatedAt, b.updatedAt)
            })
            .map((message: any, index: any) => {
              //const userInfo = userInfos[message.user]
              const userType = currentUserId === message.senderId
              const dateNum = DateTimeFormatter(message.updatedAt)
              const state = userType ? 'info' : 'primary'
              const templateAttr = {}
              if (message.template) {
                Object.defineProperty(templateAttr, 'data-kt-element', {
                  value: `template-${message.type}`,
                })
              }
              const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
                userType ? 'start' : 'end'
              } mb-10`

              return (
                <>
                  {dates.has(dateNum) ? null : renderDate(message, dateNum)}
                  <div
                    key={`message${index}`}
                    className={clsx('d-flex', contentClass, 'mb-10', {'d-none': message.template})}
                    {...templateAttr}
                  >
                    <div
                      className={clsx(
                        'd-flex flex-column align-items',
                        `align-items-${userType ? 'start' : 'end'}`
                      )}
                    >
                      {message.type === 'text' ? (
                        <>
                          <div
                            className={clsx(
                              'rounded',
                              `bg-light-${state}`,
                              'text-dark fw-bold mw-lg-400px',
                              `text-${userType ? 'start' : 'end'}`
                            )}
                            data-kt-element='message-text'
                            //dangerouslySetInnerHTML={{__html: message.message}}
                          >
                            {' '}
                            <div className='d-flex align-items-center ms-1 mt-1 me-1'>
                              {userType ? (
                                <>
                                  <div className='ms-3'>
                                    <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start mb-3'>
                                      {message.message}
                                    </span>

                                    <span className='text-muted fs-9 me-2'>
                                      {TimeFormatter(message.updatedAt)}
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className='ms-3 me-3'>
                                    <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start '>
                                      {message.message}
                                    </span>
                                    <span className='text-muted fs-9'>
                                      {TimeFormatter(message.updatedAt)}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </>
              )
            })}
        </div>

        <div
          className='card-footer pt-4'
          id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
        >
          <div className='d-flex flex-stack mt-2'>
            <div className='d-flex align-items-center '>
              <button
                className='btn btn-sm btn-icon btn-active-light-primary me-1'
                type='button'
                data-bs-toggle='tooltip'
                title='Coming soon'
              >
                <i className='bi bi-paperclip fs-3'></i>
              </button>
              <button
                className='btn btn-sm btn-icon btn-active-light-primary me-1'
                type='button'
                data-bs-toggle='tooltip'
                title='Coming soon'
              >
                <i className='bi bi-upload fs-3'></i>
              </button>
            </div>
            &nbsp;
            <textarea
              className='form-control form-control-flush mb-3' // border-1 border
              rows={1}
              data-kt-element='input'
              placeholder='Type a message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              //onKeyDown={onEnterPress}
            ></textarea>
            <button
              className='btn btn-primary ms-7'
              //type='button'
              //data-kt-element='send'
              onClick={() => sendMessage()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export {ChatInner}
