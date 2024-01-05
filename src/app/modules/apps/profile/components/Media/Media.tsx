import React, {useRef, useState} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import MediaTable from './table/MediaTable'
import {
  createMediaActionForUserMedia,
  createMediaActionForUserMediaForAnonymousUser,
  getUserMediaImages,
  removeMediaActionForUserMedia,
  setMediaAsAStoryForUserMedia,
  updateMediaActionForUserMedia,
} from '../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../utils/ToastUtils'
import clsx from 'clsx'
import LightBoxComponent from '../../../../../../_metronic/partials/componants/LightBoxComponent'
import {DateWithTimeFormatter} from '../../../../../../utils/DateUtils'
import {Dropdown} from 'react-bootstrap'
import {CustomToggle} from '../../../../../../_metronic/partials/componants/CustomToggle'
import {ImageCompressor} from '../../../../../../utils/ImageCompresser'
import {useLocation} from 'react-router-dom'

const Media = (props: any) => {
  const {user} = props

  const location = useLocation()
  let currentUserType = location.pathname.substring(6, 15) === 'anonymous' ? 'Anonymous' : 'Normal'

  const hiddenMediaInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [userProfileMedia, setUserProfileMedia] = useState(user.userProfileImages)
  const [selectedImage, setSelectedImage] = useState({id: 0})
  const [getUpdatedStory, setGetUpdatedStory] = useState(1)
  const [isMediaUploaded, setisMediaUploaded] = useState<any>(false)
  const [openLightBox, setOpenLightBox] = React.useState(false)
  const lightBoxArray: any = []

  const userId = localStorage.getItem('userId')

  const ActionsOnMedia = async (type: any, mediaId: any) => {
    let actionType,
      typeValue = true
    if (type === 'private') {
      actionType = 'isPrivate'
    } else {
      actionType = 'isProfileImage'
    }

    let result = await updateMediaActionForUserMedia(userId, mediaId, actionType, typeValue)
    if (result.status === 200) {
      ToastUtils({
        type: 'success',
        message: `Your Media has Set as ${
          actionType === 'isPrivate' ? 'Private' : 'Profile Image'
        }`,
      })
    }
  }

  const removeMedia = async (mediaId: any) => {
    console.log(mediaId)
    let result = await removeMediaActionForUserMedia(userId, mediaId)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'media has been removed'})
      setUserProfileMedia(result.data)
    } else {
      ErrorToastUtils()
    }
  }

  const uploadMediaAsAStory = async (mediaId: any) => {
    let result = await setMediaAsAStoryForUserMedia(userId, mediaId)
    if (result.status === 200) {
      setGetUpdatedStory(getUpdatedStory + 1)
      ToastUtils({type: 'success', message: 'Your Media has Updated as a Story'})
    } else {
      ToastUtils({type: 'error', message: 'Error in Media Updating'})
    }
  }

  const handleMediaChange = async (event: any) => {
    setisMediaUploaded(true)
    // if (event.target.files[0]) {
    //   let response = await ImageCompressor(event.target.files[0])
    //   let result: any
    //   if (currentUserType !== 'Normal') {
    //     result = await createMediaActionForUserMediaForAnonymousUser(response, userId)
    //   } else {
    //     result = await createMediaActionForUserMedia(response, userId)
    //   }
    //   // result = await createMediaActionForUserMedia(event.target.files[0], userId)
    //   if (result.status === 200) {
    //     let oldmedia = [...userProfileMedia]
    //     oldmedia.push(result.data[0])
    //     setUserProfileMedia(oldmedia)
    //     ToastUtils({type: 'success', message: 'Your Media has Uploaded'})
    //     setisMediaUploaded(false)
    //   } else {
    //     ToastUtils({type: 'error', message: 'Error in Media Upload'})
    //     setisMediaUploaded(false)
    //   }
    // }

    let filesArray = Object.values(event.target.files)

    let compressedfiles: any = []

    await filesArray.map(async (file: any) => {
      let compressedImg = await ImageCompressor(file)
      compressedfiles.push(compressedImg)
      if (filesArray.length === compressedfiles.length) {
        let result
        if (currentUserType !== 'Normal') {
          result = await createMediaActionForUserMediaForAnonymousUser(compressedfiles, userId)
        } else {
          result = await createMediaActionForUserMedia(compressedfiles, userId)
        }

        if (result.status === 200) {
          getMediaImageList()
          setisMediaUploaded(false)
          ToastUtils({type: 'success', message: 'Profile Media Upload SuccessFully'})
        } else {
          ToastUtils({type: 'error', message: 'Error in Media Upload'})
          setisMediaUploaded(false)
        }
      }
    })
  }

  const handleClick = () => {
    const fileInput = document.getElementById(`mediaInput`)
    fileInput?.click()
  }

  const handleaddMediaforLightbox = (url: string) => {
    let PhotoObject = {
      src: url,
    }
    //let oldLightBoxArray = [...lightBoxArray]
    lightBoxArray.push(PhotoObject)
  }

  const getMediaImageList = async () => {
    let result = await getUserMediaImages(userId)

    if (result.status === 200) {
      setUserProfileMedia(result.data)
    }
  }

  return (
    <div className='card '>
      <div className='card-title pt-8 px-9 d-flex justify-content-between'>
        <div>
          <h4>Media</h4>
        </div>
        <div>
          <button
            className='btn btn-primary'
            type='button'
            onClick={() => handleClick()}
            disabled={isMediaUploaded}
          >
            {!isMediaUploaded ? 'Upload Media' : 'Uploading...'}
          </button>
          <input
            type='file'
            name='icon'
            id={`mediaInput`}
            onChange={(e) => handleMediaChange(e)}
            ref={hiddenMediaInput}
            style={{display: 'none'}} // Make the file input element invisible
            accept='image/*'
            multiple
          />
        </div>
      </div>

      <div>
        <div className='p-5'>
          <div className='card-header border-0 row'>
            {userProfileMedia
              .sort((a: any, b: any) =>
                a.isProfileImage === b.isProfileImage ? 0 : a.isProfileImage ? -1 : 1
              ) // sorting for get profile images first
              .filter((media: any) => media.status === true)
              .map((userMedia: any, index: any) => {
                handleaddMediaforLightbox(`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`)

                return (
                  <div className={userProfileMedia.length >= 6 ? 'col-1' : 'col-2'} key={index}>
                    <div
                      className='position-relative'

                      // data-bs-toggle='modal'
                      // data-bs-target='#full_width_image_modal'
                    >
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        width={userProfileMedia.length >= 6 ? '100' : '192'}
                        height={userProfileMedia.length >= 6 ? '99' : '189'}
                        // width='192'
                        // height='189'
                        className='rounded'
                        onClick={() => {
                          setOpenLightBox(true)
                          setSelectedImage(userMedia.media)
                        }}
                      />
                      <span className='position-absolute top-0 start-100'>
                        {' '}
                        {/* start-100 */}
                        <div>
                          <button
                            className='btn btn-sm'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            data-kt-menu-flip='top-end'
                          >
                            <i className='fa-solid fa-ellipsis-vertical text-black fa-xl' />
                          </button>
                          <div
                            className='menu menu-sub menu-sub-dropdown w-150px py-4 menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold'
                            data-kt-menu='true'
                          >
                            {!userMedia.isProfileImage && (
                              <div
                                className='px-3'
                                onClick={() => ActionsOnMedia('profile', userMedia.id)}
                              >
                                <p className='px-3'>Set profile</p>
                              </div>
                            )}
                            <div
                              className=' px-3'
                              onClick={() => ActionsOnMedia('private', userMedia.id)}
                            >
                              <p className=' px-3'>Set private</p>
                            </div>
                            <div className=' px-3'>
                              <p className='px-3' onClick={() => uploadMediaAsAStory(userMedia.id)}>
                                Upload to story
                              </p>
                            </div>
                            <div className=' px-3' onClick={() => removeMedia(userMedia.id)}>
                              <p className=' px-3' data-kt-users-table-filter='delete_row'>
                                Delete Media
                              </p>
                            </div>
                          </div>
                        </div>
                      </span>
                    </div>

                    {/* <div className='text-muted mt-4 text-center'>
                      {DateWithTimeFormatter(userMedia?.updatedAt)}
                    </div> */}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <div className='p-6'>
        <MediaTable setGetUpdatedStory={setGetUpdatedStory} getUpdatedStory={getUpdatedStory} />
      </div>

      <LightBoxComponent
        openLightBox={openLightBox}
        setOpenLightBox={setOpenLightBox}
        lightBoxArray={lightBoxArray}
      />

      <div className='modal fade' tabIndex={-1} id='full_width_image_modal'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <div
                className='btn btn-icon btn-sm btn-active-light-primary ms-2'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <i className='fa-solid fa-xmark'></i>
              </div>
            </div>
            <div className='modal-body'>
              <div id='carouselExample' className='carousel slide'>
                <div className='carousel-inner'>
                  {userProfileMedia.length !== 0 &&
                    userProfileMedia
                      .filter((media: any) => media.status === true)
                      .map((userMedia: any, index: any) => {
                        return (
                          <div
                            className={clsx(
                              'carousel-item',
                              userMedia.id === selectedImage?.id && 'active'
                            )}
                            //className='carousel-item'
                            key={index}
                          >
                            <img
                              src={
                                userMedia.mediaType === 'photo'
                                  ? `${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`
                                  : `${process.env.REACT_APP_SERVER_URL}/${userMedia.thumb}`
                              }
                              className=' w-100 '
                              alt='...'
                            />
                          </div>
                        )
                      })}
                </div>
                <button
                  className='carousel-control-prev'
                  type='button'
                  data-bs-target='#carouselExample'
                  data-bs-slide='prev'
                >
                  <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button
                  className='carousel-control-next'
                  type='button'
                  data-bs-target='#carouselExample'
                  data-bs-slide='next'
                >
                  <span className='carousel-control-next-icon' aria-hidden='true'></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Media
