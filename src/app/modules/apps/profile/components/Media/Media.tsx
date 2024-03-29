import React, {useRef, useState} from 'react'
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
import {ImageCompressor} from '../../../../../../utils/ImageCompresser'
import {useLocation} from 'react-router-dom'
import Swal from 'sweetalert2'
import {GetIDFromURL} from '../../../../../../utils/Utils'

const Media = (props: any) => {
  const {user, setUserUpdateFlag, userUpdateFlag} = props

  const location = useLocation()
  let currentUserType = location.pathname.substring(12, 21) === 'anonymous' ? 'a' : 'n'

  const hiddenMediaInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [userProfileMedia, setUserProfileMedia] = useState(user.userProfileImages)
  const [selectedImage, setSelectedImage] = useState({id: 0})
  const [getUpdatedStory, setGetUpdatedStory] = useState(1)
  const [isMediaUploaded, setisMediaUploaded] = useState<any>(false)
  const [openLightBox, setOpenLightBox] = useState(false)
  const lightBoxArray: any = []
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  //const [lightBoxArray, setLightBoxArray] = useState<any>([])

  let userId = GetIDFromURL(location)
  // const userId = localStorage.getItem('userId')

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
      setUserUpdateFlag(userUpdateFlag + 1)
      ToastUtils({
        type: 'success',
        message: `Your Media has Set as ${
          actionType === 'isPrivate' ? 'Private' : 'Profile Image'
        }`,
      })
    }
  }

  const removeMedia = async (mediaId: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await removeMediaActionForUserMedia(userId, mediaId)
        if (result.status === 200) {
          ToastUtils({type: 'success', message: 'media has been removed'})
          setUserProfileMedia(result.data)
        } else {
          ErrorToastUtils()
        }
      }
    })
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

  // const handleMediaChange = async (event: any) => {
  //   setisMediaUploaded(true)

  //   let filesArray = Object.values(event.target.files)

  //   let compressedfiles: any = []

  //   await filesArray.map(async (file: any) => {
  //     let compressedImg = await ImageCompressor(file, userId)
  //     compressedfiles.push(compressedImg)
  //     if (filesArray.length === compressedfiles.length) {
  //       let result
  //       if (currentUserType !== 'n') {
  //         result = await createMediaActionForUserMediaForAnonymousUser(
  //           compressedfiles,
  //           userId,
  //           currentUserType
  //         )
  //       } else {
  //         result = await createMediaActionForUserMedia(compressedfiles, userId, currentUserType)
  //       }

  //       if (result.status === 200) {
  //         getMediaImageList()
  //         setisMediaUploaded(false)
  //         ToastUtils({type: 'success', message: 'Profile Media Upload SuccessFully'})
  //       } else {
  //         ToastUtils({type: 'error', message: 'Error in Media Upload'})
  //         setisMediaUploaded(false)
  //       }
  //     }
  //   })
  // }

  const handleMediaChange = async (event: any) => {
    console.log('images', Object.values(event.target.files))
    setisMediaUploaded(true)

    try {
      const filesArray = Object.values(event.target.files)
      const compressedfiles = await Promise.all(
        filesArray.map((file) => ImageCompressor(file, userId))
      )

      console.log('compressedfiles', compressedfiles)

      let result: any

      if (currentUserType !== 'n') {
        result = await createMediaActionForUserMediaForAnonymousUser(
          compressedfiles,
          userId,
          currentUserType
        )
      } else {
        result = await createMediaActionForUserMedia(compressedfiles, userId, currentUserType)
      }

      if (result.status === 200) {
        getMediaImageList()
        setisMediaUploaded(false)
        ToastUtils({type: 'success', message: 'Profile Media Upload SuccessFully'})
      } else {
        ToastUtils({type: 'error', message: 'Error in Media Upload'})
        setisMediaUploaded(false)
      }
    } catch (error) {
      console.error('Error in handleMediaChange:', error)
      ToastUtils({type: 'error', message: 'Error in Media Upload'})
      setisMediaUploaded(false)
    }
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
    //setLightBoxArray([PhotoObject])
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
            accept='image/* , image/heic, image/heif'
            multiple
          />
        </div>
      </div>

      <div>
        <div className='p-5'>
          <div className='border-0 row d-flex g-3'>
            {userProfileMedia
              .sort((a: any, b: any) =>
                a.isProfileImage === b.isProfileImage ? 0 : a.isProfileImage ? -1 : 1
              ) // sorting for get profile images first
              .filter((media: any) => media.status === true)
              .map((userMedia: any, index: any) => {
                handleaddMediaforLightbox(`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`)

                return (
                  <div className='col-md-auto' key={index}>
                    <div className='position-relative'>
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        width='150'
                        height='149'
                        className='rounded'
                        onClick={() => {
                          setOpenLightBox(true)
                          setSelectedImage(userMedia.media)
                          setSelectedImageIndex(index)
                        }}
                        //loading='lazy'
                      />
                      <span className='position-absolute top-0 start-0'>
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
                                className='px-3 pointer'
                                onClick={() => ActionsOnMedia('profile', userMedia.id)}
                              >
                                <p className='px-3'>Set profile</p>
                              </div>
                            )}
                            {!userMedia.isProfileImage && (
                              <div
                                className=' px-3 pointer'
                                onClick={() => ActionsOnMedia('private', userMedia.id)}
                              >
                                <p className=' px-3'>Set private</p>
                              </div>
                            )}

                            <div className=' px-3 pointer'>
                              <p className='px-3' onClick={() => uploadMediaAsAStory(userMedia.id)}>
                                Upload to story
                              </p>
                            </div>
                            {!userMedia.isProfileImage && (
                              <div
                                className=' px-3 pointer'
                                onClick={() => removeMedia(userMedia.id)}
                              >
                                <p className=' px-3' data-kt-users-table-filter='delete_row'>
                                  Delete Media
                                </p>
                              </div>
                            )}
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
        imageIndex={selectedImageIndex}
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
                              loading='lazy'
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
