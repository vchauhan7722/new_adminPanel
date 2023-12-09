/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect, useState, useRef} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl, defaultMessages, defaultUserInfos, UserInfoModel} from '../../helpers'
import socket from '../../../socketconfig'
import {getMessagesByUserID, pinOrLikeChatMember, sendCreditInChat} from '../../../API/api-endpoint'
import {Dropdown1} from '../content/dropdown/Dropdown1'
import {DateTimeFormatter, GetIDFromURL, TimeFormatter, sortData} from '../../../utils/Utils'
import {Link, useLocation} from 'react-router-dom'

type Props = {
  isDrawer?: boolean
}

const ChatInner = (props: any) => {
  const {isDrawer = false, receiverUserDetails, giftCategoriesList, giftList} = props

  const messagesEndRef = useRef<any>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  const currentUserId = parseInt(localStorage.getItem('userId') || '1')

  const [message, setMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<any>([])
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(100)
  const [selectedGiftCategory, setSelectedGiftCategory] = useState<any>('all')
  const [selectedGift, setSelectedGift] = useState<any>(undefined)
  const [creditToSend, setCreditToSend] = useState<any>(1)

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
    //console.log(receiverUserDetails)
    getchatList()
    //console.log(receiverUserDetails?.chatRoomId, receiverUserDetails?.chatId)
    socket.emit('join_room', receiverUserDetails?.chatRoomId, receiverUserDetails?.chatId)
  }, [])

  useEffect(() => {
    socket.on('chat_message', (newMessage) => {
      console.log('new message Received', newMessage)
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
      socket.emit('message_read', {messageId: newMessage.messageId, userId: newMessage.receiverId})
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

  useEffect(() => {
    socket.on('gift_message', (newMessage) => {
      console.log('gift_message inside ', newMessage.data)
      //newMessage.type = 'gift'
      console.log('gift_message', newMessage.data)
      let messages = JSON.parse(sessionStorage.getItem('messageList') || '')
      const oldMessage = [...messages]
      oldMessage.push(newMessage.data)
      sessionStorage.setItem('messageList', JSON.stringify(oldMessage))
      setMessageList(oldMessage)
    })

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close()
    }
  }, [socket])

  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const sendMessage = () => {
    if (message.length !== 0) {
      console.log('receiverUserDetails.userId', receiverUserDetails.userId)
      socket.emit('chat_message', {
        message: message,
        senderId: receiverUserDetails.userId,
        receiverId: currentUserId,
        type: 'text',
        chatRoomId: receiverUserDetails.chatRoomId,
        chatId: receiverUserDetails.chatId,
      })

      setMessage('')
      const element = window.document.getElementById('chatInput')
      if (element !== null) {
        element.autofocus = true
      }
    }

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

  const sendGift = () => {
    socket.emit('send_gift', {
      senderId: receiverUserDetails.userId,
      receiverId: currentUserId,
      type: 'gift',
      giftId: selectedGift.giftId,
      chatRoomId: receiverUserDetails.chatRoomId,
      chatId: receiverUserDetails.chatId,
    })
    const element = window.document.getElementById('chatInput')
    if (element !== null) {
      element.autofocus = true
    }
  }

  const sendCredit = async () => {
    //let result = await sendCreditInChat(receiverUserDetails.userId, currentUserId, creditToSend)
    socket.emit('send_credit', {
      senderId: receiverUserDetails.userId,
      receiverId: currentUserId,
      type: 'credit',
      message: creditToSend,
      chatRoomId: receiverUserDetails.chatRoomId,
      chatId: receiverUserDetails.chatId,
    })
  }

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getchatList = async () => {
    let result = await getMessagesByUserID(
      receiverUserDetails.userId,
      receiverUserDetails.chatRoomId,
      page,
      pageSize
    )
    sessionStorage.setItem('messageList', JSON.stringify(result.data))
    setMessageList(result.data)
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  const handleMediaChange = (event: any) => {
    const fileUploaded = event.target.files[0]
    //console.log('fileUploaded', fileUploaded)
    socket.emit('media_message', {
      senderId: receiverUserDetails.userId,
      receiverId: currentUserId,
      type: 'media',
      fileData: fileUploaded,
      fileName: fileUploaded.name,
      chatRoomId: receiverUserDetails.chatRoomId,
      chatId: receiverUserDetails.chatId,
    })
    const element = window.document.getElementById('chatInput')
    if (element !== null) {
      element.autofocus = true
    }

    //setFile(fileUploaded)
  }

  const updateChatmember = async (action) => {
    // currentUserId , roomID ,chatmemberID , action
    let result = await pinOrLikeChatMember(
      currentUserId,
      receiverUserDetails?.userId,
      receiverUserDetails?.chatRoomId,
      action
    )
    if (result.status === 200) {
    }
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
                `${process.env.REACT_APP_SERVER_URL}/${receiverUserDetails?.profileImage}`
              }
            />
          </div>
          <div className='d-flex justify-content-center flex-column me-1'>
            <a href='#' className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-1 lh-1'>
              {receiverUserDetails?.fullName}
            </a>
            {receiverUserDetails?.isOnline == '1' && (
              <div className='mb-0 lh-1'>
                <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                <span className='fs-7 fw-bold text-gray-400'>Active</span>
              </div>
            )}
          </div>
          {receiverUserDetails?.isPremium == '1' && (
            <div className='ms-3'>
              <img
                alt='Pic'
                src={toAbsoluteUrl(`/media/logos/Premiuim.png`)}
                width='17px'
                height='17px'
              />
            </div>
          )}

          <div className='ms-3'>
            <img
              alt='Pic'
              src={toAbsoluteUrl(`/media/logos/Credits.png`)}
              width='17px'
              height='17px'
            />
            <span className='text-muted fs-7 ms-3'>{receiverUserDetails?.totalCredit}</span>
          </div>
        </div>

        <div className='card-toolbar'>
          <div className='me-3' data-bs-toggle='modal' data-bs-target='#kt_modal_credit'>
            <img
              alt='Pic'
              src={toAbsoluteUrl(`/media/logos/Credits.png`)}
              width='20px'
              height='20px'
            />
          </div>
          <div data-bs-toggle='modal' data-bs-target='#kt_modal_gift' className='me-5'>
            <img
              alt='Pic'
              src={toAbsoluteUrl(`/media/logos/gift.png`)}
              width='20px'
              height='20px'
            />
          </div>
          <div className='d-flex my-4'>
            <div className='me-0'>
              <div className='dropdown'>
                <button className='dropbtn'>
                  <i className='bi bi-three-dots fs-3'></i>
                </button>
                <div className='dropdown-content'>
                  <span onClick={() => updateChatmember('like')}>Like Profile</span>
                  <span onClick={() => updateChatmember('pin')}>Pin Profile</span>
                  {/* <span>Clear All Messages</span> */}
                </div>
              </div>
            </div>
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
              const userType = currentUserId !== message.receiverId
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
                    className={clsx('d-flex', contentClass, 'mb-10', {
                      'd-none': message.template,
                    })}
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
                      ) : message.type === 'gift' ? (
                        <div
                          className={clsx(
                            'rounded',
                            `bg-light-${state}`,
                            'text-dark fw-bold mw-lg-400px',
                            `text-${userType ? 'start' : 'end'}`
                          )}
                          data-kt-element='message-text'
                        >
                          {' '}
                          <div className='d-flex align-items-center ms-1 mt-1 me-1'>
                            {userType ? (
                              <>
                                <div className='ms-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start mb-3'>
                                    <img
                                      alt='Pic'
                                      src={`${process.env.REACT_APP_SERVER_URL}/${message?.giftDetail?.icon}`}
                                      width='50px'
                                      height='50px'
                                    />
                                  </span>

                                  <span className='text-muted fs-9 me-2'>
                                    {TimeFormatter(message?.giftDetail?.updatedAt)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='ms-3 me-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start '>
                                    <img
                                      alt='Pic'
                                      src={`${process.env.REACT_APP_SERVER_URL}/${message?.giftDetail?.icon}`}
                                      width='50px'
                                      height='50px'
                                    />
                                  </span>
                                  <span className='text-muted fs-9'>
                                    {TimeFormatter(message?.giftDetail?.updatedAt)}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : message.type === 'media' ? (
                        <div
                          className={clsx(
                            'rounded',
                            `bg-light-${state}`,
                            'text-dark fw-bold mw-lg-400px',
                            `text-${userType ? 'start' : 'end'}`
                          )}
                          data-kt-element='message-text'
                        >
                          {' '}
                          <div className='d-flex align-items-center ms-1 mt-1 me-1'>
                            {userType ? (
                              <>
                                <div className='ms-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start mb-3'></span>
                                  <img
                                    alt='Pic'
                                    src={`${process.env.REACT_APP_SERVER_URL}/${message.message}`}
                                    width='100px'
                                    height='100px'
                                    className='me-2'
                                  />{' '}
                                  <span className='text-muted fs-9 me-2'>
                                    {TimeFormatter(message.updatedAt)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='ms-3 me-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start '>
                                    <img
                                      alt='Pic'
                                      src={`${process.env.REACT_APP_SERVER_URL}/${message.message}`}
                                      width='100px'
                                      height='100px'
                                      className='me-2'
                                    />
                                  </span>
                                  <span className='text-muted fs-9'>
                                    {TimeFormatter(message.updatedAt)}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div
                          className={clsx(
                            'rounded',
                            `bg-light-${state}`,
                            'text-dark fw-bold mw-lg-400px',
                            `text-${userType ? 'start' : 'end'}`
                          )}
                          data-kt-element='message-text'
                        >
                          {' '}
                          <div className='d-flex align-items-center ms-1 mt-1 me-1'>
                            {userType ? (
                              <>
                                <div className='ms-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start mb-3'></span>
                                  <img
                                    alt='Pic'
                                    src={toAbsoluteUrl(`/media/logos/Credits.png`)}
                                    width='20px'
                                    height='20px'
                                    className='me-2'
                                  />{' '}
                                  {message.message} Credits
                                  <span className='text-muted fs-9 me-2'>
                                    {TimeFormatter(message.updatedAt)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='ms-3 me-3'>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start '>
                                    <img
                                      alt='Pic'
                                      src={toAbsoluteUrl(`/media/logos/Credits.png`)}
                                      width='20px'
                                      height='20px'
                                      className='me-2'
                                    />
                                    {message.message} Credits
                                  </span>
                                  <span className='text-muted fs-9'>
                                    {TimeFormatter(message.updatedAt)}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )
            })}
          <div ref={messagesEndRef} />
        </div>

        <div
          className='card-footer pt-4 p-0'
          id={isDrawer ? 'kt_drawer_chat_messenger_footer' : 'kt_chat_messenger_footer'}
        >
          <div className='d-flex flex-stack mt-2'>
            <div className='d-flex align-items-center mb-14'>
              <button
                className='btn btn-sm btn-icon btn-active-light-primary me-1'
                type='button'
                data-bs-toggle='tooltip'
                title='Coming soon'
                onClick={() => handleClick()}
              >
                <i className='bi bi-paperclip fs-3'></i>
              </button>
              <input
                type='file'
                name='icon'
                id='fileInput'
                onChange={(e) => handleMediaChange(e)}
                ref={hiddenFileInput}
                style={{display: 'none'}} // Make the file input element invisible
                accept='image/*,video/*'
              />
            </div>
            &nbsp;
            <textarea
              className='form-control form-control-flush mb-3' // border-1 border
              rows={3}
              data-kt-element='input'
              placeholder='Type a message'
              value={message}
              id='chatInput'
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onEnterPress}
            ></textarea>
            <button
              className='btn btn-primary ms-7 mb-14'
              //type='button'
              //data-kt-element='send'
              onClick={() => sendMessage()}
            >
              <i className='fa-solid fa-paper-plane fa-2xl'></i>
            </button>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='kt_modal_gift'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Send Gift</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='d-flex overflow-auto '>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap ms-5'>
                <li className='nav-item'>
                  <div
                    className={`nav-link text-active-primary ${
                      selectedGiftCategory === 'all' && 'active'
                    }`}
                    onClick={() => setSelectedGiftCategory('all')}
                  >
                    All
                  </div>
                </li>
                {giftCategoriesList.map((category: any) => {
                  return (
                    <li className='nav-item'>
                      <div
                        className={`nav-link text-active-primary ${
                          selectedGiftCategory?.giftCategoryId === category.giftCategoryId &&
                          'active'
                        }`}
                        onClick={() => setSelectedGiftCategory(category)}
                      >
                        {category.name}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='modal-body'>
              <div className='row'>
                {giftList
                  .filter((category: any) =>
                    selectedGiftCategory !== 'all'
                      ? category.giftCategoryId === selectedGiftCategory?.giftCategoryId
                      : category.giftCategoryId
                  )
                  .map((gift: any, index: any) => {
                    return (
                      <div
                        className={`col-2 d-flex flex-column ${
                          gift.giftId === selectedGift?.giftId && 'bg-info'
                        }`}
                        key={index}
                        onClick={() => setSelectedGift(gift)}
                      >
                        <img
                          alt='Pic'
                          src={`${process.env.REACT_APP_SERVER_URL}/${gift.icon}`}
                          width='50px'
                          height='50px'
                        />
                        <span className='text-muted fs-6'>{gift.credit} coins</span>
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => {
                  setSelectedGift(undefined)
                  setSelectedGiftCategory('all')
                }}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={sendGift}
              >
                Send Gift
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' tabIndex={-1} id='kt_modal_credit'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Send Credit</h5>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='modal-body'>
              <div>
                <input
                  placeholder='Enter Credits'
                  type='text'
                  name='interest'
                  className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                  autoComplete='off'
                  value={creditToSend}
                  onChange={(e) => setCreditToSend(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                onClick={() => {
                  setSelectedGift(undefined)
                  setSelectedGiftCategory('all')
                }}
              >
                Cancel
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                onClick={sendCredit}
              >
                Send Credit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export {ChatInner}
