/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState, useRef, useCallback} from 'react'
import clsx from 'clsx'
import {toAbsoluteUrl} from '../../helpers'
// import socket, {ws} from '../../../socketconfig'
import {getMessagesByUserID, pinOrLikeChatMember} from '../../../API/api-endpoint'
import {sortData} from '../../../utils/Utils'
import {DateTimeFormatter, TimeFormatter} from '../../../utils/DateUtils'
import ToastUtils from '../../../utils/ToastUtils'
import {fileToBase64} from '../../../utils/FileUtils'

const ChatInner = (props: any) => {
  const {
    isDrawer = false,
    receiverUserDetails,
    giftCategoriesList,
    giftList,
    setActionFlag,
    actionFlag,
    CurrentUser,
  } = props

  const messagesEndRef = useRef<any>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  const currentUserId = parseInt(localStorage.getItem('userId') || '1')

  const [message, setMessage] = useState<string>('')
  const [messageList, setMessageList] = useState<any>(undefined)
  const [page, setPage] = useState<any>(1)
  const [pageSize, setPageSize] = useState<any>(10)
  const [selectedGiftCategory, setSelectedGiftCategory] = useState<any>('all')
  const [selectedGift, setSelectedGift] = useState<any>(undefined)
  const [creditToSend, setCreditToSend] = useState<any>(1)
  const [ws, setWs] = useState<any>(null)
  const [totalPage, setTotalPage] = useState(0)
  const [totalMessageCount, setTotalMessageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
    const ws1 = new WebSocket(
      process.env.REACT_APP_WEBSOCKET_SERVER_URL || 'wss://development.lucky1.in:4123'
    )

    getchatList()

    ws1.addEventListener('open', () => {
      console.log('Connected to WebSocket server')
      ws1.send(
        JSON.stringify({
          chatRoomId: receiverUserDetails?.chatRoomId,
          senderId: receiverUserDetails?.userId,
          type: 'join',
        })
      )
    })

    ws1.addEventListener('message', (event) => {
      const receivedMessage = event.data
      const JsonMessageData = JSON.parse(receivedMessage)
      // if (JsonMessageData.type !== 'join') {
      //   if (JsonMessageData.message !== "User doesn't have credit") {
      //     let messages = JSON.parse(sessionStorage.getItem('messageList') || '')
      //     const oldMessage = [...messages]
      //     oldMessage.push(JsonMessageData)
      //     sessionStorage.setItem('messageList', JSON.stringify(oldMessage))
      //     setMessageList(oldMessage)
      //   } else {
      //     ToastUtils({type: 'error', message: JsonMessageData.message})
      //   }
      // }
      if (JsonMessageData?.status === 500) {
        ToastUtils({type: 'error', message: JsonMessageData.message})
      }

      if (JsonMessageData.type !== 'join') {
        // Use optional chaining (?.) to safely access sessionStorage
        const messages = JSON.parse(sessionStorage.getItem('messageList') || '[]') || []

        // Combine the new message with existing messages in a single array
        const updatedMessages = [...messages, JsonMessageData]

        // Store the updated messages in sessionStorage and update state
        sessionStorage.setItem('messageList', JSON.stringify(updatedMessages))
        setMessageList(updatedMessages)
        setTimeout(() => {
          scrollToBottom()
        }, 500)
      }
    })

    ws1.addEventListener('close', () => {
      console.log('Disconnected from WebSocket server')
    })

    setWs(ws1)

    return () => {
      ws1.close()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'})
  }

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      if (message.trim().length !== 0) {
        ws.send(
          JSON.stringify({
            message: message,
            senderId: receiverUserDetails.userId,
            receiverId: currentUserId,
            type: 'text',
            chatRoomId: receiverUserDetails.chatRoomId,
            chatId: receiverUserDetails.chatId,
          })
        )
      }
      setMessage('')

      const element = window.document.getElementById('chatInput')
      if (element !== null) {
        element.autofocus = true
      }
    }
  }

  const sendGift = () => {
    ws.send(
      JSON.stringify({
        senderId: receiverUserDetails.userId,
        receiverId: currentUserId,
        type: 'gift',
        giftId: selectedGift.giftId,
        chatRoomId: receiverUserDetails.chatRoomId,
        chatId: receiverUserDetails.chatId,
      })
    )

    const element = window.document.getElementById('chatInput')
    if (element !== null) {
      element.autofocus = true
    }
  }

  const sendCredit = async () => {
    ws.send(
      JSON.stringify({
        senderId: receiverUserDetails.userId,
        receiverId: currentUserId,
        type: 'credit',
        message: creditToSend,
        chatRoomId: receiverUserDetails.chatRoomId,
        chatId: receiverUserDetails.chatId,
      })
    )
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

    if (result.status === 200) {
      let oldMessageArray
      if (messageList !== undefined) {
        oldMessageArray = [...messageList, ...result.data]
      } else {
        oldMessageArray = result.data
      }
      //let oldMessageArray = [messageList, ...result.data]
      //console.log('oldMessageArray', messageList, oldMessageArray)
      sessionStorage.setItem('messageList', JSON.stringify(oldMessageArray))
      setTotalPage(result.totalPage)
      setTotalMessageCount(result.count)
      setMessageList(oldMessageArray)
      setIsLoading(false)
      //setMessageList([messageList, ...result.data])
    }
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  const handleMediaChange = async (event: any) => {
    const fileUploaded = event.target.files[0]
    let base64Media: any = await fileToBase64(fileUploaded)

    ws.send(
      JSON.stringify({
        senderId: receiverUserDetails.userId,
        receiverId: currentUserId,
        type: 'media',
        fileData: base64Media.split('base64,')[1],
        fileName: fileUploaded.name,
        chatRoomId: receiverUserDetails.chatRoomId,
        chatId: receiverUserDetails.chatId,
      })
    )
    const element = window.document.getElementById('chatInput')
    if (element !== null) {
      element.autofocus = true
    }

    //setFile(fileUploaded)
  }

  const updateChatmember = async (action: string) => {
    // currentUserId , roomID ,chatmemberID , action
    let currentActionValue = action === 'pin' ? !receiverUserDetails.pin : !receiverUserDetails.like
    let result = await pinOrLikeChatMember(
      currentUserId,
      receiverUserDetails?.chatRoomId,
      receiverUserDetails?.chatId,
      action,
      currentActionValue
    )

    if (result.status === 200) {
      //ToastUtils({type: 'success', message: 'Pin Or Like Success'})
      //setisMediaUploaded(false)
      setActionFlag(actionFlag + 1)
    } else {
      ToastUtils({type: 'error', message: 'Error in User pin or like'})
      //setisMediaUploaded(false)
    }
  }

  const handleChatModuleScroll = useCallback(() => {
    if (page <= totalPage) {
      const chatContainer = chatContainerRef.current
      if (chatContainer) {
        if (chatContainer.scrollTop === 0 && !isLoading) {
          // User has scrolled to the top, fetch more messages
          //console.log('inside scrolling')
          setPage((prev) => prev + 1)
          setIsLoading(true)
          //getchatList()
        }
      }
    }
  }, [getchatList, isLoading])

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleChatModuleScroll)
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleChatModuleScroll)
      }
    }
  }, [handleChatModuleScroll])

  useEffect(() => {
    getchatList()
  }, [page])

  return messageList === undefined ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <>
      {' '}
      <div className='card-header' id='kt_chat_messenger_header'>
        <div className='card-title'>
          <div className='d-flex '>
            <div className='symbol  symbol-36px symbol-circle me-3'>
              <img
                alt='Pic'
                src={
                  `${process.env.REACT_APP_SERVER_URL}/${receiverUserDetails?.profileImage}` ||
                  toAbsoluteUrl(`/media/avatars/300-5.jpg`)
                }
                loading='lazy'
              />
            </div>

            <div className='d-flex justify-content-center flex-column me-1'>
              <div>
                <a
                  href='#'
                  className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-1 lh-1'
                >
                  {receiverUserDetails?.fullName}
                </a>
                <p className='fs-8'>
                  {receiverUserDetails?.fullName} Message to {CurrentUser?.fullName}
                </p>
              </div>
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
                  loading='lazy'
                />
              </div>
            )}
          </div>

          <div className='ms-2'>
            <img
              alt='Pic'
              src={toAbsoluteUrl(`/media/logos/Credits.png`)}
              width='17px'
              height='17px'
              loading='lazy'
            />
            <span className='text-muted fs-7 ms-3'>{receiverUserDetails?.totalCredit}</span>
          </div>

          {/*send gift and credit start */}
          <div className='d-flex ms-11'>
            <div className='' data-bs-toggle='modal' data-bs-target='#kt_modal_credit'>
              <img
                alt='Pic'
                src={toAbsoluteUrl(`/media/logos/Credits.png`)}
                width='20px'
                height='20px'
                loading='lazy'
              />
            </div>
            <div data-bs-toggle='modal' data-bs-target='#kt_modal_gift' className='me-5'>
              <img
                alt='Pic'
                src={toAbsoluteUrl(`/media/logos/gift.png`)}
                width='20px'
                height='20px'
                loading='lazy'
              />
            </div>
          </div>
          {/*send gift and credit end */}

          {/* <div className='d-flex ms-5'>
            <div className='d-flex justify-content-center flex-column me-1'>
              <a
                href='#'
                className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-1 lh-1'
              >
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

            <div className='symbol  symbol-36px symbol-circle me-3'>
              <img
                alt='Pic'
                src={
                  `${process.env.REACT_APP_SERVER_URL}/${receiverUserDetails?.profileImage}` ||
                  toAbsoluteUrl(`/media/avatars/300-5.jpg`)
                }
              />
            </div>
          </div> */}
        </div>

        <div className='card-toolbar'>
          <div className='d-flex my-4'>
            <div className='me-0'>
              <div className='dropdown'>
                <button className='dropbtn'>
                  <i className='bi bi-three-dots fs-3'></i>
                </button>
                <div className='dropdown-content w-100'>
                  <span onClick={() => updateChatmember('like')}>
                    {receiverUserDetails.like === 1 ? 'Unlike Profile' : 'Like Profile'}
                  </span>
                  <span onClick={() => updateChatmember('pin')}>
                    {receiverUserDetails.pin === 1 ? 'UnPin Profile' : 'Pin Profile'}
                  </span>
                  {/* <span>Clear All Messages</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body' id={'kt_chat_messenger_body'}>
        <div
          className='me-n5 pe-5' // scroll-y  {clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
          data-kt-element='messages'
          id='message_container'
          ref={chatContainerRef}
          style={{height: '450px', overflowY: 'auto'}}
          //ref={chatModuleRef}
          //data-kt-scroll='true'
          // data-kt-scroll-activate='{default: false, lg: true}'
          // data-kt-scroll-max-height='auto'
          // data-kt-scroll-dependencies={
          //   isDrawer
          //     ? '#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer'
          //     : '#kt_header, #kt_app_header, #kt_app_toolbar, #kt_toolbar, #kt_footer, #kt_app_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer'
          // }
          // data-kt-scroll-wrappers={
          //   isDrawer
          //     ? '#kt_drawer_chat_messenger_body'
          //     : '#kt_content, #kt_app_content, #kt_chat_messenger_body'
          // }
          // data-kt-scroll-offset={isDrawer ? '0px' : '5px'}
        >
          {isLoading && (
            <div className='d-flex justify-content-center'>
              <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
          {messageList
            .sort((a: any, b: any) => {
              return sortData(a.updatedAt, b.updatedAt)
            })
            //.reverse()
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
                                  <div className='ms-3' style={{width: '95%'}}>
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
                                  <div className='ms-3 me-3' style={{width: '95%'}}>
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
                                      loading='lazy'
                                    />
                                  </span>

                                  <span className='text-muted fs-9 me-2'>
                                    {TimeFormatter(message?.giftDetail?.updatedAt)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className='ms-3 me-3 '>
                                  <span className='text-dark fw-bold fs-6 mw-lg-400px me-4 text-start '>
                                    <img
                                      alt='Pic'
                                      src={`${process.env.REACT_APP_SERVER_URL}/${message?.giftDetail?.icon}`}
                                      width='50px'
                                      height='50px'
                                      loading='lazy'
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
                                    loading='lazy'
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
                                      loading='lazy'
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
                                    loading='lazy'
                                  />{' '}
                                  {message.message} Credits
                                  <span className='text-muted fs-9 ms-1 me-2'>
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
                                      loading='lazy'
                                    />
                                    {message.message} Credits
                                  </span>
                                  <span className='text-muted  fs-9'>
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
                          loading='lazy'
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
