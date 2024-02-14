/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState, useRef, useCallback} from 'react'
import clsx from 'clsx'
// import socket, {ws} from '../../../socketconfig'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {
  getChatMemberByUserID,
  getMessagesByUserID,
  pinOrLikeChatMember,
} from '../../../../API/api-endpoint'
import {sortData} from '../../../../utils/Utils'
import ToastUtils from '../../../../utils/ToastUtils'
import {fileToBase64} from '../../../../utils/FileUtils'
import {DateTimeFormatter, TimeFormatter} from '../../../../utils/DateUtils'
import LightBoxComponent from '../../../../_metronic/partials/componants/LightBoxComponent'
import {LinkItUrl, LinkItJira, LinkItEmail, LinkItTwitter, LinkIt, urlRegex} from 'react-linkify-it'
import {Dropdown} from 'react-bootstrap'
import {CustomToggle} from '../../../../_metronic/partials/componants/CustomToggle'

const AnonymousChatInner = (props: any) => {
  const {
    isDrawer = false,
    selectedNormalUser,
    selectedAnonymousUser,
    giftCategoriesList,
    giftList,
    setActionFlag,
    actionFlag,
    CurrentUser,
    updateAnonymousUserFlag,
    setUpdateAnonymousUserFlag,
  } = props

  const messagesEndRef = useRef<any>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))

  // currentUserId => selectedAnonymousUser
  const currentUserId = selectedAnonymousUser // = parseInt(localStorage.getItem('userId') || '1')
  const receiverId = selectedNormalUser

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
  const [openLightBox, setOpenLightBox] = useState(false)
  const [lightBoxArrayList, setLightBoxArrayList] = useState<any>([])

  //anonymous user list

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
          chatRoomId: currentUserId?.chatRoomId,
          senderId: currentUserId.userId,
          type: 'join',
        })
      )
    })

    ws1.addEventListener('message', (event) => {
      const receivedMessage = event.data
      const JsonMessageData = JSON.parse(receivedMessage)
      if (JsonMessageData?.status === 500) {
        ToastUtils({type: 'error', message: JsonMessageData.message})
      } else if (JsonMessageData?.status === 501) {
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
        }, 200)
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
            senderId: currentUserId.userId, //selectedNormalUser.userId,
            receiverId: receiverId.userId, //currentUserId,
            type: 'text',
            chatRoomId: currentUserId.chatRoomId,
            chatId: currentUserId.chatId,
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
        senderId: currentUserId.userId,
        receiverId: receiverId.userId,
        type: 'gift',
        giftId: selectedGift.giftId,
        chatRoomId: currentUserId.chatRoomId,
        chatId: currentUserId.chatId,
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
        senderId: currentUserId.userId,
        receiverId: receiverId.userId,
        type: 'credit',
        message: creditToSend,
        chatRoomId: currentUserId.chatRoomId,
        chatId: currentUserId.chatId,
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
      selectedAnonymousUser.userId,
      selectedAnonymousUser.chatRoomId,
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
        senderId: currentUserId.userId,
        receiverId: receiverId.userId,
        type: 'media',
        fileData: base64Media.split('base64,')[1],
        fileName: fileUploaded.name,
        chatRoomId: currentUserId.chatRoomId,
        chatId: currentUserId.chatId,
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
    let currentActionValue =
      action === 'pin' ? !selectedAnonymousUser.pin : !selectedAnonymousUser.like
    let result = await pinOrLikeChatMember(
      currentUserId.userId,
      currentUserId?.chatRoomId,
      currentUserId?.chatId,
      action,
      currentActionValue
    )

    if (result.status === 200) {
      // let notificationMessage =
      //   action === 'pin' ? 'User Pinned SuccessFully' : 'User Liked SuccessFully'
      // ToastUtils({type: 'success', message: notificationMessage})
      //setisMediaUploaded(false)
      setUpdateAnonymousUserFlag(updateAnonymousUserFlag + 1)
      //setActionFlag(actionFlag + 1)
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

  const handleaddMediaforLightbox = (url: string) => {
    let PhotoObject = {
      src: url,
    }
    setLightBoxArrayList([PhotoObject])
  }

  return messageList === undefined ? (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  ) : (
    <>
      <div className='card-header' id='kt_chat_messenger_header'>
        <div className='card-title'>
          <div className='d-flex '>
            <div className='symbol  symbol-33px symbol-circle me-3'>
              <img
                alt='Pic'
                src={
                  `${process.env.REACT_APP_SERVER_URL}/${selectedNormalUser?.profileImage}` ||
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
                  {selectedNormalUser?.fullName}
                </a>
                <p className='fs-8'>
                  {selectedAnonymousUser?.fullName} Message to {selectedNormalUser?.fullName}
                </p>
              </div>
              {selectedNormalUser?.isOnline == '1' && (
                <div className='mb-0 lh-1'>
                  <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
                  <span className='fs-7 fw-bold text-gray-400'>Active</span>
                </div>
              )}
            </div>
          </div>

          <div className='ms-2'>
            {selectedNormalUser?.isPremium == '1' && (
              <img
                alt='Pic'
                src={toAbsoluteUrl(`/media/logos/Premiuim.png`)}
                width='17px'
                height='17px'
                className='me-2'
                loading='lazy'
              />
            )}
            <img
              alt='Pic'
              src={toAbsoluteUrl(`/media/logos/Credits.png`)}
              width='17px'
              height='17px'
              loading='lazy'
            />
            <span className='text-muted fs-7 ms-3'>{selectedNormalUser?.totalCredit}</span>
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
        </div>

        <div className='card-toolbar'>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'></Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => updateChatmember('like')}>
                {selectedAnonymousUser.like === 1 ? 'Unlike Profile' : 'Like Profile'}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => updateChatmember('pin')}>
                {selectedAnonymousUser.pin === 1 ? 'UnPin Profile' : 'Pin Profile'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <div className='d-flex '>
            <div className='me-0'>
              <div className='dropdown'>
                <button className='dropbtn'>
                  <i className='bi bi-three-dots fs-3'></i>
                </button>
                <div className='dropdown-content w-100'>
                  <span onClick={() => updateChatmember('like')}>
                    {selectedAnonymousUser?.like === 1 ? 'Unlike Profile' : 'Like Profile'}
                  </span>
                  <span onClick={() => updateChatmember('pin')}>
                    {selectedAnonymousUser?.pin === 1 ? 'UnPin Profile' : 'Pin Profile'}
                  </span>
                 <span>Clear All Messages</span> 
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className='card-body' id={'kt_chat_messenger_body'}>
        <div
          className='me-n5 pe-5' // scroll-y  {clsx('scroll-y me-n5 pe-5', {'h-300px h-lg-auto': !isDrawer})}
          data-kt-element='messages'
          id='message_container'
          ref={chatContainerRef}
          style={{height: '400px', overflowY: 'auto'}}
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
              const userType = currentUserId.userId !== message.senderId
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
                                      <LinkItUrl className='purple no-underline'>
                                        {message.message}
                                      </LinkItUrl>
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
                                      <LinkItUrl className='purple no-underline'>
                                        {message.message}
                                      </LinkItUrl>
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
                                    {TimeFormatter(message?.updatedAt)}
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
                                      loading='lazy'
                                    />
                                  </span>
                                  <span className='text-muted fs-9'>
                                    {TimeFormatter(message?.updatedAt)}
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
                                    width='150px'
                                    height='150px'
                                    className='me-2'
                                    onClick={() => {
                                      handleaddMediaforLightbox(
                                        `${process.env.REACT_APP_SERVER_URL}/${message?.message}`
                                      )
                                      setOpenLightBox(true)
                                    }}
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
                                      width='150px'
                                      height='150px'
                                      className='me-2'
                                      onClick={() => {
                                        handleaddMediaforLightbox(
                                          `${process.env.REACT_APP_SERVER_URL}/${message?.message}`
                                        )
                                        setOpenLightBox(true)
                                      }}
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

      <LightBoxComponent
        openLightBox={openLightBox}
        setOpenLightBox={setOpenLightBox}
        lightBoxArray={lightBoxArrayList}
        imageIndex={0}
      />

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

export {AnonymousChatInner}
