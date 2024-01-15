import React, {FC, useEffect, useRef, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {
  UpdateUserProfilePicture,
  createMediaActionForUserMediaForAnonymousUser,
  createNewAnonymousUser,
  getUserMediaImages,
  removeMediaActionForUserMedia,
  updateMediaActionForUserMedia,
} from '../../../../../../../../../API/api-endpoint'
import ToastUtils, {ErrorToastUtils} from '../../../../../../../../../utils/ToastUtils'
import {useNavigate} from 'react-router-dom'
import {ImageCompressor} from '../../../../../../../../../utils/ImageCompresser'
import {Dropdown} from 'react-bootstrap'
import {CustomToggle} from '../../../../../../../../../_metronic/partials/componants/CustomToggle'

const Step3 = (props: any) => {
  const {submitStep, prevStep} = props

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))
  const hiddenMediaInput = useRef<HTMLInputElement>(document.createElement('input'))
  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [isMediaImageUploaded, setMediaisImageUploaded] = useState<any>(false)
  const [userProfileMedia, setUserProfileMedia] = useState<any>(undefined)
  const [tempProfileMedia, setTempProfileMedia] = useState<any>([])

  const navigate = useNavigate()

  useEffect(() => {
    getMediaImageList()
  }, [])

  useEffect(() => {
    let isUserCreated = localStorage.getItem('isUserCreated')
    if (isUserCreated === 'false') {
      createAnonymousUser()
    }
  }, [])

  const createAnonymousUser = async () => {
    const step1 = JSON.parse(localStorage.getItem('step1Details') || '[]') || []
    const step2 = JSON.parse(localStorage.getItem('step2Details') || '[]') || []

    let anonymousUserObject = {
      ...step1,
      interests: JSON.stringify(step2.selectedInterestListWithId),
      questions: JSON.stringify(step2.selectedQuestionList),
    }

    let response = await createNewAnonymousUser(anonymousUserObject)
    if (response.status === 200) {
      localStorage.setItem('isUserCreated', 'true')
    } else {
      ErrorToastUtils()
    }
  }

  const getMediaImageList = async () => {
    const userID = localStorage.getItem('anonymousUserId')
    let result = await getUserMediaImages(userID)

    if (result.status === 200) {
      setUserProfileMedia(result.data)
    }
  }

  const handleClick = (e: any) => {
    e.preventDefault()
    const fileInput = document.getElementById(`fileInput`)
    fileInput?.click()
  }

  const handleMediaClick = (e: any) => {
    e.preventDefault()
    const fileInput = document.getElementById(`mediaInput`)
    fileInput?.click()
  }

  const handleIconChange = async (mediaId: any) => {
    const userID = localStorage.getItem('anonymousUserId')
    //let compressedImg = await ImageCompressor(Image)
    let result = await updateMediaActionForUserMedia(userID, mediaId, 'isProfileImage', true)
    if (result.status === 200) {
      //getMediaImageList()
      ToastUtils({type: 'success', message: 'Photo Set As A Profile'})
      setMediaisImageUploaded(false)
    } else {
      ErrorToastUtils()
    }
  }

  const handleMediaChange = async (event: any) => {
    const userID = localStorage.getItem('anonymousUserId')
    let filesArray = Object.values(event.target.files)

    filesArray.map((file: any) => {
      var tmppath = URL.createObjectURL(file)
      tempProfileMedia.push(tmppath)
    })

    setMediaisImageUploaded(true)

    let compressedfiles: any = []

    await filesArray.map(async (file: any) => {
      let compressedImg = await ImageCompressor(file)
      compressedfiles.push(compressedImg)
      if (filesArray.length === compressedfiles.length) {
        let result = await createMediaActionForUserMediaForAnonymousUser(compressedfiles, userID)
        if (result.status === 200) {
          await handleIconChange(result.data[0].id) // default select first image as a profile
          setMediaisImageUploaded(false)
          getMediaImageList()
          ToastUtils({type: 'success', message: 'Profile Media Upload SuccessFully'})
        } else {
          setMediaisImageUploaded(false)
          setTempProfileMedia([])
          ToastUtils({type: 'error', message: 'Error in Media Upload'})
        }
      }
    })
  }

  const removeMedia = async (mediaId: any) => {
    const userID = localStorage.getItem('anonymousUserId')
    let result = await removeMediaActionForUserMedia(userID, mediaId)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'media has been removed'})
      setUserProfileMedia(result.data)
    } else {
      ErrorToastUtils()
    }
  }

  const onSubmitStep3 = async () => {
    if (userProfileMedia.length !== 0) {
      localStorage.removeItem('anonymousUserId')
      localStorage.removeItem('step1Details')
      localStorage.removeItem('step2Details')
      localStorage.removeItem('isUserCreated')
      submitStep()
      navigate('/apps/anonymous-user-management/users')
    } else {
      ToastUtils({type: 'error', message: 'Must Upload One Photo'})
    }
  }

  return (
    <div className='w-100'>
      <div>
        <h3>Profile Media</h3>
        <div className='d-flex flex-end'>
          <button
            className='ms-4 btn btn-primary'
            onClick={(e) => {
              handleMediaClick(e)
            }}
            disabled={isMediaImageUploaded}
          >
            {!isMediaImageUploaded ? 'Upload Media' : 'Uploading...'}
          </button>

          <input
            type='file'
            name='icon'
            id={`mediaInput`}
            onChange={(e) => handleMediaChange(e)}
            ref={hiddenMediaInput}
            style={{display: 'none'}} // Make the file input element invisible
            accept='image/*, image/heic, image/heif'
            multiple
          />
        </div>
        <div className='row mt-2'>
          {isMediaImageUploaded &&
            tempProfileMedia.map((mediaUrl: any, index: any) => {
              return (
                <div className={tempProfileMedia.length >= 6 ? 'col-lg-2' : 'col-lg-3'} key={index}>
                  <div className='position-relative d-inline-block'>
                    <img
                      alt='Pic'
                      src={mediaUrl}
                      width={tempProfileMedia.length >= 6 ? '100' : '100'}
                      height={tempProfileMedia.length >= 6 ? '99' : '99'}
                      // width='100'
                      // height='99'
                      className='rounded d-block'
                      loading='lazy'
                    />
                    <div
                      className='position-absolute'
                      style={{position: 'absolute', top: '40px', right: '40px'}}
                    >
                      <div className='spinner-border' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          {userProfileMedia !== undefined &&
            userProfileMedia
              .filter((media: any) => media.status === true)
              .map((userMedia: any, index: any) => {
                return (
                  <div
                    className={userProfileMedia.length >= 6 ? 'col-lg-2' : 'col-lg-3'}
                    key={index}
                  >
                    <div className='position-relative d-inline-block'>
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        width={userProfileMedia.length >= 6 ? '100' : '100'}
                        height={userProfileMedia.length >= 6 ? '99' : '99'}
                        // width='100'
                        // height='99'
                        className='rounded d-block'
                        loading='lazy'
                      />
                      <span className='position-absolute top-0 right-0'>
                        <Dropdown>
                          <Dropdown.Toggle id='dropdown-basic' as={CustomToggle}></Dropdown.Toggle>

                          <Dropdown.Menu>
                            {!userMedia.isProfileImage && (
                              <Dropdown.Item onClick={() => handleIconChange(userMedia.id)}>
                                Set profile
                              </Dropdown.Item>
                            )}
                            <Dropdown.Item onClick={() => removeMedia(userMedia.id)}>
                              Delete Media
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </span>
                    </div>
                  </div>
                )
              })}
        </div>
      </div>

      <div className='d-flex flex-end pt-10'>
        <div className='mr-2'>
          <button type='button' className='btn btn-sm btn-primary me-3' onClick={prevStep}>
            <span className='indicator-label'>
              <KTIcon iconName='arrow-left' className='fs-4 me-1' />
              Back
            </span>
          </button>
        </div>

        <div>
          <button
            type='button'
            className='btn btn-sm btn-primary me-3'
            onClick={onSubmitStep3}
            disabled={isMediaImageUploaded}
          >
            <span className='indicator-label'>
              {!isMediaImageUploaded ? 'Submit' : 'Uploading...'}
              <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export {Step3}
