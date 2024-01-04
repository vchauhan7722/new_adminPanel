import React, {FC, useEffect, useRef, useState} from 'react'
import {Field, ErrorMessage} from 'formik'
import {KTIcon} from '../../../../../../../../../_metronic/helpers'
import {
  UpdateUserProfilePicture,
  createMediaActionForUserMediaForAnonymousUser,
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
  const {submitStep, prevStep, userID} = props

  const hiddenFileInput = useRef<HTMLInputElement>(document.createElement('input'))
  const hiddenMediaInput = useRef<HTMLInputElement>(document.createElement('input'))

  const [isImageUploaded, setisImageUploaded] = useState<any>(false)
  const [isMediaImageUploaded, setMediaisImageUploaded] = useState<any>(false)
  const [userProfileMedia, setUserProfileMedia] = useState<any>(undefined)

  const navigate = useNavigate()

  useEffect(() => {
    getMediaImageList()
  }, [])

  const getMediaImageList = async () => {
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
    //let compressedImg = await ImageCompressor(Image)
    let result = await updateMediaActionForUserMedia(userID, mediaId, 'isProfileImage', true)
    if (result.status === 200) {
      getMediaImageList()
      ToastUtils({type: 'success', message: 'Photo Set As A Profile'})
      setMediaisImageUploaded(false)
    } else {
      ErrorToastUtils()
    }
  }

  const handleMediaChange = async (event: any) => {
    setMediaisImageUploaded(true)
    let filesArray = Object.values(event.target.files)

    let compressedfiles: any = []

    await filesArray.map(async (file: any) => {
      let compressedImg = await ImageCompressor(file)
      compressedfiles.push(compressedImg)
      if (filesArray.length === compressedfiles.length) {
        let result = await createMediaActionForUserMediaForAnonymousUser(compressedfiles, userID)
        if (result.status === 200) {
          ToastUtils({type: 'success', message: 'Profile Media Upload SuccessFully'})
        } else {
          ToastUtils({type: 'error', message: 'Error in Media Upload'})
          setMediaisImageUploaded(false)
        }
      }
    })
  }

  const removeMedia = async (mediaId: any) => {
    let result = await removeMediaActionForUserMedia(userID, mediaId)
    if (result.status === 200) {
      ToastUtils({type: 'success', message: 'media has been removed'})
      setUserProfileMedia(result.data)
    } else {
      ErrorToastUtils()
    }
  }

  const onSubmitStep3 = async () => {
    submitStep()
    navigate('/apps/anonymous-user-management/users')
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
            accept='image/*'
            multiple
          />
        </div>
        <div className='row'>
          {userProfileMedia !== undefined &&
            userProfileMedia
              .filter((media: any) => media.status === true)
              .map((userMedia: any, index: any) => {
                return (
                  <div
                    className={userProfileMedia.length >= 6 ? 'col-lg-1' : 'col-lg-2'}
                    key={index}
                  >
                    <div className='position-relative d-inline-block'>
                      <img
                        alt='Pic'
                        src={`${process.env.REACT_APP_SERVER_URL}/${userMedia.media}`}
                        // width={userProfileMedia.length >= 6 ? '50' : '100'}
                        // height={userProfileMedia.length >= 6 ? '49' : '99'}
                        width='100'
                        height='99'
                        className='rounded d-block'
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
        {/* <div className='mr-2'>
          <button
            onClick={prevStep}
            type='button'
            className='btn btn-lg btn-light-primary me-3'
            data-kt-stepper-action='previous'
          >
            <KTIcon iconName='arrow-left' className='fs-4 me-1' />
            Back
          </button>
        </div> */}

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
